export type SchoolLevel = 'elementary' | 'middle' | 'high';

export interface Achievement {
  id: string;
  name: string;
  desc: string;
  keyword: string;
  icon: string;
  color: string;
  bg: string;
}

export interface Module {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  achievements: Achievement[];
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  icon: string;
  colorTheme: string;
}

export interface SchoolCurriculum {
  SUBJECTS: Subject[];
  MODULES: Record<string, Module[]>;
}

export interface CountryCurriculum {
  elementary: SchoolCurriculum;
  middle: SchoolCurriculum;
  high: SchoolCurriculum;
}

// ─────────────────────────────────────────────
// 🇰🇷 한국 (KR) — 2022 개정 교육과정
// ─────────────────────────────────────────────
const krData: CountryCurriculum = {
  elementary: {
    SUBJECTS: [
      { id: 'social-studies', title: '사회', description: '우리 주변의 사회와 생활 모습을 알아봅니다.', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: '과학', description: '자연 현상을 관찰하고 탐구합니다.', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: '역사', description: '우리나라의 옛이야기와 문화유산을 배웁니다.', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'kr-e-soc-village', subjectId: 'social-studies', title: '우리 고장의 모습', description: '마을, 시청, 소방서 등 이웃과 관공서의 역할을 알아봅니다.', achievements: [{ id: 'village-explorer', name: '마을 탐험가', desc: '마을 탐험 스토리 완료', keyword: '마을', icon: 'Map', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'kr-e-soc-economy', subjectId: 'social-studies', title: '슬기로운 경제생활', description: '자원의 희소성과 합리적 소비 개념을 배웁니다.', achievements: [{ id: 'smart-consumer', name: '현명한 소비자', desc: '합리적 소비 스토리 완료', keyword: '소비', icon: 'Coins', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'kr-e-soc-culture', subjectId: 'social-studies', title: '다양한 문화와 생활', description: '다문화 사회의 이해와 존중하는 마음을 기릅니다.', achievements: [{ id: 'culture-explorer', name: '문화 탐험가', desc: '다문화 이해 스토리 완료', keyword: '문화', icon: 'Globe', color: 'text-indigo-500', bg: 'bg-indigo-100' }] },
        { id: 'kr-e-soc-safety', subjectId: 'social-studies', title: '안전한 생활', description: '교통안전, 화재 대피, 자연재해 행동요령을 익힙니다.', achievements: [{ id: 'safety-guard', name: '안전 지킴이', desc: '안전 수칙 스토리 완료', keyword: '안전', icon: 'Shield', color: 'text-green-500', bg: 'bg-green-100' }] }
      ],
      'science': [
        { id: 'kr-e-sci-lifecycle', subjectId: 'science', title: '동물과 식물의 한살이', description: '성장 과정과 생태계 기초를 탐구합니다.', achievements: [{ id: 'life-observer', name: '생명 관찰자', desc: '생물 성장 스토리 완료', keyword: '성장', icon: 'Leaf', color: 'text-green-500', bg: 'bg-green-100' }] },
        { id: 'kr-e-sci-volcano', subjectId: 'science', title: '화산과 지진', description: '지구 내부의 변화와 자연재해 대응을 배웁니다.', achievements: [{ id: 'earth-explorer', name: '지구 탐험대', desc: '화산 탐험 스토리 완료', keyword: '화산', icon: 'Mountain', color: 'text-orange-500', bg: 'bg-orange-100' }] },
        { id: 'kr-e-sci-weather', subjectId: 'science', title: '날씨와 물의 순환', description: '구름, 비, 눈이 만들어지는 과정을 알아봅니다.', achievements: [{ id: 'weather-master', name: '날씨 박사', desc: '날씨 탐구 스토리 완료', keyword: '날씨', icon: 'Cloud', color: 'text-cyan-500', bg: 'bg-cyan-100' }] },
        { id: 'kr-e-sci-magnet', subjectId: 'science', title: '자석과 전기의 세계', description: '자석의 성질과 간단한 전기 회로를 탐구합니다.', achievements: [{ id: 'little-inventor', name: '꼬마 발명가', desc: '전기 회로 스토리 완료', keyword: '전기', icon: 'Zap', color: 'text-amber-500', bg: 'bg-amber-100' }] }
      ],
      'history': [
        { id: 'kr-e-his-heroes', subjectId: 'history', title: '위인과 옛 문화', description: '세종대왕, 이순신 등 인물과 문화유산을 배웁니다.', achievements: [{ id: 'heritage-explorer', name: '문화유산 탐험가', desc: '위인 스토리 완료', keyword: '위인', icon: 'Crown', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'kr-e-his-gojoseon', subjectId: 'history', title: '고조선과 삼국시대', description: '단군 신화와 삼국의 성립 과정을 알아봅니다.', achievements: [{ id: 'founding-myth', name: '건국 신화', desc: '고조선 스토리 완료', keyword: '건국', icon: 'Castle', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'kr-e-his-culture', subjectId: 'history', title: '우리 문화재 이야기', description: '석굴암, 첨성대, 한글 등 문화재를 탐구합니다.', achievements: [{ id: 'culture-guardian', name: '문화재 지킴이', desc: '문화재 탐구 스토리 완료', keyword: '문화재', icon: 'Landmark', color: 'text-rose-500', bg: 'bg-rose-100' }] },
        { id: 'kr-e-his-traditions', subjectId: 'history', title: '옛날 사람들의 생활', description: '한복, 한옥, 전통 놀이와 세시 풍속을 체험합니다.', achievements: [{ id: 'tradition-exp', name: '전통 체험가', desc: '전통 문화 스토리 완료', keyword: '전통', icon: 'Home', color: 'text-orange-500', bg: 'bg-orange-100' }] }
      ]
    }
  },
  middle: {
    SUBJECTS: [
      { id: 'social-studies', title: '사회', description: '국가 기관, 인권, 세계 지리를 학습합니다.', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: '과학', description: '우주, 물질, 힘과 운동의 원리를 탐구합니다.', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: '역사', description: '고려~조선 시대의 역사를 심화 학습합니다.', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'kr-m-soc-gov', subjectId: 'social-studies', title: '국가 기관의 역할', description: '국회, 행정부, 법원의 삼권 분립 구조를 이해합니다.', achievements: [{ id: 'law-guardian', name: '법의 수호자', desc: '삼권분립 스토리 완료', keyword: '재판', icon: 'Scale', color: 'text-teal-500', bg: 'bg-teal-100' }] },
        { id: 'kr-m-soc-rights', subjectId: 'social-studies', title: '인권과 헌법 기초', description: '기본권의 종류와 인권 보장의 역사를 배웁니다.', achievements: [{ id: 'rights-scholar', name: '인권 탐구자', desc: '인권 스토리 완료', keyword: '인권', icon: 'Shield', color: 'text-purple-500', bg: 'bg-purple-100' }] },
        { id: 'kr-m-soc-geo', subjectId: 'social-studies', title: '세계의 지리와 기후', description: '기후대별 생활 모습과 지리적 특성을 탐구합니다.', achievements: [{ id: 'world-traveler', name: '세계 여행가', desc: '세계 지리 스토리 완료', keyword: '기후', icon: 'Globe', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'kr-m-soc-media', subjectId: 'social-studies', title: '미디어와 정보사회', description: '미디어 리터러시와 정보 윤리를 학습합니다.', achievements: [{ id: 'digital-citizen', name: '디지털 시민', desc: '미디어 리터러시 스토리 완료', keyword: '미디어', icon: 'Smartphone', color: 'text-indigo-500', bg: 'bg-indigo-100' }] }
      ],
      'science': [
        { id: 'kr-m-sci-solar', subjectId: 'science', title: '태양계와 우주', description: '행성의 특징과 일식·월식 현상을 탐험합니다.', achievements: [{ id: 'mars-explorer', name: '화성 탐사대', desc: '화성 탐사 스토리 완료', keyword: '화성', icon: 'Rocket', color: 'text-orange-500', bg: 'bg-orange-100' }] },
        { id: 'kr-m-sci-matter', subjectId: 'science', title: '물질의 상태 변화', description: '고체, 액체, 기체와 열에너지의 관계를 이해합니다.', achievements: [{ id: 'matter-researcher', name: '물질 연구원', desc: '상태 변화 스토리 완료', keyword: '물질', icon: 'FlaskConical', color: 'text-emerald-500', bg: 'bg-emerald-100' }] },
        { id: 'kr-m-sci-force', subjectId: 'science', title: '힘과 운동', description: '뉴턴의 운동 법칙과 관성, 가속도를 학습합니다.', achievements: [{ id: 'force-explorer', name: '역학 탐구자', desc: '힘과 운동 스토리 완료', keyword: '운동', icon: 'Zap', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'kr-m-sci-body', subjectId: 'science', title: '소화와 순환', description: '인체의 소화·순환·호흡 기관의 작동을 배웁니다.', achievements: [{ id: 'body-explorer', name: '인체 탐험가', desc: '인체 탐구 스토리 완료', keyword: '인체', icon: 'Heart', color: 'text-red-500', bg: 'bg-red-100' }] }
      ],
      'history': [
        { id: 'kr-m-his-goryeo', subjectId: 'history', title: '고려시대의 발전', description: '불교 문화와 다원적 외교 정책을 학습합니다.', achievements: [{ id: 'goryeo-diplomat', name: '고려 외교관', desc: '고려 외교 스토리 완료', keyword: '고려', icon: 'Scroll', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'kr-m-his-joseon1', subjectId: 'history', title: '조선의 건국과 발전', description: '유교 이념, 과거제, 양반 사회 구조를 배웁니다.', achievements: [{ id: 'joseon-scholar', name: '조선 학자', desc: '조선 건국 스토리 완료', keyword: '조선', icon: 'BookOpen', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'kr-m-his-imjin', subjectId: 'history', title: '임진왜란과 병자호란', description: '이순신의 활약과 외침 극복 과정을 알아봅니다.', achievements: [{ id: 'war-hero', name: '구국의 영웅', desc: '전쟁 극복 스토리 완료', keyword: '이순신', icon: 'Sword', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'kr-m-his-joseon2', subjectId: 'history', title: '조선 후기 사회 변동', description: '실학, 서민 문화, 사회 변화의 흐름을 탐구합니다.', achievements: [{ id: 'silhak-scholar', name: '실학자', desc: '조선 후기 스토리 완료', keyword: '실학', icon: 'Lightbulb', color: 'text-orange-500', bg: 'bg-orange-100' }] }
      ]
    }
  },
  high: {
    SUBJECTS: [
      { id: 'social-studies', title: '통합사회', description: '시장 경제, 헌법, 국제 관계를 심화 분석합니다.', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: '통합과학', description: '유전, 화학, 에너지, 지구과학을 심화 탐구합니다.', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: '한국사', description: '근현대사와 민주화 과정을 비판적으로 분석합니다.', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'kr-h-soc-market', subjectId: 'social-studies', title: '시장 경제와 금융', description: '수요·공급, 물가, 환율의 변동성을 분석합니다.', achievements: [{ id: 'tycoon', name: '거상', desc: '경제 분석 스토리 완료', keyword: '수익', icon: 'Coins', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'kr-h-soc-constitution', subjectId: 'social-studies', title: '헌법과 시민의 권리', description: '기본권, 기본의무, 헌법재판소를 학습합니다.', achievements: [{ id: 'constitution-guardian', name: '헌법 수호자', desc: '헌법 스토리 완료', keyword: '헌법', icon: 'Shield', color: 'text-purple-500', bg: 'bg-purple-100' }] },
        { id: 'kr-h-soc-global', subjectId: 'social-studies', title: '국제 관계와 한국 외교', description: '국제 정치 질서와 한반도 평화 과정을 분석합니다.', achievements: [{ id: 'diplomat', name: '외교 전문가', desc: '국제 관계 스토리 완료', keyword: '외교', icon: 'Globe', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'kr-h-soc-inequality', subjectId: 'social-studies', title: '사회 불평등과 복지', description: '빈곤, 양극화, 복지 국가 모델을 탐구합니다.', achievements: [{ id: 'social-analyst', name: '사회 분석가', desc: '복지 정책 스토리 완료', keyword: '복지', icon: 'Heart', color: 'text-rose-500', bg: 'bg-rose-100' }] }
      ],
      'science': [
        { id: 'kr-h-sci-genetics', subjectId: 'science', title: '유전과 진화', description: 'DNA, 유전자 발현, 다윈의 진화론을 학습합니다.', achievements: [{ id: 'geneticist', name: '유전학자', desc: '유전 스토리 완료', keyword: 'DNA', icon: 'Dna', color: 'text-emerald-500', bg: 'bg-emerald-100' }] },
        { id: 'kr-h-sci-chem', subjectId: 'science', title: '화학 결합과 반응', description: '원자 구조, 이온 결합, 공유 결합을 이해합니다.', achievements: [{ id: 'chem-master', name: '화학 마스터', desc: '화학 결합 스토리 완료', keyword: '화학', icon: 'FlaskConical', color: 'text-violet-500', bg: 'bg-violet-100' }] },
        { id: 'kr-h-sci-energy', subjectId: 'science', title: '에너지와 열역학', description: '에너지 보존 법칙과 열역학 기초를 탐구합니다.', achievements: [{ id: 'energy-expert', name: '에너지 전문가', desc: '열역학 스토리 완료', keyword: '에너지', icon: 'Flame', color: 'text-orange-500', bg: 'bg-orange-100' }] },
        { id: 'kr-h-sci-earth', subjectId: 'science', title: '지구 시스템과 기후변화', description: '판구조론, 대기 순환, 기후변화 대응을 학습합니다.', achievements: [{ id: 'earth-scientist', name: '지구과학자', desc: '지구과학 스토리 완료', keyword: '기후', icon: 'Globe', color: 'text-teal-500', bg: 'bg-teal-100' }] }
      ],
      'history': [
        { id: 'kr-h-his-reform', subjectId: 'history', title: '개항기와 근대화 운동', description: '강화도 조약부터 갑오개혁까지 분석합니다.', achievements: [{ id: 'reformer', name: '개화파 지식인', desc: '근대화 스토리 완료', keyword: '개항', icon: 'BookOpen', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'kr-h-his-colonial', subjectId: 'history', title: '일제강점기와 독립운동', description: '3·1운동, 임시정부, 독립 투쟁을 학습합니다.', achievements: [{ id: 'independence', name: '독립 투사', desc: '독립운동 스토리 완료', keyword: '독립', icon: 'Flag', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'kr-h-his-division', subjectId: 'history', title: '대한민국 수립과 6·25', description: '분단, 한국전쟁, 전후 복구 과정을 분석합니다.', achievements: [{ id: 'peace-keeper', name: '평화 수호자', desc: '한국전쟁 스토리 완료', keyword: '분단', icon: 'Shield', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'kr-h-his-democracy', subjectId: 'history', title: '민주화 운동과 현대 한국', description: '4·19, 5·18, 6월 항쟁과 민주주의 발전을 학습합니다.', achievements: [{ id: 'democracy-fighter', name: '민주화 운동가', desc: '민주화 스토리 완료', keyword: '민주화', icon: 'Users', color: 'text-indigo-500', bg: 'bg-indigo-100' }] }
      ]
    }
  }
};

// ─────────────────────────────────────────────
// 🇺🇸 미국 (US) — NGSS & C3 Framework
// ─────────────────────────────────────────────
const usData: CountryCurriculum = {
  elementary: {
    SUBJECTS: [
      { id: 'social-studies', title: 'Social Studies', description: 'Learn about communities, rules, and everyday life.', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: 'Science', description: 'Observe and explore the natural world around you.', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: 'US History', description: 'Discover America\'s symbols, heroes, and origins.', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'us-e-soc-community', subjectId: 'social-studies', title: 'Local Communities', description: 'Learn about community helpers like police officers and firefighters.', achievements: [{ id: 'comm-helper', name: 'Community Helper', desc: 'Complete a community story', keyword: 'community', icon: 'Users', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'us-e-soc-needs', subjectId: 'social-studies', title: 'Needs vs. Wants', description: 'Understand essentials versus luxuries and basic economics.', achievements: [{ id: 'smart-shopper', name: 'Smart Shopper', desc: 'Complete a shopping story', keyword: 'needs', icon: 'Coins', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'us-e-soc-maps', subjectId: 'social-studies', title: 'Maps and Geography', description: 'Learn to read maps, explore continents, and US regions.', achievements: [{ id: 'map-explorer', name: 'Map Explorer', desc: 'Complete a geography story', keyword: 'map', icon: 'Map', color: 'text-teal-500', bg: 'bg-teal-100' }] },
        { id: 'us-e-soc-rules', subjectId: 'social-studies', title: 'Rules and Laws', description: 'Discover why we have rules, from classroom to city laws.', achievements: [{ id: 'rule-maker', name: 'Rule Maker', desc: 'Complete a rules story', keyword: 'rules', icon: 'Shield', color: 'text-green-500', bg: 'bg-green-100' }] }
      ],
      'science': [
        { id: 'us-e-sci-weather', subjectId: 'science', title: 'Weather & Climate', description: 'Explore weather patterns and the water cycle.', achievements: [{ id: 'weather-watcher', name: 'Weather Watcher', desc: 'Complete a weather story', keyword: 'weather', icon: 'Cloud', color: 'text-cyan-500', bg: 'bg-cyan-100' }] },
        { id: 'us-e-sci-survival', subjectId: 'science', title: 'Plant & Animal Survival', description: 'Discover how living things adapt and survive.', achievements: [{ id: 'survival-expert', name: 'Survival Expert', desc: 'Complete a survival story', keyword: 'adapt', icon: 'Leaf', color: 'text-green-500', bg: 'bg-green-100' }] },
        { id: 'us-e-sci-matter', subjectId: 'science', title: 'States of Matter', description: 'Explore solids, liquids, gases and their properties.', achievements: [{ id: 'matter-master', name: 'Matter Master', desc: 'Complete a matter story', keyword: 'matter', icon: 'FlaskConical', color: 'text-purple-500', bg: 'bg-purple-100' }] },
        { id: 'us-e-sci-earth', subjectId: 'science', title: 'Rocks and Soil', description: 'Study types of rocks, soil layers, and erosion.', achievements: [{ id: 'rock-collector', name: 'Rock Collector', desc: 'Complete a geology story', keyword: 'rocks', icon: 'Mountain', color: 'text-stone-500', bg: 'bg-stone-100' }] }
      ],
      'history': [
        { id: 'us-e-his-symbols', subjectId: 'history', title: 'American Symbols & Holidays', description: 'Learn about the flag, Thanksgiving, and Independence Day.', achievements: [{ id: 'patriot', name: 'Patriot', desc: 'Complete a symbols story', keyword: 'flag', icon: 'Flag', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'us-e-his-native', subjectId: 'history', title: 'Native American Cultures', description: 'Explore indigenous peoples and their rich traditions.', achievements: [{ id: 'cultural-explorer', name: 'Cultural Explorer', desc: 'Complete a Native American story', keyword: 'native', icon: 'Compass', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'us-e-his-explorers', subjectId: 'history', title: 'Early Explorers', description: 'Discover Columbus, Vikings, and early voyages of discovery.', achievements: [{ id: 'explorer', name: 'Explorer', desc: 'Complete an exploration story', keyword: 'explore', icon: 'Ship', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'us-e-his-presidents', subjectId: 'history', title: 'Famous Presidents', description: 'Learn about Washington, Lincoln, and their legacies.', achievements: [{ id: 'history-buff', name: 'History Buff', desc: 'Complete a president story', keyword: 'president', icon: 'Crown', color: 'text-yellow-500', bg: 'bg-yellow-100' }] }
      ]
    }
  },
  middle: {
    SUBJECTS: [
      { id: 'social-studies', title: 'Civics & Government', description: 'Understand the structure of government and civic duties.', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: 'Science', description: 'Explore space, cells, forces, and ecosystems.', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: 'US History', description: 'Trace the growth of the nation from colonies to Civil War.', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'us-m-soc-branches', subjectId: 'social-studies', title: 'Branches of Government', description: 'Explore Legislative, Executive, and Judicial checks & balances.', achievements: [{ id: 'law-guardian', name: 'Guardian of Law', desc: 'Complete a government story', keyword: 'trial', icon: 'Scale', color: 'text-teal-500', bg: 'bg-teal-100' }] },
        { id: 'us-m-soc-rights', subjectId: 'social-studies', title: 'The Bill of Rights', description: 'Study the first 10 amendments and civil liberties.', achievements: [{ id: 'rights-defender', name: 'Rights Defender', desc: 'Complete a rights story', keyword: 'rights', icon: 'Shield', color: 'text-purple-500', bg: 'bg-purple-100' }] },
        { id: 'us-m-soc-economy', subjectId: 'social-studies', title: 'Supply and Demand', description: 'Understand market prices, competition, and consumer choices.', achievements: [{ id: 'market-analyst', name: 'Market Analyst', desc: 'Complete a market story', keyword: 'market', icon: 'Coins', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'us-m-soc-citizen', subjectId: 'social-studies', title: 'Active Citizenship', description: 'Learn about voting, civic duty, and community engagement.', achievements: [{ id: 'young-citizen', name: 'Young Citizen', desc: 'Complete a civic duty story', keyword: 'vote', icon: 'Users', color: 'text-indigo-500', bg: 'bg-indigo-100' }] }
      ],
      'science': [
        { id: 'us-m-sci-solar', subjectId: 'science', title: 'Solar System & Stars', description: 'Investigate planets, gravity, and the role of the Sun.', achievements: [{ id: 'mars-explorer', name: 'Mars Explorer', desc: 'Complete a space story', keyword: 'mars', icon: 'Rocket', color: 'text-orange-500', bg: 'bg-orange-100' }] },
        { id: 'us-m-sci-cells', subjectId: 'science', title: 'Cells and Life', description: 'Study cell structure, mitosis, and basic biology.', achievements: [{ id: 'cell-scientist', name: 'Cell Scientist', desc: 'Complete a cell biology story', keyword: 'cell', icon: 'Microscope', color: 'text-emerald-500', bg: 'bg-emerald-100' }] },
        { id: 'us-m-sci-force', subjectId: 'science', title: 'Forces and Motion', description: 'Learn Newton\'s laws, speed, and acceleration.', achievements: [{ id: 'physics-apprentice', name: 'Physics Apprentice', desc: 'Complete a physics story', keyword: 'force', icon: 'Zap', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'us-m-sci-eco', subjectId: 'science', title: 'Ecosystems & Food Webs', description: 'Explore producers, consumers, decomposers, and energy flow.', achievements: [{ id: 'eco-scout', name: 'Ecosystem Scout', desc: 'Complete an ecosystem story', keyword: 'ecosystem', icon: 'Leaf', color: 'text-green-500', bg: 'bg-green-100' }] }
      ],
      'history': [
        { id: 'us-m-his-colonies', subjectId: 'history', title: 'Thirteen Colonies', description: 'Explore the founding of 13 colonies and colonial life.', achievements: [{ id: 'colonial-pioneer', name: 'Colonial Pioneer', desc: 'Complete a colonial story', keyword: 'colony', icon: 'Flag', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'us-m-his-revolution', subjectId: 'history', title: 'American Revolution', description: 'Discover the Founding Fathers and the Declaration of Independence.', achievements: [{ id: 'founding-father', name: 'Founding Father', desc: 'Complete a revolution story', keyword: 'independence', icon: 'Crown', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'us-m-his-expansion', subjectId: 'history', title: 'Westward Expansion', description: 'Follow Manifest Destiny, Lewis & Clark, and the Oregon Trail.', achievements: [{ id: 'frontier-pioneer', name: 'Frontier Pioneer', desc: 'Complete an expansion story', keyword: 'frontier', icon: 'Compass', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'us-m-his-civilwar', subjectId: 'history', title: 'The Civil War', description: 'Study the North vs. South conflict and abolition of slavery.', achievements: [{ id: 'union-defender', name: 'Union Defender', desc: 'Complete a Civil War story', keyword: 'union', icon: 'Sword', color: 'text-red-500', bg: 'bg-red-100' }] }
      ]
    }
  },
  high: {
    SUBJECTS: [
      { id: 'social-studies', title: 'AP Government & Economics', description: 'Analyze the electoral system, macroeconomics, and foreign policy.', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: 'Advanced Science', description: 'Deep dive into chemistry, genetics, energy, and astrophysics.', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: 'AP US History', description: 'Critically analyze Reconstruction through the Cold War.', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'us-h-soc-electoral', subjectId: 'social-studies', title: 'The Electoral College', description: 'Analyze the presidential election system and federalism.', achievements: [{ id: 'political-analyst', name: 'Political Analyst', desc: 'Complete an election story', keyword: 'election', icon: 'Scale', color: 'text-teal-500', bg: 'bg-teal-100' }] },
        { id: 'us-h-soc-macro', subjectId: 'social-studies', title: 'Macroeconomics', description: 'Study inflation, the Federal Reserve, and monetary policy.', achievements: [{ id: 'fed-chairman', name: 'Fed Chairman', desc: 'Complete a macroeconomics story', keyword: 'inflation', icon: 'Coins', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'us-h-soc-foreign', subjectId: 'social-studies', title: 'US Foreign Policy', description: 'Examine NATO, the UN, and America\'s global role.', achievements: [{ id: 'diplomat', name: 'Diplomat', desc: 'Complete a diplomacy story', keyword: 'NATO', icon: 'Globe', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'us-h-soc-justice', subjectId: 'social-studies', title: 'Criminal Justice System', description: 'Study courts, due process, and landmark Supreme Court cases.', achievements: [{ id: 'justice-scholar', name: 'Justice Scholar', desc: 'Complete a justice story', keyword: 'justice', icon: 'Scale', color: 'text-purple-500', bg: 'bg-purple-100' }] }
      ],
      'science': [
        { id: 'us-h-sci-chem', subjectId: 'science', title: 'Chemical Reactions & Bonding', description: 'Explore chemical bonds, reactions, and stoichiometry.', achievements: [{ id: 'chemistry-pro', name: 'Chemistry Pro', desc: 'Complete a chemistry story', keyword: 'bond', icon: 'FlaskConical', color: 'text-violet-500', bg: 'bg-violet-100' }] },
        { id: 'us-h-sci-dna', subjectId: 'science', title: 'Genetics & DNA', description: 'Study DNA, CRISPR, heredity, and gene expression.', achievements: [{ id: 'gene-pioneer', name: 'Gene Pioneer', desc: 'Complete a genetics story', keyword: 'DNA', icon: 'Dna', color: 'text-emerald-500', bg: 'bg-emerald-100' }] },
        { id: 'us-h-sci-energy', subjectId: 'science', title: 'Energy & Thermodynamics', description: 'Master conservation of energy, entropy, and heat transfer.', achievements: [{ id: 'energy-expert', name: 'Energy Expert', desc: 'Complete a thermodynamics story', keyword: 'energy', icon: 'Flame', color: 'text-orange-500', bg: 'bg-orange-100' }] },
        { id: 'us-h-sci-astro', subjectId: 'science', title: 'Astrophysics & Cosmology', description: 'Explore black holes, the Big Bang, and stellar evolution.', achievements: [{ id: 'astrophysicist', name: 'Astrophysicist', desc: 'Complete an astrophysics story', keyword: 'cosmos', icon: 'Star', color: 'text-indigo-500', bg: 'bg-indigo-100' }] }
      ],
      'history': [
        { id: 'us-h-his-reconstruction', subjectId: 'history', title: 'Reconstruction Era', description: 'Analyze post-Civil War rebuilding and the 13th–15th Amendments.', achievements: [{ id: 'rebuilder', name: 'Rebuilder', desc: 'Complete a Reconstruction story', keyword: 'reconstruct', icon: 'Building', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'us-h-his-worldwars', subjectId: 'history', title: 'World Wars I & II', description: 'Study American involvement: Pearl Harbor, D-Day, and beyond.', achievements: [{ id: 'war-historian', name: 'War Historian', desc: 'Complete a World War story', keyword: 'war', icon: 'Medal', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'us-h-his-civilrights', subjectId: 'history', title: 'Civil Rights Movement', description: 'Study MLK Jr., Rosa Parks, and the fight for equality.', achievements: [{ id: 'freedom-fighter', name: 'Freedom Fighter', desc: 'Complete a civil rights story', keyword: 'equality', icon: 'Users', color: 'text-indigo-500', bg: 'bg-indigo-100' }] },
        { id: 'us-h-his-coldwar', subjectId: 'history', title: 'Cold War & Modern Era', description: 'Analyze the nuclear arms race, space race, and fall of the USSR.', achievements: [{ id: 'cold-war-analyst', name: 'Cold War Analyst', desc: 'Complete a Cold War story', keyword: 'coldwar', icon: 'Rocket', color: 'text-slate-500', bg: 'bg-slate-100' }] }
      ]
    }
  }
};

// ─────────────────────────────────────────────
// 🇯🇵 일본 (JP) — 文部科学省 学習指導要領
// ─────────────────────────────────────────────
const jpData: CountryCurriculum = {
  elementary: {
    SUBJECTS: [
      { id: 'social-studies', title: '社会', description: '私たちの住む地域と社会のしくみを学びます。', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: '理科', description: '自然のふしぎを観察し探求します。', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: '歴史', description: '日本の昔の人物と文化を学びます。', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'jp-e-soc-town', subjectId: 'social-studies', title: '私たちの町のくらし', description: '地域の商業・交通・農業について学びます。', achievements: [{ id: 'town-explorer', name: '町の探検家', desc: '町探検ストーリー完了', keyword: '町', icon: 'Map', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'jp-e-soc-disaster', subjectId: 'social-studies', title: '自然災害と防災', description: '地震・台風の要因と防災の行動を学びます。', achievements: [{ id: 'disaster-master', name: '防災マスター', desc: '防災ストーリー完了', keyword: '防災', icon: 'Shield', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'jp-e-soc-water', subjectId: 'social-studies', title: '水とくらし', description: '上水道・下水道のしくみと水の大切さ。', achievements: [{ id: 'water-doctor', name: '水の博士', desc: '水のストーリー完了', keyword: '水', icon: 'Droplets', color: 'text-cyan-500', bg: 'bg-cyan-100' }] },
        { id: 'jp-e-soc-helper', subjectId: 'social-studies', title: '町で働く人々', description: '農家・工場・消防士など地域の仕事を知ります。', achievements: [{ id: 'job-explorer', name: 'お仕事探検家', desc: 'お仕事ストーリー完了', keyword: '仕事', icon: 'Users', color: 'text-green-500', bg: 'bg-green-100' }] }
      ],
      'science': [
        { id: 'jp-e-sci-insects', subjectId: 'science', title: '昆虫と植物の観察', description: '生物の成長サイクルを探求します。', achievements: [{ id: 'creature-doctor', name: '生き物博士', desc: '昆虫観察ストーリー完了', keyword: '昆虫', icon: 'Leaf', color: 'text-green-500', bg: 'bg-green-100' }] },
        { id: 'jp-e-sci-light', subjectId: 'science', title: '光と音の性質', description: '反射・屈折・音の伝わり方を学びます。', achievements: [{ id: 'light-master', name: '光のマスター', desc: '光と音ストーリー完了', keyword: '光', icon: 'Lightbulb', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'jp-e-sci-magnet', subjectId: 'science', title: '磁石と電気', description: '磁石の極と簡単な回路を学びます。', achievements: [{ id: 'electric-doctor', name: '電気博士', desc: '電気ストーリー完了', keyword: '電気', icon: 'Zap', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'jp-e-sci-stars', subjectId: 'science', title: '月と星の観察', description: '月の満ち欠けと星座の観察をします。', achievements: [{ id: 'star-observer', name: '星の観察者', desc: '星座ストーリー完了', keyword: '月', icon: 'Moon', color: 'text-indigo-500', bg: 'bg-indigo-100' }] }
      ],
      'history': [
        { id: 'jp-e-his-asuka', subjectId: 'history', title: '飛鳥・奈良時代', description: '聖徳太子と古代日本の始まりを学びます。', achievements: [{ id: 'ancient-wisdom', name: '古代の知恵', desc: '古代史ストーリー完了', keyword: '聖徳太子', icon: 'Crown', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'jp-e-his-heian', subjectId: 'history', title: '平安時代の貴族文化', description: '源氏物語と貴族の暮らしを学びます。', achievements: [{ id: 'heian-noble', name: '平安貴族', desc: '平安ストーリー完了', keyword: '貴族', icon: 'Scroll', color: 'text-pink-500', bg: 'bg-pink-100' }] },
        { id: 'jp-e-his-samurai', subjectId: 'history', title: '武士の誕生', description: '源平合戦と鎌倉幕府の成立を学びます。', achievements: [{ id: 'samurai-honor', name: '武士の誉れ', desc: '武士ストーリー完了', keyword: '武士', icon: 'Sword', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'jp-e-his-culture', subjectId: 'history', title: '日本の伝統文化', description: '茶道・書道・祭りなど伝統文化を体験します。', achievements: [{ id: 'culture-master', name: '文化の達人', desc: '伝統文化ストーリー完了', keyword: '伝統', icon: 'Home', color: 'text-orange-500', bg: 'bg-orange-100' }] }
      ]
    }
  },
  middle: {
    SUBJECTS: [
      { id: 'social-studies', title: '公民', description: '国の政治のしくみと経済を学びます。', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: '理科', description: '宇宙・物質・人体・電気を探求します。', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: '日本史', description: '戦国時代から幕末までの歴史を学びます。', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'jp-m-soc-gov', subjectId: 'social-studies', title: '国会・内閣・裁判所', description: '議院内閣制の構造と三権分立を理解します。', achievements: [{ id: 'law-guardian', name: '法の守護者', desc: '三権分立ストーリー完了', keyword: '裁判', icon: 'Scale', color: 'text-teal-500', bg: 'bg-teal-100' }] },
        { id: 'jp-m-soc-economy', subjectId: 'social-studies', title: '市場経済のしくみ', description: '価格の決まり方と消費者の権利を学びます。', achievements: [{ id: 'economy-explorer', name: '経済探究者', desc: '経済ストーリー完了', keyword: '経済', icon: 'Coins', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'jp-m-soc-local', subjectId: 'social-studies', title: '地方自治と住民参加', description: '都道府県と市町村の役割を学びます。', achievements: [{ id: 'local-gov-master', name: '自治の達人', desc: '地方自治ストーリー完了', keyword: '自治', icon: 'Landmark', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'jp-m-soc-media', subjectId: 'social-studies', title: '情報社会とメディア', description: '情報リテラシーとSNSの問題を考えます。', achievements: [{ id: 'media-master', name: 'メディアマスター', desc: 'メディアストーリー完了', keyword: 'メディア', icon: 'Smartphone', color: 'text-indigo-500', bg: 'bg-indigo-100' }] }
      ],
      'science': [
        { id: 'jp-m-sci-solar', subjectId: 'science', title: '太陽系と星', description: '惑星の特徴と宇宙の神秘を探検します。', achievements: [{ id: 'mars-explorer', name: '火星探査隊', desc: '宇宙探検ストーリー完了', keyword: '火星', icon: 'Rocket', color: 'text-orange-500', bg: 'bg-orange-100' }] },
        { id: 'jp-m-sci-matter', subjectId: 'science', title: '物質の状態変化', description: '分子の運動と温度・圧力の関係を学びます。', achievements: [{ id: 'matter-researcher', name: '物質研究者', desc: '状態変化ストーリー完了', keyword: '物質', icon: 'FlaskConical', color: 'text-emerald-500', bg: 'bg-emerald-100' }] },
        { id: 'jp-m-sci-human', subjectId: 'science', title: 'ヒトの体のしくみ', description: '消化・呼吸・血液循環を学びます。', achievements: [{ id: 'body-explorer', name: '人体探検家', desc: '人体ストーリー完了', keyword: '人体', icon: 'Heart', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'jp-m-sci-current', subjectId: 'science', title: '電流と磁界', description: 'オームの法則と電磁誘導を学びます。', achievements: [{ id: 'electric-master', name: '電気の達人', desc: '電気ストーリー完了', keyword: '電流', icon: 'Zap', color: 'text-amber-500', bg: 'bg-amber-100' }] }
      ],
      'history': [
        { id: 'jp-m-his-sengoku', subjectId: 'history', title: '戦国時代と統一', description: '織田信長・豊臣秀吉の天下統一を学びます。', achievements: [{ id: 'unification', name: '天下統一', desc: '戦国ストーリー完了', keyword: '統一', icon: 'Sword', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'jp-m-his-edo', subjectId: 'history', title: '江戸幕府と鎖国', description: '鎖国政策と260年の平和を学びます。', achievements: [{ id: 'edo-merchant', name: '江戸の商人', desc: '江戸ストーリー完了', keyword: '江戸', icon: 'Castle', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'jp-m-his-culture-edo', subjectId: 'history', title: '江戸の文化と学問', description: '歌舞伎・浮世絵と国学・蘭学を学びます。', achievements: [{ id: 'culture-explorer', name: '文化の探究者', desc: '江戸文化ストーリー完了', keyword: '文化', icon: 'BookOpen', color: 'text-purple-500', bg: 'bg-purple-100' }] },
        { id: 'jp-m-his-bakumatsu', subjectId: 'history', title: '幕末と開国', description: 'ペリー来航から大政奉還までを学びます。', achievements: [{ id: 'bakumatsu-shishi', name: '幕末の志士', desc: '幕末ストーリー完了', keyword: '開国', icon: 'Ship', color: 'text-blue-500', bg: 'bg-blue-100' }] }
      ]
    }
  },
  high: {
    SUBJECTS: [
      { id: 'social-studies', title: '公共', description: '日本国憲法、少子高齢化、国際関係を分析します。', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: '理科総合', description: '地質学、遺伝学、化学、波動を深く学びます。', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: '日本史探究', description: '明治維新から現代日本までを批判的に分析します。', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'jp-h-soc-constitution', subjectId: 'social-studies', title: '日本国憲法と平和主義', description: '憲法9条と国際社会への貢献を学びます。', achievements: [{ id: 'peace-messenger', name: '平和の使者', desc: '憲法ストーリー完了', keyword: '平和', icon: 'Shield', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'jp-h-soc-aging', subjectId: 'social-studies', title: '少子高齢化と福祉', description: '人口構造の変化と社会保障を分析します。', achievements: [{ id: 'welfare-expert', name: '福祉の専門家', desc: '福祉ストーリー完了', keyword: '高齢化', icon: 'Heart', color: 'text-rose-500', bg: 'bg-rose-100' }] },
        { id: 'jp-h-soc-global', subjectId: 'social-studies', title: '国際政治と日本の役割', description: '国連・ASEAN・日米同盟を学びます。', achievements: [{ id: 'internationalist', name: '国際人', desc: '国際政治ストーリー完了', keyword: '国際', icon: 'Globe', color: 'text-teal-500', bg: 'bg-teal-100' }] },
        { id: 'jp-h-soc-bioethics', subjectId: 'social-studies', title: '現代社会の倫理的課題', description: '生命倫理・情報倫理・環境倫理を考えます。', achievements: [{ id: 'ethics-explorer', name: '倫理探究者', desc: '倫理ストーリー完了', keyword: '倫理', icon: 'Brain', color: 'text-purple-500', bg: 'bg-purple-100' }] }
      ],
      'science': [
        { id: 'jp-h-sci-plate', subjectId: 'science', title: '地震と火山活動', description: '日本列島のプレートテクトニクスを学びます。', achievements: [{ id: 'geologist', name: '地質学者', desc: '地質学ストーリー完了', keyword: '地震', icon: 'Mountain', color: 'text-orange-500', bg: 'bg-orange-100' }] },
        { id: 'jp-h-sci-cell', subjectId: 'science', title: '細胞生物学と遺伝', description: 'メンデルの法則と体細胞分裂を学びます。', achievements: [{ id: 'geneticist', name: '遺伝学者', desc: '遺伝学ストーリー完了', keyword: '遺伝', icon: 'Dna', color: 'text-emerald-500', bg: 'bg-emerald-100' }] },
        { id: 'jp-h-sci-chem', subjectId: 'science', title: '化学反応と周期表', description: '原子構造・イオン・化学平衡を理解します。', achievements: [{ id: 'chem-master', name: '化学マスター', desc: '化学ストーリー完了', keyword: '原子', icon: 'FlaskConical', color: 'text-violet-500', bg: 'bg-violet-100' }] },
        { id: 'jp-h-sci-wave', subjectId: 'science', title: '波動と光', description: '波の性質・干渉・回折を探求します。', achievements: [{ id: 'wave-master', name: '波動の達人', desc: '波動ストーリー完了', keyword: '波', icon: 'Radio', color: 'text-cyan-500', bg: 'bg-cyan-100' }] }
      ],
      'history': [
        { id: 'jp-h-his-meiji', subjectId: 'history', title: '明治維新と近代化', description: '日本の近代化と産業発展を分析します。', achievements: [{ id: 'meiji-shishi', name: '維新の志士', desc: '明治維新ストーリー完了', keyword: '維新', icon: 'Factory', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'jp-h-his-taisho', subjectId: 'history', title: '大正デモクラシー', description: '民主主義運動と政党政治の発展を学びます。', achievements: [{ id: 'democracy-pioneer', name: '民主の先駆者', desc: 'デモクラシーストーリー完了', keyword: '民主', icon: 'Users', color: 'text-indigo-500', bg: 'bg-indigo-100' }] },
        { id: 'jp-h-his-showa', subjectId: 'history', title: '昭和と太平洋戦争', description: '軍国主義の台頭と終戦を分析します。', achievements: [{ id: 'showa-witness', name: '昭和の証人', desc: '昭和ストーリー完了', keyword: '昭和', icon: 'BookOpen', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'jp-h-his-postwar', subjectId: 'history', title: '戦後復興と現代日本', description: '経済成長と憲法の下での再建を学びます。', achievements: [{ id: 'postwar-hero', name: '復興の立役者', desc: '戦後復興ストーリー完了', keyword: '復興', icon: 'Building', color: 'text-green-500', bg: 'bg-green-100' }] }
      ]
    }
  }
};

// ─────────────────────────────────────────────
// 🇬🇧 영국 (GB) — England National Curriculum
// ─────────────────────────────────────────────
const gbData: CountryCurriculum = {
  elementary: {
    SUBJECTS: [
      { id: 'social-studies', title: 'Citizenship', description: 'Learn about rules, communities, and living in the UK.', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: 'Science', description: 'Observe plants, animals, materials, and seasons.', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: 'History', description: 'Explore ancient Britain, the Romans, and the Great Fire.', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'gb-e-soc-rules', subjectId: 'social-studies', title: 'Rules and Responsibilities', description: 'Learn about rules in school and in the UK.', achievements: [{ id: 'rule-keeper', name: 'Rule Keeper', desc: 'Complete a rules story', keyword: 'rules', icon: 'Shield', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'gb-e-soc-living', subjectId: 'social-studies', title: 'Living in the UK', description: 'Explore UK geography and local communities.', achievements: [{ id: 'uk-explorer', name: 'UK Explorer', desc: 'Complete a UK geography story', keyword: 'community', icon: 'Map', color: 'text-teal-500', bg: 'bg-teal-100' }] },
        { id: 'gb-e-soc-money', subjectId: 'social-studies', title: 'Money and Saving', description: 'Basics of money, earning, and saving.', achievements: [{ id: 'piggy-banker', name: 'Piggy Banker', desc: 'Complete a money story', keyword: 'money', icon: 'Coins', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'gb-e-soc-diversity', subjectId: 'social-studies', title: 'People Around Us', description: 'Celebrate cultural diversity and respect for others.', achievements: [{ id: 'community-friend', name: 'Community Friend', desc: 'Complete a diversity story', keyword: 'respect', icon: 'Users', color: 'text-green-500', bg: 'bg-green-100' }] }
      ],
      'science': [
        { id: 'gb-e-sci-plants', subjectId: 'science', title: 'Plants and Life Cycles', description: 'Study plant structure and basics of photosynthesis.', achievements: [{ id: 'plant-scientist', name: 'Plant Scientist', desc: 'Complete a plants story', keyword: 'plant', icon: 'Leaf', color: 'text-green-500', bg: 'bg-green-100' }] },
        { id: 'gb-e-sci-materials', subjectId: 'science', title: 'Materials and Properties', description: 'Explore materials, magnets, and physical properties.', achievements: [{ id: 'material-master', name: 'Material Master', desc: 'Complete a materials story', keyword: 'magnet', icon: 'Zap', color: 'text-purple-500', bg: 'bg-purple-100' }] },
        { id: 'gb-e-sci-animals', subjectId: 'science', title: 'Animals Including Humans', description: 'Learn about animal groups, habitats, and food chains.', achievements: [{ id: 'animal-expert', name: 'Animal Expert', desc: 'Complete an animals story', keyword: 'animal', icon: 'PawPrint', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'gb-e-sci-seasons', subjectId: 'science', title: 'Seasons and Weather', description: 'Discover seasonal changes and weather patterns.', achievements: [{ id: 'season-tracker', name: 'Season Tracker', desc: 'Complete a seasons story', keyword: 'season', icon: 'Sun', color: 'text-orange-500', bg: 'bg-orange-100' }] }
      ],
      'history': [
        { id: 'gb-e-his-fire', subjectId: 'history', title: 'The Great Fire of London', description: 'Discover the Great Fire and how it changed London.', achievements: [{ id: 'fire-historian', name: 'Fire Historian', desc: 'Complete a Great Fire story', keyword: 'fire', icon: 'Flame', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'gb-e-his-stone', subjectId: 'history', title: 'Stone Age to Iron Age', description: 'Explore prehistoric Britain and early settlements.', achievements: [{ id: 'ancient-briton', name: 'Ancient Briton', desc: 'Complete a prehistoric story', keyword: 'stone', icon: 'Mountain', color: 'text-stone-500', bg: 'bg-stone-100' }] },
        { id: 'gb-e-his-romans', subjectId: 'history', title: 'The Romans in Britain', description: 'Explore Roman conquest, roads, and Hadrian\'s Wall.', achievements: [{ id: 'roman-scholar', name: 'Roman Scholar', desc: 'Complete a Romans story', keyword: 'Roman', icon: 'Landmark', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'gb-e-his-vikings', subjectId: 'history', title: 'Vikings and Anglo-Saxons', description: 'Discover Viking invasions and Anglo-Saxon kingdoms.', achievements: [{ id: 'viking-voyager', name: 'Viking Voyager', desc: 'Complete a Viking story', keyword: 'Viking', icon: 'Sword', color: 'text-blue-500', bg: 'bg-blue-100' }] }
      ]
    }
  },
  middle: {
    SUBJECTS: [
      { id: 'social-studies', title: 'Citizenship', description: 'Study Parliament, law, democracy, and British identity.', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: 'Science', description: 'Explore forces, cells, chemical reactions, and energy.', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: 'British History', description: 'From medieval England to the Age of Exploration.', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'gb-m-soc-parliament', subjectId: 'social-studies', title: 'Parliament & Government', description: 'Understand the Westminster system and cabinet responsibility.', achievements: [{ id: 'law-guardian', name: 'Guardian of Law', desc: 'Complete a Parliament story', keyword: 'trial', icon: 'Scale', color: 'text-teal-500', bg: 'bg-teal-100' }] },
        { id: 'gb-m-soc-law', subjectId: 'social-studies', title: 'Law and Justice', description: 'How laws are made and the court system works.', achievements: [{ id: 'legal-eagle', name: 'Legal Eagle', desc: 'Complete a law story', keyword: 'law', icon: 'Scale', color: 'text-purple-500', bg: 'bg-purple-100' }] },
        { id: 'gb-m-soc-democracy', subjectId: 'social-studies', title: 'Democracy and Voting', description: 'Learn about elections, parties, and democratic participation.', achievements: [{ id: 'young-voter', name: 'Young Voter', desc: 'Complete a democracy story', keyword: 'vote', icon: 'Users', color: 'text-indigo-500', bg: 'bg-indigo-100' }] },
        { id: 'gb-m-soc-identity', subjectId: 'social-studies', title: 'British Identity & Diversity', description: 'Explore multiculturalism and identity in modern Britain.', achievements: [{ id: 'identity-explorer', name: 'Identity Explorer', desc: 'Complete an identity story', keyword: 'identity', icon: 'Globe', color: 'text-blue-500', bg: 'bg-blue-100' }] }
      ],
      'science': [
        { id: 'gb-m-sci-forces', subjectId: 'science', title: 'Forces and Motion', description: 'Study Isaac Newton and classical mechanics.', achievements: [{ id: 'physics-pioneer', name: 'Physics Pioneer', desc: 'Complete a forces story', keyword: 'Newton', icon: 'Zap', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'gb-m-sci-cells', subjectId: 'science', title: 'Cells and Organisation', description: 'Explore cell structure, tissues, organs, and organ systems.', achievements: [{ id: 'cell-explorer', name: 'Cell Explorer', desc: 'Complete a cells story', keyword: 'cell', icon: 'Microscope', color: 'text-emerald-500', bg: 'bg-emerald-100' }] },
        { id: 'gb-m-sci-reactions', subjectId: 'science', title: 'Chemical Reactions', description: 'Study acids, alkalis, metals, and chemical change.', achievements: [{ id: 'lab-scientist', name: 'Lab Scientist', desc: 'Complete a chemistry story', keyword: 'reaction', icon: 'FlaskConical', color: 'text-violet-500', bg: 'bg-violet-100' }] },
        { id: 'gb-m-sci-energy', subjectId: 'science', title: 'Energy Transfers', description: 'Learn about types of energy, conservation, and efficiency.', achievements: [{ id: 'energy-tracker', name: 'Energy Tracker', desc: 'Complete an energy story', keyword: 'energy', icon: 'Flame', color: 'text-orange-500', bg: 'bg-orange-100' }] }
      ],
      'history': [
        { id: 'gb-m-his-medieval', subjectId: 'history', title: 'Medieval England', description: 'Study feudalism, castles, and the Magna Carta.', achievements: [{ id: 'medieval-knight', name: 'Medieval Knight', desc: 'Complete a medieval story', keyword: 'knight', icon: 'Castle', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'gb-m-his-tudors', subjectId: 'history', title: 'Tudors & Stuarts', description: 'Explore Henry VIII, the Reformation, and Elizabeth I.', achievements: [{ id: 'royal-crown', name: 'Royal Crown', desc: 'Complete a Tudors story', keyword: 'crown', icon: 'Crown', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'gb-m-his-empire', subjectId: 'history', title: 'The Age of Exploration', description: 'Discover Drake, Raleigh, and the rise of the British Empire.', achievements: [{ id: 'empire-explorer', name: 'Empire Explorer', desc: 'Complete an exploration story', keyword: 'empire', icon: 'Ship', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'gb-m-his-slavery', subjectId: 'history', title: 'The Slave Trade & Abolition', description: 'Study the triangular trade, abolitionists, and emancipation.', achievements: [{ id: 'abolitionist', name: 'Abolitionist', desc: 'Complete an abolition story', keyword: 'freedom', icon: 'Users', color: 'text-indigo-500', bg: 'bg-indigo-100' }] }
      ]
    }
  },
  high: {
    SUBJECTS: [
      { id: 'social-studies', title: 'Politics & Economics', description: 'Analyze the UK economy, human rights, and devolution.', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: 'Combined Science', description: 'Advanced genetics, atomic structure, waves, and ecology.', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: 'Modern History', description: 'From the Industrial Revolution to post-war Britain.', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'gb-h-soc-economy', subjectId: 'social-studies', title: 'UK Economy & Global Trade', description: 'Analyze London as a financial center and the impact of Brexit.', achievements: [{ id: 'trade-analyst', name: 'Trade Analyst', desc: 'Complete an economy story', keyword: 'trade', icon: 'Coins', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'gb-h-soc-rights', subjectId: 'social-studies', title: 'Human Rights & International Law', description: 'From Magna Carta to the European Convention on Human Rights.', achievements: [{ id: 'rights-defender', name: 'Rights Defender', desc: 'Complete a rights story', keyword: 'rights', icon: 'Shield', color: 'text-purple-500', bg: 'bg-purple-100' }] },
        { id: 'gb-h-soc-welfare', subjectId: 'social-studies', title: 'The Welfare State', description: 'Study the NHS, social security, and Beveridge Report legacy.', achievements: [{ id: 'welfare-scholar', name: 'Welfare Scholar', desc: 'Complete a welfare story', keyword: 'welfare', icon: 'Heart', color: 'text-rose-500', bg: 'bg-rose-100' }] },
        { id: 'gb-h-soc-devolution', subjectId: 'social-studies', title: 'Devolution & UK Structure', description: 'Study Scotland, Wales, NI assemblies, and federalism debates.', achievements: [{ id: 'devolution-expert', name: 'Devolution Expert', desc: 'Complete a devolution story', keyword: 'devolution', icon: 'Globe', color: 'text-blue-500', bg: 'bg-blue-100' }] }
      ],
      'science': [
        { id: 'gb-h-sci-genetics', subjectId: 'science', title: 'Genetics & Evolution', description: 'Study Darwin\'s theory, natural selection, and genetics.', achievements: [{ id: 'evolution-expert', name: 'Evolution Expert', desc: 'Complete a genetics story', keyword: 'evolution', icon: 'Dna', color: 'text-emerald-500', bg: 'bg-emerald-100' }] },
        { id: 'gb-h-sci-atoms', subjectId: 'science', title: 'Atomic Structure & Periodic Table', description: 'Explore atomic models, electron configuration, and periodicity.', achievements: [{ id: 'atom-explorer', name: 'Atom Explorer', desc: 'Complete an atomic story', keyword: 'atom', icon: 'Atom', color: 'text-violet-500', bg: 'bg-violet-100' }] },
        { id: 'gb-h-sci-waves', subjectId: 'science', title: 'Waves & EM Spectrum', description: 'Study the EM spectrum, radiation, and communication tech.', achievements: [{ id: 'wave-physicist', name: 'Wave Physicist', desc: 'Complete a waves story', keyword: 'wave', icon: 'Radio', color: 'text-cyan-500', bg: 'bg-cyan-100' }] },
        { id: 'gb-h-sci-ecology', subjectId: 'science', title: 'Ecology & Biodiversity', description: 'Explore ecosystems, biodiversity loss, and climate science.', achievements: [{ id: 'ecology-guardian', name: 'Ecology Guardian', desc: 'Complete an ecology story', keyword: 'ecology', icon: 'Trees', color: 'text-green-500', bg: 'bg-green-100' }] }
      ],
      'history': [
        { id: 'gb-h-his-industrial', subjectId: 'history', title: 'The Industrial Revolution', description: 'Analyze the birthplace of industrialization and social change.', achievements: [{ id: 'industrial-pioneer', name: 'Industrial Pioneer', desc: 'Complete an Industrial Revolution story', keyword: 'industry', icon: 'Factory', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'gb-h-his-victorian', subjectId: 'history', title: 'Victorian Britain', description: 'Study the Victorian era, social reform, and the Empire.', achievements: [{ id: 'victorian-scholar', name: 'Victorian Scholar', desc: 'Complete a Victorian story', keyword: 'Victorian', icon: 'Crown', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'gb-h-his-worldwars', subjectId: 'history', title: 'Britain in the World Wars', description: 'Analyze WWI trenches, WWII Blitz, and Churchill\'s leadership.', achievements: [{ id: 'war-historian', name: 'War Historian', desc: 'Complete a world wars story', keyword: 'war', icon: 'Medal', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'gb-h-his-modern', subjectId: 'history', title: 'Post-War Britain', description: 'Study decolonization, immigration, and modern Commonwealth.', achievements: [{ id: 'commonwealth-analyst', name: 'Commonwealth Analyst', desc: 'Complete a post-war story', keyword: 'commonwealth', icon: 'Globe', color: 'text-indigo-500', bg: 'bg-indigo-100' }] }
      ]
    }
  }
};

// ─────────────────────────────────────────────
// 🇫🇷 프랑스 (FR) — Éducation nationale / EMC 2024
// ─────────────────────────────────────────────
const frData: CountryCurriculum = {
  elementary: {
    SUBJECTS: [
      { id: 'social-studies', title: 'Éducation Civique', description: 'Apprends les règles de la vie en société et la République.', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: 'Sciences', description: 'Observe le vivant, la matière et le corps humain.', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: 'Histoire de France', description: 'Découvre les Gaulois, le Moyen Âge et les chevaliers.', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'fr-e-soc-commune', subjectId: 'social-studies', title: 'La Commune et ses Règles', description: 'Découvrez les règles de vie en communauté et à l\'école.', achievements: [{ id: 'model-citizen', name: 'Citoyen Modèle', desc: 'Histoire de citoyen terminée', keyword: 'règles', icon: 'Shield', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'fr-e-soc-symboles', subjectId: 'social-studies', title: 'Les Symboles de la République', description: 'Apprenez la Marseillaise, le drapeau tricolore et Marianne.', achievements: [{ id: 'petit-republicain', name: 'Petit Républicain', desc: 'Histoire des symboles terminée', keyword: 'drapeau', icon: 'Flag', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'fr-e-soc-ecole', subjectId: 'social-studies', title: 'Vivre Ensemble à l\'École', description: 'Le respect, la solidarité et la tolérance au quotidien.', achievements: [{ id: 'friend-of-all', name: 'Ami de Tous', desc: 'Histoire du vivre ensemble terminée', keyword: 'respect', icon: 'Users', color: 'text-green-500', bg: 'bg-green-100' }] },
        { id: 'fr-e-soc-environnement', subjectId: 'social-studies', title: 'Protéger la Nature', description: 'L\'environnement, le recyclage et l\'eau potable.', achievements: [{ id: 'eco-citizen', name: 'Éco-Citoyen', desc: 'Histoire de l\'environnement terminée', keyword: 'nature', icon: 'Leaf', color: 'text-emerald-500', bg: 'bg-emerald-100' }] }
      ],
      'science': [
        { id: 'fr-e-sci-vivant', subjectId: 'science', title: 'Le Monde du Vivant', description: 'Observez les animaux, les plantes et leurs cycles de vie.', achievements: [{ id: 'naturalist', name: 'Naturaliste', desc: 'Histoire du vivant terminée', keyword: 'vivant', icon: 'Leaf', color: 'text-green-500', bg: 'bg-green-100' }] },
        { id: 'fr-e-sci-matiere', subjectId: 'science', title: 'La Matière', description: 'Découvrez les états de la matière: solide, liquide, gaz.', achievements: [{ id: 'petit-chimiste', name: 'Petit Chimiste', desc: 'Histoire de la matière terminée', keyword: 'matière', icon: 'FlaskConical', color: 'text-purple-500', bg: 'bg-purple-100' }] },
        { id: 'fr-e-sci-corps', subjectId: 'science', title: 'Le Corps Humain', description: 'Les cinq sens, les os et les muscles.', achievements: [{ id: 'petit-medecin', name: 'Petit Médecin', desc: 'Histoire du corps humain terminée', keyword: 'corps', icon: 'Heart', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'fr-e-sci-objets', subjectId: 'science', title: 'Objets Techniques', description: 'Les mécanismes simples: levier, poulie, engrenage.', achievements: [{ id: 'petit-ingenieur', name: 'Petit Ingénieur', desc: 'Histoire des objets techniques terminée', keyword: 'mécanisme', icon: 'Settings', color: 'text-amber-500', bg: 'bg-amber-100' }] }
      ],
      'history': [
        { id: 'fr-e-his-gaule', subjectId: 'history', title: 'La Gaule et les Gaulois', description: 'Découvrez Vercingétorix et la vie quotidienne gauloise.', achievements: [{ id: 'guerrier-gaulois', name: 'Guerrier Gaulois', desc: 'Histoire gauloise terminée', keyword: 'Gaulois', icon: 'Sword', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'fr-e-his-clovis', subjectId: 'history', title: 'Clovis et le Moyen Âge', description: 'Le baptême de Clovis et la société médiévale.', achievements: [{ id: 'roi-des-francs', name: 'Roi des Francs', desc: 'Histoire médiévale terminée', keyword: 'Clovis', icon: 'Crown', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'fr-e-his-jeanne', subjectId: 'history', title: 'Jeanne d\'Arc', description: 'L\'histoire de Jeanne d\'Arc et la guerre de Cent Ans.', achievements: [{ id: 'heros-medieval', name: 'Héros Médiéval', desc: 'Histoire de Jeanne d\'Arc terminée', keyword: 'Jeanne', icon: 'Shield', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'fr-e-his-chateaux', subjectId: 'history', title: 'Les Châteaux Forts', description: 'La vie dans un château fort au Moyen Âge.', achievements: [{ id: 'chevalier', name: 'Chevalier', desc: 'Histoire des châteaux terminée', keyword: 'château', icon: 'Castle', color: 'text-orange-500', bg: 'bg-orange-100' }] }
      ]
    }
  },
  middle: {
    SUBJECTS: [
      { id: 'social-studies', title: 'Éducation Civique', description: 'Étudiez les institutions, la justice et les droits de l\'Homme.', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: 'Sciences', description: 'Explorez l\'espace, la chimie, la nutrition et l\'électricité.', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: 'Histoire de France', description: 'De la Renaissance à la Révolution française.', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'fr-m-soc-institutions', subjectId: 'social-studies', title: 'Institutions de la République', description: 'Découvrez le Président, l\'Assemblée nationale et le Sénat.', achievements: [{ id: 'gardien-loi', name: 'Gardien de la Loi', desc: 'Histoire des institutions terminée', keyword: 'procès', icon: 'Scale', color: 'text-teal-500', bg: 'bg-teal-100' }] },
        { id: 'fr-m-soc-justice', subjectId: 'social-studies', title: 'La Justice en France', description: 'Les tribunaux, le droit pénal et le droit civil.', achievements: [{ id: 'juge-herbe', name: 'Juge en Herbe', desc: 'Histoire de la justice terminée', keyword: 'justice', icon: 'Scale', color: 'text-purple-500', bg: 'bg-purple-100' }] },
        { id: 'fr-m-soc-laicite', subjectId: 'social-studies', title: 'La Laïcité', description: 'La séparation Église-État et la loi de 1905.', achievements: [{ id: 'citoyen-eclaire', name: 'Citoyen Éclairé', desc: 'Histoire de la laïcité terminée', keyword: 'laïcité', icon: 'Lightbulb', color: 'text-indigo-500', bg: 'bg-indigo-100' }] },
        { id: 'fr-m-soc-droits', subjectId: 'social-studies', title: 'Les Droits de l\'Homme', description: 'La DDHC de 1789 et les droits fondamentaux.', achievements: [{ id: 'defenseur-droits', name: 'Défenseur des Droits', desc: 'Histoire des droits terminée', keyword: 'droits', icon: 'Shield', color: 'text-blue-500', bg: 'bg-blue-100' }] }
      ],
      'science': [
        { id: 'fr-m-sci-solar', subjectId: 'science', title: 'Système Solaire et Étoiles', description: 'Explorez les planètes et les caractéristiques de l\'espace.', achievements: [{ id: 'mars-explorer', name: 'Explorateur de Mars', desc: 'Histoire spatiale terminée', keyword: 'mars', icon: 'Rocket', color: 'text-orange-500', bg: 'bg-orange-100' }] },
        { id: 'fr-m-sci-chimie', subjectId: 'science', title: 'Transformations Chimiques', description: 'Les réactions chimiques, atomes et molécules.', achievements: [{ id: 'chimiste-junior', name: 'Chimiste Junior', desc: 'Histoire de chimie terminée', keyword: 'chimie', icon: 'FlaskConical', color: 'text-violet-500', bg: 'bg-violet-100' }] },
        { id: 'fr-m-sci-nutrition', subjectId: 'science', title: 'Nutrition et Digestion', description: 'Le système digestif et l\'alimentation équilibrée.', achievements: [{ id: 'biologiste', name: 'Biologiste', desc: 'Histoire de nutrition terminée', keyword: 'nutrition', icon: 'Heart', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'fr-m-sci-electricite', subjectId: 'science', title: 'Électricité et Circuits', description: 'Courant, tension, résistance et loi d\'Ohm.', achievements: [{ id: 'electricien', name: 'Électricien', desc: 'Histoire d\'électricité terminée', keyword: 'courant', icon: 'Zap', color: 'text-amber-500', bg: 'bg-amber-100' }] }
      ],
      'history': [
        { id: 'fr-m-his-renaissance', subjectId: 'history', title: 'La Renaissance', description: 'François Ier, Léonard de Vinci et l\'Humanisme.', achievements: [{ id: 'humaniste', name: 'Humaniste', desc: 'Histoire Renaissance terminée', keyword: 'Renaissance', icon: 'Palette', color: 'text-pink-500', bg: 'bg-pink-100' }] },
        { id: 'fr-m-his-louisxiv', subjectId: 'history', title: 'Louis XIV et la Monarchie Absolue', description: 'Versailles et le «Roi-Soleil».', achievements: [{ id: 'roi-soleil', name: 'Le Roi-Soleil', desc: 'Histoire de Louis XIV terminée', keyword: 'Versailles', icon: 'Crown', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'fr-m-his-revolution', subjectId: 'history', title: 'La Révolution Française', description: 'La prise de la Bastille et la Déclaration des Droits de l\'Homme.', achievements: [{ id: 'revolutionnaire', name: 'Révolutionnaire', desc: 'Histoire de la Révolution terminée', keyword: 'révolution', icon: 'Flag', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'fr-m-his-napoleon', subjectId: 'history', title: 'Napoléon et l\'Empire', description: 'L\'ascension de Napoléon et le Code civil.', achievements: [{ id: 'stratege-imperial', name: 'Stratège Impérial', desc: 'Histoire napoléonienne terminée', keyword: 'Napoléon', icon: 'Sword', color: 'text-amber-500', bg: 'bg-amber-100' }] }
      ]
    }
  },
  high: {
    SUBJECTS: [
      { id: 'social-studies', title: 'Sciences Politiques', description: 'Analysez les valeurs républicaines, l\'UE et la bioéthique.', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: 'Sciences Avancées', description: 'Génétique, énergie durable, mécanique et géologie.', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: 'Histoire Contemporaine', description: 'Des Républiques aux guerres mondiales et à l\'Europe.', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'fr-h-soc-republique', subjectId: 'social-studies', title: 'Les Valeurs Républicaines', description: 'Liberté, Égalité, Fraternité dans la société moderne.', achievements: [{ id: 'republicain', name: 'Républicain', desc: 'Histoire républicaine terminée', keyword: 'République', icon: 'Landmark', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'fr-h-soc-eu', subjectId: 'social-studies', title: 'L\'Union Européenne', description: 'Le rôle de la France dans l\'UE et la coopération.', achievements: [{ id: 'expert-europeen', name: 'Expert Européen', desc: 'Histoire européenne terminée', keyword: 'UE', icon: 'Globe', color: 'text-teal-500', bg: 'bg-teal-100' }] },
        { id: 'fr-h-soc-mondialisation', subjectId: 'social-studies', title: 'Mondialisation et Enjeux', description: 'Le commerce international et les inégalités mondiales.', achievements: [{ id: 'analyste-global', name: 'Analyste Global', desc: 'Histoire de la mondialisation terminée', keyword: 'mondial', icon: 'Globe', color: 'text-indigo-500', bg: 'bg-indigo-100' }] },
        { id: 'fr-h-soc-bioethique', subjectId: 'social-studies', title: 'Bioéthique et Débats', description: 'Le clonage, l\'euthanasie et les questions éthiques.', achievements: [{ id: 'penseur-ethique', name: 'Penseur Éthique', desc: 'Histoire de bioéthique terminée', keyword: 'éthique', icon: 'Brain', color: 'text-purple-500', bg: 'bg-purple-100' }] }
      ],
      'science': [
        { id: 'fr-h-sci-genetique', subjectId: 'science', title: 'Génétique et Évolution', description: 'L\'ADN, les mutations et la théorie de l\'évolution.', achievements: [{ id: 'geneticien', name: 'Généticien', desc: 'Histoire de génétique terminée', keyword: 'ADN', icon: 'Dna', color: 'text-emerald-500', bg: 'bg-emerald-100' }] },
        { id: 'fr-h-sci-energie', subjectId: 'science', title: 'Énergie et Développement Durable', description: 'Transition écologique et sources d\'énergie.', achievements: [{ id: 'eco-ingenieur', name: 'Éco-Ingénieur', desc: 'Histoire de l\'énergie terminée', keyword: 'énergie', icon: 'Leaf', color: 'text-green-500', bg: 'bg-green-100' }] },
        { id: 'fr-h-sci-physique', subjectId: 'science', title: 'Mécanique et Gravitation', description: 'Les lois de Newton et la gravitation universelle.', achievements: [{ id: 'physicien', name: 'Physicien', desc: 'Histoire de physique terminée', keyword: 'Newton', icon: 'Zap', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'fr-h-sci-terre', subjectId: 'science', title: 'Sciences de la Terre', description: 'Tectonique des plaques, séismes et climat.', achievements: [{ id: 'geologue', name: 'Géologue', desc: 'Histoire géologique terminée', keyword: 'terre', icon: 'Mountain', color: 'text-orange-500', bg: 'bg-orange-100' }] }
      ],
      'history': [
        { id: 'fr-h-his-republiques', subjectId: 'history', title: 'Les Républiques Françaises', description: 'De la IIIe à la Ve République.', achievements: [{ id: 'historien', name: 'Historien', desc: 'Histoire des Républiques terminée', keyword: 'République', icon: 'Landmark', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'fr-h-his-guerres', subjectId: 'history', title: 'La France dans les Guerres Mondiales', description: 'La Grande Guerre, la Résistance et Vichy.', achievements: [{ id: 'resistant', name: 'Résistant', desc: 'Histoire des guerres terminée', keyword: 'Résistance', icon: 'Medal', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'fr-h-his-decolonisation', subjectId: 'history', title: 'Décolonisation', description: 'La fin de l\'empire colonial et la guerre d\'Algérie.', achievements: [{ id: 'historien-colonial', name: 'Historien Colonial', desc: 'Histoire de la décolonisation terminée', keyword: 'colonie', icon: 'BookOpen', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'fr-h-his-europe', subjectId: 'history', title: 'Construction Européenne', description: 'De la CECA à l\'UE: l\'idéal européen.', achievements: [{ id: 'batisseur-europeen', name: 'Bâtisseur Européen', desc: 'Histoire européenne terminée', keyword: 'Europe', icon: 'Globe', color: 'text-indigo-500', bg: 'bg-indigo-100' }] }
      ]
    }
  }
};

// ─────────────────────────────────────────────
// 🇩🇪 독일 (DE) — Lehrplan / Bildungsplan
// ─────────────────────────────────────────────
const deData: CountryCurriculum = {
  elementary: {
    SUBJECTS: [
      { id: 'social-studies', title: 'Sachunterricht (Gesellschaft)', description: 'Lerne die Regeln des Zusammenlebens und deiner Gemeinde.', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: 'Sachunterricht (Natur)', description: 'Beobachte Tiere, Pflanzen, Wetter und deinen Körper.', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: 'Sachunterricht (Geschichte)', description: 'Entdecke Ritter, Feiertage und alte Traditionen.', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'de-e-soc-gemeinde', subjectId: 'social-studies', title: 'Unsere Gemeinde', description: 'Regeln des Zusammenlebens in der Gemeinde.', achievements: [{ id: 'gemeinde-entdecker', name: 'Gemeinde-Entdecker', desc: 'Gemeinde-Geschichte abgeschlossen', keyword: 'Gemeinde', icon: 'Map', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'de-e-soc-berufe', subjectId: 'social-studies', title: 'Berufe in unserer Stadt', description: 'Feuerwehr, Polizei, Bäcker und ihre Arbeit.', achievements: [{ id: 'berufe-entdecker', name: 'Berufe-Entdecker', desc: 'Berufe-Geschichte abgeschlossen', keyword: 'Beruf', icon: 'Users', color: 'text-green-500', bg: 'bg-green-100' }] },
        { id: 'de-e-soc-verkehr', subjectId: 'social-studies', title: 'Verkehr und Sicherheit', description: 'Verkehrsregeln und Fahrradprüfung.', achievements: [{ id: 'verkehrsexperte', name: 'Verkehrsexperte', desc: 'Verkehrs-Geschichte abgeschlossen', keyword: 'Verkehr', icon: 'Shield', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'de-e-soc-umwelt', subjectId: 'social-studies', title: 'Umwelt und Nachhaltigkeit', description: 'Müll trennen, Energie sparen, Natur schützen.', achievements: [{ id: 'umweltschuetzer', name: 'Umweltschützer', desc: 'Umwelt-Geschichte abgeschlossen', keyword: 'Umwelt', icon: 'Leaf', color: 'text-emerald-500', bg: 'bg-emerald-100' }] }
      ],
      'science': [
        { id: 'de-e-sci-tiere', subjectId: 'science', title: 'Tiere und Pflanzen', description: 'Beobachtung von Tieren und Pflanzen in der Natur.', achievements: [{ id: 'naturforscher', name: 'Naturforscher', desc: 'Natur-Geschichte abgeschlossen', keyword: 'Tiere', icon: 'Leaf', color: 'text-green-500', bg: 'bg-green-100' }] },
        { id: 'de-e-sci-wetter', subjectId: 'science', title: 'Wetter und Jahreszeiten', description: 'Wetterphänomene und der Wechsel der Jahreszeiten.', achievements: [{ id: 'wetter-experte', name: 'Wetter-Experte', desc: 'Wetter-Geschichte abgeschlossen', keyword: 'Wetter', icon: 'Cloud', color: 'text-cyan-500', bg: 'bg-cyan-100' }] },
        { id: 'de-e-sci-wasser', subjectId: 'science', title: 'Wasser und seine Formen', description: 'Wasserkreislauf, Eis, Dampf und Flüssigkeit.', achievements: [{ id: 'wasser-forscher', name: 'Wasser-Forscher', desc: 'Wasser-Geschichte abgeschlossen', keyword: 'Wasser', icon: 'Droplets', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'de-e-sci-koerper', subjectId: 'science', title: 'Unser Körper', description: 'Sinnesorgane, Knochen und Ernährung.', achievements: [{ id: 'koerper-experte', name: 'Körper-Experte', desc: 'Körper-Geschichte abgeschlossen', keyword: 'Körper', icon: 'Heart', color: 'text-red-500', bg: 'bg-red-100' }] }
      ],
      'history': [
        { id: 'de-e-his-ritter', subjectId: 'history', title: 'Ritter und Burgen', description: 'Die Welt der Ritter und das Mittelalter.', achievements: [{ id: 'ritter', name: 'Ritter', desc: 'Ritter-Geschichte abgeschlossen', keyword: 'Ritter', icon: 'Sword', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'de-e-his-einheit', subjectId: 'history', title: 'Tag der Deutschen Einheit', description: 'Warum der 3. Oktober ein Feiertag ist.', achievements: [{ id: 'einheits-entdecker', name: 'Einheits-Entdecker', desc: 'Einheits-Geschichte abgeschlossen', keyword: 'Einheit', icon: 'Flag', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'de-e-his-schule', subjectId: 'history', title: 'Schule früher und heute', description: 'Wie Kinder vor 100 Jahren gelernt haben.', achievements: [{ id: 'zeitreisender', name: 'Zeitreisender', desc: 'Schul-Geschichte abgeschlossen', keyword: 'Schule', icon: 'BookOpen', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'de-e-his-feste', subjectId: 'history', title: 'Feste und Traditionen', description: 'Weihnachten, Ostern und regionale Bräuche.', achievements: [{ id: 'traditions-kenner', name: 'Traditions-Kenner', desc: 'Traditions-Geschichte abgeschlossen', keyword: 'Tradition', icon: 'Star', color: 'text-yellow-500', bg: 'bg-yellow-100' }] }
      ]
    }
  },
  middle: {
    SUBJECTS: [
      { id: 'social-studies', title: 'Sozialkunde', description: 'Verstehe das Grundgesetz, Demokratie und die Wirtschaft.', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: 'Naturwissenschaften', description: 'Erforsche das Sonnensystem, Zellen, Chemie und Physik.', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: 'Geschichte', description: 'Vom Mittelalter über die Reformation zum Kaiserreich.', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'de-m-soc-grundgesetz', subjectId: 'social-studies', title: 'Das Grundgesetz', description: 'Grundrechte und die föderale Struktur Deutschlands.', achievements: [{ id: 'hueter-gesetz', name: 'Hüter des Gesetzes', desc: 'Grundgesetz-Geschichte abgeschlossen', keyword: 'Gesetz', icon: 'Scale', color: 'text-teal-500', bg: 'bg-teal-100' }] },
        { id: 'de-m-soc-demokratie', subjectId: 'social-studies', title: 'Demokratie in Deutschland', description: 'Wahlen, Parteien und Gewaltenteilung.', achievements: [{ id: 'demokrat', name: 'Demokrat', desc: 'Demokratie-Geschichte abgeschlossen', keyword: 'Wahl', icon: 'Users', color: 'text-indigo-500', bg: 'bg-indigo-100' }] },
        { id: 'de-m-soc-wirtschaft', subjectId: 'social-studies', title: 'Markt und Wirtschaft', description: 'Angebot, Nachfrage und der Wirtschaftskreislauf.', achievements: [{ id: 'wirtschafts-kenner', name: 'Wirtschafts-Kenner', desc: 'Wirtschafts-Geschichte abgeschlossen', keyword: 'Markt', icon: 'Coins', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'de-m-soc-medien', subjectId: 'social-studies', title: 'Medien und Meinungsfreiheit', description: 'Pressefreiheit, Fake News und Medienkompetenz.', achievements: [{ id: 'medien-profi', name: 'Medien-Profi', desc: 'Medien-Geschichte abgeschlossen', keyword: 'Medien', icon: 'Smartphone', color: 'text-purple-500', bg: 'bg-purple-100' }] }
      ],
      'science': [
        { id: 'de-m-sci-solar', subjectId: 'science', title: 'Sonnensystem & Sterne', description: 'Planeten, Gravitation und die Weiten des Alls.', achievements: [{ id: 'mars-entdecker', name: 'Mars-Entdecker', desc: 'Weltraum-Geschichte abgeschlossen', keyword: 'Mars', icon: 'Rocket', color: 'text-orange-500', bg: 'bg-orange-100' }] },
        { id: 'de-m-sci-zellen', subjectId: 'science', title: 'Zellen und Lebewesen', description: 'Zellaufbau, Zellteilung und Organismen.', achievements: [{ id: 'zell-forscher', name: 'Zell-Forscher', desc: 'Zellen-Geschichte abgeschlossen', keyword: 'Zelle', icon: 'Microscope', color: 'text-emerald-500', bg: 'bg-emerald-100' }] },
        { id: 'de-m-sci-chemie', subjectId: 'science', title: 'Stoffe und Reaktionen', description: 'Elemente, Verbindungen und chemische Reaktionen.', achievements: [{ id: 'chemie-lehrling', name: 'Chemie-Lehrling', desc: 'Chemie-Geschichte abgeschlossen', keyword: 'Chemie', icon: 'FlaskConical', color: 'text-violet-500', bg: 'bg-violet-100' }] },
        { id: 'de-m-sci-kraft', subjectId: 'science', title: 'Kräfte und Bewegung', description: 'Newtons Gesetze, Geschwindigkeit, Beschleunigung.', achievements: [{ id: 'physik-talent', name: 'Physik-Talent', desc: 'Physik-Geschichte abgeschlossen', keyword: 'Kraft', icon: 'Zap', color: 'text-yellow-500', bg: 'bg-yellow-100' }] }
      ],
      'history': [
        { id: 'de-m-his-mittelalter', subjectId: 'history', title: 'Das Mittelalter', description: 'Feudalismus, Ständegesellschaft und Städte.', achievements: [{ id: 'mittelalter-kenner', name: 'Mittelalter-Kenner', desc: 'Mittelalter-Geschichte abgeschlossen', keyword: 'Mittelalter', icon: 'Castle', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'de-m-his-reformation', subjectId: 'history', title: 'Reformation und Martin Luther', description: 'Die 95 Thesen und ihre Wirkung auf Europa.', achievements: [{ id: 'reformator', name: 'Reformator', desc: 'Reformations-Geschichte abgeschlossen', keyword: 'Luther', icon: 'BookOpen', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'de-m-his-aufklaerung', subjectId: 'history', title: 'Aufklärung und Revolution', description: 'Die Ideen der Aufklärung und die Französische Revolution.', achievements: [{ id: 'aufklaerer', name: 'Aufklärer', desc: 'Aufklärungs-Geschichte abgeschlossen', keyword: 'Aufklärung', icon: 'Lightbulb', color: 'text-indigo-500', bg: 'bg-indigo-100' }] },
        { id: 'de-m-his-bismarck', subjectId: 'history', title: 'Deutsches Kaiserreich', description: 'Bismarcks Reichsgründung und Industrialisierung.', achievements: [{ id: 'reichsgruender', name: 'Reichsgründer', desc: 'Kaiserreich-Geschichte abgeschlossen', keyword: 'Bismarck', icon: 'Landmark', color: 'text-yellow-500', bg: 'bg-yellow-100' }] }
      ]
    }
  },
  high: {
    SUBJECTS: [
      { id: 'social-studies', title: 'Politik und Wirtschaft', description: 'Analysiere die EU, den Sozialstaat und das Recht.', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: 'Naturwissenschaften', description: 'Genetik, Chemie, Physik und Ökologie vertiefen.', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: 'Geschichte', description: 'Weimarer Republik, NS-Zeit, Teilung und Wiedervereinigung.', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'de-h-soc-eu', subjectId: 'social-studies', title: 'Deutschland in der EU', description: 'Deutschlands Rolle in der Europäischen Union.', achievements: [{ id: 'eu-experte', name: 'EU-Experte', desc: 'EU-Geschichte abgeschlossen', keyword: 'EU', icon: 'Globe', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'de-h-soc-sozialstaat', subjectId: 'social-studies', title: 'Der Sozialstaat', description: 'Sozialsystem, Rente und Gesundheitspolitik.', achievements: [{ id: 'sozial-analytiker', name: 'Sozial-Analytiker', desc: 'Sozialstaat-Geschichte abgeschlossen', keyword: 'Sozial', icon: 'Heart', color: 'text-rose-500', bg: 'bg-rose-100' }] },
        { id: 'de-h-soc-globalisierung', subjectId: 'social-studies', title: 'Globalisierung', description: 'Welthandel, Migration und globale Verantwortung.', achievements: [{ id: 'globalisierungs-experte', name: 'Globalisierungs-Experte', desc: 'Globalisierungs-Geschichte abgeschlossen', keyword: 'global', icon: 'Globe', color: 'text-teal-500', bg: 'bg-teal-100' }] },
        { id: 'de-h-soc-recht', subjectId: 'social-studies', title: 'Recht und Rechtsstaatlichkeit', description: 'BVerfG, Rechtsordnung und Streitkultur.', achievements: [{ id: 'rechts-experte', name: 'Rechts-Experte', desc: 'Rechts-Geschichte abgeschlossen', keyword: 'Recht', icon: 'Scale', color: 'text-purple-500', bg: 'bg-purple-100' }] }
      ],
      'science': [
        { id: 'de-h-sci-genetik', subjectId: 'science', title: 'Genetik und Evolution', description: 'DNA, Gentechnik und Evolutionstheorie.', achievements: [{ id: 'genetik-experte', name: 'Genetik-Experte', desc: 'Genetik-Geschichte abgeschlossen', keyword: 'DNA', icon: 'Dna', color: 'text-emerald-500', bg: 'bg-emerald-100' }] },
        { id: 'de-h-sci-chemie', subjectId: 'science', title: 'Chemische Bindungen', description: 'Periodensystem, Bindungstypen und Thermochemie.', achievements: [{ id: 'chemie-meister', name: 'Chemie-Meister', desc: 'Chemie-Geschichte abgeschlossen', keyword: 'Bindung', icon: 'FlaskConical', color: 'text-violet-500', bg: 'bg-violet-100' }] },
        { id: 'de-h-sci-physik', subjectId: 'science', title: 'Mechanik und Energie', description: 'Energieerhaltung, Thermodynamik und Felder.', achievements: [{ id: 'physik-genie', name: 'Physik-Genie', desc: 'Physik-Geschichte abgeschlossen', keyword: 'Energie', icon: 'Zap', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'de-h-sci-oekologie', subjectId: 'science', title: 'Ökologie und Klimawandel', description: 'Ökosysteme, CO₂-Kreislauf und Nachhaltigkeit.', achievements: [{ id: 'oeko-wissenschaftler', name: 'Öko-Wissenschaftler', desc: 'Ökologie-Geschichte abgeschlossen', keyword: 'Klima', icon: 'Trees', color: 'text-green-500', bg: 'bg-green-100' }] }
      ],
      'history': [
        { id: 'de-h-his-weimar', subjectId: 'history', title: 'Weimarer Republik', description: 'Erste deutsche Demokratie und ihr Scheitern.', achievements: [{ id: 'demokratie-historiker', name: 'Demokratie-Historiker', desc: 'Weimar-Geschichte abgeschlossen', keyword: 'Weimar', icon: 'Landmark', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'de-h-his-ns', subjectId: 'history', title: 'Nationalsozialismus', description: 'Machtergreifung, Diktatur und Erinnerungskultur.', achievements: [{ id: 'zeuge-geschichte', name: 'Zeuge der Geschichte', desc: 'NS-Geschichte abgeschlossen', keyword: 'Holocaust', icon: 'BookOpen', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'de-h-his-teilung', subjectId: 'history', title: 'Teilung und Kalter Krieg', description: 'BRD, DDR, Mauerbau und Alltagsleben.', achievements: [{ id: 'mauer-forscher', name: 'Mauer-Forscher', desc: 'Teilungs-Geschichte abgeschlossen', keyword: 'Mauer', icon: 'Building', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'de-h-his-wiedervereinigung', subjectId: 'history', title: 'Wiedervereinigung', description: 'Mauerfall, Deutsche Einheit und ihre Folgen.', achievements: [{ id: 'einheits-historiker', name: 'Einheits-Historiker', desc: 'Wiedervereinigung-Geschichte abgeschlossen', keyword: 'Einheit', icon: 'Flag', color: 'text-green-500', bg: 'bg-green-100' }] }
      ]
    }
  }
};

// ─────────────────────────────────────────────
// 🇮🇹 이탈리아 (IT) — Indicazioni Nazionali
// ─────────────────────────────────────────────
const itData: CountryCurriculum = {
  elementary: {
    SUBJECTS: [
      { id: 'social-studies', title: 'Educazione Civica', description: 'Impara le regole, i diritti e la protezione ambientale.', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: 'Scienze', description: 'Osserva gli esseri viventi, la materia e l\'acqua.', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: 'Storia', description: 'Dalla preistoria ai Greci e all\'Impero Romano.', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'it-e-soc-regole', subjectId: 'social-studies', title: 'Regole della Comunità', description: 'Le regole del vivere insieme a scuola e nella comunità.', achievements: [{ id: 'cittadino-modello', name: 'Cittadino Modello', desc: 'Storia di cittadinanza completata', keyword: 'regole', icon: 'Shield', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'it-e-soc-ambiente', subjectId: 'social-studies', title: 'Ambiente e Sostenibilità', description: 'Protezione ambientale e riciclo.', achievements: [{ id: 'eco-esploratore', name: 'Eco-Esploratore', desc: 'Storia ambientale completata', keyword: 'ambiente', icon: 'Leaf', color: 'text-emerald-500', bg: 'bg-emerald-100' }] },
        { id: 'it-e-soc-diritti', subjectId: 'social-studies', title: 'I Diritti dei Bambini', description: 'La Convenzione ONU sui diritti dell\'infanzia.', achievements: [{ id: 'difensore-bambini', name: 'Difensore dei Bambini', desc: 'Storia dei diritti completata', keyword: 'diritti', icon: 'Heart', color: 'text-pink-500', bg: 'bg-pink-100' }] },
        { id: 'it-e-soc-bandiera', subjectId: 'social-studies', title: 'I Simboli d\'Italia', description: 'Il tricolore, l\'inno di Mameli e la Repubblica.', achievements: [{ id: 'piccolo-italiano', name: 'Piccolo Italiano', desc: 'Storia dei simboli completata', keyword: 'tricolore', icon: 'Flag', color: 'text-green-500', bg: 'bg-green-100' }] }
      ],
      'science': [
        { id: 'it-e-sci-viventi', subjectId: 'science', title: 'Esseri Viventi', description: 'Animali, piante e i loro cicli vitali.', achievements: [{ id: 'naturalista', name: 'Naturalista', desc: 'Storia del vivente completata', keyword: 'vivente', icon: 'Leaf', color: 'text-green-500', bg: 'bg-green-100' }] },
        { id: 'it-e-sci-materia', subjectId: 'science', title: 'La Materia e i Materiali', description: 'Gli stati della materia e le proprietà dei materiali.', achievements: [{ id: 'piccolo-scienziato', name: 'Piccolo Scienziato', desc: 'Storia della materia completata', keyword: 'materia', icon: 'FlaskConical', color: 'text-purple-500', bg: 'bg-purple-100' }] },
        { id: 'it-e-sci-corpo', subjectId: 'science', title: 'Il Corpo Umano Base', description: 'I cinque sensi e l\'alimentazione sana.', achievements: [{ id: 'piccolo-dottore', name: 'Piccolo Dottore', desc: 'Storia del corpo completata', keyword: 'sensi', icon: 'Heart', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'it-e-sci-acqua', subjectId: 'science', title: 'L\'Acqua e il Ciclo', description: 'Il ciclo dell\'acqua e perché è preziosa.', achievements: [{ id: 'guardiano-acqua', name: 'Guardiano dell\'Acqua', desc: 'Storia dell\'acqua completata', keyword: 'acqua', icon: 'Droplets', color: 'text-cyan-500', bg: 'bg-cyan-100' }] }
      ],
      'history': [
        { id: 'it-e-his-preistoria', subjectId: 'history', title: 'La Preistoria', description: 'Uomini primitivi, scoperta del fuoco e agricoltura.', achievements: [{ id: 'esploratore-preistorico', name: 'Esploratore Preistorico', desc: 'Storia preistorica completata', keyword: 'preistoria', icon: 'Mountain', color: 'text-stone-500', bg: 'bg-stone-100' }] },
        { id: 'it-e-his-greci', subjectId: 'history', title: 'La Civiltà Greca', description: 'I Greci, la democrazia ateniese e le Olimpiadi.', achievements: [{ id: 'filosofo-greco', name: 'Filosofo Greco', desc: 'Storia greca completata', keyword: 'Greci', icon: 'Landmark', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'it-e-his-roma', subjectId: 'history', title: 'L\'Impero Romano', description: 'La fondazione di Roma, la Repubblica e l\'Impero.', achievements: [{ id: 'imperatore', name: 'Imperatore', desc: 'Storia romana completata', keyword: 'Roma', icon: 'Crown', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'it-e-his-medioevo-base', subjectId: 'history', title: 'Il Medioevo per i Piccoli', description: 'Castelli, cavalieri e la vita nel borgo.', achievements: [{ id: 'cavaliere', name: 'Cavaliere', desc: 'Storia medievale completata', keyword: 'cavaliere', icon: 'Sword', color: 'text-amber-500', bg: 'bg-amber-100' }] }
      ]
    }
  },
  middle: {
    SUBJECTS: [
      { id: 'social-studies', title: 'Educazione Civica', description: 'Studia le istituzioni, la Costituzione e la legalità.', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: 'Scienze', description: 'Esplora lo spazio, le cellule, la chimica e il corpo umano.', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: 'Storia d\'Italia', description: 'Dal Medioevo al Rinascimento e al Risorgimento.', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'it-m-soc-stato', subjectId: 'social-studies', title: 'Istituzioni dello Stato', description: 'Governo, Parlamento e Magistratura.', achievements: [{ id: 'guardiano-legge', name: 'Guardiano della Legge', desc: 'Storia delle istituzioni completata', keyword: 'processo', icon: 'Scale', color: 'text-teal-500', bg: 'bg-teal-100' }] },
        { id: 'it-m-soc-costituzione', subjectId: 'social-studies', title: 'La Costituzione', description: 'I 12 principi fondamentali della Costituzione.', achievements: [{ id: 'costituzionalista', name: 'Costituzionalista', desc: 'Storia della Costituzione completata', keyword: 'Costituzione', icon: 'Scroll', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'it-m-soc-legalita', subjectId: 'social-studies', title: 'Legalità e Mafia', description: 'La lotta alla mafia e l\'importanza della legalità.', achievements: [{ id: 'paladino-legalita', name: 'Paladino della Legalità', desc: 'Storia di legalità completata', keyword: 'legalità', icon: 'Shield', color: 'text-purple-500', bg: 'bg-purple-100' }] },
        { id: 'it-m-soc-digital', subjectId: 'social-studies', title: 'Cittadinanza Digitale', description: 'Cyberbullismo, privacy e uso responsabile di internet.', achievements: [{ id: 'cittadino-digitale', name: 'Cittadino Digitale', desc: 'Storia digitale completata', keyword: 'digitale', icon: 'Smartphone', color: 'text-indigo-500', bg: 'bg-indigo-100' }] }
      ],
      'science': [
        { id: 'it-m-sci-solar', subjectId: 'science', title: 'Sistema Solare e Stelle', description: 'Pianeti, gravità e le meraviglie dello spazio.', achievements: [{ id: 'esploratore-marte', name: 'Esploratore di Marte', desc: 'Storia spaziale completata', keyword: 'marte', icon: 'Rocket', color: 'text-orange-500', bg: 'bg-orange-100' }] },
        { id: 'it-m-sci-cellule', subjectId: 'science', title: 'Il Mondo delle Cellule', description: 'Struttura cellulare, mitosi e tessuti.', achievements: [{ id: 'biologo', name: 'Biologo', desc: 'Storia delle cellule completata', keyword: 'cellula', icon: 'Microscope', color: 'text-emerald-500', bg: 'bg-emerald-100' }] },
        { id: 'it-m-sci-chimica', subjectId: 'science', title: 'Atomi e Molecole', description: 'Elementi, composti e reazioni chimiche.', achievements: [{ id: 'chimico-junior', name: 'Chimico Junior', desc: 'Storia di chimica completata', keyword: 'atomo', icon: 'FlaskConical', color: 'text-violet-500', bg: 'bg-violet-100' }] },
        { id: 'it-m-sci-corpo-avanzato', subjectId: 'science', title: 'Il Corpo Umano Avanzato', description: 'Apparato circolatorio, respiratorio e digerente.', achievements: [{ id: 'medico-futuro', name: 'Medico del Futuro', desc: 'Storia del corpo completata', keyword: 'corpo', icon: 'Heart', color: 'text-red-500', bg: 'bg-red-100' }] }
      ],
      'history': [
        { id: 'it-m-his-medioevo', subjectId: 'history', title: 'Il Medioevo e i Comuni', description: 'Feudalesimo, Crociate e nascita dei Comuni.', achievements: [{ id: 'cavaliere-medievale', name: 'Cavaliere Medievale', desc: 'Storia medievale completata', keyword: 'Medioevo', icon: 'Castle', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'it-m-his-rinascimento', subjectId: 'history', title: 'Il Rinascimento', description: 'Arte, cultura, Leonardo, Michelangelo e l\'Umanesimo.', achievements: [{ id: 'genio-rinascimento', name: 'Genio del Rinascimento', desc: 'Storia del Rinascimento completata', keyword: 'Rinascimento', icon: 'Palette', color: 'text-pink-500', bg: 'bg-pink-100' }] },
        { id: 'it-m-his-scoperte', subjectId: 'history', title: 'Le Grandi Scoperte', description: 'Colombo, Magellano e le nuove rotte commerciali.', achievements: [{ id: 'navigatore', name: 'Navigatore', desc: 'Storia delle scoperte completata', keyword: 'Colombo', icon: 'Ship', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'it-m-his-risorgimento', subjectId: 'history', title: 'Il Risorgimento', description: 'Mazzini, Garibaldi e l\'unificazione d\'Italia.', achievements: [{ id: 'patriota', name: 'Patriota', desc: 'Storia del Risorgimento completata', keyword: 'unità', icon: 'Flag', color: 'text-green-500', bg: 'bg-green-100' }] }
      ]
    }
  },
  high: {
    SUBJECTS: [
      { id: 'social-studies', title: 'Educazione Civica Avanzata', description: 'Diritti umani, economia, UE e sviluppo sostenibile.', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: 'Scienze Avanzate', description: 'Genetica, chimica, fisica e scienze della terra.', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: 'Storia Contemporanea', description: 'Dall\'Illuminismo alla Repubblica Italiana.', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'it-h-soc-diritti', subjectId: 'social-studies', title: 'Diritti Umani', description: 'La Dichiarazione Universale e la CEDU.', achievements: [{ id: 'difensore-diritti', name: 'Difensore dei Diritti', desc: 'Storia dei diritti completata', keyword: 'diritti', icon: 'Shield', color: 'text-purple-500', bg: 'bg-purple-100' }] },
        { id: 'it-h-soc-europa', subjectId: 'social-studies', title: 'L\'Italia nell\'UE', description: 'Il ruolo dell\'Italia nell\'UE e la cooperazione.', achievements: [{ id: 'esperto-europeo', name: 'Esperto Europeo', desc: 'Storia europea completata', keyword: 'UE', icon: 'Globe', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'it-h-soc-economia', subjectId: 'social-studies', title: 'Economia e Lavoro', description: 'Il mercato del lavoro, il PIL e la crescita economica.', achievements: [{ id: 'economista', name: 'Economista', desc: 'Storia economica completata', keyword: 'economia', icon: 'Coins', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'it-h-soc-agenda2030', subjectId: 'social-studies', title: 'Sviluppo Sostenibile', description: 'I 17 obiettivi ONU per lo sviluppo sostenibile.', achievements: [{ id: 'ambasciatore-sdgs', name: 'Ambasciatore SDGs', desc: 'Storia di sostenibilità completata', keyword: 'sostenibile', icon: 'Globe', color: 'text-teal-500', bg: 'bg-teal-100' }] }
      ],
      'science': [
        { id: 'it-h-sci-genetica', subjectId: 'science', title: 'Genetica ed Evoluzione', description: 'DNA, eredità mendeliana e la teoria dell\'evoluzione.', achievements: [{ id: 'genetista', name: 'Genetista', desc: 'Storia di genetica completata', keyword: 'DNA', icon: 'Dna', color: 'text-emerald-500', bg: 'bg-emerald-100' }] },
        { id: 'it-h-sci-chimica-avanzata', subjectId: 'science', title: 'Chimica Avanzata', description: 'Legami chimici, stechiometria e termochimica.', achievements: [{ id: 'maestro-chimica', name: 'Maestro di Chimica', desc: 'Storia di chimica completata', keyword: 'chimica', icon: 'FlaskConical', color: 'text-violet-500', bg: 'bg-violet-100' }] },
        { id: 'it-h-sci-fisica', subjectId: 'science', title: 'Meccanica e Termodinamica', description: 'Leggi di Newton, lavoro, energia e entropia.', achievements: [{ id: 'fisico', name: 'Fisico', desc: 'Storia di fisica completata', keyword: 'energia', icon: 'Zap', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'it-h-sci-terra', subjectId: 'science', title: 'Scienze della Terra', description: 'Tettonica a placche, vulcanismo e cambiamento climatico.', achievements: [{ id: 'geologo', name: 'Geologo', desc: 'Storia geologica completata', keyword: 'terra', icon: 'Mountain', color: 'text-orange-500', bg: 'bg-orange-100' }] }
      ],
      'history': [
        { id: 'it-h-his-settecento', subjectId: 'history', title: 'L\'Illuminismo e le Rivoluzioni', description: 'Le rivoluzioni americana e francese.', achievements: [{ id: 'illuminista', name: 'Illuminista', desc: 'Storia illuminista completata', keyword: 'Illuminismo', icon: 'Lightbulb', color: 'text-indigo-500', bg: 'bg-indigo-100' }] },
        { id: 'it-h-his-fascismo', subjectId: 'history', title: 'Il Fascismo e la Seconda Guerra', description: 'L\'Italia fascista, Mussolini e la Resistenza.', achievements: [{ id: 'storico-novecento', name: 'Storico del Novecento', desc: 'Storia del Novecento completata', keyword: 'Resistenza', icon: 'BookOpen', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'it-h-his-repubblica', subjectId: 'history', title: 'La Repubblica Italiana', description: 'Dal referendum del 1946 alla Costituzione.', achievements: [{ id: 'costituente', name: 'Costituente', desc: 'Storia della Repubblica completata', keyword: 'Repubblica', icon: 'Landmark', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'it-h-his-contemporanea', subjectId: 'history', title: 'L\'Italia Contemporanea', description: 'Il miracolo economico, terrorismo e l\'Italia oggi.', achievements: [{ id: 'analista-contemporaneo', name: 'Analista Contemporaneo', desc: 'Storia contemporanea completata', keyword: 'contemporanea', icon: 'Globe', color: 'text-teal-500', bg: 'bg-teal-100' }] }
      ]
    }
  }
};

// ─────────────────────────────────────────────
// 🇨🇳 중국 (CN) — 2022年版义务教育课程标准
// ─────────────────────────────────────────────
const cnData: CountryCurriculum = {
  elementary: {
    SUBJECTS: [
      { id: 'social-studies', title: '道德与法治', description: '学习家庭、社区和环保的基本规范。', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: '科学', description: '观察动植物、物质变化和天气现象。', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: '历史故事', description: '了解远古传说、英雄人物和传统文化。', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'cn-e-soc-family', subjectId: 'social-studies', title: '我和我的家庭', description: '学习家庭生活中的道德规范和责任意识。', achievements: [{ id: 'good-child', name: '好孩子', desc: '家庭故事完成', keyword: '家庭', icon: 'Heart', color: 'text-pink-500', bg: 'bg-pink-100' }] },
        { id: 'cn-e-soc-community', subjectId: 'social-studies', title: '我们的社区', description: '了解社区生活的规则和公共服务的作用。', achievements: [{ id: 'community-guard', name: '社区小卫士', desc: '社区故事完成', keyword: '社区', icon: 'Map', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'cn-e-soc-school', subjectId: 'social-studies', title: '快乐的学校生活', description: '校规、友谊和团队合作的重要性。', achievements: [{ id: 'model-student', name: '文明小学生', desc: '学校故事完成', keyword: '学校', icon: 'BookOpen', color: 'text-green-500', bg: 'bg-green-100' }] },
        { id: 'cn-e-soc-nature', subjectId: 'social-studies', title: '爱护我们的环境', description: '环境保护、节约用水和垃圾分类。', achievements: [{ id: 'eco-kid', name: '环保小达人', desc: '环保故事完成', keyword: '环保', icon: 'Leaf', color: 'text-emerald-500', bg: 'bg-emerald-100' }] }
      ],
      'science': [
        { id: 'cn-e-sci-plants', subjectId: 'science', title: '观察大自然', description: '观察动植物的生长和自然界的基本现象。', achievements: [{ id: 'little-observer', name: '小小观察家', desc: '自然观察故事完成', keyword: '自然', icon: 'Leaf', color: 'text-green-500', bg: 'bg-green-100' }] },
        { id: 'cn-e-sci-matter', subjectId: 'science', title: '物质与变化', description: '物质的状态、溶解和简单的物理变化。', achievements: [{ id: 'little-experimenter', name: '小实验家', desc: '物质故事完成', keyword: '物质', icon: 'FlaskConical', color: 'text-purple-500', bg: 'bg-purple-100' }] },
        { id: 'cn-e-sci-weather', subjectId: 'science', title: '天气与气候', description: '云、风、雨的形成和季节变化。', achievements: [{ id: 'weather-reporter', name: '天气预报员', desc: '天气故事完成', keyword: '天气', icon: 'Cloud', color: 'text-cyan-500', bg: 'bg-cyan-100' }] },
        { id: 'cn-e-sci-body', subjectId: 'science', title: '我们的身体', description: '五种感官、骨骼和健康饮食。', achievements: [{ id: 'little-doctor', name: '小小医生', desc: '身体故事完成', keyword: '身体', icon: 'Heart', color: 'text-red-500', bg: 'bg-red-100' }] }
      ],
      'history': [
        { id: 'cn-e-his-legends', subjectId: 'history', title: '远古传说与华夏起源', description: '盘古开天、女娲造人和夏商周。', achievements: [{ id: 'huaxia-descendant', name: '华夏后裔', desc: '传说故事完成', keyword: '华夏', icon: 'Crown', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'cn-e-his-heroes', subjectId: 'history', title: '古代英雄人物', description: '孔子、屈原、司马迁等伟大人物。', achievements: [{ id: 'guoxue-kid', name: '国学小达人', desc: '英雄故事完成', keyword: '孔子', icon: 'Scroll', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'cn-e-his-inventions', subjectId: 'history', title: '四大发明', description: '造纸术、印刷术、火药、指南针。', achievements: [{ id: 'little-inventor', name: '小发明家', desc: '发明故事完成', keyword: '发明', icon: 'Lightbulb', color: 'text-orange-500', bg: 'bg-orange-100' }] },
        { id: 'cn-e-his-festivals', subjectId: 'history', title: '传统节日与习俗', description: '春节、端午节、中秋节等传统文化。', achievements: [{ id: 'culture-inheritor', name: '文化传承人', desc: '节日故事完成', keyword: '春节', icon: 'Star', color: 'text-red-500', bg: 'bg-red-100' }] }
      ]
    }
  },
  middle: {
    SUBJECTS: [
      { id: 'social-studies', title: '道德与法治', description: '学习国家机构、法律、经济和民族团结。', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: '科学', description: '探索太阳系、细胞、力学和化学。', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: '中国历史', description: '从秦汉大一统到鸦片战争。', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'cn-m-soc-gov', subjectId: 'social-studies', title: '国家机构的作用', description: '了解人民代表大会制度和政府、法院的工作。', achievements: [{ id: 'law-guardian', name: '法律守护者', desc: '国家机构故事完成', keyword: '审判', icon: 'Scale', color: 'text-teal-500', bg: 'bg-teal-100' }] },
        { id: 'cn-m-soc-law', subjectId: 'social-studies', title: '法律与生活', description: '民法、刑法与未成年人保护法。', achievements: [{ id: 'law-guard', name: '法律小卫士', desc: '法律故事完成', keyword: '法律', icon: 'Shield', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'cn-m-soc-economy', subjectId: 'social-studies', title: '经济生活与消费', description: '货币、市场和理性消费。', achievements: [{ id: 'economy-explorer', name: '经济探究者', desc: '经济故事完成', keyword: '经济', icon: 'Coins', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'cn-m-soc-culture', subjectId: 'social-studies', title: '中华文化与民族团结', description: '多民族国家的文化多样性和团结。', achievements: [{ id: 'unity-messenger', name: '民族团结使者', desc: '文化故事完成', keyword: '团结', icon: 'Users', color: 'text-indigo-500', bg: 'bg-indigo-100' }] }
      ],
      'science': [
        { id: 'cn-m-sci-solar', subjectId: 'science', title: '太阳系与恒星', description: '太阳系行星的特征和宇宙的奥秘。', achievements: [{ id: 'mars-team', name: '火星探测队', desc: '太空故事完成', keyword: '火星', icon: 'Rocket', color: 'text-orange-500', bg: 'bg-orange-100' }] },
        { id: 'cn-m-sci-cells', subjectId: 'science', title: '细胞与生命', description: '细胞结构、光合作用和呼吸作用。', achievements: [{ id: 'bio-researcher', name: '生物研究员', desc: '细胞故事完成', keyword: '细胞', icon: 'Microscope', color: 'text-emerald-500', bg: 'bg-emerald-100' }] },
        { id: 'cn-m-sci-force', subjectId: 'science', title: '力与运动', description: '力的合成、牛顿运动定律基础。', achievements: [{ id: 'physics-explorer', name: '物理探究者', desc: '力学故事完成', keyword: '力', icon: 'Zap', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'cn-m-sci-chemintro', subjectId: 'science', title: '走进化学世界', description: '元素周期表、分子和化学变化。', achievements: [{ id: 'chem-starter', name: '化学启蒙者', desc: '化学故事完成', keyword: '化学', icon: 'FlaskConical', color: 'text-violet-500', bg: 'bg-violet-100' }] }
      ],
      'history': [
        { id: 'cn-m-his-qinhan', subjectId: 'history', title: '秦汉大一统', description: '秦始皇统一六国和汉朝的辉煌。', achievements: [{ id: 'unifier', name: '一统天下', desc: '秦汉故事完成', keyword: '统一', icon: 'Crown', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'cn-m-his-tangsong', subjectId: 'history', title: '唐宋盛世', description: '唐朝的繁荣和宋朝的经济文化发展。', achievements: [{ id: 'golden-age-scholar', name: '盛世学者', desc: '唐宋故事完成', keyword: '盛世', icon: 'Scroll', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'cn-m-his-yuanming', subjectId: 'history', title: '元明清的统治', description: '蒙古帝国、郑和下西洋和清朝盛世。', achievements: [{ id: 'history-navigator', name: '历史航海家', desc: '元明清故事完成', keyword: '郑和', icon: 'Ship', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'cn-m-his-opium', subjectId: 'history', title: '鸦片战争与近代化', description: '列强侵略和洋务运动、戊戌变法。', achievements: [{ id: 'awakening-pioneer', name: '觉醒先驱', desc: '近代史故事完成', keyword: '觉醒', icon: 'Lightbulb', color: 'text-red-500', bg: 'bg-red-100' }] }
      ]
    }
  },
  high: {
    SUBJECTS: [
      { id: 'social-studies', title: '思想政治', description: '分析宪法、市场经济、国际关系和哲学。', icon: 'Globe', colorTheme: 'blue' },
      { id: 'science', title: '科学综合', description: '深入学习遗传学、化学、物理和地球科学。', icon: 'Atom', colorTheme: 'emerald' },
      { id: 'history', title: '中国近现代史', description: '从辛亥革命到改革开放和现代中国。', icon: 'Landmark', colorTheme: 'amber' }
    ],
    MODULES: {
      'social-studies': [
        { id: 'cn-h-soc-constitution', subjectId: 'social-studies', title: '宪法与公民权利', description: '宪法的基本原则和公民的权利与义务。', achievements: [{ id: 'constitution-guard', name: '宪法卫士', desc: '宪法故事完成', keyword: '宪法', icon: 'Shield', color: 'text-blue-500', bg: 'bg-blue-100' }] },
        { id: 'cn-h-soc-market', subjectId: 'social-studies', title: '社会主义市场经济', description: '市场经济体制和宏观调控。', achievements: [{ id: 'economy-analyst', name: '经济分析师', desc: '经济故事完成', keyword: '市场', icon: 'Coins', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'cn-h-soc-global', subjectId: 'social-studies', title: '中国与世界', description: '中国在国际社会中的角色和全球化的影响。', achievements: [{ id: 'global-vision', name: '国际视野', desc: '国际故事完成', keyword: '国际', icon: 'Globe', color: 'text-teal-500', bg: 'bg-teal-100' }] },
        { id: 'cn-h-soc-philosophy', subjectId: 'social-studies', title: '哲学与人生', description: '唯物辩证法和人生观、价值观。', achievements: [{ id: 'philosopher', name: '哲学思考者', desc: '哲学故事完成', keyword: '哲学', icon: 'Brain', color: 'text-purple-500', bg: 'bg-purple-100' }] }
      ],
      'science': [
        { id: 'cn-h-sci-genetics', subjectId: 'science', title: '遗传与进化', description: 'DNA结构、基因突变与进化论。', achievements: [{ id: 'geneticist', name: '遗传学家', desc: '遗传故事完成', keyword: 'DNA', icon: 'Dna', color: 'text-emerald-500', bg: 'bg-emerald-100' }] },
        { id: 'cn-h-sci-chemistry', subjectId: 'science', title: '化学反应与平衡', description: '化学键、反应速率和化学平衡。', achievements: [{ id: 'chem-master', name: '化学大师', desc: '化学故事完成', keyword: '化学', icon: 'FlaskConical', color: 'text-violet-500', bg: 'bg-violet-100' }] },
        { id: 'cn-h-sci-physics', subjectId: 'science', title: '力学与能量', description: '牛顿定律、功和能量守恒定律。', achievements: [{ id: 'physics-master', name: '物理达人', desc: '物理故事完成', keyword: '能量', icon: 'Zap', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'cn-h-sci-earth', subjectId: 'science', title: '地球与宇宙', description: '板块构造论、大气环流和气候变化。', achievements: [{ id: 'earth-scientist', name: '地球科学家', desc: '地球科学故事完成', keyword: '地球', icon: 'Globe', color: 'text-teal-500', bg: 'bg-teal-100' }] }
      ],
      'history': [
        { id: 'cn-h-his-xinhai', subjectId: 'history', title: '辛亥革命与民国', description: '孙中山、辛亥革命和民国的建立。', achievements: [{ id: 'revolution-pioneer', name: '革命先驱', desc: '辛亥革命故事完成', keyword: '革命', icon: 'Flag', color: 'text-red-500', bg: 'bg-red-100' }] },
        { id: 'cn-h-his-ccp', subjectId: 'history', title: '中国共产党与抗日战争', description: '五四运动、中共建党和全民族抗战。', achievements: [{ id: 'war-hero', name: '抗战英雄', desc: '抗战故事完成', keyword: '抗战', icon: 'Sword', color: 'text-amber-500', bg: 'bg-amber-100' }] },
        { id: 'cn-h-his-prc', subjectId: 'history', title: '新中国的成立', description: '中华人民共和国的建立和社会主义改造。', achievements: [{ id: 'founding-hero', name: '建国功臣', desc: '建国故事完成', keyword: '建国', icon: 'Landmark', color: 'text-yellow-500', bg: 'bg-yellow-100' }] },
        { id: 'cn-h-his-reform', subjectId: 'history', title: '改革开放与现代中国', description: '邓小平与改革开放、经济特区和现代化。', achievements: [{ id: 'new-era', name: '时代新人', desc: '改革开放故事完成', keyword: '改革', icon: 'Star', color: 'text-green-500', bg: 'bg-green-100' }] }
      ]
    }
  }
};

// ─────────────────────────────────────────────
// 주요 내보내기 함수
// ─────────────────────────────────────────────
const allCurriculums: Record<string, CountryCurriculum> = {
  kr: krData,
  us: usData,
  jp: jpData,
  gb: gbData,
  fr: frData,
  de: deData,
  it: itData,
  cn: cnData
};

export const getCurriculum = (country: string, schoolLevel: SchoolLevel = 'elementary'): SchoolCurriculum => {
  const countryCurriculum = allCurriculums[country] || allCurriculums['kr'];
  return countryCurriculum[schoolLevel] || countryCurriculum['elementary'];
};

// 학교급 내부 키 목록 (모든 국가 공통)
export const SCHOOL_LEVEL_KEYS: SchoolLevel[] = ['elementary', 'middle', 'high'];
