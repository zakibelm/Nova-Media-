
import { WorkflowDefinition } from '../types';

export const WORKFLOWS_REGISTRY: Record<string, WorkflowDefinition> = {
  new_campaign: {
    id: "new_campaign",
    name: "Standard Campaign Launch",
    description: "End-to-end flow from intake to delivery.",
    steps: [
      { id: "w1", label: "Intake", from: "Form", to: "csm-01", action: "Structure Brief" },
      { id: "w2", label: "Orchestration", from: "csm-01", to: "ceo-01", action: "Delegate" },
      { id: "w3", label: "Research", from: "ceo-01", to: "res-01", action: "Gather Data" },
      { id: "w4", label: "Strategy", from: ["ceo-01", "res-01"], to: "strat-01", action: "Develop Strategy" },
      { id: "w5", label: "Concept", from: "strat-01", to: "cd-01", action: "Creative Concept" },
      { id: "w6", label: "Production", from: "cd-01", to: ["cw-01", "des-01", "vid-01"], action: "Generate Assets" },
      { id: "w7", label: "Verification", from: ["cw-01", "des-01", "vid-01"], to: "qa-01", action: "Quality Check" },
      { id: "w8", label: "Validation", from: "qa-01", to: "val-01", action: "Final Approval" },
      { id: "w9", label: "Delivery", from: "val-01", to: "csm-01", action: "Client Delivery" }
    ]
  },
  evv_loop: {
    id: "evv_loop",
    name: "EVV Quality Loop",
    description: "The micro-workflow for task execution.",
    steps: [
      { id: "e1", label: "Execute", from: "Orchestrator", to: "Agent", action: "Generate Draft" },
      { id: "e2", label: "Verify", from: "Agent", to: "qa-01", action: "Check Compliance" },
      { id: "e3", label: "Validate", from: "qa-01", to: "val-01", action: "Approve/Reject" },
      { id: "e4", label: "Feedback", from: "val-01", to: "Agent", action: "Loop if Rejected" }
    ]
  }
};
