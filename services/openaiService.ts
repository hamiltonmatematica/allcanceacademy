import OpenAI from 'openai';
import { QuizQuestion, Flashcard } from '../types';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
    dangerouslyAllowBrowser: true,
});

const SYSTEM_INSTRUCTION = `Você é um assistente de coaching com IA especializado em treinamento corporativo (MentorIA). 
Sua função é atuar como um mentor digital que ajuda o colaborador a aprender, praticar e aplicar conteúdos de treinamento.
Sempre utilize um tom profissional, encorajador e prático.
Priorize a base de conhecimento fornecida. Se não souber algo, oriente o usuário a procurar um instrutor.
Conecte conteúdos a exemplos de vendas, atendimento, liderança e conformidade.`;

export const getAIResponse = async (prompt: string, context: string): Promise<string> => {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: SYSTEM_INSTRUCTION },
            { role: 'user', content: `Contexto do treinamento:\n${context}\n\nPergunta do Usuário: ${prompt}` },
        ],
        temperature: 0.7,
    });
    return response.choices[0]?.message?.content || '';
};

export const generateQuiz = async (topic: string, context: string): Promise<QuizQuestion[]> => {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: SYSTEM_INSTRUCTION },
            {
                role: 'user',
                content: `Gere 3 perguntas de múltipla escolha sobre: ${topic}. Contexto: ${context}
        
Responda APENAS com um array JSON no seguinte formato:
[
  {
    "question": "pergunta aqui",
    "options": ["opção1", "opção2", "opção3", "opção4"],
    "correctAnswer": 0,
    "explanation": "explicação aqui"
  }
]`,
            },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content || '{"questions":[]}';
    const parsed = JSON.parse(content);
    return parsed.questions || parsed || [];
};

export const generateFlashcards = async (topic: string, context: string): Promise<Flashcard[]> => {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: SYSTEM_INSTRUCTION },
            {
                role: 'user',
                content: `Gere 5 flashcards objetivos sobre: ${topic}. Contexto: ${context}
        
Responda APENAS com um array JSON no seguinte formato:
[
  {
    "id": "1",
    "front": "Pergunta ou termo",
    "back": "Definição ou resposta curta"
  }
]`,
            },
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content || '{"flashcards":[]}';
    const parsed = JSON.parse(content);
    return parsed.flashcards || parsed || [];
};

export const startRolePlay = async (scenario: string) => {
    // For role-play, we return a function that can be called with user messages
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        {
            role: 'system',
            content: `${SYSTEM_INSTRUCTION}\n\nCenário de Role-Play: ${scenario}\nAtue como o cliente ou liderado. Responda de forma curta e realista. Aguarde a resposta do usuário para continuar a simulação. Ao final, quando o usuário pedir feedback ou encerrar, forneça um feedback estruturado.`,
        },
    ];

    return {
        sendMessage: async (userMessage: string) => {
            messages.push({ role: 'user', content: userMessage });
            const response = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages,
                temperature: 0.7,
            });
            const assistantMessage = response.choices[0]?.message?.content || '';
            messages.push({ role: 'assistant', content: assistantMessage });
            return assistantMessage;
        },
    };
};
