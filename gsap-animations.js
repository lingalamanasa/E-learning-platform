/**
 * STACKLY GSAP & ScrollTrigger Animation Engine
 * Delivers butter-smooth scroll-triggered entrances, 3D card tilts,
 * slides-from-the-sides animations, holographic glow tracking, audio waveforms,
 * and interactive particle splines.
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

  // Mark body as GSAP active to synchronize CSS and allow silky 60-120fps hardware acceleration
  document.body.classList.add('gsap-active');

  initGsapHeroAnimations();
  initGsapBentoSideSlideAnimations();
  initGsapUniversalSideSlideAnimations();
  initGsapSkillTreeAnimations();
  initGsapCtaBoxAnimations();
  initGsapBentoParallax();
  initGsapMagneticButtons();
  initGsapGravityCardDropAnimations();

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
   2. SECTION 2: BENTO DESIGN INTELLIGENCE - GSAP SLIDES FROM THE SIDES ANIMATION
   ========================================================================== */
function initGsapBentoSideSlideAnimations() {
  if (typeof ScrollTrigger === 'undefined') return;

  const bentoSection = document.querySelector('#intelligence, .sqs-bento-section');
  if (!bentoSection) return;

  const bentoGrid = bentoSection.querySelector('.sqs-bento-grid');
  const bentoHeader = bentoSection.querySelector('.slide-up-reveal') || bentoSection.querySelector('.container > div:first-child');
  
  // Left-side cards: Kettlebell (Card A) & Custom content (Card C)
  const leftCards = bentoSection.querySelectorAll('.sqs-bento-kettlebell-card, .sqs-bento-custom-card, .bento-slide-left');
  // Right-side cards: Personalized recommendations (Card B) & Designed for quality (Card D)
  const rightCards = bentoSection.querySelectorAll('.sqs-bento-pages-card, .sqs-bento-quality-card, .bento-slide-right');

  // Set perspective on grid container for realistic 3D spatial depth
  if (bentoGrid) {
    gsap.set(bentoGrid, { perspective: 1200, transformStyle: 'preserve-3d' });
  }

  // 1. Bento Header Entrance (Fade up with smooth stagger)
  if (bentoHeader) {
    const headerChildren = bentoHeader.children;
    gsap.fromTo(headerChildren,
      { y: 35, opacity: 0 },
      {
        scrollTrigger: {
          trigger: bentoHeader,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out'
      }
    );
  }

  // Determine responsive slide distance (-140px on desktop, -70px on small screens)
  const isMobile = window.innerWidth <= 768;
  const slideDistanceX = isMobile ? 60 : 130;

  // 2. Left Cards: Dynamic GSAP Slide-In from the Left side
  if (leftCards.length > 0) {
    gsap.fromTo(leftCards,
      {
        x: -slideDistanceX,
        opacity: 0,
        rotationY: isMobile ? 0 : 8,
        scale: 0.96,
        transformOrigin: 'left center'
      },
      {
        scrollTrigger: {
          trigger: bentoGrid || bentoSection,
          start: 'top 78%',
          toggleActions: 'play none none reverse'
        },
        x: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        stagger: 0.16,
        duration: 1.2,
        ease: 'power3.out'
      }
    );
  }

  // 3. Right Cards: Dynamic GSAP Slide-In from the Right side
  if (rightCards.length > 0) {
    gsap.fromTo(rightCards,
      {
        x: slideDistanceX,
        opacity: 0,
        rotationY: isMobile ? 0 : -8,
        scale: 0.96,
        transformOrigin: 'right center'
      },
      {
        scrollTrigger: {
          trigger: bentoGrid || bentoSection,
          start: 'top 78%',
          toggleActions: 'play none none reverse'
        },
        x: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        stagger: 0.16,
        duration: 1.2,
        ease: 'power3.out'
      }
    );
  }

  // 4. Staggered micro-animations for card contents (pops in as cards dock)
  const promptCapsule = bentoSection.querySelector('.sqs-frosted-prompt-capsule');
  if (promptCapsule) {
    gsap.fromTo(promptCapsule,
      { scale: 0.85, opacity: 0, y: 15 },
      {
        scrollTrigger: {
          trigger: bentoGrid || bentoSection,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.75,
        delay: 0.35,
        ease: 'back.out(1.8)'
      }
    );
  }

  const checkboxRows = bentoSection.querySelectorAll('.sqs-checkbox-row');
  if (checkboxRows.length > 0) {
    gsap.fromTo(checkboxRows,
      { x: 25, opacity: 0 },
      {
        scrollTrigger: {
          trigger: bentoGrid || bentoSection,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.35,
        ease: 'power2.out'
      }
    );
  }

  const previewThumb = bentoSection.querySelector('.sqs-sculpt-preview-thumb');
  if (previewThumb) {
    gsap.fromTo(previewThumb,
      { y: 30, opacity: 0, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: bentoGrid || bentoSection,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.75,
        delay: 0.4,
        ease: 'power2.out'
      }
    );
  }

  const mockupFrame = bentoSection.querySelector('.sqs-solira-mockup-frame');
  if (mockupFrame) {
    gsap.fromTo(mockupFrame,
      { y: 30, opacity: 0, scale: 0.95 },
      {
        scrollTrigger: {
          trigger: bentoGrid || bentoSection,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.75,
        delay: 0.4,
        ease: 'power2.out'
      }
    );
  }

  // 5. Interactive GSAP 3D cursor tilt on bento cards
  const allBentoCards = bentoSection.querySelectorAll('.sqs-bento-card');
  allBentoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      gsap.to(card, {
        rotationY: x * 5,
        rotationX: -y * 5,
        transformPerspective: 1000,
        ease: 'power1.out',
        duration: 0.25
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        ease: 'power2.out',
        duration: 0.5
      });
    });
  });
}

