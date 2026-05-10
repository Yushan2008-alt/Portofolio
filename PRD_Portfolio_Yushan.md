# PRD — Portfolio Website Rebuild
**Nama Proyek:** Personal Portfolio Website — Yushan Saputra  
**Versi:** 1.0  
**Stack:** HTML5 · CSS3 · Vanilla JavaScript  
**Target Deploy:** Vercel / GitHub Pages  
**Tanggal:** Mei 2026

---

## 1. LATAR BELAKANG & TUJUAN

### 1.1 Konteks
Yushan Saputra adalah siswa SMK Telkom Malang jurusan **Rekayasa Perangkat Lunak (RPL)** yang akan menggunakan website portofolio ini sebagai alat utama saat melamar kerja ke **perusahaan IT menengah dan agency**. Website ini harus bisa **menggantikan peran CV fisik** dan memberikan kesan profesional yang kuat pada HRD dalam waktu kurang dari 10 detik pertama.

### 1.2 Masalah dengan Versi Lama
| Masalah | Dampak |
|---|---|
| Tidak ada Education Section | HRD tidak tahu latar belakang akademik kandidat |
| Tidak ada Achievements/Sertifikat | Prestasi sekolah tidak terekspos |
| Foto & gambar proyek placeholder/broken | Terlihat tidak selesai dan tidak profesional |
| CV button hanya `window.print()` | Tidak bisa download PDF CV yang rapi |
| Skills terlalu generik | Tidak menunjukkan kemampuan spesifik yang relevan |
| Tidak ada contact form fungsional | HRD tidak bisa menghubungi langsung |
| Konten masih template/bukan data asli | Tidak autentik, mudah dideteksi HRD |
| Mobile navbar tidak ada | Buruk di mobile, padahal HRD sering cek HP |
| SEO minimal | Tidak bisa ditemukan di Google |
| Tidak ada loading screen | Terasa tidak polished |

### 1.3 Tujuan Utama
1. Membangun website portofolio **grade profesional** yang mampu bersaing dengan kandidat dari universitas
2. Menonjolkan **nilai jual unik** sebagai lulusan SMK Telkom Malang (praktis, project-based, siap kerja)
3. Memberikan pengalaman **ATS-friendly** sekaligus **human-friendly** — konten yang clear untuk HRD, plus visual yang impresif untuk tim teknis
4. **Zero placeholder** — semua konten harus real dan siap pakai saat di-deploy

---

## 2. TARGET PENGGUNA (AUDIENCE)

### Primary: HRD / Rekruter Perusahaan IT Menengah & Agency
- **Goal:** Verifikasi background, skill, dan attitude kandidat dalam 2-3 menit
- **Pain point:** Terlalu banyak CV masuk, butuh yang langsung to-the-point
- **Apa yang mereka cari:** Proyek nyata, skill relevan, kepribadian, cara komunikasi

### Secondary: Technical Lead / Senior Developer
- **Goal:** Mengukur kedalaman teknis kandidat
- **Pain point:** Kandidat klaim skill tapi tidak bisa membuktikan
- **Apa yang mereka cari:** Link GitHub, kode aktual, stack yang digunakan, problem solving approach

---

## 3. SITEMAP & STRUKTUR FILE

```
portfolio/
├── index.html              ← Single page, semua section di sini
├── assets/
│   ├── css/
│   │   └── style.css       ← Semua custom CSS
│   ├── js/
│   │   └── main.js         ← Semua JavaScript
│   └── images/
│       ├── profile.jpg     ← Foto profil (placeholder: gunakan URL via img onerror)
│       ├── projects/
│       │   ├── project-1.jpg
│       │   ├── project-2.jpg
│       │   └── project-3.jpg
│       └── certificates/
│           └── cert-1.jpg
└── cv/
    └── CV_Yushan_Saputra.pdf  ← File CV yang bisa didownload
```

---

## 4. SECTIONS & FITUR LENGKAP

