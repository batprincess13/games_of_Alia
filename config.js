const $=id=>document.getElementById(id);
const PROFILE_KEY="builder_quest_adaptive_profiles_v2";
const PARENT_KEY="builder_quest_parent_v5";
const rand=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick=a=>a[rand(0,a.length-1)];
const shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
const peso=n=>"₱"+Math.round(n).toLocaleString("en-PH");

const TIERS=[
  {id:"toolbox",name:"Toolbox Tutorial",icon:"🧰",desc:"10 short diagnostic checks. Earn your starter tools."},
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

const LESSONS={
 q1_area:{teach:"Area tells us how much flat space a shape covers. For a rectangle, multiply length × width. Example: 4 cm × 3 cm = 12 cm².",coach:"First identify the length and width. Then multiply them. The answer is in square units."},
 q1_lines:{teach:"A line continues both ways, a segment has two endpoints, and a ray has one endpoint. Parallel lines never meet. Perpendicular lines meet at a square corner.",coach:"Look at whether the lines meet, and if they do, whether they form a right angle."},
 q1_numbers:{teach:"A 4-digit number is built from thousands, hundreds, tens, and ones.",coach:"Read each place from left to right: thousands, hundreds, tens, ones."},
 q1_ordinals:{teach:"Ordinal numbers show position: 1st, 2nd, 3rd, 4th, and so on.",coach:"Think about position in a line, not quantity."},
 q1_place:{teach:"Each digit has a place and a value. In 3,542, the 5 is in the hundreds place, so its value is 500.",coach:"Find the digit's position first, then its value."},
 q1_round:{teach:"To round, look at the digit immediately to the right of the place you are rounding to. 5 or more rounds up; 4 or less stays.",coach:"Circle the target place, then inspect the next digit."},
 q1_compare:{teach:"Compare numbers from the largest place first. The first different digit decides which number is greater.",coach:"Start at the thousands place, then move right."},
 q2_mass:{teach:"Mass can be measured in milligrams, grams, or kilograms. Tiny objects use mg, small objects often use g, and heavier objects use kg.",coach:"Choose the unit that fits the object's size."},
 q2_capacity:{teach:"Capacity tells how much liquid a container can hold. Small containers use milliliters; larger containers use liters.",coach:"Think about whether the container holds a little or a lot."},
 q2_money:{teach:"Philippine money uses pesos and centavos. Read the peso amount carefully before calculating.",coach:"Identify the peso value first."},
 q2_add:{teach:"Addition combines amounts. Line up ones under ones, tens under tens, hundreds under hundreds, and thousands under thousands. Regroup when a place totals 10 or more.",coach:"Add by place value and regroup when needed."},
 q2_addest:{teach:"To estimate a sum, round the addends first, then add the rounded numbers.",coach:"Round each number to the requested place before adding."},
 q2_addprob:{teach:"In an addition word problem, identify all amounts being combined before calculating.",coach:"Ask: what amounts are being put together?"},
 q2_sub:{teach:"Subtraction finds what is left or the difference. Line up place values and regroup when the top digit is too small.",coach:"Subtract by place value; regroup when needed."},
 q2_subest:{teach:"To estimate a difference, round both numbers first, then subtract the rounded values.",coach:"Round first, subtract second."},
 q2_mixed:{teach:"Mixed problems may require adding and subtracting in the order events happen.",coach:"Follow the story step by step."},
 q3_data:{teach:"Data can be organized in tables or graphs so we can count and compare results.",coach:"Read each category and its frequency carefully."},
 q3_graph:{teach:"In a bar graph, the height or length of each bar represents an amount.",coach:"Compare the bars using their values, not just appearance."},
 q3_probability:{teach:"An outcome is more likely when it has more ways to happen, less likely when it has fewer, certain when it must happen, and impossible when it cannot happen.",coach:"Compare how many chances each outcome has."},
 q3_facts:{teach:"Multiplication is repeated equal groups. Knowing the 6, 7, 8, and 9 facts helps solve larger carpentry jobs quickly.",coach:"Think in equal groups or use a known fact to build the answer."},
 q3_props:{teach:"Multiplication properties help rearrange or break apart multiplication. Example: 7×6 = 6×7. Also 7×8 can be split as 7×5 + 7×3.",coach:"Use a property to make the multiplication easier."},
 q3_mult:{teach:"For a multi-digit number times a 1-digit number, multiply each place from right to left and regroup when needed.",coach:"Start with the ones place, then tens, then hundreds."},
 q3_estprod:{teach:"To estimate a product, round the factors first, then multiply the rounded numbers.",coach:"Round each factor to the requested place before multiplying."},
 q3_multprob:{teach:"For multiplication word problems, identify equal groups first. Some jobs then require one more step such as adding a delivery fee.",coach:"Ask: how many groups, how many in each group, and is there another step?"},
 q3_patterns:{teach:"A pattern follows a rule. Repeating patterns repeat a block. Increasing or decreasing patterns change by a consistent rule.",coach:"Find the rule before choosing the missing term."},
 q4_divconcept:{teach:"Division separates a total into equal groups. It is the inverse of multiplication: if 6×8=48, then 48÷6=8.",coach:"Use the related multiplication fact."},
 q4_div:{teach:"Divide by finding how many equal groups fit. A remainder is what is left after making all complete groups.",coach:"Find the quotient first, then check what remains."},
 q4_estquot:{teach:"To estimate a quotient, round to nearby numbers that divide easily, then divide.",coach:"Round to friendly numbers first."},
 q4_divprob:{teach:"In a division problem, decide whether you are finding group size or number of groups.",coach:"Identify what is being shared and what one group should represent."},
 q4_fracrep:{teach:"A fraction has a numerator and denominator. The denominator tells equal parts in one whole; the numerator tells how many parts are counted.",coach:"Count the parts and keep the denominator tied to the size of each whole."},
 q4_fracops:{teach:"When fractions have the same denominator, add or subtract the numerators and keep the denominator the same.",coach:"Same denominator means operate on the numerators."},
 q4_translation:{teach:"A translation slides a shape without turning it. Track horizontal movement and vertical movement separately.",coach:"Follow the directions one move at a time."},
 q4_symmetry:{teach:"A line of symmetry divides a shape into matching mirror halves.",coach:"Imagine folding the shape on the line. Both sides should match."}
};

const PREREQ={
 q1_area:[],q1_lines:[],q1_numbers:[],q1_ordinals:["q1_numbers"],q1_place:["q1_numbers"],q1_round:["q1_place"],q1_compare:["q1_numbers"],
 q2_mass:[],q2_capacity:[],q2_money:["q1_numbers"],q2_add:["q1_place"],q2_addest:["q1_round","q2_add"],q2_addprob:["q2_add","q2_money"],
 q2_sub:["q1_place"],q2_subest:["q1_round","q2_sub"],q2_mixed:["q2_add","q2_sub","q2_money"],
 q3_data:[],q3_graph:["q3_data"],q3_probability:[],q3_facts:[],q3_props:["q3_facts"],q3_mult:["q3_facts","q3_props"],q3_estprod:["q1_round","q3_mult"],q3_multprob:["q3_mult","q2_money"],q3_patterns:[],
 q4_divconcept:["q3_facts"],q4_div:["q4_divconcept"],q4_estquot:["q1_round","q4_div"],q4_divprob:["q4_div","q2_money"],q4_fracrep:[],q4_fracops:["q4_fracrep"],q4_translation:["q1_lines"],q4_symmetry:["q1_lines"]
};

const TOOLBOX=[["🔨","Hammer"],["🪛","Screwdriver"],["📏","Measuring Tape"],["🪚","Hand Saw"],["📐","Square"],["🧰","Toolbox"],["🗜️","Pliers"],["🪵","Marking Pencil"],["🔧","Wrench"],["🧱","Level"]];
const JOBS={calls:[["Wobbly Bookshelf","Mrs. Cruz has a bookshelf that needs stronger supports.","📚"],["Loose Cabinet Door","A kitchen cabinet door is sagging and needs repair.","🚪"],["Study Desk Repair","A student's desk needs a new board and fasteners.","🪑"],["Wall Shelf Install","A customer wants shelves mounted safely.","🧱"],["Garden Bench Fix","Replace damaged parts on a wooden bench.","🪵"]],room:[["Study Room Upgrade","Plan shelves, desk panels, storage, and materials for one room.","🛏️"],["Bedroom Carpentry","Build storage and repair fixtures across a bedroom.","🚪"],["Home Workshop","Fit a small workshop with shelves, racks, and a workbench.","🧰"]],house:[["Family House Contract","Coordinate carpentry work across several rooms.","🏡"],["Small House Renovation","Manage materials and costs for a whole-house carpentry job.","🏠"]],building:[["Three-Storey Workshop","Manage repeated rooms and supplies across several floors.","🏢"],["Community Learning Center","Plan a larger building with rooms, materials, and crews.","🏫"]]};

function freshProfile(name){return {name,toolboxDone:false,toolboxIndex:0,tools:[],cash:0,jobs:0,tier:0,skillStats:{},inventory:{wood:0,screws:0,brackets:0,paint:0},currentJob:null,pendingGate:null};}
function loadProfiles(){try{return JSON.parse(localStorage.getItem(PROFILE_KEY)||"{}")}catch{return {}}}
function saveProfiles(){const p=loadProfiles();p[state.key]=state.profile;localStorage.setItem(PROFILE_KEY,JSON.stringify(p))}
function getStat(id){if(!state.profile.skillStats[id]) state.profile.skillStats[id]={attempts:0,correct:0,earned:0,possible:0,contexts:{},recent:[],mastered:false,review:false,taught:false,guidedAttempts:0,guidedCorrect:0,independentAttempts:0};return state.profile.skillStats[id];}
function accuracy(id){const st=getStat(id);return st.possible?st.earned/st.possible:0;}
function minEvidence(skill){return skill.c===1?4:skill.c===2?5:6;}
function contextCount(st){return Object.values(st.contexts).filter(Boolean).length}
function masteryReady(id){const sk=S[id],st=getStat(id),acc=accuracy(id);const recent=st.recent.slice(-4);const recentGood=recent.length>=4&&recent.filter(Boolean).length>=3;return st.taught&&st.guidedAttempts>=1&&st.independentAttempts>=4&&st.possible>=minEvidence(sk)&&contextCount(st)>=2&&acc>=.85&&recentGood;}
function updateMastery(id){const st=getStat(id);if(masteryReady(id))st.mastered=true;if(st.mastered&&st.recent.length>=5){const r=st.recent.slice(-5).filter(Boolean).length/5;st.review=r<.6;}}
function quarterMastered(q){return SKILLS.filter(s=>s.q===q).every(s=>getStat(s.id).mastered)}
function allMasteredUpTo(q){for(let i=1;i<=q;i++)if(!quarterMastered(i))return false;return true}
function masteredCount(){return SKILLS.filter(s=>getStat(s.id).mastered).length}
function totalEvidence(){return Math.round(SKILLS.reduce((a,s)=>a+getStat(s.id).possible,0))}
function currentQuarter(){for(let q=1;q<=4;q++)if(!quarterMastered(q))return q;return 4;}
function prereqsMet(id){return (PREREQ[id]||[]).every(p=>getStat(p).mastered)}
function availableSkills(){const q=currentQuarter();let a=SKILLS.filter(s=>s.q===q&&!getStat(s.id).mastered&&prereqsMet(s.id));if(!a.length)a=SKILLS.filter(s=>s.q===q&&!getStat(s.id).mastered);return a;}
function chooseSkill(){const a=availableSkills();if(!a.length)return SKILLS.find(s=>!getStat(s.id).mastered)||SKILLS[SKILLS.length-1];return a.sort((x,y)=>{const sx=getStat(x.id),sy=getStat(y.id);if(sx.taught!==sy.taught)return sx.taught?1:-1;if(sx.guidedAttempts!==sy.guidedAttempts)return sx.guidedAttempts-sy.guidedAttempts;const vx=sx.possible-minEvidence(x),vy=sy.possible-minEvidence(y);if(vx!==vy)return vx-vy;return accuracy(x.id)-accuracy(y.id);})[0];}
function tierUnlocked(t){if(t===0)return !state.profile.toolboxDone;if(t===1)return state.profile.toolboxDone;if(t===2)return state.profile.toolboxDone&&allMasteredUpTo(2)&&getStat("q3_facts").mastered&&getStat("q3_props").mastered;if(t===3)return quarterMastered(3)&&allMasteredUpTo(2);if(t===4)return SKILLS.every(s=>getStat(s.id).mastered);}
function activeTier(){if(tierUnlocked(4))return 4;if(tierUnlocked(3))return 3;if(tierUnlocked(2))return 2;return state.profile.toolboxDone?1:0;}

let state={key:null,profile:null,q:null,job:null,answered:false,hinted:false};
function recordEvidence(skillId,correct,context,hinted,guided=false){const st=getStat(skillId);st.attempts++;if(correct)st.correct++;if(guided){st.guidedAttempts++;if(correct)st.guidedCorrect++;saveProfiles();return;}st.independentAttempts++;const w=context==="reasoning"?1.25:context==="applied"?1.0:.8;st.possible+=w;st.earned+=correct?w*(hinted?.55:1):0;st.contexts[context]=true;st.recent.push(!!correct);if(st.recent.length>8)st.recent.shift();updateMastery(skillId);saveProfiles();if(!correct)maybeConsequenceGate(skillId);}
function option(q,correct,wrong){const arr=shuffle([String(correct),...wrong.map(String)]);q.options=arr;q.answer=String(correct);return q;}
function numeric(text,answer,hint,context="direct",visual=""){return {text,answer:String(answer),hint,context,type:"input",visual}}
function mc(text,correct,wrong,hint,context="direct",visual=""){return option({text,hint,context,type:"choice",visual},correct,wrong)}
