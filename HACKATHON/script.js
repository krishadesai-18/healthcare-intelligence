// ================= CAREER DESCRIPTIONS =================
const careerDescriptions = {
  "Health Informatics Analyst":
    "Bridges the gap between clinical practice and IT by managing health information systems.",
  "Healthcare Data Analyst":
    "Interprets healthcare data to improve patient outcomes and efficiency.",
  "Medical AI Specialist":
    "Develops machine learning models for diagnostics and predictive healthcare.",
  "Hospital IT Specialist":
    "Manages hospital networks, EHR systems, and infrastructure."
};

// ================= ELEMENT REFERENCES =================
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const saveSkillsBtn = document.getElementById("saveSkillsBtn");
const careerSelect = document.getElementById("careerSelect");
const careerDesc = document.getElementById("careerDescription");
const logoutBtn = document.getElementById("logout");

let currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

// ================= SIGNUP =================
signupBtn?.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.some(u => u.email === email)) {
    alert("User already exists");
    return;
  }

  const user = { name, email, password, skills: [], careerGoal: "" };
  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(user));

  window.location.href = "profile.html";
});

// ================= LOGIN =================
loginBtn?.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "dashboard.html";
});

// ================= PAGE LOAD =================
window.addEventListener("DOMContentLoaded", () => {
  if (!currentUser) return;

  // -------- PROFILE PAGE PREFILL --------
  document.querySelectorAll(".skill-box").forEach(box => {
    const name = box.querySelector("label").innerText.trim();
    const skill = currentUser.skills.find(s => s.name === name);
    if (skill) {
      box.querySelector("input").checked = true;
      box.querySelector("select").value = skill.level;
    }
  });

  if (careerSelect && currentUser.careerGoal) {
    careerSelect.value = currentUser.careerGoal;
    careerDesc.textContent = careerDescriptions[currentUser.careerGoal];
  }

  // -------- DASHBOARD --------
  const grid = document.querySelector(".skill-grid");
  const userName = document.getElementById("userName");
  const careerGoalSpan = document.getElementById("careerGoal");

  if (userName) userName.textContent = `Welcome, ${currentUser.name}`;
  if (careerGoalSpan)
    careerGoalSpan.textContent =
      currentUser.careerGoal || "Select your career in profile";

  // Render skills WITH LEVELS
  if (grid && currentUser.skills.length) {
    grid.innerHTML = currentUser.skills
      .map(
        skill => `
      <div class="skill-box">
        <strong>${skill.name}</strong>
        <p>Level: ${skill.level}</p>
      </div>
    `
      )
      .join("");
  }

  // Backend skill-gap + chart + courses
  if (grid && currentUser.careerGoal) {
    analyzeFromBackend(currentUser.careerGoal);
    fetchRecommendedCourses(currentUser.careerGoal);
  }
});

// ================= CAREER CHANGE =================
careerSelect?.addEventListener("change", () => {
  careerDesc.textContent = careerDescriptions[careerSelect.value] || "";
});

// ================= SAVE PROFILE =================
saveSkillsBtn?.addEventListener("click", () => {
  const skills = Array.from(document.querySelectorAll(".skill-box"))
    .map(box => {
      const name = box.querySelector("label").innerText.trim();
      const level = box.querySelector("select").value;
      const checked = box.querySelector("input").checked;
      return checked ? { name, level } : null;
    })
    .filter(Boolean);

  const career = careerSelect.value;

  if (!skills.length || !career) {
    alert("Select at least one skill and career goal");
    return;
  }

  currentUser.skills = skills;
  currentUser.careerGoal = career;

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  users = users.map(u => (u.email === currentUser.email ? currentUser : u));

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  window.location.href = "dashboard.html";
});

// ================= LOGOUT =================
logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});

// ================= BACKEND ANALYSIS =================
function analyzeFromBackend(career) {
  const roleMap = {
    "Medical AI Specialist": "medical_ai_engineer",
    "Healthcare Data Analyst": "healthcare_data_analyst",
    "Health Informatics Analyst": "health_informatics_analyst"
  };

  const role = roleMap[career];
  if (!role) return;

  const payload = {
    role: role,
    skills: currentUser.skills
  };

  fetch("http://127.0.0.1:8000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("readinessFill").style.width = data.readiness + "%";
      document.getElementById("readinessFill").textContent = data.readiness + "%";
      renderChart(data.matched.length, data.missing.length);
      document.getElementById("skillsGap").innerHTML =
        data.missing.length
          ? `<p>Focus on: ${data.missing.join(", ")}</p>`
          : `<p>🎉 You meet all required skills!</p>`;
    })
    .catch(err => console.error("Error analyzing skills:", err));
}

// ================= FETCH RECOMMENDED COURSES =================
function fetchRecommendedCourses(career) {
  const roleMap = {
    "Medical AI Specialist": "medical_ai_engineer",
    "Healthcare Data Analyst": "healthcare_data_analyst",
    "Health Informatics Analyst": "health_informatics_analyst"
  };

  const role = roleMap[career];
  if (!role) return;

  const payload = {
    role: role,
    skills: currentUser.skills
  };

  fetch("http://127.0.0.1:8000/recommend-courses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("recommendedCourses");
      if (!container) return;
      
      if (data.recommended_courses.length === 0) {
        container.innerHTML = "<p style='color:#666;'>No additional courses recommended at this time.</p>";
        return;
      }
      
      container.innerHTML = data.recommended_courses
        .map(course => `
          <a href="${course.url}" target="_blank" rel="noopener noreferrer" class="course-card">
            <div class="course-title">${course.title}</div>
            <div class="course-provider">📚 ${course.provider}</div>
          </a>
        `)
        .join("");
    })
    .catch(err => console.error("Error fetching courses:", err));
}

// ================= CHART =================
function renderChart(matched, missing) {
  new Chart(document.getElementById("skillChart"), {
    type: "pie",
    data: {
      labels: ["Matched Skills", "Missing Skills"],
      datasets: [
        {
          data: [matched, missing],
          backgroundColor: ["#22c55e", "#f97316"]
        }
      ]
    }
  });
}
