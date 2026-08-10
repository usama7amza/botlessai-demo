const vertical=new URLSearchParams(location.search).get('demo')==='salon'?'salon':'clinic';
document.documentElement.dataset.vertical=vertical;

const clinicConversations={
  smartBooking:[['user','أبي تنظيف اليوم بعد ٦، وكم السعر؟'],['answer','حياك الله 👋 فهمت إنك تبي موعد تنظيف اليوم بعد الساعة ٦، وتبي تعرف السعر.'],['answer','سعر تنظيف وتلميع الأسنان يبدأ من ٢٥ د.ك، والمدة نحو ٣٠ دقيقة.'],['answer','الأوقات المتاحة بعد ٦ اليوم: ٦:٣٠ م و٨:٠٠ م. أي وقت يناسبك؟']],
  urgent:[['user','عندي ألم قوي من أمس، شنو أسوي؟'],['answer','سلامتك وما تشوف شر. الألم القوي يحتاج تقييم طبيب بأقرب وقت، خصوصًا إذا كان معه تورم أو حرارة.'],['answer','أقدر أساعدك بطلب أقرب موعد. هل يوجد تورم في الوجه أو صعوبة في البلع أو التنفس؟']],
  insurance:[['user','تقبلون التأمين؟'],['answer','يعتمد على شركة التأمين ونوع التغطية. اكتب اسم الشركة، وسأضيفه للطلب ليتحقق فريق الاستقبال.']],
  reschedule:[['user','أبي أغيّر موعدي'],['answer','أكيد. أرسل رقم الهاتف المستخدم في الحجز، وسأعرض لك الموعد وخيارات التعديل.'],['user','5000 0000'],['answer','وجدت موعد تنظيف غدًا الساعة ٦:٠٠ م. تفضل تغيير اليوم أم الوقت؟']],
  location:[['user','وين موقعكم ومتى تسكرون اليوم؟'],['answer','هذا عرض تجريبي؛ بيانات الموقع والدوام تُضبط حسب كل عيادة.'],['answer','أقدر أرسل رابط الموقع أو أساعدك في طلب موعد.']],
  services:[['user','أسناني لونها متغير وما أدري شنو الخدمة المناسبة'],['answer','قد يناسبك التبييض أو التنظيف، لكن الاختيار يعتمد على التقييم.'],['answer','أقدر أساعدك في طلب موعد، والطبيب يحدد الخيار الأنسب بعد الفحص.']],
  booking:[['user','أبي أحجز موعد'],['answer','حياك الله 👋 شنو الخدمة اللي تبي تحجز لها؟'],['user','تنظيف أسنان'],['answer','تمام. أي يوم ووقت يناسبك؟']]
};
const salonConversations={
  smartBooking:[['user','أبي منيكير وبديكير باچر بعد ٦، وكم السعر؟'],['answer','حياج الله 👋 فهمت إنج تبين منيكير وبديكير باچر بعد الساعة ٦.'],['answer','الباقة التجريبية تبدأ من ٢٠ د.ك ومدتها نحو ساعة. السعر النهائي يُضبط حسب قائمة الصالون.'],['answer','المتاح ٦:٣٠ م و٨:٠٠ م. أي وقت يناسبج؟']],
  urgent:[['user','عندي مناسبة باچر وأبي شعر ومكياج'],['answer','أبشري ✨ أقدر أبحث لج عن أقرب وقت متاح للشعر والمكياج.'],['answer','تفضلين الخدمة داخل الصالون أو بالمنزل؟']],
  insurance:[['user','عندكم خدمة منازل؟'],['answer','نعم في هذا المثال التجريبي. أرسلي المنطقة والخدمات المطلوبة حتى نحسب التوفر ورسوم الانتقال.']],
  reschedule:[['user','أبي أغيّر موعدي'],['answer','أكيد. أرسلي رقم الهاتف المستخدم بالحجز حتى أعرض لج الموعد وخيارات التعديل.'],['user','5000 0000'],['answer','لقيت موعد أظافر باچر الساعة ٦:٠٠ م. تبين تغيرين اليوم أو الوقت؟']],
  location:[['user','وين موقعكم ومتى تسكرون؟'],['answer','هذا عرض تجريبي؛ الموقع والدوام يتغيران حسب بيانات الصالون.'],['answer','أقدر أرسل لج رابط الموقع أو أساعدج بالحجز.']],
  services:[['user','شعري جاف وأبي أعرف شنو يناسبه'],['answer','أقدر أوضح لج خدمات العناية المنشورة، لكن اختيار العلاج يعتمد على تقييم خبيرة الشعر.'],['answer','تبين نحجز لج استشارة شعر أولًا؟']],
  booking:[['user','أبي أحجز موعد'],['answer','حياج الله 👋 شنو الخدمة اللي تبينها؟'],['user','صبغة وقص'],['answer','تمام. تفضلين أي يوم ووقت؟']]
};
const conversations=vertical==='salon'?salonConversations:clinicConversations;

