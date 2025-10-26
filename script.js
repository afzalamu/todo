// ---------------- THEME ----------------
(function themeInit(){
  const btns = document.querySelectorAll('#themeToggle');
  const setTheme = (t) => {
    document.documentElement.setAttribute('data-theme', t);
    btns.forEach(b => { if (b) b.textContent = t === 'dark' ? '☀️' : '🌙'; });
    localStorage.setItem('theme', t);
  };
  const saved = localStorage.getItem('theme') || 'light';
  setTheme(saved);
  btns.forEach(b => { if (!b) return; b.addEventListener('click', ()=> setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark')); });
})();

// ---------------- QUOTES ----------------
const quotes = [
  "Small steps every day lead to big changes.",
  "Consistency beats motivation.",
  "Your only limit is your belief.",
  "Be proud of how far you've come.",
  "Energy flows where attention goes.",
  "Every day is a fresh start.",
  "Discipline is stronger than mood.",
  "Learn, then apply. Repeat."
];
(function quoteInit(){
  const qEl = document.getElementById('quote');
  const next = document.getElementById('nextQuote');
  if (!qEl) return;
  const show = () => { qEl.textContent = quotes[Math.floor(Math.random()*quotes.length)]; };
  show();
  if (next) next.addEventListener('click', show);
})();

// ---------------- MOOD ----------------
(function moodInit(){
  const input = document.getElementById('moodInput');
  const save = document.getElementById('saveMood');
  const list = document.getElementById('moodList');
  if (!save) return;
  function render(){
    const arr = JSON.parse(localStorage.getItem('moods')||'[]').slice(-7).reverse();
    list.innerHTML = '';
    arr.forEach(m => { const li = document.createElement('li'); li.textContent = `${new Date().toLocaleDateString()}: ${m}`; list.appendChild(li); });
  }
  render();
  save.addEventListener('click', ()=>{
    const v = input.value.trim(); if(!v) return;
    const arr = JSON.parse(localStorage.getItem('moods')||'[]');
    arr.push(v); localStorage.setItem('moods', JSON.stringify(arr)); input.value=''; render();
  });
})();

// ---------------- SCHEDULE ----------------
(function scheduleInit(){
  const box = document.getElementById('scheduleText');
  if(!box) return;
  box.value = localStorage.getItem('schedule') || '';
  box.addEventListener('input', ()=> localStorage.setItem('schedule', box.value));
})();

// ---------------- HABITS ----------------
(function habitsInit(){
  const tableBody = (document.getElementById('habitTable')||{}).querySelector('tbody');
  const addBtn = document.getElementById('addHabit');
  const resetBtn = document.getElementById('resetHabits');

  if (!tableBody) return;
  function render(){
    tableBody.innerHTML = '';
    const habits = JSON.parse(localStorage.getItem('habits')||'[]');
    habits.forEach((h, idx) => {
      const tr = document.createElement('tr');
      const tdName = document.createElement('td'); tdName.textContent = h.name; tr.appendChild(tdName);
      for(let i=0;i<7;i++){
        const td = document.createElement('td');
        const cb = document.createElement('input'); cb.type='checkbox'; cb.checked = !!h.days[i];
        cb.addEventListener('change', ()=> { h.days[i]=cb.checked; save(); });
        td.appendChild(cb); tr.appendChild(td);
      }
      tableBody.appendChild(tr);
    });
  }
  function save(){ const habits = Array.from(tableBody.querySelectorAll('tr')).map(r=>({ name: r.children[0].textContent, days: Array.from(r.querySelectorAll('input')).map(i=>i.checked) })); localStorage.setItem('habits', JSON.stringify(habits)); }
  if (addBtn) addBtn.addEventListener('click', ()=> {
    const name = prompt('Enter habit name (e.g., Walk 10 min)'); if(!name) return;
    const habits = JSON.parse(localStorage.getItem('habits')||'[]'); habits.push({ name, days:[false,false,false,false,false,false,false] }); localStorage.setItem('habits', JSON.stringify(habits)); render();
  });
  if (resetBtn) resetBtn.addEventListener('click', ()=> { if(confirm('Clear habits and start new week?')){ localStorage.removeItem('habits'); render(); } });
  render();
})();

// ---------------- GOALS ----------------
(function goalsInit(){
  const input = document.getElementById('goalInput'); const add = document.getElementById('addGoal'); const list = document.getElementById('goalList');
  if(!add) return;
  function render(){ list.innerHTML=''; JSON.parse(localStorage.getItem('goals')||'[]').forEach((g,i)=>{ const li=document.createElement('li'); li.textContent=g; const d=document.createElement('button'); d.textContent='Done'; d.className='btn small'; d.addEventListener('click', ()=>{ const arr=JSON.parse(localStorage.getItem('goals')||'[]'); arr.splice(i,1); localStorage.setItem('goals', JSON.stringify(arr)); render(); }); li.appendChild(d); list.appendChild(li); }); }
  add.addEventListener('click', ()=> { const v=input.value.trim(); if(!v) return; const arr=JSON.parse(localStorage.getItem('goals')||'[]'); arr.push(v); localStorage.setItem('goals', JSON.stringify(arr)); input.value=''; render(); });
  render();
})();

// ---------------- LEARNING ----------------
(function learnInit(){
  const input = document.getElementById('learnInput'); const add = document.getElementById('addLearn'); const list = document.getElementById('learnList');
  if(!add) return;
  function render(){ list.innerHTML=''; JSON.parse(localStorage.getItem('learning')||'[]').forEach((it,i)=>{ const li=document.createElement('li'); const name=document.createElement('div'); name.textContent=it.name || it; const prog=document.createElement('input'); prog.type='range'; prog.min=0; prog.max=100; prog.value=it.progress||0; prog.addEventListener('input', ()=> { const arr=JSON.parse(localStorage.getItem('learning')||'[]'); arr[i].progress = Number(prog.value); localStorage.setItem('learning', JSON.stringify(arr)); render(); }); const del=document.createElement('button'); del.textContent='Remove'; del.className='btn small'; del.addEventListener('click', ()=>{ const arr=JSON.parse(localStorage.getItem('learning')||'[]'); arr.splice(i,1); localStorage.setItem('learning', JSON.stringify(arr)); render(); }); li.appendChild(name); li.appendChild(prog); li.appendChild(del); list.appendChild(li); }); }
  add.addEventListener('click', ()=>{ const v=input.value.trim(); if(!v) return; const arr=JSON.parse(localStorage.getItem('learning')||'[]'); arr.push({ name:v, progress:0 }); localStorage.setItem('learning', JSON.stringify(arr)); input.value=''; render(); });
  render();
})();

// ---------------- REVIEWS ----------------
(function reviewInit(){
  const good = document.getElementById('reviewGood'); const bad = document.getElementById('reviewBad'); const next = document.getElementById('reviewNext'); const btn = document.getElementById('saveReview'); const list = document.getElementById('reviewList');
  if(!btn) return;
  function render(){ list.innerHTML=''; JSON.parse(localStorage.getItem('reviews')||'[]').slice().reverse().forEach(r=>{ const li=document.createElement('li'); li.textContent = `${r.date} — Good: ${r.good} | Bad: ${r.bad} | Next: ${r.next}`; list.appendChild(li); }); }
  btn.addEventListener('click', ()=>{ const arr=JSON.parse(localStorage.getItem('reviews')||'[]'); arr.push({ date: new Date().toLocaleDateString(), good: good.value, bad: bad.value, next: next.value }); localStorage.setItem('reviews', JSON.stringify(arr)); good.value=bad.value=next.value=''; render(); });
  render();
})();

// ---------------- EXPORT / IMPORT ----------------
(function importExport(){
  const exportBtn = document.getElementById('exportData');
  const importBtn = document.getElementById('importBtn');
  const importFile = document.getElementById('importData');
  if (exportBtn) exportBtn.addEventListener('click', ()=> {
    const data = {
      habits: localStorage.getItem('habits'),
      goals: localStorage.getItem('goals'),
      moods: localStorage.getItem('moods'),
      learning: localStorage.getItem('learning'),
      reviews: localStorage.getItem('reviews'),
      schedule: localStorage.getItem('schedule'),
      theme: localStorage.getItem('theme')
    };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'life_tracker_backup.json'; a.click();
  });
  if(importBtn && importFile){
    importBtn.addEventListener('click', ()=> importFile.click());
    importFile.addEventListener('change', (e)=> {
      const f = e.target.files[0]; if(!f) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          Object.keys(data).forEach(k => { if (data[k] !== null) localStorage.setItem(k, data[k]); });
          alert('Import complete — reload pages to see changes.');
        } catch(err){ alert('Invalid file'); }
      };
      reader.readAsText(f);
    });
  }
})();

