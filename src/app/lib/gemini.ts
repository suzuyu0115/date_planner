import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
  throw new Error('Gemini API Key が見つかりません');
}

const modelName = 'gemini-1.5-flash-latest';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: modelName })

export default model;
