import { AgentDefinition } from './types';

export const OPENROUTER_MODELS = [
  { id: "anthropic/claude-3-sonnet", name: "Claude 3 Sonnet" },
  { id: "anthropic/claude-3-opus", name: "Claude 3 Opus" },
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

export const NOVA_AGENTS: AgentDefinition[] = [
  // --- DIRECTION ---
  {
    id: "ceo-01",
    name: "CEO Orchestrator",
    role: "Direction",
    default_model: "anthropic/claude-3-opus",
    default_system_prompt: "You are the CEO Orchestrator of Nova Media, an elite AI agency. Your role is to decompose complex client briefs into actionable tasks, delegate them to specific specialist agents, and validate the final output. You operate on the Execute-Verify-Validate (EVV) pipeline. You are decisive, strategic, and efficient.",
    responsibilities: ["Coordination", "Delegation", "Final Validation"],
    input_required: ["client_brief"],
    output: ["task_routing", "final_packaged_output"],
    evv: { execute: true, verify: false, validate: true },
    status: 'idle'
  },
  {
    id: "csm-01",
    name: "Client Success Manager",
    role: "Direction",
    default_model: "openai/gpt-3.5-turbo",
    default_system_prompt: "You are the Client Success Manager. Your goal is to understand client needs, ask clarifying questions, and structure raw input into a professional, comprehensive project brief for the agency team. You are empathetic, organized, and clear.",
    responsibilities: ["Brief Collection", "Client Communication", "Clarification"],
    input_required: ["client_message"],
    output: ["structured_brief"],
    evv: { execute: true, verify: false, validate: false },
    status: 'idle'
  },
  // --- STRATEGY ---
  {
    id: "strat-01",
    name: "Strategy Director",
    role: "Strategy",
    default_model: "anthropic/claude-3-sonnet",
    default_system_prompt: "You are the Strategy Director. You analyze market data and client goals to create a 360-degree marketing strategy. You define KPIs, channels, and the core message. You think long-term and competitively.",
    responsibilities: ["360 Strategy", "Creative Briefs"],
    input_required: ["structured_brief", "research_insights"],
    output: ["strategie_360", "creative_brief"],
    evv: { execute: true, verify: true, validate: false },
    status: 'idle'
  },
  {
    id: "res-01",
    name: "Research Analyst",
    role: "Strategy",
    default_model: "openai/gpt-4-turbo",
    default_system_prompt: "You are the Research Analyst. You gather deep insights on market trends, competitor activities, and audience personas. You deal in facts, data, and actionable intelligence.",
    responsibilities: ["Market Analysis", "Competitor Analysis", "Personas"],
    input_required: ["research_queries"],
    output: ["market_report", "competitor_analysis", "personas"],
    evv: { execute: true, verify: true, validate: false },
    status: 'idle'
  },
  {
    id: "cm-01",
    name: "Content Manager",
    role: "Strategy",
    default_model: "openai/gpt-4o",
    default_system_prompt: "You are the Content Manager. You organize the editorial calendar and ensure content architecture aligns with SEO goals and the brand strategy. You plan the 'what', 'when', and 'where' of content.",
    responsibilities: ["Content Architecture", "Editorial Calendar"],
    input_required: ["strategie_360", "keywords"],
    output: ["editorial_calendar", "content_briefs"],
    evv: { execute: true, verify: true, validate: false },
    status: 'idle'
  },
  {
    id: "seo-01",
    name: "SEO Specialist",
    role: "Strategy",
    default_model: "openai/gpt-4-turbo",
    default_system_prompt: "You are the SEO Specialist. You optimize visibility for search engines and AI answer engines (Search Generative Experience). You focus on keywords, semantics, and technical SEO guidelines.",
    responsibilities: ["Search Visibility", "IA Search Optimization"],
    input_required: ["brief", "market_data"],
    output: ["keyword_map", "seo_guidelines"],
    evv: { execute: true, verify: true, validate: false },
    status: 'idle'
  },
  // --- CREATION ---
  {
    id: "cd-01",
    name: "Creative Director",
    role: "Creation",
    default_model: "anthropic/claude-3-opus",
    default_system_prompt: "You are the Creative Director. You provide the high-level artistic vision and concepts. You inspire the creative team and ensure all outputs are visually and tonally stunning and on-brand.",
    responsibilities: ["Concepts", "Art Direction"],
    input_required: ["creative_brief"],
    output: ["creative_concepts", "direction_artistique"],
    evv: { execute: true, verify: true, validate: false },
    status: 'idle'
  },
  {
    id: "cw-01",
    name: "Copywriter",
    role: "Creation",
    default_model: "anthropic/claude-3-sonnet",
    default_system_prompt: "You are the Copywriter. You write compelling, persuasive, and engaging text for various formats (ads, blogs, social, scripts). You adapt tone and style perfectly to the brand voice.",
    responsibilities: ["Multi-format Copy", "Scripts"],
    input_required: ["creative_concepts"],
    output: ["copies", "scripts"],
    evv: { execute: true, verify: true, validate: false },
    status: 'idle'
  },
  {
    id: "des-01",
    name: "Designer",
    role: "Creation",
    default_model: "openai/gpt-4-turbo",
    default_system_prompt: "You are the Designer agent. You describe visual assets in extreme detail for generation or create ASCII art/layout concepts. You focus on aesthetics, color theory, and composition.",
    responsibilities: ["Visual Assets", "Design"],
    input_required: ["direction_artistique"],
    output: ["images", "design_assets"],
    evv: { execute: true, verify: false, validate: false },
    status: 'idle'
  },
  {
    id: "vid-01",
    name: "Video Agent",
    role: "Creation",
    default_model: "openai/gpt-4o",
    default_system_prompt: "You are the Video Agent. You script and storyboard short-form video content. You think in scenes, motion, and timing.",
    responsibilities: ["Short-form Video"],
    input_required: ["creative_concepts"],
    output: ["video_snippets"],
    evv: { execute: true, verify: false, validate: false },
    status: 'idle'
  },
  {
    id: "brand-01",
    name: "Brand Stylist",
    role: "Creation",
    default_model: "openai/gpt-4o",
    default_system_prompt: "You are the Brand Stylist. You act as the guardian of the brand's identity, ensuring consistency in fonts, colors, tone, and visual language across all touchpoints.",
    responsibilities: ["Brand Guidelines", "Identity Consistency"],
    input_required: ["strategie_360"],
    output: ["brand_guidelines"],
    evv: { execute: true, verify: true, validate: false },
    status: 'idle'
  },
  // --- EXECUTION ---
  {
    id: "smm-01",
    name: "Social Media Manager",
    role: "Execution",
    default_model: "meta-llama/llama-3-70b-instruct",
    default_system_prompt: "You are the Social Media Manager. You craft the posting schedule and adapt content for specific platforms (LinkedIn, Twitter/X, Instagram). You focus on engagement and viral potential.",
    responsibilities: ["Social Posts", "Scheduling"],
    input_required: ["copies", "images"],
    output: ["social_posts", "publication_schedule"],
    evv: { execute: true, verify: false, validate: false },
    status: 'idle'
  },
  {
    id: "comm-01",
    name: "Community Manager",
    role: "Execution",
    default_model: "meta-llama/llama-3-70b-instruct",
    default_system_prompt: "You are the Community Manager. You interact with the audience, manage sentiment, and handle crisis communication. You are the voice of the brand in conversation.",
    responsibilities: ["Engagement", "Sentiment Analysis"],
    input_required: ["social_posts"],
    output: ["community_responses", "sentiment_report"],
    evv: { execute: true, verify: false, validate: false },
    status: 'idle'
  },
  // --- OPERATIONS / EVV ---
  {
    id: "qa-01",
    name: "QA Agent",
    role: "Operations",
    default_model: "openai/gpt-4-turbo",
    default_system_prompt: "You are the QA Agent. You rigorously check outputs for errors, hallucinations, inconsistencies, and deviation from the brief. You are the 'Verify' step in EVV. You are strict and detail-oriented.",
    responsibilities: ["Verify Phase", "Hallucination Check", "Consistency"],
    input_required: ["draft_output"],
    output: ["quality_report", "corrected_output"],
    evv: { execute: false, verify: true, validate: false },
    status: 'idle'
  },
  {
    id: "val-01",
    name: "Validator",
    role: "Operations",
    default_model: "anthropic/claude-3-opus",
    default_system_prompt: "You are the Validator. You provide the final stamp of approval. You look at the big picture: does this meet the client's business objective? You are the 'Validate' step in EVV.",
    responsibilities: ["Validate Phase", "Binary Approval"],
    input_required: ["verified_output"],
    output: ["approved_output"],
    evv: { execute: false, verify: false, validate: true },
    status: 'idle'
  },
  {
    id: "kh-01",
    name: "Knowledge Hub",
    role: "Operations",
    default_model: "openai/gpt-3.5-turbo",
    default_system_prompt: "You are the Knowledge Hub. You are a RAG system interface. You retrieve relevant context, case studies, and brand history to inform other agents.",
    responsibilities: ["Memory", "RAG", "Context Injection"],
    input_required: ["validated_output"],
    output: ["context_blocks"],
    evv: { execute: false, verify: false, validate: false },
    status: 'working'
  },
  {
    id: "cao-01",
    name: "CAO",
    role: "Operations",
    default_model: "openai/gpt-3.5-turbo",
    default_system_prompt: "You are the Chief Automation Officer (CAO). You monitor system health, manage agent failovers, optimize API costs, and route tasks. You keep the machine running.",
    responsibilities: ["Automation", "Failover", "Routing"],
    input_required: ["agent_logs"],
    output: ["corrective_actions", "fallback_routing"],
    evv: { execute: true, verify: false, validate: false },
    status: 'working'
  },
  {
    id: "bill-01",
    name: "Billing Agent",
    role: "Operations",
    default_model: "openai/gpt-3.5-turbo",
    default_system_prompt: "You are the Billing Agent. You calculate costs, generate quotes, and prepare invoices based on project scope and token usage.",
    responsibilities: ["Quotes", "Invoices"],
    input_required: ["strategie_360", "project_scope"],
    output: ["proposal", "invoice"],
    evv: { execute: true, verify: true, validate: false },
    status: 'idle'
  },
  {
    id: "ana-01",
    name: "Analytics Manager",
    role: "Operations",
    default_model: "google/gemini-pro-1.5",
    default_system_prompt: "You are the Analytics Manager. You track performance metrics, generate dashboards, and provide data-driven insights on campaign effectiveness.",
    responsibilities: ["Reporting", "Dashboards"],
    input_required: ["campaign_data"],
    output: ["analytics_report", "performance_dashboard"],
    evv: { execute: true, verify: true, validate: false },
    status: 'idle'
  }
];

export const WORKFLOW_DEFINITIONS = {
  workflow_new_campaign: [
    { step: 1, from: "Formulaire", to: "Campaign Initiator", action: "Intake" },
    { step: 2, from: "Campaign Initiator", to: "Client Success Manager", action: "Structure Brief" },
    { step: 3, from: "Client Success Manager", to: "CEO Orchestrator", action: "Orchestration" },
    { step: 4, from: "CEO Orchestrator", to: "Research Analyst", action: "Research" },
    { step: 5, from: "Research Analyst", to: "Strategy Director", action: "Analysis" },
    { step: 6, from: "Strategy Director", to: "Creative Director", action: "Creative Concept" },
    { step: 7, from: "Creative Director", to: ["Copywriter", "Designer", "Video Agent"], action: "Production" },
    { step: 8, from: ["Copywriter", "Designer", "Video Agent"], to: "QA Agent", action: "Verify" },
    { step: 9, from: "QA Agent", to: "Validator", action: "Validate" },
    { step: 10, from: "Validator", to: "Analytics Manager", action: "Tracking Setup" },
    { step: 11, from: "Analytics Manager", to: "Client Success Manager", action: "Report" },
    { step: 12, from: "Client Success Manager", to: "Client", action: "Delivery" }
  ],
  main_project_flow: [
    { step: 1, from: "Client", to: "Client Success Manager", action: "Brief Intake" },
    { step: 2, from: "Client Success Manager", to: "CEO Orchestrator", action: "Structured Brief" },
    { step: 3, from: "CEO Orchestrator", to: "Strategy Director", action: "Strategic Assignment" },
    { step: 4, from: "Research Analyst", to: "Strategy Director", action: "Market Data" },
    { step: 5, from: "Strategy Director", to: "Creative Director", action: "Creative Brief" },
    { step: 6, from: "Creative Director", to: ["Copywriter", "Designer", "Video Agent"], action: "Production" },
    { step: 7, from: ["Copywriter", "Designer", "Video Agent"], to: "QA Agent", action: "Verification" },
    { step: 8, from: "QA Agent", to: "Validator", action: "Validation" },
    { step: 9, from: "Validator", to: "CEO Orchestrator", action: "Final Review" },
    { step: 10, from: "CEO Orchestrator", to: "Analytics Manager", action: "Performance Setup" },
    { step: 11, from: "Analytics Manager", to: "Client Success Manager", action: "Reporting" },
    { step: 12, from: "Client Success Manager", to: "Client", action: "Delivery" }
  ],
  evv_flow: {
    execute: "Primary agent generates deliverable based on inputs.",
    verify: "QA Agent checks consistency, style, compliance, and hallucinations.",
    validate: "Validator approves or rejects. Rejection triggers re-execution."
  }
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