### 4.1 LOADING SCREEN
**Tujuan:** Memberikan kesan polished dan professional sejak detik pertama  
**Behavior:**
- Tampil saat halaman pertama kali dimuat
- Animasi: Logo inisial "YS" dengan loading bar atau spinning circle
- Durasi: Minimum 1.2 detik, maksimum 2 detik
- Transisi: Fade out smooth ke halaman utama
- Implementasi: CSS animation + JS `window.addEventListener('load', ...)`

```
[   Y S   ]
[▓▓▓▓▓▓▓░░]  Loading...
```

**CSS Spec:**
```css
#loading-screen {
  position: fixed; inset: 0; z-index: 9999;
  background: #030305;
  display: flex; align-items: center; justify-content: center;
  transition: opacity 0.6s ease;
}
#loading-screen.hidden { opacity: 0; pointer-events: none; }
```

---

### 4.2 NAVBAR (FIXED)
**Tujuan:** Navigasi yang selalu accessible, termasuk di mobile  
**Komponen:**

| Elemen | Desktop | Mobile |
|---|---|---|
| Logo/Inisial "YS" | Kiri | Kiri |
| Nav links (Home, About, Skills, Projects, Achievements, Contact) | Tengah (pill style) | Hidden |
| Download CV button | Kanan | Kanan (icon only) |
| Hamburger menu | Hidden | Kanan (setelah CV icon) |
| Theme color swatches | Kanan | Hidden |

**Mobile Hamburger Menu:**
- Trigger: button dengan 3 garis (☰ → ✕ animasi)
- Menu: Full-screen overlay dari kanan, links vertikal
- Close: Klik backdrop atau ✕ atau setelah klik link

**Active State:**
- Gunakan IntersectionObserver untuk detect section mana yang sedang di-view
- Highlight nav link yang aktif dengan pill indicator sliding

**Download CV:**
```html
<a href="cv/CV_Yushan_Saputra.pdf" download="CV_Yushan_Saputra.pdf" class="btn-cv">
  <iconify-icon icon="solar:document-download-linear"></iconify-icon>
  <span class="hidden md:inline">Download CV</span>
</a>
```

---

### 4.3 HERO SECTION
**Tujuan:** First impression yang kuat, langsung communicate siapa kamu  
**Layout:** Full viewport height (100svh), centered atau 2-column split

**Konten yang HARUS ADA:**
```
[Availability Badge: 🟢 OPEN TO WORK / MAGANG]

Halo, saya
[NAMA LENGKAP]                    ← bisa typewriter effect
Siswa RPL · SMK Telkom Malang

[Short tagline 1 baris: "Membangun solusi digital yang fungsional dan scalable."]

[Foto Profil — bulat, dengan glow effect]

[CTA Buttons:]
  [⬇ Download CV]   [Lihat Proyek →]

[Social Links: GitHub · LinkedIn · Instagram · WhatsApp]
```

**Typewriter Effect (JS):**
```javascript
const roles = ['Backend Developer', 'Web Developer', 'Full Stack Learner', 'Problem Solver'];
// Animate through roles dengan cursor blinking
```

**Background Effect:**
- Pertahankan ambient aurora dari versi lama (sudah bagus)
- Tambahkan particle system ringan (titik-titik bergerak) menggunakan canvas atau CSS

---

### 4.4 ABOUT SECTION
**Tujuan:** HRD memahami latar belakang, kepribadian, dan motivasi kamu  
**Layout:** 2 kolom — kiri (teks), kanan (foto/stats)

**Konten yang HARUS ADA:**
```
[Label: 01 / About]
[Heading: Tentang Saya]

[Paragraf 1 — Background:]
"Saya adalah siswa kelas [X/XI/XII] di SMK Telkom Malang,
konsentrasi Rekayasa Perangkat Lunak. Selama [X] tahun
belajar di sini, saya fokus membangun kemampuan backend
development dan database management."

[Paragraf 2 — Passion:]
"Saya tertarik pada [area spesifik: backend, web, dsb] karena
[alasan personal yang autentik]. Saya percaya bahwa kode yang
baik bukan hanya yang bekerja, tapi yang mudah dipahami
orang lain."

[Stats Grid — 3 kolom:]
  [15+]          [10+]          [3]
  Proyek Selesai  Tech Stack     Tahun Belajar
```

