import React from 'react';

const VideoTool: React.FC = () => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const handleSeek = (seconds: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime += seconds;
        }
    };

    const handleSpeed = (speed: number) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = speed;
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleVideoPlay = () => setIsPlaying(true);
    const handleVideoPause = () => setIsPlaying(false);


    return (
        <div className="h-full flex flex-col bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
            <div className="h-full overflow-y-auto p-4 md:p-8">
                {/* Header inside scrollable area */}
                <div className="pb-6 border-b border-emerald-200 mb-6">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                        Aula em Vídeo
                    </h2>
                    <p className="text-sm text-slate-600 mt-2">
                        Assista ao conteúdo completo sobre Arquitetura Organizacional e Governança
                    </p>
                </div>

                <div className="max-w-4xl mx-auto pb-12">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black group">
                        <video
                            ref={videoRef}
                            controls
                            className="w-full aspect-video"
                            poster="/mapamental.png"
                            onPlay={handleVideoPlay}
                            onPause={handleVideoPause}
                        >
                            <source src="/video_Arquitetura Organizacional e Governança.mp4" type="video/mp4" />
                            Seu navegador não suporta vídeo HTML5.
                        </video>

                        {/* Initial Play Overlay - Shows when paused */}
                        {!isPlaying && (
                            <div
                                className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-all z-10"
                                onClick={togglePlay}
                            >
                                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border-4 border-white/50 hover:scale-110 transition-transform duration-300 group-hover:bg-white/30">
                                    <svg className="w-12 h-12 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Custom Controls */}
                    <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-100">
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <button
                                onClick={() => handleSeek(-10)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors font-medium"
                                title="Voltar 10 segundos"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                                </svg>
                                -10s
                            </button>

                            <button
                                onClick={togglePlay}
                                className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all font-bold"
                            >
                                {isPlaying ? (
                                    <>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Pausar
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Play
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => handleSeek(10)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors font-medium"
                                title="Avançar 10 segundos"
                            >
                                +10s
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                </svg>
                            </button>

                            <div className="w-px h-8 bg-emerald-200 mx-2 hidden md:block" />

                            <button
                                onClick={() => handleSpeed(2)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-100 text-teal-700 hover:bg-teal-200 transition-colors font-medium border border-teal-200"
                                title="Velocidade 2x"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                2x
                            </button>

                            <button
                                onClick={() => handleSpeed(1)}
                                className="px-3 py-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors text-sm font-medium"
                                title="Velocidade Normal"
                            >
                                1x
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-emerald-800/60 pb-8">
                        <p>Role para baixo para ver mais detalhes se necessário</p>
                        <svg className="w-6 h-6 mx-auto mt-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoTool;
