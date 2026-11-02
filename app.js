document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) {
        menuButton.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });
  }

  const envelope = document.getElementById('envelope');
  const openButton = document.getElementById('open-letter');
  const letter = document.getElementById('letter-content');
  if (envelope && openButton && letter) {
    openButton.addEventListener('click', () => {
      const isOpen = openButton.getAttribute('aria-expanded') === 'true';
      if (!isOpen) {
        envelope.classList.add('is-open');
        openButton.setAttribute('aria-expanded', 'true');
        openButton.innerHTML = 'La lettre est ouverte <span>↓</span>';
        letter.hidden = false;
        window.setTimeout(() => letter.scrollIntoView({behavior: 'smooth', block: 'start'}), 220);
      } else {
        envelope.classList.remove('is-open');
        openButton.setAttribute('aria-expanded', 'false');
        openButton.innerHTML = 'Ouvrir la lettre <span>↗</span>';
        letter.hidden = true;
        envelope.scrollIntoView({behavior: 'smooth', block: 'center'});
      }
    });
  }

  const revealItems = document.querySelectorAll('[data-reveal]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }
});