const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
const safetySettings = [
  {
    category: HarmCategory.HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW,
  },
  {
    category: HarmCategory.VIOLENCE,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM,
  },
  {
    category: HarmCategory.HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_HIGH,
  },
  {
    category: HarmCategory.SEXUAL_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_HIGH,
  },
];

export const chatSession = model.startChat({
  generationConfig,
 
  // See https://ai.google.dev/gemini-api/docs/safety-settings
});
