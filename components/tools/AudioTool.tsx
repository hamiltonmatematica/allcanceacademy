import React from 'react';

const AudioTool: React.FC = () => {
    return (
        <div className="h-full flex flex-col bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
            <div className="h-full overflow-y-auto p-8 flex flex-col items-center">
                {/* Header inside scrollable area */}
                <div className="w-full max-w-2xl pb-6 border-b border-emerald-200 mb-8">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                        Áudio do Conteúdo
                    </h2>
                    <p className="text-sm text-slate-600 mt-2">
                        Ouça o material enquanto faz outras atividades
                    </p>
                </div>

                <div className="w-full max-w-2xl flex-1 justify-center flex flex-col">
                    <div className="bg-white rounded-3xl shadow-2xl p-12">
                        {/* Audio Visualizer Mockup */}
                        <div className="flex items-center justify-center gap-1 mb-8 h-32">
                            {[...Array(40)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-1 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-full opacity-70"
                                    style={{
                                        height: `${Math.random() * 80 + 20}%`,
                                        animation: `pulse ${Math.random() * 2 + 1}s ease-in-out infinite`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Audio Player */}
                        <audio controls className="w-full">
                            <source src="/audio_Arquitetura Organizacional e Governança.m4a" type="audio/mp4" />
                            Seu navegador não suporta o elemento de áudio.
                        </audio>

                        <div className="mt-6 text-center">
                            <h3 className="font-bold text-lg text-slate-800">
                                Arquitetura Organizacional e Governança
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">Conteúdo completo em áudio</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioTool;
