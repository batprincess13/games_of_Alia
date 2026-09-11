function toolboxQuestion(i){
 const qs=[
  ()=>numeric("A toolbox has 2 rows of 4 nails. How many nails?",8,"2 groups of 4."),
  ()=>numeric("3 boards need 5 screws each. How many screws?",15,"3 groups of 5."),
  ()=>numeric("A board is 4 cm by 3 cm. What is its area?",12,"Length × width."),
  ()=>mc("Two rails that never meet are…","parallel",["perpendicular","intersecting","a ray"],"They stay the same distance apart."),
  ()=>numeric("What is the value of the 5 in 3,542?",500,"The 5 is in the hundreds place."),
  ()=>numeric("Round 1,648 to the nearest hundred.",1600,"Check the tens digit."),
  ()=>mc("Which is greater?","4,210",["4,120","equal","4,012"],"Compare place values from left to right."),
  ()=>numeric("You have ₱300 and earn ₱125. How much now?",425,"Add the amounts."),
  ()=>numeric("You have 900 screws and use 250. How many remain?",650,"Subtract."),
  ()=>numeric("6 brackets with 4 screws each need how many screws?",24,"6 groups of 4.")
 ];
 return qs[i]();
}

function startPlayer(){
 const name=$("playerName").value.trim(); if(!name)return;
 const key=name.toLowerCase().replace(/\s+/g," ");
 const ps=loadProfiles(); if(!ps[key])ps[key]=freshProfile(name);
 state.key=key;state.profile=ps[key];localStorage.setItem(PROFILE_KEY,JSON.stringify(ps));
 $("startScreen").classList.add("hidden");$("game").classList.remove("hidden");
 if(!state.profile.toolboxDone) showToolbox(); else newJob();
 renderAll();
}
function renderAll(){renderHeader();renderTiers();renderSkills();renderWorkshop();renderMaterials();}
function renderHeader(){
 const t=activeTier(),q=currentQuarter();
 $("playerPill").textContent="👷 "+state.profile.name;
 $("tierPill").textContent=TIERS[t].icon+" "+TIERS[t].name;
 $("quarterPill").textContent="📘 Quarter "+q;
 $("cashStat").textContent=peso(state.profile.cash);
 $("jobsStat").textContent=state.profile.jobs;
 $("masteredStat").textContent=masteredCount()+"/"+SKILLS.length;
 $("evidenceStat").textContent=totalEvidence();
}
function renderTiers(){
 const cur=activeTier();
 $("bizPath").innerHTML=TIERS.map((t,i)=>{
  const unlocked=tierUnlocked(i),done=i<cur||(i===0&&state.profile.toolboxDone);
  return `<div class="tier ${i===cur?"current":done?"done":"locked"}"><strong>${t.icon} ${t.name}</strong><div class="small muted">${t.desc}</div><div class="small" style="margin-top:5px">${done?"✓ Completed":unlocked?"● Current":"🔒 Locked by math mastery"}</div></div>`;
 }).join("");
}
function renderSkills(){
 const q=currentQuarter(),cur=state.q?.skillId||chooseSkill().id;
 $("skillList").innerHTML=SKILLS.filter(s=>s.q===q).map(s=>{
  const st=getStat(s.id),a=Math.round(accuracy(s.id)*100),locked=!prereqsMet(s.id)&&!st.mastered;
  return `<div class="skill ${s.id===cur?"active":""} ${st.mastered?"mastered":""}"><div style="display:flex;justify-content:space-between;gap:8px"><strong>${s.n}</strong><span class="badge ${st.mastered?"mastered":"learn"}">${st.mastered?"MASTERED":locked?"PREREQ":"LEARNING"}</span></div><small>${st.possible?`${a}% evidence • ${st.attempts} encounters`:"No evidence yet"}</small></div>`;
 }).join("");
}
function renderWorkshop(){
 const sk=state.q?S[state.q.skillId]:chooseSkill(),st=getStat(sk.id),a=Math.round(accuracy(sk.id)*100);
 $("focusSkill").textContent=sk.n;
 $("focusMastery").textContent=(st.possible?a:0)+"%";
 $("focusBar").style.width=(st.possible?a:0)+"%";
 $("focusEvidence").textContent=`${st.possible.toFixed(1)} weighted points across ${contextCount(st)} contexts`;
 $("adaptiveNote").textContent=st.mastered?(st.review?"Mastered earlier, but recent errors triggered spiral review.":"Mastered. It will still appear occasionally in later jobs for retention."):"The game varies direct, applied, and reasoning tasks. Strong, consistent performance can establish mastery quickly; uncertainty generates more evidence.";
}
function renderMaterials(){
 const tools=state.profile.tools||[],inv=state.profile.inventory||{};
 $("materials").innerHTML=[...tools.slice(-4).map(t=>`<div class="material">${t.icon} <strong>${t.name}</strong></div>`),`<div class="material">🪵 Wood <strong>${inv.wood||0}</strong></div>`,`<div class="material">🔩 Screws <strong>${inv.screws||0}</strong></div>`].join("");
}

