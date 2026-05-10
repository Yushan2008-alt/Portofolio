# PRD ADDENDUM — Design Direction & Backend Specialist Content
**Melengkapi:** PRD_Portfolio_Yushan.md v1.0  
**Update:** Mei 2026 — v1.1

> Dokumen ini adalah **addendum** dari PRD utama. Semua spesifikasi di dokumen ini **menggantikan atau melengkapi** bagian terkait di PRD v1.0.

---

## A. DESIGN PHILOSOPHY UPDATE

### A.1 Filosofi Desain Baru: "Professional Playground"

Tujuannya adalah website yang **membuat HRD betah**, bukan sekadar membuat mereka terkesan. Formula:

```
Professional Playground =
  Dark Mode Elegance       → Serius dan berwibawa
  + Bento Grid Layout      → Modern, terasa seperti produk tech 2025
  + Micro-interactions     → Fun, responsive, hidup
  + Terminal Aesthetic     → Backend identity yang autentik
  + Grain Texture Overlay  → Tactile, premium, tidak flat membosankan
  + Color-coded Tech Badges → Informasi yang juga indah dilihat
```

**Referensi visual:**
- Linear.app (product feel yang clean dan dark)
- Vercel Dashboard (dense information tapi tetap breathable)
- Raycast.com (dark, fast, developer-oriented)
- Josh W. Comeau (playful developer portfolio)

---

### A.2 "Fun" — Definisi dalam Konteks Ini

"Fun" bukan berarti ramai atau cartoonish. Ini berarti:

| Aspek | Boring ❌ | Fun ✅ |
|---|---|---|
| Loading screen | Spinner biasa | Terminal boot sequence dengan teks kode |
| Hero section | "Halo, saya developer" | Terminal window dengan `$ whoami` |
| Skill display | Progress bar standar | Color-coded badge system dengan efek glow |
| Section divider | Garis horizontal | `// section_name.js` style label |
| Hover pada card | Box shadow biasa | Subtle glow + translateY + border color change |
| Stats | Angka statis | Count-up animation saat scroll ke section |
| Cursor | Default | Dot + ring lag effect (desktop only) |
| Background | Polos hitam | Noise texture + ambient aurora gradient |
| Project card | Gambar + teks | Screenshot + hover overlay dengan quick links |

---

## B. VISUAL DESIGN SYSTEM (FULL SPEC)

### B.1 Background System

```css
/* LAYER 1: Base */
body { background: #030305; }

/* LAYER 2: Noise/Grain Texture (subtle) */
body::before {
  content: '';
  position: fixed; inset: 0; z-index: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,..."); /* SVG noise filter */
  opacity: 0.035; /* sangat subtle — grain, bukan nois */
}

/* LAYER 3: Ambient Radial Gradients */
.ambient-layer {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background:
    radial-gradient(ellipse 60% 50% at 10% 10%, rgba(59,130,246,0.08) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 90% 80%, rgba(139,92,246,0.06) 0%, transparent 60%);
}

/* LAYER 4: Grid Lines (opsional, sangat subtle) */
.grid-layer {
  position: fixed; inset: 0; z-index: 1; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
}
```

**SVG Noise Filter untuk Grain:**
```html
<!-- Taruh di <body> awal, invisible -->
<svg width="0" height="0" style="position:absolute;">
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
</svg>

<style>
body::before {
  filter: url(#noise);
  background: rgba(255,255,255,1); /* putih yang di-noise = grain */
  mix-blend-mode: overlay;
  opacity: 0.04;
}
</style>
```

---

### B.2 Color Palette Lengkap

