/* HAMBURGER */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if(hamburger && mobileMenu){
  hamburger.addEventListener('click',()=>{
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open')?'hidden':'';
  });
  document.querySelectorAll('.mobile-link').forEach(link=>{
    link.addEventListener('click',()=>{
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow='';
    });
  });
}

/* VIDEO CROSSFADE */
(function(){
  const videos=['assets/video/hero1.mp4','assets/video/hero2.mp4','assets/video/hero3.mp4','assets/video/hero4.mp4','assets/video/hero6.mp4'];
  const vidA=document.getElementById('vid-a');
  const vidB=document.getElementById('vid-b');
  let current=0,active=vidA,standby=vidB;
  const FADE=1500;
  function loadAndPlay(el,src,onReady){
    el.src=src;el.load();
    el.oncanplay=()=>{el.oncanplay=null;onReady()};
    setTimeout(()=>{if(el.paused){el.play().catch(()=>{});onReady()}},2000);
  }
  function next(){
    current=(current+1)%videos.length;
    loadAndPlay(standby,videos[current],()=>{
      standby.play().catch(()=>{});
      standby.classList.add('active');
      active.classList.remove('active');
      const tmp=active;active=standby;standby=tmp;
    });
  }
  loadAndPlay(active,videos[0],()=>{active.play().catch(()=>{});active.classList.add('active')});
  function watchEnd(){
    if(!active.duration||active.duration===Infinity){setTimeout(watchEnd,500);return}
    const timeLeft=(active.duration-active.currentTime)*1000;
    const triggerIn=Math.max(timeLeft-FADE,100);
    setTimeout(()=>{next();setTimeout(watchEnd,500)},triggerIn);
  }
  setTimeout(watchEnd,1000);
})();

/* TICKER */
const brands = [
  {name:'9010 | NovantaDieci', logo:'assets/img/brand-9010.png', url:'https://9010.it/it'},
  {name:'Les Jardins', logo:'assets/img/brand-les-jardins.png', url:'https://lesjardinsliving.com/'},
  {name:'TCI Led', logo:'assets/img/brand-tci-led.png', url:'https://www.tci.it/'},
  {name:'FORALL', logo:'assets/img/brand-forall.png', url:'https://for-all.it/'},
  {name:'Olè', logo:'assets/img/brand-ole.svg', url:'https://www.ole-lighting.com/en'},
  {name:'Lombardo', logo:'assets/img/brand-lombardo.png', url:'https://www.lombardo.it/it'},
  {name:'ACB', logo:'assets/img/brand-acb.png', url:'https://acb.lighting/'},
  {name:'Cini & Nils', logo:'assets/img/brand-cini-nils.png', url:'https://www.cinienils.com/it'},
  {name:'GMR Enlights', logo:'assets/img/brand-gmr-enlights.png', url:'https://www.gmrenlights.com/'},
  {name:'Tec-Mar', logo:'assets/img/brand-tec-mar.png', url:'https://www.tec-mar.it/'},
  {name:'Daylight Italia', logo:'assets/img/brand-daylight-italia.png', url:'https://daylightitalia.com/'},
  {name:'Inverlight', logo:'assets/img/brand-inverlight.png', url:'https://www.inverlight.com/'},
  {name:'Ilmas', logo:'assets/img/brand-ilmas.png', url:'https://www.ilmas.com/'},
  {name:'Cangini & Tucci', logo:'assets/img/brand-cangini-tucci.png', url:'https://www.canginietucci.com/'},
  {name:'ATS Elettronica', logo:'assets/img/brand-ats-elettronica.png', url:'https://www.atselettronica.it/'},
  {name:'Catellani & Smith', logo:'assets/img/brand-catellani-smith.png', url:'https://www.catellanismith.com/'},
  {name:'Arkoslight', logo:'assets/img/brand-arkoslight.png', url:'https://www.arkoslight.com/it/'},
  {name:'Zambelis', logo:'assets/img/brand-zambelis.png', url:'https://www.zambelis.gr/'}
];

