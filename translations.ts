
import { Language } from './types';

export const translations = {
  fr: {
    sidebar: {
      dashboard: "Centre de Commande",
      orchestration: "Orchestration",
      agents: "Flotte d'Agents",
      settings: "Configuration",
      archDump: "Données Techniques",
      latency: "Latence",
      systemStatus: "SYSTÈME CENTRAL"
    },
    dashboard: {
      title: "Centre de Commande",
      subtitle: "Vue d'ensemble des opérations et de la santé système.",
      systemOnline: "SYSTÈME EN LIGNE",
      keyMissing: "CLÉ API MANQUANTE",
      launchModule: "Lanceur de Campagne",
      launchDesc: "Lancez une nouvelle campagne marketing via le pipeline EVV structuré. Déclenche le passage Initiator → Client Success Manager.",
      initButton: "INITIALISER NOUVELLE CAMPAGNE",
      processing: "Traitement...",
      ceoLog: "JOURNAL CEO ORCHESTRATOR :",
      taskVelocity: "Vélocité Tâches",
      tokenCost: "Coût Tokens (Semaine)",
      recentLogs: "Logs Système Récents",
      events: "Événements",
      systemIdle: "Système en attente. En attente du déclenchement de campagne...",
      thisWeek: "Cette Semaine"
    },
    campaign: {
      title: "Initialiser Nouvelle Campagne",
      subtitle: "Complétez le formulaire d'admission pour déclencher le pipeline.",
      name: "Nom de la Campagne",
      desc: "Description Produit / Service",
      obj: "Objectif Marketing",
      target: "Marché Cible",
      budget: "Budget",
      deadline: "Date Limite",
      comp: "Concurrents Principaux",
      ref: "URLs de Référence",
      tone: "Ton & Style Souhaité",
      cancel: "Annuler",
      submit: "Initialiser Pipeline"
    },
    settings: {
      title: "Configuration Système",
      subtitle: "Gérez la clé API et les personnalités des Agents.",
      save: "Enregistrer",
      saved: "Sauvegardé !",
      apiKeyTitle: "Connexion API Système",
      apiKeyLabel: "Clé API (Fournisseur IA)",
      apiKeyHelp: "Requise pour l'exécution des agents. Stockée localement.",
      agentsTitle: "Personnalités & Modèles",
      modelLabel: "Modèle IA",
      promptLabel: "Prompt Système (Identité)",
      editConfig: "Éditer Config",
      collapse: "Réduire"
    },
    agents: {
      title: "Flotte d'Agents",
      subtitle: "19 Unités autonomes prêtes au déploiement (Architecture EVV)",
      filter: "Filtrer",
      newAgent: "Nouvel Agent",
      responsibilities: "RESPONSABILITÉS",
      input: "ENTRÉE",
      output: "SORTIE"
    },
    workflow: {
      title: "Orchestration & Workflow",
      subtitle: "Moniteur Pipeline EVV (Exécution, Vérification, Validation) Temps Réel",
      tabProject: "Flux Projet",
      tabEvv: "Pipeline EVV",
      step: "ÉTAPE"
    }
  },
  en: {
    sidebar: {
      dashboard: "Command Center",
      orchestration: "Orchestration",
      agents: "Agent Fleet",
      settings: "System Config",
      archDump: "Tech Data",
      latency: "Latency",
      systemStatus: "CORE SYSTEM"
    },
    dashboard: {
      title: "Command Center",
      subtitle: "Overview of agency operations and system health.",
      systemOnline: "SYSTEM ONLINE",
      keyMissing: "API KEY MISSING",
      launchModule: "Campaign Initiator",
      launchDesc: "Launch a new marketing campaign via the structured EVV pipeline. Triggers Campaign Initiator → Client Success Manager handoff.",
      initButton: "INITIALIZE NEW CAMPAIGN",
      processing: "Processing...",
      ceoLog: "CEO ORCHESTRATOR LOG:",
      taskVelocity: "Task Velocity",
      tokenCost: "Token Consumption",
      recentLogs: "Recent System Logs",
      events: "Events",
      systemIdle: "System Idle. Waiting for campaign trigger...",
      thisWeek: "This Week"
    },
    campaign: {
      title: "Initialize New Campaign",
      subtitle: "Complete the intake form to trigger the pipeline.",
      name: "Campaign Name",
      desc: "Product / Service Description",
      obj: "Marketing Objective",
      target: "Target Market",
      budget: "Budget",
      deadline: "Deadline",
      comp: "Main Competitors",
      ref: "Reference URLs",
      tone: "Desired Tone & Style",
      cancel: "Cancel",
      submit: "Initialize Pipeline"
    },
    settings: {
      title: "System Configuration",
      subtitle: "Manage API keys and individual Agent Personalities.",
      save: "Save Changes",
      saved: "Saved!",
      apiKeyTitle: "System API Connection",
      apiKeyLabel: "API Key (AI Provider)",
      apiKeyHelp: "Required for agents to execute tasks. Stored locally.",
      agentsTitle: "Agent Personalities & Models",
      modelLabel: "AI Model",
      promptLabel: "System Prompt (Identity)",
      editConfig: "Edit Config",
      collapse: "Collapse"
    },
    agents: {
      title: "Agent Fleet",
      subtitle: "19 Autonomous units ready for deployment (EVV Architecture)",
      filter: "Filter",
      newAgent: "New Agent",
      responsibilities: "RESPONSIBILITIES",
      input: "INPUT",
      output: "OUTPUT"
    },
    workflow: {
      title: "Orchestration & Workflow",
      subtitle: "Real-time EVV (Execute, Verify, Validate) Pipeline Monitor",
      tabProject: "Project Flow",
      tabEvv: "EVV Pipeline",
      step: "STEP"
    }
  },
  ar: {
    sidebar: {
      dashboard: "مركز القيادة",
      orchestration: "تنسيق العمل",
      agents: "فريق الوكلاء",
      settings: "الإعدادات",
      archDump: "بيانات تقنية",
      latency: "الكمون",
      systemStatus: "النظام المركزي"
    },
    dashboard: {
      title: "مركز القيادة",
      subtitle: "نظرة عامة على عمليات الوكالة وصحة النظام.",
      systemOnline: "النظام متصل",
      keyMissing: "مفتاح API مفقود",
      launchModule: "مبدأ الحملة",
      launchDesc: "أطلق حملة تسويقية جديدة عبر مسار EVV المنظم. يبدأ التحويل من Initiator ← مدير نجاح العملاء.",
      initButton: "بدء حملة جديدة",
      processing: "جاري المعالجة...",
      ceoLog: "سجل الرئيس التنفيذي:",
      taskVelocity: "سرعة المهام",
      tokenCost: "استهلاك الرموز",
      recentLogs: "سجلات النظام الحديثة",
      events: "أحداث",
      systemIdle: "النظام خامل. بانتظار إطلاق الحملة...",
      thisWeek: "هذا الأسبوع"
    },
    campaign: {
      title: "بدء حملة جديدة",
      subtitle: "أكمل نموذج الاستلام لبدء المسار.",
      name: "اسم الحملة",
      desc: "وصف المنتج / الخدمة",
      obj: "الهدف التسويقي",
      target: "السوق المستهدف",
      budget: "الميزانية",
      deadline: "الموعد النهائي",
      comp: "المنافسون الرئيسيون",
      ref: "روابط مرجعية",
      tone: "النبرة والأسلوب المطلوب",
      cancel: "إلغاء",
      submit: "بدء المسار"
    },
    settings: {
      title: "إعدادات النظام",
      subtitle: "إدارة مفاتيح API وشخصيات الوكلاء الفردية.",
      save: "حفظ التغييرات",
      saved: "تم الحفظ!",
      apiKeyTitle: "اتصال النظام",
      apiKeyLabel: "مفتاح API",
      apiKeyHelp: "مطلوب لتنفيذ مهام الوكلاء. مخزن محلياً.",
      agentsTitle: "شخصيات ونماذج الوكلاء",
      modelLabel: "نموذج الذكاء الاصطناعي",
      promptLabel: "توجيه النظام (الهوية)",
      editConfig: "تعديل",
      collapse: "طي"
    },
    agents: {
      title: "فريق الوكلاء",
      subtitle: "19 وحدة مستقلة جاهزة للنشر (بنية EVV)",
      filter: "تصفية",
      newAgent: "وكيل جديد",
      responsibilities: "المسؤوليات",
      input: "مدخلات",
      output: "مخرجات"
    },
    workflow: {
      title: "التنسيق وسير العمل",
      subtitle: "مراقبة مسار EVV (تنفيذ، تحقق، تصديق) في الوقت الفعلي",
      tabProject: "تدفق المشروع",
      tabEvv: "مسار EVV",
      step: "خطوة"
    }
  }
};
