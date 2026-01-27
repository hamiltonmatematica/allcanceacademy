
import React from 'react';
import { SECTORS, SectorType } from '../services/mockData';

interface SectorSelectionProps {
    onSelect: (sector: SectorType) => void;
}

const SectorSelection: React.FC<SectorSelectionProps> = ({ onSelect }) => {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-600/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
            </div>

            <div className="max-w-5xl w-full z-10 flex flex-col items-center text-center">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Bem-vindo ao <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Allcance Academy</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Sua plataforma de desenvolvimento corporativo impulsionada por inteligência artificial.
                        Selecione seu departamento para iniciar a jornada personalizada.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {SECTORS.map((sector) => (
                        <button
                            key={sector.id}
                            onClick={() => sector.available && onSelect(sector.id)}
                            disabled={!sector.available}
                            className={`group relative bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 transition-all duration-300 text-left flex flex-col h-full ${sector.available
                                    ? 'hover:border-emerald-500/50 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer'
                                    : 'opacity-60 cursor-not-allowed'
                                }`}
                        >
                            {!sector.available && (
                                <div className="absolute top-4 right-4 bg-amber-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Em breve
                                </div>
                            )}
                            <div className={`w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${sector.available ? 'group-hover:bg-emerald-500/20' : ''
                                }`}>
                                {sector.id === 'FINANCEIRO' && (
                                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                )}
                                {sector.id === 'RH' && (
                                    <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                )}
                                {sector.id === 'ARQUITETURA' && (
                                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                )}
                            </div>

                            <h3 className={`text-xl font-bold text-white mb-2 transition-colors ${sector.available ? 'group-hover:text-emerald-300' : ''
                                }`}>{sector.label}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                                {sector.description}
                            </p>

                            {sector.available && (
                                <div className="flex items-center text-emerald-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                                    Iniciar Trilha <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="mt-16 border-t border-slate-800 pt-8 flex flex-col md:flex-row gap-6 text-slate-500 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>IA Conectada</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span>Conteúdo Dinâmico</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                        <span>Aprendizado Adaptativo</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectorSelection;