const track=document.getElementById('logo-ticker-track');
const allBrands=[...brands,...brands,...brands,...brands];
track.innerHTML=allBrands.map(b=>{
  const inner=b.logo
    ?`<img src="${b.logo}" alt="${b.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"/><span class="ticker-logo-text" style="display:none">${b.name}</span>`
    :`<span class="ticker-logo-text">${b.name}</span>`;
  return `<a class="ticker-logo-item" href="${b.url}" target="_blank" rel="noopener" title="${b.name}">${inner}</a>`;
}).join('');

/* HERO ANIMATION */
document.querySelectorAll('.hero-word').forEach((w,i)=>setTimeout(()=>w.classList.add('show'),400+i*120));
setTimeout(()=>{
  document.querySelector('.hero-sub').classList.add('visible');
  document.querySelector('.hero-actions').classList.add('visible');
},1100);

/* MOOD TEXT REVEAL */
(function(){
  const el = document.getElementById('mood-text-el');
  if(!el) return;
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  },{threshold:0.4});
  obs.observe(el);
})();

/* SERVICES */
(function(){
  const rows=document.querySelectorAll('.service-row[data-service]');
  const bgImgs=document.querySelectorAll('.services-bg-img');
  const giantNum=document.getElementById('services-giant-num');
  const nums=['01','02','03','04','05','06'];
  if(!rows.length)return;
  function activate(idx){
    rows.forEach(r=>r.classList.remove('active-service'));
    bgImgs.forEach(img=>img.classList.remove('active'));
    rows[idx].classList.add('active-service');
    if(bgImgs[idx])bgImgs[idx].classList.add('active');
    if(giantNum)giantNum.textContent=nums[idx];
  }
  activate(0);
  rows.forEach(row=>row.addEventListener('mouseenter',()=>activate(+row.dataset.service)));
  rows.forEach(row=>row.addEventListener('click',()=>activate(+row.dataset.service)));
})();

/* CONTACT SCRAMBLE */
(function(){
  const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&';
  function scramble(el,finalText,duration){
    const steps=Math.floor(duration/55);
    let step=0;
    const interval=setInterval(()=>{
      step++;
      const progress=step/steps;
      const revealed=Math.floor(progress*finalText.length);
      let display='';
      for(let i=0;i<finalText.length;i++){
        if(finalText[i]===' '){display+=' ';continue}
        display+=i<revealed?finalText[i]:chars[Math.floor(Math.random()*chars.length)];
      }
      el.textContent=display;
      if(step>=steps){clearInterval(interval);el.textContent=finalText}
    },55);
  }
  const contactObs=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      contactObs.disconnect();
      const line1=document.getElementById('scramble-1');
      if(line1)scramble(line1,'Ready to light',2800);
      setTimeout(()=>{
        const ghost=document.getElementById('reveal-word-1');
        if(ghost)ghost.classList.add('visible');
      },1400);
      setTimeout(()=>{
        const word2=document.getElementById('reveal-word-2');
        if(word2)word2.classList.add('done');
      },2400);
    });
  },{threshold:0.3});
  const cs=document.querySelector('.contact-section');
  if(cs)contactObs.observe(cs);
})();

/* CONTACT PERSONS REVEAL */
(function(){
  const cols=document.querySelectorAll('#contact-grid .contact-person');
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('revealed')});
  },{threshold:0.2});
  cols.forEach(col=>obs.observe(col));
})();

/* INTERSECTION OBSERVER */
const io=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    entry.target.classList.add('visible');
    const num=entry.target.querySelector?.('.stat-number[data-target]');
    if(num&&!num.dataset.animated){
      num.dataset.animated=1;
      const target=+num.dataset.target,suffix=num.dataset.suffix||'',dur=1200,start=performance.now();
      (function step(now){
        const p=Math.min((now-start)/dur,1),ease=1-Math.pow(1-p,3);
        num.textContent=Math.round(ease*target)+suffix;
        if(p<1)requestAnimationFrame(step);
      })(performance.now());
    }
  });
},{threshold:.15});
document.querySelectorAll('.reveal,.stat-cell,.service-row').forEach(el=>io.observe(el));
