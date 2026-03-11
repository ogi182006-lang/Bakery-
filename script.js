/* ===================================================
   BAKERY WEBSITE — SCRIPT.JS
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. NAVBAR — SCROLL EFFECT + ACTIVE LINK
  // ============================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    // Sticky navbar shadow
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ============================================
  // 2. HAMBURGER MENU (Mobile)
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const navLinksMenu = document.getElementById('navLinks');
  let menuOpen = false;

  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    hamburger.classList.toggle('open', menuOpen);
    navLinksMenu.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  });

  // Close menu when a nav link is clicked
  navLinksMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      hamburger.classList.remove('open');
      navLinksMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (menuOpen && !navbar.contains(e.target)) {
      menuOpen = false;
      hamburger.classList.remove('open');
      navLinksMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ============================================
  // 3. SMOOTH SCROLL for anchor links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ============================================
  // 4. PRODUCT CATEGORY FILTER
  // ============================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards with animation
      productCards.forEach((card, index) => {
        const category = card.dataset.category;

        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          // Staggered fade-in
          card.style.animation = 'none';
          card.offsetHeight; // Force reflow
          card.style.animation = `fadeInCard 0.4s ease ${index * 0.05}s both`;
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Inject card fade-in keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInCard {
      from { opacity: 0; transform: translateY(20px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
  `;
  document.head.appendChild(style);

  // ============================================
  // 5. SCROLL REVEAL ANIMATIONS
  // ============================================
  const revealElements = document.querySelectorAll(
    '.product-card, .special-card, .gallery-item, .contact-item, .feature, .about-content, .section-header, .stat'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================
  // 6. BACK TO TOP BUTTON
  // ============================================
  const backToTopBtn = document.getElementById('backToTop');
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================================
  // 7. PRODUCT CARD HOVER — WhatsApp ripple hint
  // ============================================
  document.querySelectorAll('.btn-order').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.innerHTML = `<i class="fab fa-whatsapp"></i> Order Now`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.innerHTML = `<i class="fab fa-whatsapp"></i> Order`;
    });
  });

  // ============================================
  // 8. FLOATING WA BUTTON — Show after scroll
  // ============================================
  const floatWA = document.querySelector('.float-whatsapp');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      floatWA.style.opacity = '1';
      floatWA.style.transform = 'scale(1)';
    } else {
      floatWA.style.opacity = '0.7';
    }
  }, { passive: true });

  // ============================================
  // 9. GALLERY LIGHTBOX (Minimal)
  // ============================================
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,0.88);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; pointer-events: none;
    transition: opacity 0.3s ease;
    cursor: zoom-out;
    padding: 1rem;
  `;

  const lightboxImg = document.createElement('img');
  lightboxImg.style.cssText = `
    max-width: 90vw; max-height: 85vh;
    border-radius: 16px;
    box-shadow: 0 20px 80px rgba(0,0,0,0.5);
    transform: scale(0.95);
    transition: transform 0.3s ease;
    object-fit: contain;
  `;

  const lightboxCaption = document.createElement('div');
  lightboxCaption.style.cssText = `
    position: absolute;
    bottom: 2rem; left: 50%; transform: translateX(-50%);
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    color: #fff;
    padding: 0.5rem 1.5rem;
    border-radius: 50px;
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
  `;

  const lightboxClose = document.createElement('button');
  lightboxClose.innerHTML = '&times;';
  lightboxClose.style.cssText = `
    position: absolute; top: 1.5rem; right: 1.5rem;
    background: rgba(255,255,255,0.15);
    border: none; color: #fff;
    width: 44px; height: 44px; border-radius: 50%;
    font-size: 1.5rem; cursor: pointer; line-height: 1;
    transition: background 0.2s;
    backdrop-filter: blur(6px);
  `;
  lightboxClose.addEventListener('mouseenter', () => lightboxClose.style.background = 'rgba(255,255,255,0.3)');
  lightboxClose.addEventListener('mouseleave', () => lightboxClose.style.background = 'rgba(255,255,255,0.15)');

  lightbox.appendChild(lightboxImg);
  lightbox.appendChild(lightboxCaption);
  lightbox.appendChild(lightboxClose);
  document.body.appendChild(lightbox);

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.style.opacity = '1';
    lightbox.style.pointerEvents = 'all';
    lightboxImg.style.transform = 'scale(1)';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.style.opacity = '0';
    lightbox.style.pointerEvents = 'none';
    lightboxImg.style.transform = 'scale(0.95)';
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-overlay span')?.textContent || '';
      openLightbox(img.src, caption);
    });
  });

  lightbox.addEventListener('click', closeLightbox);
  lightboxClose.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ============================================
  // 10. NAVBAR OVERLAY for mobile (backdrop)
  // ============================================
  const navOverlay = document.createElement('div');
  navOverlay.style.cssText = `
    position: fixed; inset: 0; z-index: 999;
    background: rgba(0,0,0,0.4);
    opacity: 0; pointer-events: none;
    transition: opacity 0.35s ease;
  `;
  document.body.appendChild(navOverlay);

  hamburger.addEventListener('click', () => {
    if (menuOpen) {
      navOverlay.style.opacity = '1';
      navOverlay.style.pointerEvents = 'all';
    } else {
      navOverlay.style.opacity = '0';
      navOverlay.style.pointerEvents = 'none';
    }
  });

  navOverlay.addEventListener('click', () => {
    menuOpen = false;
    hamburger.classList.remove('open');
    navLinksMenu.classList.remove('open');
    navOverlay.style.opacity = '0';
    navOverlay.style.pointerEvents = 'none';
    document.body.style.overflow = '';
  });

  // ============================================
  // 11. HERO STATS COUNTER ANIMATION
  // ============================================
  const stats = document.querySelectorAll('.stat strong');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseInt(text);

        if (!isNaN(num)) {
          let count = 0;
          const duration = 1400;
          const step = Math.ceil(num / (duration / 16));

          const timer = setInterval(() => {
            count = Math.min(count + step, num);
            el.textContent = count + (text.includes('+') ? '+' : '');
            if (count >= num) clearInterval(timer);
          }, 16);
        }
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => countObserver.observe(stat));

  // ============================================
  // 12. INIT
  // ============================================
  handleScroll();
  console.log('🥐 Bakery website loaded successfully!');
});
