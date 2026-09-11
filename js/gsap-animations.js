/**
 * STACKLY — Complete 20-Animation JavaScript Engine
 * Scroll Reveal · Parallax · Counter · Typewriter · Accordion
 * Sticky Progress · Image Reveal · Stagger · 3D Tilt · Wobble
 * Spring · Bounce · Float · Rotate · Smooth Transitions + GSAP suite
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── Core Init ─────────────────────────────────────────────────────────────
  initScrollProgressBar();         // 19. Sticky Scroll
  initScrollReveal();              // 11. Scroll Reveal  [data-reveal]
  initStaggerAnimations();         //  7. Staggered Animation
  initCounterAnimations();         // 12. Counter Animation
  initTypewriter();                // 15. Typewriter / Text Reveal
  initImageReveal();               // 14. Image Reveal
  initAccordions();                // 18. Accordion / Expand-Collapse
  initParallax();                  // 10. Parallax Scrolling
  initHoverLift();                 //  8. Hover Lift
  initWobbleCards();               //  5. Wobble Card
  initSmoothSectionTransitions();  // 20. Smooth Section Transition
  initCardTilt3D();                // 13. Card Tilt / 3D Tilt (CSS-only backup)

  // ── GSAP Suite ────────────────────────────────────────────────────────────
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
    document.body.classList.add('gsap-active');

    initGsapHeroAnimations();            //  1. Fade Up  (Hero)
    initGsapBentoSideSlideAnimations();  //  2. Slide In (Bento)
    initGsapUniversalSideSlideAnimations(); // 2. Slide In (Universal)
    initGsapSkillTreeAnimations();       // 13. 3D Tilt
    initGsapCtaBoxAnimations();          //  4. Scale In
    initGsapBounceParallax();            // 16. Bounce + 10. Parallax
    initGsapMagneticButtons();           //  6. Spring / Magnetic
    initGsapGravityCardDropAnimations(); //  3. Zoom In / Bounce
    initGsapRotateReveal();             // 17. Rotate Animation
    initGsapZoomReveal();               //  3. Zoom In / Out
    initGsapFloatingChips();            //  9. Floating Animation

    window.addEventListener('load', () => {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    });
  }
});

/* ==========================================================================
   11. SCROLL REVEAL — data-reveal attribute engine
   ========================================================================== */
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal], .slide-up-reveal, .slide-left-reveal, .slide-right-reveal, .zoom-reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.revealDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed', 'active');
        }, Number(delay));
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  els.forEach(el => io.observe(el));
}

/* ==========================================================================
   7. STAGGERED ANIMATION — .stagger-children parent
   ========================================================================== */
function initStaggerAnimations() {
  const parents = document.querySelectorAll('.stagger-children');
  if (!parents.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  parents.forEach(p => io.observe(p));
}

/* ==========================================================================
   12. COUNTER ANIMATION — data-counter-target
   ========================================================================== */
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-counter-target], [data-target]');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const rawTarget  = el.getAttribute('data-counter-target') || el.getAttribute('data-target') || '0';
      const cleanNum   = parseFloat(String(rawTarget).replace(/[^0-9.]/g, '')) || 0;
      const duration   = parseInt(el.getAttribute('data-counter-duration')) || 1600;
      const prefix     = el.getAttribute('data-counter-prefix') || '';
      const suffix     = el.getAttribute('data-counter-suffix') || '';
      const isFloat    = cleanNum % 1 !== 0;
      let startTime    = null;

      function tick(ts) {
        if (!startTime) startTime = ts;
        const p    = Math.min((ts - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const cur  = isFloat
          ? (cleanNum * ease).toFixed(1)
          : Math.floor(cleanNum * ease).toLocaleString();
        el.textContent = `${prefix}${cur}${suffix}`;
        el.classList.add('counter-tick');
        setTimeout(() => el.classList.remove('counter-tick'), 130);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = `${prefix}${isFloat ? cleanNum.toFixed(1) : cleanNum.toLocaleString()}${suffix}`;
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.3 });

  counters.forEach(c => io.observe(c));
}

/* ==========================================================================
   15. TYPEWRITER / TEXT REVEAL
   ========================================================================== */
