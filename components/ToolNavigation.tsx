import React from 'react';

type ToolType = 'chat' | 'video' | 'audio' | 'flashcards' | 'mindmap';

interface ToolNavigationProps {
    activeTool: ToolType;
    onToolChange: (tool: ToolType) => void;
    isCollapsed?: boolean;
}

const ToolNavigation: React.FC<ToolNavigationProps> = ({ activeTool, onToolChange, isCollapsed = false }) => {
    const tools: { id: ToolType; label: string; icon: React.ReactNode; gradient: string }[] = [
        {
            id: 'chat',
            label: 'Chat IA',
            gradient: 'from-emerald-500 to-teal-600',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
        }
    ];

    return (
        <div className={`
            fixed lg:relative z-40 h-full
            ${isCollapsed ? 'w-20 -translate-x-full lg:translate-x-0' : 'w-[280px] lg:w-72 translate-x-0'} 
            bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col shadow-2xl border-r border-emerald-500/20 transition-all duration-300 overflow-hidden
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
