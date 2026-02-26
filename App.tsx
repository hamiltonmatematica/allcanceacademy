
import React, { useState } from 'react';
import SectorSelection from './components/SectorSelection';
import ToolNavigation, { ToolType } from './components/ToolNavigation';
import ChatTool from './components/tools/ChatTool';
// Novos módulos serão integrados aqui futuramente
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
    return <ChatTool sector={selectedSector} />;
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
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-8 py-5 flex items-center justify-between shadow-sm z-30 relative">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all border border-slate-200 hover:border-emerald-200 shadow-sm"
              title={isSidebarCollapsed ? "Expandir Menu" : "Recolher Menu"}
            >
              <svg className={`w-5 h-5 transition-transform duration-500 ${isSidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 19l-7-7m0 0l7-7m-7 7h18" />
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