**NOTE untuk developer:** Ganti semua placeholder teks dengan informasi nyata Yushan.

---

### 4.5 SKILLS SECTION
**Tujuan:** Menunjukkan depth dan breadth kemampuan teknis secara visual  
**Layout:** Tabs atau Grid berdasarkan kategori

**Struktur Tabs:**
```
[Frontend] [Backend] [Database] [Tools & DevOps] [Soft Skills]
```

**Format setiap skill item:**
```
[Icon] [Nama Skill]          [Progress Bar atau Badge Level]
  HTML5                      ████████░░ Advanced
  CSS3 / Tailwind CSS        ███████░░░ Intermediate
  JavaScript (ES6+)          ██████░░░░ Intermediate
```

**Skill Categories untuk RPL SMK Telkom:**
```
Frontend:
  - HTML5, CSS3, JavaScript (ES6+)
  - Tailwind CSS
  - Bootstrap
  - React.js (basic)

Backend:
  - PHP (Native / Laravel)  ← umum di SMK RPL
  - Node.js (Express)
  - Python (basic)
  - REST API

Database:
  - MySQL
  - PostgreSQL
  - SQLite

Tools:
  - Git & GitHub
  - VS Code
  - Postman
  - Figma (basic)
  - Linux CLI (basic)

Soft Skills:
  - Problem Solving
  - Team Collaboration
  - Fast Learner
  - Communication
```

**NOTE:** Sesuaikan list ini dengan skill yang benar-benar dimiliki Yushan. Jangan klaim skill yang belum dikuasai.

**Badge Level System:**
```css
.badge-beginner   { color: #94a3b8; border-color: #334155; }
.badge-intermediate { color: #60a5fa; border-color: #1d4ed8; }
.badge-advanced   { color: #34d399; border-color: #065f46; }
```

---

### 4.6 PROJECTS SECTION
**Tujuan:** Membuktikan kemampuan dengan karya nyata  
**Layout:** Grid 2 kolom (desktop), 1 kolom (mobile), dengan filter tabs

**Filter Tabs:**
```
[Semua] [Web App] [Backend] [Database] [Tugas Sekolah]
```

**Project Card — Komponen Wajib:**
```
┌─────────────────────────────────┐
│  [Screenshot / Preview Image]   │
│  dengan hover: overlay + links  │
├─────────────────────────────────┤
│  [Category Badge: Web App]      │
│  Nama Proyek                    │
│  Deskripsi singkat 2-3 kalimat  │
│                                 │
│  [Tech Stack Badges]            │
│  [PHP] [MySQL] [Bootstrap]      │
│                                 │
│  [GitHub →]  [Live Demo →]      │
└─────────────────────────────────┘
```

**Project Modal (Detail View):**
Klik card → modal muncul dengan:
- Screenshot/Preview lebih besar
- Deskripsi lengkap
- The Problem (masalah yang diselesaikan)
- The Solution (pendekatan yang diambil)
- Key Features (fitur utama)
- Tech Stack detail
- Link GitHub & Live Demo
- Tanggal pengerjaan

**Contoh Data Proyek (ganti dengan proyek nyata Yushan):**
```json
{
  "title": "[Nama Proyek Kamu]",
  "category": "Web App",
  "description": "[Deskripsi singkat]",
  "problem": "[Masalah yang proyek ini selesaikan]",
  "solution": "[Pendekatan yang kamu ambil]",
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "tech": ["PHP", "MySQL", "Bootstrap"],
  "github": "https://github.com/Yushan2008-alt/[repo]",
  "demo": "https://...",
  "image": "assets/images/projects/[nama].jpg",
  "date": "Januari 2025"
}
```

---

