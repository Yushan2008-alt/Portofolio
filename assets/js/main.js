// === MAIN.JS — Portfolio Yushan Thoriq ===

// ─────────────────────────────────────────────
// 1. LOADING SCREEN
// ─────────────────────────────────────────────
(function initLoadingScreen() {
  const screen  = document.getElementById('loading-screen');
  const fill    = document.getElementById('loading-fill');
  const pct     = document.getElementById('loading-pct');
  const lines   = [
    { el: document.getElementById('ll1'), textEl: document.getElementById('ll1-text'), msg: 'Initializing portfolio v2.0...', delay: 200 },
    { el: document.getElementById('ll2'), textEl: document.getElementById('ll2-text'), msg: 'Loading modules... ✓',            delay: 700 },
    { el: document.getElementById('ll3'), textEl: document.getElementById('ll3-text'), msg: 'Ready. Welcome.',                  delay: 1200 },
  ];

  if (!screen) return;

  // Type each line with a reveal
  lines.forEach(({ el, textEl, msg, delay }) => {
    setTimeout(() => {
      if (el) el.classList.add('show');
      if (textEl) textEl.textContent = msg;
    }, delay);
  });

  // Progress bar & percentage counter over 1800ms
  const duration  = 1800;
  const interval  = 30;
  const steps     = duration / interval;
  let   current   = 0;

  const timer = setInterval(() => {
    current++;
    const progress = Math.min(Math.round((current / steps) * 100), 100);
    if (fill) fill.style.width = progress + '%';
    if (pct)  pct.textContent  = progress + '%';
    if (current >= steps) clearInterval(timer);
  }, interval);

  // Dismiss loading screen after 2200ms
  setTimeout(() => {
    if (screen) screen.classList.add('done');
    // Re-enable scroll that may have been locked
    document.body.style.overflow = '';
    // Kick off count-up for any stats already in view
    if (typeof window._runCountUp === 'function') window._runCountUp();
  }, 2200);

  // Lock scroll while loading
  document.body.style.overflow = 'hidden';
})();


// ─────────────────────────────────────────────
// 2. CUSTOM CURSOR (desktop / pointer:fine only)
// ─────────────────────────────────────────────
(function initCustomCursor() {
  const isFine = window.matchMedia('(pointer: fine)').matches;
  if (!isFine) return;

  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let ringX = 0, ringY = 0;
  let mouseX = 0, mouseY = 0;
  let rafId;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Lerp ring toward mouse for a lag effect
  function lerpCursor() {
    const speed = 0.12;
    ringX += (mouseX - ringX) * speed;
    ringY += (mouseY - ringY) * speed;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    rafId = requestAnimationFrame(lerpCursor);
  }
  lerpCursor();

  // Hover enlarge on interactive elements
  const interactives = 'a, button, [role="button"], label, input, textarea, select, .color-btn, .nav-link';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactives)) {
      dot.classList.add('cursor-hover');
      ring.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactives)) {
      dot.classList.remove('cursor-hover');
      ring.classList.remove('cursor-hover');
    }
  });
})();


