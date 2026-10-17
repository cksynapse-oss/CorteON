/* Global configuration: add your deployed Google Apps Script web app /exec URL. */
const FORM_ENDPOINT = '';
const LANG = 'en'; // Translation-ready: add completed translations in strings.js first.
const S = window.SYNAPSE_STRINGS[LANG];
const ROOT = document.getElementById('app');
const PAGE = document.body.dataset.page || 'home';
const TRACK = document.body.dataset.track || '';
const routes = {home:'index.html',programmes:'programmes.html',concept:'innovation-concept.html',approach:'how-we-teach.html',admissions:'admissions.html',teacher:'teacher.html',contact:'contact.html',policy:'privacy.html',thanks:'thank-you.html'};
const trackPages = {engineering:'engineering-research.html',medical:'medical-allied-health.html',general:'cuet-general-english.html',arts:'cuet-arts-commerce-nda.html',communication:'communication-business.html'};
const TK = Object.keys(S.tracks), cyc = i => TK[i % TK.length];
const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const a = (href, label, cls='') => `<a href="${escapeHTML(href)}"${cls ? ` class="${cls}"` : ''}>${escapeHTML(label)}</a>`;
const button = (href,label,cls='') => a(href,label,('button '+cls).trim());
const R = (c,i=0,x='') => `class="${c} reveal" style="--i:${i}"${x}`;
const IC = {
 engineering:'<circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
 medical:'<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/><path d="M3.2 12h6.3l.5-1 2 4.5 2-7 1.5 3.5h5.3"/>',
 general:'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
 arts:'<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2 3 7v4h18V7z"/>',
 communication:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
 phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
 chat:'<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>',
 mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.970 5.700a1.940 1.940 0 0 1-2.060 0L2 7"/>',
 pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
 clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
 check:'<path d="M20 6 9 17l-5-5"/>',arrow:'<path d="M5 12h14M12 5l7 7-7 7"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 camera:'<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>'
};
const svg = n => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${IC[n]}</svg>`;
const mark = id => `<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b7bff"/><stop offset="1" stop-color="#10244a"/></linearGradient></defs><rect width="32" height="32" rx="9" fill="url(#${id})"/><path d="M9 22l7-12 7 12z" fill="none" stroke="#f2b01e" stroke-width="1.8" stroke-linejoin="round"/><g fill="#fff"><circle cx="9" cy="22" r="2.6"/><circle cx="16" cy="10" r="2.6"/><circle cx="23" cy="22" r="2.6"/></g></svg>`;
function net(seed=7){let s=seed,l='',d='';const r=()=>(s=(s*16807)%2147483647)/2147483647;const p=Array.from({length:22},()=>({x:r()*1000,y:r()*420,r:2+r()*3.5}));
 p.forEach((u,i)=>{p.slice(i+1).forEach(v=>{if(Math.hypot(u.x-v.x,u.y-v.y)<190)l+=`<line x1="${u.x|0}" y1="${u.y|0}" x2="${v.x|0}" y2="${v.y|0}"/>`});d+=`<circle cx="${u.x|0}" cy="${u.y|0}" r="${u.r.toFixed(1)}" style="animation-delay:${(i%7)*.5}s"/>`});
 return `<svg class="net" viewBox="0 0 1000 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${l}${d}</svg>`;}
