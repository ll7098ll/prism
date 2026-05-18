import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateStoryContent(prompt: string, systemInstruction?: string) {
  try {
    const defaultInstruction = `당신은 초중고등학생을 위한 인터랙티브 교과서의 전문 스토리텔러입니다.
CRITICAL INSTRUCTION: You MUST strictly adhere to any length constraints (e.g. number of sentences or words) given in the instructions for the "text" field. Return ONLY raw JSON, NO markdown wrappers, NO \`\`\`json.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction 
          ? systemInstruction + '\nCRITICAL INSTRUCTION: You MUST strictly adhere to any length constraints. DO NOT repeat phrases. Return ONLY raw JSON, NO markdown formatting.'
          : defaultInstruction + '\nDO NOT repeat phrases.',
        temperature: 0.7,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            consequence: {
              type: Type.OBJECT,
              properties: {
                narrative: { type: Type.STRING },
                learningPoint: { type: Type.STRING }
              }
            },
            text: {
              type: Type.STRING,
              description: 'Story content'
            },
            imagePrompt: {
              type: Type.STRING,
              description: 'Image prompt in English'
            },
            tailoredInterest: {
              type: Type.STRING,
              nullable: true
            },
            choices: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  interest: { type: Type.STRING, nullable: true }
                }
              }
            },
            isEnding: { type: Type.BOOLEAN },
            endingSummary: { type: Type.STRING, nullable: true }
          },
          required: ['consequence', 'text', 'imagePrompt', 'choices']
        }
      }
    });

    const text = response.text;
    JSON.parse(text); // validate
    return text;
  } catch (error) {
    console.error('Error generating story:', error);
    return JSON.stringify({
      consequence: { narrative: 'Generation Error', learningPoint: 'Please retry.' },
      text: 'An error occurred while generating the story. Please try again.',
      imagePrompt: '',
      tailoredInterest: null,
      choices: [{ text: 'Retry', interest: null }],
      isEnding: false,
      endingSummary: null
    });
  }
}

export async function generateImage(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/jpeg;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
}
