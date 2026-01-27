
import React, { useState, useEffect, useRef } from 'react';
import { startRolePlay } from '../../services/geminiService';

interface RolePlayBlockProps {
  scenario: string;
}

const RolePlayBlock: React.FC<RolePlayBlockProps> = ({ scenario }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [chat, setChat] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleStart = async () => {
    setIsLoading(true);
    try {
      const chatSession = await startRolePlay(scenario);
      setChat(chatSession);
      const firstResponse = await chatSession.sendMessage({ message: "Olá, vamos começar a simulação." });
      setMessages([{ role: 'ai', content: firstResponse.text }]);
      setIsStarted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await chat.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'ai', content: response.text }]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-indigo-200 overflow-hidden shadow-md">
      <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
        <h3 className="font-semibold flex items-center gap-2">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9l-4 4v-4H3a2 2 0 01-2-2V10a2 2 0 012-2h2M9 21V5a2 2 0 012-2h2a2 2 0 012 2v16M9 13h6" />
           </svg>
           Simulação de Atendimento
        </h3>
        {!isStarted && <span className="text-xs bg-indigo-500 px-2 py-1 rounded">Offline</span>}
        {isStarted && <span className="text-xs bg-green-500 px-2 py-1 rounded animate-pulse">Ativo</span>}
      </div>

      {!isStarted ? (
        <div className="p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
          <h4 className="text-lg font-bold text-slate-800">Cenário: {scenario}</h4>
          <p className="text-sm text-slate-600">Pratique suas habilidades de atendimento em um ambiente seguro com feedback em tempo real.</p>
          <button 
            onClick={handleStart}
            disabled={isLoading}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Preparando...' : 'Iniciar Simulação'}
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-[400px]">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 notebook-scroll">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-800 shadow-sm'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-2 rounded-xl flex gap-1 animate-pulse">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-slate-200 bg-white">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Sua resposta..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                Enviar
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Dica: Peça "feedback" para encerrar a sessão e receber avaliação.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolePlayBlock;
