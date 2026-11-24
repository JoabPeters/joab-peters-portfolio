const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'✕':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}));}
const yearNode=document.getElementById('year');if(yearNode)yearNode.textContent=new Date().getFullYear();

/* Functional five-stage client registration wizard */
(function(){
  const form=document.getElementById('request-form');
  const progress=document.querySelector('.registration-steps');
  if(!form||!progress)return;
  const labels=['Contact','Website','Business','Brand','Features','Growth'];
  progress.innerHTML=labels.map((label,i)=>'<span data-step="'+i+'"><b>'+(i+1)+'</b> '+label+'</span>').join('<i aria-hidden="true"></i>');
  const original=[...form.children];
  const steps=[];
  let current=0, group=null;
  original.forEach(node=>{
    if(node.classList&&node.classList.contains('form-section-title')){
      group=document.createElement('section');
      group.className='wizard-step';
      group.setAttribute('aria-label',labels[steps.length]+' details');
      steps.push(group);
      group.appendChild(node);
    }else if(group){group.appendChild(node);}
    else{form.appendChild(node);}
  });
  steps.forEach((step,i)=>{
    const nav=document.createElement('div');
    nav.className='wizard-navigation';
    nav.innerHTML=(i>0?'<button type="button" class="wizard-back">← Previous</button>':'<span></span>')+
      (i<steps.length-1?'<button type="button" class="wizard-next">Next →</button>':'<span class="wizard-final-hint">Almost there — review your details and submit.</span>');
    step.appendChild(nav);
    form.appendChild(step);
  });
  function showStep(index){
    current=Math.max(0,Math.min(index,steps.length-1));
    steps.forEach((step,i)=>{step.hidden=i!==current;});
    [...progress.querySelectorAll('span')].forEach((item,i)=>{
      item.classList.toggle('active',i===current);
      item.classList.toggle('completed',i<current);
      if(i===current)item.setAttribute('aria-current','step');else item.removeAttribute('aria-current');
    });
    const heading=steps[current].querySelector('.form-section-title h3');
    if(heading)heading.setAttribute('tabindex','-1');
    if(heading)heading.focus({preventScroll:true});
    const formTop=form.getBoundingClientRect().top+window.scrollY-90;
    window.scrollTo({top:formTop,behavior:'smooth'});
  }
  function validCurrentStep(){
    const fields=[...steps[current].querySelectorAll('input,select,textarea')].filter(el=>el.willValidate);
    for(const field of fields){if(!field.checkValidity()){field.reportValidity();field.focus();return false;}}
    return true;
  }
  form.addEventListener('click',e=>{
    if(e.target.closest('.wizard-next')){if(validCurrentStep())showStep(current+1);}
    if(e.target.closest('.wizard-back'))showStep(current-1);
  });
  showStep(0);
})(); 

const requestForm=document.getElementById('request-form');const requestNote=document.getElementById('request-note');if(requestForm){requestForm.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(requestForm);const features=d.getAll('features');const lines=['WEBSITE PROJECT REQUEST','','CONTACT DETAILS','Name: '+d.get('full_name'),'Email: '+d.get('email'),'Phone: '+d.get('phone'),'WhatsApp: '+(d.get('whatsapp')||'Not provided'),'Organisation: '+(d.get('organisation')||'Not provided'),'Location: '+(d.get('location')||'Not provided'),'','BUSINESS & SERVICE DETAILS','Business description: '+(d.get('business_description')||'Not provided'),'Services/products: '+(d.getAll('business_services').join(', ')||'Not specified'),'Service areas: '+(d.get('service_area')||'Not provided'),'Target customers: '+(d.get('target_customers')||'Not provided'),'Pricing model: '+(d.get('pricing_model')||'Not provided'),'Booking method: '+(d.get('booking_method')||'Not provided'),'Operating hours: '+(d.get('operating_hours')||'Not provided'),'Business address: '+(d.get('business_address')||'Not provided'),'WhatsApp available: '+(d.get('whatsapp_available')||'Not specified'),'Social links: '+(d.get('social_links')||'Not provided'),'FAQs/policies: '+(d.get('business_faq')||'Not provided'),'','BRANDING & CONTENT','Logo: '+(d.get('logo_status')||'Not specified'),'Photos: '+(d.get('photo_status')||'Not specified'),'Brand asset link: '+(d.get('brand_assets')||'Not provided'),'Existing brand colours: '+(d.get('existing_brand_colours')||'Not provided'),'Website content/pages: '+(d.get('content_pages')||'Not provided'),'','WEBSITE REQUIREMENTS','Type: '+d.get('website_type'),'Purpose: '+d.get('purpose'),'Pages: '+d.get('pages'),'Audience: '+(d.get('audience')||'Not provided'),'Description: '+d.get('description'),'','FEATURES & DESIGN','Features: '+(features.join(', ')||'None selected'),'Style: '+d.get('design_style'),'Main colour: '+(d.get('primary_color')||'Not selected'),'Accent colour: '+(d.get('accent_color')||'Not selected'),'Colour guidance: '+d.get('colour_guidance'),'Reference: '+(d.get('reference')||'Not provided'),'Domain: '+d.get('domain'),'Hosting: '+d.get('hosting'),'Content: '+d.get('content_readiness'),'Budget: '+d.get('budget'),'Deadline: '+d.get('deadline'),'Target date: '+(d.get('target_date')||'Not specified'),'Additional notes: '+(d.get('extra_notes')||'None'),'','PROMOTION & BUSINESS GROWTH','Promotion interest: '+(d.get('promotion_interest')||'Not specified'),'Promotion budget: '+(d.get('promotion_budget')||'Not specified'),'Promotion goal: '+(d.get('promotion_goal')||'Not specified'),'Preferred platforms: '+(d.get('promotion_platforms')||'Not provided'),'Promotion notes: '+(d.get('promotion_notes')||'None'),'Permission: '+d.get('permission')];const subject=encodeURIComponent('Website project request — '+d.get('full_name'));const body=encodeURIComponent(lines.join('\n'));if(requestNote)requestNote.textContent='Opening your email app. Please review the prepared project brief and press Send.';window.location.href='mailto:talk2joabpeters2007@gmail.com?subject='+subject+'&body='+body;});}
const revealItems=document.querySelectorAll('.service-card,.price-card');if('IntersectionObserver'in window){revealItems.forEach(x=>x.classList.add('reveal-pending'));const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.12});revealItems.forEach(x=>io.observe(x));}

