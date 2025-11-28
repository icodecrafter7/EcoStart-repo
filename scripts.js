// Shared interactive script for all pages
document.addEventListener('DOMContentLoaded', () => {
  // Set year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav: toggle for mobile
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = btn.closest('.nav');
      const list = nav.querySelector('.nav-list');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      list.style.display = expanded ? '' : 'flex';
      list.style.flexDirection = 'column';
      list.style.gap = '0.8rem';
      list.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.95))';
      list.style.padding = '.8rem';
      list.style.borderRadius = '12px';
      list.style.boxShadow = '0 12px 40px rgba(10,30,10,0.06)';
    });
  });

  // Active nav highlight
  const currentFile = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentFile || (href === 'index.html' && currentFile === '')) {
      a.setAttribute('aria-current', 'page');
      a.classList.add('active');
    } else {
      a.removeAttribute('aria-current');
      a.classList.remove('active');
    }
  });

  // Meter animation (index page)
  const meterBar = document.querySelector('.meter-bar');
  const meterWrap = document.querySelector('.meter');
  if (meterBar && meterWrap) {
    // circumference ~ 2 * PI * r where r=48 => ~302
    const circumference = 302;
    meterBar.style.strokeDasharray = circumference;
    // default data-value 0.62
    const fraction = parseFloat(document.querySelector('.dashboard-preview .meter')?.dataset.value) || 0.62;
    const offset = circumference * (1 - fraction);
    setTimeout(() => {
      meterBar.style.strokeDashoffset = offset;
    }, 300);
  }

  // Animate progress bar fills
  document.querySelectorAll('.p-fill, .p-fill, .p-fill, .p-fill').forEach(el => {
    const w = el.style.width || '0%';
    el.style.width = '0%';
    setTimeout(() => el.style.width = w, 350);
  });

  // Simple reveal-on-scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) en.target.classList.add('reveal');
    });
  }, {threshold:0.08});
  document.querySelectorAll('.card, .feature-card, .test-card, .how-step, .student-profile').forEach(el => {
    observer.observe(el);
  });

  // Reduced motion respect
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    document.querySelectorAll('.leaf, .meter-bar').forEach(n => n.style.transition = 'none');
  }
});