```css
:root {
  /* === BACKGROUNDS === */
  --bg-base:      #030305;   /* body background */
  --bg-surface:   #0a0a12;   /* card background */
  --bg-elevated:  #0f0f1a;   /* modal, dropdown */
  --bg-input:     rgba(255,255,255,0.04);

  /* === TEXT === */
  --text-primary:   #ffffff;
  --text-secondary: #d1d5db;   /* neutral-300 */
  --text-muted:     #6b7280;   /* neutral-500 */
  --text-hint:      rgba(255,255,255,0.25);

  /* === ACCENT (Dynamic) === */
  --primary:         #3b82f6;
  --primary-glow:    rgba(59,130,246,0.25);
  --primary-dim:     rgba(59,130,246,0.08);
  --primary-border:  rgba(59,130,246,0.25);

  /* === BORDERS === */
  --border:          rgba(255,255,255,0.07);
  --border-hover:    rgba(255,255,255,0.13);
  --border-active:   rgba(255,255,255,0.2);

  /* === TECH BADGE COLORS (fixed, tidak berubah dengan theme) === */
  --clr-php:     #818cf8;  /* indigo */
  --clr-laravel: #f87171;  /* red */
  --clr-node:    #4ade80;  /* green */
  --clr-python:  #38bdf8;  /* sky */
  --clr-mysql:   #fb923c;  /* orange */
  --clr-pgsql:   #67e8f9;  /* cyan */
  --clr-api:     #c084fc;  /* purple */
  --clr-git:     #f1f5f9;  /* white-ish */
  --clr-docker:  #60a5fa;  /* blue */
  --clr-linux:   #fbbf24;  /* amber */
  --clr-js:      #facc15;  /* yellow */
  --clr-html:    #fb7185;  /* rose */
  --clr-css:     #818cf8;  /* indigo */
  --clr-figma:   #a78bfa;  /* violet */

  /* === STATUS === */
  --success:  #10b981;
  --error:    #ef4444;
  --warning:  #f59e0b;
  --info:     #3b82f6;
}
```

---

### B.3 Typography System

```css
/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --font-display: 'Syne', sans-serif;      /* Heading, logo, nama */
  --font-body:    'DM Sans', sans-serif;   /* Paragraf, deskripsi */
  --font-mono:    'JetBrains Mono', monospace; /* Kode, badge, label */
}

/* Type Scale */
.text-hero    { font: 700 clamp(2.5rem,6vw,4.5rem)/1.05 var(--font-display); letter-spacing: -0.03em; }
.text-h2      { font: 600 clamp(1.75rem,4vw,2.5rem)/1.1  var(--font-display); letter-spacing: -0.02em; }
.text-h3      { font: 500 1.25rem/1.3 var(--font-display); }
.text-body    { font: 400 1rem/1.7 var(--font-body); }
.text-sm      { font: 400 0.875rem/1.6 var(--font-body); }
.text-mono    { font: 400 0.75rem/1 var(--font-mono); letter-spacing: 0.02em; }
.text-label   { font: 500 0.6875rem/1 var(--font-mono); letter-spacing: 0.08em; text-transform: uppercase; }

/* Gradient Text (nama, heading utama) */
.gradient-text {
  background: linear-gradient(135deg, #ffffff 30%, var(--primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

### B.4 Card Variants

**Glass Card (default):**
```css
.card {
  background: rgba(10, 10, 18, 0.85);
  border: 0.5px solid var(--border);
  backdrop-filter: blur(20px);
  border-radius: 14px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative; overflow: hidden;
}

/* Noise texture pada setiap card */
.card::before {
  content: ''; position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise */
  opacity: 0.03; pointer-events: none; border-radius: inherit;
}

/* Top gradient pada hover */
.card::after {
  content: ''; position: absolute;
  inset: 0; border-radius: inherit;
  background: linear-gradient(135deg, var(--primary-dim) 0%, transparent 60%);
  opacity: 0; transition: opacity 0.3s ease;
  pointer-events: none;
}

.card:hover {
  border-color: var(--border-hover);
  transform: translateY(-3px);
  box-shadow:
    0 20px 40px -15px rgba(0,0,0,0.6),
    0 0 0 0.5px var(--border-hover);
}
.card:hover::after { opacity: 1; }
```

**Glow Card (untuk achievement/featured):**
```css
.card-glow {
  /* Sama dengan .card, tambah: */
  box-shadow: 0 0 40px -10px var(--primary-glow);
}
.card-glow:hover {
  box-shadow:
    0 20px 60px -15px rgba(0,0,0,0.7),
    0 0 60px -5px var(--primary-glow);
}
```

**Gradient Border Card (untuk highlighted section):**
```css
.card-gradient-border {
  background: var(--bg-surface);
  border-radius: 14px;
  position: relative;
  padding: 1px; /* Untuk border gradient */
}
.card-gradient-border::before {
  content: ''; position: absolute; inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, var(--primary), transparent 50%, rgba(139,92,246,0.5));
  padding: 0.5px;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
```

---

### B.5 Button System

```css
/* PRIMARY */
.btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.75rem 1.5rem; border-radius: 8px;
  font: 500 0.875rem/1 var(--font-body);
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  cursor: pointer; position: relative; overflow: hidden;
}

