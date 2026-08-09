const conversations={
  smartBooking:[['user','أبي تنظيف اليوم بعد ٦، وكم السعر؟'],['answer','حياك الله 👋 فهمت إنك تبي موعد تنظيف اليوم بعد الساعة ٦، وتبي تعرف السعر.'],['answer','سعر تنظيف وتلميع الأسنان يبدأ من ٢٥ د.ك، والمدة نحو ٣٠ دقيقة.'],['answer','الأوقات المتاحة بعد ٦ اليوم: ٦:٣٠ م و٨:٠٠ م. أي وقت يناسبك؟']],
  urgent:[['user','عندي ألم قوي من أمس، شنو أسوي؟'],['answer','سلامتك وما تشوف شر. الألم القوي يحتاج تقييم طبيب بأقرب وقت، خصوصًا إذا كان معه تورم أو حرارة.'],['answer','أقدر أساعدك بطلب أقرب موعد طارئ. هل يوجد تورم في الوجه أو صعوبة في البلع أو التنفس؟']],
  insurance:[['user','تقبلون التأمين؟'],['answer','يعتمد ذلك على شركة التأمين ونوع التغطية. اكتب لي اسم شركة التأمين، وسأضيفه إلى الطلب ليتحقق فريق الاستقبال من التغطية قبل الموعد.']],
  reschedule:[['user','أبي أغيّر موعدي'],['answer','أكيد. أرسل رقم الهاتف المستخدم في الحجز، وسأعرض لك الموعد المسجل وخيارات التعديل المتاحة.'],['user','5000 0000'],['answer','وجدت موعد تنظيف غدًا الساعة ٦:٠٠ م. هل تفضل تغيير اليوم أم الوقت؟']],
  location:[['user','وين موقعكم ومتى تسكرون اليوم؟'],['answer','موقعنا في السالمية، شارع البحرين. نغلق اليوم الساعة ٩:٠٠ م.'],['answer','تبي أرسل لك رابط الموقع على الخريطة أو أساعدك في حجز موعد قبل الإغلاق؟']],
  services:[['user','أسناني لونها متغير وما أدري شنو الخدمة المناسبة'],['answer','أفهم من كلامك إنك تبحث عن تحسين لون الأسنان. قد يناسبك التبييض أو التنظيف، لكن الاختيار يعتمد على سبب تغير اللون وحالة الأسنان.'],['answer','أقدر أساعدك في طلب موعد تقييم، والطبيب يحدد الخيار الأنسب بعد الفحص. هل التغير في سن واحد أم في جميع الأسنان؟']],
  booking:[['user','أبي أحجز موعد'],['answer','حياك الله 👋 أكيد أساعدك. ممكن أعرف اسمك الكامل؟'],['user','عبدالله سالم'],['answer','شكرًا عبدالله. شنو الخدمة اللي تبي تحجز لها؟']]
};
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
