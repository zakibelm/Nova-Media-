import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import AgentCard from './components/AgentCard';
import WorkflowMonitor from './components/WorkflowMonitor';
import SystemConfig from './components/SystemConfig';
import Settings from './components/Settings';
import CampaignInitiator from './components/CampaignInitiator';
import { ActivityChart, TokenUsageChart } from './components/ChartWidgets';
import { NOVA_AGENTS } from './constants';
import { ViewState, CampaignIntakeForm, GlobalConfig } from './types';
import { Bot, Play, Pause, Plus, Search, Cpu, ListFilter, ArrowLeft } from 'lucide-react';
import { analyzeBriefWithCEO, processCampaignIntake } from './services/openRouterService';

const App = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [activeAgents] = useState(NOVA_AGENTS);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [ceoAnalysis, setCeoAnalysis] = useState<string | null>(null);
  
  // Global Config State
  const [globalConfig, setGlobalConfig] = useState<GlobalConfig>({
    openRouterApiKey: '',
    agentConfigs: {}
  });

  // Load config from local storage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('nova_global_config');
    if (savedConfig) {
      try {
        setGlobalConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error("Failed to parse saved config", e);
      }
    }
  }, []);

  const handleSaveConfig = (newConfig: GlobalConfig) => {
    setGlobalConfig(newConfig);
    localStorage.setItem('nova_global_config', JSON.stringify(newConfig));
  };

  const handleLaunchCampaign = async () => {
    // This is a fallback trigger, main one is CampaignInitiator
    setCurrentView('new_campaign');
  };

  const handleCampaignSubmit = async (data: CampaignIntakeForm) => {
    setIsAnalyzing(true);
    setCeoAnalysis(null);
    setCurrentView('dashboard'); // Return to dashboard to see results
    
    try {
      // Pass the dynamic configuration to the service
      const result = await processCampaignIntake(data, globalConfig);
      setCeoAnalysis(result);
    } catch (e) {
      console.error(e);
      setCeoAnalysis("Error processing campaign intake.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'agents':
        return (
          <div className="p-8 pb-24 h-screen overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Agent Fleet</h2>
                <p className="text-gray-400">19 Autonomous units ready for deployment (EVV Architecture)</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-nova-800 hover:bg-nova-700 text-white px-4 py-2 rounded-lg border border-nova-700 flex items-center gap-2 transition-colors">
                  <ListFilter size={18} /> Filter
                </button>
                <button className="bg-nova-cyan hover:bg-cyan-600 text-nova-900 font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  <Plus size={18} /> New Agent
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activeAgents.map(agent => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        );

      case 'workflow':
        return (
          <div className="p-8 h-screen overflow-y-auto pb-20 custom-scrollbar">
            <div className="flex justify-between items-center mb-8">
               <div>
                <h2 className="text-3xl font-bold text-white mb-2">Orchestration & Workflow</h2>
                <p className="text-gray-400">Real-time EVV (Execute, Verify, Validate) Pipeline Monitor</p>
              </div>
              <div className="flex gap-2">
                 <button className="bg-nova-800 p-2 rounded-lg border border-nova-700 text-gray-400 hover:text-white"><Pause size={20}/></button>
                 <button className="bg-nova-cyan p-2 rounded-lg text-nova-900 hover:bg-cyan-400"><Play size={20} fill="currentColor" /></button>
              </div>
            </div>
            <WorkflowMonitor agents={activeAgents} />
          </div>
        );

      case 'settings':
        return <Settings config={globalConfig} onSave={handleSaveConfig} />;

      case 'json_dump':
        return <SystemConfig />;

      case 'new_campaign':
        return (
          <div className="p-8 h-screen overflow-y-auto pb-20 custom-scrollbar flex items-center justify-center">
            <CampaignInitiator 
              onSubmit={handleCampaignSubmit} 
              onCancel={() => setCurrentView('dashboard')} 
            />
          </div>
        );

      case 'dashboard':
      default:
        return (
          <div className="p-8 h-screen overflow-y-auto pb-20 custom-scrollbar">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">Command Center</h2>
                <p className="text-gray-400">Overview of agency operations and system health.</p>
              </div>
              <div className="flex items-center gap-2 bg-nova-800 px-4 py-2 rounded-lg border border-nova-700">
                <span className={`w-2 h-2 rounded-full animate-pulse ${globalConfig.openRouterApiKey ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="text-sm text-gray-300 font-mono">
                  {globalConfig.openRouterApiKey ? 'SYSTEM ONLINE' : 'API KEY MISSING'}
                </span>
              </div>
            </div>

            {/* Quick Actions (CEO Input) */}
            <div className="bg-gradient-to-r from-nova-800 to-nova-900 border border-nova-700 rounded-xl p-6 mb-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Bot size={120} /></div>
               <div className="relative z-10 max-w-2xl">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Cpu className="text-nova-purple" />
                    Campaign Initiator (Module 0)
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Launch a new marketing campaign via the structured EVV pipeline. This triggers the Campaign Initiator → Client Success Manager handoff.
                  </p>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setCurrentView('new_campaign')}
                      className="bg-nova-cyan hover:bg-cyan-500 text-nova-900 font-bold px-8 py-3 rounded-lg flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transform hover:-translate-y-1"
                    >
                      <Plus size={18} /> INITIALIZE NEW CAMPAIGN
                    </button>
                    {isAnalyzing && (
                      <span className="flex items-center gap-2 text-nova-purple animate-pulse">
                        <Cpu size={18} className="animate-spin" /> Processing Intake...
                      </span>
                    )}
                  </div>

                  {ceoAnalysis && (
                    <div className="mt-6 bg-nova-900/90 p-6 rounded-lg border-l-4 border-nova-cyan text-sm text-gray-300 whitespace-pre-line font-mono animate-in fade-in slide-in-from-top-2 shadow-2xl">
                      <strong className="text-nova-cyan block mb-2 text-lg">CEO ORCHESTRATOR LOG:</strong>
                      {ceoAnalysis}
                    </div>
                  )}
               </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-nova-800 border border-nova-700 rounded-xl p-6">
                <h3 className="text-white font-bold mb-4 flex justify-between">
                  <span>Task Velocity</span>
                  <span className="text-green-400 text-xs">+12.5%</span>
                </h3>
                <ActivityChart />
              </div>
              <div className="bg-nova-800 border border-nova-700 rounded-xl p-6">
                 <h3 className="text-white font-bold mb-4 flex justify-between">
                  <span>Token Consumption (Cost)</span>
                  <span className="text-gray-400 text-xs">This Week</span>
                </h3>
                <TokenUsageChart />
              </div>
            </div>

            {/* Recent Logs */}
            <div className="bg-nova-800 border border-nova-700 rounded-xl overflow-hidden">
               <div className="px-6 py-4 border-b border-nova-700 flex justify-between items-center">
                 <h3 className="font-bold text-white">System Logs</h3>
                 <button className="text-xs text-nova-cyan hover:underline">View All</button>
               </div>
               <div className="divide-y divide-nova-700/50">
                 {[
                   { time: '10:42 AM', source: 'CAO-01', msg: 'Optimized routing for Video Agent to reduce latency.', type: 'info' },
                   { time: '10:38 AM', source: 'QA-01', msg: 'Flagged hallucination in Copywriter output v2.', type: 'warn' },
                   { time: '10:15 AM', source: 'Strat-01', msg: 'Competitor analysis successfully cached in Knowledge Hub.', type: 'success' },
                 ].map((log, i) => (
                   <div key={i} className="px-6 py-3 flex items-center gap-4 text-sm hover:bg-nova-700/30 transition-colors">
                     <span className="text-gray-500 font-mono text-xs">{log.time}</span>
                     <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                       log.type === 'info' ? 'text-blue-400 border-blue-900 bg-blue-900/20' :
                       log.type === 'warn' ? 'text-yellow-400 border-yellow-900 bg-yellow-900/20' :
                       'text-green-400 border-green-900 bg-green-900/20'
                     }`}>{log.source}</span>
                     <span className="text-gray-300 truncate">{log.msg}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-nova-900 text-white font-sans selection:bg-nova-cyan selection:text-nova-900">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="ml-64 flex-1 h-screen relative">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;