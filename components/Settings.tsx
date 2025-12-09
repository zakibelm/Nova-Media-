import React, { useState, useEffect } from 'react';
import { AgentDefinition, GlobalConfig, AgentConfig } from '../types';
import { NOVA_AGENTS, OPENROUTER_MODELS } from '../constants';
import { Save, Key, Cpu, MessageSquare, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SettingsProps {
  config: GlobalConfig;
  onSave: (newConfig: GlobalConfig) => void;
}

const Settings: React.FC<SettingsProps> = ({ config, onSave }) => {
  const { t, direction } = useLanguage();
  const [apiKey, setApiKey] = useState(config.openRouterApiKey);
  const [agentSettings, setAgentSettings] = useState<Record<string, AgentConfig>>(config.agentConfigs);
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setApiKey(config.openRouterApiKey);
    setAgentSettings(config.agentConfigs);
  }, [config]);

  const handleAgentChange = (id: string, field: keyof AgentConfig, value: string) => {
    setAgentSettings(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const saveSettings = () => {
    onSave({
      openRouterApiKey: apiKey,
      agentConfigs: agentSettings
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getAgentConfig = (agent: AgentDefinition) => {
    return agentSettings[agent.id] || {
      model: agent.default_model,
      systemPrompt: agent.default_system_prompt
    };
  };

  return (
    <div className="p-8 pb-24 h-screen overflow-y-auto custom-scrollbar">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{t.settings.title}</h2>
          <p className="text-gray-400">{t.settings.subtitle}</p>
        </div>
        <button 
          onClick={saveSettings}
          className="bg-nova-cyan hover:bg-cyan-500 text-nova-900 font-bold px-6 py-3 rounded-lg flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
        >
          <Save size={18} /> {showSuccess ? t.settings.saved : t.settings.save}
        </button>
      </div>

      {/* API Key Section */}
      <div className="bg-nova-800 border border-nova-700 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Key className="text-yellow-400" /> {t.settings.apiKeyTitle}
        </h3>
        <div className="bg-nova-900/50 p-4 rounded-lg border border-nova-700/50 mb-4">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            {t.settings.apiKeyLabel}
          </label>
          <input 
            type="password" 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-or-..."
            className="w-full bg-nova-900 border border-nova-700 rounded px-4 py-2 text-white font-mono focus:border-nova-cyan focus:outline-none"
            dir="ltr"
          />
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <AlertCircle size={12} /> {t.settings.apiKeyHelp}
          </p>
        </div>
      </div>

      {/* Agents Configuration */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Cpu className="text-nova-purple" /> {t.settings.agentsTitle}
        </h3>
        
        {NOVA_AGENTS.map((agent) => {
          const cfg = getAgentConfig(agent);
          const isExpanded = expandedAgent === agent.id;

          return (
            <div key={agent.id} className="bg-nova-800 border border-nova-700 rounded-xl overflow-hidden transition-all duration-200">
              <div 
                onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
                className="p-4 flex justify-between items-center cursor-pointer hover:bg-nova-700/30"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${agent.evv.execute ? 'bg-blue-400' : 'bg-gray-600'}`}></div>
                  <span className="font-bold text-white">{agent.name}</span>
                  <span className="text-xs text-gray-400 font-mono px-2 py-0.5 bg-nova-900 rounded">{agent.role}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-nova-cyan font-mono" dir="ltr">{cfg.model}</span>
                  <span className="text-gray-500 text-xs">{isExpanded ? t.settings.collapse : t.settings.editConfig}</span>
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 border-t border-nova-700 bg-nova-900/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        {t.settings.modelLabel}
                      </label>
                      <select 
                        value={cfg.model}
                        onChange={(e) => handleAgentChange(agent.id, 'model', e.target.value)}
                        className="w-full bg-nova-900 border border-nova-700 rounded px-3 py-2 text-white text-sm focus:border-nova-cyan focus:outline-none"
                        dir="ltr"
                      >
                        {OPENROUTER_MODELS.map(m => (
                          <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex justify-between">
                         <span>{t.settings.promptLabel}</span>
                         <MessageSquare size={14} className="text-gray-500" />
                      </label>
                      <textarea 
                        value={cfg.systemPrompt}
                        onChange={(e) => handleAgentChange(agent.id, 'systemPrompt', e.target.value)}
                        rows={6}
                        className="w-full bg-nova-900 border border-nova-700 rounded px-3 py-2 text-white text-sm font-mono focus:border-nova-cyan focus:outline-none leading-relaxed"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;