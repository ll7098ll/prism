<div align="center">
  <img src="https://img.shields.io/badge/IMPLEMENTATION-CODE%20LOG-teal?style=for-the-badge" alt="Implementation" />
  <h1>🔧 06. 구현 상세 및 아키텍처 실무</h1>
  <p><b>핵심 모듈의 기술적 상세, 실제 코드 스니펫 및 개발 마일스톤</b></p>
</div>

<br/>

> [!NOTE]  
> 본 문서는 **PRISM — AI 기반 인터랙티브 교과서**의 설계 단계 이론을 실제 프로덕션 수준의 TypeScript/React 코드로 구현한 핵심 아키텍처 구현체와 실무 패턴을 명세합니다.

---

## ⚙️ 1. 핵심 기술 패턴 및 코드 레벨 명세

### 🪝 1.1 Agentic Hooks Pattern (View-Logic Separation)
컴포넌트는 오직 '렌더링과 사용자 입력 감지'에만 집중하고, 모든 비즈니스 로직과 비동기 AI 통신은 커스텀 훅으로 은닉화했습니다.

```typescript
// src/hooks/useStoryMode.ts
export function useStoryMode(moduleId: string | undefined) {
  const [storyText, setStoryText] = useState('');
  const [consequence, setConsequence] = useState<any>('');
  const [choices, setChoices] = useState<any[]>([]);
  const [generating, setGenerating] = useState(false);

  const handleChoice = async (choiceText: string) => {
    setGenerating(true);
    try {
      const prompt = PromptFactory.createStoryTurnPrompt({
        userProfile: profile,
        moduleInfo,
        targetCountry,
        history,
        choiceText
      });
      const response = await generateStoryContent(prompt);
      const data = JSON.parse(response || '{}');
      
      setStoryText(data.narrative);
      setConsequence(data.consequence);
      setChoices(data.choices || []);
      
      // Firestore 진도 및 발자취(storyLogs) 자동 갱신
      await saveStoryProgress(choiceText, data);
    } finally {
      setGenerating(false);
    }
  };

  return { storyText, consequence, choices, generating, handleChoice };
}
```

---

### 🏭 1.2 프롬프트 팩토리 패턴 (PromptFactory)
`src/lib/factories/PromptFactory.ts`를 통해 산발적인 문자열 조작을 제거하고, 학습자의 **학교급(Elementary/Middle/High)**과 **읽기 수준(Basic/Standard/Advanced)**에 따른 엄격한 메타 규칙을 시스템 프롬프트로 강제합니다.

```typescript
// src/lib/factories/PromptFactory.ts
export class PromptFactory {
  static getLevelGuidance(level: string, readingLevel?: string): string {
    const isBasic = readingLevel === 'basic';
    const isAdvanced = readingLevel === 'advanced';

    if (level === 'elementary') {
      return `
        - 대상: 초등학생 (${isBasic ? '어휘 기초' : isAdvanced ? '심화 어휘' : '표준'})
        - 문장 구성: 짧고 명확한 3~4문장, 쉬운 일상어 위주
        - 어조: 친절하고 격려하는 어조 ('~해요', '~했답니다')
      `;
    } else if (level === 'middle') {
      return `
        - 대상: 중학생 (원리와 인과관계 탐구)
        - 문장 구성: 논리적인 5~6문장, 교과 필수 용어 자연스럽게 포함
        - 어조: 호기심을 자극하고 합리적 사고를 유도하는 어조
      `;
    } else {
      return `
        - 대상: 고등학생 (사회 구조 및 비판적 딜레마)
        - 문장 구성: 7~9문장, 구조적 분석과 다각적 파급 효과 제시
        - 어조: 신뢰감 있고 진지한 학술적 문체
      `;
    }
  }
}
```

---

### 🎨 1.3 가변 테마 엔진 (Adaptive Theme System)
학습자의 프로필 변경 즉시 UI 전체의 색상, 곡률, 폰트가 동적으로 리페인팅됩니다.

