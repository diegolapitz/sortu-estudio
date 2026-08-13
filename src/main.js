import './styles.css';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function clearInitialHash() {
  if (!window.location.hash) return;
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  window.scrollTo(0, 0);
}

function revealOnScroll() {
  if (prefersReducedMotion) {
    $$('.reveal').forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const show = (element) => {
    element.classList.add('is-visible');
    observer.unobserve(element);
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      show(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  $$('.reveal').forEach((element, index) => {
    element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
    observer.observe(element);
  });

  // Some embedded browsers initialize IntersectionObserver after the first
  // paint. This viewport sweep makes the first hero reveal deterministic.
  const sweep = () => {
    $$('.reveal:not(.is-visible)').forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) show(element);
    });
  };
  requestAnimationFrame(() => requestAnimationFrame(sweep));
  window.setTimeout(sweep, 420);
  document.addEventListener('scroll', sweep, { passive: true, capture: true });
  window.addEventListener('resize', sweep, { passive: true });
}

function syncHeaderLogo() {
  const hero = document.querySelector('.hero');
  const headerLogo = document.querySelector('[data-header-logo]');
  if (!hero || !headerLogo) return;
  const update = () => headerLogo.classList.toggle('is-visible', hero.getBoundingClientRect().bottom < 135);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function setupMenu() {
  const button = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!button || !menu) return;
  const close = () => {
    button.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  };
  button.addEventListener('click', () => {
    const next = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(next));
    menu.classList.toggle('is-open', next);
  });
  $$('a', menu).forEach((link) => link.addEventListener('click', close));
}

function safePlay(video) {
  if (!video || prefersReducedMotion) return;
  video.play().catch(() => {});
}

function observeVideos() {
  const videos = $$('[data-project-open] video');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
      if (isIntersecting && intersectionRatio > 0.25) safePlay(target);
      else target.pause();
    });
  }, { threshold: [0, 0.25, 0.75] });
  videos.forEach((video) => observer.observe(video));
}

function setupPortfolioCursor() {
  if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
  const cursor = document.querySelector('.portfolio-cursor');
  const projects = $$('[data-project]');
  if (!cursor || !projects.length) return;
  window.addEventListener('pointermove', (event) => {
    cursor.style.setProperty('--cursor-x', `${event.clientX}px`);
    cursor.style.setProperty('--cursor-y', `${event.clientY}px`);
  }, { passive: true });
  projects.forEach((project) => {
    const video = project.querySelector('video');
    project.addEventListener('mouseenter', () => { project.classList.add('is-hovered'); cursor.classList.add('is-active'); safePlay(video); });
    project.addEventListener('mouseleave', () => { project.classList.remove('is-hovered'); cursor.classList.remove('is-active'); });
  });
}

function setupProjectDialog() {
  const dialog = document.querySelector('[data-project-dialog]');
  const closeButton = document.querySelector('[data-project-dialog-close]');
  const title = document.querySelector('[data-project-dialog-title]');
  const video = document.querySelector('[data-project-dialog-video]');
  const triggers = $$('[data-project-open]');
  if (!dialog || !closeButton || !title || !video || !triggers.length) return;

  let opener = null;
  const close = () => {
    if (dialog.hidden) return;
    dialog.hidden = true;
    video.pause();
    video.removeAttribute('src');
    video.load();
    opener?.focus();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const previewVideo = trigger.querySelector('video');
      const source = previewVideo?.currentSrc || previewVideo?.src;
      if (!source) return;
      opener = trigger;
      title.textContent = trigger.dataset.projectTitle;
      video.pause();
      video.src = source;
      video.load();
      dialog.hidden = false;
      safePlay(video);
    });
  });

  closeButton.addEventListener('click', close);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || dialog.hidden) return;
    event.preventDefault();
    close();
  });
}

function setupParallax() {
  if (prefersReducedMotion) return;
  const elements = $$('[data-parallax]');
  if (!elements.length) return;
  let ticking = false;
  const update = () => {
    const viewportMiddle = window.innerHeight / 2;
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const strength = Number(element.dataset.parallax || 0);
      const progress = (rect.top + rect.height / 2 - viewportMiddle) / window.innerHeight;
      element.style.setProperty('--parallax-y', `${Math.round(-progress * strength * window.innerHeight)}px`);
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

function setupContactForm() {
  const form = document.querySelector('[data-contact-form]');
  const shell = document.querySelector('[data-form-shell]');
  const success = document.querySelector('[data-contact-success]');
  if (!form || !shell || !success) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(new FormData(form));
    const subject = `Consulta web — ${values.nombre}`;
    const body = [
      `Nombre: ${values.nombre}`,
      `Empresa o marca: ${values.empresa || '—'}`,
      `Email o teléfono: ${values.contacto}`,
      '',
      'Mensaje:',
      values.mensaje || '—',
    ].join('\n');
    window.location.href = `mailto:guadamadrazo@estudiosortu.com.ar?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    form.hidden = true;
    success.hidden = false;
    shell.classList.add('is-sent');
  });
}

clearInitialHash();
document.querySelector('[data-year]').textContent = new Date().getFullYear();
revealOnScroll();
syncHeaderLogo();
setupMenu();
observeVideos();
setupPortfolioCursor();
setupProjectDialog();
setupParallax();
setupContactForm();
