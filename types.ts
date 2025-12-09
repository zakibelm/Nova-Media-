export interface EVVConfig {
  execute?: boolean;
  verify?: boolean;
  validate?: boolean;
}

export interface AgentDefinition {
  id: string;
  name: string;
  role: string;
  default_model: string;
  default_system_prompt: string;
  responsibilities?: string[];
  input_required?: string[];
  output?: string[];
  functions?: string[];
  evv: EVVConfig;
  status: 'idle' | 'working' | 'offline' | 'error';
}

export interface AgentConfig {
  model: string;
  systemPrompt: string;
}

export interface GlobalConfig {
  openRouterApiKey: string;
  agentConfigs: Record<string, AgentConfig>;
}

export interface Campaign {
  id: string;
  title: string;
  status: 'planning' | 'executing' | 'reviewing' | 'completed';
  progress: number;
  activeAgents: string[];
}

export interface CampaignIntakeForm {
  nom_campagne: string;
  description_produit_service: string;
  objectif_marketing: string;
  marche_cible: string;
  budget: string;
  deadline: string;
  concurrents_principaux: string;
  urls_reference: string;
  ton_et_style_souhaite: string;
}

export type ViewState = 'dashboard' | 'agents' | 'workflow' | 'settings' | 'new_campaign' | 'json_dump';

export interface MetricData {
  name: string;
  value: number;
  trend: number; // percentage
}

export interface WorkflowStep {
  id: string;
  label: string;
  agents: string[];
  next?: string[];
}