/**
 * STACKLY - Unified Dashboard Intelligence & Visualization Engine
 * Handles Animated Metric Counters, Interactive SVG Line/Bar Charts,
 * Tab Switching, Lab Sandboxes, and Admin CRUD.
 */

document.addEventListener('DOMContentLoaded', () => {
  initDynamicGreetings();
  initDashboardTabs();
  initMetricCounterAnimations();
  initCharts();
  initLabSandbox();
  initAdminCRUD();

  // Dynamic full-width chart recalculation on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      initCharts();
    }, 100);
  });
});

/* ==========================================================================
   0. DYNAMIC PERSONALIZED GREETINGS
   ========================================================================== */
function initDynamicGreetings() {
  try {
    const savedName = localStorage.getItem('stackly_auth_name');
    const savedEmail = localStorage.getItem('stackly_auth_email');
    
    let displayName = savedName;
    if (!displayName && savedEmail) {
      const prefix = savedEmail.split('@')[0];
      displayName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }

    const adminGreeting = document.getElementById('admin-greeting-name');
    if (adminGreeting) {
      adminGreeting.textContent = displayName || 'Dr. Marcus Vance';
    }

    const userGreeting = document.getElementById('user-greeting-name');
    if (userGreeting) {
      userGreeting.textContent = displayName || 'Alex Mercer';
    }

    // Live formatted date ticker
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const userTicker = document.getElementById('user-time-ticker');
    const adminTicker = document.getElementById('admin-time-ticker');
    if (userTicker) userTicker.textContent = `${dateStr} • Live Cloud Sync`;
    if (adminTicker) adminTicker.textContent = `${dateStr} • Multi-Region Edge Active`;
  } catch (err) {}
}

/* ==========================================================================
   1. SECTION & TAB NAVIGATION
   ========================================================================== */
function initDashboardTabs() {
  const navLinks = document.querySelectorAll('.sidebar-nav-item a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#sec-')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          // Update sidebar active states
          document.querySelectorAll('.sidebar-nav-item').forEach(item => item.classList.remove('active'));
          link.closest('.sidebar-nav-item').classList.add('active');

          const headerOffset = 80;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ScrollSpy for sections
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('main section[id]');
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        document.querySelectorAll('.sidebar-nav-item').forEach(item => item.classList.remove('active'));
        const activeLink = document.querySelector(`.sidebar-nav-item a[href="#${id}"]`);
        if (activeLink) {
          activeLink.closest('.sidebar-nav-item').classList.add('active');
        }
      }
    });
  });
}

/* ==========================================================================
   2. ANIMATED METRIC COUNTERS
   ========================================================================== */
function initMetricCounterAnimations() {
  const counters = document.querySelectorAll('[data-counter-target], [data-target], .stat-number');
  
  counters.forEach(el => {
    const rawTarget = el.getAttribute('data-counter-target') || el.getAttribute('data-target') || el.textContent;
    const cleanNum = parseFloat(String(rawTarget).replace(/[^0-9.]/g, '')) || 0;
    const duration = parseInt(el.getAttribute('data-counter-duration')) || 1400;
    const prefix = el.getAttribute('data-counter-prefix') || '';
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const isFloat = cleanNum % 1 !== 0;

    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = isFloat ? (cleanNum * ease).toFixed(1) : Math.floor(cleanNum * ease).toLocaleString();

      el.textContent = `${prefix}${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${prefix}${isFloat ? cleanNum.toFixed(1) : cleanNum.toLocaleString()}${suffix}`;
      }
    }

    requestAnimationFrame(step);
  });
}

/* ==========================================================================
   3. INTERACTIVE SVG CHARTS ENGINE
   ========================================================================== */
