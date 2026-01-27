
import React, { useMemo } from 'react';
import { MindMapNode } from '../../types';

interface MindMapBlockProps {
    content: string; // JSON string of MindMapNode
}

// Simple layout calculation
interface RenderNode extends MindMapNode {
    x: number;
    y: number;
    width: number;
    height: number;
    children?: RenderNode[];
}

const NODE_WIDTH = 120;
const NODE_HEIGHT = 40;
const LEVEL_HEIGHT = 100;
const SIBLING_GAP = 20;

const calculateLayout = (node: MindMapNode, depth: number, startX: number): { renderNode: RenderNode, totalWidth: number } => {
    if (!node.children || node.children.length === 0) {
        const width = NODE_WIDTH + SIBLING_GAP;
        return {
            renderNode: {
                ...node,
                x: startX + width / 2,
                y: depth * LEVEL_HEIGHT + 40,
                width: NODE_WIDTH,
                height: NODE_HEIGHT,
                children: []
            },
            totalWidth: width
        };
    }

    let currentX = startX;
    const processedChildren: RenderNode[] = [];
    let childrenTotalWidth = 0;

    node.children.forEach(child => {
        const { renderNode, totalWidth } = calculateLayout(child, depth + 1, currentX);
        processedChildren.push(renderNode);
        currentX += totalWidth;
        childrenTotalWidth += totalWidth;
    });

    // Parent is centered above children
    const x = startX + childrenTotalWidth / 2;

    return {
        renderNode: {
            ...node,
            x,
            y: depth * LEVEL_HEIGHT + 40,
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
            children: processedChildren
        },
        totalWidth: childrenTotalWidth
    };
};

const renderTree = (node: RenderNode) => {
    const elements: JSX.Element[] = [];

    // Draw lines to children first (behind nodes)
    if (node.children) {
        node.children.forEach(child => {
            elements.push(
                <path
                    key={`line-${node.id}-${child.id}`}
                    d={`M ${node.x} ${node.y + node.height / 2} C ${node.x} ${node.y + node.height / 2 + 50}, ${child.x} ${child.y - node.height / 2 - 50}, ${child.x} ${child.y - child.height / 2}`}
                    stroke="#CBD5E1"
                    strokeWidth="2"
                    fill="none"
                />
            );
            elements.push(...renderTree(child));
        });
    }

    // Draw node
    elements.push(
        <g key={node.id} transform={`translate(${node.x - node.width / 2}, ${node.y - node.height / 2})`}>
            <rect
                width={node.width}
                height={node.height}
                rx="8"
                fill="white"
                stroke="#6366F1"
                strokeWidth="2"
                className="shadow-sm"
            />
            <text
                x={node.width / 2}
                y={node.height / 2}
                dy=".35em"
                textAnchor="middle"
                className="text-xs font-semibold fill-slate-700 pointer-events-none"
                style={{ fontSize: '10px' }}
            >
                {node.label.length > 20 ? node.label.substring(0, 18) + '...' : node.label}
            </text>
        </g>
    );

    return elements;
};

const MindMapBlock: React.FC<MindMapBlockProps> = ({ content }) => {
    let data: MindMapNode;
    try {
        data = JSON.parse(content);
    } catch (e) {
        console.error("Invalid MindMap JSON", e);
        return <div className="p-4 text-red-500">Erro ao carregar mapa mental.</div>;
    }

    const { renderNode, totalWidth } = useMemo(() => calculateLayout(data, 0, 0), [data]);

    // Calculate SVG dimensions
    // Crude estimate of height based on depth
    const getDepth = (n: MindMapNode): number => {
        if (!n.children || n.children.length === 0) return 1;
        return 1 + Math.max(...n.children.map(getDepth));
    };
    const totalHeight = getDepth(data) * LEVEL_HEIGHT + 100;

    return (
        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="bg-white p-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    Mapa Mental Interativo
                </div>
                <span className="text-xs font-medium text-slate-400">Visualização Hierárquica</span>
            </div>
            <div className="overflow-x-auto p-4 flex justify-center bg-slate-50/50">
                <svg width={Math.max(totalWidth, 600)} height={totalHeight} className="min-w-full">
                    {renderTree(renderNode)}
                </svg>
            </div>
        </div>
    );
};

export default MindMapBlock;