### 4.7 ACHIEVEMENTS & CERTIFICATES SECTION ⭐ (SECTION PALING PENTING)
**Tujuan:** Membedakan kamu dari kandidat lain — ini yang paling dicari HRD untuk fresh graduate  
**Layout:** 2 kolom grid — kiri (Prestasi/Juara), kanan (Sertifikasi)

#### Sub-section A: Prestasi & Penghargaan
```
┌─────────────────────────────────┐
│  🏆  Juara [X] - [Nama Lomba]  │
│  📅  [Bulan Tahun]              │
│  🏫  [Penyelenggara]            │
│  📍  Tingkat: [Sekolah/Kota/    │
│      Provinsi/Nasional]         │
└─────────────────────────────────┘
```

**Contoh (ganti dengan prestasi nyata Yushan):**
```
- Juara X Lomba Kompetensi Siswa (LKS) Web Technologies
- Juara X Hackathon [Nama Event]
- Finalis [Nama Kompetisi]
- Best Project [Program/Acara]
```

#### Sub-section B: Sertifikasi & Kursus
```
┌─────────────────────────────────┐
│  [Logo/Ikon Issuer]             │
│  Nama Sertifikat                │
│  Dikeluarkan oleh: [Issuer]     │
│  Tanggal: [Bulan Tahun]         │
│  [Verify Certificate →]         │
└─────────────────────────────────┘
```

**Contoh Sertifikat Relevan:**
```
- Cisco IT Essentials (dari Telkom School)
- Cisco CCNA (jika ada)
- Google Digital Garage
- Dicoding (berbagai course)
- MySkill / RevoU (bootcamp)
- Coursera / edX
- Sertifikat PKL (Prakerin)
```

**PENTING:** Setiap sertifikat harus ada link verifikasi atau gambar scan yang bisa diklik.

---

### 4.8 EDUCATION SECTION
**Tujuan:** Menunjukkan latar belakang akademik secara jelas  
**Layout:** Timeline vertikal

```
Timeline:

2022 ─── SMK Telkom Malang
          Rekayasa Perangkat Lunak (RPL)
          2022 - 2025 (atau sesuai tahun)
          • Ekstrakurikuler: [nama ekskul]
          • Kegiatan: PKL di [nama perusahaan, bulan-bulan]
          • Pencapaian: [nilai atau prestasi akademik]

2019 ─── SMP [Nama SMP]
          [Kota]
          2019 - 2022
```

**PKL (Praktek Kerja Lapangan) — Highlight Khusus:**
```
┌─────────────────────────────────────────────┐
│  💼 Praktek Kerja Lapangan (PKL)            │
│  [Nama Perusahaan]                          │
│  [Bulan Tahun] — [Bulan Tahun]              │
│  Deskripsi singkat apa yang dikerjakan:     │
│  • Mengembangkan [fitur/modul]              │
│  • Menggunakan [tech stack]                 │
│  • Berkolaborasi dengan tim [X] orang       │
└─────────────────────────────────────────────┘
```

---

### 4.9 CONTACT SECTION
**Tujuan:** Memudahkan HRD menghubungi kamu dengan berbagai metode  
**Layout:** Split — kiri (info kontak), kanan (form)

#### Kiri — Info Kontak:
```
📧 Email      : [email@gmail.com]
📱 WhatsApp   : +62 [nomor] (klik langsung chat)
🐙 GitHub     : github.com/Yushan2008-alt
💼 LinkedIn   : linkedin.com/in/[username]
📍 Lokasi     : Malang, Jawa Timur
```

#### Kanan — Contact Form (Fungsional):
```html
<form id="contact-form" action="https://formspree.io/f/[YOUR_ID]" method="POST">
  <input name="name"    placeholder="Nama Lengkap" required>
  <input name="email"   type="email" placeholder="Email" required>
  <input name="subject" placeholder="Subjek / Posisi yang dilamar">
  <textarea name="message" placeholder="Pesan..." rows="5" required></textarea>
  <button type="submit">Kirim Pesan →</button>
</form>
```

**Gunakan Formspree.io** (gratis, tanpa backend) — daftar di formspree.io, dapat form ID, koneksi langsung ke email.