const ridge = () => `<svg class="ridge" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden="true"><path class="r1" d="M0 140L90 95 170 130 260 70 350 120 440 60 540 125 640 85 740 130 840 55 950 120 1050 80 1150 125 1250 75 1340 115 1440 90V220H0z"/><path class="r2" d="M0 170L120 125 210 155 330 105 430 150 560 100 670 150 780 115 900 160 1020 110 1130 155 1260 120 1360 150 1440 130V220H0z"/><path class="r3" d="M0 200L150 165 260 190 400 150 520 185 650 160 780 192 910 158 1040 188 1180 165 1300 190 1440 170V220H0z"/></svg>`;
const photo = (caption, kind='classroom') => `<figure class="photo-slot photo-${kind}" role="img" aria-label="${escapeHTML(caption)}">${svg(kind==='teacher'?'user':'camera')}<figcaption>${escapeHTML(caption)}</figcaption></figure>`;
const formLink = 'index.html#enquiry';
const price = s => {const [n,...r]=s.split(' ');return `<strong>${n}</strong><span>${r.join(' ')}</span>`;};
function header(){const act=PAGE==='track'?'programmes':PAGE;return `<a class="skip" href="#main">${S.skip}</a><header class="site-header"><div class="wrap header-inner"><a class="brand" href="${routes.home}">${mark('bm1')}<span>${S.brand}</span></a><button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav">${S.menu}</button><nav id="site-nav" class="site-nav" aria-label="Main navigation">${Object.entries(S.nav).map(([k,l])=>`<a href="${routes[k]}"${act===k?' aria-current="page"':''}>${escapeHTML(l)}</a>`).join('')}${button(formLink,S.apply)}</nav></div></header>`;}
function footer(){return `<footer class="site-footer"><div class="wrap footer-inner"><div><a class="brand" href="${routes.home}">${mark('bm2')}<span>${S.brand}</span></a><p>${S.footerAddress}</p><p>${S.footerNote}</p></div><div><p class="f-title">${S.footerExplore}</p><ul>${Object.entries(S.nav).map(([k,l])=>`<li>${a(routes[k],l)}</li>`).join('')}</ul></div><div><p class="f-title">${S.nav.contact}</p><ul><li>${a('tel:+918287248119',S.footerPhone)}</li><li>${a('mailto:cksynapse@mail.com',S.footerEmail)}</li><li>${a(routes.policy,S.privacy)}</li></ul></div></div></footer><a class="wa-float" href="https://wa.me/918287248119" target="_blank" rel="noopener noreferrer" aria-label="${S.wa}">${svg('chat')}<span>${S.wa}</span></a>`;}
function hero({title,accent='',intro,action='',eyebrow='',track='',back=false,big=false,icon=false}){return `<section class="hero${big?' hero-home':''}"${track?` data-t="${track}"`:''}>${net(track?11:7)}<div class="wrap hero-inner">${back?`<p class="crumb">${a(routes.programmes,'← '+S.back)}</p>`:''}${icon?`<div class="thanks-badge">${svg('check')}</div>`:''}${eyebrow?`<p class="chip-eyebrow">${escapeHTML(eyebrow)}</p>`:''}<h1>${escapeHTML(title)}${accent?` <em>${escapeHTML(accent)}</em>`:''}</h1><p class="lead">${escapeHTML(intro)}</p>${action?`<div class="hero-action">${action}</div>`:''}</div>${ridge()}</section>`;}
function steps(){return `<ol class="timeline">${S.steps.map((x,i)=>`<li ${R('tl-item',i,` data-t="${cyc(i)}"`)}>${escapeHTML(x)}</li>`).join('')}</ol>`;}
function fees(){return `<div class="fee-grid"><div ${R('fee-card fee-main')}><span class="fee-label">${S.home.feesExam}</span><div class="fee-price">${price(S.priceExam)}</div></div><div ${R('fee-card',1)}><span class="fee-label">${S.home.feesCourse}</span><div class="fee-price">${price(S.priceCourse)}</div></div></div><p class="muted fee-note">${S.home.feesNote}</p>`;}
function tracks(){return `<div class="track-grid">${TK.map((key,i)=>{const t=S.tracks[key],src=t.exams.length?t.exams:t.subjects,ex=src.slice(0,4),rest=src.length-ex.length;return `<article ${R('track-card',i,` data-t="${key}"`)}><div class="t-icon">${svg(key)}</div><h3>${a(trackPages[key],t.name)}</h3><p>${escapeHTML(t.short)}</p><div class="chips">${ex.map(x=>`<span class="chip">${escapeHTML(x)}</span>`).join('')}${rest>0?`<span class="chip">+${rest} ${S.more}</span>`:''}</div><span class="t-more">${S.explore}${svg('arrow')}</span></article>`;}).join('')}</div>`;}
function field(name,label,type='text',options=null,attrs=''){const id=`field-${name}`; const input=options?`<select id="${id}" name="${name}" required aria-describedby="error-${name}"><option value="">${S.form.choose}</option>${options.map(opt=>`<option value="${escapeHTML(opt)}">${escapeHTML(opt)}</option>`).join('')}</select>`:`<input id="${id}" name="${name}" type="${type}" required ${attrs} aria-describedby="error-${name}">`;return `<div class="form-field${name==='track'?' wide':''}"><label for="${id}">${escapeHTML(label)} <span aria-hidden="true">*</span></label>${input}<p class="field-error" id="error-${name}" aria-live="polite"></p></div>`;}
function enquiryForm(){const f=S.form;return `<form id="enquiry-form" class="enquiry-form" novalidate><div class="form-grid">${field('student',f.student,'text',null,'autocomplete="name" maxlength="100"')}${field('status',f.status,'text',f.statuses)}${field('track',f.track,'text',[...Object.values(S.tracks).map(t=>t.name),f.notSure])}${field('parent',f.parent,'text',null,'maxlength="100"')}${field('phone',f.phone,'tel',null,'inputmode="numeric" autocomplete="tel-national" maxlength="14"')}${field('location',f.location,'text',null,'maxlength="120"')}${field('call',f.call,'text',f.times)}</div><div class="honeypot" aria-hidden="true"><label for="website">${f.bot}</label><input tabindex="-1" id="website" name="website" type="text" autocomplete="off"></div><div class="form-field consent-row"><label class="checkbox-label"><input name="consent" type="checkbox" required aria-describedby="error-consent"><span>${f.consent}</span></label><p class="field-error" id="error-consent" aria-live="polite"></p></div><p class="form-status" id="form-status" role="status" aria-live="polite"></p><button class="button" type="submit">${f.send}</button><p class="form-privacy">${a(routes.policy,S.privacy)}</p></form>`;}
const ctaBand = () => `<section class="cta-band-wrap"><div class="wrap"><div ${R('cta-band')}>${net(9)}<div><h2>${S.home.formHeading}</h2><p>${S.home.formIntro}</p></div>${button(formLink,S.apply,'gold')}</div></div></section>`;
const sec = (inner,cls='') => `<section class="section ${cls}"><div class="wrap">${inner}</div></section>`;
const head = t => `<div class="sec-head"><h2>${t}</h2></div>`;
function home(){const H=S.home;return hero({big:true,eyebrow:S.eyebrow,title:H.title,accent:H.titleAccent,intro:H.intro,action:button('#enquiry',S.apply,'gold')+button(routes.programmes,S.nav.programmes,'ghost')})
 +`<section class="facts"><div class="wrap"><div class="fact-grid">${S.facts.map((f,i)=>`<div ${R('fact',i,` data-t="${['engineering','medical','general','communication'][i]}"`)}><strong>${f.v}</strong><span>${f.l}</span></div>`).join('')}</div></div></section>`
 +sec(head(H.tracksHeading)+tracks())
 +sec(head(H.approachHeading)+`<div class="approach-grid"><div>${H.teaching.map((x,i)=>`<article ${R('card num-card',i,` data-t="${cyc(i)}"`)}><span class="num">${i+1}</span><p>${escapeHTML(x)}</p></article>`).join('')}<p style="margin-top:20px">${a(routes.approach,S.nav.approach)}</p></div>${photo(S.photoClass)}</div>`,'alt')
 +sec(head(H.stepsHeading)+steps())+sec(head(H.feesHeading)+fees(),'alt')
 +`<section id="enquiry" class="section enquiry-section"><div class="wrap enquiry-grid"><aside ${R('enquiry-aside')}>${net(3)}<h2>${H.formHeading}</h2><p>${H.formIntro}</p><ul class="aside-list"><li>${svg('phone')}${a('tel:+918287248119','8287248119')}</li><li>${svg('chat')}<a href="https://wa.me/918287248119" target="_blank" rel="noopener noreferrer">${S.contact.whatsappAction}</a></li><li>${svg('clock')}<span>${S.schedule}</span></li><li>${svg('pin')}<span>${S.footerAddress}</span></li></ul></aside><div ${R('form-card',1)}>${enquiryForm()}</div></div></section>`;}