.btn-primary {
  background: var(--primary); color: white;
  box-shadow: 0 0 20px var(--primary-glow);
}
.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 0 30px var(--primary-glow), 0 8px 20px -8px rgba(0,0,0,0.5);
}

/* Shimmer sweep on hover */
.btn-primary::before {
  content: ''; position: absolute; top: 0; left: -150%;
  width: 50%; height: 100%; skewX(-15deg);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
  transition: left 0.5s ease;
}
.btn-primary:hover::before { left: 200%; }

/* GHOST */
.btn-ghost {
  background: transparent;
  border: 0.5px solid var(--border);
  color: var(--text-secondary);
}
.btn-ghost:hover {
  border-color: var(--primary-border);
  color: var(--text-primary);
  transform: translateY(-2px);
  box-shadow: 0 0 15px var(--primary-dim);
}

/* ICON BUTTON */
.btn-icon {
  width: 40px; height: 40px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg-input);
  border: 0.5px solid var(--border);
  color: var(--text-muted);
  transition: all 0.2s ease;
}
.btn-icon:hover {
  background: rgba(255,255,255,0.08);
  color: var(--text-primary);
  border-color: var(--border-hover);
  transform: scale(1.1);
}
```

---

### B.6 Tech Badge System (Warna per Teknologi)

```css
/* Base badge */
.badge {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 10px; border-radius: 999px;
  font: 400 0.6875rem/1 var(--font-mono);
  border: 0.5px solid;
  transition: all 0.2s ease;
}

/* Hover effect */
.badge:hover {
  transform: translateY(-1px) scale(1.05);
  box-shadow: 0 4px 12px -4px currentColor;
}