**Feedback States:**
- Loading state: tombol berubah jadi spinner
- Success: pesan konfirmasi hijau
- Error: pesan error merah dengan instruksi alternatif

---

### 4.10 FOOTER
**Konten:**
```
[Logo YS]    [Nav Links: Home · About · Skills · Projects · Achievements · Contact]

[Status: 🟢 All Systems Operational]

[Social Icons: GitHub · LinkedIn · Instagram · WhatsApp]

© 2025 Yushan Saputra · Dibuat dengan ❤️ di Malang
[Back to Top ↑]
```

---

## 5. FITUR INTERAKTIF & UX

### 5.1 Custom Cursor
- Desktop: titik kecil + ring lebih besar yang follow dengan delay (lag effect)
- Hover pada link/button: cursor membesar
- Mobile: nonaktifkan (gunakan media query `@media (pointer: fine)`)

```javascript
const cursor = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

document.addEventListener('mousemove', (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  // Ring dengan setTimeout untuk lag effect
});
```

### 5.2 Scroll Animations
- Gunakan `IntersectionObserver` untuk trigger animasi saat elemen masuk viewport
- Animasi: fade-up, slide-in-left, slide-in-right, scale-in
- Stagger delay untuk list items (skill cards, project cards, dll)

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100); // stagger 100ms
    }
  });
}, { threshold: 0.1 });
```

### 5.3 Smooth Scroll
```javascript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});
```

### 5.4 Color Theme Switcher
- Pertahankan dari versi lama
- 6 warna pilihan: Biru, Ungu, Hijau, Kuning, Oranye, Merah
- Simpan pilihan ke `localStorage`
- Apply ke CSS variable `--primary`

```javascript
localStorage.setItem('portfolio-color', hexColor);
// Load on init:
const savedColor = localStorage.getItem('portfolio-color');
if (savedColor) applyColor(savedColor);
```

### 5.5 Particle Background (Hero)
Gunakan canvas API yang ringan:
```javascript
// Buat 50-80 partikel titik kecil bergerak lambat
// Hubungkan dengan garis jika jarak < 120px
// Gunakan requestAnimationFrame
```
**Alternatif:** Gunakan library `particles.js` dari CDN jika ingin lebih mudah.

### 5.6 Skills Tab Switcher
```javascript
document.querySelectorAll('.skill-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active dari semua tab
    // Tambah active ke tab yang diklik
    // Show panel yang sesuai, hide yang lain
    // Animasi fade-in content baru
  });
});
```

### 5.7 Project Filter
```javascript
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
        card.classList.add('fade-in');
      } else {
        card.style.display = 'none';
      }
    });
  });
});
```

### 5.8 Back to Top Button
```javascript
const backToTop = document.querySelector('#back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
```

### 5.9 Scroll Progress Bar
```html
<div id="scroll-progress" style="
  position: fixed; top: 0; left: 0; height: 3px;
  background: var(--primary); z-index: 9999;
  transition: width 0.1s;
"></div>
```
```javascript
window.addEventListener('scroll', () => {
  const progress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scroll-progress').style.width = progress + '%';
});
```

---

## 6. DESIGN SYSTEM

### 6.1 Color Palette
```css
:root {
  /* Background */
  --bg-primary:   #030305;    /* Main background (hampir hitam) */
  --bg-secondary: #0a0a12;    /* Card background */
  --bg-tertiary:  #111118;    /* Input background */

  /* Text */
  --text-primary:   #ffffff;
  --text-secondary: #d1d5db;  /* neutral-300 */
  --text-muted:     #6b7280;  /* neutral-500 */

  /* Accent (Dynamic via JS) */
  --primary:      #3b82f6;    /* Default: Biru */
  --primary-glow: rgba(59, 130, 246, 0.25);
  --primary-dim:  rgba(59, 130, 246, 0.10);

  /* Border */
  --border:       rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.15);

  /* Status */
  --success: #10b981;
  --error:   #ef4444;
  --warning: #f59e0b;
}
```

### 6.2 Typography
```css
/* Import di <head> */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --font-display: 'Syne', sans-serif;
  --font-body:    'DM Sans', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}

