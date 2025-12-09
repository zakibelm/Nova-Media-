import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import AgentCard from './components/AgentCard';
import WorkflowMonitor from './components/WorkflowMonitor';
import SystemConfig from './components/SystemConfig';
import Settings from './components/Settings';
import CampaignInitiator from './components/CampaignInitiator';
import { ActivityChart, TokenUsageChart } from './components/ChartWidgets';
import { ViewState, CampaignIntakeForm, GlobalConfig, LogEntry } from './types';
import { Bot, Play, Pause, Plus, Search, Cpu, ListFilter, ArrowLeft } from 'lucide-react';
import { orchestrator } from './services/orchestratorService';
import { processCampaignIntake } from './services/openRouterService';
import { useLanguage } from './contexts/LanguageContext';

const App = () => {
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [agents, setAgents] = useState(orchestrator.getAgents());
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Global Config State
  const [globalConfig, setGlobalConfig] = useState<GlobalConfig>({
    openRouterApiKey: '',
    agentConfigs: {}
  });

  // Load config & subscribe to orchestrator
  useEffect(() => {
    const savedConfig = localStorage.getItem('nova_global_config');
    if (savedConfig) {
      try {
        setGlobalConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error("Failed to parse saved config", e);
      }
    }

    // Subscribe to logs
    const unsubscribe = orchestrator.subscribe((newLogs) => {
      setLogs(newLogs);
      setAgents([...orchestrator.getAgents()]); // Refresh agents state
    });

    return () => unsubscribe();
  }, []);

  const handleSaveConfig = (newConfig: GlobalConfig) => {
    setGlobalConfig(newConfig);
    localStorage.setItem('nova_global_config', JSON.stringify(newConfig));
  };

  const handleCampaignSubmit = async (data: CampaignIntakeForm) => {
    setIsProcessing(true);
    setCurrentView('dashboard');
    
    try {
      // 1. Trigger the Orchestrator Simulation
      orchestrator.startCampaign(data, globalConfig);
      
      // 2. (Optional) Trigger Real OpenRouter Call for CEO if Key exists
      if (globalConfig.openRouterApiKey) {
        await processCampaignIntake(data, globalConfig);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsProcessing(false), 1000);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'agents':
        return (
          <div className="p-8 pb-24 h-screen overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{t.agents.title}</h2>
                <p className="text-gray-400">{t.agents.subtitle}</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-nova-800 hover:bg-nova-700 text-white px-4 py-2 rounded-lg border border-nova-700 flex items-center gap-2 transition-colors">
                  <ListFilter size={18} /> {t.agents.filter}
                </button>
                <button className="bg-nova-cyan hover:bg-cyan-600 text-nova-900 font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  <Plus size={18} /> {t.agents.newAgent}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {agents.map(agent => (
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
                <h2 className="text-3xl font-bold text-white mb-2">{t.workflow.title}</h2>
                <p className="text-gray-400">{t.workflow.subtitle}</p>
              </div>
              <div className="flex gap-2">
                 <button className="bg-nova-800 p-2 rounded-lg border border-nova-700 text-gray-400 hover:text-white"><Pause size={20}/></button>
                 <button className="bg-nova-cyan p-2 rounded-lg text-nova-900 hover:bg-cyan-400"><Play size={20} fill="currentColor" /></button>
              </div>
            </div>
            <WorkflowMonitor agents={agents} />
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
                <h2 className="text-3xl font-bold text-white mb-1">{t.dashboard.title}</h2>
                <p className="text-gray-400">{t.dashboard.subtitle}</p>
              </div>
              <div className="flex items-center gap-2 bg-nova-800 px-4 py-2 rounded-lg border border-nova-700">
                <span className={`w-2 h-2 rounded-full animate-pulse ${globalConfig.openRouterApiKey ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="text-sm text-gray-300 font-mono">
                  {globalConfig.openRouterApiKey ? t.dashboard.systemOnline : t.dashboard.keyMissing}
                </span>
              </div>
            </div>

            {/* Quick Actions (CEO Input) */}
            <div className="bg-gradient-to-r from-nova-800 to-nova-900 border border-nova-700 rounded-xl p-6 mb-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Bot size={120} /></div>
               <div className="relative z-10 max-w-2xl">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Cpu className="text-nova-purple" />
                    {t.dashboard.launchModule}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    {t.dashboard.launchDesc}
                  </p>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setCurrentView('new_campaign')}
                      className="bg-nova-cyan hover:bg-cyan-500 text-nova-900 font-bold px-8 py-3 rounded-lg flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transform hover:-translate-y-1"
                    >
                      <Plus size={18} /> {t.dashboard.initButton}
                    </button>
                  </div>
               </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-nova-800 border border-nova-700 rounded-xl p-6">
                <h3 className="text-white font-bold mb-4 flex justify-between">
                  <span>{t.dashboard.taskVelocity}</span>
                  <span className="text-green-400 text-xs">+12.5%</span>
                </h3>
                <ActivityChart />
              </div>
              <div className="bg-nova-800 border border-nova-700 rounded-xl p-6">
                 <h3 className="text-white font-bold mb-4 flex justify-between">
                  <span>{t.dashboard.tokenCost}</span>
                  <span className="text-gray-400 text-xs">{t.dashboard.thisWeek}</span>
                </h3>
                <TokenUsageChart />
              </div>
            </div>

            {/* Recent Logs (Connected to Orchestrator) */}
            <div className="bg-nova-800 border border-nova-700 rounded-xl overflow-hidden min-h-[300px] flex flex-col">
               <div className="px-6 py-4 border-b border-nova-700 flex justify-between items-center bg-nova-900/50">
                 <h3 className="font-bold text-white flex items-center gap-2"><ListFilter size={16}/> {t.dashboard.recentLogs}</h3>
                 <span className="text-xs text-nova-cyan font-mono">{logs.length} {t.dashboard.events}</span>
               </div>
               <div className="flex-1 overflow-y-auto max-h-[400px]">
                 {logs.length === 0 ? (
                   <div className="p-8 text-center text-gray-500 text-sm">{t.dashboard.systemIdle}</div>
                 ) : (
                   logs.map((log) => (
                     <div key={log.id} className="px-6 py-3 flex items-center gap-4 text-sm hover:bg-nova-700/30 transition-colors border-b border-nova-700/30 last:border-0">
                       <span className="text-gray-500 font-mono text-xs w-16">{new Date(log.timestamp).toLocaleTimeString([], {hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit'})}</span>
                       <span className={`w-20 px-2 py-0.5 rounded text-[10px] font-bold border text-center ${
                         log.level === 'info' ? 'text-blue-400 border-blue-900 bg-blue-900/20' :
                         log.level === 'warn' ? 'text-yellow-400 border-yellow-900 bg-yellow-900/20' :
                         log.level === 'success' ? 'text-green-400 border-green-900 bg-green-900/20' :
                         'text-red-400 border-red-900 bg-red-900/20'
                       }`}>{log.agentId}</span>
                       <span className="text-gray-300">{log.message}</span>
                     </div>
                   ))
                 )}
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