/* Per-tech colors */
.badge-php     { color: var(--clr-php);     border-color: rgba(129,140,248,0.25); background: rgba(129,140,248,0.06); }
.badge-laravel { color: var(--clr-laravel); border-color: rgba(248,113,113,0.25); background: rgba(248,113,113,0.06); }
.badge-node    { color: var(--clr-node);    border-color: rgba(74,222,128,0.25);  background: rgba(74,222,128,0.06);  }
.badge-python  { color: var(--clr-python);  border-color: rgba(56,189,248,0.25);  background: rgba(56,189,248,0.06);  }
.badge-mysql   { color: var(--clr-mysql);   border-color: rgba(251,146,60,0.25);  background: rgba(251,146,60,0.06);  }
.badge-pgsql   { color: var(--clr-pgsql);   border-color: rgba(103,232,249,0.25); background: rgba(103,232,249,0.06); }
.badge-api     { color: var(--clr-api);     border-color: rgba(192,132,252,0.25); background: rgba(192,132,252,0.06); }
.badge-git     { color: #94a3b8;            border-color: rgba(148,163,184,0.2);  background: rgba(148,163,184,0.05); }
.badge-docker  { color: var(--clr-docker);  border-color: rgba(96,165,250,0.25);  background: rgba(96,165,250,0.06);  }
.badge-linux   { color: var(--clr-linux);   border-color: rgba(251,191,36,0.25);  background: rgba(251,191,36,0.06);  }
.badge-js      { color: var(--clr-js);      border-color: rgba(250,204,21,0.25);  background: rgba(250,204,21,0.06);  }
```

---

## C. HERO SECTION — BACKEND TERMINAL IDENTITY

Ini adalah differentiator utama — hero yang langsung menunjukkan identitas backend developer.

### C.1 Terminal Window Component

```html
<div class="terminal-window">
  <!-- Terminal Header Bar -->
  <div class="terminal-header">
    <div class="terminal-dots">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
    </div>
    <span class="terminal-title">bash — yushan@smktelkom</span>
  </div>

  <!-- Terminal Body -->
  <div class="terminal-body" id="terminal-output">
    <!-- Lines diisi via JS dengan typewriter effect -->
  </div>
</div>
```

**Terminal CSS:**
```css
.terminal-window {
  background: rgba(0,0,0,0.7);
  border: 0.5px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
}

.terminal-header {
  background: rgba(255,255,255,0.04);
  border-bottom: 0.5px solid rgba(255,255,255,0.06);
  padding: 10px 16px;
  display: flex; align-items: center; gap: 10px;
}

.terminal-dots { display: flex; gap: 6px; }
.dot { width: 10px; height: 10px; border-radius: 50%; }
.dot-red    { background: #ff5f57; }
.dot-yellow { background: #febc2e; }
.dot-green  { background: #28c840; }

.terminal-title {
  font-size: 11px; color: rgba(255,255,255,0.3);
  margin: 0 auto;
}

.terminal-body {
  padding: 16px;
  line-height: 1.7;
  color: rgba(255,255,255,0.55);
  min-height: 130px;
}

/* Color tokens untuk terminal */
.t-prompt { color: #10b981; }       /* green — username@host */
.t-path   { color: #60a5fa; }       /* blue — directory */
.t-cmd    { color: #ffffff; }        /* white — command */
.t-output { color: rgba(255,255,255,0.55); } /* dim — output */
.t-string { color: #34d399; }       /* mint — string value */
.t-number { color: #fb923c; }       /* orange — number */
.t-key    { color: #c084fc; }       /* purple — JSON key */
.t-cursor {
  display: inline-block; width: 8px; height: 14px;
  background: var(--primary); border-radius: 1px;
  vertical-align: middle;
  animation: cursor-blink 1.2s step-end infinite;
}
@keyframes cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }
```

**Terminal JavaScript — Boot Sequence:**
```javascript
const terminalLines = [
  { type: 'cmd',    text: '$ whoami' },
  { type: 'output', text: 'Yushan Saputra — Backend Developer · SMK Telkom Malang' },
  { type: 'cmd',    text: '$ cat skills.json' },
  { type: 'output', text: '{' },
  { type: 'json',   key: '  "primary"',   val: '["PHP", "Laravel", "Node.js"]' },
  { type: 'json',   key: '  "database"',  val: '["MySQL", "PostgreSQL"]' },
  { type: 'json',   key: '  "tools"',     val: '["Git", "Postman", "Linux CLI"]' },
  { type: 'output', text: '}' },
  { type: 'cmd',    text: '$ echo $STATUS' },
  { type: 'output', text: '🟢 Open to work · Magang tersedia' },
  { type: 'cursor', text: '$ ' },
];

function renderTerminal() {
  const output = document.getElementById('terminal-output');
  let lineIndex = 0;

  function typeNextLine() {
    if (lineIndex >= terminalLines.length) return;
    const line = terminalLines[lineIndex++];

    const el = document.createElement('div');
    // ... render berdasarkan type
    // gunakan setTimeout untuk stagger antar baris
    output.appendChild(el);
    setTimeout(typeNextLine, line.type === 'cmd' ? 600 : 250);
  }

  typeNextLine();
}

// Trigger saat loading screen selesai
window.addEventListener('load', () => setTimeout(renderTerminal, 1800));
```

---

## D. BENTO GRID LAYOUT SPEC

Layout Bento Grid adalah sistem grid asymmetric yang terlihat modern dan fun. Setiap section menggunakan kombinasi grid yang berbeda agar tidak monoton.

### D.1 Grid per Section

```css
/* Hero section: Grid 12 kolom */
.hero-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  gap: 12px;
}
.hero-main    { grid-column: 1 / 8; }    /* Headline + terminal */
.hero-sidebar { grid-column: 8 / 13; }   /* Profile card + stats */

/* About: 2 kolom + stats */
.about-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 16px;
}

/* Skills: Bento asymmetric */
.skills-bento {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 10px;
}
.skill-main   { grid-column: 1; grid-row: 1 / 3; } /* Tall card — backend skills */
.skill-stat-1 { grid-column: 2; grid-row: 1; }     /* Skill count */
.skill-stat-2 { grid-column: 3; grid-row: 1; }     /* Years */
.skill-extra-1{ grid-column: 2; grid-row: 2; }     /* Tools */
.skill-extra-2{ grid-column: 3; grid-row: 2; }     /* Soft skills */

/* Projects: 2 kolom equal */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

/* Achievements: 2 kolom asymmetric */
.achieve-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

/* Contact: 2 kolom */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

/* Mobile: semua single column */
@media (max-width: 768px) {
  .hero-grid, .about-grid, .skills-bento,
  .projects-grid, .achieve-grid, .contact-grid {
    grid-template-columns: 1fr;
  }
  .hero-main, .hero-sidebar,
  .skill-main, .skill-stat-1, .skill-stat-2,
  .skill-extra-1, .skill-extra-2 {
    grid-column: auto;
    grid-row: auto;
  }
}
```

---

## E. SECTION HEADER STYLE

Ganti label section yang biasa dengan style yang fun dan tech-forward:

```html
<!-- Ganti "01 / About" dengan ini: -->
<div class="section-header">
  <div class="section-line"></div>
  <div class="section-tag">
    <span class="section-comment">// </span>
    <span class="section-num">01</span>
    <span class="section-slash"> / </span>
    <span class="section-name">about_me.js</span>
  </div>
  <div class="section-line"></div>
</div>
```

```css
.section-header {
  display: flex; align-items: center; gap: 16px;
  margin-bottom: 24px;
}
.section-line {
  flex: 1; height: 0.5px;
  background: linear-gradient(90deg, transparent, var(--border), transparent);
}
.section-tag {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--text-muted);
  white-space: nowrap;
}
.section-comment { color: rgba(255,255,255,0.2); }
.section-num     { color: var(--primary); opacity: 0.7; }
.section-slash   { color: rgba(255,255,255,0.15); }
.section-name    { color: rgba(255,255,255,0.35); }
```

**Contoh per section:**
```
// 01 / about_me.js
// 02 / tech_stack.json
// 03 / featured_work/
// 04 / achievements.md
// 05 / education.json
// 06 / contact.sh
```

---

## F. SKILLS SECTION — BACKEND SPECIALIST VERSION

### F.1 Konten Skills yang Tepat untuk Backend RPL

**Ganti section Skills PRD v1.0 dengan ini:**

```
BACKEND (PRIMARY — tampilkan paling prominent):
  ✅ PHP (Native)                  → Level: Advanced
  ✅ Laravel / CodeIgniter         → Level: Intermediate-Advanced
  ✅ Node.js (Express.js)          → Level: Intermediate
  ✅ REST API Design               → Level: Intermediate
  ✅ Python (basic scripting)      → Level: Beginner-Intermediate

DATABASE:
  ✅ MySQL                         → Level: Intermediate-Advanced
  ✅ PostgreSQL                    → Level: Intermediate
  ✅ Database Design / ERD         → Level: Intermediate
  ✅ Query Optimization (basic)    → Level: Beginner

TOOLS & DEVOPS:
  ✅ Git & GitHub                  → Level: Intermediate
  ✅ Postman (API Testing)         → Level: Intermediate
  ✅ Linux CLI (basic commands)    → Level: Beginner
  ✅ VS Code                       → Level: Advanced
  ✅ XAMPP / Laragon               → Level: Intermediate

FRONTEND (SUPPORTING):
  ✅ HTML5                         → Level: Intermediate
  ✅ CSS3 / Bootstrap              → Level: Intermediate
  ✅ JavaScript (basic)            → Level: Beginner-Intermediate
  ✅ Blade Template (Laravel)      → Level: Intermediate

SOFT SKILLS:
  ✅ Problem Solving
  ✅ Teamwork
  ✅ Fast Learner
  ✅ Analytical Thinking
  ✅ Documentation
```

**PENTING:** Sesuaikan level dengan kemampuan nyata. Gunakan:
- `Beginner` → Pernah pakai tapi belum confident
- `Intermediate` → Bisa pakai dengan lookup dokumentasi
- `Advanced` → Bisa pakai dan troubleshoot tanpa bantuan

### F.2 Skill Card Layout (Bento Style)

```html
<!-- Card Utama: Backend Stack (tall card, sebelah kiri) -->
<div class="card skill-main">
  <div class="skill-card-header">
    <div class="skill-icon">{ }</div>
    <div>
      <div class="skill-card-title">Backend</div>
      <div class="skill-card-sub">Primary expertise</div>
    </div>
  </div>
  <div class="skill-list">
    <div class="skill-item">
      <span class="badge badge-php">PHP</span>
      <div class="skill-bar">
        <div class="skill-fill" style="width:80%;"></div>
      </div>
      <span class="skill-level">Advanced</span>
    </div>
    <!-- dst untuk Laravel, Node.js, REST API -->
  </div>
</div>

<!-- Card Kecil: Database -->
<div class="card skill-db">
  <div class="skill-card-title">Database</div>
  <div class="badge-cloud">
    <span class="badge badge-mysql">MySQL</span>
    <span class="badge badge-pgsql">PostgreSQL</span>
    <span class="badge badge-api">ERD Design</span>
  </div>
</div>

<!-- Card Kecil: Tools -->
<div class="card skill-tools">
  <div class="skill-card-title">Tools</div>
  <div class="badge-cloud">
    <span class="badge badge-git">Git</span>
    <span class="badge badge-linux">Linux CLI</span>
    <!-- dst -->
  </div>
</div>
```

---

## G. LOADING SCREEN — TERMINAL BOOT

Ganti loading screen biasa dengan terminal boot sequence:

```html
<div id="loading-screen">
  <div class="loading-terminal">
    <div class="loading-line" id="l1">
      <span class="t-prompt">system</span><span style="color:rgba(255,255,255,0.3)">@init</span>
      <span style="color:rgba(255,255,255,0.2)"> $ </span>
      <span id="l1-text"></span>
    </div>
    <div class="loading-line hidden" id="l2"></div>
    <div class="loading-line hidden" id="l3"></div>
    <div class="loading-progress">
      <div class="loading-bar" id="loading-bar"></div>
    </div>
    <div class="loading-percent" id="loading-pct">0%</div>
  </div>
</div>
```

**Boot Sequence Text:**
```javascript
const bootLines = [
  'Initializing portfolio v2.0...',
  'Loading assets... ✓',
  'Ready. Welcome.',
];
```

```css
#loading-screen {
  position: fixed; inset: 0; z-index: 9999;
  background: #030305;
  display: flex; align-items: center; justify-content: center;
  transition: opacity 0.8s ease, visibility 0.8s ease;
}
#loading-screen.done { opacity: 0; visibility: hidden; }

.loading-terminal {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  width: min(400px, 90vw);
}
.loading-line { color: rgba(255,255,255,0.5); margin-bottom: 8px; min-height: 1.4em; }
.loading-line.hidden { display: none; }

.loading-progress {
  margin-top: 20px;
  height: 2px;
  background: rgba(255,255,255,0.08);
  border-radius: 999px;
  overflow: hidden;
}
.loading-bar {
  height: 100%; width: 0%;
  background: var(--primary);
  border-radius: 999px;
  transition: width 0.1s linear;
  box-shadow: 0 0 8px var(--primary);
}
.loading-percent {
  margin-top: 8px;
  font-size: 0.6875rem;
  color: var(--primary);
  letter-spacing: 0.1em;
}
```

---

## H. MICRO-INTERACTIONS (Fun Details)

Ini yang membuat website terasa "hidup":

### H.1 Magnetic Button Effect
```javascript
// Tombol yang "menarik" kursor saat hover dekat
document.querySelectorAll('.btn-magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});
```

### H.2 Scramble Text Effect (Hover pada Heading)
```javascript
// Teks berubah jadi karakter acak sebentar lalu kembali normal
function scrambleText(element) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%';
  const original = element.textContent;
  let iteration = 0;

  const interval = setInterval(() => {
    element.textContent = original.split('').map((char, i) => {
      if (i < iteration) return original[i];
      if (char === ' ') return ' ';
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');

    if (iteration >= original.length) clearInterval(interval);
    iteration += 1/3;
  }, 30);
}

document.querySelectorAll('.scramble-hover').forEach(el => {
  el.addEventListener('mouseenter', () => scrambleText(el));
});
```

### H.3 Count-Up Animation (Stats)
```javascript
function countUp(element, target, duration = 1500) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + '+';
    }
  }, 16);
}

// Trigger saat section masuk viewport
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        countUp(el, parseInt(el.dataset.count));
      });
      statsObserver.unobserve(entry.target);
    }
  });
});
```

### H.4 Card 3D Tilt Effect (Subtle)
```javascript
document.querySelectorAll('.card-tilt').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `
      perspective(800px)
      rotateY(${x * 8}deg)
      rotateX(${-y * 8}deg)
      translateY(-4px)
    `;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
