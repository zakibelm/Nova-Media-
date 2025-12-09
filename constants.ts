
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
  { id: "openai/gpt-4o", name: "GPT-4o" },
  { id: "openai/gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
  { id: "google/gemini-pro-1.5", name: "Gemini 1.5 Pro" },
  { id: "google/gemini-flash-1.5", name: "Gemini 1.5 Flash" },
  { id: "meta-llama/llama-3-70b-instruct", name: "Llama 3 70B" },
  { id: "mistralai/mixtral-8x22b-instruct", name: "Mixtral 8x22B" },
];

export const CAMPAIGN_INITIATOR_MODULE = {
  description: "Point d'entrée du workflow Nova Media. Simule un formulaire interne permettant de lancer une nouvelle campagne marketing.",
  input_form_fields: [
    "nom_campagne",
    "description_produit_service",
    "objectif_marketing",
    "marche_cible",
    "budget",
    "deadline",
    "concurrents_principaux",
    "urls_reference",
    "ton_et_style_souhaite"
  ],
  process: [
    "1. L'utilisateur ou client remplit les champs.",
    "2. Le Campaign Initiator assemble un BRIEF_INITIAL formaté.",
    "3. Le BRIEF_INITIAL est envoyé au Client Success Manager.",
    "4. Le Client Success Manager structure et clarifie le brief.",
    "5. Le BRIEF_STRUCTURE est envoyé au CEO Orchestrator.",
    "6. Le CEO déclenche le pipeline multi-agents."
  ],
  output: "brief_structure"
};

export const SYSTEM_RULES = {
  anti_hallucination: [
    "Never invent data not provided in inputs or memory.",
    "If information is missing, request clarification immediately.",
    "If uncertain, output must explicitly state: 'insufficient_data'."
  ],
  structure: [
    "Output must be strictly structured (JSON/Markdown).",
    "No UI generation (HTML/CSS/React) unless explicitly requested.",
    "Responses must be strictly based on inputs."
  ],
  fallback: [
    "If a model fails, CAO activates a smaller/faster fallback model.",
    "If error persists (x2), route task back to CEO Orchestrator."
  ]
};