/* ==========================================================================
   3. UNIVERSAL GSAP SLIDES FROM THE SIDES & DIRECTIONAL REVEALS
   ========================================================================== */
function initGsapUniversalSideSlideAnimations() {
  if (typeof ScrollTrigger === 'undefined') return;

  const isMobile = window.innerWidth <= 768;
  const slideDist = isMobile ? 50 : 90;

  // Animate elements with .slide-left-reveal (excluding bento cards handled specifically)
  const leftElements = document.querySelectorAll('.slide-left-reveal:not(.sqs-bento-card)');
  leftElements.forEach(el => {
    gsap.fromTo(el,
      { x: -slideDist, opacity: 0 },
      {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        },
        x: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'power3.out'
      }
    );
  });

  // Animate elements with .slide-right-reveal (excluding bento cards handled specifically)
  const rightElements = document.querySelectorAll('.slide-right-reveal:not(.sqs-bento-card)');
  rightElements.forEach(el => {
    gsap.fromTo(el,
      { x: slideDist, opacity: 0 },
      {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        },
        x: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'power3.out'
      }
    );
  });

  // Animate elements with .slide-up-reveal (excluding cards and bento section elements handled by dedicated gravity drop)
  const upElements = document.querySelectorAll(
    '.slide-up-reveal:not(#intelligence *):not(.sqs-bento-section *):not(.sqs-step-card):not(.value-card):not(.skill-tree-node):not(.pricing-card):not(.bento-card-large):not(.sla-tier-card):not(.blog-card):not(.channel-card):not(.blog-featured-card):not(.dynamic-course-card)'
  );
  upElements.forEach(el => {
    gsap.fromTo(el,
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        },
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out'
      }
    );
  });
}

/* ==========================================================================
   4. SECTION 6: DYNAMIC COGNITIVE SKILL TREES (GSAP 3D TILT TRACKING)
   ========================================================================== */
function initGsapSkillTreeAnimations() {
  const skillSection = document.querySelector('.skill-tree-container');
  if (!skillSection) return;

  const nodes = skillSection.querySelectorAll('.skill-tree-node');

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
   5. CTA BOX & GRADIENT GLOW REVEALS
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
   6. ASYMMETRIC BENTO GRIDS & SCROLL PARALLAX (MANAGED BY GRAVITY ENGINE)
   ========================================================================== */
function initGsapBentoParallax() {
  // Parallax and scroll drops for bento and value cards are seamlessly managed
  // by initGsapGravityCardDropAnimations() with realistic gravity bounce physics.
}

/* ==========================================================================
   7. MAGNETIC HOVER BUTTONS
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

/* ==========================================================================
   8. UNIVERSAL GRAVITY CARD DROP ANIMATION ENGINE
   Applies authentic physical gravity drop entrance animations with bounce landing
   and interactive gravity lift/re-drop across every card section in the website.
   ========================================================================== */
function initGsapGravityCardDropAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Select all card elements across the entire website
  const cardSelectors = [
    '.sqs-step-card',
    '.value-card',
    '.skill-tree-node',
    '.bento-card-large',
    '.pricing-card',
    '.blog-card',
    '.channel-card',
    '.sla-tier-card',
    '.blog-featured-card',
    '.dynamic-course-card',
    '.elearn-topic-card'
  ];

  const allCards = Array.from(document.querySelectorAll(cardSelectors.join(', ')));
  if (!allCards.length) return;

  // Group cards by their parent container / section
  const groupMap = new Map();

  allCards.forEach(card => {
    // Skip bento cards in #intelligence which have dedicated custom left/right slide animations
    if (card.closest('#intelligence') || card.closest('.sqs-bento-section')) {
      return;
    }

    // Find the most appropriate parent grid or section container
    const container = card.closest(
      '.sqs-steps-grid, .skill-tree-grid, .bento-asymmetric-grid, .values-grid, .pricing-grid, [style*="grid"], [class*="grid"]'
    ) || card.parentElement;

    if (!container) return;

    if (!groupMap.has(container)) {
      groupMap.set(container, []);
    }
    groupMap.get(container).push(card);
  });

  // Apply Gravity Drop to each card container group
  groupMap.forEach((cards, container) => {
    if (!cards || !cards.length) return;

    // Set 3D perspective on container for depth
    gsap.set(container, { perspective: 1200, transformStyle: 'preserve-3d' });

    // Initial state: freefalling from the sky
    gsap.fromTo(cards,
      {
        opacity: 0,
        y: -150, // Elevated drop position
        scale: 0.92,
        rotationX: 18, // Forward tilt as if falling under gravity
        rotationZ: (index) => (index % 2 === 0 ? -3 : 3) * Math.min(index + 1, 2.5), // slight air wobble
        transformOrigin: '50% 0%'
      },
      {
        scrollTrigger: {
          trigger: container,
          start: 'top 83%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        rotationZ: 0,
        duration: 1.18,
        ease: 'bounce.out', // Authentic physical gravitational bounce impact!
        stagger: 0.14,      // Cascading card drop sequence
        onComplete: () => {
          // Clear GSAP inline transforms so subsequent tilt and hover handlers work cleanly
          gsap.set(cards, { clearProps: 'transform,opacity' });
        }
      }
    );

    // Interactive Gravitational Hover: Lift against gravity, drop with bounce on mouseleave
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -14,
          scale: 1.025,
          duration: 0.28,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'bounce.out', // Mini physical gravity drop back into place!
          overwrite: 'auto'
        });
      });
    });
  });
}