/* Seasonal Christmas promotion: visible from Dec 1 through Dec 25, Lagos time */
(function(){
 const promo=document.getElementById('christmas-promo');
 if(!promo)return;
 const start=new Date('2026-12-01T00:00:00+01:00');
 const christmas=new Date('2026-12-25T00:00:00+01:00');
 const end=new Date('2026-12-26T00:00:00+01:00');
 const days=promo.querySelector('[data-count-days]');
 const hours=promo.querySelector('[data-count-hours]');
 const minutes=promo.querySelector('[data-count-minutes]');
 const seconds=promo.querySelector('[data-count-seconds]');
 const message=promo.querySelector('[data-count-message]');
 function update(){
  const now=new Date();
  if(now<start||now>=end){promo.hidden=true;return;}
  promo.hidden=false;
  if(now>=christmas){if(message)message.textContent='Merry Christmas! Thank you for supporting Joab Peters Digital.';if(promo.querySelector('.countdown-units'))promo.querySelector('.countdown-units').hidden=true;return;}
  const remaining=christmas-now;
  const d=Math.floor(remaining/86400000);
  const h=Math.floor((remaining%86400000)/3600000);
  const m=Math.floor((remaining%3600000)/60000);
  const s=Math.floor((remaining%60000)/1000);
  if(days)days.textContent=String(d).padStart(2,'0');
  if(hours)hours.textContent=String(h).padStart(2,'0');
  if(minutes)minutes.textContent=String(m).padStart(2,'0');
  if(seconds)seconds.textContent=String(s).padStart(2,'0');
  if(message)message.textContent='The Christmas offer ends December 25, 2026.';
 }
 update();
 window.setInterval(update,1000);
})();


/* Live USD/NGN estimates: NGN prices remain the authoritative service prices. */
(function(){
 const API='https://open.er-api.com/v6/latest/USD', KEY='jpDigitalUsdNgnRate', TIME='jpDigitalUsdNgnRateTime', INTERVAL=3600000;
 const fmt=n=>'$'+Math.round(n).toLocaleString('en-US');
 const getNums=t=>(t.match(/[0-9][0-9,]*/g)||[]).map(x=>Number(x.replace(/,/g,'')));
 function sourceFor(el){const prev=el.previousElementSibling;if(prev){const a=getNums(prev.textContent);if(a.length)return a;}const before=(el.parentElement.textContent||'').split(el.textContent)[0];const fallback=getNums(before);return fallback.length?fallback:[];}
 function apply(rate,stamp,label){
  document.querySelectorAll('.fx-inline').forEach(el=>{const lo=Number(el.dataset.ngnMin),hi=Number(el.dataset.ngnMax);if(lo&&hi)el.textContent='≈ '+fmt(lo/rate)+'–'+fmt(hi/rate)+' USD';});
  document.querySelectorAll('.price-usd').forEach(el=>{const nums=sourceFor(el);if(!nums.length)return;const values=nums.map(n=>fmt(n/rate));const monthly=/month/i.test((el.parentElement.textContent||'').slice(0,120));el.textContent='≈ '+values.join('–')+(monthly?' / month':'')+' USD';});
  const rateEl=document.getElementById('fx-rate-value'),timeEl=document.getElementById('fx-rate-updated');
  if(rateEl)rateEl.textContent='$1 = ₦'+rate.toLocaleString('en-US',{maximumFractionDigits:2});
  if(timeEl)timeEl.textContent='Source: '+label+' · Updated '+new Date(stamp).toLocaleString('en-US',{dateStyle:'medium',timeStyle:'short'});
 }
 async function refresh(){try{const res=await fetch(API,{cache:'no-store'});if(!res.ok)throw Error('Rate service unavailable');const data=await res.json();const rate=Number(data&&data.rates&&data.rates.NGN);if(!rate)throw Error('NGN rate missing');const stamp=Date.now();localStorage.setItem(KEY,String(rate));localStorage.setItem(TIME,String(stamp));apply(rate,stamp,'open.er-api.com');}catch(e){const rate=Number(localStorage.getItem(KEY)),stamp=Number(localStorage.getItem(TIME));if(rate)apply(rate,stamp,'cached open.er-api.com rate');else{const t=document.getElementById('fx-rate-updated');if(t)t.textContent='Live rate unavailable. Naira prices remain visible; USD estimates will appear when the service is reachable.';}}}
 const cached=Number(localStorage.getItem(KEY)),stamp=Number(localStorage.getItem(TIME));if(cached)apply(cached,stamp,'cached open.er-api.com rate');if(!cached||!stamp||Date.now()-stamp>INTERVAL)refresh();window.setInterval(refresh,INTERVAL);
})();
