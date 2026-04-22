// ============================================================
//  dashboard.js  —  Hidden Admin Panel
//  Trigger : Ctrl + Shift + D  OR  ?admin=1 in URL
//  Password: faizaan@admin  (change DASHBOARD_PASSWORD below)
// ============================================================

const DASHBOARD_PASSWORD = 'faizaan@admin';
let dashUnlocked = false;

// ── Auto-sync counters to real array lengths ──────────────
function syncCounters() {
  const data = getData();
  data.about.counters.projects = data.projects.length;
  data.about.counters.skills   = data.skills.length;
  saveData(data);
  // Update counter display on portfolio
  const projEl = document.getElementById('counter-projects');
  const skillEl = document.getElementById('counter-skills');
  if (projEl)  { projEl.dataset.target  = data.about.counters.projects;  projEl.textContent  = data.about.counters.projects + '+'; }
  if (skillEl) { skillEl.dataset.target = data.about.counters.skills;    skillEl.textContent = data.about.counters.skills    + '+'; }
  // Also update the About-tab input fields if dashboard is open
  const pIn = document.getElementById('counter-proj-input');
  const sIn = document.getElementById('counter-skills-input');
  if (pIn)  pIn.value  = data.about.counters.projects;
  if (sIn)  sIn.value  = data.about.counters.skills;
}

// ── Keyboard Trigger ─────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.shiftKey && e.key === 'D') { e.preventDefault(); openDashboard(); }
});

// ── URL Trigger (?admin=1) ────────────────────────────────────
if (new URLSearchParams(window.location.search).get('admin') === '1') {
  window.addEventListener('DOMContentLoaded', openDashboard);
}

// ── Open / Close ─────────────────────────────────────────────
function openDashboard() {
  if (!dashUnlocked) {
    const pwd = prompt('🔐 Dashboard Password:');
    if (pwd === null) return;
    if (pwd !== DASHBOARD_PASSWORD) { alert('❌ Incorrect password. Access denied.'); return; }
    dashUnlocked = true;
  }
  document.getElementById('dashboard-overlay').classList.add('active');
  loadDashboardData();
}

function closeDashboard() {
  document.getElementById('dashboard-overlay').classList.remove('active');
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDashboard(); });

// ── Dashboard Tabs ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dash-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dash-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.dash-tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('dash-' + btn.dataset.tab).classList.add('active');
    });
  });
});

function loadDashboardData() {
  loadProjectsList();
  loadSkillsList();
  loadAboutForm();
  loadResumeForm();
}

// ════════════════════════════════════════════════════════════
//  PROJECTS TAB
// ════════════════════════════════════════════════════════════
function loadProjectsList() {
  const data = getData();
  const list = document.getElementById('dash-projects-list');
  if (!list) return;
  list.innerHTML = data.projects.length ? data.projects.map(p => `
    <div class="dash-item" id="dproj-${p.id}">
      <div class="dash-item-info">
        <strong>${p.title}</strong>
        <small>${p.techStack.join(', ')}</small>
      </div>
      <div class="dash-item-actions">
        <button class="dash-btn dash-edit"   onclick="editProject('${p.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
        <button class="dash-btn dash-delete" onclick="deleteProject('${p.id}')"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`).join('') : '<p class="dash-empty">No projects yet.</p>';
}

function editProject(id) {
  const p = getData().projects.find(x => x.id === id);
  if (!p) return;
  document.getElementById('proj-id').value       = p.id;
  document.getElementById('proj-title').value    = p.title;
  document.getElementById('proj-desc').value     = p.description;
  document.getElementById('proj-live').value     = p.liveLink;
  document.getElementById('proj-github').value   = p.githubLink;
  document.getElementById('proj-image').value    = p.image;
  document.getElementById('proj-tech').value     = p.techStack.join(', ');
  document.getElementById('proj-form-title').textContent = '✏️ Edit Project';
  document.getElementById('proj-cancel').style.display   = 'inline-flex';
  document.getElementById('project-form').scrollIntoView({ behavior: 'smooth' });
}

function deleteProject(id) {
  if (!confirm('Delete this project?')) return;
  const data = getData();
  data.projects = data.projects.filter(p => p.id !== id);
  saveData(data); loadProjectsList(); renderProjects(); initProjectFilters();
  syncCounters();
  showToast('🗑️ Project deleted');
}

