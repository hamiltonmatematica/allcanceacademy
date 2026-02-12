import React, { useState, useRef, useEffect } from 'react';

interface MindMapNodeData {
    id: string;
    label: string;
    children?: MindMapNodeData[];
}

const MIND_MAP_DATA: MindMapNodeData = {
    id: 'root',
    label: 'ARQUITETURA MESTRA DO NEXUS',
    children: [
        {
            id: 'n1',
            label: 'NÍVEL 1 – ORDEM ESTRUTURAL',
            children: [
                { id: 'n1-1', label: '1.1 Clareza' },
                { id: 'n1-2', label: '1.2 Decisão' },
                { id: 'n1-3', label: '1.3 Estrutura' },
            ],
        },
        {
            id: 'n2',
            label: 'NÍVEL 2 – ARQUITETURA ESTRATÉGICA',
            children: [
                { id: 'n2-1', label: '2.1 Diagnóstico Sistêmico' },
                { id: 'n2-2', label: '2.2 Tese Estratégica' },
                { id: 'n2-3', label: '2.3 Direcionadores' },
                { id: 'n2-4', label: '2.4 Roadmap' },
            ],
        },
        {
            id: 'n3',
            label: 'NÍVEL 3 – GOVERNANÇA INSTITUCIONAL',
            children: [
                { id: 'n3-1', label: '3.1 Estrutura de Poder' },
                { id: 'n3-2', label: '3.2 Mecanismos de Decisão' },
                { id: 'n3-3', label: '3.3 Accountability' },
                { id: 'n3-4', label: '3.4 Governança de Risco' },
            ],
        },
        {
            id: 'n4',
            label: 'NÍVEL 4 – ARQUITETURA ORGANIZACIONAL',
            children: [
                { id: 'n4-1', label: '4.1 Design Estrutural' },
                { id: 'n4-2', label: '4.2 Fluxos Operacionais' },
                { id: 'n4-3', label: '4.3 Cultura Estrutural' },
            ],
        },
        {
            id: 'n5',
            label: 'NÍVEL 5 – SISTEMA DE EXECUÇÃO',
            children: [
                { id: 'n5-1', label: '5.1 Backlog Estratégico' },
                { id: 'n5-2', label: '5.2 SCRUM SOB GOVERNANÇA' },
            ],
        },
        {
            id: 'n6',
            label: 'NÍVEL 6 – SISTEMA DE INDICADORES',
            children: [
                { id: 'n6-1', label: '6.1 KPIs Estratégicos' },
                { id: 'n6-2', label: '6.2 KPIs Operacionais' },
                { id: 'n6-3', label: '6.3 KPIs de Governança' },
            ],
        },
        {
            id: 'n7',
            label: 'NÍVEL 7 – SISTEMA DE RISCO',
            children: [
                { id: 'n7-1', label: '7.1 Mapa de Risco' },
                { id: 'n7-2', label: '7.2 Plano de Mitigação' },
            ],
        },
        {
            id: 'n8',
            label: 'NÍVEL 8 – ESCALA E MATURIDADE',
            children: [
                { id: 'n8-1', label: '8.1 Padronização' },
                { id: 'n8-2', label: '8.2 Automação' },
                { id: 'n8-5', label: '8.5 Prep. Investimento' },
            ],
        },
    ],
};

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
            {/* The Node Card */}
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

            {/* Sub-nodes Column */}
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

const InteractiveMindMap: React.FC = () => {
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));
    const [scale, setScale] = useState(0.85);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const canvasRef = useRef<HTMLDivElement>(null);

    const toggleNode = (nodeId: string) => {
        setExpandedNodes((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(nodeId)) {
                newSet.delete(nodeId);
            } else {
                newSet.add(nodeId);
            }
            return newSet;
        });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0) return; // Only left click
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

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleZoom = (delta: number) => {
        setScale(prev => Math.min(Math.max(prev + delta, 0.3), 2));
    };

    const resetView = () => {
        setScale(0.85);
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div className="h-full flex flex-col bg-white overflow-hidden font-sans select-none">
            {/* NotebookLM Style Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white z-20">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                        <span className="p-1.5 bg-blue-600 rounded-lg text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2z" />
                            </svg>
                        </span>
                        Arquitetura Mestra do Nexus
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">
                        Sistematização de Governança & Estratégia
                    </p>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
                    <button
                        onClick={() => handleZoom(-0.1)}
                        className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-500"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                    </button>
                    <span className="text-xs font-bold text-slate-600 w-12 text-center">
                        {Math.round(scale * 100)}%
                    </span>
                    <button
                        onClick={() => handleZoom(0.1)}
                        className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-500"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </button>
                    <div className="w-px h-4 bg-slate-200 mx-1" />
                    <button
                        onClick={resetView}
                        className="px-3 py-1.5 text-[10px] font-bold uppercase text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                        Resetar
                    </button>
                </div>
            </div>

            {/* Pannable Canvas Container */}
            <div
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className={`flex-1 relative overflow-hidden bg-slate-50 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            >
                {/* Background Grid */}
                <div
                    className="absolute inset-0 z-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
                        backgroundSize: '30px 30px',
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transformOrigin: '0 0'
                    }}
                />

                {/* The Tree Logic */}
                <div
                    className="absolute z-10 p-40 transition-transform duration-75 ease-out"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transformOrigin: '0 0'
                    }}
                >
                    <Node
                        node={MIND_MAP_DATA}
                        level={0}
                        expandedNodes={expandedNodes}
                        onToggle={toggleNode}
                    />
                </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="p-3 bg-white border-t border-slate-100 flex justify-between items-center px-6">
                <div className="flex gap-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> ESTRUTURA
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400" /> GOVERNANÇA
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> EXECUÇÃO
                    </span>
                </div>
                <div className="text-[10px] text-slate-300 font-mono tracking-tighter">
                    MODELO ONTOLÓGICO V3.5 // NEXUS_SYSTEM_CORE
                </div>
            </div>
        </div>
    );
};

export default InteractiveMindMap;
