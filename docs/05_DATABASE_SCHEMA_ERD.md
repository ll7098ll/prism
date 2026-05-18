<div align="center">
  <img src="https://img.shields.io/badge/DATABASE-FIRESTORE%20NoSQL-orange?style=for-the-badge" alt="Database" />
  <h1>🗄 05. 데이터베이스 스키마 & ERD</h1>
  <p><b>PRISM 학습 데이터 프로토콜 및 관계 명세서</b></p>
</div>

<br/>

> [!NOTE]  
> 본 모델링 가이드는 관계형 RDBMS 형태를 띄고 있으나, 실제 구현은 Google Firebase Firestore의 **NoSQL 문서/컬렉션(Document/Collection)** 구조를 취합니다.

---

## 📊 1. 엔티티 관계도 (Entity-Relationship Diagram)

Firestore 구조의 직관적 이해를 돕기 위한 하이레벨 관계도입니다. `USERS` 최상위 컬렉션을 기준으로, 학습 정보가 담긴 `PROGRESS`가 생성되며, 이는 다시 상세 행동 로그 `STORY_LOGS` 서브 컬렉션으로 확장됩니다.

```mermaid
erDiagram
    USERS ||--R{ PROGRESS : "가짐 (1:N)"
    PROGRESS ||--R{ STORY_LOGS : "기록됨 (1:N SubCol)"
    curriculum_module ||--o{ PROGRESS : "대상 모듈 (1:N)"

    USERS {
        string uid PK "Auth ID"
        string name "닉네임"
        string level "elementary, middle, high"
        string country "국가 (kr, us 등)"
        string[] interests "관심태그 (ex. 우주, 탐험)"
        timestamp createdAt "가입일시"
    }

    PROGRESS {
        string progressId PK "진척도 문서 ID"
        string userId FK "사용자 소유자 ID"
        string moduleId FK "커리큘럼 모듈 ID (과목-단원)"
        int currentTurn "현재 스토리 회차"
        string[] earnedAchievements "획득한 배지 ID 배열"
        float quizHighScore "퀴즈 최고 점수"
        timestamp updatedAt "마지막 저장일시"
    }

    STORY_LOGS {
        string id PK "선택 로그 ID"
        string choice "User가 선택한 내용"
        string consequence "AI가 도출한 결과/인과"
        string learningPoint "도출된 교육적 인사이트"
        timestamp timestamp "시점"
    }
```

---

## 📂 2. 주요 컬렉션 상세 설계 (NoSQL Collections)

### 👤 2.1 `users` 컬렉션 (Root)
> 사용자 페르소나와 AI 프롬프트 주입의 원천 소스로 기능합니다.

| 피처 (Field) | 타입 (Type) | 상세 가이드 (Description) |
| :--- | :--- | :--- |
| `level` | `String` | 사용자 학교급 (`elementary` / `middle` / `high`). AI 생성 난이도 조절. |
| `interests` | `Array<String>` | 동적 개인화 요소. 관심사에 따라 AI가 스토리에 등장하는 스킨(우주, 바다, 마법 등) 각색. |
| `country` | `String` | `kr`, `us` 등. 노출될 커리큘럼 기준 지표. |

### 📈 2.2 `progress` 컬렉션 (Root)
> 각 과목/모듈(`moduleId`) 별로 저장되는 진행 상태와 업적 마스터 노드.

| 피처 (Field) | 타입 (Type) | 상세 가이드 (Description) |
| :--- | :--- | :--- |
| `currentTurn` | `Number` | 학습자가 현재 진행 중인 분기 회차 (불러오기 기능에 사용됨). |
| `earnedAchievements`| `Array<String>` | 실시간으로 취득된 배지의 ID(ex. `badge_justice_01`)들의 목록. |
| `quizHighScore` | `Number` | 단원 최종 평가에서의 최고 득점 지표 (게이미피케이션 점수화). |

### 📜 2.3 `storyLogs` (Sub-collection of Progress)
> `progress/{progressId}/storyLogs/{logId}` 경로로 저장되는 하위 컬렉션입니다.

- 사용자가 그동안 선택했던 모든 내역과 AI의 생성 결과를 **타임라인 형태(나의 발자취)**로 재생성하는 데 필수적인 데이터입니다.
- AI 성능 분석이나 사용자의 오답 패턴을 분석하는 Raw Data 형식으로도 활용됩니다.

---

<div align="right">
  <b><a href="./04_DESIGN_SYSTEM_SPEC.md">← 이전: 04. 디자인 규격</a> &nbsp;|&nbsp; <a href="./06_IMPLEMENTATION_DETAIL.md">다음: 06. 구현 상세 →</a></b>
</div>
