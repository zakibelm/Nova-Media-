import React from 'react';
import { NOVA_AGENTS, SYSTEM_RULES, WORKFLOW_DEFINITIONS, CAMPAIGN_INITIATOR_MODULE } from '../constants';
import { FileJson, ShieldAlert, Workflow, Sparkles } from 'lucide-react';

const SystemConfig = () => {
  const agentsJson = JSON.stringify(NOVA_AGENTS.map(a => ({
    agent_name: a.name,
    role: a.role,
    default_model: a.default_model,
    responsibilities: a.responsibilities,
    inputs: a.input_required,
    outputs: a.output,
    evv: a.evv
  })), null, 2);

  const workflowJson = JSON.stringify(WORKFLOW_DEFINITIONS, null, 2);
  const rulesJson = JSON.stringify(SYSTEM_RULES, null, 2);
  const initiatorJson = JSON.stringify(CAMPAIGN_INITIATOR_MODULE, null, 2);

  const CodeBlock = ({ title, icon: Icon, code, color }: any) => (
    <div className="bg-nova-900 border border-nova-700 rounded-xl overflow-hidden flex flex-col h-[500px]">
      <div className="bg-nova-800 px-4 py-3 border-b border-nova-700 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon size={16} className={color} />
          <span className="text-sm font-bold text-white">{title}</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        <pre className="text-[10px] md:text-xs font-mono text-gray-300 leading-relaxed whitespace-pre-wrap">
          {code}
        </pre>
      </div>
    </div>
  );

  return (
    <div className="p-8 pb-24 h-screen overflow-y-auto custom-scrollbar">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Architecture Dump</h2>
        <p className="text-gray-400">Raw JSON definitions of the system.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <CodeBlock 
          title="campaign_initiator.json" 
          icon={Sparkles} 
          code={initiatorJson} 
          color="text-nova-cyan" 
        />
        <CodeBlock 
          title="agents.json" 
          icon={FileJson} 
          code={agentsJson} 
          color="text-blue-400" 
        />
        <CodeBlock 
          title="workflows.json" 
          icon={Workflow} 
          code={workflowJson} 
          color="text-purple-400" 
        />
        <CodeBlock 
          title="orchestrator-rules.json" 
          icon={ShieldAlert} 
          code={rulesJson} 
          color="text-yellow-400" 
        />
      </div>
    </div>
  );
};

export default SystemConfig;