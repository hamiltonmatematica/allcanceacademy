import React, { useState } from 'react';
import { Step, ContentType, QuizQuestion } from '../types';
import VideoBlock from './blocks/VideoBlock';
import QuizBlock from './blocks/QuizBlock';
import MindMapBlock from './blocks/MindMapBlock';
import AIAssistant from './AIAssistant';

interface ContentViewerProps {
    step: Step;
    aiContext: string;
}

const ContentViewer: React.FC<ContentViewerProps> = ({ step, aiContext }) => {
    const [activeType, setActiveType] = useState<ContentType>(step.availableTypes[0]);

    const renderContent = () => {
        switch (activeType) {
            case 'chat':
                return (
                    <div className="h-full">
                        <AIAssistant context={aiContext + '\n\nPasso atual: ' + step.title + '\n' + (step.contents.chat || '')} />
                    </div>
                );

            case 'text':
                return (
                    <div className="prose prose-slate max-w-none p-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h2>
                        <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {step.contents.text}
                        </div>
                    </div>
                );

            case 'video':
                return step.contents.video ? (
                    <VideoBlock title={step.title} content={step.contents.video} />
                ) : (
                    <div className="p-8 text-center text-slate-500">Vídeo não disponível</div>
                );

            case 'quiz':
                return step.contents.quiz ? (
                    <QuizBlock
                        title={step.title}
                        questions={step.contents.quiz}
                        onComplete={(score) => console.log('Quiz completed with score:', score)}
                    />
                ) : (
                    <div className="p-8 text-center text-slate-500">Quiz não disponível</div>
                );

            case 'mindmap':
                return step.contents.mindmap ? (
                    <MindMapBlock title={step.title} content={JSON.stringify(step.contents.mindmap)} />
                ) : (
                    <div className="p-8 text-center text-slate-500">Mapa mental não disponível</div>
                );

            case 'audio':
                return step.contents.audio ? (
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">{step.title}</h2>
                        <audio controls className="w-full" src={step.contents.audio}>
                            Seu navegador não suporta áudio.
                        </audio>
                    </div>
                ) : (
                    <div className="p-8 text-center text-slate-500">Áudio não disponível</div>
                );

            default:
                return <div className="p-8 text-center text-slate-500">Conteúdo não disponível</div>;
        }
    };

    const getIcon = (type: ContentType) => {
        switch (type) {
            case 'chat':
                return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
            case 'text':
                return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
            case 'video':
                return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
            case 'quiz':
                return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
            case 'mindmap':
                return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
            case 'audio':
                return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m0-9.9a5 5 0 00-1.414 1.414m7.072 7.072a2 2 0 11-2.828-2.828 2 2 0 012.828 2.828z" /></svg>;
        }
    };

    const getLabel = (type: ContentType) => {
        const labels: Record<ContentType, string> = {
            chat: 'Chat',
            text: 'Texto',
            video: 'Vídeo',
            quiz: 'Quiz',
            mindmap: 'Mapa Mental',
            audio: 'Áudio'
        };
        return labels[type];
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-white">
            {/* Content Type Tabs */}
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-3">
                <div className="flex gap-2 overflow-x-auto">
                    {step.availableTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${activeType === type
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                }`}
                        >
                            {getIcon(type)}
                            {getLabel(type)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default ContentViewer;
