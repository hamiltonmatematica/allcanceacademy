import React from 'react';
import { Step } from '../types';

interface StepNavigationProps {
    steps: Step[];
    currentStepId: string;
    onStepChange: (stepId: string) => void;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ steps, currentStepId, onStepChange }) => {
    return (
        <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col h-full">
            <div className="p-6 border-b border-slate-700">
                <h2 className="text-lg font-bold text-white">Passos</h2>
                <p className="text-xs text-slate-400 mt-1">Navegue pelo treinamento</p>
            </div>

            <nav className="flex-1 p-4 overflow-y-auto space-y-2">
                {steps.map((step, index) => {
                    const isActive = step.id === currentStepId;
                    return (
                        <button
                            key={step.id}
                            onClick={() => onStepChange(step.id)}
                            className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isActive ? 'bg-white text-emerald-600' : 'bg-slate-600 text-slate-300'
                                    }`}>
                                    {index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-sm truncate">{step.title}</div>
                                    {step.description && (
                                        <div className="text-xs opacity-75 truncate mt-0.5">{step.description}</div>
                                    )}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-700">
                <div className="text-xs text-slate-400">
                    Progresso: {steps.findIndex(s => s.id === currentStepId) + 1} de {steps.length}
                </div>
            </div>
        </div>
    );
};

export default StepNavigation;
