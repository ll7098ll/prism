# Firebase Security Specification

## Data Invariants

1.  **Identity Invocation**: A User profile (`/users/{userId}`) can only be created, read, updated, or deleted by the authenticated user whose `uid` exactly matches the `userId` in the document path.
2.  **Progress Relational Safety**: Progress documents (`/progress/{userId_moduleId}`) must start with the authenticated user's `uid` followed by an underscore `_`. A user can never read, modify, or list progress records belonging to another user.
3.  **Schema Enforcement**: All document creates and updates must strictly adhere to the predefined schema blueprints (`isValidUser` and `isValidProgress`). No arbitrary "ghost" fields (e.g., `isVerified: true` or `isAdmin: true`) are permitted.
4.  **Immutability Invariant**: Core relational keys (e.g., `userId` and `moduleId` in a Progress document) cannot be modified after creation. The `update` logic forces `incoming().userId == existing().userId` and excludes them from `affectedKeys()`.

## The "Dirty Dozen" Payloads

The rules are designed to explicitly reject these 12 malicious payloads:

1.  **Identity Spoofing (Write)**: Updating `userId` in a Progress document to bypass user ownership logic. (Blocked by `affectedKeys().hasOnly` and strict comparison to `existing()`).
2.  **Path Forgery**: Creating a progress document at `/progress/anotherUserId_mod3` using my own auth. (Blocked by `.matches('^' + request.auth.uid + '_.*')`).
3.  **Ghost Field Injection (User)**: Creating a User profile with `{ "name": "Hack", "level": "high", "isAdmin": true }`. (Blocked by `hasOnly` strict schema in `isValidUser`).
4.  **Ghost Field Injection (Progress)**: Adding `{ "unlockedPremium": true }` to a Progress document. (Blocked by `hasOnly` in `isValidProgress`).
5.  **Type Poisoning (String to Object)**: Setting `"level": { "broken": "value" }`. (Blocked by `data.level is string` in `isValidUser`).
6.  **Size OOM Attack**: Uploading a 2MB string as `"interests"`. (Blocked by `.size() <= 20` bounds on arrays and string length checks).
7.  **Variable Hoisting on Create**: Sending empty payload `{}` to bypass field validation. (Blocked by `isCreateUserAction` requiring `hasAll(['name', 'level', ...])`).
8.  **Id Poisoning**: Querying `/users/!@#$junkID` with extreme length. (Blocked by `isValidId()` regex and size limits).
9.  **List Query Bypass (PII scraping)**: Attempting client-side scraping `db.collection('users').get()`. (Blocked by `allow list: if false;`).
10. **Progress Query Scraping**: Attempting `db.collection("progress").where("moduleId", "==", "mod1").get()` to view everyone's progress. (Blocked by `allow list` requiring `resource.data.userId == request.auth.uid`).
11. **Update-Gap Erasing**: Overwriting the entire document during an `update` intentionally leaving out previous data. (Blocked by `incoming().diff(existing()).affectedKeys().hasOnly(...)` protecting unchanged fields).
12. **Unauthenticated Access**: Sending any data without login. (Blocked by `isSignedIn()`).

## The Test Runner (firestore.rules.test.ts)

```typescript
import { readFileSync, createWriteStream } from 'fs';
import { initializeTestEnvironment, assertFails, assertSucceeds, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { setLogLevel } from 'firebase/firestore';

setLogLevel('error');

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-test-project',
    firestore: {
      rules: readFileSync('firestore.rules', 'utf8'),
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe('Firestore Security Rules', () => {
  
  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  describe('User Profiles', () => {
    it('should prohibit unauthenticated reads', async () => {
      const db = testEnv.unauthenticatedContext().firestore();
      await assertFails(db.collection('users').doc('user1').get());
    });

    it('should allow a user to read their own profile', async () => {
      const db = testEnv.authenticatedContext('user1').firestore();
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await context.firestore().collection('users').doc('user1').set({name: 'Test', level: 'high'});
      });
      await assertSucceeds(db.collection('users').doc('user1').get());
    });

    it('should prevent ghost field injection (Dirty Dozen #3)', async () => {
      const db = testEnv.authenticatedContext('user1').firestore();
      await assertFails(db.collection('users').doc('user1').set({
        name: 'Hacker',
        level: 'high',
        isAdmin: true, // Ghost field
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01'
      }));
    });
  });

  describe('Progress Tracking', () => {
    it('should prevent writing progress to another users path (Dirty Dozen #2)', async () => {
      const db = testEnv.authenticatedContext('hacker').firestore();
      await assertFails(db.collection('progress').doc('user1_moduleXYZ').set({
        userId: 'user1',
        moduleId: 'moduleXYZ',
        vocabCompleted: true,
        storyProgress: 1,
        quizScores: [],
        updatedAt: '2023-01-01'
      }));
    });

    it('should allow writing to own progress path', async () => {
      const db = testEnv.authenticatedContext('user1').firestore();
      await assertSucceeds(db.collection('progress').doc('user1_moduleXYZ').set({
        userId: 'user1',
        moduleId: 'moduleXYZ',
        vocabCompleted: true,
        storyProgress: 1,
        quizScores: [],
        updatedAt: '2023-01-01'
      }));
    });

    it('should enforce List Query Bypass (Dirty Dozen #10)', async () => {
      const db = testEnv.authenticatedContext('user1').firestore();
      // Succeeds because it includes the strict where check
      await assertSucceeds(db.collection('progress').where('userId', '==', 'user1').get());
      // Fails because it omits the requested where check
      await assertFails(db.collection('progress').get());
    });
  });
});
```
