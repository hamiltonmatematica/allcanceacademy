
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, Flashcard } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `Você é um assistente de coaching com IA especializado em treinamento corporativo (MentorIA). 
Sua função é atuar como um mentor digital que ajuda o colaborador a aprender, praticar e aplicar conteúdos de treinamento.
Sempre utilize um tom profissional, encorajador e prático.
Priorize a base de conhecimento fornecida. Se não souber algo, oriente o usuário a procurar um instrutor.
Conecte conteúdos a exemplos de vendas, atendimento, liderança e conformidade.`;

export const getAIResponse = async (prompt: string, context: string) => {
  const model = ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: `Contexto do treinamento:\n${context}\n\nPergunta do Usuário: ${prompt}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
  const response = await model;
  return response.text;
};

export const generateQuiz = async (topic: string, context: string): Promise<QuizQuestion[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: `Gere 3 perguntas de múltipla escolha sobre: ${topic}. Contexto: ${context}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.INTEGER, description: 'Índice da resposta correta (0-indexed)' },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswer", "explanation"]
        }
      }
    },
  });
  return JSON.parse(response.text || '[]');
};

export const generateFlashcards = async (topic: string, context: string): Promise<Flashcard[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Gere 5 flashcards objetivos sobre: ${topic}. Contexto: ${context}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            front: { type: Type.STRING, description: 'Pergunta ou termo' },
            back: { type: Type.STRING, description: 'Definição ou resposta curta' }
          },
          required: ["id", "front", "back"]
        }
      }
    },
  });
  return JSON.parse(response.text || '[]');
};

export const startRolePlay = async (scenario: string) => {
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: `${SYSTEM_INSTRUCTION}\n\nCenário de Role-Play: ${scenario}\nAtue como o cliente ou liderado. Responda de forma curta e realista. Aguarde a resposta do usuário para continuar a simulação. Ao final, quando o usuário pedir feedback ou encerrar, forneça um feedback estruturado.`,
    }
  });
  return chat;
};
