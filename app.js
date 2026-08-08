const conversations={
  services:{question:'شنو الخدمات المتوفرة؟',answer:'حياك الله. نقدر نعرض لك خدمات العيادة المعتمدة ونساعدك في طلب الموعد المناسب. أي خدمة حاب تستفسر عنها؟'},
  ortho:{question:'شنو أنواع التقويم؟',answer:'خدمة تقويم الأسنان متوفرة. النوع الأنسب يتحدد بعد تقييم الطبيب للحالة. تبي نساعدك في طلب موعد تقييم؟'},
  hours:{question:'متى دوام العيادة؟',answer:'من السبت إلى الأربعاء من ٩ صباحًا إلى ١١ مساءً، والخميس من ١١ صباحًا إلى ٦ مساءً، والجمعة مغلق.'},
  booking:{question:'أبي أحجز موعد',answer:'حياك الله. ممكن أعرف اسمك الكامل، رقم هاتفك، الخدمة المطلوبة، واليوم والوقت المناسب لك؟'}
};
const output=document.querySelector('#demoConversation');
document.querySelectorAll('[data-demo]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-demo]').forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  const item=conversations[button.dataset.demo];
  output.innerHTML=`<p class="user">${item.question}</p><p class="answer">${item.answer}</p>`;
}));
