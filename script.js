// ========== THEME TOGGLE ==========
const themeBtn = document.getElementById("themeToggle");
if (themeBtn) {
  themeBtn.onclick = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeBtn.textContent = newTheme === "dark" ? "☀️" : "🌙";
  };
  const saved = localStorage.getItem("theme");
  if (saved) {
    document.documentElement.setAttribute("data-theme", saved);
    themeBtn.textContent = saved === "dark" ? "☀️" : "🌙";
  }
}

// ========== QUOTES ==========
const quotes = [
  "Small steps every day lead to big changes.",
  "Consistency beats motivation.",
  "Your only limit is your belief.",
  "Be proud of how far you've come.",
  "Energy flows where attention goes.",
  "Every day is a fresh start.",
  "Discipline is stronger than mood."
];
const quoteEl = document.getElementById("quote");
const nextQuote = document.getElementById("nextQuote");
if (quoteEl) {
  function showQuote() {
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.textContent = q;
  }
  showQuote();
  nextQuote.onclick = showQuote;
}

// ========== MOOD TRACKER ==========
const moodInput = document.getElementById("moodInput");
const saveMood = document.getElementById("saveMood");
const moodList = document.getElementById("moodList");
if (saveMood) {
  function loadMoods() {
    const moods = JSON.parse(localStorage.getItem("moods") || "[]");
    moodList.innerHTML = "";
    moods.slice(-7).forEach(m => {
      const li = document.createElement("li");
      li.textContent = m;
      moodList.appendChild(li);
    });
  }
  loadMoods();
  saveMood.onclick = () => {
    const val = moodInput.value.trim();
    if (!val) return;
    const moods = JSON.parse(localStorage.getItem("moods") || "[]");
    moods.push(val);
    localStorage.setItem("moods", JSON.stringify(moods));
    moodInput.value = "";
    loadMoods();
  };
}

// ========== SCHEDULE ==========
const scheduleBox = document.getElementById("scheduleText");
if (scheduleBox) {
  scheduleBox.value = localStorage.getItem("schedule") || "";
  scheduleBox.addEventListener("input", () => {
    localStorage.setItem("schedule", scheduleBox.value);
  });
}

// ========== HABITS ==========
const habitTable = document.getElementById("habitTable");
const addHabitBtn = document.getElementById("addHabit");
const resetHabits = document.getElementById("resetHabits");

function addHabitRow(h) {
  const row = document.createElement("tr");
  const name = document.createElement("td");
  name.textContent = h.name;
  row.appendChild(name);
  for (let i = 0; i < 7; i++) {
    const td = document.createElement("td");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = h.days[i];
    cb.addEventListener("change", saveHabits);
    td.appendChild(cb);
    row.appendChild(td);
  }
  habitTable.appendChild(row);
}

function saveHabits() {
  const rows = Array.from(habitTable.querySelectorAll("tr")).slice(1);
  const habits = rows.map(r => ({
    name: r.children[0].textContent,
    days: Array.from(r.querySelectorAll("input")).map(c => c.checked)
  }));
  localStorage.setItem("habits", JSON.stringify(habits));
}

function loadHabits() {
  const habits = JSON.parse(localStorage.getItem("habits") || "[]");
  habits.forEach(addHabitRow);
}

if (habitTable && addHabitBtn) {
  loadHabits();
  addHabitBtn.onclick = () => {
    const name = prompt("Enter habit name:");
    if (name) {
      addHabitRow({ name, days: [false,false,false,false,false,false,false] });
      saveHabits();
    }
  };
}
if (resetHabits) {
  resetHabits.onclick = () => {
    localStorage.removeItem("habits");
    location.reload();
  };
}

