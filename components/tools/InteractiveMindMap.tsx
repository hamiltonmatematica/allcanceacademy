import React, { useState, useRef, useEffect } from 'react';
import { SectorType, GET_MINDMAP_DATA, MindMapNodeData } from '../../services/mockData';

const Node: React.FC<{
    node: MindMapNodeData;
    level: number;
    expandedNodes: Set<string>;
    onToggle: (id: string) => void
}> = ({ node, level, expandedNodes, onToggle }) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    const colors = [
        'border-emerald-500 text-emerald-700 bg-emerald-50',
        'border-teal-500 text-teal-700 bg-teal-50',
        'border-cyan-500 text-cyan-700 bg-cyan-50',
        'border-slate-400 text-slate-600 bg-slate-50',
    ];

    const colorStyle = colors[Math.min(level, colors.length - 1)];

    return (
        <div className="flex items-center relative py-4">
            <div className="flex items-center">
                {level > 0 && <div className="w-16 h-px bg-slate-300 mr-0" />}
                <div
                    onClick={() => hasChildren && onToggle(node.id)}
                    className={`
                        z-10 px-6 py-4 rounded-xl border-2 shadow-sm transition-all duration-200 min-w-[200px] text-center bg-white
                        ${hasChildren ? 'cursor-pointer hover:shadow-lg hover:border-blue-400' : 'cursor-default'}
                        ${colorStyle}
                    `}
                >
                    <span className={`font-bold tracking-tight ${level === 0 ? 'text-lg text-slate-800' : 'text-sm'}`}>
                        {node.label}
                    </span>
                    {hasChildren && (
                        <div className={`mt-2 text-[10px] font-bold uppercase tracking-widest ${isExpanded ? 'text-blue-500' : 'text-slate-400'}`}>
                            {isExpanded ? 'Fechar' : 'Explorar'}
                        </div>
                    )}
                </div>
                {isExpanded && hasChildren && <div className="w-16 h-px bg-slate-300" />}
            </div>
            {isExpanded && hasChildren && (
                <div className="flex flex-col gap-4 ml-0 pl-0">
                    {node.children!.map((child) => (
                        <Node
                            key={child.id}
                            node={child}
                            level={level + 1}
                            expandedNodes={expandedNodes}
                            onToggle={onToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

interface InteractiveMindMapProps {
    sector: SectorType;
}

const InteractiveMindMap: React.FC<InteractiveMindMapProps> = ({ sector }) => {
    const mindMapData = GET_MINDMAP_DATA(sector);
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([mindMapData.id]));
    const [scale, setScale] = useState(0.85);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setExpandedNodes(new Set([mindMapData.id]));
        setPosition({ x: 0, y: 0 });
    }, [sector, mindMapData.id]);

    const toggleNode = (nodeId: string) => {
        setExpandedNodes((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(nodeId)) newSet.delete(nodeId);
            else newSet.add(nodeId);
            return newSet;
        });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0) return;
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => setIsDragging(false);

    const handleZoom = (delta: number) => setScale(prev => Math.min(Math.max(prev + delta, 0.3), 2));

    const resetView = () => {
        setScale(0.85);
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div className="h-full flex flex-col bg-white overflow-hidden font-sans select-none">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white z-20">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                        <span className="p-1.5 bg-blue-600 rounded-lg text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2z" />
                            </svg>
                        </span>
                        {mindMapData.label}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">
                        {sector === 'RH' ? 'Sistematização de Capital Humano' : 'Sistematização de Governança & Estratégia'}
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                    <button onClick={() => handleZoom(-0.1)} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                    </button>
                    <span className="text-xs font-bold text-slate-600 w-12 text-center">{Math.round(scale * 100)}%</span>
                    <button onClick={() => handleZoom(0.1)} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </button>
                    <div className="w-px h-4 bg-slate-200 mx-1" />
                    <button onClick={resetView} className="px-3 py-1.5 text-[10px] font-bold uppercase text-blue-600 hover:bg-blue-50 rounded-lg transition-all">Resetar</button>
                </div>
            </div>

            <div
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className={`flex-1 relative overflow-hidden bg-slate-50 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            >
                <div
                    className="absolute inset-0 z-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
                        backgroundSize: '30px 30px',
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transformOrigin: '0 0'
                    }}
                />

                <div
                    className="absolute z-10 p-40 transition-transform duration-75 ease-out"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transformOrigin: '0 0'
                    }}
                >
                    <Node node={mindMapData} level={0} expandedNodes={expandedNodes} onToggle={toggleNode} />
                </div>
            </div>

            <div className="p-3 bg-white border-t border-slate-100 flex justify-between items-center px-6">
                <div className="flex gap-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {sector === 'RH' ? 'SISTEMAS' : 'ESTRUTURA'}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400" /> {sector === 'RH' ? 'SAÚDE' : 'GOVERNANÇA'}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> {sector === 'RH' ? 'PESSOAS' : 'EXECUÇÃO'}
                    </span>
                </div>
                <div className="text-[10px] text-slate-300 font-mono tracking-tighter">
                    MODELO ONTOLÓGICO V3.5 // {sector === 'RH' ? 'NEXUS_HR_CORE' : 'NEXUS_SYSTEM_CORE'}
                </div>
            </div>
        </div>
    );
};

export default InteractiveMindMap;
