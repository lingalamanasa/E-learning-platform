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

### v1.1.0 — Layout & Spacing Fixes *(Sep 10, 2026)*

- **Dashboard sections** — Removed `3rem` gap between dashboard sections (`gap: 0`) so all 10 sections sit flush with no whitespace between them. Also zeroed out `margin-top`/`margin-bottom` on `.dashboard-main > section`.
- **Footer columns** — Increased column spacing in `.footer-main-grid` from `gap: 4.5rem` → `gap: 7rem` for cleaner visual separation between the four footer sections (Brand, Quick Links, Get In Touch, Stay In The Loop).

---

## 📄 License

MIT © 2026 STACKLY — Built with ❤️ by the Stackly Team
