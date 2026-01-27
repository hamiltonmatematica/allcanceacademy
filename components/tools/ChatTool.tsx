import React, { useState, useRef, useEffect } from 'react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

const ChatTool: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Olá! Sou especialista em Arquitetura Organizacional e Governança. Como posso ajudá-lo hoje?',
            timestamp: Date.now(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

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

            // Import dynamically to avoid circular dependency issues if any, 
            // though standard import at top is better. 
            // We'll trust the import added at the top.
            const { getAIResponse } = await import('../../services/geminiService');

            const responseText = await getAIResponse(userMessage.content, conversationContext);

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
            console.error('Error calling Gemini:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Verifique a configuração da API Key do Google Gemini.',
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
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* Header inside scrollable area */}
                <div className="pb-6 border-b border-emerald-200 mb-6">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                        Chat com IA Especializada
                    </h2>
                    <p className="text-sm text-slate-600 mt-2">
                        Converse sobre Arquitetura Organizacional e Governança
                    </p>
                </div>

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-6 py-4 shadow-md ${message.role === 'user'
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                                : 'bg-white text-slate-800'
                                }`}
                        >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
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
            <div className="p-6 border-t border-emerald-200 bg-white/80 backdrop-blur-sm">
                <div className="flex gap-3">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Digite sua pergunta sobre governança e arquitetura organizacional..."
                        className="flex-1 px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500 resize-none transition-colors"
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
