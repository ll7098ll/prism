<div align="center">
  <img src="https://img.shields.io/badge/TESTING-QA%20VERIFICATION-yellow?style=for-the-badge" alt="Testing" />
  <h1>🧪 07. 검증 및 품질 관리 (QA & Testing)</h1>
  <p><b>시스템 무결성, 보안 규칙 검토 및 하이브리드 QA 전략</b></p>
</div>

<br/>

> [!NOTE]  
> 본 문서는 'PRISM — AI 기반 인터랙티브 교과서'의 안정성 테스트, 주요 버그 슈팅 및 최종 배포 전 달성된 품질 지표를 기록합니다.

---

## 🏗 1. 테스트 전략 (Test Strategies)

### 🧩 1.1 단위 & 로직 테스트 (Unit Testing)
- **AI 프롬프트 스키마 정합성**: Gemini로부터 반환되는 JSON 데이터가 사전에 정의된 `TypeScript Interface` 규격을 위반하지 않는지 반복 검증.
- **다국어 무결성 (i18n Fallback)**: 8개국 언어 데이터 중 누락된 번역 키(`Missing Key`) 접근 시 빈 문자열이 아닌 기본 언어(ko/en)로 폴백 스캐닝.

### 🔗 1.2 통합 및 시스템 무결성 (Integration Testing)
- **Firebase Security Rules 검토**: 인증되지 않은 사용자나 타인이 다른 학생의 `Progress` 컬렉션을 무단 열람/수정할 수 없는지 보안 인가 테스트.
- **에이전틱 루프 일관성**: 턴 기반 스토리 전개에서 5턴 이상의 연속된 선택 시, 서사의 일맥상통함이 유지되는지와 엔딩 결론의 도달 여부 확인.

---

## 🐛 2. 주요 트러블슈팅 및 버그 픽스 (Bug Fixes)

실무 개발 중 발생한 블로커(Blocker) 이슈와 그 해결 과정입니다.

| 🚨 이슈 카테고리 | ⚠️ 발생 문제 (Symptom) | 💡 해결 방안 (Solution) |
| :---: | :--- | :--- |
| **DOM Tree 에러** | `<button>` 내부에 `ShimmerButton` 등을 중첩하여 렌더링 시 React Hydration 및 DOM 파손 발생. | 중첩 래퍼(Wrapper) 요소를 `div`로 변경하고, 접근성(a11y)을 위해 `role="button"` 및 `tabIndex={0}`를 명시적으로 부여. |
| **Firestore 거부** | 쓰기(Write) 요청 시 날짜 포맷(`ISOString` vs `Timestamp`) 충돌로 보안 규칙(Rules)이 요청을 차단. | `firestore.rules`에서 `string` 형태의 날짜(Date) 구조를 정규식 통과 방식으로 허용하도록 개선 유연화. |

---

## 💯 3. 최종 품질 관리 지표 (Quality Metrics)

런칭 전 확보된 시스템 인프라 및 앱 성능 지표 결과입니다.

- 🤖 **AI 홀루시네이션 방어율 (95%+)**: 학교급별 난이도 및 특정 국가(미국/일본 등) 커리큘럼 문맥 일치성 준수.
- 🧱 **코드 무결성 완벽 달성**: `npx tsc --noEmit` 실행 기준 타입 충돌 Zero Error 확보. (2026-04 기준)
- 🌍 **데이터 로드 무결성**: 8개국 288개 전체 표준 모듈이 JSON 파싱 에러 없이 동적 렌더링 검증 완료.
- 🎨 **Adaptive UI 동기화**: 모든 Magic UI 효과 리소스가 라이트모드 및 `Elementary/Middle/High` 톤앤매너 전환 시 프레임 드랍 없이 연동됨.

---

<div align="right">
  <b><a href="./06_IMPLEMENTATION_DETAIL.md">← 이전: 06. 구현 상세</a> &nbsp;|&nbsp; <a href="./08_FINAL_PROJECT_REPORT.md">다음: 08. 최종 성과 보고 →</a></b>
</div>