```typescript
// src/lib/theme.ts
export function getLightTheme(level: string) {
  if (level === 'elementary') {
    return {
      card: 'bg-white border-amber-200/80 shadow-amber-100/50',
      radius: 'rounded-3xl',
      font: 'font-sans',
      accent: 'text-amber-600',
      badge: 'bg-amber-100 text-amber-800'
    };
  } else if (level === 'high') {
    return {
      card: 'bg-white border-stone-200 shadow-stone-100/40',
      radius: 'rounded-lg',
      font: 'font-serif',
      accent: 'text-stone-700',
      badge: 'bg-stone-100 text-stone-800'
    };
  }
  // 기본 중학교 (Middle) 테마
  return {
    card: 'bg-white border-blue-200 shadow-blue-100/50',
    radius: 'rounded-2xl',
    font: 'font-sans',
    accent: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-800'
  };
}
```

---

### 📈 1.4 실시간 랭크 산출 알고리즘 (Rank Engine)
학습자의 활동 성과를 3대 지표로 가중 합산(100점 만점)하여 실시간 등급을 계산합니다.

$$\text{Total Score} = (\text{어휘 완료 여부} \times 20) + \min(\text{스토리 턴 수} \times 5, 40) + (\text{퀴즈 최고 점수} \times 0.4)$$

| 점수 구간 | 획득 티어 | 칭호 호칭 | 배지 시각화 |
| :---: | :---: | :---: | :---: |
| 90점 이상 | **Diamond** | 지식의 현자 (Grand Sage) | 💎 다이아몬드 광채 효과 |
| 75점 ~ 89점 | **Platinum** | 법과 진리의 수호자 | 🌟 플래티넘 엠블럼 |
| 50점 ~ 74점 | **Gold** | 열정적 탐구자 | 🥇 골드 메달 |
| 25점 ~ 49점 | **Silver** | 성실한 모험가 | 🥈 실버 엠블럼 |
| 25점 미만 | **Bronze** | 첫 발을 뗀 견습생 | 🥉 브론즈 배지 |

---

## 🗓 2. 실무 개발 마일스톤 로그 (Development Diary)

총 8개의 체계적인 스프린트를 통해 단계별 점진적 아키텍처 개선과 리팩토링이 완성되었습니다.

* **Phase 1 (2026-04-10)**: [04-10 MVP 탄생](./dev_log/2026-04-10_MVP.md) — Firebase Auth/Firestore 기초 연동 및 Gemini 3.1 & 2.5 프로토타입.
* **Phase 2 (2026-04-12 ~ 04-13)**: [04-12 분기점과 인과관계](./dev_log/2026-04-12_BRANCHING.md) 및 [04-13 게이미피케이션](./dev_log/2026-04-13_GAMIFICATION.md) — 스토리 분기, Consequence 배너, 티어 시스템 구현.
* **Phase 3 (2026-04-14 ~ 04-15)**: [04-14 학습의 일반화](./dev_log/2026-04-14_GENERALIZATION.md) 및 [04-15 글로벌 진출](./dev_log/2026-04-15_LOCALIZATION.md) — 3개 교과 확장, 글로벌 8개국 다국어 번역 프록시 연동.
* **Phase 4 (2026-04-16 ~ 04-17)**: [04-16 상호작용 심화](./dev_log/2026-04-16_INTERACTION.md) 및 [04-17 아키텍처 혁신](./dev_log/2026-04-17_ARCHITECTURE.md) — 미니게임 매칭, AppContext 전면 도입, Magic UI 리마스터.
* **Phase 5 (2026-04-20)**: [04-20 288개 글로벌 모듈 지식 베이스 확장](./dev_log/2026-04-20_PRISM_EXPANSION.md) — 8개국 표준 교육과정 통합 및 테마 엔진 고도화.

---

<div align="right">
  <b><a href="./05_DATABASE_SCHEMA_ERD.md">← 이전: 05. DB 스키마 & ERD</a> &nbsp;|&nbsp; <a href="./07_TEST_VERIFICATION.md">다음: 07. 검증 및 품질 관리 (Next) →</a></b>
</div>
