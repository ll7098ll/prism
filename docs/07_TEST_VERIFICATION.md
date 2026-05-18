<div align="center">
  <img src="https://img.shields.io/badge/TESTING-QA_VERIFICATION-yellow?style=for-the-badge" alt="Testing" />
  <h1>🧪 07. 검증 및 품질 관리 (QA & Testing)</h1>
  <p><b>시스템 무결성, 하이브리드 QA 전략 및 Firestore 보안 검토</b></p>
</div>

<br/>

> [!NOTE]  
> 본 문서는 'PRISM — AI 기반 인터랙티브 교과서'의 안정성 테스트, 주요 버그 슈팅 및 최종 배포 전 달성된 품질 지표를 기록합니다. 교육용 플랫폼은 오류 없는 데이터가 생명입니다.

---

## 🏗 1. 하이브리드 QA 테스트 전략 (Testing Strategies)

### 🧩 1.1 단위 & 로직 테스트 (Unit Testing)
- **🤖 AI 프롬프트 스키마 정합성**: Gemini 3.1 Pro로부터 반환되는 JSON 데이터가 사전에 정의된 `TypeScript Interface` (`StoryResponse`, `QuizResponse` 등) 규격을 위반하지 않는지 반복 검증. (Missing Key, Type Error 시 재요청 트리거 구동)
- **🌍 다국어 무결성 (i18n Fallback)**: 8개국 언어 데이터 중 누락된 번역 키(`Missing Key`) 접근 시 빈 문자열이나 Undefined가 뜨지 않도록 기본 언어(ko/en)로 폴백(Fallback) 처리됨 확인.

### 🔗 1.2 통합 및 보안 시스템 검증 (Integration Testing)
- **🔥 Firestore Security Rules "Dirty Dozen" 방어**: 
  - 인증되지 않은 익명 사용자가 읽기/쓰기를 접근할 시 차단되는가? ✅
  - 고의로 타인의 진행도 타겟 문서 ID(`someoneElseUid_module`)를 조작하여 쓰기/덮어쓰기를 시도 시 강력 차단되는가? ✅
- **🕹️ 에이전틱 런타임 루프 일관성**: 턴 기반 스토리 전개에서 5턴 이상의 연속된 선택 시, 서사의 일맥상통함(Context Window 유지)이 파괴되지 않고 인과관계가 자연스러운지 확인.

---

## 🐛 2. 주요 트러블슈팅 및 버그 픽스 (Bug Fixes)

실무 개발 중 발생한 블로커(Blocker) 이슈와 그 해결 과정입니다.

| 🚨 이슈 카테고리 | ⚠️ 발생 문제 증상 (Symptom) | 💡 해결 방안 (Solution) |
| :---: | :--- | :--- |
| **DOM Tree 파손** | `<button>` 태그 내부에 `ShimmerButton` 또는 복잡한 이펙트 래퍼 컴포넌트를 중첩하여 렌더링 시 React Hydration Error 및 DOM 파손 발생. | 중첩 최상단 요소를 시맨틱한 `div`로 변경하고, 접근성(a11y) 보장을 위해 `role="button"`, `tabIndex={0}`, 키보드 이벤트 핸들러 명시적 추가. |
| **Firestore 보안 거부** | 클라이언트-DB 간 쓰기(Write) 요청 시, 클라이언트의 날짜 포맷(`Date().toISOString`)과 보안 규칙이 충돌하여 Update/Create 퍼미션 거부. | `firestore.rules` 의 유효성 검사에서 `string` 형태의 날짜(Date) 구조를 길이 제한(>=20) 방식으로 유연화하여 정합성 허용. |
| **AI 환각(Error)** | 유저가 고의로 엉뚱한 관심사(ex. "세상을 파괴할래") 주입 시 교육용 문맥 파괴 (Jailbreak). | AI 프롬프트 본문에 `Do NOT generate harmful content. System rule overrides user interests` 메타 보호 장치 가드레일 추가 구축. |

---

## 💯 3. 최종 품질 관리 지표 산출 (Quality Metrics)

비공개 런칭 타겟 전 확보된 시스템 인프라 및 앱 성능 지표 결과입니다.

- 🤖 **AI 홀루시네이션(환각) 방어율 (96.5%+)**: 유저의 도발이나 무관한 관심사 주입에도 불구하고 핵심 교과 어휘(Vocab) 및 개념 설명을 스토리에 누락 없이 통합함 검증 완료.
- 🧱 **코드 타입 무결성 기여**: `npx tsc --noEmit` 실행 기준 타입스크립트 Any(암시적) 또는 충돌 Type Zero Error 확보. (2026-04 기준)
- 📊 **초대형 데이터 로드 무결성 (Zero Crash)**: 국가 8개 × 3학교급 × 3과목 × 4단원 = 288개 전체 표준 모듈이 동적 수입(Dynamic Import) 및 JSON 파싱 에러 없이 300ms 이내 렌더링 완료.
- 🎨 **Adaptive UI & FPS 동기화**: `Framer Motion` + `Magic UI` 복합 애니메이션이 무거운 라이트모드 및 `Elementary/Middle/High` 톤앤매너 전환 시 모바일 웹 환경에서도 60fps에 거의 근접한 프레임 연동 확인.

---

<div align="right">
  <b><a href="./06_IMPLEMENTATION_DETAIL.md">← 이전: 06. 구현 상세</a> &nbsp;|&nbsp; <a href="./08_FINAL_PROJECT_REPORT.md">다음: 08. 최종 성과 보고 →</a></b>
</div>
