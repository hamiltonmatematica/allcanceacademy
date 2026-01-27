
import React, { useState } from 'react';

interface VideoBlockProps {
  title: string;
  url: string;
  onCoachingClick: (prompt: string) => void;
}

const VideoBlock: React.FC<VideoBlockProps> = ({ title, url, onCoachingClick }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 text-red-600 rounded-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-800">{title}</h3>
        </div>
        <span className="text-xs font-medium text-slate-500 px-2 py-1 bg-white border border-slate-200 rounded">Vídeo</span>
      </div>
      
      <div className="aspect-video bg-black flex items-center justify-center">
         <iframe
            className="w-full h-full"
            src={url.replace("watch?v=", "embed/")}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
         ></iframe>
      </div>

      <div className="p-4 bg-indigo-50/50 flex flex-col gap-3">
        <p className="text-xs text-indigo-700 font-medium">💡 Sugestões do MentorIA para este vídeo:</p>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => onCoachingClick(`Quero um resumo estruturado deste vídeo: ${title}`)}
            className="text-xs bg-white border border-indigo-200 text-indigo-600 px-3 py-1.5 rounded-full hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
          >
            Resumir pontos-chave
          </button>
          <button 
            onClick={() => onCoachingClick(`O que eu devo prestar atenção especial no treinamento sobre ${title}?`)}
            className="text-xs bg-white border border-indigo-200 text-indigo-600 px-3 py-1.5 rounded-full hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
          >
            Foco de atenção
          </button>
          <button 
            onClick={() => onCoachingClick(`Crie um quiz rápido de 3 perguntas sobre o vídeo ${title}`)}
            className="text-xs bg-white border border-indigo-200 text-indigo-600 px-3 py-1.5 rounded-full hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
          >
            Testar conhecimento
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoBlock;