// ─────────────────────────────────────────────
// 3. NAVBAR & MOBILE MENU
// ─────────────────────────────────────────────
(function initNavbar() {
  const navbar      = document.getElementById('navbar');
  const hamburger   = document.getElementById('hamburger-btn');
  const mobileMenu  = document.getElementById('mobile-menu');
  const backdrop    = document.getElementById('mobile-backdrop');
  const logoBtn     = document.getElementById('nav-logo-btn');
  const navPill     = document.getElementById('nav-pill');
  const navLinks    = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // ── Scroll: navbar bg + progress bar ──
  function onScroll() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateScrollProgress();
    updateBackToTop();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial

  // ── Logo → scroll to top ──
  if (logoBtn) {
    logoBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── Smooth scroll for all hash links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileMenu();
    });
  });

  // ── Mobile menu open/close ──
  function openMobileMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    backdrop?.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    backdrop?.classList.remove('show');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    mobileMenu?.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
  });
  backdrop?.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(l => l.addEventListener('click', closeMobileMenu));

  // ── Active nav link via IntersectionObserver + sliding pill ──
  function setActiveLink(sectionId) {
    navLinks.forEach(l => {
      const isActive = l.dataset.section === sectionId;
      l.classList.toggle('active', isActive);
      if (isActive) movePill(l);
    });
    mobileLinks.forEach(l => {
      l.classList.toggle('active', l.dataset.section === sectionId);
    });
  }

  function movePill(activeLink) {
    if (!navPill || !activeLink) return;
    const pillsWrap = activeLink.closest('.nav-pills');
    if (!pillsWrap) return;
    const wrapRect = pillsWrap.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    navPill.style.left  = (linkRect.left - wrapRect.left) + 'px';
    navPill.style.width = linkRect.width + 'px';
  }

  const sections = document.querySelectorAll('section[id], main[id]');
  if (sections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    }, { threshold: 0.3, rootMargin: '-60px 0px -40% 0px' });
    sections.forEach(s => sectionObserver.observe(s));
  }
})();


// ─────────────────────────────────────────────
// 4. COLOR THEME SWITCHER
// ─────────────────────────────────────────────
(function initColorSwitcher() {
  const root       = document.documentElement;
  const colorBtns  = document.querySelectorAll('.color-btn');

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return { r, g, b };
  }

  function applyColor(hex) {
    const { r, g, b } = hexToRgb(hex);
    root.style.setProperty('--primary',        hex);
    root.style.setProperty('--primary-glow',   `rgba(${r},${g},${b},0.25)`);
    root.style.setProperty('--primary-dim',    `rgba(${r},${g},${b},0.08)`);
    root.style.setProperty('--primary-border', `rgba(${r},${g},${b},0.25)`);

    colorBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.color === hex);
    });
  }

  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.dataset.color;
      applyColor(color);
      localStorage.setItem('portfolio-color', color);
    });
  });

  // Restore saved color
  const saved = localStorage.getItem('portfolio-color');
  if (saved) applyColor(saved);
})();


