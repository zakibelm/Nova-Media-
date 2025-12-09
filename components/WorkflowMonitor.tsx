import React, { useState } from 'react';
import { ArrowRight, CheckCircle, ShieldCheck, Zap, AlertCircle, GitMerge, Globe, RotateCcw } from 'lucide-react';
import { AgentDefinition } from '../types';
import { WORKFLOW_DEFINITIONS } from '../constants';

interface WorkflowMonitorProps {
  agents: AgentDefinition[];
}

const WorkflowMonitor: React.FC<WorkflowMonitorProps> = ({ agents }) => {
  const [activeTab, setActiveTab] = useState<'global' | 'evv'>('global');

  // Helper to find agent by role/name partially
  const findAgent = (name: string) => agents.find(a => a.name.includes(name) || a.role.includes(name));

  const renderGlobalWorkflow = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-nova-800 p-4 rounded-lg border border-nova-700">
           <h3 className="font-bold text-white flex items-center gap-2">
             <Globe className="text-blue-400" /> Global Project Pipeline
           </h3>
           <span className="text-xs text-gray-400 font-mono">Module 4.2 Standard Flow</span>
        </div>
        <div className="relative border-l-2 border-nova-700 ml-6 space-y-6 py-2">
          {WORKFLOW_DEFINITIONS.main_project_flow.map((step, idx) => (
            <div key={idx} className="relative pl-8">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-nova-900 border-2 border-nova-cyan"></div>
              <div className="bg-nova-800/50 p-3 rounded border border-nova-700/50 hover:border-nova-cyan/30 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-mono text-nova-cyan">STEP {step.step.toString().padStart(2, '0')}</span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500">{step.action}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white">
                  <span className={`font-bold ${Array.isArray(step.from) ? 'text-purple-400' : 'text-gray-300'}`}>
                    {Array.isArray(step.from) ? 'Creation Team' : step.from}
                  </span>
                  <ArrowRight size={14} className="text-gray-600" />
                  <span className={`font-bold ${Array.isArray(step.to) ? 'text-purple-400' : 'text-nova-cyan'}`}>
                    {Array.isArray(step.to) ? step.to.join(' + ') : step.to}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEVVWorkflow = () => {
    return (
      <div className="space-y-6">
         <div className="flex items-center justify-between bg-nova-800 p-4 rounded-lg border border-nova-700">
           <h3 className="font-bold text-white flex items-center gap-2">
             <ShieldCheck className="text-green-400" /> EVV Quality Loop
           </h3>
           <span className="text-xs text-gray-400 font-mono">Module 4.1 Core Logic</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-purple-900 to-green-900 -z-10 -translate-y-1/2"></div>

          {/* EXECUTE */}
          <div className="bg-nova-900 border border-blue-900/50 rounded-xl p-6 relative group">
            <div className="absolute -top-3 left-6 bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded font-bold border border-blue-700">1. EXECUTE</div>
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-blue-900/20 flex items-center justify-center border-2 border-blue-500 text-blue-400">
                <Zap size={32} />
              </div>
            </div>
            <p className="text-sm text-gray-300 text-center mb-2">Agent generates deliverable based on inputs.</p>
            <div className="text-xs text-gray-500 text-center font-mono bg-black/30 p-2 rounded">
              Input: Strict JSON<br/>No UI Generation
            </div>
          </div>

          {/* VERIFY */}
          <div className="bg-nova-900 border border-purple-900/50 rounded-xl p-6 relative group">
            <div className="absolute -top-3 left-6 bg-purple-900 text-purple-200 text-xs px-2 py-1 rounded font-bold border border-purple-700">2. VERIFY</div>
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-purple-900/20 flex items-center justify-center border-2 border-purple-500 text-purple-400">
                <AlertCircle size={32} />
              </div>
            </div>
            <h4 className="text-center font-bold text-white mb-1">QA Agent</h4>
            <ul className="text-xs text-gray-400 space-y-1 list-disc pl-4">
              <li>Check consistency</li>
              <li>Detect Hallucinations</li>
              <li>Verify Logic</li>
            </ul>
          </div>

          {/* VALIDATE */}
          <div className="bg-nova-900 border border-green-900/50 rounded-xl p-6 relative group">
            <div className="absolute -top-3 left-6 bg-green-900 text-green-200 text-xs px-2 py-1 rounded font-bold border border-green-700">3. VALIDATE</div>
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-900/20 flex items-center justify-center border-2 border-green-500 text-green-400">
                <ShieldCheck size={32} />
              </div>
            </div>
            <h4 className="text-center font-bold text-white mb-1">Validator / CEO</h4>
             <div className="flex justify-center gap-2 mt-2">
                <span className="bg-green-900/40 text-green-400 text-[10px] px-2 py-1 rounded border border-green-800">APPROVED</span>
                <span className="bg-red-900/40 text-red-400 text-[10px] px-2 py-1 rounded border border-red-800 flex items-center gap-1">
                  <RotateCcw size={8}/> REJECT
                </span>
             </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="flex gap-4 border-b border-nova-700">
        <button 
          onClick={() => setActiveTab('global')}
          className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'global' ? 'border-nova-cyan text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
        >
          Project Workflow (4.2)
        </button>
        <button 
           onClick={() => setActiveTab('evv')}
           className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'evv' ? 'border-nova-cyan text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
        >
          EVV Pipeline (4.1)
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        {activeTab === 'global' ? renderGlobalWorkflow() : renderEVVWorkflow()}
      </div>
    </div>
  );
};

export default WorkflowMonitor;