function clearProjectForm() {
  document.getElementById('proj-id').value = '';
  ['proj-title','proj-desc','proj-live','proj-github','proj-image','proj-tech'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('proj-form-title').textContent          = '➕ Add New Project';
  document.getElementById('proj-cancel').style.display            = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('project-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = getData();
    const id   = document.getElementById('proj-id').value;
    const proj = {
      id:          id || 'p' + Date.now(),
      title:       document.getElementById('proj-title').value.trim(),
      description: document.getElementById('proj-desc').value.trim(),
      liveLink:    document.getElementById('proj-live').value.trim() || '#',
      githubLink:  document.getElementById('proj-github').value.trim() || '#',
      image:       document.getElementById('proj-image').value.trim() || 'images/work_1.png',
      techStack:   document.getElementById('proj-tech').value.split(',').map(s => s.trim()).filter(Boolean)
    };
    if (id) { const i = data.projects.findIndex(p => p.id === id); if (i > -1) data.projects[i] = proj; }
    else data.projects.push(proj);
    saveData(data); clearProjectForm(); loadProjectsList(); renderProjects(); initProjectFilters();
    syncCounters();
    showToast('✅ Project saved!');
  });

  document.getElementById('proj-cancel')?.addEventListener('click', clearProjectForm);
});

// ════════════════════════════════════════════════════════════
//  SKILLS TAB
// ════════════════════════════════════════════════════════════
function loadSkillsList() {
  const data = getData();
  const list = document.getElementById('dash-skills-list');
  if (!list) return;
  list.innerHTML = data.skills.length ? data.skills.map(s => `
    <div class="dash-item">
      <div class="dash-item-info">
        <i class="${s.icon}" style="color:${s.color};font-size:1.2rem;margin-right:8px"></i>
        <strong>${s.name}</strong>
        <small>${s.category}</small>
      </div>
      <button class="dash-btn dash-delete" onclick="deleteSkill('${s.id}')"><i class="fa-solid fa-trash"></i></button>
    </div>`).join('') : '<p class="dash-empty">No skills yet.</p>';
}

function deleteSkill(id) {
  if (!confirm('Delete this skill?')) return;
  const data = getData();
  data.skills = data.skills.filter(s => s.id !== id);
  saveData(data); loadSkillsList(); renderSkills();
  syncCounters();
  showToast('🗑️ Skill removed');
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('skill-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = getData();
    data.skills.push({
      id:       's' + Date.now(),
      name:     document.getElementById('skill-name').value.trim(),
      icon:     document.getElementById('skill-icon').value.trim(),
      color:    document.getElementById('skill-color').value,
      category: document.getElementById('skill-category').value.trim()
    });
    saveData(data); form.reset(); loadSkillsList(); renderSkills();
    syncCounters();
    showToast('✅ Skill added!');
  });
});

// ════════════════════════════════════════════════════════════
//  ABOUT TAB
// ════════════════════════════════════════════════════════════
function loadAboutForm() {
  const data = getData();
  const plain = data.about.text.replace(/<[^>]+>/g, '');
  document.getElementById('about-editor').value         = plain;
  document.getElementById('counter-proj-input').value   = data.about.counters.projects;
  document.getElementById('counter-skills-input').value = data.about.counters.skills;
  document.getElementById('counter-exp-input').value    = data.about.counters.experience;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('about-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = getData();
    data.about.text = document.getElementById('about-editor').value;
    data.about.counters.projects   = parseInt(document.getElementById('counter-proj-input').value)   || 0;
    data.about.counters.skills     = parseInt(document.getElementById('counter-skills-input').value) || 0;
    data.about.counters.experience = parseInt(document.getElementById('counter-exp-input').value)    || 0;
    saveData(data); renderAbout(); initCounters();
    showToast('✅ About section updated!');
  });
});

// ════════════════════════════════════════════════════════════
//  RESUME TAB
// ════════════════════════════════════════════════════════════
function loadResumeForm() {
  const data = getData();
  document.getElementById('resume-link-input').value = data.about.resumeLink || 'images/Syed faizaan CV.pdf';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('resume-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = getData();
    data.about.resumeLink = document.getElementById('resume-link-input').value.trim();
    saveData(data); renderAbout();
    showToast('✅ Resume link updated!');
  });
});

// ── Toast Notification ────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('dash-toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

// ════════════════════════════════════════════════════════════
//  GITHUB IMPORT TAB
// ════════════════════════════════════════════════════════════
let ghFetchedRepos = [];  // stores raw API response

