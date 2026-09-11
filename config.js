const $=id=>document.getElementById(id);
const PROFILE_KEY="builder_quest_adaptive_profiles_v1";
const PARENT_KEY="builder_quest_parent_v5";
const rand=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick=a=>a[rand(0,a.length-1)];
const shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
const peso=n=>"₱"+Math.round(n).toLocaleString("en-PH");
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));

const TIERS=[
  {id:"toolbox",name:"Toolbox Tutorial",icon:"🧰",desc:"10 short prerequisite checks. Earn your starter tools."},
  {id:"calls",name:"House Calls",icon:"🏠",desc:"Small repairs and carpentry jobs."},
  {id:"room",name:"Room Contractor",icon:"🚪",desc:"Plan and complete an entire room."},
  {id:"house",name:"House Contractor",icon:"🏡",desc:"Coordinate several rooms and larger purchases."},
  {id:"building",name:"Building Contractor",icon:"🏢",desc:"Manage repeated rooms, floors, budgets, and crews."}
];

const SKILLS=[
  {id:"q1_area",q:1,n:"Area of squares & rectangles",c:3,comps:["estimate area with square units","derive/use area formula","find area in cm²/m²","solve area problems"]},
  {id:"q1_lines",q:1,n:"Points, lines, segments & rays",c:2,comps:["recognize/draw point, line, segment, ray","parallel/intersecting/perpendicular lines","equal segments"]},
  {id:"q1_numbers",q:1,n:"Numbers to 10,000",c:2,comps:["represent numbers","read/write numerals and words"]},
  {id:"q1_ordinals",q:1,n:"Ordinal numbers to 100th",c:1,comps:["describe positions using ordinals"]},
  {id:"q1_place",q:1,n:"Place value",c:2,comps:["place value","digit value","identify digit from place value"]},
  {id:"q1_round",q:1,n:"Rounding to 10/100/1000",c:2,comps:["round whole numbers"]},
  {id:"q1_compare",q:1,n:"Compare & order to 10,000",c:2,comps:["use = > <","order ascending/descending"]},
  {id:"q2_mass",q:2,n:"Mass: g, kg, mg",c:2,comps:["measure","estimate","compare mass"]},
  {id:"q2_capacity",q:2,n:"Capacity: L & mL",c:2,comps:["measure","estimate","compare capacity"]},
  {id:"q2_money",q:2,n:"Money to ₱10,000",c:1,comps:["read/write Philippine money"]},
  {id:"q2_add",q:2,n:"Addition to 10,000",c:3,comps:["with/without regrouping"]},
  {id:"q2_addest",q:2,n:"Estimate sums",c:2,comps:["estimate sum of up to 4-digit addends"]},
  {id:"q2_addprob",q:2,n:"Addition problems incl. money",c:3,comps:["solve contextual addition problems"]},
  {id:"q2_sub",q:2,n:"Subtraction below 10,000",c:3,comps:["with/without regrouping"]},
  {id:"q2_subest",q:2,n:"Estimate differences",c:2,comps:["estimate differences"]},
  {id:"q2_mixed",q:2,n:"Mixed + and − problems",c:3,comps:["3–4 numbers","order of operations","money problems"]},
  {id:"q3_data",q:3,n:"Collect & present data",c:2,comps:["small-outcome experiments","tables","single bar graphs"]},
  {id:"q3_graph",q:3,n:"Interpret bar graphs",c:3,comps:["interpret graphs","solve graph problems"]},
  {id:"q3_probability",q:3,n:"Likelihood language",c:2,comps:["equally/less/more likely","certain","impossible"]},
  {id:"q3_facts",q:3,n:"Multiplication tables 6–9",c:2,comps:["facts for 6,7,8,9"]},
  {id:"q3_props",q:3,n:"Multiplication properties",c:3,comps:["identity","zero","commutative","associative","distributive"]},
  {id:"q3_mult",q:3,n:"Multiply with/without regrouping",c:3,comps:["2–3 digit × 1 digit","2–4 digit × place-value factor","products ≤10,000"]},
  {id:"q3_estprod",q:3,n:"Estimate products",c:3,comps:["round factors to multiples of 10"]},
  {id:"q3_multprob",q:3,n:"1–2 step multiplication problems",c:3,comps:["contextual problems","money"]},
  {id:"q3_patterns",q:3,n:"Growing & shrinking patterns",c:3,comps:["missing terms","explain/generate repeating + increasing/decreasing patterns"]},
  {id:"q4_divconcept",q:4,n:"Division as inverse of multiplication",c:2,comps:["equal jumps","inverse relationship","facts 6–9","missing number"]},
  {id:"q4_div",q:4,n:"Division with/without remainder",c:3,comps:["2–3 digit ÷ 1 digit","2 digit with remainder","÷10/100/1000"]},
  {id:"q4_estquot",q:4,n:"Estimate quotients",c:3,comps:["round divisor/dividend to multiples of 10/100"]},
  {id:"q4_divprob",q:4,n:"Division problems incl. money",c:3,comps:["2–3 digit by 1 digit"]},
  {id:"q4_fracrep",q:4,n:"Fractions ≥ 1",c:2,comps:["represent fractions equal to/greater than one"]},
  {id:"q4_fracops",q:4,n:"Add & subtract similar fractions",c:3,comps:["use models","same denominator"]},
  {id:"q4_translation",q:4,n:"Two-direction translations",c:2,comps:["describe/draw multi-step slides"]},
  {id:"q4_symmetry",q:4,n:"Line symmetry",c:2,comps:["identify/draw line of symmetry","complete symmetric figure"]}
];
const S=Object.fromEntries(SKILLS.map(s=>[s.id,s]));

