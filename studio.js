/* ============================================================
   STUDIO — shared behaviour (EN + AR / RTL aware)
   • Brand name (single source of truth)
   • Injects: texture layer, custom cursor, Brand Studio panel
   • Theme / texture / body-type switching (persisted)
   • Scroll reveals, nav state, custom cursor motion
   ============================================================ */
(function(){
  /* ===== SINGLE SOURCE OF TRUTH FOR THE BRAND NAME (placeholder) ===== */
  window.BRAND = (document.documentElement.lang||'').toLowerCase().startsWith('ar') ? "قرار" : "Qarar";

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isAr = (document.documentElement.lang||'').toLowerCase().startsWith('ar');

  const THEMES = [
    {key:'sand',    name:'Sand & Clay',     ar:'رملي وطيني',   bg:'#ece3d6', ink:'#2a2017', accent:'#c0532e'},
    {key:'oxblood', name:'Ivory & Oxblood', ar:'عاجي وعنّابي', bg:'#f4f0e8', ink:'#1c1513', accent:'#8e2b2b'},
    {key:'saffron', name:'Saffron',         ar:'زعفران',       bg:'#f4ecd9', ink:'#2a2212', accent:'#c2891a'},
    {key:'tamr',    name:'Date',            ar:'تمر',          bg:'#eee4d6', ink:'#241a12', accent:'#97562b'},
    {key:'night',   name:'Nightfall',       ar:'ليل',          bg:'#15140f', ink:'#f1efe6', accent:'#e8a14a'},
    {key:'ember',   name:'Ember',           ar:'جمر',          bg:'#181310', ink:'#f0e9e2', accent:'#d2562f'},
  ];
  const THEME_DEFAULT = 'sand';
  const TEXTURES = isAr
    ? [['none','بدون'],['dots','نقاط'],['micro','نقاط دقيقة'],['wide','نقاط واسعة'],['diagonal','مائل'],['lattice','شبكة مائلة']]
    : [['none','None'],['dots','Dots'],['micro','Micro'],['wide','Wide dots'],['diagonal','Diagonal'],['lattice','Lattice']];
  const TYPES = isAr
    ? [['plex','IBM Plex'],['tajawal','Tajawal'],['cairo','Cairo'],['almarai','Almarai']]
    : [['inter','Inter'],['manrope','Manrope'],['space','Space Grotesk'],['jakarta','Jakarta']];
  const TYPE_KEY = isAr ? 'type_ar' : 'type';
  const TYPE_DEFAULT = isAr ? 'plex' : 'inter';
  const T = {
    panel:   isAr ? 'استوديو الهوية' : 'Brand studio',
    color:   isAr ? 'لون السمة'      : 'Color theme',
    texture: isAr ? 'الملمس'         : 'Texture',
    type:    isAr ? 'الخط'           : 'Body type',
    open:    isAr ? 'فتح استوديو الهوية' : 'Open brand studio',
    min:     isAr ? 'تصغير'          : 'Minimize',
  };

  const store = {
    get:(k,d)=>{ try{return localStorage.getItem('brand_'+k)||d}catch(e){return d} },
    set:(k,v)=>{ try{localStorage.setItem('brand_'+k,v)}catch(e){} }
  };
  const ready = fn => document.readyState!=='loading' ? fn() : document.addEventListener('DOMContentLoaded',fn);

  ready(function(){
    const body = document.body;

    document.querySelectorAll('[data-brand]').forEach(el=>el.textContent=window.BRAND);

    const tex = document.createElement('div'); tex.className='texture-layer'; body.prepend(tex);
    const cursor = document.createElement('div'); cursor.className='cursor'; body.appendChild(cursor);

    const panel = document.createElement('aside');
    panel.className='bpanel is-min';
    panel.innerHTML = `
      <button class="bpanel-tab" aria-label="${T.open}"><span class="dotmark"></span> ${T.panel}</button>
      <div class="bpanel-card">
        <div class="bpanel-head">
          <span class="title"><span class="dotmark"></span> ${T.panel}</span>
          <button class="bpanel-min" aria-label="${T.min}">–</button>
        </div>
        <div class="bpanel-body">
          <div class="bp-group"><span class="bp-label">${T.color}</span><div class="bp-swatches" data-swatches></div></div>
          <div class="bp-group"><span class="bp-label">${T.texture}</span><div class="bp-row" data-textures></div></div>
          <div class="bp-group"><span class="bp-label">${T.type}</span><div class="bp-row" data-types></div></div>
        </div>
      </div>`;
    body.appendChild(panel);

    const swEl = panel.querySelector('[data-swatches]');
    const txEl = panel.querySelector('[data-textures]');
    const tyEl = panel.querySelector('[data-types]');

    THEMES.forEach(t=>{
      const b=document.createElement('button');
      b.className='swatch'; b.title=isAr?t.ar:t.name; b.dataset.k=t.key;
      b.style.background=`linear-gradient(90deg, ${t.bg} 0 56%, ${t.accent} 56% 78%, ${t.ink} 78% 100%)`;
      b.addEventListener('click',()=>setTheme(t.key));
      swEl.appendChild(b);
    });
    TEXTURES.forEach(([k,label])=>{
      const b=document.createElement('button'); b.className='chip'; b.textContent=label; b.dataset.k=k;
      b.addEventListener('click',()=>setTexture(k)); txEl.appendChild(b);
    });
    TYPES.forEach(([k,label])=>{
      const b=document.createElement('button'); b.className='chip'; b.textContent=label; b.dataset.k=k;
      b.addEventListener('click',()=>setType(k)); tyEl.appendChild(b);
    });

    function setTheme(k){ body.dataset.theme=k; store.set('theme',k); [...swEl.children].forEach(c=>c.classList.toggle('active',c.dataset.k===k)); }
    function setTexture(k){ body.dataset.texture=k; store.set('texture',k); [...txEl.children].forEach(c=>c.classList.toggle('active',c.dataset.k===k)); }
    function setType(k){ body.dataset.type=k; store.set(TYPE_KEY,k); [...tyEl.children].forEach(c=>c.classList.toggle('active',c.dataset.k===k)); }

    panel.querySelector('.bpanel-min').addEventListener('click',()=>{ panel.classList.add('is-min'); store.set('min','1'); });
    panel.querySelector('.bpanel-tab').addEventListener('click',()=>{ panel.classList.remove('is-min'); store.set('min','0'); });

    const storedTheme = store.get('theme', THEME_DEFAULT);
    setTheme(THEMES.some(t=>t.key===storedTheme) ? storedTheme : THEME_DEFAULT);
    const storedTex = store.get('texture','none');
    setTexture(TEXTURES.some(x=>x[0]===storedTex) ? storedTex : 'none');
    const storedType = store.get(TYPE_KEY, TYPE_DEFAULT);
    setType(TYPES.some(x=>x[0]===storedType) ? storedType : TYPE_DEFAULT);
    if(store.get('min','1')==='0') panel.classList.remove('is-min');

    const nav = document.querySelector('.nav');
    if(nav){ const onScroll=()=>nav.classList.toggle('scrolled',scrollY>40); onScroll(); addEventListener('scroll',onScroll,{passive:true}); }

    const hero = document.querySelector('.hero'); if(hero) requestAnimationFrame(()=>hero.classList.add('ready'));

    if(!reduce){
      const io=new IntersectionObserver((es)=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }),{threshold:0.16,rootMargin:'0px 0px -8% 0px'});
      document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
    } else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));

    if(matchMedia('(hover:hover)').matches && !reduce){
      let x=innerWidth/2,y=innerHeight/2,cx=x,cy=y;
      addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY});
      addEventListener('mouseleave',()=>cursor.classList.add('is-hidden'));
      addEventListener('mouseenter',()=>cursor.classList.remove('is-hidden'));
      (function loop(){cx+=(x-cx)*.2;cy+=(y-cy)*.2;cursor.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`;requestAnimationFrame(loop)})();
      const bind=el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('is-hover'));el.addEventListener('mouseleave',()=>cursor.classList.remove('is-hover'))};
      document.querySelectorAll('[data-cursor],a,button').forEach(bind);
      panel.addEventListener('mouseenter',()=>cursor.classList.add('is-hidden'));
      panel.addEventListener('mouseleave',()=>cursor.classList.remove('is-hidden'));
    } else { cursor.style.display='none'; }
  });
})();
