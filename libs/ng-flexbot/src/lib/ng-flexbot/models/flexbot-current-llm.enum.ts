export enum FlexbotCurrentTextModel {
  // Google Models
  GOOGLE_GEMINI_PRO = 'google/gemini-pro',
  GOOGLE_MEDULLA_2 = 'google/medulla-2', 


  // OpenAI Models
  OPEN_AI_GPT_3 = 'openai/gpt-3',
  OPEN_AI_GPT_3_CHAT = 'openai/gpt-3-chat',
  OPEN_AI_GPT_4 = 'openai/gpt-4',
  OPEN_AI_GPT_4_TURBO = 'openai/gpt-4-turbo',
  OPEN_AI_GPT_3_5_TURBO = 'openai/gpt-3.5-turbo',
  OPEN_AI_TEXT_DAVINCI_003 = 'openai/text-davinci-003', 
}

export enum FlexbotCurrentImageModel {
  // Google Models
  GOOGLE_GEMINI_PRO_VISION = 'google/gemini-pro-vision',

  // OpenAI Models
  OPEN_AI_DALL_E_3 = 'openai/dall-e-3',
  OPEN_AI_DALL_E_2 = 'openai/dall-e-2', // Example of another potential OpenAI image model
  // Add more OpenAI image models as they become available
}
