/**
 * Falvorn Social Copilot demo domain logic.
 * This module never calls Meta or any publishing API.
 * Real actions belong to the connected, human-approved ChatGPT plugin.
 */
export const CHANNELS = Object.freeze(["instagram", "facebook"]);
export const FORMATS = Object.freeze(["reel", "carousel", "post"]);
export const TONES = Object.freeze(["confident", "warm", "editorial"]);
const MAX_BRIEF = 700;
const MAX_POSTS = 30;
const DEMO_SCHEMA = 1;

export function sanitizeBrief(value) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, MAX_BRIEF);
}
export function validateChoice(value, choices, fallback) {
  return choices.includes(value) ? value : fallback;
}
export function signature(content) {
  let hash = 2166136261;
  for (let i = 0; i < content.length; i++) {
    hash ^= content.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}
function sentenceCase(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}
function cleanEnd(text) {
  return text.replace(/[.!?\s]+$/, "");
}
export function generateDraft({brief, channel = "instagram", format = "reel", tone = "confident", brand = "Falvorn AI", variant = 0} = {}) {
  const topic = sanitizeBrief(brief);
  if (topic.length < 8) throw new Error("Write a brief of at least 8 characters.");
  const target = validateChoice(channel, CHANNELS, "instagram");
  const kind = validateChoice(format, FORMATS, "reel");
  const voice = validateChoice(tone, TONES, "confident");
  const brandName = sanitizeBrief(brand).slice(0, 60) || "Your brand";
  const openings = {
    confident: ["The next step starts here.", "Build something worth sharing.", "A better approach is possible."],
    warm: ["Here's something we're excited to share.", "Let's make this a little easier.", "Good ideas deserve to be seen."],
    editorial: ["A different perspective.", "What matters now.", "The story behind the work."]
  };
  const hook = openings[voice][Math.abs(Number(variant) || 0) % 3];
  const briefLine = sentenceCase(cleanEnd(topic));
  const formatLine = kind === "reel"
    ? "Scene plan: hook → proof → outcome → call to action."
    : kind === "carousel"
      ? "Slide plan: problem → insight → example → takeaway."
      : "A single, focused message designed for conversation.";
  const platformLine = target === "instagram"
    ? "Save this for later and tell us what you think."
    : "What would you add to the conversation?";
  const caption = [hook, "", briefLine + ".", "", formatLine, "", platformLine, "", "— " + brandName].join("\n");
  const id = "demo-" + signature([topic,target,kind,voice,brandName,variant,Date.now(),Math.random()].join("|"));
  return {
    id, channel: target, format: kind, tone: voice, brand: brandName,
    brief: topic, hook, caption, status: "draft", createdAt: new Date().toISOString(),
    approvedSignature: null, approvedAt: null, scheduledAt: null, simulatedAt: null,
    demoOnly: true
  };
}
export function reviseDraft(draft, caption) {
  if (!draft || !["draft", "approved"].includes(draft.status)) throw new Error("This item cannot be edited.");
  const next = typeof caption === "string" ? caption.trim().slice(0, 2200) : "";
  if (next.length < 12) throw new Error("Caption must contain at least 12 characters.");
  return {...draft, caption: next, status: "draft", approvedSignature: null, approvedAt: null, scheduledAt: null};
}
export function approveDraft(draft) {
  if (!draft || draft.status !== "draft") throw new Error("Only a draft can be approved.");
  if (!draft.caption || draft.caption.length < 12) throw new Error("Caption is incomplete.");
  return {...draft, status: "approved", approvedAt: new Date().toISOString(), approvedSignature: signature(draft.caption)};
}
function assertApproval(draft) {
  if (!draft || !["approved","scheduled_demo"].includes(draft.status)) throw new Error("Approval is required before a demo handoff.");
  if (!draft.approvedSignature || draft.approvedSignature !== signature(draft.caption)) throw new Error("Content changed since approval. Please review and approve again.");
}
export function scheduleDemo(draft, localDate, now = new Date()) {
  assertApproval(draft);
  if (draft.status !== "approved") throw new Error("This draft is already scheduled.");
  const target = new Date(localDate);
  if (!Number.isFinite(target.getTime()) || target.getTime() <= now.getTime() + 60000) throw new Error("Select a future time, at least one minute from now.");
  return {...draft, status: "scheduled_demo", scheduledAt: target.toISOString()};
}
export function simulateHandoff(draft) {
  assertApproval(draft);
  return {...draft, status: "simulated", simulatedAt: new Date().toISOString()};
}
export function initialState() {
  return {version: DEMO_SCHEMA, queue: [], brand: "Falvorn AI"};
}
export function restoreState(raw) {
  try {
    const obj = JSON.parse(raw);
    if (!obj || obj.version !== DEMO_SCHEMA || !Array.isArray(obj.queue)) return initialState();
    const queue = obj.queue.filter(p => p && typeof p.id === "string" && p.demoOnly === true
      && CHANNELS.includes(p.channel) && typeof p.caption === "string"
      && ["draft","approved","scheduled_demo","simulated"].includes(p.status)).slice(-MAX_POSTS);
    return {version: DEMO_SCHEMA, queue, brand: sanitizeBrief(obj.brand).slice(0, 60) || "Falvorn AI"};
  } catch { return initialState(); }
}
export function queueItem(state, draft) {
  const queue = [draft, ...state.queue.filter(p => p.id !== draft.id)].slice(0, MAX_POSTS);
  return {...state, queue};
}
export function counts(queue) {
  return {
    total: queue.length,
    drafts: queue.filter(p => p.status === "draft").length,
    approved: queue.filter(p => p.status === "approved").length,
    scheduled: queue.filter(p => p.status === "scheduled_demo").length,
    simulated: queue.filter(p => p.status === "simulated").length
  };
}