function initTypewriter() {
  // Auto-type elements with data-typewriter
  document.querySelectorAll('[data-typewriter]').forEach(el => {
    const text    = el.getAttribute('data-typewriter') || el.textContent;
    const speed   = parseInt(el.getAttribute('data-type-speed')) || 55;
    el.textContent = '';
    el.classList.add('typewriter');

    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      let i = 0;
      const type = () => {
        if (i < text.length) {
          el.textContent += text[i++];
          setTimeout(type, speed);
        }
      };
      type();
      io.disconnect();
    }, { threshold: 0.5 });
    io.observe(el);
  });

  // Word clip reveal
  document.querySelectorAll('.text-reveal-word').forEach(el => {
    const inner = el.innerHTML;
    el.innerHTML = `<span>${inner}</span>`;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        el.classList.add('revealed');
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
  });

  // Char-by-char reveal
  document.querySelectorAll('.text-char-reveal:not([data-processed])').forEach(el => {
    el.setAttribute('data-processed', '1');
    const text = el.textContent;
    el.innerHTML = [...text].map(c => `<span class="char">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        el.classList.add('revealed');
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
  });
}

/* ==========================================================================
   14. IMAGE REVEAL — .img-reveal-wrap and .img-reveal-curtain
   ========================================================================== */
function initImageReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.img-reveal-wrap, .img-reveal-curtain').forEach(el => io.observe(el));
}

/* ==========================================================================
   18. ACCORDION / EXPAND-COLLAPSE
   ========================================================================== */
function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item    = btn.closest('.accordion-item');
      const body    = item?.querySelector('.accordion-body');
      const isOpen  = btn.getAttribute('aria-expanded') === 'true';

      // Close all siblings in same accordion group
      const group = item?.closest('.accordion-group');
      if (group) {
        group.querySelectorAll('.accordion-trigger').forEach(b => {
          if (b !== btn) {
            b.setAttribute('aria-expanded', 'false');
            b.closest('.accordion-item')?.querySelector('.accordion-body')?.classList.remove('open');
          }
        });
      }

      btn.setAttribute('aria-expanded', String(!isOpen));
      body?.classList.toggle('open', !isOpen);
    });
  });
}

/* ==========================================================================
   19. STICKY SCROLL — Progress bar
   ========================================================================== */
function initScrollProgressBar() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;

  const update = () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width  = `${Math.min(pct, 100)}%`;
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ==========================================================================
   10. PARALLAX SCROLLING — .parallax-layer
   ========================================================================== */
function initParallax() {
  const layers = document.querySelectorAll('.parallax-layer');
  if (!layers.length) return;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    layers.forEach(el => {
      const speed  = parseFloat(el.style.getPropertyValue('--parallax-speed') ||
                     getComputedStyle(el).getPropertyValue('--parallax-speed') || '0.3');
      const offset = scrollY * speed;
      el.style.transform = `translateY(${offset}px) translateZ(0)`;
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/* ==========================================================================
   8. HOVER LIFT — adds class programmatically to cards not already tagged
   ========================================================================== */
function initHoverLift() {
  document.querySelectorAll('.value-card:not(.hover-lift), .blog-card:not(.hover-lift), .sqs-step-card:not(.hover-lift)').forEach(el => {
    el.classList.add('hover-lift');
  });
}

/* ==========================================================================
   5. WOBBLE CARD — on click
   ========================================================================== */
function initWobbleCards() {
  document.querySelectorAll('.anim-wobble, .anim-wobble-card').forEach(el => {
    el.addEventListener('click', () => {
      el.style.animation = 'none';
      void el.offsetWidth; // reflow
      el.style.animation = '';
    });
  });
}

/* ==========================================================================
   20. SMOOTH SECTION TRANSITION — route changes & anchor clicks
   ========================================================================== */
function initSmoothSectionTransitions() {
  // Ensure page is immediately visible
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.35s ease';

  // Always reset opacity to 1 on pageshow (e.g. browser back/forward history navigation or BFCache restore)
  window.addEventListener('pageshow', () => {
    document.body.style.opacity = '1';
  });

  // Smooth link transitions
  document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto"]):not([href^="tel"]):not([target])').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('javascript') || href.startsWith('http') || href.includes('://')) return;
      // Do not fade out body when navigating to 404 so back navigation is never stuck on a black/blank screen
      if (href.includes('404')) return;
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = href; }, 280);
    });
  });
}

/* ==========================================================================
   13. CARD TILT / 3D TILT (CSS backup — GSAP handles it too)
   ========================================================================== */
function initCardTilt3D() {
  document.querySelectorAll('.tilt-interactive').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
      card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
      card.style.setProperty('--mouse-x', `${(x + 1) * 50}%`);
      card.style.setProperty('--mouse-y', `${(y + 1) * 50}%`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==========================================================================
   1. GSAP — HERO FADE UP + FLOATING CARDS
   ========================================================================== */
function initGsapHeroAnimations() {
  const heroBadge    = document.querySelector('.sqs-hero-badge');
  const heroTitle    = document.querySelector('.sqs-hero-title');
  const heroSubtitle = document.querySelector('.sqs-hero-subtitle');
  const heroActions  = document.querySelector('.sqs-hero-actions');
  const heroCards    = document.querySelectorAll('.sqs-floating-card');
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

  if (heroBadge)    tl.from(heroBadge,    { y: -20, opacity: 0, scale: 0.9 }, 0.2);
  if (heroTitle)    tl.from(heroTitle,    { y: 40, opacity: 0, duration: 1.2 }, 0.3);
  if (heroSubtitle) tl.from(heroSubtitle, { y: 30, opacity: 0 }, 0.5);
  if (heroActions)  tl.from(heroActions,  { y: 20, opacity: 0, scale: 0.95 }, 0.7);

  if (heroCards.length) {
    tl.from(heroCards, { y: 60, opacity: 0, stagger: 0.2, duration: 1.4, ease: 'back.out(1.4)' }, 0.6);
    heroCards.forEach((card, i) => {
      gsap.to(card, { y: i % 2 === 0 ? '-=12' : '+=12', rotation: i % 2 === 0 ? 1 : -1,
        duration: 3 + i * 0.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.4 });
    });
  }
}

/* ==========================================================================
   9. GSAP — FLOATING CHIPS
   ========================================================================== */
function initGsapFloatingChips() {
  document.querySelectorAll('.hero-floating-chip, .anim-floating').forEach((chip, i) => {
    gsap.to(chip, {
      y: i % 2 === 0 ? -14 : 12,
      rotation: i % 2 === 0 ? 1 : -1,
      duration: 3.5 + i * 0.6,
      repeat: -1, yoyo: true,
      ease: 'sine.inOut',
      delay: i * 0.35
    });
  });
}

/* ==========================================================================
   2. GSAP — BENTO SLIDE IN FROM SIDES
   ========================================================================== */
function initGsapBentoSideSlideAnimations() {
  if (typeof ScrollTrigger === 'undefined') return;
  const bentoSection = document.querySelector('#intelligence, .sqs-bento-section');
  if (!bentoSection) return;

  const bentoGrid  = bentoSection.querySelector('.sqs-bento-grid');
  const leftCards  = bentoSection.querySelectorAll('.sqs-bento-kettlebell-card, .sqs-bento-custom-card, .bento-slide-left');
  const rightCards = bentoSection.querySelectorAll('.sqs-bento-pages-card, .sqs-bento-quality-card, .bento-slide-right');
  const isMobile   = window.innerWidth <= 768;
  const dist       = isMobile ? 60 : 130;

  if (bentoGrid) gsap.set(bentoGrid, { perspective: 1200, transformStyle: 'preserve-3d' });

  const triggerOpts = { trigger: bentoGrid || bentoSection, start: 'top 78%', toggleActions: 'play none none reverse' };

  if (leftCards.length)
    gsap.fromTo(leftCards,
      { x: -dist, opacity: 0, rotationY: isMobile ? 0 : 8, scale: 0.96 },
      { ...{ x: 0, opacity: 1, rotationY: 0, scale: 1, stagger: 0.16, duration: 1.2, ease: 'power3.out' }, scrollTrigger: triggerOpts }
    );

  if (rightCards.length)
    gsap.fromTo(rightCards,
      { x: dist, opacity: 0, rotationY: isMobile ? 0 : -8, scale: 0.96 },
      { ...{ x: 0, opacity: 1, rotationY: 0, scale: 1, stagger: 0.16, duration: 1.2, ease: 'power3.out' }, scrollTrigger: triggerOpts }
    );

  // 3D tilt on bento cards
  bentoSection.querySelectorAll('.sqs-bento-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
      const y = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
      gsap.to(card, { rotationY: x * 5, rotationX: -y * 5, transformPerspective: 1000, ease: 'power1.out', duration: 0.25 });
    });
    card.addEventListener('mouseleave', () =>
      gsap.to(card, { rotationY: 0, rotationX: 0, ease: 'power2.out', duration: 0.5 }));
  });
}

/* ==========================================================================
   2. GSAP — UNIVERSAL SIDE SLIDE + FADE UP
   ========================================================================== */
function initGsapUniversalSideSlideAnimations() {
  if (typeof ScrollTrigger === 'undefined') return;
  const dist = window.innerWidth <= 768 ? 50 : 90;

  document.querySelectorAll('.slide-left-reveal:not(.sqs-bento-card)').forEach(el =>
    gsap.fromTo(el, { x: -dist, opacity: 0 },
      { scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        x: 0, opacity: 1, duration: 1, ease: 'power3.out' }));

  document.querySelectorAll('.slide-right-reveal:not(.sqs-bento-card)').forEach(el =>
    gsap.fromTo(el, { x: dist, opacity: 0 },
      { scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        x: 0, opacity: 1, duration: 1, ease: 'power3.out' }));

  document.querySelectorAll(
    '.slide-up-reveal:not(#intelligence *):not(.sqs-bento-section *):not(.sqs-step-card):not(.value-card):not(.skill-tree-node):not(.blog-card):not(.dynamic-course-card)'
  ).forEach(el =>
    gsap.fromTo(el, { y: 40, opacity: 0 },
      { scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }));
}

/* ==========================================================================
   17. GSAP — ROTATE ANIMATION on [data-reveal="rotate"]
   ========================================================================== */
function initGsapRotateReveal() {
  if (typeof ScrollTrigger === 'undefined') return;
  document.querySelectorAll('[data-reveal="rotate"], .anim-rotate-in').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
      rotation: -180, scale: 0.5, opacity: 0,
      duration: 0.85, ease: 'back.out(1.7)'
    });
  });
}

/* ==========================================================================
   3. GSAP — ZOOM IN / ZOOM OUT
   ========================================================================== */
function initGsapZoomReveal() {
  if (typeof ScrollTrigger === 'undefined') return;
  document.querySelectorAll('[data-reveal="zoom"], .zoom-reveal:not([data-processed])').forEach(el => {
    el.setAttribute('data-processed', '1');
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
      scale: 0.82, opacity: 0,
      duration: 0.85, ease: 'power3.out'
    });
  });
  document.querySelectorAll('[data-reveal="zoom-out"]').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
      scale: 1.2, opacity: 0, duration: 0.85, ease: 'power3.out'
    });
  });
}

/* ==========================================================================
   13. GSAP — SKILL TREE 3D TILT
   ========================================================================== */
function initGsapSkillTreeAnimations() {
  const section = document.querySelector('.skill-tree-container');
  if (!section) return;
  section.querySelectorAll('.skill-tree-node').forEach(node => {
    node.addEventListener('mousemove', e => {
      const r = node.getBoundingClientRect();
      const x = e.clientX - r.left - r.width  / 2;
      const y = e.clientY - r.top  - r.height / 2;
      gsap.to(node, { rotationY: x * 0.06, rotationX: -y * 0.06, transformPerspective: 900, ease: 'power1.out', duration: 0.3 });
    });
    node.addEventListener('mouseleave', () =>
      gsap.to(node, { rotationY: 0, rotationX: 0, ease: 'power2.out', duration: 0.6 }));
  });
}

/* ==========================================================================
   4. GSAP — SCALE IN (CTA Box)
   ========================================================================== */
function initGsapCtaBoxAnimations() {
  const ctaBox = document.querySelector('.sqs-bottom-cta-box');
  if (!ctaBox || typeof ScrollTrigger === 'undefined') return;
  gsap.from(ctaBox, {
    scrollTrigger: { trigger: ctaBox, start: 'top 85%', toggleActions: 'play none none none' },
    scale: 0.92, y: 50, opacity: 0, duration: 1.2, ease: 'power3.out'
  });
  ctaBox.querySelectorAll('.sqs-cta-floating-chip').forEach((chip, i) =>
    gsap.to(chip, { y: i % 2 === 0 ? -8 : 8, x: i % 2 === 0 ? 5 : -5,
      duration: 2.5 + i * 0.5, repeat: -1, yoyo: true, ease: 'sine.inOut' }));
}

/* ==========================================================================
   6. GSAP — SPRING / MAGNETIC BUTTONS
   ========================================================================== */
function initGsapMagneticButtons() {
  document.querySelectorAll('.sqs-btn-solid-white, .btn-primary, .btn-secondary, .footer-subscribe-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * 0.28;
      const y = (e.clientY - r.top  - r.height / 2) * 0.28;
      gsap.to(btn, { x, y, scale: 1.04, duration: 0.3, ease: 'power1.out' });
    });
    btn.addEventListener('mouseleave', () =>
      gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1,0.4)' }));
  });
}

/* ==========================================================================
   16. GSAP — BOUNCE + 10. PARALLAX (Bento sections)
   ========================================================================== */
function initGsapBounceParallax() {
  if (typeof ScrollTrigger === 'undefined') return;
  // Parallax on ambient orbs
  document.querySelectorAll('.aurora-orb, .parallax-layer').forEach((el, i) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: document.body,
        start: 'top top', end: 'bottom bottom',
        scrub: 1.5
      },
      y: (i % 2 === 0 ? -80 : 80),
      ease: 'none'
    });
  });
}

/* ==========================================================================
   3 + 16. GSAP — GRAVITY CARD DROP (Bounce + Zoom In)
   ========================================================================== */
function initGsapGravityCardDropAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const selectors = [
    '.sqs-step-card', '.value-card', '.skill-tree-node',
    '.bento-card-large', '.pricing-card', '.blog-card',
    '.channel-card', '.sla-tier-card', '.blog-featured-card',
    '.dynamic-course-card', '.elearn-topic-card'
  ];

  const allCards = Array.from(document.querySelectorAll(selectors.join(', ')));
  if (!allCards.length) return;

  const groupMap = new Map();
  allCards.forEach(card => {
    if (card.closest('#intelligence') || card.closest('.sqs-bento-section')) return;
    const container = card.closest(
      '.sqs-steps-grid, .skill-tree-grid, .bento-asymmetric-grid, .values-grid, .pricing-grid, [style*="grid"], [class*="grid"]'
    ) || card.parentElement;
    if (!container) return;
    if (!groupMap.has(container)) groupMap.set(container, []);
    groupMap.get(container).push(card);
  });

  groupMap.forEach((cards, container) => {
    if (!cards.length) return;
    gsap.set(container, { perspective: 1200, transformStyle: 'preserve-3d' });
    gsap.fromTo(cards,
      { opacity: 0, y: -150, scale: 0.92, rotationX: 18,
        rotationZ: i => (i % 2 === 0 ? -3 : 3) * Math.min(i + 1, 2.5) },
      { scrollTrigger: { trigger: container, start: 'top 83%', toggleActions: 'play none none none' },
        opacity: 1, y: 0, scale: 1, rotationX: 0, rotationZ: 0,
        duration: 1.18, ease: 'bounce.out', stagger: 0.14,
        onComplete: () => gsap.set(cards, { clearProps: 'transform,opacity' }) }
    );

    cards.forEach(card => {
      card.addEventListener('mouseenter', () =>
        gsap.to(card, { y: -14, scale: 1.025, duration: 0.28, ease: 'power2.out', overwrite: 'auto' }));
      card.addEventListener('mouseleave', () =>
        gsap.to(card, { y: 0, scale: 1, duration: 0.6, ease: 'bounce.out', overwrite: 'auto' }));
    });
  });
}