if(vertical==='salon'){
  document.title='BotLessAI | استقبال واتساب للصالونات';
  document.querySelector('meta[name="description"]').content='موظفة استقبال ذكية لصالونات التجميل على واتساب، من الاستفسار إلى طلب الحجز.';
  const replacements=[
    ['العيادات','الصالونات'],['لعيادتك','لصالونك'],['عيادتك','صالونك'],['العيادة','الصالون'],['للعيادة','للصالون'],
    ['للمريض','للعميلة'],['للمرضى','للعميلات'],['المريض','العميلة'],['المرضى','العميلات'],['طبيب','خبيرة'],['الطبيب','الخبيرة'],['طبية','تجميلية'],
    ['تنظيف وتلميع الأسنان','صبغة وقص شعر'],['تقييم تقويم الأسنان','مناكير وبديكير'],['تبييض الأسنان','تركيب رموش'],
    ['عبدالله سالم','نورة سالم'],['أحمد خالد','ريم خالد'],['استقبال العيادة','استقبال الصالون'],
    ['شنو الخدمة المناسبة لي؟','شنو الخدمة المناسبة لشعري؟'],['عندي ألم قوي، شنو أسوي؟','عندي مناسبة باچر، شنو المتاح؟'],['تقبلون التأمين؟','عندكم خدمة منازل؟'],
    ['أبي تنظيف اليوم بعد ٦، وكم السعر؟','أبي منيكير وبديكير باچر بعد ٦'],['موظف الاستقبال','موظفة الاستقبال'],['موظف العيادة','موظفة الصالون']
  ];
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let node;
  while((node=walker.nextNode())){
    let text=node.nodeValue;
    replacements.forEach(([from,to])=>{text=text.split(from).join(to);});
    node.nodeValue=text;
  }
  const cta=document.querySelector('.cta-copy .button');
  if(cta){cta.href='https://wa.me/96567795155?text='+encodeURIComponent('مرحبًا، أرغب في تجربة BotLessAI لصالوني');cta.textContent='احجزي عرضًا تجريبيًا عبر واتساب';}
  document.querySelector('#phoneBusinessName').textContent='صالون BotLess التجريبي';
  document.querySelector('#phoneAvatar').textContent='ص';
  document.querySelector('#audienceHeading').innerHTML='تجربة سهلة للعميلة.<br>وإدارة منظمة للصالون.';
}
const output=document.querySelector('#demoConversation');
const demoButtons=[...document.querySelectorAll('[data-demo]')];
let conversationRun=0;
const wait=duration=>new Promise(resolve=>window.setTimeout(resolve,duration));
const messageTime=()=>new Intl.DateTimeFormat('ar-KW',{hour:'numeric',minute:'2-digit'}).format(new Date());

async function playConversation(messages){
  const run=++conversationRun;
  output.innerHTML='';
  demoButtons.forEach(button=>button.disabled=true);

  for(const [role,text] of messages){
    if(run!==conversationRun)return;
    if(role==='answer'){
      const typing=document.createElement('div');
      typing.className='typing';
      typing.innerHTML='<i></i><i></i><i></i><small>يكتب الآن</small>';
      output.append(typing);
      output.scrollTo({top:output.scrollHeight,behavior:'smooth'});
      await wait(Math.min(1250,650+text.length*7));
      if(run!==conversationRun)return;
      typing.remove();
    }else{
      await wait(220);
    }

    const message=document.createElement('p');
    message.className=role;
    message.innerHTML=`<span>${text}</span><time>${messageTime()}</time>`;
    output.append(message);
    output.scrollTo({top:output.scrollHeight,behavior:'smooth'});
    await wait(role==='user'?420:520);
  }
  demoButtons.forEach(button=>button.disabled=false);
}

demoButtons.forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-demo]').forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  playConversation(conversations[button.dataset.demo]);
}));

