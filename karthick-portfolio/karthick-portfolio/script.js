const skillData = {
  programming: {
    title: "Programming languages",
    description: "Core languages used across software development and technical projects.",
    items: [["Python", 92], ["Java", 82], ["JavaScript", 88], ["C++", 76], ["C", 70]]
  },
  web: {
    title: "Web development",
    description: "Frontend and application technologies for interactive, practical web experiences.",
    items: [["HTML / CSS", 95], ["JavaScript", 88], ["React", 78], ["Node.js", 72]]
  },
  data: {
    title: "Data & visualization",
    description: "Tools for cleaning, exploring, visualizing and communicating insights from data.",
    items: [["Pandas", 90], ["Matplotlib", 86], ["Seaborn", 78], ["Power BI", 84]]
  },
  cloud: {
    title: "Database & cloud",
    description: "Backend storage and cloud services used in application development.",
    items: [["Firebase", 86], ["MySQL", 84], ["MongoDB", 76], ["AWS", 68]]
  },
  tools: {
    title: "Developer tools",
    description: "Everyday tooling for coding, version control, notebooks and development workflows.",
    items: [["Git / GitHub", 90], ["VS Code", 94], ["Jupyter", 87], ["IntelliJ / Eclipse", 78], ["Cursor", 82]]
  }
};

const skillPanel = document.getElementById("skillPanel");
const tabs = document.querySelectorAll(".skill-tab");

function renderSkill(key) {
  const data = skillData[key];
  skillPanel.innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.description}</p>
    <div class="skill-bars">
      ${data.items.map(([name, val]) => `
        <div class="skill-line">
          <span>${name}</span>
          <div class="bar-track"><div class="bar-fill" data-value="${val}"></div></div>
          <span class="skill-pct">${val}%</span>
        </div>
      `).join("")}
    </div>`;
  requestAnimationFrame(() => document.querySelectorAll(".bar-fill").forEach(el => el.style.width = `${el.dataset.value}%`));
}

tabs.forEach(tab => tab.addEventListener("click", () => {
  tabs.forEach(t => t.classList.remove("active"));
  tab.classList.add("active");
  renderSkill(tab.dataset.skill);
}));
renderSkill("programming");

const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".project-card");
filterBtns.forEach(btn => btn.addEventListener("click", () => {
  filterBtns.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const filter = btn.dataset.filter;
  cards.forEach(card => {
    const matches = filter === "all" || card.dataset.category.includes(filter);
    card.style.display = matches ? "" : "none";
  });
}));

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") document.body.classList.add("light");
themeIcon.textContent = document.body.classList.contains("light") ? "☀" : "☾";

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  themeIcon.textContent = isLight ? "☀" : "☾";
});

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const nav = document.querySelector(".nav-wrap");
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 30);
  backTop.classList.toggle("show", window.scrollY > 600);
});
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const tiltCard = document.querySelector(".tilt");
window.addEventListener("pointermove", e => {
  if (!tiltCard || window.innerWidth < 900) return;
  const rect = tiltCard.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  if (x > -0.7 && x < 1.7 && y > -0.7 && y < 1.7) {
    tiltCard.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  }
});

document.querySelectorAll(".magnetic").forEach(el => {
  el.addEventListener("pointermove", e => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * .12}px, ${y * .12}px)`;
  });
  el.addEventListener("pointerleave", () => el.style.transform = "");
});

document.getElementById("year").textContent = new Date().getFullYear();