function programmes(){return hero({title:S.programmes.title,intro:S.programmes.intro,action:button(formLink,S.apply,'gold')})+sec(tracks(),'pull');}
function trackDetail(){const t=S.tracks[TRACK];if(!t)return hero({title:S.notFound.title,intro:S.notFound.intro});
 const links=t.links.map(([l,u])=>`<a class="pill-link" href="${escapeHTML(u)}" target="_blank" rel="noopener noreferrer">${escapeHTML(l)} ↗</a>`).join('');
 return hero({track:TRACK,back:true,title:t.name,intro:t.short})+`<section class="section pull"><div class="wrap detail-grid" data-t="${TRACK}"><div><div ${R('card')}><h2>${S.programmes.who}</h2><p>${t.who}</p></div>${t.exams.length?`<div ${R('card',1)}><h2>${S.programmes.exams}</h2><div class="chips chips-lg">${t.exams.map(x=>`<span class="chip">${escapeHTML(x)}</span>`).join('')}</div></div>`:''}<div ${R('card',2)}><h2>${S.programmes.subjects}</h2><ul class="checks">${t.subjects.map(x=>`<li>${svg('check')}<span>${escapeHTML(x)}</span></li>`).join('')}</ul></div>${links?`<div ${R('card',3)}><h2>${S.programmes.official}</h2>${links}</div>`:''}</div><aside class="detail-side"><div class="side-card"><h2>${S.programmes.fee}</h2><div class="fee-price">${price(TRACK==='communication'?S.priceCourse:S.priceExam)}</div><h2>${S.programmes.time}</h2><p>${S.schedule}</p><h2>${S.programmes.ask}</h2>${button(formLink,S.apply,'gold')}</div></aside></div></section>`;}
