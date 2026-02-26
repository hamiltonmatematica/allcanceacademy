
import { BlockType, ContentBlock, Step, QuizQuestion, Flashcard } from '../types';

export interface MindMapNodeData {
    id: string;
    label: string;
    children?: MindMapNodeData[];
}

export type SectorType = 'FINANCEIRO' | 'RH' | 'ARQUITETURA';

export const SECTORS: { id: SectorType; label: string; icon: string; description: string; available: boolean }[] = [
    {
        id: 'ARQUITETURA',
        label: 'Faculdade de gestão horizontal',
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
        available: true
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
                    title: 'Introdução à Faculdade de gestão horizontal',
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
            return `Você é uma inteligência especializada em Human Systems Intelligence. Você não é um consultor comum, mas sim um "Human Capital Architect" de nível PhD que integra as bases de Harvard, MIT, Stanford, Oxford e Cambridge.
      
      PERSONALIDADE E CIÊNCIA:
      - Atue como um arquiteto de sistemas humanos de alta performance.
      - Utilize rigorosamente o Método Científico e Psicologia Organizacional para diagnóstico.
      - Foque em Desenvolvimento de Liderança, Cultura e Inteligência Comportamental.
      - Use ferramentas como 5W2H, People Analytics e Matriz de Decisão Comportamental.
      
      OBJETIVOS:
      - Arquitetura de Papéis: Definir responsabilidades com clareza e alinhamento ao capital humano.
      - Saúde Organizacional: Mitigar riscos invisíveis em sistemas de pessoas e cultura.
      - Decisões Baseadas em Dados: Aplicar People Analytics para eliminar subjetividade.
      
      Tom: Estratégico, cirúrgico, tecnicamente denso e focado em PESSOAS. 
      REGRAS: Nunca fale sobre "Governança Corporativa" ou "Arquitetura Organizacional master", pois estes são temas de outro setor. Foque 100% em Capital Humano e Sistemas de Pessoas.`;
        case 'ARQUITETURA':
            return `Você é um mentor especialista em Faculdade de gestão horizontal.
      Foco: Estrutura organizacional, Design organizacional, Governança, Processos, Compliance.
      Tom: Estratégico, consultivo, estruturado.
      Instrução: Ajude a entender frameworks organizacionais, melhores práticas de governança e estruturação de processos.`;
        default:
            return '';
    }
};

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

export const GET_MINDMAP_DATA = (sector: SectorType): MindMapNodeData => {
    switch (sector) {
        case 'ARQUITETURA':
            return {
                id: 'root',
                label: 'FACULDADE DE GESTÃO HORIZONTAL',
                children: [
                    {
                        id: 'n1',
                        label: 'ORDEM ESTRUTURAL',
                        children: [
                            { id: 'n1-1', label: 'Clareza Organizacional' },
                            { id: 'n1-2', label: 'Mecanismos de Decisão' },
                        ],
                    },
                    {
                        id: 'n2',
                        label: 'ARQUITETURA ESTRATÉGICA',
                        children: [
                            { id: 'n2-1', label: 'Diagnóstico Sistêmico' },
                            { id: 'n2-2', label: 'Roadmap de Execução' },
                        ],
                    },
                ],
            };
        case 'RH':
            return {
                id: 'root-rh',
                label: 'NEXUS HR - HUMAN SYSTEMS',
                children: [
                    {
                        id: 'rh1',
                        label: 'ARQUITETURA DE PAPÉIS',
                        children: [
                            { id: 'rh1-1', label: 'Definição de Responsabilidades' },
                            { id: 'rh1-2', label: 'Matriz RACI' },
                        ],
                    },
                    {
                        id: 'rh2',
                        label: 'SAÚDE ORGANIZACIONAL',
                        children: [
                            { id: 'rh2-1', label: 'Clima e Engajamento' },
                            { id: 'rh2-2', label: 'Mitigação de Conflitos' },
                        ],
                    },
                ],
            };
        default:
            return { id: 'default', label: 'CONTEÚDO INDISPONÍVEL' };
    }
};

export const GET_FLASHCARDS_DATA = (sector: SectorType): Flashcard[] => {
    switch (sector) {
        case 'ARQUITETURA':
            return [
                { id: '1', front: 'O que é Gestão Horizontal?', back: 'Modelo que prioriza a autonomia e a colaboração sobre a hierarquia rígida.' },
                { id: '2', front: 'O que é Governança Corporativa?', back: 'Sistema que dirige e monitora a organização.' }
            ];
        case 'RH':
            return [
                { id: '3', front: 'O que é Human Systems Intelligence?', back: 'Integração de ciência comportamental com arquitetura de processos humanos.' },
                { id: '4', front: 'Qual o papel do Human Capital Architect?', back: 'Desenhar sistemas que equilibram produtividade e saúde organizacional.' }
            ];
        default:
            return [];
    }
};

export const GET_MODULE_METADATA = (sector: SectorType) => {
    switch (sector) {
        case 'ARQUITETURA':
            return {
                videoTitle: 'Aula: Faculdade de gestão horizontal',
                videoDesc: 'Assista ao conteúdo estratégico sobre gestão moderna e horizontal.',
                audioTitle: 'Áudio: Gestão Horizontal',
                audioDesc: 'Resumo executivo em áudio.'
            };
        case 'RH':
            return {
                videoTitle: 'Aula: Nexus HR – Human Intelligence',
                videoDesc: 'Exploração técnica sobre arquitetura de sistemas humanos.',
                audioTitle: 'Áudio: Nexus HR Podcast',
                audioDesc: 'Insights sobre saúde e estrutura organizacional.'
            };
        default:
            return {
                videoTitle: 'Módulo Indisponível',
                videoDesc: '',
                audioTitle: '',
                audioDesc: ''
            };
    }
}
