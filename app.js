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
  const navOffset=(document.querySelector('.nav')?.offsetHeight||88)+30;
  const target=Math.max(0,section.getBoundingClientRect().top+start-navOffset);
  const distance=target-start;
  const duration=Math.min(1050,Math.max(480,Math.abs(distance)*.42));

  if(reducedMotion){
    window.scrollTo(0,target);
    return;
  }

  cancelAnimationFrame(scrollAnimation);
  const startedAt=performance.now();
  const ease=t=>1-Math.pow(1-t,4);

  const step=now=>{
    const progress=Math.min(1,(now-startedAt)/duration);
    window.scrollTo(0,start+distance*ease(progress));
    if(progress<1){
      scrollAnimation=requestAnimationFrame(step);
      return;
    }
    section.classList.remove('section-arrival');
    void section.offsetWidth;
    section.classList.add('section-arrival');
    window.setTimeout(()=>section.classList.remove('section-arrival'),600);
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
