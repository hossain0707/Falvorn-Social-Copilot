import {CHANNELS, generateDraft, reviseDraft, approveDraft, scheduleDemo, simulateHandoff, restoreState, queueItem, counts} from "./core.mjs";
const KEY = "falvorn.social.demo.v1";
const $ = id => document.getElementById(id);
let state = restoreState(localStorage.getItem(KEY));
let current = state.queue[0] || null;
let variant = 0;
let platform = "instagram";
let activeTab = "studio";
let videoUrl = null;
const tabs = document.querySelectorAll("[data-tab]");
const formatLabels = {reel:"Reel / short video",carousel:"Carousel",post:"Single post"};
function persist() {
  try { localStorage.setItem(KEY,JSON.stringify(state)); } catch { notify("Storage is unavailable; this demo remains in memory."); }
}
function notify(message) {
  const notice = $("notice");
  notice.textContent = message;
  notice.classList.add("show");
  clearTimeout(notify.timer);
  notify.timer = setTimeout(()=>notice.classList.remove("show"),4600);
}
function selectPlatform(value) {
  if (!CHANNELS.includes(value)) return;
  platform = value;
  document.querySelectorAll("[data-platform]").forEach(el => {
    const active = el.dataset.platform === value;
    el.classList.toggle("selected",active);
    el.setAttribute("aria-pressed",String(active));
  });
  $("scene").dataset.active = value;
  $("previewPlatform").textContent = value === "instagram" ? "Instagram" : "Facebook Page";
  if(current && current.channel !== value) {
    $("previewCaption").textContent = "Select Generate to create a "+(value==="instagram"?"Instagram":"Facebook Page")+" version.";
  } else { renderPreview(); }
}
function setTab(tab) {
  activeTab=tab;
  tabs.forEach(el=>{
    const on=el.dataset.tab===tab;
    el.classList.toggle("active",on);
    el.setAttribute("aria-selected",String(on));
  });
  document.querySelectorAll("[data-panel]").forEach(el=>{el.hidden=el.dataset.panel!==tab;});
  if(tab==="queue") renderQueue();
  if(tab==="analytics") renderAnalytics();
}
function renderPreview() {
  const ready = !!current && current.channel === platform;
  $("previewCaption").textContent = ready ? current.caption : "Your platform-ready content preview appears here after generation.";
  $("previewTitle").textContent = ready ? current.hook : "Ready when you are.";
  $("previewFormat").textContent = ready ? formatLabels[current.format] : "No draft yet";
  $("previewStatus").textContent = ready ? displayStatus(current.status) : "Not generated";
  $("previewStatus").dataset.status = ready ? current.status : "empty";
  $("editCaption").value = ready ? current.caption : "";
  $("editCaption").disabled = !ready || !["draft","approved"].includes(current.status);
  $("approveBtn").disabled = !ready || current.status!=="draft";
  $("saveEditBtn").disabled = !ready || !["draft","approved"].includes(current.status);
  $("scheduleBtn").disabled = !ready || current.status!=="approved";
  $("simulateBtn").disabled = !ready || !["approved","scheduled_demo"].includes(current.status);
  $("previewEmpty").hidden=ready;
  $("previewFilled").hidden=!ready;
}
function displayStatus(status) {
  return {draft:"Needs approval",approved:"Approved",scheduled_demo:"Scheduled locally",simulated:"Simulated handoff"}[status]||"Not generated";
}
function updateCurrent(post) {
  current=post;
  state=queueItem(state,post);
  persist();
  renderPreview();
  renderAnalytics();
}
function renderQueue() {
  const root=$("queueItems");
  root.replaceChildren();
  if(!state.queue.length) {
    const p=document.createElement("p");
    p.className="queue-empty";
    p.textContent="No demo content yet. Generate a draft in Studio to start building your queue.";
    root.append(p);
    return;
  }
  state.queue.forEach(item=>{
    const card=document.createElement("article");
    card.className="queue-row";
    const icon=document.createElement("div");
    icon.className="queue-icon "+item.channel;
    icon.textContent=item.channel==="instagram"?"IG":"FB";
    const copy=document.createElement("div");
    copy.className="queue-copy";
    const label=document.createElement("strong");
    label.textContent=item.hook;
    const sub=document.createElement("small");
    sub.textContent=displayStatus(item.status)+(item.scheduledAt?" · "+new Date(item.scheduledAt).toLocaleString():"");
    copy.append(label,sub);
    const action=document.createElement("button");
    action.className="btn btn-small";
    action.type="button";
    action.textContent="Review";
    action.addEventListener("click",()=>{selectPlatform(item.channel);current=item;setTab("studio");renderPreview();document.querySelector("#workspace").scrollIntoView({behavior:"smooth"});});
    card.append(icon,copy,action);
    root.append(card);
  });
}
function renderAnalytics(){
  const c=counts(state.queue);
  $("countTotal").textContent=String(c.total);
  $("countDrafts").textContent=String(c.drafts);
  $("countApproved").textContent=String(c.approved);
  $("countSimulated").textContent=String(c.simulated);
  $("queueBadge").textContent=String(c.total);
}
function startDemo() {
  const brief=$("brief").value;
  try {
    const draft=generateDraft({brief,channel:platform,format:$("format").value,tone:$("tone").value,brand:$("brand").value,variant:variant++});
    updateCurrent(draft);
    notify("Demo draft created. No AI provider or social account was called.");
  } catch(e){notify(e.message);}
}
$("generateBtn").addEventListener("click",startDemo);
$("approveBtn").addEventListener("click",()=>{
  try{updateCurrent(approveDraft(current));notify("Preview approved in your browser. Nothing was published.");}catch(e){notify(e.message);}
});
$("saveEditBtn").addEventListener("click",()=>{
  try{updateCurrent(reviseDraft(current,$("editCaption").value));notify("Edits saved. Content must be approved again.");}catch(e){notify(e.message);}
});
$("scheduleBtn").addEventListener("click",()=>{
  try{updateCurrent(scheduleDemo(current,$("scheduleAt").value));notify("Added to local demo schedule. No remote job exists.");}catch(e){notify(e.message);}
});
$("simulateBtn").addEventListener("click",()=>{
  try{updateCurrent(simulateHandoff(current));notify("Handoff simulated only — no Instagram or Facebook action occurred.");}catch(e){notify(e.message);}
});
$("brand").addEventListener("change",()=>{state.brand=$("brand").value.trim().slice(0,60)||"Falvorn AI";persist();});
$("clearQueueBtn").addEventListener("click",()=>{
  if(!window.confirm("Clear all locally stored demo drafts? This does not affect any social account.")) return;
  state={...state,queue:[]};current=null;persist();renderPreview();renderQueue();renderAnalytics();notify("Local demo queue cleared.");
});
document.querySelectorAll("[data-platform]").forEach(btn=>btn.addEventListener("click",()=>selectPlatform(btn.dataset.platform)));
tabs.forEach(btn=>btn.addEventListener("click",()=>setTab(btn.dataset.tab)));
document.querySelectorAll("[data-open-studio]").forEach(b=>b.addEventListener("click",()=>{setTab("studio");$("workspace").scrollIntoView({behavior:"smooth"});}));
$("brand").value=state.brand;
if(!$("brief").value.trim())$("brief").value="Introducing a human-first AI creative copilot that simplifies social media planning for independent brands and creators";
const date=new Date(Date.now()+3600*1000);
date.setMinutes(date.getMinutes()-date.getTimezoneOffset());
$("scheduleAt").value=date.toISOString().slice(0,16);
function drawRound(ctx,x,y,w,h,r,color) {
  ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();
}
function drawFrame(ctx,progress) {
  const W=960,H=540;
  ctx.fillStyle="#080e17";ctx.fillRect(0,0,W,H);
  let glow=ctx.createRadialGradient(720,180,0,720,180,480);
  glow.addColorStop(0,"#142d35");glow.addColorStop(1,"#080e17");ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);
  ctx.save();
  ctx.translate(710,285);ctx.rotate(Math.sin(progress*6)*0.025);
  drawRound(ctx,-190,-150,310,310,28,"#112732");
  ctx.strokeStyle="#3e6e73";ctx.lineWidth=2;ctx.strokeRect(-173,-132,275,275);
  drawRound(ctx,-155,-112,240,68,12,"#1d4250");
  drawRound(ctx,-155,-32,240,68,12,"#295654");
  drawRound(ctx,-155,48,240,68,12,"#132e41");
  ctx.fillStyle="#ccf7de";ctx.font="bold 19px Arial";ctx.fillText("CHATGPT", -133,-69);
  ctx.fillText("INSTAGRAM", -133,9);
  ctx.fillText("FACEBOOK", -133,88);
  ctx.restore();
  ctx.fillStyle="#78e1be";ctx.font="bold 19px Arial";ctx.fillText("F / SOCIAL COPILOT",60,67);
  const slides=[
    ["ONE CREATIVE SYSTEM.","THREE CONNECTED WORLDS."],
    ["TURN A BRIEF","INTO A PLATFORM-READY DRAFT."],
    ["REVIEW EVERY WORD.","APPROVE BEFORE ANY ACTION."],
    ["SCHEDULE WITH INTENT.","NEVER SILENTLY PUBLISH."],
    ["14 SPECIALIST SKILLS.","ONE HUMAN-IN-CONTROL WORKFLOW."]
  ];
  const i=Math.min(slides.length-1,Math.floor(progress*slides.length));
  ctx.fillStyle="#eff8f1";ctx.font="bold 44px Arial";ctx.fillText(slides[i][0],60,211);
  ctx.fillStyle="#b7e7d2";ctx.font="bold 26px Arial";ctx.fillText(slides[i][1],60,253);
  ctx.fillStyle="#9faeae";ctx.font="19px Arial";ctx.fillText("ChatGPT • Instagram • Facebook Pages",60,336);
  drawRound(ctx,60,385,260,50,25,"#78e1be");
  ctx.fillStyle="#0b1b1b";ctx.font="bold 17px Arial";ctx.fillText("FALVORN SOCIAL COPILOT",82,416);
  ctx.fillStyle="#798c91";ctx.font="14px Arial";ctx.fillText("Product walkthrough · illustrative demo only",60,503);
  ctx.fillStyle="#78e1be";ctx.fillRect(60,520,840*progress,3);
}
const filmSlides=[
  ["ONE CREATIVE SYSTEM.","THREE CONNECTED WORLDS."],
  ["TURN A BRIEF","INTO A PLATFORM-READY DRAFT."],
  ["REVIEW EVERY WORD.","APPROVE BEFORE ANY ACTION."],
  ["SCHEDULE WITH INTENT.","NEVER SILENTLY PUBLISH."],
  ["14 SPECIALIST SKILLS.","ONE HUMAN-IN-CONTROL WORKFLOW."]
];
let filmTimer=null;
function startFilm(){
  clearInterval(filmTimer);
  $("filmStage").hidden=false;
  $("videoPlayer").hidden=true;
  $("videoPlayer").pause();
  const started=Date.now(),duration=9000;
  function update(){
    const p=Math.min(1,(Date.now()-started)/duration);
    const i=Math.min(filmSlides.length-1,Math.floor(p*filmSlides.length));
    $("filmTitle").textContent=filmSlides[i][0];
    $("filmSubtitle").textContent=filmSlides[i][1];
    $("filmProgress").style.width=(p*100)+"%";
    $("videoStatus").textContent=p<1?"Playing original product walkthrough…":"Film complete. Replay or export a video recording.";
    if(p===1)clearInterval(filmTimer);
  }
  update();
  filmTimer=setInterval(update,100);
}
async function recordVideo(){
  if(videoUrl)return videoUrl;
  if(!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream)
    throw new Error("Video export is unavailable in this browser. The animated film above remains playable.");
  const canvas=document.createElement("canvas");canvas.width=960;canvas.height=540;
  const ctx=canvas.getContext("2d");
  const mime=["video/webm;codecs=vp8","video/webm","video/mp4"].find(x=>MediaRecorder.isTypeSupported(x));
  if(!mime)throw new Error("No video export codec is supported by this browser.");
  const stream=canvas.captureStream(12);
  const recorder=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:600000});
  const chunks=[];
  const completed=new Promise((resolve,reject)=>{
    recorder.ondataavailable=e=>{if(e.data.size>0)chunks.push(e.data);};
    recorder.onerror=e=>reject(e.error||new Error("Video export failed."));
    recorder.onstop=()=>chunks.length?resolve(URL.createObjectURL(new Blob(chunks,{type:mime}))):reject(new Error("The browser returned an empty recording."));
  });
  let timer=null,stopper=null;
  try {
    drawFrame(ctx,0);
    recorder.start(500);
    const started=Date.now();
    timer=setInterval(()=>{
      const progress=Math.min(1,(Date.now()-started)/6400);
      drawFrame(ctx,progress);
    },70);
    await new Promise(resolve=>{stopper=setTimeout(resolve,6600);});
    clearInterval(timer);
    drawFrame(ctx,1);
    if(recorder.state!=="inactive")recorder.stop();
    const timeout=new Promise((_,reject)=>setTimeout(()=>reject(new Error("Recording timed out; your browser may not support canvas capture.")),5000));
    videoUrl=await Promise.race([completed,timeout]);
    return videoUrl;
  }finally {
    clearInterval(timer);clearTimeout(stopper);
    if(recorder.state!=="inactive")try{recorder.stop();}catch{}
    stream.getTracks().forEach(t=>t.stop());
  }
}
$("watchBtn").addEventListener("click",()=>{
  if(!$("videoDialog").open)$("videoDialog").showModal();
  startFilm();
});
$("replayVideo").addEventListener("click",()=>startFilm());
$("downloadVideo").addEventListener("click",async()=>{
  const btn=$("downloadVideo");btn.disabled=true;
  $("videoStatus").textContent="Rendering a downloadable video — please keep this window open…";
  try{
    const src=await recordVideo();
    $("videoPlayer").src=src;
    $("videoPlayer").hidden=false;
    $("filmStage").hidden=true;
    clearInterval(filmTimer);
    $("videoStatus").textContent="Export generated. You can play or save the video.";
    const a=document.createElement("a");a.href=src;
    a.download=src&&MediaRecorder.isTypeSupported("video/webm")?"falvorn-social-copilot-demo.webm":"falvorn-social-copilot-demo.mp4";
    a.click();
  }catch(e){$("videoStatus").textContent=e.message;$("filmStage").hidden=false;}
  finally{btn.disabled=false;}
});
$("closeVideo").addEventListener("click",()=>{
  clearInterval(filmTimer);$("videoPlayer").pause();$("videoDialog").close();
});
$("videoDialog").addEventListener("click",e=>{
  if(e.target===$("videoDialog")){clearInterval(filmTimer);$("videoPlayer").pause();$("videoDialog").close();}
});
const scene=$("scene");
let moving=false, originX=0, originY=0;
scene.addEventListener("pointerdown",e=>{if(e.target.closest("button"))return;moving=true;originX=e.clientX;originY=e.clientY;scene.setPointerCapture(e.pointerId);});
scene.addEventListener("pointermove",e=>{if(!moving)return;const x=Math.max(-13,Math.min(13,(e.clientX-originX)*0.06));const y=Math.max(-10,Math.min(10,(e.clientY-originY)*0.05));scene.style.setProperty("--drag-y",x+"deg");scene.style.setProperty("--drag-x",-y+"deg");});
scene.addEventListener("pointerup",()=>{moving=false;});
scene.addEventListener("pointercancel",()=>{moving=false;});
document.querySelectorAll("[data-year]").forEach(el=>el.textContent=String(new Date().getFullYear()));
renderPreview();renderAnalytics();selectPlatform(platform);setTab(activeTab);
