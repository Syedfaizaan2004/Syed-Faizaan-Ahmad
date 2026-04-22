// ============================================================
//  ui.js  —  Rendering & Animations
// ============================================================

// ── Loader ───────────────────────────────────────────────────
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('loader-fade');
      setTimeout(() => loader.remove(), 700);
    }, 900);
  });
}

// ── Custom Cursor ────────────────────────────────────────────
function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring || window.matchMedia('(pointer:coarse)').matches) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.cssText = `left:${mx}px;top:${my}px`; });

  (function animRing() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.cssText = `left:${rx}px;top:${ry}px`;
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a,button,.btn,.tab-links,.filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('cursor-grow'));
    el.addEventListener('mouseleave', () => ring.classList.remove('cursor-grow'));
  });
}

// ── Scroll Progress Bar ──────────────────────────────────────
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ── Navbar Scroll Shrink ─────────────────────────────────────
function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => nav.classList.toggle('nav-scrolled', window.scrollY > 60), { passive: true });
}

// ── Scroll Reveal ─────────────────────────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal]:not(.revealed)');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
}

// ── Typing Animation ─────────────────────────────────────────
function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;
  const phrases = ['Web Developer', 'ECE Engineer', 'ML Enthusiast', 'Game Developer', 'UI / UX Designer'];
  let ti = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[ti];
    el.textContent = deleting ? phrase.slice(0, ci - 1) : phrase.slice(0, ci + 1);
    deleting ? ci-- : ci++;

    if (!deleting && ci === phrase.length) { setTimeout(() => { deleting = true; tick(); }, 1800); return; }
    if (deleting && ci === 0)             { deleting = false; ti = (ti + 1) % phrases.length; }
    setTimeout(tick, deleting ? 55 : 100);
  }
  tick();
}

// ── Animated Counters ────────────────────────────────────────
function initCounters() {
  const data = getData();
  const c = data.about.counters;

  const map = { 'counter-projects': c.projects, 'counter-skills': c.skills, 'counter-experience': c.experience };
  Object.entries(map).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.dataset.target = val;
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animCount(entry.target); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.counter-number').forEach(el => obs.observe(el));
}

function animCount(el) {
  const target = parseInt(el.dataset.target) || 0;
  let cur = 0;
  const step = target / 80;
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = Math.floor(cur) + '+';
    if (cur >= target) clearInterval(t);
  }, 20);
}

// ── Render Projects ──────────────────────────────────────────
function renderProjects(filterTech = 'All') {
  const data = getData();
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const list = filterTech === 'All' ? data.projects : data.projects.filter(p => p.techStack.includes(filterTech));

  if (!list.length) {
    grid.innerHTML = '<p class="no-results">No projects match this filter.</p>';
    return;
  }

  grid.innerHTML = list.map(p => `
    <div class="project-card" data-reveal="fade-up">
      <div class="project-img-wrap">
        <img src="${p.image || 'images/work_1.png'}" alt="${p.title}" loading="lazy"
             onerror="this.src='images/work_1.png'">
        <div class="project-overlay">
          <div class="project-links">
            ${p.liveLink  && p.liveLink  !== '#' ? `<a href="${p.liveLink}"  target="_blank" class="proj-link-btn" title="Live Demo"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
            ${p.githubLink && p.githubLink !== '#' ? `<a href="${p.githubLink}" target="_blank" class="proj-link-btn" title="GitHub"><i class="fa-brands fa-github"></i></a>` : ''}
          </div>
        </div>
      </div>
      <div class="project-info">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-tags">${p.techStack.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
    </div>`).join('');

  initScrollReveal();
}

// ── Project Filter Buttons ───────────────────────────────────
function initProjectFilters() {
  const data = getData();
  const fc = document.getElementById('project-filters');
  if (!fc) return;

  const techs = new Set(['All']);
  data.projects.forEach(p => p.techStack.forEach(t => techs.add(t)));

  fc.innerHTML = [...techs].map(t =>
    `<button class="filter-btn ${t === 'All' ? 'active' : ''}" data-filter="${t}">${t}</button>`
  ).join('');

  fc.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    fc.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
}

// ── Render Skills ─────────────────────────────────────────────
function renderSkills() {
  const data = getData();
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  grid.innerHTML = data.skills.map(s => `
    <div class="skill-card" data-reveal="fade-up">
      <i class="${s.icon}" style="color:${s.color}"></i>
      <span class="skill-name">${s.name}</span>
      <span class="skill-cat">${s.category}</span>
    </div>`).join('');

  initScrollReveal();
}

// ── Render About Text ─────────────────────────────────────────
function renderAbout() {
  const data = getData();
  const aboutEl = document.getElementById('about-text');
  const resumeBtn = document.getElementById('resume-btn');
  if (aboutEl) aboutEl.innerHTML = data.about.text;
  if (resumeBtn) resumeBtn.href = data.about.resumeLink || 'images/Syed faizaan CV.pdf';
}

// ── Mobile Nav ────────────────────────────────────────────────
function initMobileNav() {
  const burger = document.getElementById('hamburger');
  const menu   = document.getElementById('nav-menu');
  const close  = document.getElementById('nav-close');
  if (burger) burger.addEventListener('click', () => menu.classList.add('open'));
  if (close)  close.addEventListener('click',  () => menu.classList.remove('open'));
  document.querySelectorAll('#nav-menu a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

// ── About Tabs ────────────────────────────────────────────────
function initTabSystem() {
  document.querySelectorAll('.tab-links').forEach(link => {
    link.addEventListener('click', () => {
      const panel = link.closest('.about-col-2');
      panel.querySelectorAll('.tab-links').forEach(l => l.classList.remove('active-link'));
      panel.querySelectorAll('.tab-contents').forEach(c => c.classList.remove('active-tab'));
      link.classList.add('active-link');
      document.getElementById(link.dataset.tab).classList.add('active-tab');
    });
  });
}

// ── Bootstrap All ─────────────────────────────────────────────
function initUI() {
  initLoader();
  initScrollProgress();
  initNavScroll();
  initCursor();
  initTyping();
  renderAbout();
  renderSkills();
  renderProjects();
  initProjectFilters();
  initCounters();
  initScrollReveal();
  initMobileNav();
  initTabSystem();
}

document.addEventListener('DOMContentLoaded', initUI);