function approach(){return hero({title:S.approach.title,intro:S.approach.intro})+sec(`<div class="grid-2">${S.approach.sections.map(([h,b],i)=>`<article ${R('card num-card',i,` data-t="${cyc(i)}"`)}><span class="num">${i+1}</span><h2>${escapeHTML(h)}</h2><p>${escapeHTML(b)}</p></article>`).join('')}</div>`,'pull')+ctaBand();}
function admissions(){return hero({title:S.admissions.title,intro:S.admissions.intro,action:button(formLink,S.apply,'gold')})+sec(head(S.admissions.stepsTitle)+steps())+sec(head(S.admissions.faqTitle)+`<div class="faq-list">${S.admissions.faq.map(([q,x])=>`<details><summary>${escapeHTML(q)}</summary><p>${escapeHTML(x)}</p></details>`).join('')}</div>`,'alt')+ctaBand();}
function teacher(){return hero({title:S.teacher.title,intro:S.teacher.intro})+sec(`<div class="approach-grid"><div class="card"><p>${escapeHTML(S.teacher.bio)}</p><p>${escapeHTML(S.teacher.method)}</p></div>${photo(S.photoTeacher,'teacher')}</div>`,'pull')+ctaBand();}
function contact(){const L=(k,i,h,body)=>`<div ${R('card contact-card',i,` data-t="${cyc(i)}"`)}><div class="t-icon">${svg(k)}</div><div><h2>${h}</h2><p>${body}</p></div></div>`;const c=S.contact;
 return hero({title:c.title,intro:c.intro,action:button(formLink,S.apply,'gold')})+sec(`<div class="contact-grid">${L('pin',0,c.addressHeading,S.footerAddress)}${L('phone',1,c.phoneHeading,a('tel:+918287248119','8287248119'))}${L('chat',2,c.whatsappHeading,a('https://wa.me/918287248119',c.whatsappAction))}${L('mail',3,c.emailHeading,a('mailto:cksynapse@mail.com','cksynapse@mail.com'))}${L('clock',4,c.hoursHeading,S.schedule)}</div><div class="map-slot" role="img" aria-label="${S.map}">${svg('pin')}<span>${S.map}</span></div><p class="muted" style="margin-top:14px">${c.mapHelp}</p>`,'pull');}