// ─────────────────────────────────────────────
// 5. SCROLL ANIMATIONS (IntersectionObserver)
// ─────────────────────────────────────────────
(function initScrollAnimations() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      // Stagger siblings
      const siblings = [...(entry.target.parentElement?.children || [])];
      const index    = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${index * 80}ms`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));
})();


// ─────────────────────────────────────────────
// 6. SCROLL PROGRESS BAR
// ─────────────────────────────────────────────
function updateScrollProgress() {
  const bar  = document.getElementById('scroll-progress');
  if (!bar) return;
  const scrolled   = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const progress   = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
  bar.style.width  = Math.min(progress, 100) + '%';
}


// ─────────────────────────────────────────────
// 7. BACK TO TOP
// ─────────────────────────────────────────────
function updateBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.classList.toggle('visible', window.scrollY > 500);
}

document.getElementById('back-to-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ─────────────────────────────────────────────
// 8. TERMINAL BOOT SEQUENCE (Hero)
// ─────────────────────────────────────────────
function initTerminal() {
  const output = document.getElementById('terminal-output');
  if (!output) return;

  const lines = [
    { type: 'cmd',    text: 'whoami' },
    { type: 'output', text: 'Yushan Thoriq — Backend Developer · RPL' },
    { type: 'cmd',    text: 'cat skills.json' },
    { type: 'output', text: '{' },
    { type: 'json',   key: '  "backend"',  val: '["Nest.js", "Node.js"]' },
    { type: 'json',   key: '  "database"', val: '["MySQL", "PostgreSQL"]' },
    { type: 'json',   key: '  "tools"',    val: '["Git", "Postman", "VS Code"]' },
    { type: 'output', text: '}' },
    { type: 'cmd',    text: 'echo $STATUS' },
    { type: 'output', text: '🟢 Open to work · Magang tersedia' },
    { type: 'cursor' },
  ];

  let delay = 0;
  lines.forEach(line => {
    const pause = line.type === 'cmd' ? 700 : 220;
    setTimeout(() => {
      const el = document.createElement('div');
      el.style.lineHeight = '1.8';

      if (line.type === 'cmd') {
        el.innerHTML =
          `<span class="t-prompt">yushan</span>` +
          `<span class="t-dim">@smktelkom</span>` +
          `<span class="t-sep"> $ </span>` +
          `<span class="t-cmd">${line.text}</span>`;
      } else if (line.type === 'output') {
        el.innerHTML = `<span class="t-output">${line.text}</span>`;
      } else if (line.type === 'json') {
        el.innerHTML =
          `<span class="t-key">${line.key}</span>` +
          `<span class="t-output">: </span>` +
          `<span class="t-string">${line.val}</span>`;
      } else if (line.type === 'cursor') {
        el.innerHTML =
          `<span class="t-prompt">yushan</span>` +
          `<span class="t-dim">@smktelkom</span>` +
          `<span class="t-sep"> $ </span>` +
          `<span class="t-cursor"></span>`;
      }

      output.appendChild(el);
      output.scrollTop = output.scrollHeight;
    }, delay);
    delay += pause;
  });
}


// ─────────────────────────────────────────────
// 9. TYPED.JS (Hero Roles)
// ─────────────────────────────────────────────
function initTyped() {
  if (!window.Typed || !document.getElementById('typed-role')) return;
  new Typed('#typed-role', {
    strings: [
      'Backend Developer',
      'Web Developer',
      'Problem Solver',
      'Node.js Developer',
      'NestJS Developer',
      'Database Engineer',
    ],
    typeSpeed:  60,
    backSpeed:  40,
    backDelay:  2000,
    loop:       true,
    showCursor: true,
    cursorChar: '|',
  });
}

// Fire terminal + typed after loading screen is done (2300ms)
setTimeout(() => {
  initTerminal();
  initTyped();
}, 2300);


// ─────────────────────────────────────────────
// 10. SKILL BAR ANIMATION
// ─────────────────────────────────────────────
(function initSkillBars() {
  const mainCard = document.querySelector('.skill-main');
  if (!mainCard) return;

  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width || '0%';
      });
      skillObserver.unobserve(entry.target);
    });
  }, { threshold: 0.25 });

  skillObserver.observe(mainCard);
})();


// ─────────────────────────────────────────────
// 11. PROJECT FILTER
// ─────────────────────────────────────────────
(function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });
})();


// ─────────────────────────────────────────────
// 12. PROJECT MODAL
// ─────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    category: 'backend',
    categoryLabel: 'Backend',
    badgeClass: 'badge-node',
    year: '2024',
    title: 'REST API Gateway',
    desc: 'Proyek ini membangun sebuah API gateway terpusat yang menangani semua request masuk ke berbagai microservice. Dilengkapi dengan sistem autentikasi berbasis JWT, middleware rate limiting per-user, dan auto-generated Swagger docs menggunakan NestJS + TypeScript.',
    highlights: ['JWT Authentication & Refresh Token', 'Rate Limiting per User/IP', 'Swagger Auto-Documentation', 'Modular NestJS Architecture'],
    stack: ['NestJS', 'TypeScript', 'PostgreSQL', 'JWT', 'Swagger'],
    stackClasses: ['badge-node', 'badge-js', 'badge-pgsql', 'badge-api', 'badge-git'],
    github: 'https://github.com/Yushan2008',
    demo: null,
  },
  {
    id: 2,
    category: 'webapp',
    categoryLabel: 'Web App',
    badgeClass: 'badge-laravel',
    year: '2024',
    title: 'School Management System',
    desc: 'Aplikasi web fullstack untuk administrasi sekolah mencakup modul manajemen siswa & guru, sistem absensi digital, dan pengelolaan nilai. Dibangun di atas framework Laravel dengan sistem autentikasi berbasis peran (RBAC) dan laporan PDF otomatis.',
    highlights: ['Role-Based Access Control (RBAC)', 'Absensi Digital', 'Export Laporan PDF', 'RESTful Internal API'],
    stack: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Bootstrap'],
    stackClasses: ['badge-laravel', 'badge-php', 'badge-mysql', 'badge-html', 'badge-css'],
    github: 'https://github.com/Yushan2008',
    demo: null,
  },
  {
    id: 3,
    category: 'database',
    categoryLabel: 'Database',
    badgeClass: 'badge-pgsql',
    year: '2023',
    title: 'Inventory Database System',
    desc: 'Proyek desain database relasional untuk sistem inventaris toko. Mencakup pembuatan ERD komprehensif, normalisasi hingga 3NF, implementasi stored procedures untuk laporan stok otomatis, dan triggers untuk update saldo stok real-time.',
    highlights: ['Normalisasi 3NF', 'Stored Procedures untuk Laporan', 'Triggers Update Stok Otomatis', 'ERD Komprehensif'],
    stack: ['PostgreSQL', 'SQL', 'ERD Design', 'Stored Procedures'],
    stackClasses: ['badge-pgsql', 'badge-git', 'badge-api', 'badge-figma'],
    github: 'https://github.com/Yushan2008',
    demo: null,
  },
];

(function initProjectModal() {
  const modal    = document.getElementById('project-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close');
  const bodyEl   = document.getElementById('modal-body');
  const catEl    = document.getElementById('modal-cat');
  const titleEl  = document.getElementById('modal-title');
  if (!modal) return;

  function openModal(id) {
    const p = PROJECTS.find(proj => proj.id === id);
    if (!p) return;

    catEl.className   = 'badge ' + p.badgeClass;
    catEl.textContent = p.categoryLabel;
    titleEl.textContent = p.title;

    const highlightItems = p.highlights
      .map(h => `<li>${h}</li>`).join('');
    const stackBadges = p.stack
      .map((s, i) => `<span class="badge ${p.stackClasses[i] || ''}">${s}</span>`).join('');
    const githubLink = p.github
      ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">GitHub →</a>`
      : '';
    const demoLink = p.demo
      ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Live Demo →</a>`
      : '';

    bodyEl.innerHTML = `
      <div class="modal-section">
        <div class="modal-section-title">Deskripsi</div>
        <p>${p.desc}</p>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">Highlights</div>
        <ul style="padding-left:18px;display:flex;flex-direction:column;gap:6px;color:var(--text-secondary);font:400 0.875rem/1.5 var(--font-body)">
          ${highlightItems}
        </ul>
      </div>
      <div class="modal-section">
        <div class="modal-section-title">Tech Stack</div>
        <div class="badge-cloud" style="gap:8px;">${stackBadges}</div>
      </div>
      ${(githubLink || demoLink) ? `<div class="modal-section modal-links">${githubLink}${demoLink}</div>` : ''}
    `;

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('.project-detail-btn');
    if (btn) openModal(parseInt(btn.dataset.id, 10));
  });

  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click',  closeModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
  });
})();


// ─────────────────────────────────────────────
// 13. CONTACT FORM (Formspree async)
// ─────────────────────────────────────────────
(function initContactForm() {
  const form    = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const btn     = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');
    const status  = document.getElementById('form-status');

    // Loading state
    btn.disabled = true;
    btnText.textContent = 'Mengirim...';
    if (btnIcon) btnIcon.setAttribute('icon', 'solar:spinner-linear');

    try {
      const response = await fetch(e.target.action, {
        method:  'POST',
        body:    new FormData(e.target),
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        status.textContent = '✓ Pesan berhasil dikirim! Saya akan membalas secepatnya.';
        status.className   = 'form-status success';
        e.target.reset();
      } else {
        throw new Error('server error');
      }
    } catch {
      status.textContent = '✗ Gagal mengirim. Coba hubungi via WhatsApp atau Email langsung.';
      status.className   = 'form-status error';
    } finally {
      btn.disabled = false;
      btnText.textContent = 'Kirim Pesan';
      if (btnIcon) btnIcon.setAttribute('icon', 'solar:arrow-right-linear');
    }
  });
})();


// ─────────────────────────────────────────────
// 14. COUNT-UP ANIMATION (rAF + ease-out cubic)
// ─────────────────────────────────────────────
function countUp(el, target, duration) {
  duration = duration || 1500;
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target) + '+';
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Count-up: triggered by loading screen dismissal (see section 1)
// and by IntersectionObserver for elements below the fold.
(function initCountUp() {
  const done   = new Set();
  const allEls = [...document.querySelectorAll('[data-count]')];
  if (!allEls.length) return;

  function isInView(el) {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }

  function fire(el) {
    if (done.has(el)) return;
    done.add(el);
    countUp(el, parseInt(el.dataset.count, 10));
  }

  // Called from loading screen dismiss (section 1)
  window._runCountUp = function() {
    allEls.forEach(el => { if (isInView(el)) fire(el); });
  };

  // IntersectionObserver handles elements scrolled into view after initial load
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) fire(entry.target); });
  }, { threshold: 0 });

  allEls.forEach(el => obs.observe(el));
})();


// ─────────────────────────────────────────────
// 15. MICRO-INTERACTIONS & POLISH
// ─────────────────────────────────────────────

// ── 15a. Scramble Text ──
function scrambleText(element) {
  const chars    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
  const original = element.dataset.original || element.textContent;
  element.dataset.original = original;
  let iteration  = 0;

  clearInterval(element._scrambleInterval);
  element._scrambleInterval = setInterval(() => {
    element.textContent = original.split('').map((char, i) => {
      if (char === ' ')              return ' ';
      if (i < Math.floor(iteration)) return original[i];
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');

    if (Math.floor(iteration) >= original.length) {
      clearInterval(element._scrambleInterval);
      element.textContent = original;
    }
    iteration += 0.35;
  }, 28);
}

document.querySelectorAll('.scramble-hover').forEach(el => {
  el.addEventListener('mouseenter', () => scrambleText(el));
});


// ── 15b. Magnetic Button (hover-capable devices only) ──
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x    = e.clientX - rect.left - rect.width  / 2;
      const y    = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.02)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      setTimeout(() => { btn.style.transition = ''; }, 500);
    });
  });
}


// ── 15c. Card 3D Tilt (hover-capable devices only) ──
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.card-tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x    = (e.clientX - rect.left) / rect.width  - 0.5;
      const y    = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `
        perspective(800px)
        rotateY(${x * 6}deg)
        rotateX(${-y * 6}deg)
        translateY(-4px)
      `;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    });
  });
}


// ── 15d. Stagger Reveal (grid children get auto data-delay) ──
(function initStaggerReveal() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  // Apply stagger delays to direct children of grid containers
  document.querySelectorAll('.projects-grid, .achieve-grid, .skills-bento').forEach(grid => {
    [...grid.children].forEach((child, i) => {
      if (!child.dataset.delay) child.dataset.delay = i * 80;
    });
  });

  // Re-observe all .reveal elements (includes newly-stamped grid children)
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
})();


// ── 15e. Ambient Cursor Glow (hero section only) ──
(function initAmbientGlow() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x    = ((e.clientX - rect.left) / rect.width)  * 100;
    const y    = ((e.clientY - rect.top)  / rect.height) * 100;
    hero.style.setProperty('--mouse-x', x + '%');
    hero.style.setProperty('--mouse-y', y + '%');
  });
})();
