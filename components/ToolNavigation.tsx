import React from 'react';

type ToolType = 'chat' | 'video' | 'audio' | 'flashcards' | 'mindmap';

interface ToolNavigationProps {
    activeTool: ToolType;
    onToolChange: (tool: ToolType) => void;
    isCollapsed?: boolean;
}

const ToolNavigation: React.FC<ToolNavigationProps> = ({ activeTool, onToolChange, isCollapsed = false }) => {
    const tools: { id: ToolType; label: string; icon: JSX.Element; gradient: string }[] = [
        {
            id: 'chat',
            label: 'Chat IA',
            gradient: 'from-emerald-500 to-teal-600',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
        },
        {
            id: 'video',
            label: 'Vídeo',
            gradient: 'from-teal-500 to-emerald-600',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            id: 'audio',
            label: 'Áudio',
            gradient: 'from-emerald-600 to-green-700',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m0-9.9a5 5 0 00-1.414 1.414m7.072 7.072a2 2 0 11-2.828-2.828 2 2 0 012.828 2.828z" />
                </svg>
            ),
        },
        {
            id: 'flashcards',
            label: 'Flashcards',
            gradient: 'from-green-500 to-teal-600',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
        },
        {
            id: 'mindmap',
            label: 'Mapa Mental',
            gradient: 'from-teal-600 to-emerald-700',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 17a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zM14 17a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" />
                </svg>
            ),
        },
    ];

    return (
        <div className={`
            ${isCollapsed ? 'w-20' : 'w-72'} 
            bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col h-full shadow-2xl border-r border-emerald-500/20 transition-all duration-300 overflow-hidden
        `}>
            {/* Header */}
            <div className={`p-6 border-b border-emerald-500/20 ${isCollapsed ? 'items-center flex flex-col' : ''}`}>
                {!isCollapsed ? (
                    <>
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                            Ferramentas
                        </h2>
                        <p className="text-xs text-slate-400 mt-2">Escolha como deseja aprender</p>
                    </>
                ) : (
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center font-bold text-slate-900 shadow-lg">
                        M
                    </div>
                )}
            </div>

            {/* Tools */}
            <nav className={`flex-1 ${isCollapsed ? 'p-2' : 'p-4'} space-y-4`}>
                {tools.map((tool) => {
                    const isActive = tool.id === activeTool;
                    return (
                        <button
                            key={tool.id}
                            onClick={() => onToolChange(tool.id)}
                            title={isCollapsed ? tool.label : undefined}
                            className={`w-full group relative overflow-hidden rounded-2xl transition-all duration-300 ${isActive
                                ? 'shadow-2xl shadow-emerald-500/30'
                                : 'hover:shadow-xl'
                                } ${isCollapsed ? 'p-2' : ''}`}
                        >
                            {/* Background Gradient */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-80'
                                    } transition-opacity duration-300`}
                            />

                            {/* Default Background */}
                            {!isActive && (
                                <div className="absolute inset-0 bg-slate-800/50 backdrop-blur-sm" />
                            )}

                            {/* Content */}
                            <div className={`relative ${isCollapsed ? 'p-3 flex justify-center' : 'p-5 flex items-center gap-4'}`}>
                                <div
                                    className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                                        } transition-colors duration-300`}
                                >
                                    {tool.icon}
                                </div>
                                {!isCollapsed && (
                                    <div className="flex-1 text-left">
                                        <div
                                            className={`font-bold text-base ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                                                } transition-colors duration-300`}
                                        >
                                            {tool.label}
                                        </div>
                                    </div>
                                )}
                                {isActive && !isCollapsed && (
                                    <div className="flex-shrink-0">
                                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    </div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-emerald-500/20">
                {!isCollapsed ? (
                    <div className="text-xs text-slate-500 text-center">
                        Powered by <span className="text-emerald-400 font-semibold">Allcance Academy</span>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToolNavigation;
export type { ToolType };
