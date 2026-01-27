
import React, { useState } from 'react';
import { QuizQuestion } from '../../types';

interface QuizBlockProps {
  questions: QuizQuestion[];
}

const QuizBlock: React.FC<QuizBlockProps> = ({ questions }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (idx: number) => {
    if (showFeedback) return;
    setSelectedIdx(idx);
    setShowFeedback(true);
    if (idx === questions[currentIdx].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedIdx(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center shadow-sm">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
           </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800">Quiz Concluído!</h3>
        <p className="text-slate-600 mt-2">Você acertou {score} de {questions.length} questões.</p>
        <button 
           onClick={() => {
             setCurrentIdx(0);
             setIsFinished(false);
             setScore(0);
             setSelectedIdx(null);
             setShowFeedback(false);
           }}
           className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Refazer Quiz
        </button>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-semibold text-slate-800">Quiz Prático</h3>
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
          {currentIdx + 1} / {questions.length}
        </span>
      </div>

      <div className="p-6">
        <p className="text-lg font-medium text-slate-800 mb-6">{q.question}</p>
        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            let styles = "w-full text-left p-4 rounded-xl border transition-all text-sm ";
            if (showFeedback) {
              if (idx === q.correctAnswer) styles += "bg-green-50 border-green-500 text-green-800 ";
              else if (idx === selectedIdx) styles += "bg-red-50 border-red-500 text-red-800 ";
              else styles += "bg-white border-slate-200 opacity-50 ";
            } else {
              styles += "bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700 ";
            }

            return (
              <button key={idx} onClick={() => handleAnswer(idx)} disabled={showFeedback} className={styles}>
                {opt}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Explicação do MentorIA:</p>
            <p className="text-sm text-slate-700">{q.explanation}</p>
            <button 
              onClick={nextQuestion}
              className="mt-4 w-full bg-slate-800 text-white py-2 rounded-lg font-medium hover:bg-slate-900 transition-colors"
            >
              Próxima Questão
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizBlock;
