
export enum BlockType {
  TEXT = 'TEXT',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  QUIZ = 'QUIZ',
  FLASHCARD = 'FLASHCARD',
  ROLEPLAY = 'ROLEPLAY',
  MINDMAP = 'MINDMAP'
}

export interface MindMapNode {
  id: string;
  label: string;
  children?: MindMapNode[];
}

export interface ContentBlock {
  id: string;
  type: BlockType;
  title: string;
  content: string; // Text content or URL
  metadata?: any;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface Message {
  role: 'user' | 'model' | 'system';
  parts: { text: string }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

export type ContentType = 'chat' | 'video' | 'quiz' | 'mindmap' | 'audio' | 'text';

export interface Step {
  id: string;
  title: string;
  order: number;
  description?: string;
  contents: {
    chat?: string;
    video?: string;
    quiz?: QuizQuestion[];
    mindmap?: MindMapNode;
    audio?: string;
    text?: string;
  };
  availableTypes: ContentType[];
}
