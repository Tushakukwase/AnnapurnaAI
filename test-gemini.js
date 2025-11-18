const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: './backend/.env' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

async function testGemini() {
  try {
    console.log('Testing Gemini API...');
    console.log('API Key:', process.env.GEMINI_API_KEY?.substring(0, 10) + '...');
    
    const result = await model.generateContent('Say hello in one sentence');
    const response = result.response;
    console.log('✅ Success:', response.text());
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testGemini();