function policy(){return hero({title:S.policy.title,intro:S.policy.intro})+sec(`<div class="narrow">${S.policy.sections.map(([t,d],i)=>`<div ${R('card',i)}><h2>${t}</h2><p>${d}</p></div>`).join('')}</div>`,'pull');}
function thanks(){return hero({icon:true,title:S.thanks.title,intro:S.thanks.intro,action:button(routes.home,S.thanks.home,'gold')})+sec(`<p class="notice">${S.thanks.caution}</p>`);}
const views={home,programmes,track:trackDetail,approach,admissions,teacher,contact,policy,thanks};
document.documentElement.lang=LANG;
ROOT.innerHTML=header()+`<main id="main" tabindex="-1">${(views[PAGE]||home)()}</main>`+footer();
document.documentElement.classList.add('js');
{const els=[...document.querySelectorAll('.reveal')],show=e=>e.classList.add('in');
 if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){show(e.target);io.unobserve(e.target);}}),{threshold:.1});els.forEach(e=>e.getBoundingClientRect().top<innerHeight?show(e):io.observe(e));}else els.forEach(show);
 window.addEventListener('beforeprint',()=>els.forEach(show));}
if(location.hash)document.querySelector(location.hash)?.scrollIntoView();
const menu=document.querySelector('.menu-button'),nav=document.querySelector('.site-nav');
menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!expanded));menu.textContent=expanded?S.menu:S.closeMenu;nav.classList.toggle('open',!expanded);});
function setupForm(){const form=document.querySelector('#enquiry-form');if(!form)return;
 const names=['student','status','track','parent','phone','location','call'];const status=document.querySelector('#form-status');
 const setError=(name,msg)=>{const el=form.elements.namedItem(name);document.querySelector(`#error-${name}`).textContent=msg;if(msg)el.setAttribute('aria-invalid','true');else el.removeAttribute('aria-invalid');};
 function data(){return Object.fromEntries(names.map(k=>[k,form.elements.namedItem(k).value.trim()]));}
 function validate(){let good=true;for(const k of names){const v=form.elements.namedItem(k).value.trim();let error=!v?S.form.required:'';if(k==='phone'&&v&&!/^[6-9]\d{9}$/.test(v.replace(/[\s-]/g,'')))error=S.form.validPhone;setError(k,error);if(error)good=false;}const checked=form.elements.namedItem('consent').checked;setError('consent',checked?'':S.form.consentError);return good&&checked;}
 function whatsApp(payload){const labels={student:S.form.student,status:S.form.status,track:S.form.track,parent:S.form.parent,phone:S.form.phone,location:S.form.location,call:S.form.call};const msg=`Synapse admission enquiry\n\n${Object.entries(labels).map(([k,label])=>`${label}: ${payload[k]}`).join('\n')}\n${S.form.consent}: Yes`;const link='https://wa.me/918287248119?text='+encodeURIComponent(msg);window.location.href=link;}
 form.addEventListener('input',e=>{const k=e.target.name;if([...names,'consent'].includes(k)&&e.target.getAttribute('aria-invalid')==='true')setError(k,'');});
 form.addEventListener('submit',async e=>{e.preventDefault();if(form.elements.namedItem('website').value)return;if(!validate()){form.querySelector('[aria-invalid="true"]')?.focus();return;}
 const payload={...data(),phone:data().phone.replace(/[\s-]/g,''),consent:true};const submit=form.querySelector('button[type="submit"]');submit.disabled=true;submit.textContent=S.form.sending;status.textContent='';
 try{if(!FORM_ENDPOINT.trim())throw new Error('No endpoint configured');const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),12000);
 try{
 // Apps Script cross-origin responses are commonly opaque. For script.google.com
 // we use no-cors with a simple text/plain JSON POST; this only confirms dispatch,
 // NOT that the sheet actually stored the entry. See README.
 const isGoogle=/^https:\/\/script\.google\.com\/macros\/s\//.test(FORM_ENDPOINT);
 const result=await fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload),mode:isGoogle?'no-cors':'cors',signal:controller.signal});
 if(!isGoogle&&!result.ok)throw new Error('Submission rejected');
 window.location.assign('thank-you.html');
 }finally{clearTimeout(timer);}
 }catch(err){status.textContent=S.form.failed;setTimeout(()=>whatsApp(payload),250);}
 finally{submit.disabled=false;submit.textContent=S.form.send;}
 });
}
setupForm();
