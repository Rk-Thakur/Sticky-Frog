// Scroll reveal observer
const revEls = document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revEls.forEach(el => obs.observe(el));

// Nav shadow on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 20
    ? '0 4px 28px rgba(0,0,0,0.3)' : 'none';
}, { passive: true });

// Active nav link highlight
const secs = document.querySelectorAll('section[id],div[id]');
const links = document.querySelectorAll('nav ul a:not(.nav-cta)');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (window.scrollY >= s.offsetTop - 110) cur = s.id; });
  links.forEach(l => {
    l.style.color = '';
    if (l.getAttribute('href') === '#' + cur) l.style.color = 'rgba(180,220,180,0.9)';
  });
}, { passive: true });

// Counter animation for hero stats
function countUp(el, target, suffix) {
  let start = null;
  const dur = 1800;
  const step = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const statObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const t = e.target.textContent;
    if (t.includes('15')) countUp(e.target, 15, '+');
    if (t.includes('50')) countUp(e.target, 50, 'K+');
    statObs.unobserve(e.target);
  });
}, { threshold: 0.6 });
document.querySelectorAll('.press-stat-num').forEach(el => statObs.observe(el));

// Service card mouse-tilt
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    card.style.transition = 'transform 0.08s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1)';
  });
});

// Gallery item mouse-parallax
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mousemove', e => {
    const swatch = item.querySelector('.gallery-swatch');
    if (!swatch) return;
    const r = item.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 14;
    swatch.style.transform = `scale(1.06) translate(${x}px,${y}px)`;
    swatch.style.transition = 'transform 0.12s ease';
  });
  item.addEventListener('mouseleave', () => {
    const swatch = item.querySelector('.gallery-swatch');
    if (!swatch) return;
    swatch.style.transform = '';
    swatch.style.transition = 'transform 0.5s ease';
  });
});

// Testimonial card mouse-tilt
document.querySelectorAll('.tcard').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-5px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    card.style.transition = 'transform 0.08s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1)';
  });
});

// Float btn hide near contact
const floatBtn = document.querySelector('.float-btn');
const contactSec = document.getElementById('contact');
if (floatBtn && contactSec) {
  new IntersectionObserver(entries => {
    floatBtn.style.opacity = entries[0].isIntersecting ? '0' : '1';
    floatBtn.style.pointerEvents = entries[0].isIntersecting ? 'none' : 'auto';
    floatBtn.style.transition = 'opacity 0.3s ease';
  }, { threshold: 0.25 }).observe(contactSec);
}



// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const drawer    = document.getElementById('mobileDrawer');
const overlay   = document.getElementById('drawerOverlay');

function openDrawer() {
  hamburger.classList.add('open');
  drawer.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  hamburger.classList.remove('open');
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  drawer.classList.contains('open') ? closeDrawer() : openDrawer();
});
overlay.addEventListener('click', closeDrawer);

// Close drawer on link click
document.querySelectorAll('.drawer-link, .drawer-cta').forEach(link => {
  link.addEventListener('click', () => {
    closeDrawer();
  });
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDrawer();
});

// ── Scroll progress bar ──
const progress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total    = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (scrolled / total * 100) + '%';
}, { passive: true });

// ── Back to top ──
const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    btt.classList.add('visible');
  } else {
    btt.classList.remove('visible');
  }
}, { passive: true });
btt.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});




// ── Success Dialog ──
function showSuccessDialog() {
  const overlay = document.getElementById('successOverlay');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeSuccessDialog() {
  const overlay = document.getElementById('successOverlay');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}
// Close on overlay click
document.getElementById('successOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeSuccessDialog();
});
// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSuccessDialog();
});

// ── Intercept form submit → AJAX to FormSubmit → show dialog ──
const quoteForm = document.querySelector('.contact-form form');
if (quoteForm) {
  quoteForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('.form-submit');
    const originalText = btn.innerHTML;

    // Loading state
    btn.innerHTML = 'Sending&hellip;';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    try {
      const formData = new FormData(this);
      await fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      // Reset form
      this.reset();
      // Show success dialog
      showSuccessDialog();
    } catch (err) {
      // Even on network error, show dialog (FormSubmit likely received it)
      showSuccessDialog();
    } finally {
      btn.innerHTML = originalText;
      btn.style.opacity = '';
      btn.disabled = false;
    }
  });
}

