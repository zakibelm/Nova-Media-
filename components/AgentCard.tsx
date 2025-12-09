import React from 'react';
import { AgentDefinition } from '../types';
import { Bot, BrainCircuit, CheckCircle2, Terminal, Briefcase, PenTool, BarChart3, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AgentCardProps {
  agent: AgentDefinition;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const { t, direction } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'working': return 'text-nova-warning border-nova-warning bg-nova-warning/10';
      case 'idle': return 'text-gray-400 border-gray-600 bg-nova-800';
      case 'error': return 'text-nova-error border-nova-error bg-nova-error/10';
      default: return 'text-gray-400 border-gray-600';
    }
  };

  const getRoleIcon = (role: string) => {
    switch(role) {
      case 'Direction': return <Briefcase size={24} className="text-yellow-400" />;
      case 'Strategy': return <BrainCircuit size={24} className="text-nova-cyan" />;
      case 'Creation': return <PenTool size={24} className="text-pink-400" />;
      case 'Execution': return <Zap size={24} className="text-orange-400" />;
      case 'Operations': return <ShieldCheck size={24} className="text-nova-purple" />;
      default: return <Bot size={24} className="text-gray-400" />;
    }
  };

  return (
    <div className="bg-nova-800 border border-nova-700 rounded-xl p-5 hover:border-nova-cyan/50 transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
      {/* Background decoration */}
      <div className={`absolute top-0 ${direction === 'rtl' ? 'left-0 -ml-10' : 'right-0 -mr-10'} -mt-10 w-24 h-24 bg-nova-cyan/5 rounded-full blur-2xl group-hover:bg-nova-cyan/10 transition-all`}></div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="p-2 bg-nova-900 rounded-lg border border-nova-700">
          {getRoleIcon(agent.role)}
        </div>
        <div className={`px-2 py-1 rounded text-[10px] uppercase font-bold border ${getStatusColor(agent.status)}`}>
          {agent.status}
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-1">{agent.name}</h3>
      <p className="text-xs text-nova-cyan mb-2 font-mono" dir="ltr">{agent.default_model}</p>
      
      {/* Responsibilities */}
      <div className="mb-4 flex-grow">
        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{t.agents.responsibilities}</p>
        <div className="flex flex-wrap gap-1">
          {agent.responsibilities?.slice(0, 3).map((resp, i) => (
            <span key={i} className="text-[10px] bg-nova-900 text-gray-300 px-1.5 py-0.5 rounded border border-nova-700/50">
              {resp}
            </span>
          ))}
          {agent.responsibilities && agent.responsibilities.length > 3 && (
            <span className="text-[10px] text-gray-500">+{agent.responsibilities.length - 3}</span>
          )}
        </div>
      </div>

      {/* IO Tags */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-[10px]">
        <div>
          <span className="text-gray-500 block mb-1">{t.agents.input}</span>
          <div className="flex flex-wrap gap-1">
            {agent.input_required?.slice(0, 2).map((inpt, i) => (
              <span key={i} className="text-blue-300/70">{inpt}</span>
            ))}
          </div>
        </div>
        <div>
           <span className="text-gray-500 block mb-1">{t.agents.output}</span>
           <div className="flex flex-wrap gap-1">
            {agent.output?.slice(0, 2).map((out, i) => (
              <span key={i} className="text-green-300/70">{out}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto border-t border-nova-700/50 pt-3">
        {Object.entries(agent.evv).map(([key, val]) => (
          val && (
            <span key={key} className={`text-[10px] border px-2 py-1 rounded flex items-center gap-1 font-bold ${
              key === 'execute' ? 'border-blue-900 bg-blue-900/20 text-blue-400' :
              key === 'verify' ? 'border-purple-900 bg-purple-900/20 text-purple-400' :
              'border-green-900 bg-green-900/20 text-green-400'
            }`}>
              {key === 'execute' && <Zap size={10} />}
              {key === 'verify' && <CheckCircle2 size={10} />}
              {key === 'validate' && <ShieldCheck size={10} />}
              {key.toUpperCase()}
            </span>
          )
        ))}
      </div>
    </div>
  );
};

export default AgentCard;