const fs=require('fs');
const source=fs.readFileSync('config.js','utf8')+'\n'+fs.readFileSync('questions.js','utf8')+`\n
const store={};
globalThis.localStorage={getItem:k=>store[k]??null,setItem:(k,v)=>{store[k]=String(v)}};
state.key='validator';
state.profile=freshProfile('Validator');
const failures=[];
for(const skill of SKILLS){
  const keys=new Set();
  for(const target of skill.comps){
    const st=getStat(skill.id);
    st.components={};
    for(const c of skill.comps)st.components[c]={possible:c===target?0:99,earned:c===target?0:99};
    state.profile.seenQuestions[skill.id]=[];
    let sample=null;
    for(let i=0;i<120;i++){
      const q=genQuestion(skill.id,i%3===0?'reasoning':i%3===1?'applied':'direct');
      sample=q;
      keys.add(q.key);
      if(!q.text||q.answer===undefined||!q.component||q.component!==target)failures.push(skill.id+': invalid component question for '+target);
      if(String(q.text).includes('Fallback question'))failures.push(skill.id+': fallback generator used');
    }
    if(!sample)failures.push(skill.id+': no sample for '+target);
  }
  if(keys.size<200)failures.push(skill.id+': only '+keys.size+' unique encounter keys generated; minimum is 200');
}
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
console.log('Validated '+SKILLS.length+' competencies with >=200 generated encounter keys each and component coverage.');
`;
try{eval(source)}catch(err){console.error(err);process.exit(1)}
