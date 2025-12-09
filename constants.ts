
import { AGENTS_REGISTRY } from './data/agents';
import { WORKFLOWS_REGISTRY } from './data/workflows';

export const NOVA_AGENTS = AGENTS_REGISTRY;

export const WORKFLOW_DEFINITIONS = {
  main_project_flow: WORKFLOWS_REGISTRY['new_campaign'].steps
};

export const OPENROUTER_MODELS = [
  { id: "anthropic/claude-3-opus", name: "Claude 3 Opus" },
  { id: "anthropic/claude-3-sonnet", name: "Claude 3 Sonnet" },
  { id: "anthropic/claude-3-haiku", name: "Claude 3 Haiku" },
  { id: "openai/gpt-4-turbo", name: "GPT-4 Turbo" },
  { id: "openai/gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
  { id: "google/gemini-pro-1.5", name: "Gemini 1.5 Pro" },
  { id: "meta-llama/llama-3-70b-instruct", name: "Llama 3 70B" }
];

export const SYSTEM_RULES = {
  execution_policy: "parallel_where_possible",
  max_recursion_depth: 3,
  evv_check_required: true,
  hallucination_threshold: 0.8,
  retry_strategy: "exponential_backoff"
};

export const CAMPAIGN_INITIATOR_MODULE = {
  module_id: "mod_init_v1",
  status: "active",
  required_fields: [
    "nom_campagne",
    "budget",
    "date_debut",
    "date_fin"
  ],
  route_to: "csm-01",
  validation_rules: "strict"
};
