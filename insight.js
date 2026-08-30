/* ============================================================
   INSIGHT — CXPinsight integration (EN + AR / RTL aware)
   • Single source of truth for the SDK keys (CONFIG below)
   • Loads the unified SDK, which auto-captures page views,
     clicks, scroll, forms and errors on its own
   • Adds the studio's own semantic events on top: language
     switches, capability + journal opens, article completion,
     contact clicks, Brand Studio changes

   Include in <head> on every page:  <script src="insight.js"></script>

   The web key is a public, client-side ingest key — it is meant to
   ship in the page source, and is scoped to this application only.
   ============================================================ */
(function(){
  'use strict';

  /* ===== SINGLE SOURCE OF TRUTH FOR THE SDK KEYS ===== */
  const CONFIG = {
    applicationId: 'e8721f2a-8f1f-4f22-a8e7-fb713157efe2',
    apiKey:        'cxp_93f5e16e42dffecca21cc04bf9f49a56dddc5f699699afbc',
    gateway:       'https://voice-gateway-service.onrender.com'
  };

  /* ===== COMMAND STUB =====
     The SDK loads async. Calls made before it arrives are buffered on
     .q and replayed by the loader, so track() is safe from line one. */
  window.CXPinsight = window.CXPinsight || function(){
    (window.CXPinsight.q = window.CXPinsight.q || []).push(arguments);
  };

  /* ===== LOADER ===== */
  (function inject(){
    const s = document.createElement('script');
    s.src = CONFIG.gateway.replace(/\/+$/,'') + '/cxpinsight.js';
    s.async = true;
    s.setAttribute('data-application-id', CONFIG.applicationId);
    s.setAttribute('data-api-key', CONFIG.apiKey);
    (document.head || document.documentElement).appendChild(s);
  })();

  /* ===== PAGE CONTEXT =====
     Every custom event carries lang + page so the bilingual site can be
     split EN vs AR, and the detail pages carry the record they render. */
  const lang = (document.documentElement.lang || '').toLowerCase().startsWith('ar') ? 'ar' : 'en';
  const file = (location.pathname.split('/').pop() || 'index.html');
  const page = file.replace(/\.ar\.html$|\.html$/, '') || 'index';
  const recordId = new URLSearchParams(location.search).get('id') || null;

  function track(name, data){
    const payload = Object.assign({ lang: lang, page: page }, data || {});
    if(recordId) payload.record_id = recordId;
    try { window.CXPinsight('track', name, payload); } catch(e){}
  }

  const ready = fn => document.readyState !== 'loading'
    ? fn()
    : document.addEventListener('DOMContentLoaded', fn);

  const text = el => (el && el.textContent || '').trim().replace(/\s+/g,' ').slice(0,120);

  ready(function(){

    /* ===== DETAIL-PAGE VIEWS =====
       The SDK's own page_view doesn't know which capability or article
       the query string resolved to, so name it explicitly. */
    if(page === 'capability' && recordId){
      track('capability_view', { capability_id: recordId, title: text(document.querySelector('h1')) });
    }
    if(page === 'article' && recordId){
      track('article_view', {
        article_id: recordId,
        title: text(document.querySelector('.art-head h1')),
        tag:   text(document.querySelector('.art-meta span'))
      });
    }

    /* ===== DELEGATED CLICKS =====
       One listener for the whole page — the bento tiles and journal list
       are rendered after load, so binding per element would miss them. */
    document.addEventListener('click', function(ev){
      const a = ev.target.closest && ev.target.closest('a');
      if(!a) return;

      /* language toggle — the clearest signal on a bilingual site */
      if(a.classList.contains('lang')){
        track('language_switch', { from: lang, to: lang === 'ar' ? 'en' : 'ar' });
        return;
      }

      const href = a.getAttribute('href') || '';

      /* contact */
      if(href.indexOf('mailto:') === 0){
        track('contact_click', {
          method: 'email',
          address: href.slice(7),
          location: a.closest('.acta') ? 'article_cta'
                  : a.closest('.dcta') ? 'capability_cta'
                  : a.closest('.cta')  ? 'footer_cta' : 'other'
        });
        return;
      }

      /* capability tile → detail */
      const tile = a.classList.contains('tile') ? a : null;
      if(tile){
        const tiles = [].slice.call(document.querySelectorAll('.tile'));
        track('capability_open', {
          capability_id: (href.split('id=')[1] || ''),
          title: text(tile.querySelector('h3')),
          position: tiles.indexOf(tile) + 1
        });
        return;
      }

      /* journal item → article */
      if(a.classList.contains('jitem')){
        const items = [].slice.call(document.querySelectorAll('.jitem'));
        track('journal_open', {
          article_id: (href.split('id=')[1] || ''),
          title: text(a.querySelector('h3')),
          position: items.indexOf(a) + 1
        });
        return;
      }

      /* previous / next — the same markup serves articles and capabilities,
         so name the event after whichever page it fired on */
      if(a.classList.contains('prev') || a.classList.contains('next')){
        track(page === 'capability' ? 'capability_nav' : 'article_nav', {
          direction: a.classList.contains('prev') ? 'previous' : 'next',
          to_id: (href.split('id=')[1] || '')
        });
        return;
      }

      /* in-page section jumps */
      if(href.charAt(0) === '#' && href.length > 1){
        track('nav_section', { section: href.slice(1), source: a.closest('.nav') ? 'nav' : 'footer' });
      }
    }, true);

    /* ===== ARTICLE COMPLETION =====
       Reaching the end of the prose is the journal's real success metric —
       distinct from the SDK's generic scroll depth, which is page-relative. */
    const prose = page === 'article' ? document.querySelector('.prose') : null;
    if(prose && 'IntersectionObserver' in window){
      const started = Date.now();
      const io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(!e.isIntersecting) return;
          io.disconnect();
          track('article_completed', {
            article_id: recordId,
            seconds: Math.round((Date.now() - started) / 1000)
          });
        });
      }, { threshold: 0, rootMargin: '0px 0px -15% 0px' });
      /* watch a marker at the very end of the prose, not the block itself —
         a tall article intersects the viewport long before it is read.
         The marker needs a real box: a zero-area element never intersects. */
      const end = document.createElement('div');
      end.setAttribute('aria-hidden','true');
      end.style.cssText = 'width:100%;height:1px;pointer-events:none';
      prose.appendChild(end);
      io.observe(end);
    }

    /* ===== BRAND STUDIO =====
       studio.js writes the theme/texture/type onto <body> as data-*, so
       watch the attributes rather than reaching into its internals.
       It restores the stored selection inside its own DOMContentLoaded
       handler; a macrotask hop lets that settle so the restore isn't
       reported as a visitor changing the theme. */
    setTimeout(function(){
      if(!('MutationObserver' in window)) return;
      const body = document.body;
      const watch = { theme:'theme', texture:'texture', type:'type' };
      let last = {
        theme:   body.dataset.theme   || '',
        texture: body.dataset.texture || '',
        type:    body.dataset.type    || ''
      };
      new MutationObserver(function(muts){
        muts.forEach(function(m){
          const key = (m.attributeName || '').replace('data-','');
          if(!(key in watch)) return;
          const value = body.dataset[key] || '';
          if(value === last[key]) return;
          last[key] = value;
          track('brand_studio_change', { control: key, value: value });
        });
      }).observe(body, { attributes:true, attributeFilter:['data-theme','data-texture','data-type'] });
    }, 0);

  });
})();