function showToolbox(){
 $("jobArea").classList.add("hidden");$("completionCard").classList.add("hidden");$("toolboxIntro").classList.remove("hidden");
 const i=state.profile.toolboxIndex||0;
 if(i>=10){finishToolbox();return}
 state.q={...toolboxQuestion(i),skillId:["q3_facts","q3_facts","q1_area","q1_lines","q1_place","q1_round","q1_compare","q2_add","q2_sub","q3_facts"][i],toolbox:true};
 state.answered=false;state.hinted=false;
 const tool=TOOLBOX[i];
 $("toolboxIntro").innerHTML=`<div class="jobHeader"><div><span class="badge">TOOLBOX TUTORIAL ${i+1}/10</span><h2 style="margin:7px 0">Earn: ${tool[0]} ${tool[1]}</h2><p class="muted">Short prerequisite check. Correct answers add starter tools.</p></div><div class="jobIcon">${tool[0]}</div></div><div class="step"><div class="context">BASIC CHECK</div><div class="q">${state.q.text}</div><div id="tbAnswer"></div><div id="tbFeedback" class="feedback"></div><div class="row" style="margin-top:8px"><button id="tbHint" class="secondary">Hint</button><button id="tbNext" class="gold hidden">Next tool</button></div></div>`;
 renderInlineAnswer("tbAnswer",state.q,submitToolbox);
 $("tbHint").onclick=()=>{$("tbFeedback").textContent="Hint: "+state.q.hint;$("tbFeedback").className="feedback hintText";state.hinted=true};
 $("tbNext").onclick=()=>{state.profile.toolboxIndex++;saveProfiles();showToolbox();renderAll()};
}
function renderInlineAnswer(containerId,q,handler){
 const el=$(containerId);
 if(q.type==="choice"){
  el.innerHTML=`<div class="choices">${q.options.map(o=>`<button class="choice" data-v="${o.replace(/"/g,"&quot;")}">${o}</button>`).join("")}</div>`;
  el.querySelectorAll("button").forEach(b=>b.onclick=()=>handler(b.dataset.v));
 }else{
  el.innerHTML=`<div class="answerRow"><input id="${containerId}Input" autocomplete="off"><button id="${containerId}Check">Check</button></div>`;
  const inp=$(containerId+"Input"),btn=$(containerId+"Check");btn.onclick=()=>handler(inp.value.trim());
  inp.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();handler(inp.value.trim())}});setTimeout(()=>inp.focus(),50);
 }
}
function submitToolbox(v){
 if(state.answered)return;
 const correct=String(v).trim().toLowerCase()===String(state.q.answer).trim().toLowerCase();
 state.answered=true;recordEvidence(state.q.skillId,correct,"direct",state.hinted);
 if(correct){const t=TOOLBOX[state.profile.toolboxIndex];state.profile.tools.push({icon:t[0],name:t[1]});$("tbFeedback").textContent=`Correct. ${t[0]} ${t[1]} added to your toolbox.`;$("tbFeedback").className="feedback good";}
 else{$("tbFeedback").textContent=`Not quite. Correct answer: ${state.q.answer}. Review it, then continue.`;$("tbFeedback").className="feedback bad";}
 $("tbNext").classList.remove("hidden");saveProfiles();renderAll();
}
function finishToolbox(){
 state.profile.toolboxDone=true;state.profile.tier=1;state.profile.cash+=100;saveProfiles();
 $("toolboxIntro").classList.add("hidden");$("completionCard").classList.remove("hidden");
 $("completionCard").innerHTML=`<h2>🧰 Toolbox Ready</h2><p>You now have the starter tools to accept paid house calls.</p><div class="notice">The business will grow only when your math evidence supports the next level of contracts.</div><button id="firstJob">Accept First House Call</button>`;
 $("firstJob").onclick=()=>{$("completionCard").classList.add("hidden");newJob();renderAll()};renderAll();
}

