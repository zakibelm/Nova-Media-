
export type Language = 'fr' | 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

export type AgentRole = 'Direction' | 'Strategy' | 'Creation' | 'Execution' | 'Operations';
export type AgentStatus = 'idle' | 'working' | 'waiting' | 'error' | 'success';

export interface EVVConfig {
  execute: boolean;
  verify: boolean;
  validate: boolean;
}

export interface AgentDefinition {
  id: string;
  name: string;
  role: AgentRole;
  model: string;
  systemPrompt: string;
  default_model: string;
  default_system_prompt: string;
  responsibilities: string[];
  inputs: string[];
  outputs: string[];
  evv: EVVConfig;
  status?: AgentStatus; // Runtime status
  currentTask?: string; // Runtime task
}

export interface WorkflowStep {
  id: string;
  label: string;
  from: string | string[]; // Agent ID(s)
  to: string | string[]; // Agent ID(s)
  action: string;
  requiredOutput?: string;
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
}

export interface CampaignIntake {
  id: string;
  name: string;
  description: string;
  objective: string;
  target: string;
  budget: string;
  deadline: string;
  references: string;
  tone: string;
  status: 'draft' | 'active' | 'completed';
  createdAt: number;
}

export interface CampaignIntakeForm {
  nom_campagne: string;
  description_produit_service: string;
  objectif_marketing: string;
  marche_cible: string;
  budget: string;
  date_debut: string;
  date_fin: string;
  urls_reference: string;
  ton_et_style_souhaite: string;
}

export interface AgentConfig {
  model: string;
  systemPrompt: string;
}

export interface GlobalConfig {
  openRouterApiKey: string;
  agentConfigs: Record<string, AgentConfig>;
}

export type ViewState = 'dashboard' | 'agents' | 'workflow' | 'settings' | 'new_campaign' | 'json_dump';

export interface LogEntry {
  id: string;
  timestamp: number;
  agentId: string;