function initCharts() {
  // 1. User Velocity Line Chart
  const userChartContainer = document.getElementById('user-velocity-chart');
  if (userChartContainer) {
    const data = [
      { label: 'Mon', value: 2.5, detail: '2.5 hrs • Neural Networks' },
      { label: 'Tue', value: 4.2, detail: '4.2 hrs • PyTorch Sandboxes' },
      { label: 'Wed', value: 3.8, detail: '3.8 hrs • Docker Lab 04' },
      { label: 'Thu', value: 6.5, detail: '6.5 hrs • LoRA Quantization' },
      { label: 'Fri', value: 5.1, detail: '5.1 hrs • Kubernetes Pods' },
      { label: 'Sat', value: 7.8, detail: '7.8 hrs • Full-Stack Systems' },
      { label: 'Sun', value: 6.0, detail: '6.0 hrs • Telemetry Review' }
    ];
    renderSVGLineChart(userChartContainer, data, {
      strokeColor: '#22d3ee',
      fillStart: 'rgba(34, 211, 238, 0.35)',
      fillEnd: 'rgba(34, 211, 238, 0.0)',
      yUnit: 'h',
      maxY: 10
    });
  }

  // 2. Admin Revenue & Inflow Multi-Line Chart
  const adminChartContainer = document.getElementById('admin-revenue-chart');
  if (adminChartContainer) {
    const data = [
      { label: 'Jan', value: 310, value2: 78, detail: '$310k MRR • 78k Users' },
      { label: 'Feb', value: 345, value2: 86, detail: '$345k MRR • 86k Users' },
      { label: 'Mar', value: 390, value2: 94, detail: '$390k MRR • 94k Users' },
      { label: 'Apr', value: 420, value2: 105, detail: '$420k MRR • 105k Users' },
      { label: 'May', value: 450, value2: 114, detail: '$450k MRR • 114k Users' },
      { label: 'Jun', value: 482.9, value2: 124.8, detail: '$482.9k MRR • 124.8k Users' }
    ];
    renderSVGMultiLineChart(adminChartContainer, data, {
      strokeColor1: '#d4a96a',
      fillStart1: 'rgba(212, 169, 106, 0.28)',
      fillEnd1: 'rgba(212, 169, 106, 0.0)',
      strokeColor2: '#818cf8',
      yUnit: 'k',
      maxY: 600
    });
  }
}

/**
 * Draws a glowing interactive SVG Line Chart
 */
