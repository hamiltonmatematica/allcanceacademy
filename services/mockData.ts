
import { BlockType, ContentBlock } from '../types';

export type SectorType = 'FINANCEIRO' | 'RH' | 'ARQUITETURA';

export const SECTORS: { id: SectorType; label: string; icon: string; description: string; available: boolean }[] = [
    {
        id: 'ARQUITETURA',
        label: 'Arquitetura Organizacional e Governança',
        icon: 'building',
        description: 'Estrutura organizacional, processos e governança corporativa.',
        available: true
    },
    {
        id: 'FINANCEIRO',
        label: 'Financeiro',
        icon: 'chart-bar',
        description: 'Balanços, Auditoria e Compliance Financeiro.',
        available: false
    },
    {
        id: 'RH',
        label: 'Recursos Humanos',
        icon: 'users',
        description: 'Gestão de Pessoas, Cultura e Recrutamento.',
        available: false
    },
];

export const GET_INITIAL_BLOCKS = (sector: SectorType): ContentBlock[] => {
    switch (sector) {
        case 'FINANCEIRO':
            return [
                {
                    id: 'fin-1',
                    type: BlockType.TEXT,
                    title: 'Introdução ao Compliance',
                    content: 'O compliance financeiro garante que todas as operações estejam em conformidade com as leis e regulamentos internos. A integridade dos dados é nossa prioridade.'
                },
                {
                    id: 'fin-2',
                    type: BlockType.MINDMAP,
                    title: 'Fluxo de Auditoria Interna',
                    content: JSON.stringify({
                        id: 'root',
                        label: 'Processo de Auditoria',
                        children: [
                            { id: '1', label: 'Planejamento', children: [{ id: '1a', label: 'Escopo' }, { id: '1b', label: 'Riscos' }] },
                            { id: '2', label: 'Execução', children: [{ id: '2a', label: 'Coleta de Dados' }, { id: '2b', label: 'Testes' }] },
                            { id: '3', label: 'Relatório' }
                        ]
                    })
                },
                {
                    id: 'fin-3',
                    type: BlockType.VIDEO,
                    title: 'Análise de Balanço',
                    content: 'https://www.youtube.com/watch?v=xyz' // Placeholder
                }
            ];
        case 'RH':
            return [
                {
                    id: 'rh-1',
                    type: BlockType.TEXT,
                    title: 'Cultura Organizacional',
                    content: 'Nossa cultura é baseada em inovação, respeito e colaboração. Todo colaborador é um agente de transformação.'
                },
                {
                    id: 'rh-2',
                    type: BlockType.ROLEPLAY,
                    title: 'Feedback Construtivo',
                    content: 'Simule uma sessão de feedback onde você precisa orientar um colaborador sênior sobre prazos.'
                },
                {
                    id: 'rh-3',
                    type: BlockType.MINDMAP,
                    title: 'Ciclo de Vida do Colaborador',
                    content: JSON.stringify({
                        id: 'root',
                        label: 'Jornada do Colaborador',
                        children: [
                            { id: '1', label: 'Onboarding' },
                            { id: '2', label: 'Desenvolvimento' },
                            { id: '3', label: 'Retenção' },
                            { id: '4', label: 'Offboarding' }
                        ]
                    })
                }
            ];
        case 'ARQUITETURA':
            return [
                {
                    id: 'arq-1',
                    type: BlockType.TEXT,
                    title: 'Introdução à Arquitetura Organizacional',
                    content: 'A arquitetura organizacional define como sua empresa estrutura equipes, processos e sistemas para atingir seus objetivos estratégicos. Uma boa governança garante transparência, responsabilidade e alinhamento.'
                },
                {
                    id: 'arq-2',
                    type: BlockType.MINDMAP,
                    title: 'Pilares da Governança Corporativa',
                    content: JSON.stringify({
                        id: 'root',
                        label: 'Governança Corporativa',
                        children: [
                            { id: '1', label: 'Transparência', children: [{ id: '1a', label: 'Relatórios' }, { id: '1b', label: 'Comunicação' }] },
                            { id: '2', label: 'Equidade' },
                            { id: '3', label: 'Prestação de Contas' },
                            { id: '4', label: 'Responsabilidade Corporativa' }
                        ]
                    })
                },
                {
                    id: 'arq-3',
                    type: BlockType.VIDEO,
                    title: 'Estruturas Organizacionais Modernas',
                    content: 'https://www.youtube.com/watch?v=xyz' // Placeholder
                }
            ];
        default:
            return [];
    }
};