const sectionLinks=[...document.querySelectorAll('.nav nav a[href^="#"]')];
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let scrollAnimation;

function animateToSection(section){
  const start=window.scrollY;
  const nav=document.querySelector('.nav');
  const navOffset=(nav?.offsetHeight||88)+30;
  const target=Math.max(0,section.getBoundingClientRect().top+start-navOffset);
  const distance=target-start;
  const duration=Math.min(750,Math.max(400,Math.abs(distance)*.28));

  if(reducedMotion){
    window.scrollTo(0,target);
    return;
  }

  cancelAnimationFrame(scrollAnimation);
  const startedAt=performance.now();
  const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
  nav?.classList.add('is-scrolling');

  const step=now=>{
    const progress=Math.min(1,(now-startedAt)/duration);
    nav?.style.setProperty('--scroll-progress',progress.toFixed(3));
    window.scrollTo(0,start+distance*ease(progress));
    if(progress<1){
      scrollAnimation=requestAnimationFrame(step);
      return;
    }
    section.classList.remove('section-arrival');
    void section.offsetWidth;
    section.classList.add('section-arrival');
    window.setTimeout(()=>section.classList.remove('section-arrival'),850);
    nav?.classList.remove('is-scrolling');
    nav?.style.setProperty('--scroll-progress','0');
  };
  scrollAnimation=requestAnimationFrame(step);
}

sectionLinks.forEach(link=>link.addEventListener('click',event=>{
  const section=document.querySelector(link.getAttribute('href'));
  if(!section)return;
  event.preventDefault();
  animateToSection(section);
  history.replaceState(null,'',link.getAttribute('href'));
}));

['wheel','touchstart'].forEach(eventName=>window.addEventListener(eventName,()=>{
  cancelAnimationFrame(scrollAnimation);
  const nav=document.querySelector('.nav');
  nav?.classList.remove('is-scrolling');
  nav?.style.setProperty('--scroll-progress','0');
},{passive:true}));

const observedSections=sectionLinks
  .map(link=>document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
    const visible=entries
      .filter(entry=>entry.isIntersecting)
      .sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(!visible)return;
    sectionLinks.forEach(link=>{
      const active=link.getAttribute('href')===`#${visible.target.id}`;
      link.classList.toggle('active',active);
      if(active)link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  },{rootMargin:'-22% 0px -58% 0px',threshold:[0,.15,.4,.7]});
  observedSections.forEach(section=>observer.observe(section));
}

const revealGroups=[...document.querySelectorAll('main section:not(.hero)')];
const revealTargets=[];

revealGroups.forEach(section=>{
  const targets=[...section.querySelectorAll(
    '.section-head, .metric-grid article, .steps article, .benefit-grid article, .dashboard-window, .dashboard-caption, .demo-grid>div, .cta>div'
  )];
  targets.forEach((target,index)=>{
    target.dataset.reveal='';
    target.style.setProperty('--reveal-delay',`${Math.min(index,5)*90}ms`);
    revealTargets.push(target);
  });
});

if(!reducedMotion&&'IntersectionObserver' in window){
  document.body.classList.add('reveal-ready');
  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  },{rootMargin:'0px 0px -12% 0px',threshold:.12});
  revealTargets.forEach(target=>revealObserver.observe(target));
}else{
  revealTargets.forEach(target=>target.classList.add('is-visible'));
}

const phoneConversation=document.querySelector('#phoneConversation');
const phoneReplay=document.querySelector('#phoneReplay');
const phonePresence=document.querySelector('#phonePresence');
let phoneRun=0;
const phoneWait=duration=>new Promise(resolve=>window.setTimeout(resolve,duration));
const phoneScenario=vertical==='salon'?{
  opening:'السلام عليكم، عندي مناسبة الخميس وأبي شعر ومكياج. في موعد باچر بعد ٦؟',
  understood:'وعليكم السلام، حياج الله 👋 فهمت إنج تبين شعر ومكياج قبل مناسبتج، وتفضلين باچر بعد الساعة ٦.',
  available:'عندنا موعدين متاحين. اختاري الوقت اللي يناسبج.',
  choice:'يناسبني', detailsAsk:'ممتاز. أرسلي الاسم الكامل ورقم الهاتف ونوع الخدمة: بالصالون أو بالمنزل.',
  details:'نورة سالم · 5000 0000 · داخل الصالون', service:'تسريحة ومكياج', customerWord:'حياج الله.'
}:{
  opening:'السلام عليكم، عندي مناسبة الخميس وأبي تنظيف وتبييض. في موعد باچر بعد ٦؟',
  understood:'وعليكم السلام، حياك الله 👋 فهمت إنك تبي تنظيفًا وتقييمًا للتبييض قبل مناسبتك، وتفضل باچر بعد الساعة ٦.',
  available:'عندنا موعدان متاحان. اختر الوقت اللي يناسبك.',
  choice:'يناسبني', detailsAsk:'ممتاز. أرسل لي الاسم الكامل ورقم الهاتف لإتمام طلب الحجز.',
  details:'عبدالله سالم · 5000 0000', service:'تنظيف وتقييم تبييض', customerWord:'حياك الله.'
};