function contextsFor(sk){const st=getStat(sk.id);if(!st.contexts.direct)return "direct";if(!st.contexts.applied)return "applied";if(sk.c>=2&&!st.contexts.reasoning)return "reasoning";return pick(["applied","reasoning","direct"]);}
function newJob(){
 if(!state.profile.toolboxDone){showToolbox();return}
 $("toolboxIntro").classList.add("hidden");$("completionCard").classList.add("hidden");$("jobArea").classList.remove("hidden");
 const tier=activeTier(),pool=JOBS[TIERS[tier].id]||JOBS.calls,meta=pick(pool),primary=chooseSkill();
 let skills=[primary.id];const steps=tier===1?3:tier===2?4:5;const mastered=SKILLS.filter(s=>getStat(s.id).mastered);
 while(skills.length<steps){if(Math.random()<.65)skills.push(primary.id);else if(mastered.length)skills.push(pick(mastered).id);else skills.push(primary.id);}
 const questions=skills.map(id=>{const sk=S[id],ctx=contextsFor(sk),q=genQuestion(id,ctx);return {...q,skillId:id}});
 state.job={title:meta[0],desc:meta[1],icon:meta[2],tier,questions,index:0,earned:0,primary:primary.id};
 $("jobType").textContent=TIERS[tier].name.toUpperCase();$("jobTitle").textContent=meta[0];$("jobDesc").textContent=meta[1];$("jobIcon").textContent=meta[2];showJobQuestion();
}
function showJobQuestion(){
 const j=state.job;if(j.index>=j.questions.length){finishJob();return}
 state.q=j.questions[j.index];state.answered=false;state.hinted=false;const q=state.q;
 $("contextLabel").textContent=(q.context||"applied").toUpperCase()+" • "+S[q.skillId].n.toUpperCase();$("questionVisual").innerHTML=q.visual||"";$("questionText").textContent=q.text;
 $("feedback").textContent="";$("nextBtn").classList.add("hidden");$("hintBtn").disabled=false;$("jobProgress").style.width=(j.index/j.questions.length*100)+"%";$("jobMoney").textContent=peso(j.earned);
 if(q.type==="choice"){$("inputAnswer").classList.add("hidden");$("choices").classList.remove("hidden");$("choices").innerHTML=q.options.map(o=>`<button class="choice" data-v="${String(o).replace(/"/g,"&quot;")}">${o}</button>`).join("");$("choices").querySelectorAll("button").forEach(b=>b.onclick=()=>submitJob(b.dataset.v));}
 else{$("choices").classList.add("hidden");$("inputAnswer").classList.remove("hidden");$("answerInput").value="";$("checkBtn").disabled=false;setTimeout(()=>$("answerInput").focus(),50);}
 renderAll();
}
function submitJob(v){
 if(state.answered)return;const correct=String(v).trim().toLowerCase()===String(state.q.answer).trim().toLowerCase();state.answered=true;recordEvidence(state.q.skillId,correct,state.q.context||"applied",state.hinted);
 $("hintBtn").disabled=true;$("checkBtn").disabled=true;$("choices").querySelectorAll("button").forEach(b=>b.disabled=true);
 if(correct){const pay=state.q.context==="reasoning"?35:state.q.context==="applied"?25:18;state.job.earned+=pay;const mats=["wood","screws","brackets","paint"],m=pick(mats);state.profile.inventory[m]=(state.profile.inventory[m]||0)+1;$("feedback").textContent=`Correct. Job decision cleared. +${peso(pay)} labor value and +1 ${m}.`;$("feedback").className="feedback good";}
 else{$("feedback").textContent=`Not yet. Correct answer: ${state.q.answer}. This skill will appear again because the game needs more evidence.`;$("feedback").className="feedback bad";}
 $("nextBtn").classList.remove("hidden");saveProfiles();renderAll();
}
$("checkBtn").onclick=()=>submitJob($("answerInput").value);
$("answerInput").addEventListener("keydown",e=>{if(e.key!=="Enter")return;e.preventDefault();if(!state.answered)submitJob($("answerInput").value);else if(!$("nextBtn").classList.contains("hidden"))nextJobStep();});
$("nextBtn").onclick=nextJobStep;function nextJobStep(){state.job.index++;showJobQuestion()}
$("hintBtn").onclick=()=>{state.hinted=true;$("feedback").textContent="Hint: "+state.q.hint;$("feedback").className="feedback hintText"};

