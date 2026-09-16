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

### v1.1.14 — Full 3D Elevation & Fail-Safe 404 Navigation for Blog & Contact Marked Buttons *(Sep 16, 2026)*

- **Blog Page Audio Podcast Buttons (`blog.html`)** — Upgraded `Play Episode (44m)` (Episode #46) and `Play Episode (38m)` (Episode #47) buttons with `handlePlatform404(event, 'podcast')`, `.podcast-play-btn` class, `position: relative; z-index: 25;`, and `transform: translateZ(30px);` to eliminate 3D card perspective touch interception on mobile devices.
- **Blog Page Community RFCs (`blog.html`)** — Upgraded `Join Discussion` buttons on RFC-104 (WebGPU Track) and RFC-105 (Cryptographic Hashes) with `handlePlatform404(event, 'rfcs')`, `.rfc-join-btn` class, `z-index: 25`, and `transform: translateZ(30px);`.
- **Contact Page Direct Access Channels (`contact.html`)** — Upgraded all 3 direct access channel cards and email link buttons (`enterprise@stackly.io →`, `support@stackly.io →`, `mentors@stackly.io →`) with `handlePlatform404(event, 'direct-access')`, `z-index: 25`, and `transform: translateZ(30px);` for reliable mobile tap registration across card and link boundaries.
- **Contact Page Regional Meetup Passes (`contact.html`)** — Upgraded all 3 regional meetup buttons (`RSVP Free Pass →` for San Francisco, London, and Tokyo) with `handlePlatform404(event, 'meetups')`, `.rsvp-pass-btn` class, `z-index: 25`, and `transform: translateZ(30px);`.
- **CSS 3D Plane Elevation & Mobile Padding (`css/components.css`, `components.css`)** — Elevated `.podcast-play-btn`, `.rfc-join-btn`, `.channel-card`, `.channel-email-link`, and `.rsvp-pass-btn` with `transform: translateZ(30px) !important;` and `z-index: 25 !important;`, plus mobile hit target optimizations.
- **Zero Disturbance to Other 404 Error Page Buttons** — All existing 404 error page navigation buttons and controls platform-wide remain completely undisturbed, active, and fully functional.

### v1.1.13 — 3D Tilt Plane Elevation & Touch Target Optimization for Marked 404 Buttons *(Sep 16, 2026)*

- **GPU 3D Plane Elevation (`css/components.css`, `components.css`)** — Elevated all marked interactive buttons (`.skill-node-badge`, `.explore-node-btn`, `.faculty-badge-link`, `.sqs-btn-solid-white`) with `transform: translateZ(30px) !important;` and `z-index: 25 !important;`. This completely resolves mobile and emulator touch-hit occlusion where 3D perspective card rotations intercepted child taps.
- **Enhanced Mobile Hit Targets** — Added mobile media query styles expanding `.explore-node-btn` and `.skill-node-badge` hit targets with `padding: 0.4rem 0.85rem` to `0.55rem 1rem`, background pill contrast, and rounded borders.
- **Fail-Safe Global Navigation Function (`js/app.js`, `app.js`)** — Introduced `window.handlePlatform404(e, section)` with safe `e.preventDefault()`, `e.stopPropagation()`, exception-wrapped `sessionStorage` updates, and guaranteed routing to `404error.html`.
- **Direct Mobile Touch Handlers** — Attached `touchend` delegation in both capture and DOM stages across all marked skill tree badges, explore buttons, and faculty credential links for instant 0ms touch response.
- **Preserved Route Integrity** — Native controls (`Back to Home` & `Go Back`) and all other existing buttons throughout the platform remain completely untouched and operational.

### v1.1.12 — Mobile View Multi-Device Button Checklist Verification *(Sep 16, 2026)*

- **Home Page Mobile Functionality (`index.html`)**:
  - Verified and enabled all 4 `Explore Node →` buttons and corresponding progression badges (`FOUNDATION`, `SCALING`, `FINE-TUNING`, `AUTONOMY`) under *Section 6 • Dynamic Cognitive Skill Trees* with `#skill-trees` return anchor tracking to `404error.html`.
  - Verified and enabled `Provision Your Free Sandbox ↗` under *Section 7 • Real-Time Architect Pairing* with `#cloud-sandbox` return tracking.
- **About Page Mobile Functionality (`about.html`)**:
  - Verified and enabled `14 Nature & NeurIPS Publications ↗` (Dr. Elena Rostova) and `ACM Fellow & Core Kubernetes Contributor ↗` (Kenji Takahashi) under *Section 6 • Global Academic & Research Fellows* with `#fellows` return tracking to `404error.html`.
- **Blog Page Mobile Functionality (`blog.html`)**:
  - Verified and enabled both podcast episodes (`Play Episode (44m)` & `Play Episode (38m)`) under *Section 7 • Audio Dispatches* with `#podcast` return tracking to `404error.html`.
  - Verified and enabled both community RFC action buttons (`Join Discussion` for RFC-104 & RFC-105) under *Section 8 • Open Research Proposals* with `#rfcs` return tracking.
- **Contact Page Mobile Functionality (`contact.html`)**:
  - Verified and enabled all 3 Direct Access Channels & buttons (`enterprise@stackly.io`, `support@stackly.io`, `mentors@stackly.io`) with `#direct-access` return tracking to `404error.html`.
  - Verified and enabled all 4 interactive FAQ Question accordion buttons with touch-action manipulation, smooth height expansion, and active icon rotation (`+` / `×`).
  - Verified and enabled all 3 Regional Developer Meetup passes (`RSVP Free Pass →` for SF, London, and Tokyo) with `#meetups` return tracking to `404error.html`.
- **Sign Up Page Mobile Functionality (`signup.html`)**:
  - Cleaned default values from password inputs; explicit Confirm Password input field with live match verification (`✓ Passwords match`).
  - Enabled primary `<button type="submit" ... id="btnSubmitSignup"><span>Confirm Password</span></button>` with validation and redirection to `login.html`.
- **Learner Dashboard Mobile Functionality (`user-dashboard.html`)**:
  - Verified and enabled `Download Certificate PDF ↗` under *Section 8.2 • Verified Badges* with `#badges-rankings` tracking to `404error.html`.
- **Admin Dashboard Mobile Functionality (`admin-dashboard.html`)**:
  - Verified and enabled all 3 `Rebalance Cluster` buttons under *Section 2 • Active Regions* (`US-WEST`, `EU-CENTRAL`, `AP-SOUTH`) with `#pod-clusters` tracking to `404error.html`.
- **Zero Disturbance to Other 404 Error Page Buttons**:
  - Native error page controls (`Back to Home` & `Go Back` on `404.html` and `404error.html`) and all other existing buttons platform-wide remain completely undisturbed, functional, and touch-responsive.

### v1.1.11 — Mobile 404 Error Page Buttons Touch Responsiveness & Fail-Safe Navigation *(Sep 16, 2026)*

- **Mobile Viewport 404 Responsiveness (`404.html` & `404error.html`)** — Expanded the mobile adaptation breakpoint from `max-width: 480px` to `max-width: 768px`. This ensures all smartphones, tablets, and testing viewports (such as 502px) stack buttons cleanly with full touch targets (`max-width: 320px`, `padding: 1rem 1.8rem`).
- **Instant Mobile Touch Response** — Added direct `touchend` event listeners alongside standard `onclick` handlers, plus `touch-action: manipulation;`, `-webkit-tap-highlight-color: rgba(...)`, and elevated `position: relative; z-index: 10;` for zero-lag touch registration on both `Back to Home` (`#btnHome404`) and `Go Back` (`#btnGoBack404`).
- **Fail-Safe "Go Back" Navigation** — Rewrote navigation handling to prevent frozen taps when accessed directly without prior session history (e.g. opened in new tab or external link). The button immediately checks `sessionStorage` for the last active STACKLY page and section, falls back to `document.referrer`, verifies `window.history`, and defaults safely to `handleHomeNav()` if no previous page exists.
- **Fail-Safe "Back to Home" Navigation** — Upgraded `handleHomeNav(e)` with repository name detection on GitHub Pages (`window.location.origin + '/' + repo + '/index.html'`) and local filesystem fallback (`index.html`).
- **Global Innovation Hubs Contact Directions (`contact.html`)** — Added elevated `z-index: 10`, `touch-action: manipulation;`, and tap highlight to the 3 `Directions ↗` links under Global Innovation Hubs without altering existing layouts or styles.
- **Zero Disturbance to Other Buttons** — All existing 404-routing buttons and platform interactions across all pages remain completely untouched and fully functional.

### v1.1.10 — Mobile & Multi-Device 404error.html Routing for All Marked Buttons *(Sep 16, 2026)*

- **Dedicated `404error.html` Support** — Provisioned `404error.html` page matching `404.html` with full brand aesthetic, dynamic radial gradients, and responsive navigation controls (`Back to Home` & `Go Back`).
- **All Marked Buttons Routed to `404error.html` on Mobile, Tablet & Desktop** — Upgraded every marked button across all 6 platform pages to route to `404error.html` on mobile viewports as well as tablet, laptop, and desktop:
  - **Landing Page (`index.html`)**: All 4 skill node progression badges (`FOUNDATION`, `SCALING`, `FINE-TUNING`, `AUTONOMY`), all 4 `Explore Node →` action buttons, and the primary `Provision Your Free Sandbox ↗` CTA button.
  - **About Page (`about.html`)**: All 3 faculty credential badges (`14 Nature & NeurIPS Publications ↗`, `ACM Fellow & Core Kubernetes Contributor ↗`, `IEEE Educational Innovation Award ↗`).
  - **Blog Page (`blog.html`)**: Both podcast episodes (`Play Episode (44m)` & `Play Episode (38m)`) and both community RFC buttons (`Join Discussion`).
  - **Contact Page (`contact.html`)**: All 3 Direct Access cards & emails (`enterprise@stackly.io`, `support@stackly.io`, `mentors@stackly.io`) and all 3 Regional Developer Meetup passes (`RSVP Free Pass →`).
  - **User Dashboard (`user-dashboard.html`)**: The `Download Certificate PDF ↗` accreditation button under *Section 8.2 • Verified Badges*.
  - **Admin Dashboard (`admin-dashboard.html`)**: All 3 `Rebalance Cluster` buttons under *Section 2 • Active Regions* (`US-West`, `EU-Central`, `AP-South`).
- **Zero Layout or Design Disturbance** — All button styling, colors, padding, typography, animations, and layouts remain completely unchanged.
- **Undisturbed Native 404 Controls & Existing Buttons** — Native buttons on the 404 page (`Back to Home` and `Go Back`) and all other existing buttons throughout the platform remain completely untouched and fully functional.
- **Mobile Touch Optimization** — Applied `touch-action: manipulation;`, `-webkit-tap-highlight-color: rgba(...)`, and elevated `position: relative; z-index: 10;` to ensure instant, reliable touch responsiveness over 3D card tilt and perspective transformations.

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
