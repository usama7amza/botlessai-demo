const conversations={
  services:[['user','شنو الخدمات المتوفرة؟'],['answer','نوفر زراعة الأسنان، وتجميل الأسنان، وعلاج العصب، والتبييض، والتنظيف والتلميع، والأشعة، والتقويم، والخلع. أي خدمة حاب تستفسر عنها؟']],
  ortho:[['user','شنو أنواع التقويم؟'],['answer','خدمة تقويم الأسنان متوفرة، والطبيب يحدد النوع الأنسب بعد تقييم الحالة. تحب أساعدك في طلب موعد للتقييم؟']],
  hours:[['user','متى دوام العيادة؟'],['answer','من السبت إلى الأربعاء من ١٠:٠٠ ص إلى ٩:٠٠ م، والخميس من ١٠:٠٠ ص إلى ٦:٠٠ م، والجمعة مغلق.']],
  booking:[['user','أبي أحجز موعد'],['answer','حياك الله 👋 ممكن أعرف اسمك الكامل؟'],['user','عبدالله سالم'],['answer','شكرًا عبدالله. ممكن رقم هاتفك؟'],['user','96550000000'],['answer','اختر الخدمة المطلوبة: تنظيف، تبييض، تقويم، زراعة، علاج عصب، أشعة أو خلع.']]
};
const output=document.querySelector('#demoConversation');
document.querySelectorAll('[data-demo]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-demo]').forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  const messages=conversations[button.dataset.demo];
  output.innerHTML=messages.map(([role,text])=>`<p class="${role}">${text}</p>`).join('');
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
