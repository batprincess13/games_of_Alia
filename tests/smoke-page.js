const fs=require('fs');
const vm=require('vm');
const html=fs.readFileSync('index.html','utf8');
const ids=new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m=>m[1]));
const requiredScripts=['config.js','questions.js','app.js'];
let last=-1;
for(const src of requiredScripts){
  const marker=`<script src="${src}"></script>`;
  const at=html.indexOf(marker);
  if(at<0)throw new Error(`Missing script tag: ${src}`);
  if(at<last)throw new Error(`Wrong script order at ${src}`);
  last=at;
}
const requiredIds=['startScreen','game','playerName','enterBtn','parentBtn','parentModal','parentSetup','closeParent','playerPill','tierPill','quarterPill','cashStat','jobsStat','masteredStat','evidenceStat','bizPath','skillList','toolboxIntro','jobArea','jobType','jobTitle','jobDesc','jobIcon','contextLabel','questionVisual','questionText','choices','inputAnswer','answerInput','checkBtn','feedback','hintBtn','nextBtn','jobProgress','jobMoney','completionCard','focusSkill','focusMastery','focusBar','focusEvidence','adaptiveNote','materials','curriculumBtn','curriculumModal','curriculumMap','closeCurriculum','portfolioBtn','portfolioModal','portfolioList','closePortfolio','changePlayer','gateModal','gateTitle','gateText','gatePassword','gateConfirm'];
for(const id of requiredIds)if(!ids.has(id))throw new Error(`Missing required DOM id: ${id}`);
function element(id){
  if(!ids.has(id))return null;
  return {id,value:'',textContent:'',innerHTML:'',disabled:false,style:{},dataset:{},className:'',classList:{add(){},remove(){},contains(){return false}},addEventListener(){},querySelectorAll(){return []}};
}
const sandbox={console,Math,Date,JSON,String,Number,Object,Array,Set,Map,Boolean,RegExp,document:{getElementById:element},localStorage:{getItem(){return null},setItem(){}},location:{reload(){}},setTimeout,clearTimeout};
vm.createContext(sandbox);
const source=['config.js','questions.js','app.js'].map(f=>fs.readFileSync(f,'utf8')).join('\n');
vm.runInContext(source,sandbox,{filename:'builder-quest-page-smoke.js'});
console.log(`Page smoke test passed with ${ids.size} DOM ids and ordered game scripts.`);