function finishJob(){
 const j=state.job,base=[0,80,180,420,900][j.tier]||80,materialCost=Math.max(20,Math.round(base*.45));
 const feeSets={1:[30,50,80],2:[80,120,180],3:[180,280,400],4:[350,500,750]},fees=feeSets[j.tier]||[30,50,80];
 $("jobArea").classList.add("hidden");$("completionCard").classList.remove("hidden");
 $("completionCard").innerHTML=`<span class="badge">JOB READY TO QUOTE</span><h2 style="margin-top:8px">${j.icon} ${j.title}</h2><p>The repair work is planned. Before closing the contract, decide what to charge for your work.</p><div class="materials"><div class="material"><small>Materials you must pay for</small><strong>${peso(materialCost)}</strong></div><div class="material"><small>Math earned during the job</small><strong>${peso(j.earned)}</strong></div></div><div class="notice" style="margin-top:12px"><strong>Business decision:</strong> choose a service fee. At Grade 3, Builder Quest uses fixed peso service fees and fixed peso markups rather than percentage markup, because percentage calculations are outside this Grade 3 curriculum.</div><p><strong>Choose your service fee:</strong></p><div class="choices" id="feeChoices">${fees.map((f,i)=>`<button class="choice" data-fee="${f}">${peso(f)} — ${i===0?"low fee":i===1?"balanced fee":"premium fee"}</button>`).join("")}</div><div id="quotePreview" class="feedback"></div>`;
 $("feeChoices").querySelectorAll("button").forEach(b=>b.onclick=()=>finalizeJob(materialCost,Number(b.dataset.fee)));
}
function finalizeJob(materialCost,serviceFee){
 const j=state.job,quote=materialCost+serviceFee;state.profile.cash+=serviceFee;state.profile.jobs++;saveProfiles();const st=getStat(j.primary),tierNow=activeTier();
 const reaction=serviceFee<=50?"The customer likes the low price, but your business grows more slowly.":serviceFee>=400?"The customer asks you to explain the value of your premium service.":"The quote covers the materials and pays you for your work.";
 $("completionCard").innerHTML=`<span class="badge">CONTRACT COMPLETE</span><h2 style="margin-top:8px">${j.icon} ${j.title}</h2><div class="materials"><div class="material"><small>Materials cost</small><strong>${peso(materialCost)}</strong></div><div class="material"><small>Your service fee</small><strong>${peso(serviceFee)}</strong></div><div class="material"><small>Customer quote</small><strong>${peso(quote)}</strong></div><div class="material"><small>Business profit</small><strong>${peso(serviceFee)}</strong></div></div><div class="lockReason" style="margin-top:12px">${reaction}</div><div class="notice" style="margin-top:12px"><strong>${S[j.primary].n}:</strong> ${Math.round(accuracy(j.primary)*100)}% current evidence. ${st.mastered?" Mastery threshold met.":" The game will keep sampling this skill in varied jobs until mastery is reliable."}</div>${tierNow>j.tier?`<div class="lockReason"><strong>New contract class unlocked:</strong> ${TIERS[tierNow].icon} ${TIERS[tierNow].name}</div>`:""}<button id="nextContract" style="margin-top:12px">Accept Next Contract</button>`;
 $("nextContract").onclick=()=>{$("completionCard").classList.add("hidden");newJob();renderAll()};renderAll();
}

