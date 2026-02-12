
import React, { useState } from 'react';
import SectorSelection from './components/SectorSelection';
import ToolNavigation, { ToolType } from './components/ToolNavigation';
import ChatTool from './components/tools/ChatTool';
import VideoTool from './components/tools/VideoTool';
import AudioTool from './components/tools/AudioTool';
import FlashcardsTool from './components/tools/FlashcardsTool';
import InteractiveMindMap from './components/tools/InteractiveMindMap';
import { SectorType, SECTORS } from './services/mockData';

const App: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<SectorType | null>(null);
  const [activeTool, setActiveTool] = useState<ToolType>('chat');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Handle Sector Selection
  const handleSectorSelect = (sector: SectorType) => {
    setSelectedSector(sector);
    setActiveTool('chat'); // Default to chat when entering
  };

  // Return to Sector Selection
  const handleBackToSectors = () => {
    setSelectedSector(null);
    setActiveTool('chat');
  };

  // Show Sector Selection if no sector selected
  if (!selectedSector) {
    return <SectorSelection onSelect={handleSectorSelect} />;
  }

  const currentSectorData = SECTORS.find(s => s.id === selectedSector);

  const renderTool = () => {
    switch (activeTool) {
      case 'chat':
        return <ChatTool />;
      case 'video':
        return <VideoTool />;
      case 'audio':
        return <AudioTool />;
      case 'flashcards':
        return <FlashcardsTool />;
      case 'mindmap':
        return <InteractiveMindMap />;
      default:
        return <ChatTool />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* Tool Navigation Sidebar */}
      <ToolNavigation
        activeTool={activeTool}
        onToolChange={setActiveTool}
        isCollapsed={isSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-emerald-500/20 px-8 py-4 flex items-center justify-between shadow-xl z-30">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 text-emerald-400 hover:bg-white/10 rounded-lg transition-colors border border-emerald-500/20"
              title={isSidebarCollapsed ? "Expandir Menu" : "Recolher Menu"}
            >
              <svg className={`w-6 h-6 transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                {currentSectorData?.label}
              </h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                Plataforma MentorIA - {activeTool.toUpperCase()}
              </p>
            </div>
          </div>

          <button
            onClick={handleBackToSectors}
            className="group flex items-center gap-3 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all hover:scale-105"
          >
            Trocar Setor
          </button>
        </header>

        {/* Tool Content */}
        <div className="flex-1 overflow-hidden">
          {renderTool()}
        </div>
      </div>
    </div>
  );
};

export default App;
