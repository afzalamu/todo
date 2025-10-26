// ... (Theme function) ...

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

// ---------------- QUICK LINKS (NEW) ----------------
const quickLinks = [
    { name: "My Work Repo", url: "https://github.com/your-repo" },
    { name: "Learning Course", url: "https://udemy.com" },
    { name: "Daily News", url: "https://news.google.com" }
];
(function quickLinksInit(){
    const list = document.getElementById('quickLinksList');
    if (!list) return;

    list.innerHTML = '';
    quickLinks.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.name;
        a.target = '_blank'; // Opens in a new tab
        a.className = 'link-text';
        li.appendChild(a);
        list.appendChild(li);
    });
})();

// ---------------- QUICK NOTE ----------------
(function quickNoteInit(){
// ... (rest of quickNoteInit and other functions) ...
