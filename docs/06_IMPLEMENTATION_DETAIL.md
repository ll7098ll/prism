<div align="center">
  <img src="https://img.shields.io/badge/IMPLEMENTATION-CODE%20LOG-teal?style=for-the-badge" alt="Implementation" />
  <h1>🔧 06. 구현 상세 및 아키텍처 실무</h1>
  <p><b>핵심 모듈의 기술적 상세와 개발 과정 마일스톤</b></p>
</div>

<br/>

> [!NOTE]  
> 앞선 설계 단계를 거쳐 'PRISM'의 실제 코드로 구현된 핵심 모듈의 특수성 및 실무적인 엔지니어링 과정을 기록합니다.

---

## ⚙️ 1. 핵심 기술 레이어 (Tech Stack in Practice)

### 🪝 1.1 Agentic Hooks Pattern
리액트 컴포넌트는 오직 '렌더링'에만 관심사를 두도록 뷰(View)와 비즈니스(Logic)를 완벽히 분리했습니다.
- **`useStoryMode`**: 턴 기반 상태 관리 및 AI LLM 비동기 응답 처리의 헤드쿼터.
- **`useProgress`**: Firestore 실시간 스냅샷(`onSnapshot`) 연동으로 다른 디바이스에서의 데이터 갱신도 클라이언트에 실시간 브로드캐스팅.
- **`useAuth`**: Firebase Auth 옵저버블 상태에 따라 Protected Route(전역 라우팅) 제어.

### 🧠 1.2 지능형 프롬프트 엔지니어링 (Prompting Guide)
순수한 정보 반환을 막고, 학습자의 **'초인지 발달 단계'**에 최적화된 메타 프롬프트를 시스템 내부적으로 하드코딩하여 주입합니다.

| 분류 | 초점 분기 규칙 | 권장 문장 / 어조 특성 |
| :---: | :--- | :--- |
| **Elementary** | 감수성 및 단순 직관 | 짧은 3-4문장, 쉬운 단어 위주, 따뜻하고 격려하는('해요체') 어조. |
| **Middle** | 논리 추론 기초 | 5-6문장, 일상어+교과 필수 용어 혼합, 논리적인 결과 묘사. |
| **High** | 비판적 사고 기반 | 8-10문장, 고급 어휘 및 다각적 인과관계 분석 시점 제공. ('하다체 / 십시오체') |

---

## 🗓 2. 실무 개발 마일스톤 로그 (Development Diary)

총 8개의 스프린트를 통해 점진적인 아키텍처 개선과 리팩토링이 수행되었습니다. 
*아래 링크를 통해 세부 스프린트 일지를 확인할 수 있습니다.*

### 🛠 [Phase 1~2] 코어 프로토타이핑 및 데이터베이스 결합
- **프로필 영속성 완성**: `ProfileSetup.tsx`에서 `getDoc`을 통해 진입 즉시 기존 유저 정보를 실시간 로딩(Pre-fill). 
- `setDoc(Ref, Data, { merge: true })` 옵션을 강제하여 기존 하위 데이터(`progress`)의 유실 없이 메타 정보만 패치하는 오퍼레이션 확보.

### 🌐 [Phase 3] 시스템 확장 및 글로벌화 (2026.04.14 ~ 04.15)
단일 과목 체계를 전 교과 및 글로벌 스탠다드로 확장하는 코드 스플리팅 구조 적용.
- [🔗 상세 로그: 2026-04-14 학습의 일반화 (Generalization)](./dev_log/2026-04-14_GENERALIZATION.md)
- [🔗 상세 로그: 2026-04-15 글로벌 진출 (Localization)](./dev_log/2026-04-15_LOCALIZATION.md)

### 💎 [Phase 4] 리팩토링 및 프리미엄 UX 개편 (2026.04.17)
상태 관리 안티패턴(Prop Drilling) 제거를 위한 Context 전환 및 랜딩 UI 리마스터.
- **로그인 UI 리디자인**: 2단 분기 그리드 채택. 우측에는 `Particles` 애니메이션과 `Lucide` 아이콘 피처를 나열.
- [🔗 상세 로그: 2026-04-17 아키텍처 혁신 (Architecture)](./dev_log/2026-04-17_ARCHITECTURE.md)

### 🚀 [Phase 5] 글로벌 교육과정 마스터 로드맵 (2026.04.20)
최종 288개 모듈 매핑 통합 패치 적용.
- [🔗 상세 로그: 2026-04-20 글로벌 확장 마무리 (Prism Expansion)](./dev_log/2026-04-20_PRISM_EXPANSION.md)

---

<div align="right">
  <b><a href="./05_DATABASE_SCHEMA_ERD.md">← 이전: 05. DB 스키마 & ERD</a> &nbsp;|&nbsp; <a href="./07_TEST_VERIFICATION.md">다음: 07. 검증 및 테스트 →</a></b>
</div>
