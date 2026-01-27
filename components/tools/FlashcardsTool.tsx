import React, { useState, useEffect } from 'react';

interface Flashcard {
    question: string;
    answer: string;
}

const FlashcardsTool: React.FC = () => {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load CSV
        fetch('/flashcards.csv')
            .then((response) => response.text())
            .then((csvText) => {
                const lines = csvText.split('\n');
                const cards: Flashcard[] = lines
                    .filter((line) => line.trim())
                    .map((line) => {
                        // Parse CSV line (handling quoted fields)
                        const match = line.match(/^"?([^"]*)"?,"?([^"]*)"?$/);
                        if (match) {
                            return {
                                question: match[1].replace(/^"|"$/g, '').trim(),
                                answer: match[2].replace(/^"|"$/g, '').trim(),
                            };
                        }
                        return null;
                    })
                    .filter((card): card is Flashcard => card !== null);

                setFlashcards(cards);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error loading flashcards:', error);
                setLoading(false);
            });
    }, []);

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % flashcards.length);
        }, 150);
    };

    const handlePrevious = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
        }, 150);
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Carregando flashcards...</p>
                </div>
            </div>
        );
    }

    if (!flashcards.length) {
        return (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
                <p className="text-slate-600">Nenhum flashcard encontrado.</p>
            </div>
        );
    }

    const currentCard = flashcards[currentIndex];

    // Safeguard against undefined card to prevent crash
    if (!currentCard) {
        return (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
                <p className="text-slate-600">Erro ao carregar card atual.</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
            <div className="h-full overflow-y-auto p-8">
                {/* Header inside scrollable area */}
                <div className="pb-6 border-b border-emerald-200 mb-8">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                        Flashcards - Gestão Horizontal
                    </h2>
                    <p className="text-sm text-slate-600 mt-2">
                        {flashcards.length} cards • {currentIndex + 1} de {flashcards.length}
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center pb-12">
                    {/* Flashcard */}
                    <div
                        className="w-full max-w-2xl h-96 cursor-pointer flex-shrink-0"
                        style={{ perspective: '1000px' }} // Inline perspective for safety
                        onClick={handleFlip}
                    >
                        <div
                            className={`relative w-full h-full transition-transform duration-500`}
                            style={{
                                transformStyle: 'preserve-3d',
                                WebkitTransformStyle: 'preserve-3d', // Safari support
                                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                            }}
                        >
                            {/* Front */}
                            <div
                                className="absolute w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-2xl p-12 flex flex-col items-center justify-center"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden' // Safari support
                                }}
                            >
                                <div className="text-sm font-semibold text-emerald-100 mb-4">PERGUNTA</div>
                                <p className="text-white text-2xl font-bold text-center leading-relaxed">
                                    {currentCard.question}
                                </p>
                                <div className="mt-8 text-emerald-100 text-sm">Clique para ver a resposta</div>
                            </div>

                            {/* Back */}
                            <div
                                className="absolute w-full h-full bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl shadow-2xl p-12 flex flex-col items-center justify-center"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    WebkitBackfaceVisibility: 'hidden', // Safari support
                                    transform: 'rotateY(180deg)',
                                }}
                            >
                                <div className="text-sm font-semibold text-green-100 mb-4">RESPOSTA</div>
                                <p className="text-white text-xl text-center leading-relaxed">{currentCard.answer}</p>
                                <div className="mt-8 text-green-100 text-sm">Clique para voltar</div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-6 mt-12 flex-shrink-0">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrevious();
                            }}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-105 text-emerald-600 font-semibold"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Anterior
                        </button>

                        <div className="text-slate-600 font-bold text-lg min-w-[100px] text-center">
                            {currentIndex + 1} / {flashcards.length}
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNext();
                            }}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 shadow-lg hover:shadow-xl hover:bg-emerald-700 transition-all hover:scale-105 text-white font-semibold"
                        >
                            Próximo
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-8 text-center text-emerald-800/60">
                        <p>Role para baixo se necessário</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashcardsTool;
