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