/* Type Scale */
h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); font-family: var(--font-display); }
h2 { font-size: clamp(1.75rem, 4vw, 2.5rem); font-family: var(--font-display); }
h3 { font-size: 1.25rem; font-family: var(--font-display); }
p  { font-size: 1rem; line-height: 1.7; font-family: var(--font-body); }
.mono { font-family: var(--font-mono); font-size: 0.75rem; }
```

### 6.3 Spacing System
```css
/* Gunakan kelipatan 4px atau 8px */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-24: 6rem;    /* 96px */
```

### 6.4 Component Styles

**Glass Card:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  backdrop-filter: blur(16px);
  border-radius: 1rem;
  transition: all 0.3s ease;
}
.glass-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: var(--border-hover);
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
}
```

**Primary Button:**
```css
.btn-primary {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: white;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative; overflow: hidden;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px var(--primary-glow);
}
/* Shimmer effect on hover */
.btn-primary::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 60%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s ease;
}
.btn-primary:hover::before { left: 150%; }
```

**Ghost Button:**
```css
.btn-ghost {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  border-radius: 0.5rem;
  font-weight: 400;
  transition: all 0.3s ease;
}
.btn-ghost:hover {
  border-color: var(--primary);
  color: var(--text-primary);
  transform: translateY(-2px);
}
```

**Tech Badge:**
```css
.tech-badge {
  display: inline-flex; align-items: center; gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.04);
  border-radius: 9999px;
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-family: var(--font-mono);
}
```

### 6.5 Animation Classes
```css
/* Base states */
.reveal { opacity: 0; transform: translateY(2rem); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.reveal.from-left { transform: translateX(-2rem); }
.reveal.from-right { transform: translateX(2rem); }
.reveal.scale { transform: scale(0.95); }
.reveal.visible { opacity: 1; transform: none; }

/* Delays */
.delay-100 { transition-delay: 100ms; }
.delay-200 { transition-delay: 200ms; }
.delay-300 { transition-delay: 300ms; }
.delay-400 { transition-delay: 400ms; }
.delay-500 { transition-delay: 500ms; }
```

---

## 7. SEO & PERFORMANCE

### 7.1 Meta Tags Wajib
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Basic -->
  <title>Yushan Saputra — RPL Developer · SMK Telkom Malang</title>
  <meta name="description" content="Portfolio Yushan Saputra, siswa RPL SMK Telkom Malang yang berfokus pada pengembangan web dan backend. Lihat proyek, skill, dan prestasi.">
  <meta name="keywords" content="portfolio, web developer, RPL, SMK Telkom Malang, backend developer, Malang">
  <meta name="author" content="Yushan Saputra">
  
  <!-- Open Graph (untuk preview di WhatsApp, LinkedIn, dll) -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://[domain-kamu].vercel.app">
  <meta property="og:title" content="Yushan Saputra — Portfolio">
  <meta property="og:description" content="Siswa RPL SMK Telkom Malang · Web & Backend Developer">
  <meta property="og:image" content="https://[domain-kamu].vercel.app/assets/images/og-preview.jpg">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="assets/images/favicon.png">
  <link rel="apple-touch-icon" href="assets/images/favicon.png">
  
  <!-- Theme Color (browser UI) -->
  <meta name="theme-color" content="#030305">
</head>
```

### 7.2 Performance Best Practices
```html
<!-- Font preconnect untuk loading lebih cepat -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload font kritis -->
<link rel="preload" as="style" href="[google fonts url]">

<!-- CSS di <head>, JS di atas </body> atau defer -->
<script src="assets/js/main.js" defer></script>
```

**Image Optimization:**
```html
<!-- Gunakan loading="lazy" untuk semua gambar non-hero -->
<img src="assets/images/projects/project-1.jpg"
     alt="Screenshot proyek [nama]"
     loading="lazy"
     width="800" height="500">

