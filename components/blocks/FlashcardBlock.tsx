
import React, { useState } from 'react';
import { Flashcard } from '../../types';

interface FlashcardBlockProps {
  cards: Flashcard[];
}

const FlashcardBlock: React.FC<FlashcardBlockProps> = ({ cards }) => {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const next = () => {
    setFlipped(false);
    setIdx(prev => (prev + 1) % cards.length);
  };

  const prev = () => {
    setFlipped(false);
    setIdx(prev => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
          Revisão de Flashcards
        </h3>
        <span className="text-xs text-slate-400">{idx + 1} / {cards.length}</span>
      </div>

      <div 
        className="relative h-64 w-full perspective-1000 cursor-pointer"
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-indigo-50 border-2 border-indigo-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center shadow-inner">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">Pergunta/Conceito</p>
            <p className="text-xl font-bold text-indigo-900">{cards[idx].front}</p>
            <p className="mt-8 text-xs text-indigo-400 animate-bounce">Clique para virar</p>
          </div>
          
          {/* Back */}
          <div className="absolute inset-0 backface-hidden bg-white border-2 border-indigo-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center shadow-inner rotate-y-180">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Definição/Resposta</p>
            <p className="text-lg font-medium text-slate-700 leading-relaxed">{cards[idx].back}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={prev} className="flex-1 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600 font-medium">Anterior</button>
        <button onClick={next} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium">Próximo</button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </div>
  );
};

export default FlashcardBlock;
