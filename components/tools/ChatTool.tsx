import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SectorType, SECTORS, GET_AI_CONTEXT } from '../../services/mockData';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

interface ChatToolProps {
    sector?: SectorType;
}

const GET_PROMPT_MODES = (sector?: SectorType) => {
    const isRH = sector === 'RH';
    return [
        {
            id: 'executive',
            label: 'Planejamento',
            icon: '💼',
            instruction: isRH
                ? 'Responda com profundidade técnica em Capital Humano, estruturando em: Diagnóstico de Sistemas Humanos, Riscos de Saúde Organizacional, Arquitetura de Papéis proposta, Indicadores de Performance (KPIs) e Plano de Execução (30/60/90 dias). Considere nível Diretor de RH/CHRO. Evite superficialidade.'
                : 'Responda com profundidade executiva, estruturando em: Diagnóstico, Riscos, Arquitetura proposta, Indicadores, Cadência de governança e Plano de execução (120/180/360 dias). Considere nível Conselho/Diretoria. Evite superficialidade.'
        },
        {
            id: 'institutional',
            label: 'Sistemas',
            icon: '🏛️',
            instruction: isRH
                ? 'Responda como Arquiteto de Capital Humano sênior. Estruture em: Enquadramento do Problema Humano, Causas Comportamentais/Sistêmicas, Riscos Organizacionais Invisíveis, Arquitetura de Sistemas Recomendada, Matriz RACI de Responsabilidades e Próximas 3 ações claras. Linguagem técnica e acadêmica de alto nível.'
                : 'Responda como especialista sênior em governança e estratégia. Estruture em: Enquadramento do problema, Causas estruturais, Riscos invisíveis, Arquitetura organizacional recomendada, Modelo de indicadores (KPIs e KRIs), Estrutura de decisão (RACI, Alçadas, Gates) e Próximas 3 ações claras. Linguagem executiva e institucional.'
        },
        {
            id: 'operational',
            label: 'Operacional',
            icon: '⚙️',
            instruction: 'Estruture a resposta como um plano prático e tático, com: Etapas numeradas, Responsáveis diretos, Indicadores de sucesso, Riscos operacionais e Resultado esperado imediato.'
        },
        {
            id: 'theoretical',
            label: 'Conceitos',
            icon: '📜',
            instruction: isRH
                ? 'Responda com rigor acadêmico, citando fundamentos de Psicologia Organizacional, Teoria de Sistemas e Ciência Comportamental de Harvard/MIT/Stanford. Foque na fundamentação teórica do Capital Humano.'
                : 'Responda com rigor conceitual, citando fundamentos teóricos, diferenciações conceituais e aplicações práticas de Governança e Estratégia Moderna.'
        },
        {
            id: 'critical',
            label: 'Analítico',
            icon: '📊',
            instruction: 'Analise criticamente o texto/pergunta abaixo. Identifique: Fragilidades estruturais, Incoerências no desenho de processos, Riscos implícitos ao sistema e Ajustes recomendados de curto prazo.'
        }
    ];
};

const ChatTool: React.FC<ChatToolProps> = ({ sector }) => {
    const sectorData = SECTORS.find(s => s.id === sector);
    const aiContext = sector ? GET_AI_CONTEXT(sector) : '';

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: sector === 'RH'
                ? 'Olá! Estou aqui para elevar o nível da nossa conversa sobre sistemas humanos e saúde organizacional com o máximo rigor técnico. Como posso ajudar você hoje?'
                : `Olá! Como um consultor sênior da ${sectorData?.label || 'Estratégia'}, estou aqui para elevar o nível da nossa conversa. Como posso ajudá-lo hoje?`,
            timestamp: Date.now(),
        },
    ]);
    const [input, setInput] = useState('');
    const [activeMode, setActiveMode] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const promptModes = GET_PROMPT_MODES(sector);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const modeInfo = activeMode ? promptModes.find(m => m.id === activeMode) : null;
        const finalPrompt = modeInfo
            ? `${modeInfo.instruction}\n\nPERGUNTA DO USUÁRIO: ${input.trim()}`
            : input.trim();

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Build context from previous messages to maintain history
            const conversationContext = messages
                .map(msg => `${msg.role === 'user' ? 'Usuário' : 'MentorIA'}: ${msg.content}`)
                .join('\n');

            const { getAIResponse } = await import('../../services/openaiService');

            const responseText = await getAIResponse(finalPrompt, conversationContext, aiContext, sector);

            if (!responseText) {
                throw new Error('Sem resposta da IA');
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: responseText,
                timestamp: Date.now(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error calling OpenAI:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Verifique a configuração da API Key da OpenAI.',
                timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="h-full flex flex-col bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">

            {/* Messages Area with Header embedded */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 premium-scroll">
                {/* Header inside scrollable area */}
                <div className="pb-6 border-b border-emerald-200 mb-6">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                        {sectorData?.label}
                    </h2>
                    <p className="text-sm text-slate-600 mt-2">
                        {sector === 'RH'
                            ? 'Inteligência Estratégica em Sistemas Humanos, Gestão Horizontal e Saúde Organizacional'
                            : 'Consultoria Sênior em Planejamento, Governança e Arquitetura Organizacional'}
                    </p>
                </div>

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-premium-in`}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl px-6 py-5 shadow-sm border ${message.role === 'user'
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-500/20 shadow-emerald-500/10'
                                : 'bg-white text-slate-800 border-slate-100 shadow-slate-200/50'
                                }`}
                        >
                            <div className={`prose prose-base max-w-none ${message.role === 'user' ? 'text-white prose-headings:text-white prose-strong:text-white' : 'text-slate-800'}`}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {message.content}
                                </ReactMarkdown>
                            </div>
                            <span
                                className={`text-xs mt-2 block ${message.role === 'user' ? 'text-emerald-100' : 'text-slate-400'
                                    }`}
                            >
                                {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </span>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white rounded-2xl px-6 py-4 shadow-md">
                            <div className="flex gap-2">
                                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce delay-100" />
                                <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce delay-200" />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-emerald-500/10 glass-effect relative z-20">

                {/* Prompt Modes Selection */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {promptModes.map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => setActiveMode(activeMode === mode.id ? null : mode.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all border ${activeMode === mode.id
                                ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg'
                                : 'bg-white border-emerald-200 text-emerald-700 hover:border-emerald-400'
                                }`}
                        >
                            <span>{mode.icon}</span>
                            {mode.label}
                        </button>
                    ))}
                </div>

                <div className="flex gap-3">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={activeMode
                            ? `Modo ${promptModes.find(m => m.id === activeMode)?.label} ativado. Digite sua pergunta...`
                            : "Digite sua pergunta..."
                        }
                        className="flex-1 px-4 py-3 border border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 resize-none transition-all bg-white/50 backdrop-blur-sm placeholder:text-slate-400 text-sm"
                        rows={2}
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatTool;
