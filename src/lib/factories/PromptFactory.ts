export interface BasePromptParams {
  userProfile: {
    name: string;
    level: string;
    readingLevel?: string; // 'basic' | 'standard' | 'advanced'
    interests: string[];
    country: string;
  };
  moduleInfo: any;
  targetCountry: string;
}

export interface StoryPromptParams extends BasePromptParams {
  achievementsPrompt: string;
  previousContext?: string;
  choice?: string;
  history?: string[];
  isVocabulary?: boolean;
}

export class PromptFactory {
  static getLevelGuidance(level: string, readingLevel: string = 'standard'): string {
    let readingGuidance = '';
    
    if (readingLevel === 'basic') {
      readingGuidance = 'LEXILE LEVEL: BASIC (기초). Use the absolute simplest and most repetitive vocabulary for this age group. Keep sentences extremely short and direct. Minimize text length and complex clauses.';
    } else if (readingLevel === 'advanced') {
      readingGuidance = 'LEXILE LEVEL: ADVANCED (심화). Introduce challenging vocabulary, idiomatic expressions, and complex sentence structures appropriate for the upper end of this age group. Increase text length slightly to provide more rich detail.';
    } else {
      readingGuidance = 'LEXILE LEVEL: STANDARD (표준). Use standard, everyday vocabulary and typical sentence lengths for this age group.';
    }

    if (level === 'elementary') {
      return `CRITICAL INSTRUCTION - SCHOOL LEVEL: ELEMENTARY (초등학교).
You MUST output very short, very simple text suitable for elementary school students (ages 8-12).
${readingGuidance}
MAXIMUM LENGTH Constraint: Strictly 3-4 sentences total. Around 30-50 words max. DO NOT EXCEED.`;
    } 
    if (level === 'high') {
      return `CRITICAL INSTRUCTION - SCHOOL LEVEL: HIGH SCHOOL (고등학교).
You MUST output highly complex, sophisticated text suitable for high school students (ages 15-18).
${readingGuidance}
LENGTH Constraint: 8-10 sentences. Around 150-200 words. Make it detailed and rich.`;
    }
    
    // Default — middle school
    return `CRITICAL INSTRUCTION - SCHOOL LEVEL: MIDDLE SCHOOL (중학교).
You MUST output moderately complex text suitable for middle school students (ages 12-15).
${readingGuidance}
LENGTH Constraint: 5-6 sentences. Around 80-100 words.`;
  }

  static createStoryStartPrompt(params: StoryPromptParams): string {
    const { userProfile, moduleInfo, targetCountry, achievementsPrompt } = params;
    const levelGuidance = this.getLevelGuidance(userProfile.level, userProfile.readingLevel);

    return `
      [학습자 프로필]
      - 이름: ${userProfile.name}
      - 학습 수준: ${userProfile.level} ${levelGuidance}
      - 관심사: ${userProfile.interests.join(', ')} (스토리의 배경, 비유, 등장인물의 대화 등에 이 관심사를 적극적으로 반영하여 몰입감을 높이세요.)
      - 대상 국가 및 언어: ${targetCountry} (반드시 이 국가의 언어로 모든 텍스트를 작성하고, 이 국가의 역사, 문화, 교육과정, 사회적 맥락을 반영하여 스토리를 구성하세요. 단, JSON 키값은 영어로 유지하세요.)
      
      [스토리 설정]
      당신은 가상 세계의 가이드입니다. 
      주제: ${moduleInfo?.title} (${moduleInfo?.description})
      미연시(비주얼 노벨) 스타일로 첫 번째 장면을 만들어주세요.
      단순한 방문이 아니라, 이 주제와 관련된 흥미로운 사건이나 위기가 발생한 긴박한 상황으로 시작하여 스토리를 탄탄하게 구성하세요.
      사용자(${userProfile.name})가 이 문제를 해결하기 위해 행동을 취해야 하는 상황입니다.
      
      [학습 목표 연관성]
      제시되는 선택지들은 단순히 흥미 위주가 아니라, 이 단원의 학습 목표와 관련된 개념을 적용하거나 고민해볼 수 있는 분기점이어야 합니다.
      중요: 응답 JSON의 "text" 필드 내용의 길이는 반드시 다음을 따르세요:
      ${levelGuidance}
      
      [관심사 맞춤 시스템 - 중요!]
      사용자의 관심사(${userProfile.interests.join(', ')})를 스토리의 배경, 등장인물의 대사, 또는 문제 해결 방식에 깊게 엮어주세요.
      제시되는 선택지 중 최소 1개는 사용자의 관심사와 직접적으로 연관된 특수 행동이어야 합니다.
      ${achievementsPrompt}
      
      출력 형식은 반드시 아래 JSON 형식을 지켜주세요.
      {
        "consequence": {
          "narrative": "새로운 모험의 시작입니다.",
          "learningPoint": "이 단원에서 배울 핵심 개념을 마주하게 됩니다."
        },
        "text": "스토리 내용 (대화체 포함, 몰입감 있게)",
        "imagePrompt": "이 장면에 어울리는 이미지 생성용 영어 프롬프트 (예: A bright sunny day in front of a grand parliament building, anime style)",
        "tailoredInterest": "정치", // 이 장면이 특정 관심사에 강하게 맞춰졌다면 해당 관심사 입력 (없으면 null)
        "choices": [
          { "text": "정부 청사로 간다" },
          { "text": "과거의 유사한 정치적 사례를 조사한다", "interest": "정치" }
        ],
        "isEnding": false,
        "endingSummary": null
      }
    `;
  }

  static createStoryContinuationPrompt(params: StoryPromptParams): string {
    const { userProfile, moduleInfo, targetCountry, achievementsPrompt, previousContext, choice, history } = params;
    const levelGuidance = this.getLevelGuidance(userProfile.level, userProfile.readingLevel);

    return `
      [학습자 프로필]
      - 이름: ${userProfile.name}
      - 학습 수준: ${userProfile.level} ${levelGuidance}
      - 관심사: ${userProfile.interests.join(', ')}
      - 대상 국가 및 언어: ${targetCountry} (반드시 이 국가의 언어로 작성, JSON 키 제외)
      
      [현재 스토리 정보]
      주제: ${moduleInfo.title}
      이전 상황: ${previousContext}
      지금까지의 스토리 요약: ${history?.slice(-3).join(' -> ')}
      사용자의 선택: "${choice}"
      
      [지시사항]
      사용자의 선택에 따른 생생한 결과를 미연시 스타일로 작성해주세요.
      이 선택이 단원의 학습 포인트와 어떻게 연결되는지 'learningPoint'에 명시하세요.
      선택의 결과로 새로운 갈등이나 결정의 순간이 주어져야 합니다.
      중요: 응답 JSON의 "text" 필드 내용의 길이는 반드시 다음을 매우 엄격하게 따르세요:
      ${levelGuidance}
      
      ${achievementsPrompt}
      
      출력 형식은 이전과 동일한 JSON(consequence, text, imagePrompt, choices 등)을 준수하세요.
      진행에 따라 스토리를 마무리해야 할 경우 isEnding을 true로 설정하고, endingSummary에 전체 스토리를 통한 학습 요약이나 교훈을 작성해주세요.
    `;
  }
}
