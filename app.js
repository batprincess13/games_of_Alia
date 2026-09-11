function toolboxQuestion(i){
  const qs=[
    ()=>numeric("A toolbox has 2 rows of 4 nails. How many nails?",8,"2 groups of 4."),
    ()=>numeric("3 boards need 5 screws each. How many screws?",15,"3 groups of 5."),
    ()=>numeric("A board is 4 cm by 3 cm. What is its area?",12,"Length × width."),
    ()=>mc("Two rails that never meet are…","parallel",["perpendicular","intersecting","a ray"],"They stay the same distance apart."),
    ()=>numeric("What is the value of the 5 in 3,542?",500,"The 5 is in the hundreds place."),
    ()=>numeric("Round 1,648 to the nearest hundred.",1600,"Check the tens digit."),
    ()=>mc("Which is greater?","4,210",["4,120","equal","4,012"],"Compare place values."),
    ()=>numeric("You have ₱300 and earn ₱125. How much now?",425,"Add."),
    ()=>numeric("You have 900 screws and use 250. How many remain?",650,"Subtract."),
    ()=>numeric("6 brackets with 4 screws each need how many screws?",24,"6 groups of 4.")
  ];
  return qs[i]();
}
function startPlayer(){
  const name=$("playerName").value.trim();if(!name)return;
  const key=name.toLowerCase().replace(/\s+/g," "),ps=loadProfiles();
  if(!ps[key])ps[key]=freshProfile(name);
  state.key=key;state.profile=ps[key];
  state.profile.portfolio=state.profile.portfolio||[];
  state.profile.seenQuestions=state.profile.seenQuestions||{};
  state.profile.inventory=state.profile.inventory||{wood:0,screws:0,brackets:0,paint:0};
  localStorage.setItem(PROFILE_KEY,JSON.stringify(ps));
  $("startScreen").classList.add("hidden");$("game").classList.remove("hidden");
  if(!state.profile.toolboxDone)showToolbox();else newJob();
  renderAll();
}
function renderAll(){if(!state.profile)return;renderHeader();renderTiers();renderSkills();renderWorkshop();renderMaterials()}
function renderHeader(){const t=activeTier(),q=currentQuarter();$("playerPill").textContent="👷 "+state.profile.name;$("tierPill").textContent=TIERS[t].icon+" "+TIERS[t].name;$("quarterPill").textContent="📘 Quarter "+q;$("cashStat").textContent=peso(state.profile.cash);$("jobsStat").textContent=state.profile.jobs;$("masteredStat").textContent=masteredCount()+"/"+SKILLS.length;$("evidenceStat").textContent=totalEvidence()}
function renderTiers(){const cur=activeTier();$("bizPath").innerHTML=TIERS.map((t,i)=>{const unlocked=tierUnlocked(i),done=i<cur||(i===0&&state.profile.toolboxDone);return `<div class="tier ${i===cur?"current":done?"done":"locked"}"><strong>${t.icon} ${t.name}</strong><div class="small muted">${t.desc}</div><div class="small">${done?"✓ Completed":unlocked?"● Current":"🔒 Locked by math mastery"}</div></div>`}).join("")}
function renderSkills(){const q=currentQuarter(),cur=state.q?.skillId||chooseSkill().id;$("skillList").innerHTML=SKILLS.filter(s=>s.q===q).map(s=>{const st=getStat(s.id),a=Math.round(accuracy(s.id)*100),locked=!prereqsMet(s.id)&&!st.mastered,cov=Math.round(componentCoverage(s.id)*100);return `<div class="skill ${s.id===cur?"active":""} ${st.mastered?"mastered":""}"><strong>${s.n}</strong> <span class="badge">${st.mastered?"MASTERED":locked?"UP NEXT":"LEARNING"}</span><small>${st.possible?`${a}% accuracy • ${cov}% component coverage`:"Teaching not yet started"}</small></div>`}).join("")}
function renderWorkshop(){const sk=state.q&&state.q.skillId?S[state.q.skillId]:chooseSkill(),st=getStat(sk.id),a=Math.round(accuracy(sk.id)*100),cov=Math.round(componentCoverage(sk.id)*100),depth=Math.round(Math.min(1,st.possible/evidenceNeed(sk.id))*100);$("focusSkill").textContent=sk.n;$("focusMastery").textContent=(st.possible?a:0)+"%";$("focusBar").style.width=(st.possible?a:0)+"%";$("focusEvidence").textContent=`${cov}% component coverage • ${depth}% evidence depth`;$("adaptiveNote").textContent=st.mastered?"Mastered. This skill will return naturally for retention.":"Builder Quest stays on this curriculum competency, teaches it, fades support, targets weak components, then checks transfer."}
function renderMaterials(){const tools=state.profile.tools||[],inv=state.profile.inventory||{};$("materials").innerHTML=[...tools.slice(-4).map(t=>`<div class="material">${t.icon} <strong>${t.name}</strong></div>`),`<div class="material">🪵 Wood <strong>${inv.wood||0}</strong></div>`,`<div class="material">🔩 Screws <strong>${inv.screws||0}</strong></div>`,`<div class="material">🧱 Brackets <strong>${inv.brackets||0}</strong></div>`,`<div class="material">🎨 Paint <strong>${inv.paint||0}</strong></div>`].join("")}
function showToolbox(){
  $("jobArea").classList.add("hidden");$("completionCard").classList.add("hidden");$("toolboxIntro").classList.remove("hidden");
  const i=state.profile.toolboxIndex||0;if(i>=10){finishToolbox();return}
  state.q={...toolboxQuestion(i),toolbox:true};state.answered=false;state.hinted=false;const tool=TOOLBOX[i];
  $("toolboxIntro").innerHTML=`<div class="jobHeader"><div><span class="badge">TOOLBOX TUTORIAL ${i+1}/10</span><h2>Earn: ${tool[0]} ${tool[1]}</h2><p class="muted">Starter diagnostic only. It never certifies curriculum mastery.</p></div><div class="jobIcon">${tool[0]}</div></div><div class="step"><div class="context">BASIC CHECK</div><div class="q">${state.q.text}</div><div id="tbAnswer"></div><div id="tbFeedback" class="feedback"></div><div class="row"><button id="tbHint" class="secondary">Hint</button><button id="tbNext" class="gold hidden">Next tool</button></div></div>`;
  renderInlineAnswer("tbAnswer",state.q,submitToolbox);
  $("tbHint").onclick=()=>{$("tbFeedback").textContent="Hint: "+state.q.hint;$("tbFeedback").className="feedback hintText";state.hinted=true};
  $("tbNext").onclick=()=>{state.profile.toolboxIndex++;saveProfiles();showToolbox();renderAll()};
}
function renderInlineAnswer(id,q,handler){const el=$(id);if(q.type==="choice"){el.innerHTML=`<div class="choices">${q.options.map(o=>`<button class="choice" data-v="${String(o).replace(/"/g,"&quot;")}">${o}</button>`).join("")}</div>`;el.querySelectorAll("button").forEach(b=>b.onclick=()=>handler(b.dataset.v))}else{el.innerHTML=`<div class="answerRow"><input id="${id}Input"><button id="${id}Check">Check</button></div>`;const inp=$(id+"Input");$(id+"Check").onclick=()=>handler(inp.value.trim());inp.addEventListener("keydown",e=>{if(e.key==="Enter")handler(inp.value.trim())})}}
function submitToolbox(v){if(state.answered)return;const correct=String(v).trim().toLowerCase()===String(state.q.answer).trim().toLowerCase();state.answered=true;state.profile.toolboxDiagnostic=state.profile.toolboxDiagnostic||[];state.profile.toolboxDiagnostic.push({index:state.profile.toolboxIndex,correct,hinted:state.hinted});if(correct){const t=TOOLBOX[state.profile.toolboxIndex];state.profile.tools.push({icon:t[0],name:t[1]});$("tbFeedback").textContent=`Correct. ${t[1]} added.`;$("tbFeedback").className="feedback good"}else{$("tbFeedback").textContent=`Correct answer: ${state.q.answer}. Diagnostic only, so this does not lower mastery.`;$("tbFeedback").className="feedback bad"}$("tbNext").classList.remove("hidden");saveProfiles();renderAll()}
function finishToolbox(){state.profile.toolboxDone=true;state.profile.tier=1;state.profile.cash+=100;saveProfiles();$("toolboxIntro").classList.add("hidden");$("completionCard").classList.remove("hidden");$("completionCard").innerHTML=`<h2>🧰 Toolbox Ready</h2><p>Starter tools earned. Your first paid job now teaches the first Grade 3 competency.</p><button id="firstJob">Accept First House Call</button>`;$("firstJob").onclick=()=>{$("completionCard").classList.add("hidden");newJob();renderAll()};renderAll()}
function learningPhase(id){const st=getStat(id),L=st.learning||{};if((L.guided||0)===0)return "teach";if((st.possible||0)===0)return "guided";if(recentConfidence(id)<.55&&st.possible>=.8)return "reteach";if(componentCoverage(id)<.5)return "fade";if(componentCoverage(id)<1)return "independent";if(!masteryReady(id))return "transfer";return "retention"}
function makeContractPlan(tier){const material=pick(["wood","screws","brackets","paint"]),required=rand(5+tier*2,10+tier*4),unitCost={wood:180,screws:35,brackets:90,paint:220}[material],available=state.profile.inventory[material]||0;return {material,required,available,shortage:Math.max(0,required-available),unitCost}}
function newJob(){
  if(!state.profile.toolboxDone){showToolbox();return}
  $("toolboxIntro").classList.add("hidden");$("completionCard").classList.add("hidden");$("jobArea").classList.remove("hidden");
  const tier=activeTier(),pool=JOBS[TIERS[tier].id]||JOBS.calls,meta=pick(pool),primary=chooseSkill(),phase=learningPhase(primary.id),mastered=SKILLS.filter(s=>getStat(s.id).mastered),steps=tier===1?4:tier===2?5:6,questions=[];
  for(let i=0;i<steps;i++){
    let id=primary.id,lp=phase;
    if(["transfer","retention"].includes(phase)&&mastered.length&&i===steps-1){id=pick(mastered).id;lp="review"}
    const ctx=["teach","guided","reteach"].includes(lp)?"applied":lp==="transfer"?"reasoning":pick(["direct","applied","reasoning"]),q=genQuestion(id,ctx);
    questions.push({...q,skillId:id,learningPhase:lp});
  }
  state.job={title:meta[0],desc:meta[1],icon:meta[2],tier,questions,index:0,earned:0,correctCount:0,primary:primary.id,phase,plan:makeContractPlan(tier),serviceFee:0,materialCost:0,quote:0};
  $("jobType").textContent=TIERS[tier].name.toUpperCase();$("jobTitle").textContent=meta[0];$("jobDesc").textContent=meta[1];$("jobIcon").textContent=meta[2];
  showJobQuestion();
}
function showJobQuestion(){
  const j=state.job;if(j.index>=j.questions.length){showMaterialDecision();return}
  state.q=j.questions[j.index];state.answered=false;state.hinted=false;
  const q=state.q,lesson=LESSONS[q.skillId],supported=["teach","guided","reteach"].includes(q.learningPhase),label={teach:"FOREMAN TEACHES",guided:"BUILD WITH THE FOREMAN",reteach:"FOREMAN RETEACHES",fade:"TRY WITH LESS HELP",independent:"YOUR TURN",transfer:"NEW JOB CHALLENGE",retention:"KEEP IT SHARP",review:"SKILL REVIEW"}[q.learningPhase]||"YOUR TURN";
  $("contextLabel").textContent=label+" • "+S[q.skillId].n.toUpperCase();
  $("questionVisual").innerHTML=(supported?`<div class="notice"><strong>${q.learningPhase==="reteach"?"Let's rebuild this idea:":"Learn this for the job:"}</strong> ${lesson.teach}<br><br><strong>Method:</strong> ${lesson.coach}</div>`:"")+(q.visual||"");
  $("questionText").textContent=q.text;$("feedback").textContent="";$("nextBtn").classList.add("hidden");$("hintBtn").disabled=false;$("jobProgress").style.width=(j.index/j.questions.length*70)+"%";$("jobMoney").textContent=peso(j.earned);
  if(q.type==="choice"){$("inputAnswer").classList.add("hidden");$("choices").classList.remove("hidden");$("choices").innerHTML=q.options.map(o=>`<button class="choice" data-v="${String(o).replace(/"/g,"&quot;")}">${o}</button>`).join("");$("choices").querySelectorAll("button").forEach(b=>b.onclick=()=>submitJob(b.dataset.v))}else{$("choices").classList.add("hidden");$("inputAnswer").classList.remove("hidden");$("answerInput").value="";$("checkBtn").disabled=false}
  renderAll();
}
function submitJob(v){if(state.answered)return;const q=state.q,correct=String(v).trim().toLowerCase()===String(q.answer).trim().toLowerCase(),guided=["teach","guided","reteach"].includes(q.learningPhase);state.answered=true;recordEvidence(q.skillId,correct,q.context||"applied",state.hinted,guided,q.component);$("hintBtn").disabled=true;$("checkBtn").disabled=true;$("choices").querySelectorAll("button").forEach(b=>b.disabled=true);if(correct){state.job.correctCount++;const pay=guided?15:q.context==="reasoning"?35:25;state.job.earned+=pay;$("feedback").textContent=guided?"Correct. This is practice with teaching support, not mastery proof.":"Correct. This independent decision is now part of the mastery evidence.";$("feedback").className="feedback good"}else{$("feedback").textContent=guided?`Not yet. Correct answer: ${q.answer}. The Foreman will keep teaching this component.`:`Not yet. Correct answer: ${q.answer}. The game will target this component again instead of moving on.`;$("feedback").className="feedback bad"}$("nextBtn").classList.remove("hidden");saveProfiles();renderAll()}
function nextJobStep(){state.job.index++;showJobQuestion()}
function showMaterialDecision(){
  const j=state.job,p=j.plan;$("jobArea").classList.add("hidden");$("completionCard").classList.remove("hidden");
  const wrong=[p.shortage+2,Math.max(0,p.shortage-1),p.required],opts=shuffle([...new Set([p.shortage,...wrong])]).slice(0,4);
  $("completionCard").innerHTML=`<span class="badge">CONTRACT STEP 2 • MATERIALS</span><h2>${j.icon} ${j.title}</h2><p>The job needs <strong>${p.required} ${p.material}</strong>. Your workshop inventory has <strong>${p.available}</strong>. How many must you buy?</p><div class="choices" id="purchaseChoices">${opts.map(n=>`<button class="choice" data-buy="${n}">${n}</button>`).join("")}</div><div id="purchaseFeedback" class="feedback"></div>`;
  $("purchaseChoices").querySelectorAll("button").forEach(b=>b.onclick=()=>checkPurchase(Number(b.dataset.buy)));
}
function checkPurchase(answer){const p=state.job.plan;if(answer!==p.shortage){$("purchaseFeedback").textContent=`Not yet. Required ${p.required} minus inventory ${p.available} = ${p.shortage} to buy.`;$("purchaseFeedback").className="feedback bad";return}state.job.materialCost=p.shortage*p.unitCost;showPurchaseOrder()}
function showPurchaseOrder(){
  const j=state.job,p=j.plan;$("completionCard").innerHTML=`<span class="badge">CONTRACT STEP 3 • PURCHASE</span><h2>Hardware Store Order</h2><div class="materials"><div class="material"><small>Material</small><strong>${p.material}</strong></div><div class="material"><small>Buy</small><strong>${p.shortage}</strong></div><div class="material"><small>Unit cost</small><strong>${peso(p.unitCost)}</strong></div><div class="material"><small>Purchase cost</small><strong>${peso(j.materialCost)}</strong></div></div><p class="muted">Materials are passed through at their actual purchase cost. Labor/service is priced separately.</p><button id="buyMaterials">Buy Supplies</button>`;
  $("buyMaterials").onclick=()=>{state.profile.inventory[p.material]=(state.profile.inventory[p.material]||0)+p.shortage;saveProfiles();showQuoteDecision()};
}
function showQuoteDecision(){
  const j=state.job,p=j.plan,feeSets={1:[450,700,1000],2:[1000,1500,2000],3:[1800,2500,3000],4:[2500,3000,4000]},fees=feeSets[j.tier]||[450,700,1000];
  $("completionCard").innerHTML=`<span class="badge">CONTRACT STEP 4 • PRICE THE JOB</span><h2>Set the Labor / Service Fee</h2><p>There is no single correct markup. Choose a fixed labor/service fee that fits this job. Materials remain ${peso(j.materialCost)}.</p><div class="choices" id="feeChoices">${fees.map((f,i)=>`<button class="choice" data-fee="${f}">${peso(f)} — ${i===0?"basic":i===1?"standard":"premium"}</button>`).join("")}</div>`;
  $("feeChoices").querySelectorAll("button").forEach(b=>b.onclick=()=>prepareQuote(Number(b.dataset.fee)));
}
function prepareQuote(serviceFee){const j=state.job;j.serviceFee=serviceFee;j.quote=j.materialCost+serviceFee;$("completionCard").innerHTML=`<span class="badge">CONTRACT STEP 5 • CUSTOMER QUOTE</span><h2>Send the Quote</h2><div class="materials"><div class="material"><small>Materials</small><strong>${peso(j.materialCost)}</strong></div><div class="material"><small>Labor/service</small><strong>${peso(j.serviceFee)}</strong></div><div class="material"><small>Customer quote</small><strong>${peso(j.quote)}</strong></div></div><button id="approveQuote">Customer Accepts Quote</button>`;$("approveQuote").onclick=performWork}
function performWork(){const j=state.job,p=j.plan;state.profile.inventory[p.material]=Math.max(0,(state.profile.inventory[p.material]||0)-p.required);saveProfiles();$("completionCard").innerHTML=`<span class="badge">CONTRACT STEP 6 • PERFORM WORK</span><h2>${j.icon} Work Completed</h2><p>The required ${p.material} was taken from inventory and the carpentry work is finished.</p><button id="collectPayment">Collect Customer Payment</button>`;$("collectPayment").onclick=collectPayment}
function collectPayment(){const j=state.job;$("completionCard").innerHTML=`<span class="badge">CONTRACT STEP 7 • COLLECT PAYMENT</span><h2>Payment Received: ${peso(j.quote)}</h2><p>Materials ${peso(j.materialCost)} are recovered at cost. Your business earns the ${peso(j.serviceFee)} labor/service fee as job profit in this simplified Grade 3 model.</p><button id="closeContract">Close Contract</button>`;$("closeContract").onclick=finalizeJob}
function finalizeJob(){
  const j=state.job,st=getStat(j.primary),perfect=j.correctCount===j.questions.length;
  state.profile.cash+=j.serviceFee;state.profile.jobs++;
  state.profile.portfolio.push({title:j.title,tier:TIERS[j.tier].name,date:new Date().toISOString().slice(0,10),skill:S[j.primary].n,materials:j.materialCost,serviceFee:j.serviceFee,quote:j.quote,profit:j.serviceFee,mastered:st.mastered,componentCoverage:Math.round(componentCoverage(j.primary)*100),perfect});
  saveProfiles();
  $("completionCard").innerHTML=`<h2>Contract Complete</h2><div class="materials"><div class="material"><small>Materials</small><strong>${peso(j.materialCost)}</strong></div><div class="material"><small>Service fee</small><strong>${peso(j.serviceFee)}</strong></div><div class="material"><small>Customer quote</small><strong>${peso(j.quote)}</strong></div><div class="material"><small>Profit</small><strong>${peso(j.serviceFee)}</strong></div></div><div class="notice">Saved to Builder Portfolio. ${st.mastered?"Competency mastered. It now becomes a working skill in later jobs.":`Current competency remains active. Evidence depth: ${Math.round(Math.min(1,st.possible/evidenceNeed(j.primary))*100)}%.`}</div>${perfect?`<div class="notice"><strong>100% contract.</strong> SHOW MOMMY FOR CONFIRMATION: Mommy may choose 30 minutes of school-day screen time, a cash reward amount chosen by Mommy, or a food reward chosen by Mommy.</div>`:""}<button id="anotherJob">Accept Next Contract</button>`;
  $("anotherJob").onclick=()=>{$("completionCard").classList.add("hidden");newJob();renderAll()};
  renderAll();
  if(perfect&&parentData())openGate("reward","100% contract. Mommy chooses: 30 minutes school-day screen time, a cash amount set by Mommy, or a food reward set by Mommy.");
}
function parentData(){try{return JSON.parse(localStorage.getItem(PARENT_KEY)||"null")}catch{return null}}
function openParent(){const p=parentData();$("parentModal").classList.remove("hidden");$("parentSetup").innerHTML=p?`<p class="muted">Enter the parent password to access local controls.</p><input id="parentPassCheck" type="password" placeholder="Parent password"><button id="parentUnlock" style="margin-top:10px">Unlock</button><div id="parentMsg" class="feedback"></div>`:`<p>Create one parent password for this browser/device. This is a local deterrent, not secure authentication.</p><input id="parentPassNew" type="password" placeholder="Create parent password"><button id="parentCreate" style="margin-top:10px">Create password</button><div id="parentMsg" class="feedback"></div>`;if(p)$("parentUnlock").onclick=()=>{if($("parentPassCheck").value!==p.password){$("parentMsg").textContent="Incorrect password.";return}showParentControls()};else $("parentCreate").onclick=()=>{const v=$("parentPassNew").value;if(v.length<4){$("parentMsg").textContent="Use at least 4 characters.";return}localStorage.setItem(PARENT_KEY,JSON.stringify({password:v}));showParentControls()}}
function showParentControls(){const names=Object.entries(loadProfiles());$("parentSetup").innerHTML=`<div class="notice">Progress is stored on this browser/device. Clearing browser data may erase it.</div><h3>Local player profiles</h3>${names.length?names.map(([k,p])=>`<div class="material"><strong>${p.name}</strong><div class="small">${p.jobs||0} contracts • ${Object.values(p.skillStats||{}).filter(x=>x.mastered).length} skills mastered</div></div>`).join(""):"<p>No profiles yet.</p>"}`}
function renderCurriculumMap(){$("curriculumMap").innerHTML=[1,2,3,4].map(q=>`<div class="quarter"><h4>Quarter ${q}</h4>${SKILLS.filter(s=>s.q===q).map(s=>`<div>${getStat(s.id).mastered?"✓":"○"} ${s.n}</div>`).join("")}</div>`).join("")}
function renderPortfolio(){const list=state.profile?.portfolio||[];$("portfolioList").innerHTML=list.length?list.slice().reverse().map(p=>`<div class="quarter"><h4>${p.title}</h4><div class="small">${p.date} • ${p.tier}${p.perfect?" • 100%":""}</div><p><strong>Math:</strong> ${p.skill}${p.mastered?" • MASTERED":""}</p><div class="materials"><div class="material"><small>Materials</small><strong>${peso(p.materials)}</strong></div><div class="material"><small>Labor/service</small><strong>${peso(p.serviceFee)}</strong></div><div class="material"><small>Quote</small><strong>${peso(p.quote)}</strong></div><div class="material"><small>Profit</small><strong>${peso(p.profit)}</strong></div></div></div>`).join(""):"<p class='muted'>Complete contracts to build the portfolio.</p>"}
function openGate(type,text){state.profile.pendingGate={type,text};saveProfiles();$("gateTitle").textContent="SHOW MOMMY FOR CONFIRMATION";$("gateText").textContent=text;$("gatePassword").value="";$("gateModal").classList.remove("hidden")}
function maybeConsequenceGate(){if(!parentData())return;openGate("consequence",pick(["Do one household chore.","Perform one song number.","Do one dance.","Read a book."]))}
function confirmGate(){const p=parentData();if(!p||$("gatePassword").value!==p.password)return;state.profile.pendingGate=null;saveProfiles();$("gateModal").classList.add("hidden")}
$("enterBtn").onclick=startPlayer;
$("playerName").addEventListener("keydown",e=>{if(e.key==="Enter")startPlayer()});
$("parentBtn").onclick=openParent;
$("closeParent").onclick=()=>$("parentModal").classList.add("hidden");
$("changePlayer").onclick=()=>location.reload();
$("curriculumBtn").onclick=()=>{renderCurriculumMap();$("curriculumModal").classList.remove("hidden")};
$("closeCurriculum").onclick=()=>$("curriculumModal").classList.add("hidden");
$("portfolioBtn").onclick=()=>{renderPortfolio();$("portfolioModal").classList.remove("hidden")};
$("closePortfolio").onclick=()=>$("portfolioModal").classList.add("hidden");
$("gateConfirm").onclick=confirmGate;
$("checkBtn").onclick=()=>submitJob($("answerInput").value);
$("answerInput").addEventListener("keydown",e=>{if(e.key!=="Enter")return;e.preventDefault();if(!state.answered)submitJob($("answerInput").value);else nextJobStep()});
$("nextBtn").onclick=nextJobStep;
$("hintBtn").onclick=()=>{state.hinted=true;$("feedback").textContent="Hint: "+state.q.hint;$("feedback").className="feedback hintText"};
