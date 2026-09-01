/* ==========================================================================
   STACKLY - Interactive Application Controller & Dynamic Animation Engine
   3-Color Constellation Canvas, Scroll Progress, 3D Tilt Spotlight,
   Assessment Sandbox, Skill Telemetry Tracker, and Carousel Engine
   ========================================================================== */

// --- 0. SITE FLASH PRELOADER (Runs immediately on load) ---
(function() {
  const preloader = document.getElementById('sitePreloader');
  if (preloader) {
    const hidePreloader = () => {
      if (preloader.classList.contains('preloader-hidden')) return;
      preloader.classList.add('preloader-hidden');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 650);
    };

    if (document.readyState === 'complete') {
      setTimeout(hidePreloader, 450);
    } else {
      window.addEventListener('load', () => {
        setTimeout(hidePreloader, 400);
      });
      // Safety fallback so it never stays stuck on slow connections
      setTimeout(hidePreloader, 1600);
    }
  }
})();

// 1. Multi-Color Interactive Constellation Canvas with Particle Gravity
class ConstellationCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 160 };

    this.palette = [
      { r: 99, g: 102, b: 241, color: 'rgba(99, 102, 241, 0.7)' },   // Cyber Violet
      { r: 6, g: 182, b: 212, color: 'rgba(6, 182, 212, 0.75)' },   // Electric Cyan
      { r: 244, g: 63, b: 94, color: 'rgba(244, 63, 94, 0.7)' },    // Sunset Coral
      { r: 255, g: 255, b: 255, color: 'rgba(255, 255, 255, 0.6)' } // Luminous Star
    ];

    this.resize();
    this.init();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.init();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  init() {
    const count = Math.min(Math.floor(window.innerWidth / 20), 65);
    this.particles = [];
    for (let i = 0; i < count; i++) {
      const type = this.palette[Math.floor(Math.random() * this.palette.length)];
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 2.2 + 1.2,
        baseRadius: Math.random() * 2.2 + 1.2,
        type: type,
        vx: (Math.random() - 0.5) * 0.65,
        vy: (Math.random() - 0.5) * 0.65
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Interactive mouse attraction / repulsion
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          const dirX = (dx / dist) * force * 1.5;
          const dirY = (dy / dist) * force * 1.5;
          p.x -= dirX;
          p.y -= dirY;
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      // Draw particle with glow
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.type.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.type.color;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      // Connect neighbor particles with colorful gradients
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          const alpha = (1 - dist / 140) * 0.22;
          this.ctx.strokeStyle = `rgba(${p.type.r}, ${p.type.g}, ${p.type.b}, ${alpha})`;
          this.ctx.lineWidth = 0.85;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// 2. Scroll Progress Bar Controller
function initScrollProgressBar() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

// 3. Directional Scroll Reveal Observer
function initDirectionalScrollReveals() {
  const reveals = document.querySelectorAll('.slide-left-reveal, .slide-right-reveal, .slide-up-reveal, .zoom-reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01, rootMargin: '120px 0px 60px 0px' });

  reveals.forEach(el => {
    observer.observe(el);
    // Instant fallback check for elements already near viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      el.classList.add('active');
    }
  });
}

// 4. Live Metric Counter Ticker Animation with Decimal & Prefix Support
function initMetricCounters() {
  const counterEls = document.querySelectorAll('[data-counter], [data-target-count], [data-counter-target], .counter-animate');
  if (!counterEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const rawTarget = el.getAttribute('data-counter') || el.getAttribute('data-target-count') || el.getAttribute('data-counter-target');
        const target = parseFloat(rawTarget);
        if (isNaN(target)) return;

        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals'), 10) || (rawTarget.includes('.') ? rawTarget.split('.')[1].length : 0);
        const duration = parseInt(el.getAttribute('data-duration'), 10) || 1600;
        const startTime = performance.now();

        const updateCounter = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic formula
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = (easeOut * target);

          let formattedNum;
          if (decimals > 0) {
            formattedNum = current.toFixed(decimals);
          } else {
            formattedNum = Math.floor(current).toLocaleString();
          }

          el.textContent = `${prefix}${formattedNum}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            const finalFormatted = decimals > 0 ? target.toFixed(decimals) : target.toLocaleString();
            el.textContent = `${prefix}${finalFormatted}${suffix}`;
          }
        };

        requestAnimationFrame(updateCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  counterEls.forEach(el => observer.observe(el));
}

// 5. Interactive 3D Card Tilt with Dynamic Mouse Spotlight
function init3DCardTilt() {
  const tiltCards = document.querySelectorAll('.tilt-interactive');

  tiltCards.forEach(card => {
    // Inject spotlight glow element if not already present
    if (!card.querySelector('.spotlight-glow')) {
      const glow = document.createElement('div');
      glow.className = 'spotlight-glow';
      card.appendChild(glow);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

// 6. Hero Carousel Slider Engine
class HeroCarouselSlider {
  constructor(viewportId) {
    this.viewport = document.getElementById(viewportId);
    if (!this.viewport) return;

    this.track = this.viewport.querySelector('.stackly-carousel-track');
    this.slides = this.viewport.querySelectorAll('.stackly-carousel-slide');
    this.prevBtn = this.viewport.querySelector('.carousel-circle-btn.prev');
    this.nextBtn = this.viewport.querySelector('.carousel-circle-btn.next');
    this.dashes = this.viewport.querySelectorAll('.carousel-dash');
    this.currentIndex = 0;
    this.autoSlideInterval = null;

    this.init();
  }

  init() {
    this.update();

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prev();
        this.resetAutoSlide();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.next();
        this.resetAutoSlide();
      });
    }

    this.dashes.forEach((dash, idx) => {
      dash.addEventListener('click', () => {
        this.goTo(idx);
        this.resetAutoSlide();
      });
    });

    this.startAutoSlide();

    this.viewport.addEventListener('mouseenter', () => this.stopAutoSlide());
    this.viewport.addEventListener('mouseleave', () => this.startAutoSlide());
  }

  goTo(index) {
    this.currentIndex = (index + this.slides.length) % this.slides.length;
    this.update();
  }

  next() {
    this.goTo(this.currentIndex + 1);
  }

  prev() {
    this.goTo(this.currentIndex - 1);
  }

  update() {
    if (this.track) {
      this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }
    this.dashes.forEach((dash, idx) => {
      if (idx === this.currentIndex) {
        dash.classList.add('active');
      } else {
        dash.classList.remove('active');
      }
    });
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => this.next(), 6000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}

// 7. Live Skill & Course Code Matrix Tracker
function initSkillTracker() {
  const input = document.getElementById('skill-tracker-input');
  const btn = document.getElementById('skill-tracker-btn');
  const tagLinks = document.querySelectorAll('.tracker-tag-link');
  if (!input || !btn) return;

  const dataset = {
    'AI-8921': {
      name: 'Large Language Models & Distributed Fine-Tuning',
      status: 'In-Progress (78% Complete)',
      lead: 'Dr. Marcus Vance (AI Research)',
      node: 'US-East Node (42ms)',
      badgeColor: '#6366f1'
    },
    'FS-5402': {
      name: 'High-Performance Reactive Web & Canvas Engines',
      status: 'Verified Certified (100%)',
      lead: 'Elena Rostova (Principal Architect)',
      node: 'EU-Central Node (18ms)',
      badgeColor: '#f43f5e'
    },
    'CL-1099': {
      name: 'Kubernetes Cluster Architecture & GitOps Delivery',
      status: 'Mastery Level 03 (94%)',
      lead: 'DevOps Guild (Global)',
      node: 'AP-East Node (35ms)',
      badgeColor: '#06b6d4'
    },
    'CY-7710': {
      name: 'Zero-Trust Cloud & Cryptographic Protocols',
      status: 'Enrolled (Module 2 of 8)',
      lead: 'SecOps Guild',
      node: 'US-West Node (22ms)',
      badgeColor: '#10b981'
    }
  };

  const handleTrack = () => {
    const code = (input.value || '').trim().toUpperCase();
    if (!code) {
      window.showToast('Please enter a valid skill code (e.g. AI-8921)', 'error');
      return;
    }

    let existingBox = document.getElementById('tracker-result-output');
    if (existingBox) existingBox.remove();

    const data = dataset[code] || {
      name: `Custom Skill Track [${code}]`,
      status: 'Active Synchronized Sandbox',
      lead: 'Automated Curriculum Engine',
      node: 'Edge Compute (12ms)',
      badgeColor: '#06b6d4'
    };

    const box = document.createElement('div');
    box.id = 'tracker-result-output';
    box.className = 'tracker-result-box';
    box.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <span style="font-family: var(--font-code); font-weight: 700; color: ${data.badgeColor}; font-size: 0.85rem;"><i class="fa-solid fa-bolt" style="margin-right: 0.35rem;"></i> NODE FOUND: ${code}</span>
        <span style="font-size: 0.75rem; color: #10b981; display: flex; align-items: center; gap: 4px;">
          <span style="width: 6px; height: 6px; border-radius: 50%; background: #10b981; display: inline-block;"></span>
          ${data.node}
        </span>
      </div>
      <div style="font-weight: 700; color: #fff; font-size: 0.95rem; margin-bottom: 0.3rem;">${data.name}</div>
      <div style="font-size: 0.8rem; color: var(--text-secondary); display: flex; justify-content: space-between;">
        <span>Status: <strong style="color: #fff;">${data.status}</strong></span>
        <span>Faculty: ${data.lead}</span>
      </div>
    `;

    const parentCard = document.querySelector('.live-tracker-card');
    if (parentCard) parentCard.appendChild(box);

    window.showToast(`Telemetery Connected to ${code}`, 'success');
  };

  btn.addEventListener('click', handleTrack);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleTrack();
  });

  tagLinks.forEach(link => {
    link.addEventListener('click', () => {
      const code = link.getAttribute('data-code');
      if (code) {
        input.value = code;
        handleTrack();
      }
    });
  });
}

