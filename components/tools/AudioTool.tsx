import React, { useState, useRef, useEffect } from 'react';

const AudioTool: React.FC<{ sector: any }> = ({ sector }) => {
    // We import dynamically to avoid issues if metadata is not ready
    const [metadata, setMetadata] = useState<any>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const load = async () => {
            const { GET_MODULE_METADATA } = await import('../../services/mockData');
            setMetadata(GET_MODULE_METADATA(sector));
        };
        load();
    }, [sector]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            const current = audio.currentTime;
            const duration = audio.duration;
            if (duration) setProgress((current / duration) * 100);
        };

        audio.addEventListener('timeupdate', updateProgress);
        return () => audio.removeEventListener('timeupdate', updateProgress);
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) audioRef.current.pause();
            else audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    if (!metadata) return null;

    return (
        <div className="h-full flex flex-col bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-12">
                <div className="pb-6 border-b border-emerald-200 mb-12">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                        {metadata.audioTitle}
                    </h2>
                    <p className="text-slate-600 mt-2">
                        {metadata.audioDesc}
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl p-12 border border-emerald-100">
                        <div className="flex flex-col items-center gap-12">
                            <div className="w-48 h-48 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse">
                                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m0-9.9a5 5 0 00-1.414 1.414m7.072 7.072a2 2 0 11-2.828-2.828 2 2 0 012.828 2.828z" />
                                </svg>
                            </div>

                            <audio ref={audioRef} src="/audio-placeholder.mp3" />

                            <div className="w-full space-y-4">
                                <div className="h-2 w-full bg-emerald-100 rounded-full overflow-hidden cursor-pointer">
                                    <div
                                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs font-bold text-emerald-600 uppercase tracking-widest">
                                    <span>00:00</span>
                                    <span>05:30</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-12">
                                <button className="text-emerald-600 hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M7 6v12l10-6z" /></svg>
                                </button>
                                <button
                                    onClick={togglePlay}
                                    className="w-24 h-24 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 transition-all"
                                >
                                    {isPlaying ? (
                                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                                    ) : (
                                        <svg className="w-10 h-10 ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    )}
                                </button>
                                <button className="text-emerald-600 hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17 6v12l-10-6z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/60 p-6 rounded-2xl border border-emerald-100">
                            <h4 className="font-bold text-emerald-800 mb-2">Ponto Chave 1</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">Consideração estratégica sobre os fundamentos do módulo.</p>
                        </div>
                        <div className="bg-white/60 p-6 rounded-2xl border border-emerald-100">
                            <h4 className="font-bold text-emerald-800 mb-2">Ponto Chave 2</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">Aplicação prática e governança no dia a dia executivo.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioTool;