async function fetchGitHubRepos() {
  const username = document.getElementById('gh-username').value.trim();
  if (!username) { showToast('⚠️ Enter a GitHub username'); return; }

  const status   = document.getElementById('gh-status');
  const repoList = document.getElementById('gh-repo-list');
  const actions  = document.getElementById('gh-actions');
  const btn      = document.getElementById('gh-fetch-btn');

  // Show loading state
  status.style.display   = 'block';
  repoList.innerHTML     = '';
  actions.style.display  = 'none';
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Fetching…';

  try {
    const res  = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if (!res.ok) throw new Error(res.status === 404 ? 'User not found' : 'GitHub API error');
    ghFetchedRepos = await res.json();

    status.style.display = 'none';
    renderGhRepoList(ghFetchedRepos);
    actions.style.display = 'flex';
    showToast(`✅ Found ${ghFetchedRepos.length} repositories`);
  } catch (err) {
    status.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="font-size:1.4rem;color:var(--danger);display:block;margin-bottom:10px"></i>${err.message}`;
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-rotate"></i> Fetch Repos';
  }
}

function renderGhRepoList(repos) {
  const list = document.getElementById('gh-repo-list');
  const existingIds = new Set(getData().projects.map(p => p.githubLink));

  list.innerHTML = repos.map(repo => {
    const alreadyImported = existingIds.has(repo.html_url);
    const tags = repo.topics?.length ? repo.topics : (repo.language ? [repo.language] : []);

    return `
    <div class="gh-repo-item" id="ghrepo-${repo.id}">
      <div class="gh-repo-top">
        <label class="gh-checkbox-label">
          <input type="checkbox" class="gh-check" data-id="${repo.id}" ${alreadyImported ? 'checked' : ''}>
          <span class="gh-repo-name">
            ${repo.name}
            ${alreadyImported ? '<span class="gh-badge-imported">✓ imported</span>' : ''}
          </span>
        </label>
        <div class="gh-repo-meta">
          ${repo.language ? `<span class="gh-lang"><i class="fa-solid fa-circle" style="font-size:.5rem"></i> ${repo.language}</span>` : ''}
          <span class="gh-stars"><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>
          ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="gh-live-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live</a>` : ''}
        </div>
      </div>
      <p class="gh-repo-desc">${repo.description || '<em style="color:var(--muted)">No description</em>'}</p>
      ${tags.length ? `<div class="gh-tags">${tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
      <div class="gh-image-row">
        <label style="font-size:.78rem;color:var(--muted);font-weight:600">Custom Image URL (optional):</label>
        <input type="text" class="gh-image-input" data-id="${repo.id}" placeholder="https://… or images/my-project.png"
               style="width:100%;margin-top:6px;background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:8px;padding:8px 12px;color:var(--text);font-size:.82rem;font-family:inherit;outline:none">
      </div>
    </div>`;
  }).join('');
}

function selectAllRepos(state) {
  document.querySelectorAll('.gh-check').forEach(cb => cb.checked = state);
}

function importSelectedRepos() {
  const checked = [...document.querySelectorAll('.gh-check:checked')];
  if (!checked.length) { showToast('⚠️ Select at least one repo'); return; }

  const data = getData();
  const existingLinks = new Set(data.projects.map(p => p.githubLink));
  let added = 0, skipped = 0;

  checked.forEach(cb => {
    const repoId = parseInt(cb.dataset.id);
    const repo   = ghFetchedRepos.find(r => r.id === repoId);
    if (!repo) return;

    // Skip duplicates
    if (existingLinks.has(repo.html_url)) { skipped++; return; }

    const imgInput = document.querySelector(`.gh-image-input[data-id="${repoId}"]`);
    const customImg = imgInput?.value.trim() || '';
    const tags = repo.topics?.length ? repo.topics : (repo.language ? [repo.language] : ['GitHub']);

    data.projects.push({
      id:          'gh_' + repo.id,
      title:       repo.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      description: repo.description || `A project by ${repo.owner?.login || 'me'} on GitHub.`,
      liveLink:    repo.homepage || '#',
      githubLink:  repo.html_url,
      image:       customImg || 'images/work_1.png',
      techStack:   tags
    });
    existingLinks.add(repo.html_url);
    added++;
  });

  saveData(data);
  renderProjects();
  initProjectFilters();
  loadProjectsList();
  syncCounters();

  const msg = skipped
    ? `✅ Imported ${added} repo(s). ${skipped} already existed.`
    : `✅ Imported ${added} repo(s) successfully!`;
  showToast(msg);

  // Re-render list to show updated "imported" badges
  renderGhRepoList(ghFetchedRepos);
}