// 8. Interactive Assessment Simulator Engine
class AssessmentEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.questions = [
      {
        discipline: 'AI & Distributed Systems',
        title: 'Which distributed attention optimization drastically reduces transformer memory footprint during fine-tuning?',
        options: [
          { text: 'FlashAttention-2 kernel fusing', correct: true },
          { text: 'Single-thread synchronous CPU buffers', correct: false },
          { text: 'Uncompressed raw weight serialization', correct: false },
          { text: 'Naive full-precision float64 matrix copy', correct: false }
        ],
        explanation: 'FlashAttention computes exact attention with sub-quadratic memory overhead via fast SRAM tiling and kernel fusion.'
      },
      {
        discipline: 'Cloud & Kubernetes Architecture',
        title: 'In a Kubernetes cluster, what component guarantees high availability by maintaining declarative desired state?',
        options: [
          { text: 'Kubernetes Controller Manager & etcd quorum', correct: true },
          { text: 'Static Localhost hosts file', correct: false },
          { text: 'Ephemeral Docker socket symlinks', correct: false },
          { text: 'Manual SSH server crontab', correct: false }
        ],
        explanation: 'Controller Manager reconciliation loops paired with etcd distributed consensus ensure self-healing and target state enforcement.'
      },
      {
        discipline: 'Reactive Systems & Performance',
        title: 'How do high-frequency web applications achieve 60+ FPS rendering without blocking the JavaScript main thread?',
        options: [
          { text: 'OffscreenCanvas & Dedicated Web Workers', correct: true },
          { text: 'Synchronous while(true) blocking loops', correct: false },
          { text: 'Repeated synchronous localStorage writes', correct: false },
          { text: 'Excessive synchronous DOM query reflows', correct: false }
        ],
        explanation: 'OffscreenCanvas allows background rendering inside Web Workers without interrupting user interface events.'
      }
    ];

    this.currentIndex = 0;
    this.score = 0;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const q = this.questions[this.currentIndex];
    this.container.innerHTML = `
      <div class="sandbox-card-container tilt-interactive">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <span style="font-family: var(--font-code); font-size: 0.8rem; font-weight: 700; color: var(--cyan-light); background: rgba(6, 182, 212, 0.1); padding: 0.35rem 0.8rem; border-radius: var(--radius-pill); border: 1px solid var(--border-cyan);">
             ${q.discipline}
          </span>
          <span style="font-family: var(--font-code); font-size: 0.8rem; color: var(--text-muted);">
            Challenge ${this.currentIndex + 1} / ${this.questions.length}
          </span>
        </div>

        <h3 class="serif-headline" style="font-size: 1.55rem; color: #fff; margin-bottom: 2rem; line-height: 1.35;">
          ${q.title}
        </h3>

        <div class="sandbox-options-list" id="sandbox-options-list">
          ${q.options.map((opt, i) => `
            <button class="sandbox-option-btn" data-index="${i}">
              <span style="width: 24px; height: 24px; border-radius: 50%; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; font-family: var(--font-code);">
                ${String.fromCharCode(65 + i)}
              </span>
              <span>${opt.text}</span>
            </button>
          `).join('')}
        </div>

        <div id="sandbox-feedback-box" style="margin-top: 1.5rem; display: none;"></div>
      </div>
    `;

    this.bindOptions();
    init3DCardTilt();
  }

  bindOptions() {
    const q = this.questions[this.currentIndex];
    const optionBtns = this.container.querySelectorAll('.sandbox-option-btn');
    const feedbackBox = this.container.querySelector('#sandbox-feedback-box');

    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        const opt = q.options[idx];

        optionBtns.forEach(b => b.disabled = true);

        if (opt.correct) {
          btn.classList.add('selected-correct', 'anim-correct');
          this.score++;
          feedbackBox.style.display = 'block';
          feedbackBox.innerHTML = `
            <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid #10b981; padding: 1.25rem; border-radius: var(--radius-sm); color: #fff;">
              <div style="font-weight: 700; color: #10b981; margin-bottom: 0.3rem; display: flex; align-items: center; gap: 6px;">
                ✓ Correct Telemetry Verified!
              </div>
              <p style="font-size: 0.85rem; color: #e2e8f0; line-height: 1.5;">${q.explanation}</p>
              <button id="sandbox-next-btn" class="btn-crimson" style="margin-top: 1rem; padding: 0.5rem 1.2rem; font-size: 0.85rem;">
                Next Challenge ➔
              </button>
            </div>
          `;
          window.showToast('Correct Answer! Skill Telemetry +100 XP', 'success');
        } else {
          btn.classList.add('selected-wrong', 'anim-wrong');
          // highlight correct
          const correctIdx = q.options.findIndex(o => o.correct);
          if (optionBtns[correctIdx]) optionBtns[correctIdx].classList.add('selected-correct');

          feedbackBox.style.display = 'block';
          feedbackBox.innerHTML = `
            <div style="background: rgba(244, 63, 94, 0.12); border: 1px solid #f43f5e; padding: 1.25rem; border-radius: var(--radius-sm); color: #fff;">
              <div style="font-weight: 700; color: #f43f5e; margin-bottom: 0.3rem;">
                ✕ Incorrect Choice
              </div>
              <p style="font-size: 0.85rem; color: #e2e8f0; line-height: 1.5;">${q.explanation}</p>
              <button id="sandbox-next-btn" class="btn-outline-glass" style="margin-top: 1rem; padding: 0.5rem 1.2rem; font-size: 0.85rem;">
                Next Challenge ➔
              </button>
            </div>
          `;
          window.showToast('Incorrect. Review the technical explanation.', 'error');
        }

        const nextBtn = feedbackBox.querySelector('#sandbox-next-btn');
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            this.currentIndex = (this.currentIndex + 1) % this.questions.length;
            this.render();
          });
        }
      });
    });
  }
}