const PREREQ={
 q1_area:[],q1_lines:[],q1_numbers:[],q1_ordinals:["q1_numbers"],q1_place:["q1_numbers"],q1_round:["q1_place"],q1_compare:["q1_numbers"],
 q2_mass:[],q2_capacity:[],q2_money:["q1_numbers"],q2_add:["q1_place"],q2_addest:["q1_round","q2_add"],q2_addprob:["q2_add","q2_money"],
 q2_sub:["q1_place"],q2_subest:["q1_round","q2_sub"],q2_mixed:["q2_add","q2_sub","q2_money"],
 q3_data:[],q3_graph:["q3_data"],q3_probability:[],
 q3_facts:[],q3_props:["q3_facts"],q3_mult:["q3_facts","q3_props"],q3_estprod:["q1_round","q3_mult"],q3_multprob:["q3_mult","q2_money"],q3_patterns:[],
 q4_divconcept:["q3_facts"],q4_div:["q4_divconcept"],q4_estquot:["q1_round","q4_div"],q4_divprob:["q4_div","q2_money"],
 q4_fracrep:[],q4_fracops:["q4_fracrep"],q4_translation:["q1_lines"],q4_symmetry:["q1_lines"]
};

const TOOLBOX=[
 ["🔨","Hammer"],["🪛","Screwdriver"],["📏","Measuring Tape"],["🪚","Hand Saw"],["📐","Square"],
 ["🧰","Toolbox"],["🗜️","Pliers"],["🪵","Marking Pencil"],["🔧","Wrench"],["🧱","Level"]
];

const JOBS={
 calls:[
  ["Wobbly Bookshelf","Mrs. Cruz has a bookshelf that needs stronger supports.","📚"],
  ["Loose Cabinet Door","A kitchen cabinet door is sagging and needs repair.","🚪"],
  ["Study Desk Repair","A student's desk needs a new board and fasteners.","🪑"],
  ["Wall Shelf Install","A customer wants shelves mounted safely.","🧱"],
  ["Garden Bench Fix","Replace damaged parts on a wooden bench.","🪵"]
 ],
 room:[
  ["Study Room Upgrade","Plan shelves, desk panels, storage, and materials for one room.","🛏️"],
  ["Bedroom Carpentry","Build storage and repair fixtures across a bedroom.","🚪"],
  ["Home Workshop","Fit a small workshop with shelves, racks, and a workbench.","🧰"]
 ],
 house:[
  ["Family House Contract","Coordinate carpentry work across several rooms.","🏡"],
  ["Small House Renovation","Manage materials and costs for a whole-house carpentry job.","🏠"]
 ],
 building:[
  ["Three-Storey Workshop","Manage repeated rooms and supplies across several floors.","🏢"],
  ["Community Learning Center","Plan a larger building with rooms, materials, and crews.","🏫"]
 ]
};

