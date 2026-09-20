const domains=[
 {id:'agency',title:'Learner & community agency',desc:'Knowledge, confidence, rights and opportunities to engage with AI on informed terms.',items:[
  ['access','Equitable access','Learners can access appropriate tools, connectivity, accessible formats and trusted human support.'],
  ['recognise','Recognition and understanding','Learners can recognise when AI is present and explain its purposes, limits and uncertainties.'],
  ['judgement','Critical judgement','Learners can question evidence, verify outputs and identify bias, fabrication or missing perspectives.'],
  ['choice','Informed choice and safety','Learners can make proportionate choices, protect data and decide when AI should not be used.'],
  ['voice','Voice and influence','Learners know their rights, can challenge decisions and help shape how AI is used.']]},
 {id:'systems',title:'Inclusive education & AI systems',desc:'Institutional design that makes AI accessible, understandable, safe and contestable.',items:[
  ['design','Inclusive learning design','AI literacy is embedded in accessible curriculum, assessment and learner support.'],
  ['clarity','Transparency and communication','People receive clear, consistent explanations of where, why and how AI is used.'],
  ['staff','Educator capability','Educators and support staff receive sustained professional learning, time and guidance.'],
  ['alternatives','Human support and alternatives','Meaningful human support and non-AI routes remain available without penalty.'],
  ['accountability','Participation and accountability','Diverse learners help shape policy, procurement and evaluation, with clear routes to redress.']]},
 {id:'society',title:'AI literacy in society',desc:'Policy, infrastructure and public institutions that distribute capability and influence fairly.',items:[
  ['infrastructure','Public capability infrastructure','Affordable connectivity, tools and trusted AI-literacy provision reach underserved communities.'],
  ['joined','Joined-up policy','Education, employment, inclusion, innovation and digital policy reinforce one another.'],
  ['equity','Equity and representation','Policy addresses socioeconomic, linguistic, geographic, disability, age and cultural barriers.'],
  ['rights','Rights and public safeguards','People are protected from manipulative or discriminatory AI and can obtain explanation and redress.'],
  ['evidence','Evidence and public participation','Outcomes are independently evaluated and communities participate meaningfully in AI governance.']]}
];
const stages=[
 {title:'Listen',lead:'Begin with lived experience.',bullets:['Gather experiences from learners, educators, employers and communities.','Include hesitant and non-users—not only confident adopters.','Identify where AI creates confusion, exclusion or loss of agency.']},
 {title:'Map',lead:'Make barriers and gaps visible.',bullets:['Use the Index across all three ecosystem domains.','Disaggregate evidence to identify underserved groups and intersecting barriers.','Compare institutional policy with what people actually experience.']},
 {title:'Enable',lead:'Build capability, access and support.',bullets:['Develop Access, Understand, Question, Use and Shape together.','Provide accessible formats, trusted guidance and human support.','Target support without defining people by a presumed deficit.']},
 {title:'Embed',lead:'Redesign the institution—not just the workshop.',bullets:['Integrate inclusive AI literacy into curriculum, assessment and staff development.','Apply it to procurement, communication, governance and quality assurance.','Assign ownership and protect meaningful alternatives and routes to redress.']},
 {title:'Share & shape',lead:'Turn evidence into collective influence.',bullets:['Evaluate who benefits, who remains underserved and why.','Share findings transparently and invite challenge.','Co-design improvements and use the evidence to influence wider policy.']}
];
const form=document.querySelector('#assessment-form');
domains.forEach((d,di)=>{
 const block=document.createElement('section');block.className='domain-block';
 block.innerHTML=`<div class="domain-title"><h3>${di+1}. ${d.title}</h3><p>${d.desc}</p></div>`;
 d.items.forEach(([id,title,desc],ii)=>{
  const row=document.createElement('div');row.className='indicator';
  const name=`${d.id}-${id}`;
  row.innerHTML=`<div><h4>${title}</h4><p>${desc}</p></div><fieldset class="rating" aria-label="${title}"><label title="Not assessed"><input type="radio" name="${name}" value="" checked>NA</label>${[0,1,2,3,4].map(v=>`<label title="Level ${v}"><input type="radio" name="${name}" value="${v}">${v}</label>`).join('')}</fieldset>`;
  block.appendChild(row);
 });form.appendChild(block);
});
const results=document.querySelector('#domain-results');
results.innerHTML=domains.map(d=>`<div class="domain-result"><header><h3>${d.title}</h3><strong id="score-${d.id}">—</strong></header><div class="bar"><div id="bar-${d.id}"></div></div></div>`).join('');
function levelText(v){return v<.75?'Foundational conditions are largely absent.':v<1.75?'Practice is emerging but remains isolated.':v<2.75?'Provision is developing, with consistency gaps.':v<3.5?'Inclusive practice is becoming embedded.':'Transformative practice is evident and continuously improved.'}
function update(){let all=[];domains.forEach(d=>{let vals=[];d.items.forEach(([id])=>{const el=form.querySelector(`input[name="${d.id}-${id}"]:checked`);if(el&&el.value!=='')vals.push(Number(el.value));});all.push(...vals);const avg=vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:null;document.querySelector(`#score-${d.id}`).textContent=avg===null?'Not assessed':`${avg.toFixed(1)} / 4`;document.querySelector(`#bar-${d.id}`).style.width=avg===null?'0%':`${avg/4*100}%`;});const overall=all.length?all.reduce((a,b)=>a+b,0)/all.length:null;document.querySelector('#overall-score').textContent=overall===null?'—':overall.toFixed(1);document.querySelector('#profile-message').textContent=overall===null?'Complete some indicators to reveal your developmental profile.':levelText(overall);document.querySelector('#completion-bar').style.width=`${all.length/15*100}%`;document.querySelector('#completion-text').textContent=`${all.length} of 15 indicators assessed`;}
form.addEventListener('change',update);document.querySelector('#reset').addEventListener('click',()=>{form.reset();update();});document.querySelector('#print').addEventListener('click',()=>window.print());
function showStage(i){document.querySelectorAll('.road-step').forEach((b,n)=>b.classList.toggle('active',n===i));const s=stages[i];document.querySelector('#roadmap-detail').innerHTML=`<div><p class="eyebrow">Stage ${i+1}</p><h3>${s.title}</h3><p>${s.lead}</p></div><ul>${s.bullets.map(x=>`<li>${x}</li>`).join('')}</ul>`;}
document.querySelectorAll('.road-step').forEach((b,i)=>b.addEventListener('click',()=>showStage(i)));showStage(0);update();