// 9. Global Toast Notification Helper
window.showToast = function(message, type = 'info') {
  let container = document.querySelector('.stackly-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'stackly-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'stackly-toast';

  const iconColor = type === 'success' ? '#10b981' : type === 'error' ? '#f43f5e' : '#06b6d4';
  toast.style.borderColor = iconColor;
  toast.innerHTML = `
    <span style="width: 8px; height: 8px; border-radius: 50%; background: ${iconColor}; display: inline-block; box-shadow: 0 0 10px ${iconColor};"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

// 10. Header Navigation Dynamic Scroll Shadow
function initHeaderScroll() {
  const header = document.querySelector('.stackly-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// 11. 1-Click Demo Logins
function initAuthDemoButtons() {
  const studentBtn = document.getElementById('demo-student');
  const adminBtn = document.getElementById('demo-admin');
  const emailInput = document.getElementById('auth-email');
  const passInput = document.getElementById('auth-password');

  if (studentBtn && emailInput) {
    studentBtn.addEventListener('click', () => {
      emailInput.value = 'alex.student@stackly.io';
      if (passInput) passInput.value = 'DemoPass@2026';
      window.showToast('Loaded Student Demo Credentials', 'success');
    });
  }

  if (adminBtn && emailInput) {
    adminBtn.addEventListener('click', () => {
      emailInput.value = 'sarah.director@stackly.io';
      if (passInput) passInput.value = 'AdminPass@2026';
      window.showToast('Loaded Admin Director Credentials', 'info');
    });
  }
}

// 12. Squarespace AI Pathway Generator Simulation
function initSquarespaceAIGenerator() {
  const input = document.getElementById('sqs-ai-prompt-input');
  const generateBtn = document.getElementById('sqs-ai-generate-btn');
  const chips = document.querySelectorAll('.sqs-chip');
  const statusTag = document.getElementById('sqs-ai-status-tag');
  const resultsContainer = document.getElementById('sqs-ai-results-grid');
  const trackSummary = document.getElementById('sqs-ai-track-summary');

  if (!input || !generateBtn || !resultsContainer) return;

  const sampleDatasets = {
    'Generative AI & LLM Fine-Tuning': {
      title: 'LLM Fine-Tuning & Transformer Engineering Specialization',
      badge: 'SYNTHESIZED • 3 MODULES • 24 SANDBOX LABS',
      modules: [
        {
          num: 'MOD 01',
          title: 'Attention Mechanisms & Tokenizers',
          desc: 'Build multi-head attention from scratch and implement BPE/WordPiece tokenization.',
          tags: ['Python', 'PyTorch', 'Attention']
        },
        {
          num: 'MOD 02',
          title: 'PEFT, LoRA & QLoRA Quantization',
          desc: 'Fine-tune 7B-70B models on consumer hardware using 4-bit quantization and low-rank adapters.',
          tags: ['LoRA', 'BitsAndBytes', 'HuggingFace']
        },
        {
          num: 'MOD 03',
          title: 'Distributed vLLM & TensorRT Serving',
          desc: 'Deploy high-throughput inference endpoints with continuous batching and KV caching.',
          tags: ['vLLM', 'CUDA', 'Triton']
        }
      ]
    },
    'Kubernetes Cloud SecOps': {
      title: 'Enterprise Kubernetes & Zero-Trust Cloud Architecture',
      badge: 'SYNTHESIZED • 3 MODULES • 30 SANDBOX LABS',
      modules: [
        {
          num: 'MOD 01',
          title: 'Cluster Topology & Control Plane',
          desc: 'Deploy multi-master HA clusters with custom etcd backup encryption and Raft telemetry.',
          tags: ['K8s 1.30', 'etcd', 'CoreDNS']
        },
        {
          num: 'MOD 02',
          title: 'eBPF Observability & Cilium Mesh',
          desc: 'Enforce L7 network policies, mTLS encryption, and kernel-level packet inspection.',
          tags: ['Cilium', 'eBPF', 'mTLS']
        },
        {
          num: 'MOD 03',
          title: 'GitOps ArgoCD & Falco Runtime Sec',
          desc: 'Automate continuous drift detection and real-time container threat containment.',
          tags: ['ArgoCD', 'Falco', 'Cosign']
        }
      ]
    },
    'High-Performance Full-Stack Systems': {
      title: 'Reactive Full-Stack Architecture & Canvas Engines',
      badge: 'SYNTHESIZED • 3 MODULES • 28 SANDBOX LABS',
      modules: [
        {
          num: 'MOD 01',
          title: 'Server Actions & Streaming Hydration',
          desc: 'Architect edge-rendered Next.js micro-frontends with optimistic mutations.',
          tags: ['React 19', 'Next.js', 'Turbopack']
        },
        {
          num: 'MOD 02',
          title: 'WebGL & Low-Latency Canvas Engines',
          desc: 'Build 60FPS hardware-accelerated interactive canvas viewports and shaders.',
          tags: ['WebGL', 'GLSL', 'Canvas2D']
        },
        {
          num: 'MOD 03',
          title: 'Distributed Redis & WebSocket Sync',
          desc: 'Design collaborative state sync with CRDTs and low-latency message queues.',
          tags: ['Redis', 'WebSockets', 'CRDT']
        }
      ]
    },
    'Cyber Threat Intelligence & SecOps': {
      title: 'Offensive Security, Threat Hunting & SIEM Analytics',
      badge: 'SYNTHESIZED • 3 MODULES • 22 SANDBOX LABS',
      modules: [
        {
          num: 'MOD 01',
          title: 'Red Team Recon & Vulnerability Lab',
          desc: 'Execute structured vulnerability mapping, binary reverse engineering, and exploit triage.',
          tags: ['Ghidra', 'BurpSuite', 'OWASP']
        },
        {
          num: 'MOD 02',
          title: 'Blue Team SIEM & Log Telemetry',
          desc: 'Parse distributed Sysmon logs with Elasticsearch and build automated Sigma rules.',
          tags: ['Elastic', 'Sigma', 'Splunk']
        },
        {
          num: 'MOD 03',
          title: 'Zero-Trust Identity & Cloud IAM',
          desc: 'Harden AWS/GCP cross-account trust boundaries and federated OIDC policies.',
          tags: ['OIDC', 'IAM', 'Zero-Trust']
        }
      ]
    }
  };

  function runGeneration(promptText) {
    if (!promptText || promptText.trim() === '') {
      promptText = 'Generative AI & LLM Fine-Tuning';
    }

    if (statusTag) {
      statusTag.innerHTML = `
        <span class="pulsing-beacon" style="background:#00f2fe;"></span>
        <span style="color: #00f2fe;">AI SYNTHESIZING PATHWAY FOR "${promptText.slice(0, 32)}..."</span>
      `;
    }

    resultsContainer.style.opacity = '0.35';
    resultsContainer.style.pointerEvents = 'none';

    setTimeout(() => {
      // Find matching dataset or default
      let data = sampleDatasets[promptText];
      if (!data) {
        // Find partial match
        const keys = Object.keys(sampleDatasets);
        const match = keys.find(k => k.toLowerCase().includes(promptText.toLowerCase()) || promptText.toLowerCase().includes(k.toLowerCase()));
        data = match ? sampleDatasets[match] : sampleDatasets['Generative AI & LLM Fine-Tuning'];
      }

      if (trackSummary) {
        trackSummary.textContent = data.title;
      }

      if (statusTag) {
        statusTag.innerHTML = `
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; display: inline-block; box-shadow: 0 0 8px #10b981;"></span>
          <span style="color: #10b981;">${data.badge}</span>
        `;
      }

      resultsContainer.innerHTML = data.modules.map(mod => `
        <div class="sqs-module-preview-card tilt-interactive">
          <div class="sqs-module-num">${mod.num}</div>
          <div class="sqs-module-title">${mod.title}</div>
          <p class="sqs-module-desc">${mod.desc}</p>
          <div class="sqs-module-tags">
            ${mod.tags.map(t => `<span style="background: rgba(99, 102, 241, 0.15); padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid rgba(99, 102, 241, 0.3);">#${t}</span>`).join('')}
          </div>
        </div>
      `).join('');

      resultsContainer.style.opacity = '1';
      resultsContainer.style.pointerEvents = 'auto';

      window.showToast(`Synthesized AI Pathway: ${data.title}`, 'success');
    }, 700);
  }

  generateBtn.addEventListener('click', () => {
    runGeneration(input.value);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runGeneration(input.value);
    }
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const text = chip.getAttribute('data-prompt') || chip.textContent.trim();
      input.value = text;
      runGeneration(text);
    });
  });
}

// 13. Squarespace Heavy-Card Interactive Toggles
function initHeavyCardInteractions() {
  // Mode toggle (Sprint vs Full Track)
  const modeBtns = document.querySelectorAll('.sqs-mode-btn');
  const modeDisplayDesc = document.getElementById('sqs-mode-display-desc');
  const modeTimeEst = document.getElementById('sqs-mode-time-est');

  if (modeBtns && modeDisplayDesc) {
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-mode');
        if (mode === 'sprint') {
          modeDisplayDesc.textContent = 'Single-Topic 3-Week Sprint: 1 Focus Track, 8 Sandbox Labs, 1 Capstone Project.';
          if (modeTimeEst) modeTimeEst.textContent = '~18 Hours';
        } else {
          modeDisplayDesc.textContent = 'Comprehensive 12-Week Specialization: 4 Disciplines, 32 Sandboxes, Verified Digital Credential.';
          if (modeTimeEst) modeTimeEst.textContent = '~72 Hours';
        }
      });
    });
  }

  // Interactive sample AI mentor prompts
  const samplePrompts = document.querySelectorAll('.sqs-sample-ai-prompt');
  const chatAiResponse = document.getElementById('sqs-chat-ai-response');

  if (samplePrompts && chatAiResponse) {
    samplePrompts.forEach(p => {
      p.addEventListener('click', () => {
        const question = p.getAttribute('data-question');
        const answer = p.getAttribute('data-answer');
        
        chatAiResponse.style.opacity = '0.4';
        chatAiResponse.textContent = 'AI is analyzing query syntax...';
        
        setTimeout(() => {
          chatAiResponse.textContent = answer || 'LoRA reduces parameter footprint by decomposing weight updates ΔW into low-rank matrices A and B, cutting VRAM overhead by 70%.';
          chatAiResponse.style.opacity = '1';
        }, 400);
      });
    });
  }
}

// 14. Technology Persona Switcher
function initPersonaSwitcher() {
  const personaBtns = document.querySelectorAll('.sqs-persona-tab-btn');
  const titleElem = document.getElementById('persona-detail-title');
  const descElem = document.getElementById('persona-detail-desc');
  const modulesElem = document.getElementById('persona-detail-modules');
  const computeElem = document.getElementById('persona-detail-compute');
  const credentialElem = document.getElementById('persona-detail-credential');

  if (!personaBtns.length || !titleElem) return;

  const personas = {
    'devops': {
      title: 'DevOps & Site Reliability Architect Track',
      desc: 'Master Kubernetes cluster orchestration, GitOps automation with ArgoCD, and eBPF kernel observability with zero downtime.',
      modules: 'K8s 1.30 • Helm • Cilium eBPF • ArgoCD • Prometheus',
      compute: 'Dedicated 8-Core Sandbox / 40GB NVMe Root',
      credential: 'STACKLY Certified Senior SRE Fellow (Level 3)'
    },
    'ai-engineer': {
      title: 'Generative AI & Distributed Model Engineer',
      desc: 'Train transformers from scratch, perform low-rank LoRA adapter fine-tuning, and serve multi-GPU inference with vLLM.',
      modules: 'PyTorch 2.4 • HuggingFace • Triton CUDA • FlashAttention-2',
      compute: 'NVIDIA A100 Cloud Node Allocation (15h/mo)',
      credential: 'STACKLY Certified AI Research Architect'
    },
    'fullstack': {
      title: 'High-Concurrency Reactive Systems Engineer',
      desc: 'Architect streaming Next.js edge applications, WebGL visualizers, distributed caching with Redis, and CRDT synchronization.',
      modules: 'Next.js 15 • React 19 • WebSockets • Redis Cluster • WebGL',
      compute: 'Instant Edge V8 Isolate Environments',
      credential: 'STACKLY Certified Full-Stack Master (Level 4)'
    },
    'secops': {
      title: 'Offensive Security & Threat Hunting Specialist',
      desc: 'Execute real-world red team penetration labs, analyze memory dumps with Volatility, and craft detection rules in Splunk/Sigma.',
      modules: 'Ghidra • Burp Suite Pro • Sigma Rules • Wireshark • IAM',
      compute: 'Isolated Air-Gapped Offensive Security Range',
      credential: 'STACKLY Certified Cloud Threat Hunter'
    }
  };

  personaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      personaBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.getAttribute('data-persona');
      const data = personas[key] || personas['devops'];

      titleElem.textContent = data.title;
      descElem.textContent = data.desc;
      modulesElem.textContent = data.modules;
      computeElem.textContent = data.compute;
      credentialElem.textContent = data.credential;
    });
  });
}

// 15. FAQ Accordion Controller
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.sqs-faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.sqs-faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Optional: close other items for clean accordion effect
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });

        if (isActive) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      });
    }
  });
}

// 16. Subnav Smooth Scroll & Active Spy
function initBrandPersonalityWidget() {
  const pills = document.querySelectorAll('.sqs-personality-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      window.showToast(`Selected style: ${pill.textContent.trim()}`, 'success');
    });
  });
}

function initSubnavScrollSpy() {
  const subnavLinks = document.querySelectorAll('.sqs-subnav-link, .sqs-floating-nav-link');
  if (!subnavLinks.length) return;

  const sections = [];
  subnavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        sections.push({ link, target });
      }
    }
  });

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 200;
    sections.forEach(({ link, target }) => {
      const top = target.offsetTop;
      const height = target.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        subnavLinks.forEach(l => {
          if (l.getAttribute('href') === link.getAttribute('href')) {
            l.classList.add('active');
          } else {
            l.classList.remove('active');
          }
        });
      }
    });
  }, { passive: true });
}

function initMobileNavDrawer() {
  const toggleBtns = document.querySelectorAll('.stackly-mobile-toggle, .mobile-menu-toggle, #mobileNavToggle');
  let drawer = document.querySelector('.stackly-mobile-drawer, .mobile-nav-drawer, #mobileNavDrawer');
  let backdrop = document.querySelector('.stackly-drawer-backdrop, .mobile-nav-drawer-backdrop, #mobileNavBackdrop');
  
  // If drawer does not exist on page, dynamically create it
  if (!drawer && document.querySelector('.stackly-header')) {
    const header = document.querySelector('.stackly-header');
    drawer = document.createElement('div');
    drawer.className = 'stackly-mobile-drawer';
    drawer.id = 'mobileNavDrawer';
    drawer.innerHTML = `
      <div class="mobile-drawer-header">
        <img src="images/stackly-logo.webp" alt="STACKLY" style="height: 32px;" />
        <button class="mobile-drawer-close" id="mobileNavClose" aria-label="Close Navigation Menu">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <ul class="mobile-nav-list">
        <li><a href="index.html" class="mobile-nav-link"><i class="fa-solid fa-house"></i> Home</a></li>
        <li><a href="about.html" class="mobile-nav-link"><i class="fa-solid fa-circle-info"></i> About</a></li>
        <li><a href="services.html" class="mobile-nav-link"><i class="fa-solid fa-cube"></i> Services &amp; Library</a></li>
        <li><a href="blog.html" class="mobile-nav-link"><i class="fa-solid fa-newspaper"></i> Blog</a></li>
        <li><a href="contact.html" class="mobile-nav-link"><i class="fa-solid fa-envelope"></i> Contact</a></li>
      </ul>
      <div class="mobile-drawer-actions">
        <a href="login.html" class="btn-mobile-login"><i class="fa-solid fa-right-to-bracket"></i> Login</a>
        <a href="signup.html" class="btn-mobile-signup"><i class="fa-solid fa-user-plus"></i> Sign Up</a>
      </div>
    `;
    
    backdrop = document.createElement('div');
    backdrop.className = 'stackly-drawer-backdrop';
    backdrop.id = 'mobileNavBackdrop';
    
    document.body.appendChild(drawer);
    document.body.appendChild(backdrop);
  }

  // Also ensure mobile toggle button exists in header
  const navContainers = document.querySelectorAll('.stackly-nav-container');
  navContainers.forEach(container => {
    if (!container.querySelector('.stackly-mobile-toggle, .mobile-menu-toggle')) {
      const toggle = document.createElement('button');
      toggle.className = 'stackly-mobile-toggle';
      toggle.setAttribute('aria-label', 'Toggle Navigation Menu');
      toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      container.appendChild(toggle);
      toggle.addEventListener('click', openDrawer);
    }
  });

  const closeBtns = document.querySelectorAll('.mobile-drawer-close, .mobile-nav-close, #mobileNavClose');

  function openDrawer() {
    if (drawer) drawer.classList.add('active', 'open');
    if (backdrop) backdrop.classList.add('active', 'open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('active', 'open');
    if (backdrop) backdrop.classList.remove('active', 'open');
    document.body.style.overflow = '';
  }

  toggleBtns.forEach(btn => btn.addEventListener('click', openDrawer));
  closeBtns.forEach(btn => btn.addEventListener('click', closeDrawer));
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  if (drawer) {
    const drawerLinks = drawer.querySelectorAll('a');
    drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));
  }

  // Escape key support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
}

function initDashboardSidebarToggle() {
  const sidebar = document.querySelector('.dashboard-sidebar');
  if (!sidebar) return;

  const header = document.querySelector('.stackly-header .stackly-nav-container');
  if (header && !header.querySelector('.dashboard-sidebar-toggle')) {
    const toggle = document.createElement('button');
    toggle.className = 'dashboard-sidebar-toggle';
    toggle.setAttribute('aria-label', 'Toggle Dashboard Sidebar');
    toggle.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
    header.prepend(toggle);
    
    let backdrop = document.querySelector('.dashboard-sidebar-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'stackly-drawer-backdrop dashboard-sidebar-backdrop';
      document.body.appendChild(backdrop);
    }

    const toggleSidebar = () => {
      sidebar.classList.toggle('active');
      backdrop.classList.toggle('active');
      document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    };

    const closeSidebar = () => {
      sidebar.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', toggleSidebar);
    backdrop.addEventListener('click', closeSidebar);

    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) closeSidebar();
      });
    });
  }
}

function initSearchModal() {
  const triggers = document.querySelectorAll('.nav-search-trigger, [data-open-search]');
  const modal = document.querySelector('.search-modal-backdrop');
  const closeBtns = document.querySelectorAll('.search-modal-close');
  const searchInput = document.querySelector('.search-modal-input');
  const resultsWrap = document.querySelector('.search-modal-results');

  if (!modal) return;

  function openModal() {
    modal.classList.add('open');
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 50);
    }
  }

  function closeModal() {
    modal.classList.remove('open');
    if (searchInput) searchInput.value = '';
  }

  triggers.forEach(btn => btn.addEventListener('click', openModal));
  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Hotkey Cmd+K or Ctrl+K
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (modal.classList.contains('open')) {
        closeModal();
      } else {
        openModal();
      }
    }
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Client-side search mock filter
  if (searchInput && resultsWrap) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const items = resultsWrap.querySelectorAll('.search-result-item');
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

function initCourseFilterTabs() {
  const tabBtns = document.querySelectorAll('.course-filter-tab');
  const courseCards = document.querySelectorAll('[data-course-category]');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        const cat = card.getAttribute('data-course-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = '1';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initTestimonialSlider() {
  const slider = document.querySelector('.testimonial-grid-modern');
  const prevBtn = document.querySelector('#testimonial-prev-btn');
  const nextBtn = document.querySelector('#testimonial-next-btn');

  if (!slider || !prevBtn || !nextBtn) return;

  nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: 360, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -360, behavior: 'smooth' });
  });
}

function initGlobalPolicyModal() {
  if (document.getElementById('stackly-policy-modal')) return;

  const modalHtml = `
    <div id="stackly-policy-modal" style="display: none; position: fixed; inset: 0; background: rgba(5, 7, 12, 0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); z-index: 3000; align-items: center; justify-content: center; padding: 1.5rem; box-sizing: border-box;">
      <div style="background: #0f1422; border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 24px; width: 100%; max-width: 680px; max-height: 85vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,0.8);">
        
        <!-- Modal Header -->
        <div style="padding: 1.5rem 1.8rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02);">
          <div style="display: flex; align-items: center; gap: 0.8rem;">
            <div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(34, 211, 238, 0.12); border: 1px solid rgba(34, 211, 238, 0.25); display: flex; align-items: center; justify-content: center; color: #22d3ee; font-size: 1rem;">
              <i class="fa-solid fa-shield-halved"></i>
            </div>
            <div>
              <h3 id="policy-modal-title" style="margin: 0; color: #ffffff; font-size: 1.15rem; font-weight: 700;">STACKLY Legal &amp; Compliance</h3>
              <p style="margin: 0.2rem 0 0; color: #94a3b8; font-size: 0.78rem;">Last Updated: September 2026 • Verified Security Standard</p>
            </div>
          </div>
          <button id="close-policy-modal-btn" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-size: 1rem; cursor: pointer; transition: all 0.2s;">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Policy Navigation Tabs -->
        <div style="display: flex; gap: 0.5rem; padding: 0.8rem 1.8rem; background: rgba(0,0,0,0.2); border-bottom: 1px solid rgba(255,255,255,0.06); overflow-x: auto;">
          <button class="policy-tab-btn" data-policy="privacy" style="background: rgba(34, 211, 238, 0.12); border: 1px solid rgba(34, 211, 238, 0.3); color: #22d3ee; padding: 0.4rem 1rem; border-radius: 8px; font-size: 0.82rem; font-weight: 600; cursor: pointer;">Privacy Policy</button>
          <button class="policy-tab-btn" data-policy="terms" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #94a3b8; padding: 0.4rem 1rem; border-radius: 8px; font-size: 0.82rem; font-weight: 600; cursor: pointer;">Terms of Service</button>
          <button class="policy-tab-btn" data-policy="cookies" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #94a3b8; padding: 0.4rem 1rem; border-radius: 8px; font-size: 0.82rem; font-weight: 600; cursor: pointer;">Cookie Policy</button>
        </div>

        <!-- Policy Content Body -->
        <div id="policy-modal-content" style="padding: 1.8rem; overflow-y: auto; color: #cbd5e1; font-size: 0.92rem; line-height: 1.7; flex: 1;">
          <!-- Injected dynamically -->
        </div>

        <!-- Modal Footer -->
        <div style="padding: 1rem 1.8rem; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: flex-end; background: rgba(255,255,255,0.02);">
          <button id="accept-policy-modal-btn" class="sqs-btn-solid-white" style="padding: 0.6rem 1.8rem; font-size: 0.82rem; cursor: pointer;">
            Understood &amp; Close
          </button>
        </div>

      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const policyData = {
    privacy: `
      <h4 style="color: #fff; font-size: 1.05rem; margin-top: 0;">1. Data Collection &amp; Zero-Leakage Architecture</h4>
      <p>STACKLY Cloud employs zero-telemetry egress pipelines. Code executed within our WebAssembly containers and cloud sandboxes is isolated, never indexed for external model training, and cryptographically destroyed upon pod termination.</p>
      <h4 style="color: #fff; font-size: 1.05rem;">2. Compliance Standards</h4>
      <p>Our platform maintains ISO 27001, SOC 2 Type II, and GDPR compliance. Personal identity details and billing tokens are tokenized using AES-256 GCM encryption at rest and TLS 1.3 in transit.</p>
      <h4 style="color: #fff; font-size: 1.05rem;">3. Learner Rights &amp; Data Deletion</h4>
      <p>You retain 100% ownership over all software architectures, repositories, and learning notes created on STACKLY. You can request full data export or irrevocable account deletion at any time via Settings.</p>
    `,
    terms: `
      <h4 style="color: #fff; font-size: 1.05rem; margin-top: 0;">1. Sandbox Acceptable Use Policy</h4>
      <p>STACKLY development environments and cloud clusters are provisioned exclusively for educational, development, and benchmarking workloads. Malicious payloads, automated scraping, or crypto-mining will result in instant pod suspension.</p>
      <h4 style="color: #fff; font-size: 1.05rem;">2. Certificate &amp; Skill Verification Authenticity</h4>
      <p>Certificates issued by STACKLY are tied to verified telemetry hashes. Sharing account access to spoof assessment completion violates our academic integrity code.</p>
      <h4 style="color: #fff; font-size: 1.05rem;">3. Billing &amp; Subscriptions</h4>
      <p>Subscriptions can be canceled at any time with zero penalties. Unused cloud compute credits roll over for up to 90 billing days.</p>
    `,
    cookies: `
      <h4 style="color: #fff; font-size: 1.05rem; margin-top: 0;">1. Minimal Essential Cookies</h4>
      <p>STACKLY uses strictly essential session tokens and WebAssembly sandbox local storage caches to maintain learner authentication state and live code execution workspaces.</p>
      <h4 style="color: #fff; font-size: 1.05rem;">2. No Third-Party Tracking</h4>
      <p>We do NOT deploy invasive tracking pixels, ad networks, or cross-site fingerprinting scripts. Your browsing and learning history is private to your profile.</p>
    `
  };

  const modal = document.getElementById('stackly-policy-modal');
  const title = document.getElementById('policy-modal-title');
  const content = document.getElementById('policy-modal-content');
  const closeBtn = document.getElementById('close-policy-modal-btn');
  const acceptBtn = document.getElementById('accept-policy-modal-btn');
  const tabBtns = document.querySelectorAll('.policy-tab-btn');

  function openPolicy(type) {
    const key = (type === 'terms' || type === 'cookies') ? type : 'privacy';
    tabBtns.forEach(btn => {
      if (btn.getAttribute('data-policy') === key) {
        btn.style.background = 'rgba(34, 211, 238, 0.12)';
        btn.style.borderColor = 'rgba(34, 211, 238, 0.3)';
        btn.style.color = '#22d3ee';
      } else {
        btn.style.background = 'rgba(255,255,255,0.04)';
        btn.style.borderColor = 'rgba(255,255,255,0.08)';
        btn.style.color = '#94a3b8';
      }
    });

    const titles = {
      privacy: 'STACKLY Privacy & Data Security Policy',
      terms: 'STACKLY Terms of Service & Compute Agreement',
      cookies: 'STACKLY Cookie Policy & Storage Directives'
    };

    title.textContent = titles[key];
    content.innerHTML = policyData[key];
    modal.style.display = 'flex';
  }

  window.openPolicyModal = openPolicy;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      openPolicy(btn.getAttribute('data-policy'));
    });
  });

  const closeModal = () => { modal.style.display = 'none'; };
  closeBtn?.addEventListener('click', closeModal);
  acceptBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Global listener for policy links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const text = link.textContent.trim().toLowerCase();
    if (text.includes('privacy policy')) {
      e.preventDefault();
      openPolicy('privacy');
    } else if (text.includes('terms of service') || text.includes('terms and conditions')) {
      e.preventDefault();
      openPolicy('terms');
    } else if (text.includes('cookie policy')) {
      e.preventDefault();
      openPolicy('cookies');
    }
  });
}

