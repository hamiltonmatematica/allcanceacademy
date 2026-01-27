import React, { useState } from 'react';

interface MindMapNodeData {
    id: string;
    label: string;
    children?: MindMapNodeData[];
}

const MIND_MAP_DATA: MindMapNodeData = {
    id: 'root',
    label: 'Gestão Horizontal',
    children: [
        {
            id: '1',
            label: 'Conselho e Base Central',
            children: [
                { id: '1-1', label: 'Tecnologia de governança' },
                { id: '1-2', label: 'Fim da dependência de chefes' },
                { id: '1-3', label: 'Foco em papéis e fluxos' },
            ],
        },
        {
            id: '2',
            label: 'Diagnóstico de Problemas',
            children: [
                { id: '2-1', label: 'Arquitetura de poder ruim' },
                { id: '2-2', label: 'Decisões concentradas no chefe' },
                { id: '2-3', label: 'Ambiguidade de responsabilidade' },
                { id: '2-4', label: 'Gargalos e heróis bombeiros' },
            ],
        },
        {
            id: '3',
            label: 'Princípios- Chave',
            children: [
                { id: '3-1', label: 'Papéis acima de cargos' },
                { id: '3-2', label: 'Governança distribuída' },
                { id: '3-3', label: 'Arquitetura explícita de decisões' },
                { id: '3-4', label: 'Fluxo acima do esforço individual' },
                { id: '3-5', label: 'Meritocracia estruturada' },
                { id: '3-6', label: 'Liderança facilitadora' },
                { id: '3-7', label: 'Cultura de confiança' },
            ],
        },
        {
            id: '4',
            label: 'Plano de Implementação',
            children: [
                {
                    id: '4-1',
                    label: '0-30 dias: Clarificação',
                    children: [
                        { id: '4-1-1', label: 'Listar decisões críticas' },
                        { id: '4-1-2', label: 'Enunciar mapa de papéis' },
                        { id: '4-1-3', label: 'Formalizar papéis em área' },
                    ],
                },
                {
                    id: '4-2',
                    label: '30-60 dias: Piloto',
                    children: [
                        { id: '4-2-1', label: 'Aplicar time de decisões' },
                        { id: '4-2-2', label: 'Ritual semanal de fluxo' },
                    ],
                },
                {
                    id: '4-3',
                    label: '60-90 dias: Governança',
                    children: [
                        { id: '4-3-1', label: 'Fórum de Arquitetura Horizontal' },
                        { id: '4-3-2', label: 'Ajustes de fluxos e decisões' },
                    ],
                },
            ],
        },
        {
            id: '5',
            label: 'Indicadores (KPIs/KRIs)',
            children: [
                { id: '5-1', label: 'Lead time de decisão' },
                { id: '5-2', label: '% decisões com dono' },
                { id: '5-3', label: 'Índice de clareza de papel' },
                { id: '5-4', label: 'Conflitos entre áreas' },
                { id: '5-5', label: 'Uso/abuso de um caminho' },
                { id: '5-6', label: 'Rotatividade em um significativo' },
            ],
        },
        {
            id: '6',
            label: 'Governança e Cadências',
            children: [
                { id: '6-1', label: 'Reunião semanal de time' },
                { id: '6-2', label: 'Fórum mensal de arquitetura' },
                { id: '6-3', label: 'Revisão trimestral de mérito' },
            ],
        },
    ],
};

const InteractiveMindMap: React.FC = () => {
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));

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

    const renderNode = (node: MindMapNodeData, level: number = 0): React.ReactElement => {
        const isExpanded = expandedNodes.has(node.id);
        const hasChildren = node.children && node.children.length > 0;

        const colors = [
            'from-emerald-600 to-teal-600',
            'from-teal-500 to-cyan-600',
            'from-green-500 to-emerald-600',
            'from-emerald-700 to-teal-800',
            'from-teal-600 to-green-700',
            'from-cyan-600 to-teal-700',
        ];

        const bgColor = colors[level % colors.length];

        return (
            <div key={node.id} className={`${level > 0 ? 'ml-8' : ''} my-3`}>
                <div className="flex items-start gap-3">
                    {hasChildren && (
                        <button
                            onClick={() => toggleNode(node.id)}
                            className="flex-shrink-0 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-emerald-600 hover:scale-110 transition-transform mt-1"
                        >
                            {isExpanded ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            )}
                        </button>
                    )}

                    <div
                        className={`flex-1 bg-gradient-to-r ${bgColor} rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${hasChildren ? 'cursor-pointer' : ''
                            } ${level === 0 ? 'p-6' : 'p-4'}`}
                        onClick={() => hasChildren && toggleNode(node.id)}
                    >
                        <h3
                            className={`font-bold text-white ${level === 0 ? 'text-2xl' : level === 1 ? 'text-lg' : 'text-base'
                                }`}
                        >
                            {node.label}
                        </h3>
                    </div>
                </div>

                {hasChildren && isExpanded && (
                    <div className="mt-3 space-y-2">
                        {node.children!.map((child) => renderNode(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="h-full flex flex-col bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
            <div className="h-full overflow-y-auto p-8">
                {/* Header inside scrollable area */}
                <div className="pb-6 border-b border-emerald-200 mb-8">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                        Mapa Mental Interativo
                    </h2>
                    <p className="text-sm text-slate-600 mt-2">
                        Clique nos nós para expandir e explorar o conteúdo
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">{renderNode(MIND_MAP_DATA)}</div>
            </div>
        </div>
    );
};

export default InteractiveMindMap;