function renderSVGLineChart(container, data, options) {
  const width = container.clientWidth || 700;
  const height = 260;
  const padLeft = 45;
  const padRight = 25;
  const padTop = 30;
  const padBottom = 40;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;
  const maxVal = options.maxY || Math.max(...data.map(d => d.value)) * 1.25;

  // Compute points
  const points = data.map((d, i) => {
    const x = padLeft + (i / (data.length - 1)) * chartW;
    const y = padTop + chartH - (d.value / maxVal) * chartH;
    return { x, y, ...d };
  });

  // Generate smooth cubic bezier SVG path
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cpx1 = p0.x + (p1.x - p0.x) / 2;
    const cpy1 = p0.y;
    const cpx2 = p0.x + (p1.x - p0.x) / 2;
    const cpy2 = p1.y;
    pathD += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${p1.x} ${p1.y}`;
  }

  // Area path
  const areaD = `${pathD} L ${points[points.length - 1].x} ${padTop + chartH} L ${points[0].x} ${padTop + chartH} Z`;

  // Grid lines
  let gridSvg = '';
  const ySteps = 4;
  for (let i = 0; i <= ySteps; i++) {
    const y = padTop + (i / ySteps) * chartH;
    const labelVal = Math.round(maxVal - (i / ySteps) * maxVal);
    gridSvg += `
      <line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4,4" />
      <text x="${padLeft - 12}" y="${y + 4}" fill="#64748b" font-size="10" text-anchor="end" font-family="JetBrains Mono, monospace">${labelVal}${options.yUnit || ''}</text>
    `;
  }

  // X Axis Labels
  let xLabelsSvg = '';
  points.forEach(p => {
    xLabelsSvg += `<text x="${p.x}" y="${height - 12}" fill="#94a3b8" font-size="11" text-anchor="middle" font-weight="600">${p.label}</text>`;
  });

  // Data Dots
  let dotsSvg = '';
  points.forEach((p, idx) => {
    dotsSvg += `
      <g class="chart-point-group" data-tooltip="${p.detail}" data-val="${p.value}" style="cursor: pointer;">
        <circle cx="${p.x}" cy="${p.y}" r="6" fill="#111827" stroke="${options.strokeColor}" stroke-width="2.5" class="chart-dot" />
        <circle cx="${p.x}" cy="${p.y}" r="16" fill="transparent" />
      </g>
    `;
  });

  const gradientId = `grad-${Math.random().toString(36).substr(2, 9)}`;

  container.innerHTML = `
    <div style="position: relative; width: 100%;">
      <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" style="overflow: visible;">
        <defs>
          <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${options.fillStart}" />
            <stop offset="100%" stop-color="${options.fillEnd}" />
          </linearGradient>
        </defs>
        ${gridSvg}
        <path d="${areaD}" fill="url(#${gradientId})" />
        <path d="${pathD}" fill="none" stroke="${options.strokeColor}" stroke-width="3.5" stroke-linecap="round" />
        ${xLabelsSvg}
        ${dotsSvg}
      </svg>
      <div class="chart-tooltip" style="position: absolute; display: none; pointer-events: none; background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 0.5rem 0.8rem; font-size: 0.82rem; color: #fff; font-weight: 600; box-shadow: 0 10px 25px rgba(0,0,0,0.5); z-index: 20; transform: translate(-50%, -120%);"></div>
    </div>
  `;

  // Attach hover tooltip
  const tooltip = container.querySelector('.chart-tooltip');
  const dotGroups = container.querySelectorAll('.chart-point-group');

  dotGroups.forEach(g => {
    g.addEventListener('mouseenter', (e) => {
      const dot = g.querySelector('.chart-dot');
      dot.setAttribute('r', '8');
      dot.setAttribute('fill', options.strokeColor);
      const text = g.getAttribute('data-tooltip');
      const rect = g.getBoundingClientRect();
      const contRect = container.getBoundingClientRect();

      tooltip.textContent = text;
      tooltip.style.left = `${rect.left - contRect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.top - contRect.top}px`;
      tooltip.style.display = 'block';
    });

    g.addEventListener('mouseleave', () => {
      const dot = g.querySelector('.chart-dot');
      dot.setAttribute('r', '6');
      dot.setAttribute('fill', '#111827');
      tooltip.style.display = 'none';
    });
  });
}

/**
 * Draws Multi-Line SVG Chart for Admin Analytics
 */
function renderSVGMultiLineChart(container, data, options) {
  const width = container.clientWidth || 700;
  const height = 280;
  const padLeft = 55;
  const padRight = 30;
  const padTop = 30;
  const padBottom = 40;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;
  const maxVal = options.maxY || 600;

  const points1 = data.map((d, i) => ({
    x: padLeft + (i / (data.length - 1)) * chartW,
    y: padTop + chartH - (d.value / maxVal) * chartH,
    ...d
  }));

  const points2 = data.map((d, i) => ({
    x: padLeft + (i / (data.length - 1)) * chartW,
    y: padTop + chartH - ((d.value2 * 4) / maxVal) * chartH,
    ...d
  }));

  // Path 1 (Revenue)
  let pathD1 = `M ${points1[0].x} ${points1[0].y}`;
  for (let i = 0; i < points1.length - 1; i++) {
    const p0 = points1[i];
    const p1 = points1[i + 1];
    pathD1 += ` C ${p0.x + (p1.x - p0.x) / 2} ${p0.y}, ${p0.x + (p1.x - p0.x) / 2} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  const areaD1 = `${pathD1} L ${points1[points1.length - 1].x} ${padTop + chartH} L ${points1[0].x} ${padTop + chartH} Z`;

  // Path 2 (Users)
  let pathD2 = `M ${points2[0].x} ${points2[0].y}`;
  for (let i = 0; i < points2.length - 1; i++) {
    const p0 = points2[i];
    const p1 = points2[i + 1];
    pathD2 += ` C ${p0.x + (p1.x - p0.x) / 2} ${p0.y}, ${p0.x + (p1.x - p0.x) / 2} ${p1.y}, ${p1.x} ${p1.y}`;
  }

  // Grid
  let gridSvg = '';
  for (let i = 0; i <= 4; i++) {
    const y = padTop + (i / 4) * chartH;
    const labelVal = Math.round(maxVal - (i / 4) * maxVal);
    gridSvg += `
      <line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4,4" />
      <text x="${padLeft - 12}" y="${y + 4}" fill="#64748b" font-size="10" text-anchor="end" font-family="JetBrains Mono, monospace">$${labelVal}k</text>
    `;
  }

  // Labels & Dots
  let xLabelsSvg = '';
  let dotsSvg = '';
  points1.forEach((p, idx) => {
    xLabelsSvg += `<text x="${p.x}" y="${height - 12}" fill="#94a3b8" font-size="11" text-anchor="middle" font-weight="600">${p.label}</text>`;
    dotsSvg += `
      <g class="chart-point-group" data-tooltip="${p.detail}" style="cursor: pointer;">
        <circle cx="${p.x}" cy="${p.y}" r="6" fill="#111827" stroke="${options.strokeColor1}" stroke-width="2.5" class="chart-dot1" />
        <circle cx="${points2[idx].x}" cy="${points2[idx].y}" r="5" fill="#111827" stroke="${options.strokeColor2}" stroke-width="2" />
        <circle cx="${p.x}" cy="${p.y}" r="20" fill="transparent" />
      </g>
    `;
  });

  const gradientId = `grad-admin-${Math.random().toString(36).substr(2, 9)}`;

  container.innerHTML = `
    <div style="position: relative; width: 100%;">
      <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" style="overflow: visible;">
        <defs>
          <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${options.fillStart1}" />
            <stop offset="100%" stop-color="${options.fillEnd1}" />
          </linearGradient>
        </defs>
        ${gridSvg}
        <path d="${areaD1}" fill="url(#${gradientId})" />
        <path d="${pathD1}" fill="none" stroke="${options.strokeColor1}" stroke-width="3.5" stroke-linecap="round" />
        <path d="${pathD2}" fill="none" stroke="${options.strokeColor2}" stroke-width="2.5" stroke-dasharray="6,4" stroke-linecap="round" />
        ${xLabelsSvg}
        ${dotsSvg}
      </svg>
      <div class="chart-tooltip" style="position: absolute; display: none; pointer-events: none; background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 0.5rem 0.8rem; font-size: 0.82rem; color: #fff; font-weight: 600; box-shadow: 0 10px 25px rgba(0,0,0,0.5); z-index: 20; transform: translate(-50%, -120%);"></div>
    </div>
  `;

  // Attach hover tooltip
  const tooltip = container.querySelector('.chart-tooltip');
  const dotGroups = container.querySelectorAll('.chart-point-group');

  dotGroups.forEach(g => {
    g.addEventListener('mouseenter', () => {
      const text = g.getAttribute('data-tooltip');
      const rect = g.getBoundingClientRect();
      const contRect = container.getBoundingClientRect();
      tooltip.textContent = text;
      tooltip.style.left = `${rect.left - contRect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.top - contRect.top}px`;
      tooltip.style.display = 'block';
    });

    g.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  });
}