function initGlobalFormHandlers() {
  document.querySelectorAll('form').forEach(form => {
    if (form.getAttribute('data-handler-attached')) return;
    form.setAttribute('data-handler-attached', 'true');

    // Skip auth form or custom modal forms that already have action listeners
    const formId = form.id;
    if (formId === 'contact-form' || formId === 'login-form' || formId === 'signup-form' || formId === 'admin-course-form') return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && !emailInput.value.includes('@')) {
        window.showToast('Please enter a valid email address.', 'error');
        return;
      }
      window.showToast('Request received! We have dispatched details to your email.', 'success');
      form.reset();
    });
  });
}

function initSafeLinkEnforcer() {
  // Ensure all external links have target="_blank" and rel="noopener noreferrer"
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
}

function initTemplatePreviewModal() {
  if (document.getElementById('template-preview-modal')) return;

  const modalHtml = `
    <div id="template-preview-modal" style="display: none; position: fixed; inset: 0; background: rgba(5, 7, 12, 0.88); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); z-index: 3100; align-items: center; justify-content: center; padding: 1.5rem; box-sizing: border-box;">
      <div style="background: #0f1422; border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 24px; width: 100%; max-width: 720px; overflow: hidden; box-shadow: 0 35px 90px rgba(0,0,0,0.85); display: flex; flex-direction: column; max-height: 90vh;">
        
        <!-- Header -->
        <div style="padding: 1.2rem 1.6rem; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02);">
          <div>
            <span id="tpl-modal-category" style="font-size: 0.75rem; color: #22d3ee; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">ARTISANAL POTTERY &amp; WORKSHOP</span>
            <h3 id="tpl-modal-title" style="margin: 0.2rem 0 0; color: #fff; font-size: 1.25rem; font-weight: 700;">Terra &amp; Form</h3>
          </div>
          <button id="close-tpl-modal-btn" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-size: 1rem; cursor: pointer; transition: all 0.2s;">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Preview Image Container -->
        <div style="position: relative; height: 340px; background: #07090e; overflow: hidden;">
          <img id="tpl-modal-img" src="images/sqs_template_ceramics.webp" alt="Template Preview" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
          <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,20,34,0.95) 0%, transparent 60%);"></div>
          <div style="position: absolute; bottom: 1.2rem; left: 1.6rem; right: 1.6rem; display: flex; justify-content: space-between; align-items: flex-end;">
            <span style="font-size: 0.82rem; color: #cbd5e1; background: rgba(0,0,0,0.6); padding: 0.35rem 0.8rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px);">
              <i class="fa-solid fa-layer-group" style="color: #d4a96a; margin-right: 0.4rem;"></i> Fully Responsive Architecture
            </span>
            <span style="font-size: 0.82rem; color: #10b981; font-weight: 700; background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.25); padding: 0.35rem 0.8rem; border-radius: 6px;">
              <i class="fa-solid fa-circle-check" style="margin-right: 0.3rem;"></i> Launch Ready
            </span>
          </div>
        </div>

        <!-- Footer Actions -->
        <div style="padding: 1.2rem 1.6rem; display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02); border-top: 1px solid rgba(255,255,255,0.08); flex-wrap: wrap; gap: 0.8rem;">
          <button id="close-tpl-modal-btn2" class="btn-outline-glass" style="padding: 0.65rem 1.4rem; font-size: 0.85rem; cursor: pointer;">
            Close Preview
          </button>
          <a href="signup.html" class="sqs-btn-solid-white" style="padding: 0.7rem 1.8rem; font-size: 0.85rem; text-decoration: none;">
            Start Building with Template <i class="fa-solid fa-arrow-right" style="margin-left: 0.4rem;"></i>
          </a>
        </div>

      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('template-preview-modal');
  const titleEl = document.getElementById('tpl-modal-title');
  const catEl = document.getElementById('tpl-modal-category');
  const imgEl = document.getElementById('tpl-modal-img');
  const closeBtn1 = document.getElementById('close-tpl-modal-btn');
  const closeBtn2 = document.getElementById('close-tpl-modal-btn2');

  const closeModal = () => { modal.style.display = 'none'; };
  closeBtn1?.addEventListener('click', closeModal);
  closeBtn2?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.openTemplatePreview = (title, category, imgUrl) => {
    if (titleEl) titleEl.textContent = title;
    if (catEl) catEl.textContent = category;
    if (imgEl) imgEl.src = imgUrl;
    modal.style.display = 'flex';
  };

  document.querySelectorAll('.sqs-template-card').forEach(card => {
    const btn = card.querySelector('.preview-template-btn');
    if (!btn) return;
    const title = card.querySelector('.sqs-template-title')?.textContent.trim() || 'Custom Template';
    const category = card.querySelector('.sqs-template-category')?.textContent.trim() || 'Architecture';
    const img = card.querySelector('img')?.getAttribute('src') || 'images/sqs_template_ceramics.webp';

    btn.addEventListener('click', () => {
      window.openTemplatePreview(title, category, img);
    });
  });
}

// Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  new ConstellationCanvas('constellation-canvas');
  initScrollProgressBar();
  initHeaderScroll();
  initDirectionalScrollReveals();
  initMetricCounters();
  init3DCardTilt();
  new HeroCarouselSlider('hero-slider-viewport');
  initSkillTracker();
  new AssessmentEngine('assessment-sandbox-wrapper');
  initAuthDemoButtons();
  initSquarespaceAIGenerator();
  initHeavyCardInteractions();
  initPersonaSwitcher();
  initFaqAccordion();
  initSubnavScrollSpy();
  initBrandPersonalityWidget();
  initMobileNavDrawer();
  initDashboardSidebarToggle();
  initSearchModal();
  initCourseFilterTabs();
  initTestimonialSlider();
  initGlobalPolicyModal();
  initGlobalFormHandlers();
  initSafeLinkEnforcer();
  initTemplatePreviewModal();
});