function freshProfile(name){return {name,toolboxDone:false,toolboxIndex:0,tools:[],cash:0,jobs:0,tier:0,skillStats:{},inventory:{wood:0,screws:0,brackets:0,paint:0},currentJob:null,pendingGate:null};}
function loadProfiles(){try{return JSON.parse(localStorage.getItem(PROFILE_KEY)||"{}")}catch{return {}}}
function saveProfiles(){const p=loadProfiles();p[state.key]=state.profile;localStorage.setItem(PROFILE_KEY,JSON.stringify(p))}
function getStat(id){if(!state.profile.skillStats[id]) state.profile.skillStats[id]={attempts:0,correct:0,earned:0,possible:0,contexts:{},recent:[],mastered:false,review:false};return state.profile.skillStats[id];}
function accuracy(id){const st=getStat(id);return st.possible?st.earned/st.possible:0;}
function minEvidence(skill){return skill.c===1?3.2:skill.c===2?4.6:6.0;}
function contextCount(st){return Object.values(st.contexts).filter(Boolean).length}
function masteryReady(id){const sk=S[id],st=getStat(id),acc=accuracy(id);const recent=st.recent.slice(-3);const recentGood=recent.length>=3&&recent.filter(Boolean).length>=2;return st.possible>=minEvidence(sk)&&contextCount(st)>=2&&acc>=.85&&recentGood;}
function updateMastery(id){const st=getStat(id);if(masteryReady(id))st.mastered=true;if(st.mastered&&st.recent.length>=5){const r=st.recent.slice(-5).filter(Boolean).length/5;st.review=r<.6;}}
function quarterMastered(q){return SKILLS.filter(s=>s.q===q).every(s=>getStat(s.id).mastered)}
function allMasteredUpTo(q){for(let i=1;i<=q;i++)if(!quarterMastered(i))return false;return true}
function masteredCount(){return SKILLS.filter(s=>getStat(s.id).mastered).length}
function totalEvidence(){return Math.round(SKILLS.reduce((a,s)=>a+getStat(s.id).possible,0))}
function currentQuarter(){for(let q=1;q<=4;q++)if(!quarterMastered(q))return q;return 4;}
function prereqsMet(id){return (PREREQ[id]||[]).every(p=>getStat(p).mastered)}
function availableSkills(){const q=currentQuarter();let a=SKILLS.filter(s=>s.q===q&&!getStat(s.id).mastered&&prereqsMet(s.id));if(!a.length)a=SKILLS.filter(s=>s.q===q&&!getStat(s.id).mastered);return a;}
function chooseSkill(){const a=availableSkills();if(!a.length)return SKILLS.find(s=>!getStat(s.id).mastered)||SKILLS[SKILLS.length-1];return a.sort((x,y)=>{const sx=getStat(x.id),sy=getStat(y.id);const vx=sx.possible-minEvidence(x),vy=sy.possible-minEvidence(y);if(vx!==vy)return vx-vy;return accuracy(x.id)-accuracy(y.id);})[0];}
function tierUnlocked(t){if(t===0)return !state.profile.toolboxDone;if(t===1)return state.profile.toolboxDone;if(t===2)return state.profile.toolboxDone&&allMasteredUpTo(2)&&getStat("q3_facts").mastered&&getStat("q3_props").mastered;if(t===3)return quarterMastered(3)&&allMasteredUpTo(2);if(t===4)return SKILLS.every(s=>getStat(s.id).mastered);}
function activeTier(){if(tierUnlocked(4))return 4;if(tierUnlocked(3))return 3;if(tierUnlocked(2))return 2;return state.profile.toolboxDone?1:0;}

let state={key:null,profile:null,q:null,job:null,answered:false,hinted:false};
function recordEvidence(skillId,correct,context,hinted){const st=getStat(skillId);const w=context==="reasoning"?1.25:context==="applied"?1.0:.8;st.attempts++;if(correct)st.correct++;st.possible+=w;st.earned+=correct?w*(hinted?.55:1):0;st.contexts[context]=true;st.recent.push(!!correct);if(st.recent.length>8)st.recent.shift();updateMastery(skillId);saveProfiles();if(!correct)maybeConsequenceGate(skillId);}
function option(q,correct,wrong){const arr=shuffle([String(correct),...wrong.map(String)]);q.options=arr;q.answer=String(correct);return q;}
function numeric(text,answer,hint,context="direct",visual=""){return {text,answer:String(answer),hint,context,type:"input",visual}}
function mc(text,correct,wrong,hint,context="direct",visual=""){return option({text,hint,context,type:"choice",visual},correct,wrong)}
