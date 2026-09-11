function genQuestion(skillId,context){
 const direct=context==="direct";
 switch(skillId){
 case "q1_area":{
  const l=rand(2,9),w=rand(2,8),a=l*w;
  if(direct)return numeric(`A rectangular wood panel is ${l} cm long and ${w} cm wide. What is its area in cm²?`,a,"Area = length × width.","direct");
  return numeric(`You need to cover a ${l} m by ${w} m rectangular floor section with 1 m² tiles. How many square tiles are needed?`,a,"Think in rows of square units.","applied");
 }
 case "q1_lines":{
  const kinds=["parallel","perpendicular","intersecting"];
  const k=pick(kinds);
  const desc=k==="parallel"?"two shelf rails that stay the same distance apart":k==="perpendicular"?"a vertical post meeting a horizontal beam at a square corner":"two braces that cross";
  return mc(`On the blueprint you see ${desc}. Which relationship describes the lines?`,k,kinds.filter(x=>x!==k),"Picture how the lines meet or do not meet.",direct?"direct":"applied");
 }
 case "q1_numbers":{
  const n=rand(1000,9999),th=Math.floor(n/1000),h=Math.floor(n%1000/100),t=Math.floor(n%100/10),o=n%10;
  if(direct)return numeric(`The lumber order number has ${th} thousands, ${h} hundreds, ${t} tens, and ${o} ones. What number is it?`,n,"Combine the place values.","direct");
  return numeric(`A warehouse label reads ${n.toLocaleString()}. Enter the number without commas.`,n,"Read the 4-digit number carefully.","applied");
 }
 case "q1_ordinals":{
  const n=rand(21,99);
  const suffix=n%100>=11&&n%100<=13?"th":n%10===1?"st":n%10===2?"nd":n%10===3?"rd":"th";
  return mc(`Your delivery is ${n}${suffix} in the queue. Which ordinal numeral matches that position?`,`${n}${suffix}`,[`${n+1}th`,`${n-1}th`,`${n}rd`],"Ordinal numbers describe position.","applied");
 }
 case "q1_place":{
  const n=rand(1000,9999),places=[["thousands",1000],["hundreds",100],["tens",10],["ones",1]],p=pick(places),digit=Math.floor(n/p[1])%10;
  return numeric(`In job code ${n}, what digit is in the ${p[0]} place?`,digit,`Look at the ${p[0]} position.`,"direct");
 }
 case "q1_round":{
  const n=rand(1000,9999),base=pick([10,100,1000]),ans=Math.round(n/base)*base;
  return numeric(`A supplier lists ${n} screws. Round this number to the nearest ${base}.`,ans,`Check the digit just to the right of the ${base}s place.`,"applied");
 }
 case "q1_compare":{
  const a=rand(1000,9999),b=rand(1000,9999),ans=a>b?">":a<b?"<":"=";
  return mc(`Compare the two material codes: ${a} __ ${b}. Which symbol belongs in the blank?`,ans,["<",">","="].filter(x=>x!==ans),"Compare from the thousands place first.","direct");
 }
 case "q2_mass":{
  const heavy=pick([["hammer","kg"],["box of nails","g"],["tiny screw","mg"]]);
  return mc(`Which unit is most sensible for the mass of a ${heavy[0]}?`,heavy[1],["g","kg","mg"].filter(x=>x!==heavy[1]),"Choose a unit that fits the object's size.","reasoning");
 }
 case "q2_capacity":{
  const item=pick([["paint can","L"],["small glue bottle","mL"],["water jug","L"]]);
  return mc(`Which unit is most sensible for the capacity of a ${item[0]}?`,item[1],["L","mL"].filter(x=>x!==item[1]),"Large containers usually use liters; small ones use milliliters.","reasoning");
 }
 case "q2_money":{
  const p=rand(120,9800);
  return numeric(`A hardware receipt totals ${peso(p)}. Enter the peso amount as a number.`,p,"Read the peso value only.","direct");
 }
 case "q2_add":{
  const a=rand(900,4800),b=rand(500,4800); if(a+b>9999)return genQuestion(skillId,context);
  return numeric(`Two material orders cost ${peso(a)} and ${peso(b)}. What is the total?`,a+b,"Add the thousands, hundreds, tens, and ones carefully.","applied");
 }
 case "q2_addest":{
  const a=rand(1100,4700),b=rand(900,3900),ra=Math.round(a/100)*100,rb=Math.round(b/100)*100;
  return numeric(`Estimate ${a} + ${b} by rounding each addend to the nearest hundred first.`,ra+rb,"Round both numbers, then add.","reasoning");
 }
 case "q2_addprob":{
  const a=rand(500,3000),b=rand(500,3000),c=rand(100,900);
  return numeric(`Wood costs ${peso(a)}, hardware ${peso(b)}, and delivery ${peso(c)}. What is the total material cost?`,a+b+c,"Add all three costs.","applied");
 }
 case "q2_sub":{
  const a=rand(3000,9999),b=rand(500,a-100);
  return numeric(`You had ${a} screws in stock and used ${b}. How many remain?`,a-b,"Subtract the amount used from the amount you had.","applied");
 }
 case "q2_subest":{
  const a=rand(4000,9999),b=rand(500,3500),ra=Math.round(a/100)*100,rb=Math.round(b/100)*100;
  return numeric(`Estimate ${a} − ${b} by rounding both numbers to the nearest hundred.`,ra-rb,"Round first, then subtract.","reasoning");
 }
 case "q2_mixed":{
  const start=rand(40,80),a=rand(5,15),b=rand(5,15),c=rand(3,10),ans=start+a-b+c;
  return numeric(`Your shop has ${start} boards. You buy ${a}, use ${b}, then receive ${c} more. How many boards are now in stock?`,ans,"Follow the events in order.","reasoning");
 }
 case "q3_data":{
  const vals=[rand(2,8),rand(2,8),rand(2,8)],sum=vals.reduce((a,b)=>a+b,0);
  const visual=`<div class="small">Repair requests: Shelf ${vals[0]} | Door ${vals[1]} | Desk ${vals[2]}</div>`;
  return numeric(`How many repair requests were recorded altogether?`,sum,"Add the three frequencies.","applied",visual);
 }
 case "q3_graph":{
  const vals=[rand(2,9),rand(2,9),rand(2,9)],labels=["Shelves","Doors","Tables"],mx=Math.max(...vals),idx=vals.indexOf(mx);
  const visual=`<div style="margin-top:10px">${vals.map((v,i)=>`<div class="small">${labels[i]} <span style="display:inline-block;background:#7db7d7;height:14px;width:${v*18}px;border-radius:5px"></span> ${v}</div>`).join("")}</div>`;
  return mc(`Which job type has the tallest bar?`,labels[idx],labels.filter(x=>x!==labels[idx]),"Compare the bar lengths.","applied",visual);
 }
 case "q3_probability":{
  return mc(`A box contains 9 wood screws and 1 brass screw. Without looking, which screw is more likely to be picked?`,"wood screw",["brass screw","equally likely","impossible"],"More items of one kind makes that outcome more likely.","reasoning");
 }
 case "q3_facts":{
  const a=pick([6,7,8,9]),b=rand(2,10);
  return numeric(`A bracket set uses ${a} screws. You need ${b} sets. How many screws?`,a*b,`Use the ${a} times table.`,"applied");
 }
 case "q3_props":{
  const a=pick([6,7,8,9]),b=rand(2,9);
  const type=rand(1,4);
  if(type===1)return mc(`Which expression has the same product as ${a} × ${b}?`,`${b} × ${a}`,[`${a}+${b}`,`${a}×${b+1}`,`${b}-${a}`],"Changing the order of factors does not change the product.","reasoning");
  if(type===2)return numeric(`${a} × 1 = ?`,a,"Multiplying by 1 keeps the number the same.","direct");
  if(type===3)return numeric(`${a} × 0 = ?`,0,"Any number times zero is zero.","direct");
  return numeric(`Use distribution: ${a} × (${b}+2). What is the product?`,a*(b+2),`You may solve ${a}×${b} + ${a}×2.`,"reasoning");
 }
 case "q3_mult":{
  const a=rand(21,399),b=rand(2,9),ans=a*b;if(ans>10000)return genQuestion(skillId,context);
  return numeric(`A room order needs ${b} bundles with ${a} fasteners in each bundle. How many fasteners?`,ans,"Multiply the multi-digit number by the 1-digit number.","applied");
 }
 case "q3_estprod":{
  const a=rand(21,189),b=rand(11,49),ra=Math.round(a/10)*10,rb=Math.round(b/10)*10;
  return numeric(`Estimate ${a} × ${b} by rounding both factors to the nearest 10 first.`,ra*rb,`Round to ${ra} and ${rb}, then multiply.`,"reasoning");
 }
 case "q3_multprob":{
  const price=pick([12,15,18,25,30]),qty=pick([6,7,8,9]),fee=rand(20,60),ans=price*qty+fee;
  return numeric(`You buy ${qty} brackets at ${peso(price)} each and pay a ${peso(fee)} delivery fee. What is the total cost?`,ans,"Multiply first, then add the fee.","reasoning");
 }
 case "q3_patterns":{
  const start=rand(1,5),inc=rand(2,4),seq=[start,start,start+inc,start+inc,start+inc*2],ans=start+inc*2;
  return numeric(`A trim pattern grows in groups: ${seq.slice(0,5).join(", ")}, __. What number comes next?`,ans,"Look for the repeating group and the amount it increases.","reasoning");
 }
 case "q4_divconcept":{
  const d=pick([6,7,8,9]),q=rand(2,10),n=d*q;
  return numeric(`${n} screws are shared equally into ${d} trays. How many screws per tray?`,q,`Think: ${d} × ? = ${n}.`,"applied");
 }
 case "q4_div":{
  const d=rand(2,9),q=rand(12,90),r=rand(0,d-1),n=d*q+r;
  return numeric(`${n} tiles are packed equally into groups of ${d}. How many complete groups can be made?`,Math.floor(n/d),"Divide and ignore any leftover when counting complete groups.","applied");
 }
 case "q4_estquot":{
  const divisor=pick([20,30,40,50]),quot=rand(3,9),n=divisor*quot+rand(-8,8),rounded=Math.round(n/10)*10,ans=Math.round(rounded/divisor);
  return numeric(`Estimate ${n} ÷ ${divisor} by rounding ${n} to the nearest 10 first.`,ans,"Round the dividend, then divide.","reasoning");
 }
 case "q4_divprob":{
  const d=pick([6,7,8,9]),q=rand(10,40),n=d*q;
  return numeric(`A ${peso(n)} material bill is shared equally across ${d} identical rooms. How much material cost belongs to each room?`,q,"Divide the total cost by the number of rooms.","applied");
 }
 case "q4_fracrep":{
  const den=pick([2,3,4,5]),whole=rand(1,2),num=whole*den+rand(0,den-1);
  return mc(`Which fraction represents ${num} equal parts when each whole has ${den} parts?`,`${num}/${den}`,[`${den}/${num}`,`${num-1}/${den}`,`${num}/${den+1}`],"The numerator counts the parts; the denominator tells parts per whole.","direct");
 }
 case "q4_fracops":{
  const den=pick([3,4,5,6,8]),a=rand(1,den-1),b=rand(1,den-a),ans=a+b;
  return mc(`Two wood sections measure ${a}/${den} m and ${b}/${den} m. Together they measure…`,`${ans}/${den}`,[`${ans}/${den*2}`,`${Math.abs(a-b)}/${den}`,`${a+b}/${den+1}`],"With the same denominator, add the numerators.","applied");
 }
 case "q4_translation":{
  return mc(`A cabinet template slides 3 squares right, then 2 squares up. Which description matches the movement?`,"right 3, up 2",["left 3, up 2","right 2, up 3","right 3, down 2"],"Track horizontal movement first, then vertical.","reasoning");
 }
 case "q4_symmetry":{
  return mc(`Which object most clearly has a vertical line of symmetry?`,"a centered rectangular door",["an L-shaped bracket","a stair-step shape","an off-center shelf"],"Imagine folding the shape down the middle.","reasoning");
 }
 }
}
