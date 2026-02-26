import React, { useState } from 'react';
import { SectorType, GET_MODULE_METADATA } from '../../services/mockData';

interface VideoToolProps {
    sector: SectorType;
}

const VideoTool: React.FC<VideoToolProps> = ({ sector }) => {
    const metadata = GET_MODULE_METADATA(sector);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="h-full flex flex-col bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-12">
                <div className="pb-6 border-b border-emerald-200 mb-12">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                        {metadata.videoTitle}
                    </h2>
                    <p className="text-slate-600 mt-2">
                        {metadata.videoDesc}
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="relative group rounded-3xl overflow-hidden shadow-2xl bg-black aspect-video">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            poster="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80"
                        >
                            <source src="/placeholder-video.mp4" type="video/mp4" />
                        </video>

                        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                            <button
                                onClick={togglePlay}
                                className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:scale-110 transition-all border border-white/30"
                            >
                                {isPlaying ? (
                                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                                ) : (
                                    <svg className="w-12 h-12 ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                )}
                            </button>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                            <div className="flex items-center gap-4 text-white text-sm">
                                <span className="font-mono">00:00 / 15:45</span>
                                <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full w-1/3 bg-emerald-500 rounded-full" />
                                </div>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m0-9.9a5 5 0 00-1.414 1.414m7.072 7.072a2 2 0 11-2.828-2.828 2 2 0 012.828 2.828z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2z" /></svg>
                            </div>
                            <h4 className="font-bold text-slate-800 mb-2">Notas de Aula</h4>
                            <p className="text-sm text-slate-500">Documentação completa em PDF para acompanhamento.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mb-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <h4 className="font-bold text-slate-800 mb-2">Cronograma</h4>
                            <p className="text-sm text-slate-500">Mapeamento de tópicos e minutagem do vídeo.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white mb-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h4 className="font-bold text-slate-800 mb-2">Duração</h4>
                            <p className="text-sm text-slate-500">Tempo estimado de 15 minutos para conclusão.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoTool;
