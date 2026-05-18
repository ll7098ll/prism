<div align="center">
  <img src="https://img.shields.io/badge/REQUIREMENTS-ANALYSIS-success?style=for-the-badge" alt="Requirements" />
  <h1>📋 02. 요구사항 분석서 (Requirement Analysis)</h1>
  <p><b>PRISM 시스템 기능, 비기능, 보안 및 성능 요구사항 상세 정의</b></p>
</div>

<br/>

> [!IMPORTANT]  
> 본 분석서는 'PRISM — AI 기반 인터랙티브 교과서'의 성공적 론칭을 위한 소프트웨어 요구사항 명세(SRS)입니다. 상세 기능뿐 아니라 인프라 및 AI 검증 프로세스를 포괄합니다.

---

## ⚙️ 1. 기능 요구사항 (Functional Requirements)

### 🌍 F1. 글로벌 교과 과정 (Scale & Expansion)
- **🌍 다국어 지원 (i18n)**: 핵심 UI 및 커리큘럼은 8개국(한국, 미국, 일본, 영국, 프랑스, 독일, 이탈리아, 중국) 언어로 지원되어야 한다.
- **📚 방대한 모듈화**: 총 **288개 모듈** (8개 국가 × 3개 학교급 × 3과목 × 4개 단위 단원) 규격의 학습 경로가 구조화(JSON 등)되어 있어야 한다.
- **🔄 무결점 진입 포인트**: 사용자는 과목 카드를 선택하고 즉시 해당 과목의 단원(모듈) 리스트를 확인할 수 있어야 한다.

### 👤 F2. 사용자 프로필 및 개인화(Onboarding)
- **🛠 프로필 셋업**: 로그인 직후 사용자는 닉네임, 학교급(`Elementary`, `Middle`, `High`), 열독 수준, 그리고 **관심사 표상(키워드 직접 입력)**을 설정해야 한다.
- **🎨 Dynamic UI Context**: 학교급 선택(초/중/고)에 따라 앱의 색상 톤, 글꼴 크기, AI의 응답 어투(Tone & Manner)가 즉각적으로 변경 동기화되어야 한다.
- **🔐 안전한 인증**: Firebase Auth 인프라를 활용하여 Google Auth 소셜 로그인을 제공해야 한다. (추후 Apple 뷰, 이메일로 확장 가능성)

### 🧠 F3. 인터랙티브 스토리 엔진 & 멀티모달(AI Generation)
- **💬 동적 대화 생성**: AI 프롬프트 스크립트는 학생의 프로필(관심사/레벨) 및 학습 단원의 핵심 개념이 주입되어 적절한 학습 시나리오를 JSON 형태로 반환해야 한다.
- **🔀 분기형 선택 체계**: 스토리가 전개될 때마다 최소 2~3개의 선택지(Choice)가 제공되어야 하고, 선택 결과에 따라 스토리가 갈라지는 비선형(Non-linear) 전개 기능을 지원해야 한다.
- **🖼 실시간 시각화**: 현재 장면의 맥락(Context)을 요약한 이미지 생성 프롬프트를 바탕으로 AI(Gemini 2.5 Flash Image)가 16:9 비율의 배경 이미지를 생성하여 화면에 렌더링해야 한다.
- **📖 어휘 학습장 (Vocabulary)**: 모듈 진입 시, 해당 단원의 핵심 어휘를 AI가 미리 추출하여 단어장 뷰를 제공해야 한다.

### 🏆 F4. 게이미피케이션 및 성취 시스템 (Gamification)
- **🌟 랭킹 및 티어**: 학습 이수율 및 퀴즈 득점률 총합을 기반으로 5대 등급(`Bronze`, `Silver`, `Gold`, `Platinum`, `Diamond`)을 부여한다.
- **🏅 배지 (Badge) 수집**: 단원 완주, 특정 희귀 분기 도달, 모두 정답을 맞춘 경우 특별 배지를 언락 및 프로필에 장착 가능해야 한다.
- **📈 대시보드 시각화**: 사용자가 지금까지 달성한 학습 진행도, 차트, 과목별 점수 분포를 직관적인 차트(Recharts 활용 등)로 표시해야 한다.

---

## 🛡 2. 비기능 요구사항 (Non-functional Requirements)

### 🎨 N1. 사용자 경험 및 접근성 (UX/UI & A11y)
- 🎮 학습 도구의 거부감을 없애기 위해 프리미엄 애니메이션 UI(`Magic UI`, `Framer Motion`, 카입 티핑 효과 등)를 대폭 적용한다.
- 📱 다양한 디바이스(PC, 태블릿, 모바일)에 깨짐이 없도록 반응형 레이아웃(Tailwind 기반 Mobile-first)을 완벽히 지원한다.
- ♿ 색각 이상자를 고려하여 적절한 명도 대비와 텍스트 대체 수단을 구비한다.

### 🚀 N2. 성능 및 유연성 (Performance)
- ⏱️ **지연 내결함성(Latency Tolerance)**: AI 텍스트 생성 또는 이미지 렌더링 중 통신 딜레이(지연) 발생 구간에서 **스켈레톤 UI(Shimmer 효과)** 또는 진행률 애니메이션 텍스트를 제공하여 체감 로딩을 완화한다.
- 📦 **데이터 의존도 탈피**: 과목 확장 시 클라이언트 코드를 일일이 수정하지 않고, `curriculums` 폴더 내 JSON 주입 및 앱 재빌드만으로 즉시 반영되는 추상화 아키텍처를 따른다.

### 🔐 N3. 데이터 정합성 / 보안 (Security)
- 🔒 **Cloud Firestore Security Rules**: 2계층 방어 체계 반영. `request.auth.uid`와 문서 내 ID가 일치해야만 수정 권한(Update/Delete/Create)을 부여한다. "Dirty Dozen" 위협 모델 방어.
- 🛑 **AI 프롬프트 인젝션(Injection) 차단**: AI 입력 시, 사용자가 직접 입력한 관심사 키워드가 시스템 지시문(System Instructions)을 무너뜨리지 않도록 이스케이프 및 구조적 격리를 수행한다.
- ⚙️ **데이터 파싱 안정성**: AI의 JSON 응답이 불완전할 때(Malformed JSON), 에러를 포착하고 안전한 모드 통보 및 재시도(Retry)를 수행해야 한다.

---

## 🔬 3. 하이브리드 검증 요구사항 (Validation & QA)

| 🧪 검증 단계 | 🛠 방법론 | 📝 상세 내용 |
| :--- | :--- | :--- |
| **Hallucination Check** | 키워드 의무 매칭 | AI가 반환한 교육용 스크립트 결괏값에 단원 필수 학습 키워드(예: '수요와 공급', '삼권분립') 누락 시 Warning Alert 처리. |
| **Persona Testing** | 시나리오 다변화 | '초등학생 + 우주과학 관심 + 다국어' 등 이질적 속성 조합 매핑 시, UI가 깨지거나 AI가 오류를 범하는지 크로스 체크(QA). |
| **Image Policy Filter** | 안전 검사 | 유혈, 폭력 등 부적절한 AI 이미지 생성 방지를 위한 Safety Attributes 파라미터 적용 필수. |

---

<div align="right">
  <b><a href="./01_PROJECT_PROPOSAL.md">← 이전: 01. 프로젝트 기획서</a> &nbsp;|&nbsp; <a href="./03_SYSTEM_ARCHITECTURE.md">다음: 03. 아키텍처 설계 →</a></b>
</div>
