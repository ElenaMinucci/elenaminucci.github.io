const sections = document.querySelectorAll('#main section[id]');
const navLinks = document.querySelectorAll('#nav a');

const visibleSections = new Set();

function updateActiveNav() {
  let activeId = null;
  for (const section of sections) {
    if (visibleSections.has(section.id)) {
      activeId = section.id;
      break;
    }
  }
  navLinks.forEach(l => l.classList.remove('active'));
  if (activeId) {
    const link = document.querySelector(`#nav a[href="#${activeId}"]`);
    if (link) link.classList.add('active');
  }
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      visibleSections.add(entry.target.id);
    } else {
      visibleSections.delete(entry.target.id);
    }
  });
  updateActiveNav();
}, { threshold: 0.1, rootMargin: '0px 0px -40% 0px' });

sections.forEach(s => observer.observe(s));

// If scrolled to the bottom, force the last section active
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 10) {
    const lastSection = sections[sections.length - 1];
    navLinks.forEach(l => l.classList.remove('active'));
    const link = document.querySelector(`#nav a[href="#${lastSection.id}"]`);
    if (link) link.classList.add('active');
  }
});

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Publication count
const pubCount = document.getElementById('pub-count');
if (pubCount) {
  const n = document.querySelectorAll('#publications .pub-entry').length;
  pubCount.textContent = n + ' publication' + (n !== 1 ? 's' : '');
}

// News toggle
const newsToggle = document.getElementById('newsToggle');
const newsOlder  = document.getElementById('news-older');
if (newsToggle && newsOlder) {
  newsToggle.addEventListener('click', function () {
    if (newsOlder.hasAttribute('hidden')) {
      newsOlder.removeAttribute('hidden');
      newsToggle.textContent = 'Hide older news';
    } else {
      newsOlder.setAttribute('hidden', '');
      newsToggle.textContent = 'Show older news';
    }
  });
}
