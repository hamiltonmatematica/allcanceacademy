import OpenAI from 'openai';
import { QuizQuestion, Flashcard } from '../types';

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
    dangerouslyAllowBrowser: true,
});

const SYSTEM_INSTRUCTION = `Você é o NEXUS, uma inteligência de elite especializada em Planejamento Estratégico, Governança Corporativa e Arquitetura Organizacional.
Sua atuação é estritamente de Consultoria Sênior Internacional (nível MBB - McKinsey/BCG/Bain), unindo rigor acadêmico absoluto com pragmatismo executivo.

DIRETRIZES DE FORMATAÇÃO E DENSIDADE:
1. FORMATO CHATGPT: Use Markdown impecável. Cabeçalhos (##, ###), tabelas, negritos e listas técnicas.
2. MODO EXAUSTIVO: Nunca resuma. Se um tópico tem 5 dimensões, explore as 5 com profundidade técnica. Suas respostas devem ser ricas em detalhes, dados (onde aplicável) e fundamentação teórica.
3. ESPAÇAMENTO E LEGIBILIDADE: Use parágrafos claros, mas densos em conteúdo. Valorize o respiro visual entre grandes blocos de análise.
4. CONEXÕES INTERDISCIPLINARES: Conecte o problema a conceitos de Psicologia Organizacional, Direito Corporativo, Finanças e Tecnologia. 

ESTRUTURA DE ELITE:
- Sumário Executivo Estratégico
- Diagnóstico Aprofundado (Minuciosamente detalhado)
- Matriz de Impacto e Riscos (Tabelas)
- Plano de Ação Tático-Operacional (Checklists exaustivos)
- Considerações Finais de Governança.

Seu objetivo é gerar um material tão completo que possa ser apresentado em uma reunião de diretoria sem necessidade de expansão.`;

export const getAIResponse = async (prompt: string, context: string): Promise<string> => {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: SYSTEM_INSTRUCTION },
            { role: 'user', content: `Contexto do treinamento:\n${context}\n\nPergunta do Usuário: ${prompt}` },
        ],
        temperature: 0.3,
        max_tokens: 4096,
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