function renderCurriculum(){
 $("curriculumMap").innerHTML=[1,2,3,4].map(q=>{const skills=SKILLS.filter(s=>s.q===q),done=skills.filter(s=>getStat(s.id).mastered).length;return `<div class="quarter"><h4>Quarter ${q} — ${done}/${skills.length} topics mastered</h4>${skills.map(s=>{const st=getStat(s.id);return `<div class="small" style="padding:5px 0"><strong>${st.mastered?"✓":"○"} ${s.n}</strong><br><span class="muted">${s.comps.join(" • ")}</span></div>`}).join("")}</div>`}).join("");
}
$("curriculumBtn").onclick=()=>{renderCurriculum();$("curriculumModal").classList.remove("hidden")};$("closeCurriculum").onclick=()=>$("curriculumModal").classList.add("hidden");

function openParent(){
 $("parentModal").classList.remove("hidden");const pass=localStorage.getItem(PARENT_KEY);
 if(!pass){$("parentSetup").innerHTML=`<p>Set one parent password for this browser/device.</p><input id="newPass1" type="password" placeholder="New parent password"><input id="newPass2" type="password" placeholder="Confirm password" style="margin-top:8px"><button id="savePass" style="margin-top:10px">Set Parent Password</button>`;$("savePass").onclick=()=>{const a=$("newPass1").value,b=$("newPass2").value;if(a.length<4||a!==b){alert("Passwords must match and be at least 4 characters.");return}localStorage.setItem(PARENT_KEY,a);openParent()};}
 else{$("parentSetup").innerHTML=`<p>Enter the device parent password to view controls.</p><input id="parentPassInput" type="password" placeholder="Parent password"><button id="unlockParent" style="margin-top:10px">Unlock</button><div id="parentControls"></div>`;$("unlockParent").onclick=()=>{if($("parentPassInput").value!==pass){alert("Incorrect password.");return}const ps=loadProfiles();$("parentControls").innerHTML=`<hr style="border:0;border-top:1px solid var(--line);margin:14px 0"><h3>Saved child profiles</h3>${Object.entries(ps).map(([k,p])=>`<div class="skill"><strong>${p.name}</strong><br><small>${p.jobs||0} jobs • ${Object.values(p.skillStats||{}).filter(x=>x.mastered).length}/${SKILLS.length} skills mastered • ${peso(p.cash||0)}</small></div>`).join("")}<p class="sourceNote">Parent password is stored locally in this browser as a simple family-control deterrent. It is not secure account authentication.</p>`;};}
}
$("parentBtn").onclick=openParent;$("closeParent").onclick=()=>$("parentModal").classList.add("hidden");
$("changePlayer").onclick=()=>{saveProfiles();$("game").classList.add("hidden");$("startScreen").classList.remove("hidden");$("playerName").value=""};
$("enterBtn").onclick=startPlayer;$("playerName").addEventListener("keydown",e=>{if(e.key==="Enter")startPlayer()});

function maybeConsequenceGate(skillId){
 const pass=localStorage.getItem(PARENT_KEY);if(!pass||state.profile.pendingGate)return;const st=getStat(skillId),recent=st.recent.slice(-4);
 if(st.possible>=8&&accuracy(skillId)<.60&&recent.length===4&&recent.filter(Boolean).length<=1){const consequences=["a household chore","1 song number","a dance","read a book"];state.profile.pendingGate=pick(consequences);saveProfiles();showConsequenceGate();}
}
function showConsequenceGate(){if(!state.profile?.pendingGate)return;$("gateTitle").textContent="Show Mommy for Confirmation";$("gateText").textContent=`Before continuing, complete: ${state.profile.pendingGate}. A parent must confirm with the device password.`;$("gatePassword").value="";$("gateModal").classList.remove("hidden");}
$("gateConfirm").onclick=()=>{const pass=localStorage.getItem(PARENT_KEY);if(!pass||$("gatePassword").value!==pass){alert("Incorrect parent password.");return}state.profile.pendingGate=null;saveProfiles();$("gateModal").classList.add("hidden");};
