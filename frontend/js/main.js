/* ========================================
   AGRIKOLE - Main JavaScript
   ======================================== */

(function () {
  'use strict';

  /* ---- DOM References ---- */
  const navbar     = document.getElementById('navbar');
  const navToggle  = document.getElementById('navToggle');
  const navLinks   = document.getElementById('navLinks');
  const backToTop  = document.getElementById('backToTop');
  const playBtn    = document.getElementById('playBtn');
  const videoModal = document.getElementById('videoModal');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');
  const videoFrame = document.getElementById('videoFrame');
  const testiPrev  = document.getElementById('testiPrev');
  const testiNext  = document.getElementById('testiNext');
  const testiDots  = document.getElementById('testiDots');
  const heroEl     = document.querySelector('.hero');
  const newsletterForm = document.getElementById('newsletterForm');

  /* ---- Navbar scroll behavior ---- */
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky / scrolled class
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    lastScrollY = scrollY;
  });

  /* ---- Back to top ---- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Mobile nav toggle ---- */
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    navLinks.classList.contains('open')
      ? openHamburger(spans)
      : closeHamburger(spans);
  });

  function openHamburger(spans) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  }
  function closeHamburger(spans) {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }

  // Close nav when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      closeHamburger(navToggle.querySelectorAll('span'));
    });
  });

  /* ---- Hero parallax + loaded class ---- */
  heroEl.classList.add('loaded');

  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      const heroBg = heroEl.querySelector('.hero-bg');
      heroBg.style.transform = `scale(1) translateY(${window.scrollY * 0.3}px)`;
    }
  });

  /* ---- Video Modal ---- */
  const videoSrc = videoFrame.src;

  function openModal() {
    videoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    videoFrame.src = videoSrc + '&autoplay=1';
  }
  function closeModal() {
    videoModal.classList.remove('open');
    document.body.style.overflow = '';
    videoFrame.src = videoSrc;
  }

  playBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---- Testimonials Slider ---- */
  const cards = document.querySelectorAll('.testimonial-card');
  const dots  = document.querySelectorAll('.dot');
  let currentTesti = 0;
  let testiTimer;

  function showTesti(idx) {
    cards.forEach(c => c.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentTesti = (idx + cards.length) % cards.length;
    cards[currentTesti].classList.add('active');
    dots[currentTesti].classList.add('active');
  }

  function nextTesti() { showTesti(currentTesti + 1); }
  function prevTesti() { showTesti(currentTesti - 1); }

  testiNext.addEventListener('click', () => { nextTesti(); resetTimer(); });
  testiPrev.addEventListener('click', () => { prevTesti(); resetTimer(); });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { showTesti(i); resetTimer(); });
  });

  function resetTimer() {
    clearInterval(testiTimer);
    testiTimer = setInterval(nextTesti, 5000);
  }
  testiTimer = setInterval(nextTesti, 5000);

  /* ---- Intersection Observer: fade-in ---- */
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => observer.observe(el));

  /* ---- Progress bars ---- */
  const progressFills = document.querySelectorAll('.progress-fill');

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
        progressObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  progressFills.forEach(fill => progressObserver.observe(fill));

  /* ---- Counter animation ---- */
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        el.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString();
      }
    };
    requestAnimationFrame(update);
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + id) {
            a.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  /* ---- Newsletter form ---- */
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const btn = newsletterForm.querySelector('button');
      btn.innerHTML = '<i class="fas fa-check"></i>';
      btn.style.background = '#4CAF50';
      input.value = '';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i>';
        btn.style.background = '';
      }, 3000);
    });
  }

  /* ---- Ticker duplicate for seamless loop ---- */
  // Already handled via CSS animation with duplicate spans

  /* ---- Cart badge interaction ---- */
  let cartCount = 0;
  document.querySelectorAll('.service-link, .btn-read-more').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Visual feedback only
    });
  });

  console.log('%c🌿 Agrikole Loaded', 'color: #6BAF45; font-weight: bold; font-size: 14px;');
})();
