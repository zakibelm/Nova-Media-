
import { AGENTS_REGISTRY } from '../data/agents';
import { WORKFLOWS_REGISTRY } from '../data/workflows';
import { AgentDefinition, LogEntry, GlobalConfig } from '../types';

class OrchestratorService {
  private agents: AgentDefinition[];
  private logs: LogEntry[];
  private listeners: ((logs: LogEntry[]) => void)[];

  constructor() {
    this.agents = [...AGENTS_REGISTRY];
    this.logs = [];
    this.listeners = [];
  }

  // --- State Management ---

  public getAgents(): AgentDefinition[] {
    return this.agents;
  }

  public getLogs(): LogEntry[] {
    return this.logs;
  }

  public subscribe(listener: (logs: LogEntry[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private addLog(agentId: string, level: LogEntry['level'], message: string) {
    const log: LogEntry = {
      id: Date.now().toString() + Math.random(),
      timestamp: Date.now(),
      agentId,
      level,
      message
    };
    this.logs = [log, ...this.logs].slice(0, 100); // Keep last 100 logs
    this.listeners.forEach(l => l(this.logs));
  }

  // --- Simulation Logic ---

  public async startCampaign(campaignData: any, config: GlobalConfig): Promise<string> {
    // Reset agents
    this.agents = this.agents.map(a => ({ ...a, status: 'idle' }));
    
    this.addLog('System', 'info', `Initiating Campaign: ${campaignData.nom_campagne}`);
    
    // Step 1: CSM Intake
    await this.simulateAgentWork('csm-01', 1500, 'Structuring Client Brief...');
    
    // Step 2: CEO Analysis
    await this.simulateAgentWork('ceo-01', 2000, 'Analyzing Brief and Routing Tasks...');

    if (!config.openRouterApiKey) {
      this.addLog('System', 'warn', 'Simulation Mode (No API Key). Proceeding with mock execution.');
    }

    // Parallel Execution: Strategy & Research
    this.addLog('ceo-01', 'success', 'Delegating to Strategy and Research.');
    await Promise.all([
        this.simulateAgentWork('res-01', 2500, 'Scraping Market Data...'),
        this.simulateAgentWork('strat-01', 3000, 'Developing 360 Strategy...')
    ]);

    // Handoff to Creation
    this.addLog('strat-01', 'success', 'Strategy Approved. Handoff to Creative Director.');
    await this.simulateAgentWork('cd-01', 2000, 'Developing Creative Concepts...');

    // Parallel Production
    this.addLog('cd-01', 'success', 'Concepts Locked. Production Start.');
    await Promise.all([
        this.simulateAgentWork('cw-01', 2500, 'Writing Copy...'),
        this.simulateAgentWork('des-01', 3000, 'Generating Visuals...'),
        this.simulateAgentWork('smm-01', 2000, 'Scheduling Posts...')
    ]);

    // EVV: QA
    await this.simulateAgentWork('qa-01', 1500, 'Verifying Outputs against Brief...');
    
    // EVV: Validation
    await this.simulateAgentWork('val-01', 1000, 'Final Validation: APPROVED.');

    this.addLog('System', 'success', 'Campaign Workflow Completed Successfully.');
    
    return "Campaign execution initiated successfully. Check logs for details.";
  }

  private async simulateAgentWork(agentId: string, duration: number, task: string) {
    this.updateAgentStatus(agentId, 'working');
    this.addLog(agentId, 'info', task);
    
    await new Promise(resolve => setTimeout(resolve, duration));
    
    this.updateAgentStatus(agentId, 'success');
  }

  private updateAgentStatus(id: string, status: any) {
    this.agents = this.agents.map(a => a.id === id ? { ...a, status } : a);
    // In a real app we would emit an event here to update the UI
  }
}

export const orchestrator = new OrchestratorService();
