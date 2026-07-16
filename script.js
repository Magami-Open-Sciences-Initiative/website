const header = document.getElementById('header');
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      header.classList.toggle('scrolled', window.scrollY > 60);
      ticking = false;
    });
    ticking = true;
  }
});

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const stepObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const step = entry.target;
    if (entry.isIntersecting) {
      step.classList.add('active');
    }
  });
}, { threshold: 0.25, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.process-step').forEach(el => stepObserver.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

const themeToggle = document.getElementById('themeToggle');
function setTheme(dark) {
  if (dark) {
    document.documentElement.classList.add('dark');
    themeToggle.textContent = '\u260C';
  } else {
    document.documentElement.classList.remove('dark');
    themeToggle.textContent = '\u261E';
  }
  localStorage.setItem('magami-theme', dark ? 'dark' : 'light');
}
const saved = localStorage.getItem('magami-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(saved ? saved === 'dark' : prefersDark);
themeToggle.addEventListener('click', () => {
  setTheme(!document.documentElement.classList.contains('dark'));
});
