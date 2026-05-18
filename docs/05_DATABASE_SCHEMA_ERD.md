<div align="center">
  <img src="https://img.shields.io/badge/DATABASE-FIRESTORE_NoSQL-orange?style=for-the-badge" alt="Database" />
  <h1>🗄 05. 데이터베이스 스키마 & ERD</h1>
  <p><b>PRISM 학습 데이터 프로토콜, Document 구조 및 관계 명세서</b></p>
</div>

<br/>

> [!WARNING]  
> 본 모델링 가이드/다이어그램은 관계형 RDBMS 형태를 띄고 있으나, 실제 프로젝트 구현은 Google Firebase Firestore의 **NoSQL 문서/컬렉션(Document/Collection) 패턴** 구조를 취하여 설계되었습니다. Join 구문 없이 Read-Heavy 작업 최적화를 노립니다.

---

## 📊 1. 엔티티 관계도 (Entity-Relationship Diagram)

Firestore 구조의 직관적 이해를 돕기 위한 하이레벨 관계 매핑입니다. `USERS` 최상위 컬렉션을 기점으로 학습 정보가 담긴 수평 확장 컬렉션 `PROGRESS`가 생성되며, 이는 다시 상세 행동 로그를 서브 컬렉션 패턴으로 취할 수 있는 계층 구조를 갖습니다.

```mermaid
erDiagram
    USERS ||--R{ PROGRESS : "소유 (Owner 1:N)"
    curriculum_metadata ||--o{ PROGRESS : "대상 학습 모듈 (Reference 1:N)"

    USERS {
        string uid PK "Firebase Auth UID"
        string name "닉네임 (최대 30자)"
        string level "school param: elementary, middle, high"
        string country "locale code: kr, us, jp 등"
        string[] interests "관심사 태그 배열 (ex. ['우주', '로봇'])"
        timestamp createdAt "회원 가입 서버시간"
        timestamp updatedAt "마지막 회원정보 갱신 시간"
    }

    PROGRESS {
        string docId PK "Progress 고유 ID 형식: {userId}_{moduleId}"
        string userId FK "소유권자 ID"
        string moduleId FK "타겟 모듈 식별자 (ex. sci-physics-01)"
        boolean vocabCompleted "단어장 예습 완료 여부 플래그"
        int storyProgress "현재 스토리 노드 도달 회차 (Turn)"
        int[] quizScores "단원 퀴즈 누적 정답률/점수 히스토리"
        object[] storyLogs "스토리 로그 객체 (Choice, Consequence 포함)"
        string[] achievements "획득 배지명 (Badge ID) 배열"
        timestamp updatedAt "진척도 상태 마지막 갱신일"
    }
```

---

## 📂 2. 주요 컬렉션 상세 설계 (NoSQL Blueprint)

PRISM은 읽기 성능과 스케일 아웃을 위해 깊은 스키마 트리보단 부분적인 비정규화(Denormalization)와 플랫(Flat) 루트 구조를 병용합니다.

### 👤 2.1 `users` 컬렉션 (Root Collection)
> **역할**: 사용자 기본 페르소나 컨테이너. 로그인 세션 및 AI 프롬프트 생성용 메타 데이터를 제공.

| 🔠 필드 (Field) | ⚙️ 타입 (Type) | 📝 상세 가이드 및 제약조건 (Description & Constraints) |
| :--- | :--- | :--- |
| `name` | `string` | 필드 문자열 제한 100자 이하. |
| `level` | `string` | 사용자의 연령대 표상 (`elementary` / `middle` / `high`). AI 언어 난이도 제어. |
| `readingLevel` | `string` | 추가적인 독해 레벨 (선택 사항). |
| `interests` | `array<string>` | 동적 개인화 요소. 관심사에 따라 시나리오 세계관(해적, 바다, 우주, 고대 등) 자동 각색. 길이 20 이하. |
| `country` | `string` | 로컬라이징 및 커리큘럼 기준 지표 국가. UI의 i18n 언어팩과 동기화. |
| `createdAt` | `string/timestamp`| 가입 시점 ISO 문자열. |

### 📈 2.2 `progress` 컬렉션 (Root Collection)
> **역할**: 각 과목/모듈(`moduleId`) 별로 저장되는 진행 상태와 성과(업적) 평가의 마스터 노드.
> **Key Naming Convention**: 문서 ID를 `{request.auth.uid}_{moduleId}` 형태로 강제 합성하여 1인당 1단원 1문서만 생성하도록 보장(중복 방지 복합 인덱스).

| 🔠 필드 (Field) | ⚙️ 타입 (Type) | 📝 상세 가이드 및 제약조건 (Description & Constraints) |
| :--- | :--- | :--- |
| `vocabCompleted`| `boolean` | 모듈 시작 전 어휘 사전(단어장) 탭 완료 트래킹 유무. |
| `storyProgress` | `number` | 학습자가 현재 진행 중인 스토리 턴 카운터 (중간 저장 및 불러오기에 사용됨). |
| `quizScores` | `array<number>`| 단원 기말 평가에서 제출된 각 회차 퀴즈 점수 리스트 기록망. 최대 길이 100 제약. |
| `storyLogs` | `array<object>`| Map 구조의 배열. 구조: { `choice`: "유저 결정 문자열", `consequence`: "AI 결과 스크립트", `timestamp`: "기록 시간" } |
| `achievements` | `array<string>`| 취득 배지 ID 목록 (ex. `["module_master", "perfect_quiz"]`). |
| `userId` | `string` | 보안 룰(Security Rules) 검증을 위한 권한 위임 플래그 필드. |

---

## 🔒 3. 데이터 무결성 및 인프라 보안 (Security Gates)

모든 데이터베이스 I/O는 클라이언트 브라우저에서 직접 서버 인프라로 날아가므로, `firestore.rules` 파일 내에 강력한 검증 층(Guard Layer)을 배포하여 해킹을 방어합니다.

1. **엄격한 스키마 정의 검증 (Type Guards)**
   - `isValidUser`, `isValidProgress` 함수를 Rules에 주입하여, 고안되지 않은 해커의 임의 필드 삽입 (`isAdmin: true` 등 - Ghost Field Injection 방어) 기도를 `Permission Denied` 로 원천 차단.
2. **Path Parameter 하이재킹 방어**
   - Progress 데이터 수정(C/U/D/R) 요청 시, 타겟 문서 ID 텍스트 값이 반드시 `request.auth.uid + "_"` 로 시작하는지 정규표현식 매칭. (자신의 진척도 외 타인의 성적 열람 완벽 차단. 더티더즌 2번 방어)
3. **업데이트 정합성 보호 (Immutable Fields)**
   - Progress 문서 업데이트 시, 사용자 ID나 모듈 ID 등 기준 앵커링 필드에 대한 수정을 차단하기 위해 `incoming().userId == existing().userId` 논리식 강제. 변경 발생 시 트랜잭션 폐기.

---

<div align="right">
  <b><a href="./04_DESIGN_SYSTEM_SPEC.md">← 이전: 04. 디자인 규격</a> &nbsp;|&nbsp; <a href="./06_IMPLEMENTATION_DETAIL.md">다음: 06. 구현 상세 →</a></b>
</div>