export const GET_AI_CONTEXT = (sector: SectorType): string => {
    switch (sector) {
        case 'FINANCEIRO':
            return `Você é um mentor especialista em Finanças Corporativas.
      Foco: Compliance, Auditoria, Balanços, DRE, Fluxo de Caixa.
      Tom: Formal, preciso, analítico.
      Instrução: Ajude o usuário a entender termos técnicos e processos financeiros complexos.`;
        case 'RH':
            return `Você é um mentor especialista em Recursos Humanos e Gestão de Pessoas.
      Foco: Recrutamento, Cultura, Liderança, Feedback, Treinamento.
      Tom: Empático, motivador, profissional.
      Instrução: Oriente sobre soft skills e gestão de conflitos.`;
        case 'ARQUITETURA':
            return `Você é um mentor especialista em Arquitetura Organizacional e Governança Corporativa.
      Foco: Estrutura organizacional, Design organizacional, Governança, Processos, Compliance.
      Tom: Estratégico, consultivo, estruturado.
      Instrução: Ajude a entender frameworks organizacionais, melhores práticas de governança e estruturação de processos.`;
        default:
            return '';
    }
};

import { Step, QuizQuestion } from '../types';

export const GET_STEPS = (sector: SectorType): Step[] => {
    switch (sector) {
        case 'ARQUITETURA':
            return [
                {
                    id: 'arq-step-1',
                    title: 'Fundamentos de Governança',
                    order: 1,
                    description: 'Conceitos básicos de governança corporativa',
                    availableTypes: ['text', 'chat', 'mindmap'],
                    contents: {
                        text: 'A governança corporativa é o sistema pelo qual as organizações são dirigidas, monitoradas e incentivadas. Envolve práticas e relacionamentos entre acionistas, conselho de administração, diretoria executiva e órgãos de controle.\n\nPrincípios fundamentais:\n• Transparência: divulgação de informações relevantes\n• Equidade: tratamento justo de todas as partes interessadas\n• Prestação de Contas: responsabilidade pelos atos e omissões\n• Responsabilidade Corporativa: sustentabilidade e perenidade',
                        chat: 'Contexto: Este passo introduz os conceitos fundamentais de governança corporativa. Responda perguntas sobre princípios, frameworks e aplicações práticas.',
                        mindmap: {
                            id: 'root',
                            label: 'Governança Corporativa',
                            children: [
                                { id: '1', label: 'Transparência', children: [{ id: '1a', label: 'Relatórios' }, { id: '1b', label: 'Comunicação' }] },
                                { id: '2', label: 'Equidade' },
                                { id: '3', label: 'Prestação de Contas' },
                                { id: '4', label: 'Responsabilidade Corporativa' }
                            ]
                        }
                    }
                },
                {
                    id: 'arq-step-2',
                    title: 'Estruturas Organizacionais',
                    order: 2,
                    description: 'Tipos e modelos de estrutura',
                    availableTypes: ['text', 'chat', 'video', 'quiz'],
                    contents: {
                        text: 'As estruturas organizacionais definem como as atividades são distribuídas, coordenadas e supervisionadas.\n\nTipos principais:\n\n1. Funcional: Agrupamento por especialização\n2. Divisional: Agrupamento por produto/região\n3. Matricial: Combinação de funcional e divisional\n4. Rede: Estrutura flexível e descentralizada\n\nCada tipo possui vantagens e desvantagens específicas dependendo do contexto organizacional.',
                        chat: 'Contexto: Explicar diferentes tipos de estruturas organizacionais e quando aplicar cada uma.',
                        video: 'https://www.youtube.com/watch?v=xyz',
                        quiz: [
                            {
                                question: 'Qual estrutura é mais adequada para empresas com múltiplas linhas de produto?',
                                options: ['Funcional', 'Divisional', 'Linear', 'Staff'],
                                correctAnswer: 1,
                                explanation: 'A estrutura divisional é ideal para empresas com múltiplos produtos ou regiões, permitindo autonomia e foco específico.'
                            },
                            {
                                question: 'Qual vantagem da estrutura matricial?',
                                options: ['Simplicidade', 'Flexibilidade e uso eficiente de recursos', 'Hierarquia clara', 'Baixo custo'],
                                correctAnswer: 1,
                                explanation: 'A estrutura matricial combina as vantagens da estrutura funcional e divisional, oferecendo flexibilidade.'
                            }
                        ]
                    }
                },
                {
                    id: 'arq-step-3',
                    title: 'Processos e Compliance',
                    order: 3,
                    description: 'Gestão de processos e conformidade',
                    availableTypes: ['text', 'chat', 'mindmap'],
                    contents: {
                        text: 'A gestão de processos e compliance garante que a organização opere de maneira eficiente e em conformidade com leis e regulamentos.\n\nElementos-chave:\n• Mapeamento de processos\n• Identificação de riscos\n• Controles internos\n• Auditoria e monitoramento\n• Cultura de compliance',
                        chat: 'Contexto: Ajude a entender como implementar processos eficazes de compliance e gestão de riscos.',
                        mindmap: {
                            id: 'root',
                            label: 'Compliance',
                            children: [
                                { id: '1', label: 'Identificação', children: [{ id: '1a', label: 'Leis' }, { id: '1b', label: 'Regulamentos' }] },
                                { id: '2', label: 'Implementação' },
                                { id: '3', label: 'Monitoramento' },
                                { id: '4', label: 'Melhoria Contínua' }
                            ]
                        }
                    }
                }
            ];
        default:
            return [];
    }
};