```

### H.5 Smooth Reveal Stagger
```javascript
// Stagger reveal dengan delay berbeda per item
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.children];
      const index = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${index * 80}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
```

---

## I. HOVER STATES — PROJECT CARD

Project card harus punya hover yang kaya:

```html
<div class="proj-card card card-tilt">
  <div class="proj-thumbnail">
    <img src="..." alt="..." loading="lazy">
    <!-- Overlay muncul saat hover -->
    <div class="proj-overlay">
      <a href="#" class="btn-icon" title="GitHub">GH</a>
      <a href="#" class="btn-icon" title="Live Demo">↗</a>
    </div>
  </div>
  <!-- ...rest of card -->
</div>
```

```css
.proj-thumbnail {
  position: relative; overflow: hidden;
  border-radius: 10px; aspect-ratio: 16/10;
}
.proj-thumbnail img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.5s ease;
}
.proj-overlay {
  position: absolute; inset: 0;
  background: rgba(3,3,5,0.75);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center; gap: 12px;
  opacity: 0; transition: opacity 0.3s ease;
}
.proj-card:hover .proj-thumbnail img { transform: scale(1.05); }
.proj-card:hover .proj-overlay { opacity: 1; }
```

---

## J. FOOTER — FUN TOUCH

```html
<footer>
  <div class="footer-terminal">
    <span class="t-prompt">yushan</span>
    <span style="color:rgba(255,255,255,0.2)">@portfolio</span>
    <span style="color:rgba(255,255,255,0.15)"> $ </span>
    <span style="color:rgba(255,255,255,0.4)">echo "Thanks for visiting! 👋"</span>
  </div>
  <div class="footer-output">"Thanks for visiting! 👋"</div>

  <div class="footer-links">
    <!-- Nav links -->
  </div>

  <div class="footer-status">
    <div class="status-dot"></div>
    <span>All systems operational</span>
  </div>

  <div class="footer-copy">
    © 2025 Yushan Saputra · Built with ❤️ &amp; ☕ in Malang
  </div>