function phoneMessage(role,text,extraClass=''){
  const message=document.createElement('p');
  message.className=`bubble ${role} ${extraClass}`.trim();
  message.innerHTML=`${text}<time>${messageTime()}${role==='outgoing'?' ✓✓':''}</time>`;
  phoneConversation.append(message);
  phoneConversation.scrollTo({top:phoneConversation.scrollHeight,behavior:'smooth'});
}

async function phoneReply(run,text,extraClass=''){
  if(run!==phoneRun)return false;
  phonePresence.textContent='يكتب الآن...';
  const typing=document.createElement('div');
  typing.className='phone-typing';
  typing.innerHTML='<i></i><i></i><i></i>';
  phoneConversation.append(typing);
  phoneConversation.scrollTo({top:phoneConversation.scrollHeight,behavior:'smooth'});
  await phoneWait(Math.min(1050,520+text.length*8));
  if(run!==phoneRun)return false;
  typing.remove();
  phonePresence.textContent='متصل الآن';
  phoneMessage('outgoing',text,extraClass);
  await phoneWait(480);
  return run===phoneRun;
}

async function playPhoneConversation(){
  const run=++phoneRun;
  phoneConversation.innerHTML='<span class="chat-date">اليوم</span>';
  phoneReplay.disabled=true;
  phoneMessage('incoming',phoneScenario.opening);
  await phoneWait(450);
  if(!await phoneReply(run,phoneScenario.understood))return;
  if(!await phoneReply(run,phoneScenario.available))return;

  const hint=document.createElement('p');
  hint.className='phone-choice-hint';
  hint.textContent='اضغط على الوقت المناسب';
  const choices=document.createElement('div');
  choices.className='time-options';
  ['٦:٣٠ م','٨:٠٠ م'].forEach(time=>{
    const button=document.createElement('button');
    button.type='button';
    button.textContent=time;
    button.addEventListener('click',()=>completePhoneBooking(run,time,choices,hint));
    choices.append(button);
  });
  phoneConversation.append(hint,choices);
  phoneConversation.scrollTo({top:phoneConversation.scrollHeight,behavior:'smooth'});
  phoneReplay.disabled=false;
  window.setTimeout(()=>{
    if(run===phoneRun&&!choices.dataset.chosen){
      completePhoneBooking(run,'٦:٣٠ م',choices,hint);
    }
  },2200);
}

async function completePhoneBooking(run,time,choices,hint){
  if(run!==phoneRun||choices.dataset.chosen)return;
  choices.dataset.chosen=time;
  choices.querySelectorAll('button').forEach(button=>{
    button.disabled=true;
    button.classList.toggle('selected',button.textContent===time);
  });
  hint.textContent=`تم اختيار ${time}`;
  await phoneWait(350);
  phoneMessage('incoming',`${phoneScenario.choice} ${time}.`);
  await phoneWait(380);
  if(!await phoneReply(run,phoneScenario.detailsAsk))return;
  phoneMessage('incoming',phoneScenario.details);
  await phoneWait(420);
  await phoneReply(run,`✅ <strong>تم تأكيد طلب الحجز</strong><br><b>الخدمة:</b> ${phoneScenario.service}<br><b>الموعد:</b> باچر، الساعة ${time}<br>بنذكّرك قبل الموعد بـ٣ ساعات. ${phoneScenario.customerWord}`,'accent phone-confirmation');
  phoneReplay.disabled=false;
}

phoneReplay?.addEventListener('click',playPhoneConversation);
if(phoneConversation)window.setTimeout(playPhoneConversation,650);
