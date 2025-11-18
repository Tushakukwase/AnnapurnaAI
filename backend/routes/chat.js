import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize OpenAI lazily
let openai = null;
const getOpenAI = () => {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  return openai;
};

const ayurvedicResponses = {
  greetings: [
    "Namaste! I'm your Ayurvedic wellness guide. How may I assist you today?",
    "Welcome to AnnapurnaAI! I'm here to help with ancient wisdom for modern health."
  ],
  diet: "In Ayurveda, diet should align with your dosha (body constitution). Vata types benefit from warm, moist foods. Pitta types need cooling foods. Kapha types thrive with light, warm, and spicy foods.",
  digestion: "Agni (digestive fire) is central in Ayurveda. To improve digestion: eat warm foods, avoid cold drinks during meals, include ginger and cumin, and maintain regular meal times.",
  stress: "For stress, Ayurveda recommends: Ashwagandha herb, Brahmi for mental clarity, daily meditation, abhyanga (oil massage), and pranayama (breathing exercises).",
  immunity: "Boost immunity with: Chyawanprash daily, turmeric milk, amla (Indian gooseberry), tulsi tea, and adequate sleep. Avoid cold foods and maintain routine.",
  sleep: "Ayurvedic tips for better sleep: warm milk with nutmeg, abhyanga before bed, avoid screens 1 hour before sleep, sleep by 10 PM, and practice meditation.",
};

router.post('/message', authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;

    // Call OpenAI API
    const ai = getOpenAI();
    const completion = await ai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are AnnapurnaAI, an expert Ayurvedic wellness advisor and nutritionist. 
Your role is to provide guidance based on ancient Ayurvedic wisdom combined with modern understanding.

Key principles to follow:
- Focus on Ayurvedic food recommendations, herbs, and natural remedies
- Explain concepts like doshas (Vata, Pitta, Kapha), agni (digestive fire), and prakriti (constitution)
- Recommend traditional Indian foods and herbs like turmeric, ashwagandha, triphala, tulsi, ginger, etc.
- Provide holistic wellness advice including diet, lifestyle, and natural remedies
- Be warm, compassionate, and use terms like "Namaste" when appropriate
- Keep responses concise (2-3 paragraphs) and actionable
- Always prioritize natural, food-based solutions
- If asked about serious medical conditions, advise consulting a healthcare professional`
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const aiResponse = completion.choices[0].message.content;

    res.json({
      message: aiResponse,
      timestamp: new Date(),
      source: 'openai-gpt'
    });
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    
    // Fallback to basic responses if API fails
    const { message } = req.body;
    const lowerMessage = message.toLowerCase();
    let fallbackResponse = "I can help you with Ayurvedic food recommendations, dosha balance, herbs, and wellness practices. Please ask about digestion, immunity, stress, diet, or specific health concerns.";

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('namaste')) {
      fallbackResponse = ayurvedicResponses.greetings[Math.floor(Math.random() * ayurvedicResponses.greetings.length)];
    } else if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
      fallbackResponse = ayurvedicResponses.diet;
    } else if (lowerMessage.includes('digest') || lowerMessage.includes('stomach') || lowerMessage.includes('acidity')) {
      fallbackResponse = ayurvedicResponses.digestion;
    } else if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('worry')) {
      fallbackResponse = ayurvedicResponses.stress;
    } else if (lowerMessage.includes('immun') || lowerMessage.includes('sick') || lowerMessage.includes('cold')) {
      fallbackResponse = ayurvedicResponses.immunity;
    } else if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
      fallbackResponse = ayurvedicResponses.sleep;
    }

    res.json({
      message: fallbackResponse,
      timestamp: new Date(),
      source: 'fallback'
    });
  }
});

export default router;
