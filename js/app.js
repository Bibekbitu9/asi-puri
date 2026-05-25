/**
 * ASI Puri Circle - Core Application Logic
 */

const App = {
  init() {
    this.setupStickyNav();
    this.setupMobileMenu();
    this.setupTicker();
    this.setupScrollAnimations();
    this.setupSmoothScroll();
    this.setupSearch();
    this.setupBackToTop();
    this.renderDynamicContent();

    // Re-render dynamic content on language change
    window.addEventListener('langchange', () => this.renderDynamicContent());
  },

  // ========== STICKY NAVIGATION ==========
  setupStickyNav() {
    const header = document.getElementById('main-header');
    const govStrip = document.getElementById('gov-strip');
    if (!header) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 80) {
        header.classList.add('scrolled');
        if (govStrip) govStrip.classList.add('hidden');
      } else {
        header.classList.remove('scrolled');
        if (govStrip) govStrip.classList.remove('hidden');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  },

  // ========== MOBILE MENU ==========
  setupMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });

    // Close on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
  },

  // ========== ANNOUNCEMENT TICKER ==========
  setupTicker() {
    const ticker = document.getElementById('ticker-content');
    if (!ticker) return;

    const renderTicker = () => {
      const lang = I18N.currentLang;
      const notices = SITE_CONTENT.ticker[lang] || SITE_CONTENT.ticker.en;
      ticker.innerHTML = notices.map(n => `<span class="ticker-item">${n}</span>`).join('');
    };

    renderTicker();
    window.addEventListener('langchange', renderTicker);
  },

  // ========== SCROLL ANIMATIONS ==========
  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  },

  // ========== SMOOTH SCROLL ==========
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  },

  // ========== SEARCH ==========
  setupSearch() {
    this.injectSearchModal();

    const trigger = document.getElementById('search-trigger');
    const modal = document.getElementById('search-modal');
    const closeBtn = document.getElementById('search-modal-close');
    const backdrop = modal ? modal.querySelector('.search-modal-backdrop') : null;
    const searchInput = document.getElementById('modal-search-input');
    const searchResults = document.getElementById('modal-search-results');

    if (!trigger || !modal || !searchInput) return;

    const openModal = () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInput.focus(), 50);
    };

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      searchInput.value = '';
      if (searchResults) {
        searchResults.innerHTML = '';
      }
    };

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    // Keyboard bindings
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    const performSearch = () => {
      const query = searchInput.value.trim().toLowerCase();
      if (query.length < 2) {
        if (searchResults) searchResults.innerHTML = '';
        return;
      }

      const lang = I18N.currentLang;
      const results = [];

      // Search monuments
      SITE_CONTENT.monumentData.forEach(m => {
        const data = m[lang] || m.en;
        const enData = m.en;
        const nameMatches = data.name.toLowerCase().includes(query) || enData.name.toLowerCase().includes(query);
        const descMatches = data.description.toLowerCase().includes(query) || enData.description.toLowerCase().includes(query);
        const locMatches = data.location.toLowerCase().includes(query) || enData.location.toLowerCase().includes(query);
        
        if (nameMatches || descMatches || locMatches) {
          results.push({ title: data.name, subtitle: data.location, href: `monument-detail.html?id=${m.id}&lang=${lang}`, type: 'monument' });
        }
      });

      // Search notices
      SITE_CONTENT.noticeData.forEach(n => {
        const data = n[lang] || n.en;
        const enData = n.en;
        if (data.title.toLowerCase().includes(query) || enData.title.toLowerCase().includes(query)) {
          results.push({ title: data.title, subtitle: n.date, href: 'notices.html', type: 'notice' });
        }
      });

      if (searchResults) {
        if (results.length > 0) {
          searchResults.innerHTML = results.slice(0, 6).map(r => `
            <a href="${r.href}" class="search-result-item">
              <span class="search-result-type">${r.type}</span>
              <span class="search-result-title">${r.title}</span>
              <span class="search-result-subtitle">${r.subtitle}</span>
            </a>
          `).join('');
        } else {
          searchResults.innerHTML = `<div class="search-no-results">${I18N.getText('common', 'noResults')}</div>`;
        }
      }
    };

    searchInput.addEventListener('input', performSearch);
  },

  injectSearchModal() {
    if (document.getElementById('search-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'search-modal';
    modal.className = 'search-modal';
    modal.innerHTML = `
      <div class="search-modal-backdrop"></div>
      <div class="search-modal-content">
        <div class="search-modal-header">
          <h2 data-i18n="nav.search">Search</h2>
          <button class="search-modal-close" id="search-modal-close" aria-label="Close">✕</button>
        </div>
        <div class="search-modal-body">
          <div class="search-input-wrapper">
            <input type="search" id="modal-search-input" class="modal-search-input" placeholder="Search monuments, notices, publications..." data-i18n-placeholder="nav.search">
            <span class="search-icon-inside">
              <svg class="search-modal-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
          </div>
          <div class="modal-search-results" id="modal-search-results"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  },

  // ========== BACK TO TOP ==========
  setupBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.pageYOffset > 500);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },

  // ========== DYNAMIC CONTENT RENDERING ==========
  renderDynamicContent() {
    this.renderMonumentCards();
    this.renderNotices();
    this.renderQuickLinks();
    this.renderGalleryPreview();
    this.renderVisitorInfo();
    this.renderMonumentGrid();
    this.renderNoticesList();
    this.renderPublications();
    this.renderGalleryFull();
    this.renderMonumentDetail();
    this.renderContactForm();
    this.setupScrollAnimations();
  },

  // ========== MONUMENT CARDS (Homepage) ==========
  renderMonumentCards() {
    const container = document.getElementById('monument-cards');
    if (!container) return;
    const lang = I18N.currentLang;
    const monuments = SITE_CONTENT.monumentData.slice(0, 6);
    
    container.innerHTML = monuments.map(m => {
      const d = m[lang] || m.en;
      return `
        <article class="monument-card animate-on-scroll" onclick="location.href='monument-detail.html?id=${m.id}&lang=${lang}'">
          <div class="card-image-wrapper">
            <img src="${m.image}" alt="${d.name}" loading="lazy">
            <span class="card-period-badge">${d.period}</span>
          </div>
          <div class="card-content">
            <h3 class="card-title">${d.name}</h3>
            <p class="card-location"><span class="icon-pin">📍</span> ${d.location}</p>
            <p class="card-desc">${d.description.substring(0, 120)}...</p>
            <a href="monument-detail.html?id=${m.id}&lang=${lang}" class="card-link">${I18N.getText('monuments', 'viewDetails')} →</a>
          </div>
        </article>`;
    }).join('');

    // Re-setup scroll animations for new elements
    this.setupScrollAnimations();
  },

  // ========== NOTICES (Homepage) ==========
  renderNotices() {
    const container = document.getElementById('notices-list');
    if (!container) return;
    const lang = I18N.currentLang;

    container.innerHTML = SITE_CONTENT.noticeData.map(n => {
      const d = n[lang] || n.en;
      const dateObj = new Date(n.date);
      const formattedDate = dateObj.toLocaleDateString(lang === 'hi' ? 'hi-IN' : lang === 'od' ? 'or-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      return `
        <div class="notice-item animate-on-scroll">
          <div class="notice-date">
            <span class="notice-day">${dateObj.getDate()}</span>
            <span class="notice-month">${dateObj.toLocaleDateString('en', { month: 'short' })}</span>
          </div>
          <div class="notice-content">
            <span class="notice-category">${d.category}</span>
            <h4 class="notice-title">${d.title}</h4>
          </div>
          <a href="#" class="notice-download" title="Download">📥</a>
        </div>`;
    }).join('');
  },

  // ========== QUICK LINKS ==========
  renderQuickLinks() {
    const container = document.getElementById('quick-links-grid');
    if (!container) return;
    const lang = I18N.currentLang;

    container.innerHTML = SITE_CONTENT.quickLinkData.map(l => `
      <a href="${l.href}" class="quick-link-item animate-on-scroll">
        <span class="quick-link-icon">${l.icon}</span>
        <span class="quick-link-text">${l[lang]}</span>
      </a>
    `).join('');
  },

  // ========== GALLERY PREVIEW (Homepage) ==========
  renderGalleryPreview() {
    const container = document.getElementById('gallery-preview');
    if (!container) return;
    const lang = I18N.currentLang;

    container.innerHTML = SITE_CONTENT.galleryData.slice(0, 6).map((g, i) => `
      <div class="gallery-item animate-on-scroll" data-category="${g.category}" data-index="${i}">
        <img src="${g.image}" alt="${g[lang]}" loading="lazy">
        <div class="gallery-overlay">
          <span class="gallery-caption">${g[lang]}</span>
        </div>
      </div>
    `).join('');
  },

  // ========== VISITOR INFO ==========
  renderVisitorInfo() {
    const container = document.getElementById('visitor-info-cards');
    if (!container) return;
    const lang = I18N.currentLang;
    const v = SITE_CONTENT.visitorInfo[lang] || SITE_CONTENT.visitorInfo.en;

    container.innerHTML = `
      <div class="info-card animate-on-scroll">
        <div class="info-card-icon">🕐</div>
        <h3>${v.timingsTitle}</h3>
        <p>${v.timingsText}</p>
      </div>
      <div class="info-card animate-on-scroll">
        <div class="info-card-icon">🎫</div>
        <h3>${v.ticketsTitle}</h3>
        <p>${v.ticketsText}</p>
      </div>
      <div class="info-card animate-on-scroll">
        <div class="info-card-icon">📋</div>
        <h3>${v.guidelinesTitle}</h3>
        <p>${v.guidelinesText}</p>
      </div>
      <div class="info-card animate-on-scroll">
        <div class="info-card-icon">🚗</div>
        <h3>${v.accessTitle}</h3>
        <p>${v.accessText}</p>
      </div>
    `;
  },

  // ========== MONUMENT GRID (monuments.html) ==========
  renderMonumentGrid() {
    const container = document.getElementById('monument-grid');
    if (!container) return;
    const lang = I18N.currentLang;

    const filterDistrict = document.getElementById('filter-district');
    const filterType = document.getElementById('filter-type');
    const filterPeriod = document.getElementById('filter-period');
    const searchMon = document.getElementById('monument-search');

    const render = () => {
      let monuments = SITE_CONTENT.monumentData;
      const dVal = filterDistrict ? filterDistrict.value : '';
      const tVal = filterType ? filterType.value : '';
      const pVal = filterPeriod ? filterPeriod.value : '';
      const sVal = searchMon ? searchMon.value.toLowerCase() : '';

      if (dVal) monuments = monuments.filter(m => m.district === dVal);
      if (tVal) monuments = monuments.filter(m => m.type === tVal);
      if (pVal) monuments = monuments.filter(m => m.period === pVal);
      if (sVal) monuments = monuments.filter(m => {
        const d = m[lang] || m.en;
        return d.name.toLowerCase().includes(sVal) || d.description.toLowerCase().includes(sVal);
      });

      container.innerHTML = monuments.map(m => {
        const d = m[lang] || m.en;
        return `
          <article class="monument-card animate-on-scroll" onclick="location.href='monument-detail.html?id=${m.id}&lang=${lang}'">
            <div class="card-image-wrapper">
              <img src="${m.image}" alt="${d.name}" loading="lazy">
              <span class="card-period-badge">${d.period}</span>
              <span class="card-type-badge">${m.type}</span>
            </div>
            <div class="card-content">
              <h3 class="card-title">${d.name}</h3>
              <p class="card-location"><span class="icon-pin">📍</span> ${d.location}</p>
              <p class="card-desc">${d.description.substring(0, 150)}...</p>
              <a href="monument-detail.html?id=${m.id}&lang=${lang}" class="card-link">${I18N.getText('monuments', 'viewDetails')} →</a>
            </div>
          </article>`;
      }).join('');

      if (monuments.length === 0) {
        container.innerHTML = `<div class="no-results"><p>${I18N.getText('common', 'noResults')}</p></div>`;
      }
      this.setupScrollAnimations();
    };

    render();
    [filterDistrict, filterType, filterPeriod, searchMon].forEach(el => {
      if (el) el.addEventListener('input', render);
      if (el) el.addEventListener('change', render);
    });
    window.addEventListener('langchange', render);
  },

  // ========== MONUMENT DETAIL ==========
  renderMonumentDetail() {
    const container = document.getElementById('monument-detail');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) return;

    const lang = I18N.currentLang;
    const m = SITE_CONTENT.monumentData.find(m => m.id === id);
    if (!m) { container.innerHTML = '<p>Monument not found.</p>'; return; }

    const d = m[lang] || m.en;

    container.innerHTML = `
      <div class="detail-hero" style="background-image: url('${m.image}')">
        <div class="detail-hero-overlay">
          <h1>${d.name}</h1>
          <p class="detail-hero-location">📍 ${d.location} | ${d.period}</p>
        </div>
      </div>
      
      <div class="detail-content-grid">
        <main class="detail-main">
          <section class="detail-section">
            <h2>Historical Overview</h2>
            <p>${d.history}</p>
          </section>
          <section class="detail-section">
            <h2>Architecture</h2>
            <p>${d.architecture}</p>
          </section>
          <section class="detail-section">
            <h2>Description</h2>
            <p>${d.description}</p>
          </section>
          <section class="detail-section detail-gallery">
            <h2>Image Gallery</h2>
            <div class="detail-gallery-grid">
              <div class="gallery-item" data-category="detail">
                <img src="${m.image}" alt="${d.name}" loading="lazy">
                <div class="gallery-overlay"><span class="gallery-caption">${d.name}</span></div>
              </div>
            </div>
          </section>
        </main>
        
        <aside class="detail-sidebar">
          <div class="sidebar-card">
            <h3>🕐 Visiting Hours</h3>
            <p>${d.timings}</p>
          </div>
          <div class="sidebar-card">
            <h3>🎫 Entry Fee</h3>
            <p>${d.fee}</p>
          </div>
          <div class="sidebar-card">
            <h3>🌤️ Best Time to Visit</h3>
            <p>${d.bestTime}</p>
          </div>
          <div class="sidebar-card">
            <h3>📍 Location</h3>
            <div class="map-placeholder">
              <p>Map view coming soon</p>
            </div>
          </div>
        </aside>
      </div>
    `;

    // Update page title
    document.title = `${d.name} | ASI Puri Circle`;

    // Update breadcrumb
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = d.name;
  },

  // ========== NOTICES LIST (notices.html) ==========
  renderNoticesList() {
    const container = document.getElementById('notices-full-list');
    if (!container) return;
    const lang = I18N.currentLang;

    container.innerHTML = SITE_CONTENT.noticeData.map(n => {
      const d = n[lang] || n.en;
      const dateObj = new Date(n.date);
      return `
        <div class="notice-full-item animate-on-scroll">
          <div class="notice-date-block">
            <span class="notice-day-lg">${dateObj.getDate()}</span>
            <span class="notice-month-lg">${dateObj.toLocaleDateString('en', { month: 'short', year: 'numeric' })}</span>
          </div>
          <div class="notice-full-content">
            <span class="notice-category-badge">${d.category}</span>
            <h3>${d.title}</h3>
          </div>
          <a href="#" class="btn btn-outline btn-sm">${I18N.getText('notices', 'download')} 📥</a>
        </div>`;
    }).join('');
  },

  // ========== PUBLICATIONS ==========
  renderPublications() {
    const container = document.getElementById('publications-list');
    if (!container) return;
    const lang = I18N.currentLang;

    container.innerHTML = SITE_CONTENT.publicationData.map(p => {
      const title = p[lang] || p.en;
      return `
        <div class="publication-item animate-on-scroll">
          <div class="pub-icon">📄</div>
          <div class="pub-content">
            <h3>${title}</h3>
            <div class="pub-meta">
              <span class="pub-year">${p.year}</span>
              <span class="pub-type">${p.type}</span>
            </div>
          </div>
          <a href="#" class="btn btn-primary btn-sm">${I18N.getText('publications', 'download')}</a>
        </div>`;
    }).join('');
  },

  // ========== GALLERY FULL ==========
  renderGalleryFull() {
    const container = document.getElementById('gallery-full-grid');
    if (!container) return;
    const lang = I18N.currentLang;

    container.innerHTML = SITE_CONTENT.galleryData.map((g, i) => `
      <div class="gallery-item animate-on-scroll" data-category="${g.category}" data-index="${i}">
        <img src="${g.image}" alt="${g[lang]}" loading="lazy">
        <div class="gallery-overlay">
          <span class="gallery-caption">${g[lang]}</span>
        </div>
      </div>
    `).join('');

    // Re-init gallery
    if (typeof Gallery !== 'undefined') {
      setTimeout(() => Gallery.init(), 100);
    }
  },

  // ========== CONTACT FORM ==========
  renderContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = '✓ Sent!';
      btn.classList.add('success');
      setTimeout(() => {
        btn.textContent = I18N.getText('contact', 'submitBtn');
        btn.classList.remove('success');
        form.reset();
      }, 2000);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