<!-- Hero image: eager loading -->
<img src="assets/images/profile.jpg"
     alt="Foto Yushan Saputra"
     loading="eager"
     width="400" height="400">
```

### 7.3 Accessibility (a11y)
```html
<!-- Semantic HTML -->
<nav aria-label="Navigasi utama">
<main id="main-content">
<section aria-labelledby="about-heading">
<h2 id="about-heading">Tentang Saya</h2>

<!-- Skip link untuk keyboard users -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- ARIA labels untuk icon-only buttons -->
<button aria-label="Buka menu navigasi">
<button aria-label="Download CV">

<!-- Alt text yang deskriptif -->
<img alt="Screenshot halaman utama proyek Library Management System">
```

---

## 8. MOBILE RESPONSIVENESS

### 8.1 Breakpoints
```css
/* Mobile-first approach */
/* xs: 0px+ (default) */
/* sm: 640px+ */
/* md: 768px+ */
/* lg: 1024px+ */
/* xl: 1280px+ */

@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
```

### 8.2 Layout Changes per Breakpoint
| Section | Mobile | Desktop |
|---|---|---|
| Navbar | Logo + CV icon + Hamburger | Logo + Nav pills + CV btn + Color swatches |
| Hero | 1 kolom, foto di atas | 2 kolom split |
| About | 1 kolom (stats 3-grid) | 2 kolom |
| Skills | 1 kolom, scroll horizontal tabs | Grid 2-3 kolom |
| Projects | 1 kolom | Grid 2 kolom |
| Achievements | 1 kolom | Grid 2 kolom |
| Contact | Form full width | 2 kolom split |

### 8.3 Touch-friendly Requirements
- Semua tap target minimum **44x44px**
- Spacing antar elemen minimum **8px**
- Swipe gesture untuk project slider (optional)
- No hover-only interactions (semua hover effect harus ada fallback touch)

---

## 9. EXTERNAL LIBRARIES (CDN — Tanpa Install)

```html
<!-- Icons (wajib) -->
<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>

<!-- Fonts (wajib) -->
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<!-- AOS (Animate on Scroll) — alternatif jika tidak pakai custom IntersectionObserver -->
<link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet">
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<!-- Init: AOS.init({ duration: 800, once: true }); -->

<!-- Typed.js — untuk typewriter effect di hero -->
<script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>

<!-- TIDAK perlu Tailwind CSS (pakai pure CSS custom) -->
<!-- TIDAK perlu React/Vue (pure vanilla JS) -->
```

---

## 10. FILE STRUCTURE LENGKAP

```
portfolio/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── profile.jpg           ← Foto profil kamu (JPG, ~200KB)
│       ├── og-preview.jpg        ← Preview image untuk social share (1200x630px)
│       ├── favicon.png           ← Logo/inisial YS (32x32px)
│       ├── projects/
│       │   ├── project-1.jpg     ← Screenshot proyek (800x500px)
│       │   ├── project-2.jpg
│       │   └── ...
│       └── certificates/
│           ├── cert-cisco.jpg    ← Scan sertifikat
│           └── ...
└── cv/
    └── CV_Yushan_Saputra.pdf    ← CV dalam format PDF
```

---

## 11. CHECKLIST SEBELUM DEPLOY

### Content Checklist
- [ ] Ganti semua `[PLACEHOLDER]` dengan data nyata Yushan
- [ ] Foto profil sudah diupload dan tampil
- [ ] Semua project memiliki screenshot nyata (bukan ikon placeholder)
- [ ] Semua link GitHub/Demo project berfungsi
- [ ] Semua link sertifikat berfungsi
- [ ] Nomor WhatsApp terhubung ke chat langsung (`https://wa.me/62XXXX`)
- [ ] Email di contact form sesuai email aktif
- [ ] CV PDF sudah diupload dan bisa didownload
- [ ] Formspree form ID sudah dikonfigurasi dan ditest

