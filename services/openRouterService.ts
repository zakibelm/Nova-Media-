
import { CampaignIntakeForm, GlobalConfig, AgentConfig } from "../types";
import { NOVA_AGENTS } from "../constants";

// Helper to get agent config or fallback to defaults
const getAgentConfig = (agentId: string, globalConfig: GlobalConfig | null): AgentConfig => {
  const defaultAgent = NOVA_AGENTS.find(a => a.id === agentId);
  const userConfig = globalConfig?.agentConfigs[agentId];

  return {
    model: userConfig?.model || defaultAgent?.default_model || "openai/gpt-3.5-turbo",
    systemPrompt: userConfig?.systemPrompt || defaultAgent?.default_system_prompt || "You are a helpful AI agent."
  };
};

export const processCampaignIntake = async (data: CampaignIntakeForm, config: GlobalConfig) => {
  if (!config.openRouterApiKey) {
     await new Promise(resolve => setTimeout(resolve, 2000));
     return `[SYSTEM ALERT: MISSING OPENROUTER API KEY]
     
     Please go to Settings (System Config) and enter your OpenRouter API Key to activate the agents.
     
     SIMULATION - CEO RESPONSE:
     Campaign: ${data.nom_campagne}
     Target: ${data.marche_cible}
     
     I would normally route this to Strategy and Research, but I need an API key first.`;
  }

  // CEO Agent ID is 'ceo-01'
  const agentConfig = getAgentConfig('ceo-01', config);

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${config.openRouterApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: agentConfig.model,
        messages: [
          {
            role: "system",
            content: agentConfig.systemPrompt
          },
          {
            role: "user",
            content: `A new campaign has been initiated via the Campaign Initiator module.
            
            INTAKE DATA:
            Name: ${data.nom_campagne}
            Description: ${data.description_produit_service}
            Objective: ${data.objectif_marketing}
            Target: ${data.marche_cible}
            Budget: ${data.budget}
            Duration: ${data.date_debut} to ${data.date_fin}
            Reference URLs: ${data.urls_reference}
            Tone: ${data.ton_et_style_souhaite}
            
            Act as the CEO receiving this structured brief. 
            1. Confirm receipt.
            2. Outline the initial agent delegation plan based on this specific data.
            3. State the immediate next step in the EVV pipeline.`
          }
        ]
      })
    });

    if (!response.ok) {
        throw new Error(`OpenRouter API Error: ${response.statusText}`);
    }

    const json = await response.json();
    return json.choices[0].message.content;

  } catch (error) {
    console.error("OpenRouter Service Error:", error);
    return `[ERROR] Failed to communicate with Agent CEO-01 via OpenRouter. Details: ${error}`;
  }
};

export const analyzeBriefWithCEO = async (brief: string, config: GlobalConfig) => {
  if (!config.openRouterApiKey) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return `[SYSTEM ALERT: MISSING API KEY] Please configure OpenRouter Key in Settings.`;
  }

  const agentConfig = getAgentConfig('ceo-01', config);

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${config.openRouterApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: agentConfig.model,
        messages: [
          {
            role: "system",
            content: agentConfig.systemPrompt
          },
          {
            role: "user",
            content: `Analyze this brief: "${brief}". Provide a concise execution plan, required agents, and next steps.`
          }
        ]
      })
    });

    if (!response.ok) throw new Error(response.statusText);
    const json = await response.json();
    return json.choices[0].message.content;

  } catch (error) {
    console.error("OpenRouter API Error:", error);
    return `Error: ${error}`;
  }
};
