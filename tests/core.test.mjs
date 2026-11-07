import test from "node:test";
import assert from "node:assert/strict";
import {generateDraft, approveDraft, reviseDraft, scheduleDemo, simulateHandoff, restoreState, initialState, queueItem, counts, signature} from "../site/core.mjs";
test("draft generation is deterministic in structure and never promises publishing", () => {
  const draft = generateDraft({brief:"Build a responsible AI marketing assistant", channel:"instagram", format:"reel"});
  assert.equal(draft.status,"draft");
  assert.equal(draft.demoOnly,true);
  assert.equal(draft.channel,"instagram");
  assert.match(draft.caption,/Scene plan/);
});
test("a brief is validated", () => {
  assert.throws(() => generateDraft({brief:"short"}),/at least 8/);
});
test("approval gates scheduling and handoff", () => {
  const d = generateDraft({brief:"Improve creative approval workflows"});
  assert.throws(() => scheduleDemo(d,new Date(Date.now()+300000)),/Approval/);
  assert.throws(() => simulateHandoff(d),/Approval/);
  const approved = approveDraft(d);
  assert.equal(approved.approvedSignature,signature(approved.caption));
  const scheduled = scheduleDemo(approved,new Date(Date.now()+300000));
  assert.equal(scheduled.status,"scheduled_demo");
  assert.equal(simulateHandoff(scheduled).status,"simulated");
});
test("editing invalidates approval", () => {
  const d = approveDraft(generateDraft({brief:"A human-first publishing process"}));
  const revised = reviseDraft(d, "A substantially rewritten caption with a different call to action.");
  assert.equal(revised.status,"draft");
  assert.equal(revised.approvedSignature,null);
  assert.throws(() => simulateHandoff(revised),/Approval/);
});
test("edited approval cannot be bypassed", () => {
  const d = approveDraft(generateDraft({brief:"Show real brand messaging examples"}));
  assert.throws(()=>simulateHandoff({...d,caption:"Changed without permission."}),/changed since approval/);
});
test("past date rejected", () => {
  const d = approveDraft(generateDraft({brief:"A release plan for social channels"}));
  assert.throws(()=>scheduleDemo(d,new Date(Date.now()-10000)),/future/);
});
test("state restoration drops unknown records", () => {
  assert.deepEqual(restoreState("not json"), initialState());
  assert.equal(restoreState(JSON.stringify({version:1,queue:[{id:"x",channel:"instagram",status:"draft",caption:"ok",demoOnly:false}],brand:"Test"})).queue.length,0);
});
test("queue updates and counters use actual session data", () => {
  const a = generateDraft({brief:"Make social workflows clearer"});
  let state = queueItem(initialState(),a);
  state = queueItem(state,approveDraft(a));
  assert.deepEqual(counts(state.queue),{total:1,drafts:0,approved:1,scheduled:0,simulated:0});
});