### Technical Checklist
- [ ] Loading screen muncul dan hilang dengan smooth
- [ ] Hamburger menu mobile berfungsi
- [ ] Semua section scroll reveal berfungsi
- [ ] Project modal terbuka dan tutup dengan benar
- [ ] Project filter berfungsi
- [ ] Contact form bisa submit dan ada feedback
- [ ] Back to top button muncul setelah scroll
- [ ] Scroll progress bar berfungsi
- [ ] Color theme switcher berfungsi
- [ ] Pilihan warna tersimpan setelah reload (localStorage)

### Performance Checklist
- [ ] Semua gambar sudah dikompresi (<500KB per gambar)
- [ ] Semua gambar punya `alt` text yang deskriptif
- [ ] Lighthouse score ≥ 80 di semua kategori
- [ ] Website tampil baik di mobile (Chrome DevTools: iPhone SE, iPhone 12, iPad)
- [ ] Website tampil baik di Firefox & Safari
- [ ] Tidak ada console error di browser

---

## 12. INSTRUKSI UNTUK CLAUDE CODE

Saat kamu menjalankan ini di Claude Code, berikan instruksi berikut secara bertahap:

### Tahap 1 — Struktur & Design System
```
"Buat file index.html, assets/css/style.css, dan assets/js/main.js.
Setup design system lengkap termasuk CSS variables, typography, dan
base component styles sesuai PRD section 6."
```

### Tahap 2 — Layout & Sections Utama
```
"Buat semua section HTML (Loading, Navbar, Hero, About, Skills, Projects,
Achievements, Education, Contact, Footer) sesuai PRD section 4.
Gunakan semantic HTML. Data content pakai placeholder yang jelas
(format: [NAMA KAMU], [TAHUN], dsb)."
```

### Tahap 3 — Interaktivitas
```
"Implementasikan semua fitur JavaScript di main.js sesuai PRD section 5:
loading screen, hamburger menu, scroll animations, color switcher,
project filter, project modal, contact form validation, back to top,
scroll progress bar, dan custom cursor."
```

### Tahap 4 — Responsiveness
```
"Tambahkan media queries untuk semua breakpoint sesuai PRD section 8.
Pastikan mobile-first: navbar hamburger, layout single column,
touch-friendly tap targets."
```

### Tahap 5 — Polish & SEO
```
"Tambahkan semua meta tags sesuai PRD section 7.1. Tambahkan
lazy loading pada semua gambar. Pastikan semua animasi smooth
dan tidak ada console error."
```

---

## 13. TIPS KONTEN YANG KUAT UNTUK HRD

### ✅ DO — Yang Harus Kamu Lakukan
- **Jujur soal level skill.** Lebih baik tulis "Intermediate" daripada klaim "Expert" yang tidak bisa dibuktikan
- **Foto profil profesional.** Pakaian rapi, background netral/bersih, pencahayaan bagus
- **Deskripsi proyek yang storytelling.** Ceritakan masalah → solusi → hasil, bukan hanya "Saya membuat website"
- **Sertakan semua pencapaian sekecil apapun.** Juara sekolah sekalipun tetap bernilai untuk fresh graduate
- **Tanggal yang konsisten.** Selalu sertakan bulan dan tahun pada setiap pengalaman
- **Call to action yang jelas.** "Download CV" dan "Hubungi Saya" harus mudah ditemukan

### ❌ DON'T — Yang Harus Dihindari
- Jangan klaim skill yang belum dikuasai (misal "5 years experience" padahal masih sekolah)
- Jangan biarkan link yang broken (test semua URL sebelum deploy)
- Jangan pakai foto tidak profesional (selfie kasual, foto buram, dsb)
- Jangan tulis deskripsi proyek yang copy-paste dari tutorial
- Jangan gunakan kata "simple" atau "basic" untuk mendeskripsikan proyek
- Jangan lupa update konten secara berkala

---

*PRD ini dibuat berdasarkan analisis kode website portofolio yang ada di https://github.com/Yushan2008-alt/Portofolio dan research terhadap standar portfolio profesional 2025-2026. Dokumen ini ditujukan untuk digunakan bersama Claude Code.*

*Versi: 1.0 | Dibuat: Mei 2026*