// ========== GOALS ==========
const goalInput = document.getElementById("goalInput");
const addGoalBtn = document.getElementById("addGoal");
const goalList = document.getElementById("goalList");
if (addGoalBtn) {
  function loadGoals() {
    const goals = JSON.parse(localStorage.getItem("goals") || "[]");
    goalList.innerHTML = "";
    goals.forEach(g => addGoalElement(g));
  }
  function addGoalElement(text) {
    const li = document.createElement("li");
    li.textContent = text;
    const del = document.createElement("button");
    del.textContent = "Delete";
    del.onclick = () => {
      li.remove(); saveGoals();
    };
    li.appendChild(del);
    goalList.appendChild(li);
  }
  function saveGoals() {
    const goals = Array.from(goalList.children).map(li => li.firstChild.textContent);
    localStorage.setItem("goals", JSON.stringify(goals));
  }
  addGoalBtn.onclick = () => {
    const val = goalInput.value.trim();
    if (!val) return;
    addGoalElement(val);
    saveGoals();
    goalInput.value = "";
  };
  loadGoals();
}

// ========== REVIEW ==========
const reviewGood = document.getElementById("reviewGood");
const reviewBad = document.getElementById("reviewBad");
const reviewNext = document.getElementById("reviewNext");
const reviewList = document.getElementById("reviewList");
const saveReview = document.getElementById("saveReview");

if (saveReview) {
  function loadReviews() {
    const revs = JSON.parse(localStorage.getItem("reviews") || "[]");
    reviewList.innerHTML = "";
    revs.forEach(r => {
      const li = document.createElement("li");
      li.textContent = `${r.date}: ${r.good} / ${r.bad} / ${r.next}`;
      reviewList.appendChild(li);
    });
  }
  loadReviews();
  saveReview.onclick = () => {
    const revs = JSON.parse(localStorage.getItem("reviews") || "[]");
    revs.push({
      date: new Date().toLocaleDateString(),
      good: reviewGood.value,
      bad: reviewBad.value,
      next: reviewNext.value
    });
    localStorage.setItem("reviews", JSON.stringify(revs));
    reviewGood.value = reviewBad.value = reviewNext.value = "";
    loadReviews();
  };
}

// ========== LEARNING ==========
const learnInput = document.getElementById("learnInput");
const addLearn = document.getElementById("addLearn");
const learnList = document.getElementById("learnList");

if (addLearn) {
  function loadLearn() {
    const learn = JSON.parse(localStorage.getItem("learning") || "[]");
    learnList.innerHTML = "";
    learn.forEach(addLearnElement);
  }
  function addLearnElement(name) {
    const li = document.createElement("li");
    li.textContent = name;
    const del = document.createElement("button");
    del.textContent = "Done";
    del.onclick = () => {
      li.remove();
      saveLearn();
    };
    li.appendChild(del);
    learnList.appendChild(li);
  }
  function saveLearn() {
    const learn = Array.from(learnList.children).map(li => li.firstChild.textContent);
    localStorage.setItem("learning", JSON.stringify(learn));
  }
  addLearn.onclick = () => {
    const val = learnInput.value.trim();
    if (!val) return;
    addLearnElement(val);
    saveLearn();
    learnInput.value = "";
  };
  loadLearn();
}

// ========== EXPORT / IMPORT ==========
const exportBtn = document.getElementById("exportData");
const importBtn = document.getElementById("importBtn");
const importFile = document.getElementById("importData");

if (exportBtn) {
  exportBtn.onclick = () => {
    const data = {
      habits: localStorage.getItem("habits"),
      goals: localStorage.getItem("goals"),
      moods: localStorage.getItem("moods"),
      learning: localStorage.getItem("learning"),
      reviews: localStorage.getItem("reviews"),
      schedule: localStorage.getItem("schedule")
    };
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "life_tracker_backup.json";
    a.click();
  };
}
if (importBtn && importFile) {
  importBtn.onclick = () => importFile.click();
  importFile.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const data = JSON.parse(evt.target.result);
      for (let key in data) {
        if (data[key]) localStorage.setItem(key, data[key]);
      }
      alert("Data imported! Reload page.");
    };
    reader.readAsText(file);
  };
}
