// ---------- CAREER DESCRIPTIONS ----------
const careerDescriptions = {
  "Health Informatics Analyst": "Bridges the gap between clinical practice and IT by managing health info systems.",
  "Healthcare Data Analyst": "Interprets health data to improve patient outcomes and operational efficiency.",
  "Medical AI Specialist": "Develops ML models for diagnostics, image analysis, predictive healthcare.",
  "Hospital IT Specialist": "Manages hospital networks, EHR systems, and endpoint devices."
};

// ---------- ELEMENTS ----------
const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');
const saveSkillsBtn = document.getElementById('saveSkillsBtn');
const careerSelect = document.getElementById('careerSelect');
const careerDesc = document.getElementById('careerDescription');
const logoutBtn = document.getElementById('logout');

let currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

// ---------- SIGNUP LOGIC ----------
signupBtn?.addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  let users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.some(u => u.email === email)) {
    alert("User already exists with this email!");
    return;
  }

  const user = { name, email, password, skills: [], careerGoal: '' };
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(user));

  // Redirect to profile
  window.location.href = 'profile.html';
});

// ---------- LOGIN LOGIC ----------
loginBtn?.addEventListener('click', () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password!");
    return;
  }

  localStorage.setItem('currentUser', JSON.stringify(user));
  window.location.href = 'dashboard.html';
});

// ---------- PREFILL PROFILE & DASHBOARD ----------
window.addEventListener('DOMContentLoaded', () => {
  if (!currentUser) return;

  // Prefill skills in profile page
  document.querySelectorAll('.skill-box').forEach(box => {
    const skillName = box.querySelector('label').innerText;
    const skill = currentUser.skills?.find(s => s.name === skillName);
    if (skill) {
      box.querySelector('input').checked = true;
      box.querySelector('select').value = skill.level;
    }
  });

  // Prefill career
  if (careerSelect && currentUser.careerGoal) {
    careerSelect.value = currentUser.careerGoal;
    careerDesc.textContent = careerDescriptions[currentUser.careerGoal];
  }

  // Dashboard rendering
  const dashboardSkillGrid = document.querySelector('.skill-grid');
  const skillsGapDiv = document.getElementById('skillsGap');
  const userName = document.getElementById('userName');
  const careerGoalSpan = document.getElementById('careerGoal');

  if (userName) userName.textContent = `Welcome, ${currentUser.name}`;
  if (careerGoalSpan) careerGoalSpan.textContent = currentUser.careerGoal || "Select your career in profile";

  if (dashboardSkillGrid && currentUser.skills?.length) {
    dashboardSkillGrid.innerHTML = currentUser.skills.map(skill => `
      <div class="skill-box">
        <strong>${skill.name}</strong>
        <p>Level: ${skill.level}</p>
      </div>
    `).join('');
  }

  if (skillsGapDiv) {
    const allSkills = ["Python","SQL","FHIR","HIPAA","Machine Learning"];
    const missingSkills = allSkills.filter(s => !currentUser.skills?.some(sk => sk.name === s));
    if (missingSkills.length) {
      skillsGapDiv.innerHTML = `<p>Skills to improve for your career: ${missingSkills.join(', ')}</p>`;
    } else {
      skillsGapDiv.innerHTML = "<p>Great! You have all skills for your career goal.</p>";
    }
  }
});

// ---------- CAREER DESCRIPTION UPDATE ----------
careerSelect?.addEventListener('change', () => {
  careerDesc.textContent = careerDescriptions[careerSelect.value] || '';
});

// ---------- SAVE PROFILE SKILLS ----------
saveSkillsBtn?.addEventListener('click', () => {
  const skills = Array.from(document.querySelectorAll('.skill-box'))
    .map(box => {
      const name = box.querySelector('label').innerText;
      const level = box.querySelector('select').value;
      const checked = box.querySelector('input').checked;
      return checked ? { name, level } : null;
    })
    .filter(Boolean);

  const career = careerSelect.value;

  if (skills.length === 0 || !career) {
    alert('Please select at least one skill and a career goal.');
    return;
  }

  currentUser.skills = skills;
  currentUser.careerGoal = career;

  let users = JSON.parse(localStorage.getItem('users') || '[]');
  users = users.map(u => u.email === currentUser.email ? currentUser : u);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  window.location.href = 'dashboard.html';
});

// ---------- LOGOUT ----------
logoutBtn?.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
});
