<div align="center">
  <img src="https://img.shields.io/badge/IMPLEMENTATION-CODE_LOG-teal?style=for-the-badge" alt="Implementation" />
  <h1>🔧 06. 구현 상세 및 아키텍처 실무 (Implementation Details)</h1>
  <p><b>핵심 모듈의 기술적 상세 전략, 렌더링 최적화, 프롬프트 엔지니어링 마일스톤</b></p>
</div>

<br/>

> [!NOTE]  
> 본 문서는 단순 개념 설계를 넘어 실제 'PRISM' 프로젝트 소스 코드로 인스턴스화된 핵심 모듈들의 특수성 및 실무적인 엔지니어링 과정을 기술적으로 증명합니다.

---

## ⚙️ 1. 핵심 기술 레이어 아키텍처 (Tech Stack Details)

### 🪝 1.1 에이전틱 훅 패턴 (Agentic Custom Hooks)
리액트 컴포넌트 내부 비대화를 막고, 관심사의 분리(Seperation of Concerns) 트렌드를 따르기 위해 프론트 UI 로직과 인프라/AI I/O 로직을 완벽히 분리했습니다.

- **`useStoryMode`**: 
  - 🔄 **턴 기반 상태 관리**: `turnCount`, 현재 제시된 AI `options`, 생성 중 로딩 상태 `isGenerating` 등 서사 로직의 헤드쿼터.
  - 📡 **AI 비동기 오케스트레이션**: Gemini API Text/Image 멀티 채널 요청을 브릿징하고, 응답된 String을 안전한 JSON 형식으로 Parse & Validate 하는 예외처리.
- **`useProgress`**: 
  - 🔥 **서버리스 실시간 동기화**: Firestore Snapshot 방식(`onSnapshot`) 연동. 백그라운드나 인접 탭, 다른 디바이스에서의 데이터 갱신도 클라이언트 세션에 실시간 브라우저 DOM 렌더 브로드캐스팅.
- **`useAuth`**: 
  - 🔑 **세션 옵저버**: Firebase Auth Firebase Token 라이프사이클 이벤트 청취. 상태에 따라 Protected Route(전역 라우팅 블록) 리다이렉트 제어. 전역 `AppContext` 프로바이더에 최신화.

### 🧠 1.2 지능형 메타 프롬프트 엔지니어링 (Multi-Persona Prompting)
순수한 문자열 정보 반환을 막고, 학습자의 **'초인지(Metacognition) 발달 단계'**와 **'관심사 컨텍스트'**에 최적화된 메타 프롬프트를 시스템 내부적으로 하드코딩(템플릿 엔진화)하여 주입합니다.

#### 💡 수준별(Level) 프롬프트 분기 주입 가이드
| 📊 계층 (Level) | 🎯 초점 분기(Core Focus) 규칙 | 🗣 권장 문장 / 어조 특성 (Tone) |
| :---: | :--- | :--- |
| **Elementary** | 감수성 폭발 및 단순 직관 | 짧은 3-4문장, 쉬운 기본 단어 위주 편성, 따뜻하고 격려하는('~해요', '~했나요?') 동화적 어조. |
| **Middle** | 논리 추론 기초 육성 | 5-6문장, 일상어+교과 핵심 용어 혼합 사용, 선택에 따른 명백한 논리적인 인과결과 방어묘사. |
| **High** | 비판적 사고 기반 확충 | 8-10문장의 긴 호흡, 고급 어휘 및 다각적 인과관계(기회비용 등) 분석 시점 제공. ('~합니다', '~하십시오') |

---

## 🖼 2. 렌더링 성능 최적화 (Rendering Performance)

멀티모달 AI(이미지 생성) 특성상 필수 불가결하게 마주하는 서버 레이턴시 응답을 클라이언트 UI에서 심리적으로 감소시키기 위한 패턴입니다.

1. **Skeleton + Shimmer**: `lucide-react` 로더와 `Shimmer` 효과 래퍼를 이용해 이미지가 생성되는 8~10초 동안 스페이스(공간) 레이아웃 시프트를 미연에 방어.
2. **Text Streaming Transition**: 텍스트 응답이 생성 중일 때 타이핑 효과 애니메이션(`TypingAnimation`)을 이용하여 AI 서버 딜레이 타임을 윈도우 인지 시간으로 착각(Illusion)하도록 유도합니다.

---

## 🗓 3. 실무 개발 마일스톤 로그 (Development Sprint Diary)

총 8개의 스프린트를 통해 점진적인 아키텍처 개선(Refactoring)과 글로벌 패치가 수행되었습니다. 상세 내역은 `docs/dev_log` 를 참조하십시오.

### 🛠 [Phase 1~2] 코어 프로토타이핑 및 데이터베이스 결합
- **프로필 영속성(Persistence) 완성**: `ProfileSetup.tsx` 훅 단에서 `getDoc`을 통해 진입 즉시 기존 유저 정보를 실시간 로딩(Pre-fill). 
- **DB Write-Safety 확보**: `setDoc(Ref, Data, { merge: true })` 옵션 구문을 직접 감싸는 래퍼 훅을 띄워, 기존 하위 데이터(`progress>storyLogs`)의 유실 없이 메타 정보 타겟팅 패치 수행.

### 🌐 [Phase 3] 시스템 확장 및 글로벌화 (2026.04.14 ~ 04.15)
단일 데모 과목 체계를 '전 교과 및 8개국 글로벌 스탠다드'로 확장하는 동적(Dynamic) JSON 라우팅 기반 코드 스플리팅 구조 적용.
- [🔗 상세 로그: 2026-04-14 학습의 일반화 확장기](./dev_log/2026-04-14_GENERALIZATION.md)
- [🔗 상세 로그: 2026-04-15 8개국 로컬라이징 및 다국어 스크립트](./dev_log/2026-04-15_LOCALIZATION.md)

### 💎 [Phase 4] 리팩토링 및 프리미엄 UX 개편 (2026.04.17)
상태 관리 안티패턴(Prop Drilling) 제거를 위한 Context 전환 및 랜딩 UI 리마스터링 작업.
- **Login UI Redesign**: 2단 분기 그리드 채택. 우측 정보 영역에는 `Particles` 애니메이션과 `Lucide` 아이콘 피처 리스트를 띄워 몰입감 부여.
- [🔗 상세 로그: 2026-04-17 컴포넌트 아키텍처 완전 혁신](./dev_log/2026-04-17_ARCHITECTURE.md)

### 🚀 [Phase 5] 글로벌 교육과정 마스터 로드맵 (2026.04.20)
최종 288개 콤비네이션 모듈 매핑(과목-단원 관계) 통합 패치 적용 및 QA 완결.
- [🔗 상세 로그: 2026-04-20 글로벌 방대 인프라 확장 마무리 (Prism Expansion)](./dev_log/2026-04-20_PRISM_EXPANSION.md)

---

<div align="right">
  <b><a href="./05_DATABASE_SCHEMA_ERD.md">← 이전: 05. DB 스키마 & ERD</a> &nbsp;|&nbsp; <a href="./07_TEST_VERIFICATION.md">다음: 07. 검증 및 테스트 →</a></b>
</div>