/* ==========================================================================
   4. INTERACTIVE LAB SANDBOX RUNNER
   ========================================================================== */
function initLabSandbox() {
  const runBtn = document.getElementById('run-code-btn');
  const terminalOut = document.getElementById('sandbox-terminal-output');
  const codeEditor = document.getElementById('sandbox-code-editor');

  if (runBtn && terminalOut) {
    runBtn.addEventListener('click', () => {
      runBtn.innerHTML = '⚡ Compiling in WebAssembly...';
      runBtn.disabled = true;

      terminalOut.innerHTML = `
        <span style="color: #38bdf8;">[STACKLY WASM RUNTIME v3.4] Initializing isolated sandbox memory container...</span>\n
        <span style="color: #64748b;">> Allocating 512MB shared buffer...</span>\n
        <span style="color: #64748b;">> Compiling AST & PyTorch kernel hooks...</span>
      `;

      setTimeout(() => {
        terminalOut.innerHTML += `\n
          <span style="color: #10b981;">✓ Model Weights Quantized (4-bit QLoRA)</span>\n
          <span style="color: #facc15;">[LOG] Batch Loss: 0.0418 | Perplexity: 1.12 | Latency: 12.4ms</span>\n
          <span style="color: #10b981; font-weight: 700;">★ TEST PASSED: Neural checkpoint saved successfully. (+150 XP)</span>
        `;
        runBtn.innerHTML = '▶ Run Code in Sandbox';
        runBtn.disabled = false;
        window.showToast && window.showToast('Test Suite Passed! +150 XP Awarded', 'success');
      }, 1100);
    });
  }
}

/* ==========================================================================
   5. ADMIN COURSE CATALOG CRUD
   ========================================================================== */
function initAdminCRUD() {
  const modal = document.getElementById('admin-course-modal');
  const openBtn = document.getElementById('open-add-course-btn');
  const closeBtn = document.getElementById('close-course-modal-btn');
  const form = document.getElementById('admin-course-form');
  const tableBody = document.getElementById('admin-courses-table-body');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  if (form && tableBody) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('modal-course-title')?.value || 'New Track';
      const category = document.getElementById('modal-course-category')?.value || 'AI & Machine Learning';
      const seats = document.getElementById('modal-course-seats')?.value || '500';
      const price = document.getElementById('modal-course-price')?.value || '$49';

      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td style="font-weight: 700; color: #fff;">${title}</td>
        <td><span class="sqs-chip" style="font-size: 0.75rem;">${category}</span></td>
        <td style="color: #10b981; font-weight: 700;">🟢 Active</td>
        <td style="font-family: var(--font-code); color: #c8c5bc;">0 / ${seats}</td>
        <td style="font-weight: 700; color: #d4a96a;">${price}</td>
        <td>
          <button class="btn-outline-glass" style="padding: 0.25rem 0.6rem; font-size: 0.75rem; color: #fb7185;" onclick="this.closest('tr').remove(); window.showToast('Course track removed', 'info');">Delete</button>
        </td>
      `;

      tableBody.prepend(newRow);
      modal.style.display = 'none';
      form.reset();
      window.showToast && window.showToast(`Track "${title}" successfully deployed to global catalog!`, 'success');
    });
  }
}
