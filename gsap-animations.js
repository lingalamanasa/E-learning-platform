/**
 * STACKLY GSAP & ScrollTrigger Animation Engine
 * Delivers butter-smooth scroll-triggered entrances, 3D card tilts,
 * holographic glow tracking, audio waveforms, and interactive particle splines.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if GSAP and ScrollTrigger are loaded
  if (typeof gsap === 'undefined') {
    console.warn('GSAP is loading or not available. Using CSS fallbacks.');
    return;
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  initGsapHeroAnimations();
  initGsapSkillTreeAnimations();
  initGsapCtaBoxAnimations();
  initGsapBentoParallax();
  initGsapMagneticButtons();

  window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  });
});

/* ==========================================================================
   1. HERO ENTRANCE & FLOATING CARDS
   ========================================================================== */
function initGsapHeroAnimations() {
  const heroBadge = document.querySelector('.sqs-hero-badge');
  const heroTitle = document.querySelector('.sqs-hero-title');
  const heroSubtitle = document.querySelector('.sqs-hero-subtitle');
  const heroActions = document.querySelector('.sqs-hero-actions');
  const heroCards = document.querySelectorAll('.sqs-floating-card');

  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

  if (heroBadge) tl.from(heroBadge, { y: -20, opacity: 0, scale: 0.9 }, 0.2);
  if (heroTitle) tl.from(heroTitle, { y: 40, opacity: 0, duration: 1.2 }, 0.3);
  if (heroSubtitle) tl.from(heroSubtitle, { y: 30, opacity: 0 }, 0.5);
  if (heroActions) tl.from(heroActions, { y: 20, opacity: 0, scale: 0.95 }, 0.7);

  if (heroCards.length > 0) {
    tl.from(heroCards, {
      y: 60,
      opacity: 0,
      stagger: 0.2,
      duration: 1.4,
      ease: 'back.out(1.4)'
    }, 0.6);

    // Continuous floating breathing animation
    heroCards.forEach((card, index) => {
      gsap.to(card, {
        y: index % 2 === 0 ? '-=12' : '+=12',
        rotation: index % 2 === 0 ? 1 : -1,
        duration: 3 + index * 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.4
      });
    });
  }
}

/* ==========================================================================
   2. SECTION 6: DYNAMIC COGNITIVE SKILL TREES (GSAP STAGGER & CONNECTORS)
   ========================================================================== */
function initGsapSkillTreeAnimations() {
  const skillSection = document.querySelector('.skill-tree-container');
  if (!skillSection) return;

  const nodes = skillSection.querySelectorAll('.skill-tree-node');

  // Staggered node entrance with 3D rotation using fromTo to guarantee visibility
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.fromTo(nodes, 
        { y: 50, opacity: 0, scale: 0.94 },
        {
          scrollTrigger: {
            trigger: skillSection,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out'
        }
      );
    } else {
      gsap.to(nodes, { opacity: 1, y: 0, duration: 0.5 });
    }
  }

  // Interactive mouse cursor 3D tilt tracking on each node
  nodes.forEach(node => {
    node.addEventListener('mousemove', (e) => {
      if (typeof gsap === 'undefined') return;
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(node, {
        rotationY: x * 0.06,
        rotationX: -y * 0.06,
        transformPerspective: 900,
        ease: 'power1.out',
        duration: 0.3
      });
    });

    node.addEventListener('mouseleave', () => {
      if (typeof gsap === 'undefined') return;
      gsap.to(node, {
        rotationY: 0,
        rotationX: 0,
        ease: 'power2.out',
        duration: 0.6
      });
    });
  });
}

/* ==========================================================================
   3. CTA BOX & GRADIENT GLOW REVEALS
   ========================================================================== */
function initGsapCtaBoxAnimations() {
  const ctaBox = document.querySelector('.sqs-bottom-cta-box');
  if (!ctaBox || typeof ScrollTrigger === 'undefined') return;

  gsap.from(ctaBox, {
    scrollTrigger: {
      trigger: ctaBox,
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    scale: 0.92,
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
  });

  // Floating ambient chips inside CTA
  const floatChips = ctaBox.querySelectorAll('.sqs-cta-floating-chip');
  if (floatChips.length > 0) {
    floatChips.forEach((chip, i) => {
      gsap.to(chip, {
        y: i % 2 === 0 ? -8 : 8,
        x: i % 2 === 0 ? 5 : -5,
        duration: 2.5 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }
}

/* ==========================================================================
   4. ASYMMETRIC BENTO GRIDS & SCROLL PARALLAX
   ========================================================================== */
function initGsapBentoParallax() {
  if (typeof ScrollTrigger === 'undefined') return;

  const bentoCards = document.querySelectorAll('.bento-card-large, .value-card, .sla-tier-card');
  bentoCards.forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power2.out'
    });
  });
}

/* ==========================================================================
   5. MAGNETIC HOVER BUTTONS
   ========================================================================== */
function initGsapMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.sqs-btn-solid-white, .btn-primary, .btn-secondary');
  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      gsap.to(btn, { x: x, y: y, scale: 1.03, duration: 0.3, ease: 'power1.out' });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });
}