</footer>
```

---

## K. ABOUT SECTION — IDENTITAS BACKEND

Update teks about section agar lebih spesifik dan autentik untuk Backend developer RPL:

```
Versi template (yang harus diganti):
"As a Backend Developer, I act as a 'behind-the-scenes architect'..."

Versi yang lebih kuat dan personal:
"Saya adalah siswa RPL kelas [XII] di SMK Telkom Malang dengan
konsentrasi pada backend development. Selama [X] tahun belajar
coding, saya menemukan bahwa bagian paling menarik dari membangun
sebuah aplikasi bukan hanya yang terlihat — tapi logika dan
sistem yang membuatnya bekerja di balik layar.

Saya fokus membangun REST API yang clean, merancang struktur
database yang efisien, dan memastikan data mengalir dengan
aman antara server dan client. Buat saya, backend yang baik
adalah fondasi dari produk digital yang baik.

Saat ini saya aktif mengerjakan proyek-proyek praktis dan
terbuka untuk kesempatan magang atau kerja full-time sebagai
Backend Developer."
```

**Fun element di About:** Tambahkan "Fun Facts" card kecil:
```
⚡ Debugging selama 3 jam ternyata masalahnya titik koma
☕ Produktivitas ∝ jumlah kopi yang diminum
🌙 Best code ditulis antara jam 10 malam - 2 pagi
📚 Bisa membaca dokumentasi lebih cepat dari novel
```

---

## L. CHECKLIST TAMBAHAN (Update dari v1.0)

### Design Checklist
- [ ] Noise grain texture terlihat tapi tidak mengganggu (opacity 0.03-0.05)
- [ ] Ambient aurora gradient ada di background
- [ ] Tech badge setiap teknologi punya warna yang berbeda dan konsisten
- [ ] Terminal boot sequence di loading screen berjalan smooth
- [ ] Terminal window di hero ada dan menggunakan typewriter effect
- [ ] Section header menggunakan format `// XX / nama_section.ext`
- [ ] Card hover state punya glow + translateY yang smooth
- [ ] Stats section menggunakan count-up animation
- [ ] Scramble text effect aktif pada minimal 1 heading (opsional tapi fun)
- [ ] Magnetic button effect aktif pada tombol CTA utama
- [ ] Card 3D tilt effect aktif pada project cards

### Backend Content Checklist
- [ ] Skills section menonjolkan PHP/Laravel/Node.js sebagai primary
- [ ] Database section ada (MySQL, PostgreSQL)
- [ ] "REST API" disebutkan di hero tagline atau about
- [ ] Setiap project card menyertakan context backend-nya (API, database schema, dsb)
- [ ] Terminal window di hero akurat mencerminkan stack yang dipakai

---

*PRD Addendum v1.1 — Gunakan bersama PRD_Portfolio_Yushan.md v1.0*  
*Design direction: "Professional Playground" — Fun & Modern, Professional & Elegant*
