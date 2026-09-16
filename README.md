# 🎓 STACKLY — E-Learning Platform

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)

> A premium, full-featured e-learning platform with animated dashboards, interactive lab sandboxes, cognitive radar analytics, and a global leaderboard — all built in vanilla HTML, CSS & JavaScript.

🔗 **Live Site:** [https://lingalamanasa.github.io/E-learning-platform/](https://lingalamanasa.github.io/E-learning-platform/)  
📦 **GitHub Repository:** [https://github.com/lingalamanasa/E-learning-platform](https://github.com/lingalamanasa/E-learning-platform)

---

## ✨ Features

- 🧠 **User & Admin Dashboards** — 10-section learner intelligence portal with animated KPI telemetry
- 📊 **Interactive SVG Charts** — Cubic spline study velocity charts & multi-line revenue analytics
- 🖥️ **WebAssembly Lab Sandbox** — Browser-based PyTorch runtime with instant execution feedback
- 🎯 **Skill Matrix Rings** — Competency rings with level progression tracking
- 🔥 **84-Day Heatmap** — GitHub-style activity heatmap & monthly XP growth curves
- 🏆 **Global Leaderboard** — Ranked learner standings with XP tracking
- 📡 **Live Telemetry** — Animated metric counters and cloud sync indicators
- 🛡️ **Cryptographic Certificates** — Verified badge system for course completion
- 📅 **Mentorship Scheduler** — 1-on-1 WebRTC mentor session booking
- 🌐 **Responsive Design** — Mobile-first layout with glassmorphism UI

---

## 🗂️ Project Structure

```
E-learning-platform/
├── index.html              # Landing page
├── user-dashboard.html     # Student learner portal
├── admin-dashboard.html    # Admin analytics & CRUD
├── login.html              # Authentication
├── signup.html             # Registration
├── about.html              # About & team
├── blog.html               # Blog & articles
├── services.html           # Course catalog
├── contact.html            # Contact page
├── 404.html                # Error page
├── css/
│   ├── main.css            # Core layout & dashboard styles
│   ├── components.css      # UI component library
│   └── animations.css      # Keyframe & scroll animations
├── js/
│   ├── app.js              # Global interactions & constellation canvas
│   ├── dashboard.js        # Dashboard charts, counters & CRUD
│   ├── gsap-animations.js  # GSAP ScrollTrigger animations
│   └── svg-icons.js        # Inline SVG icon utilities
└── images/                 # Course thumbnails & hero assets
```

---

## 🚀 Getting Started

No build step required — open directly in a browser:

```bash
# Clone the repository
git clone https://github.com/lingalamanasa/E-learning-platform.git

# Open in browser
start user-dashboard.html
```

Or use a local dev server for the best experience:

```bash
# Using VS Code Live Server, or:
npx serve .
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 Semantic |
| Styling | Vanilla CSS3 + Custom Properties |
| Scripting | Vanilla JavaScript (ES2022+) |
| Animations | GSAP 3 + ScrollTrigger |
| Icons | Font Awesome 6 |
| Charts | Custom SVG rendering engine |
| Fonts | Google Fonts (Inter, Playfair Display, JetBrains Mono) |
| Hosting | GitHub Pages |

---

## 📝 Recent Changes

### v1.1.9 — Project-Wide Image Optimization Under 100 KB *(Sep 16, 2026)*

- **Platform-Wide Image Compression** — Scanned all 106 images across the repository and compressed every image exceeding size limits. 
- **Major Asset Reductions** — Optimized `images/auth_team_collab.jpg` from **878.98 KB** down to **79.87 KB** (-90.9% size reduction). Compressed 28 WebP assets from 95–99.9 KB down to 50–91 KB while preserving high-definition visual fidelity.
- **Strict Size Compliance** — 100% of images across all folders are now guaranteed to be strictly under 100 KB (and under 100,000 bytes).

### v1.1.8 — Role Selector Mobile View Overflow Fix *(Sep 16, 2026)*

- **Role Dropdown Overflow Prevention (`login.html`)** — Resolved mobile text overflow on the account role selector (`#auth-role`). Implemented adaptive role labeling (`Learner` & `Administrator` on mobile `<= 640px`, and descriptive titles on larger desktop viewports) to eliminate container clipping and awkward line wrapping.
- **Custom Chevron & Geometry Styling (`css/auth-modern.css`, `css/components.css`, `components.css`)** — Applied `appearance: none;`, `text-overflow: ellipsis;`, and dedicated `padding-right: 2.75rem` with an embedded SVG chevron arrow, ensuring role names never collide with the dropdown icon or push past auth card boundaries.
- **Verified Route Integrity (`login.html`)** — Validated that selecting `Administrator` routes to `admin-dashboard.html` and `Learner` routes to `user-dashboard.html` with zero regression.

### v1.1.7 — Dashboard Accreditations & Cluster Rebalance Buttons 404 Routing (Laptop & Mobile Responsive) *(Sep 16, 2026)*

- **Learner Dashboard Cryptographic Accreditations (`user-dashboard.html`)** — Made the marked `Download Certificate PDF ↗` action link under *Section 8.2 • Verified Badges* fully clickable with elevated `z-index: 10`, `touch-action: manipulation;`, cyan badge hover styling, and `#badges-rankings` section tracking to `404.html`.
- **Admin Command Cloud Sandbox Pod Clusters (`admin-dashboard.html`)** — Upgraded all 3 marked `Rebalance Cluster` buttons under *Section 2 • Active Regions* (`US-WEST (OREGON)`, `EU-CENTRAL (FRANKFURT)`, `AP-SOUTH (SINGAPORE)`) to be reliably clickable across desktop, laptop, and mobile viewports with `#pod-clusters` tracking to `404.html`.
- **Responsive Touch & Card Preservations (`css/components.css`, `components.css`)** — Added dedicated `.cert-pdf-link` and `.cluster-rebalance-btn` classes ensuring touch taps trigger smoothly above 3D tilt perspective overlays.
- **Preserved 404 Error Page Controls (`404.html`)** — Native error page controls (`Back to Home` and `Go Back`) remain completely undisturbed, intact, and responsive.

### v1.1.6 — Instant FAQ Accordion Interactive Clickability (Laptop & Mobile Responsive) *(Sep 16, 2026)*

- **Interactive FAQ Accordion (`contact.html`)** — Upgraded all 4 marked FAQ questions with direct `onclick="window.toggleFaq(this)"`, `aria-expanded` state tracking, and touch-action manipulation. Ensured that clicking anywhere on the question bar or toggle indicator instantly expands/collapses the corresponding answer.
- **Cross-Platform Responsive Mechanics (`css/components.css`, `components.css`)** — Elevated `.sqs-faq-question` with `z-index: 5`, mobile-tailored padding (1.15rem 1.25rem), smooth 500px cubic-bezier expansion, and 45-degree rotation for the `+` / `×` indicator.
- **Race-Condition & Dual-Listener Safeguard (`js/app.js`, `app.js`)** — Harmonized global `window.toggleFaq()` with idempotent listener registration to guarantee exactly one toggle per interaction.

### v1.1.5 — Regional Developer Meetups RSVP Buttons 404 Routing (Laptop & Mobile) *(Sep 16, 2026)*

- **Contact Page Regional Developer Meetups (`contact.html`)** — Made all 3 marked `RSVP Free Pass →` buttons (`LLM Kernel Optimization Summit - SF`, `Zero-Trust Cloud Mesh Workshop - London`, `High-Velocity WebGPU Graphics - Tokyo`) fully clickable in laptop and mobile views. Configured `position: relative; z-index: 10;`, `touch-action: manipulation;`, responsive click handlers, and `#meetups` section tracking to `404.html`.
- **Preserved 404 Route Integrity (`404.html`)** — Native error page controls (`Back to Home` and `Go Back`) remain completely undisturbed, intact, and responsive.

### v1.1.4 — Action Buttons & Direct Channels 404 Routing (Laptop & Mobile Responsive) *(Sep 16, 2026)*

- **Home Page Skill Tree Nodes & Explore Links (`index.html`)** — All 4 skill node badges (`FOUNDATION`, `SCALING`, `FINE-TUNING`, `AUTONOMY`) and all 4 `Explore Node →` action buttons are fully clickable with `z-index: 10`, touch-action manipulation, and section tracking to `404.html`.
- **Home Page Cloud Sandbox CTA (`index.html`)** — Made the primary `Provision Your Free Sandbox ↗` action button clickable on both laptop and mobile viewports, routing to `404.html` with section tracking `#cloud-sandbox`.
- **About Page Faculty Credential Badges (`about.html`)** — Ensured `14 Nature & NeurIPS Publications ↗`, `ACM Fellow & Core Kubernetes Contributor ↗`, and `IEEE Educational Innovation Award ↗` have relative positioning, elevated z-index, touch padding, and route to `404.html`.
- **Blog Page Podcast & Community RFC Action Buttons (`blog.html`)** — Both `Play Episode (44m)` and `Play Episode (38m)` audio buttons, along with `RFC-104` and `RFC-105` `Join Discussion` buttons, route directly to `404.html`.
- **Contact Page Direct Access Channels & Emails (`contact.html`)** — Both the entire interactive channel cards (`Enterprise Solutions Pod`, `Telemetry & Lab Operations`, `Mentor Faculty Admissions`) and individual email links (`enterprise@stackly.io`, `support@stackly.io`, `mentors@stackly.io`) route to `404.html` with responsive tap states and elevated z-index.
- **Undisturbed 404 Page Controls (`404.html`)** — Native error page controls (`Back to Home` and `Go Back`) remain completely undisturbed, intact, and responsive.

### v1.1.3 — Auth Password Defaults Removed & Confirm Password Enabled *(Sep 16, 2026)*

- **Default Passwords Removed** — Removed pre-filled hardcoded passwords from both `login.html` and `signup.html` password fields, replacing them with clear descriptive placeholders.
- **Confirm Password Field & Button (Sign Up)** — Added dedicated "Confirm Password" input field with visibility toggle and live match validation on `signup.html`. Explicitly updated and enabled the primary action button to "Confirm Password".

### v1.1.2 — FAQ Accordion Clickability & State Fix *(Sep 16, 2026)*

- **FAQ Accordion Interactions (Contact)** — Resolved dual-listener race condition on `.sqs-faq-question` elements in `contact.html` and `app.js`. All 4 questions now expand and collapse smoothly with active rotation indicators and hover feedback.
- **Idempotent Accordion Controller** — Added `dataset.faqInit` guards to `initFaqAccordion()` ensuring safe, single-listener execution across all script lifecycles.

### v1.1.1 — Interactive Badge Routing & 404 Error Page Linking *(Sep 16, 2026)*

- **Skill Tree Progression Badges (Home)** — Converted skill progression badges (`FOUNDATION`, `SCALING`, `FINE-TUNING`, `AUTONOMY`) into interactive clickable links routing to `404.html` with section tracking (`#skill-trees`) and glowing hover states.
- **Faculty Credential Badges (About)** — Enhanced research faculty publication badges (`14 Nature & NeurIPS Publications`, `ACM Fellow & Core Kubernetes Contributor`, `IEEE Educational Innovation Award`) linking to `404.html` with `#fellows` return position persistence.
- **Community RFC Discussion Buttons (Blog)** — Connected `RFC-104` and `RFC-105` "Join Discussion" action buttons to `404.html` with `#rfcs` return position tracking.
- **Preserved 404 Route Integrity** — Kept all existing 404 error page buttons ("Back to Home", "Go Back") and platform-wide error routes completely undisturbed and fully functional with GitHub Pages URL sanitization.

### v1.1.0 — Layout & Spacing Fixes *(Sep 10, 2026)*

- **Dashboard sections** — Removed `3rem` gap between dashboard sections (`gap: 0`) so all 10 sections sit flush with no whitespace between them. Also zeroed out `margin-top`/`margin-bottom` on `.dashboard-main > section`.
- **Footer columns** — Increased column spacing in `.footer-main-grid` from `gap: 4.5rem` → `gap: 7rem` for cleaner visual separation between the four footer sections (Brand, Quick Links, Get In Touch, Stay In The Loop).

---

## 📄 License

MIT © 2026 STACKLY — Built with ❤️ by the Stackly Team
