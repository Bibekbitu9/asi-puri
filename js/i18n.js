/**
 * ASI Puri Circle - i18n (Internationalization) Engine
 * Supports: English (en), Hindi (hi), Odia (od)
 */

const I18N = {
  currentLang: 'en',
  supportedLangs: ['en', 'hi', 'od'],
  langLabels: { en: 'English', hi: 'हिन्दी', od: 'ଓଡ଼ିଆ' },
  langShort: { en: 'EN', hi: 'हि', od: 'ଓ' },

  init() {
    // Check URL param first, then localStorage, then default
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const storedLang = localStorage.getItem('asi-lang');
    
    if (urlLang && this.supportedLangs.includes(urlLang)) {
      this.currentLang = urlLang;
    } else if (storedLang && this.supportedLangs.includes(storedLang)) {
      this.currentLang = storedLang;
    }

    localStorage.setItem('asi-lang', this.currentLang);
    document.documentElement.lang = this.currentLang === 'od' ? 'or' : this.currentLang;
    this.applyTranslations();
    this.updateLangSwitcher();
    this.setupLangSwitcher();
  },

  setLang(lang) {
    if (!this.supportedLangs.includes(lang)) return;
    this.currentLang = lang;
    localStorage.setItem('asi-lang', lang);
    document.documentElement.lang = lang === 'od' ? 'or' : lang;
    
    // Update URL without reload
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);

    this.applyTranslations();
    this.updateLangSwitcher();
    
    // Dispatch custom event for dynamic content
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  },

  applyTranslations() {
    const lang = this.currentLang;

    // Translate elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = this.resolve(key, lang);
      if (value !== undefined) {
        el.textContent = value;
      }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const value = this.resolve(key, lang);
      if (value !== undefined) {
        el.placeholder = value;
      }
    });

    // Translate aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const value = this.resolve(key, lang);
      if (value !== undefined) {
        el.setAttribute('aria-label', value);
      }
    });

    // Translate title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const value = this.resolve(key, lang);
      if (value !== undefined) {
        el.title = value;
      }
    });

    // Update page title
    const titleKey = document.querySelector('meta[name="i18n-title"]');
    if (titleKey) {
      const value = this.resolve(titleKey.content, lang);
      if (value) document.title = value + ' | ASI Puri Circle';
    }
  },

  resolve(keyPath, lang) {
    if (!SITE_CONTENT) return undefined;
    const parts = keyPath.split('.');
    
    // Normalize keyPath: if any part is 'en', 'hi', or 'od', remove it to make it dynamic
    const filteredParts = parts.filter(p => !['en', 'hi', 'od'].includes(p));
    
    let obj = SITE_CONTENT;
    const section = filteredParts[0];
    if (obj[section] === undefined) return undefined;
    obj = obj[section];
    
    // Navigate into active language sub-object if it exists
    if (obj[lang] !== undefined) {
      obj = obj[lang];
    } else if (obj['en'] !== undefined) {
      obj = obj['en'];
    }
    
    // Navigate remaining parts
    for (let i = 1; i < filteredParts.length; i++) {
      if (obj === undefined || obj === null) return undefined;
      obj = obj[filteredParts[i]];
    }
    
    return obj;
  },

  getText(section, key) {
    const lang = this.currentLang;
    try {
      return SITE_CONTENT[section][lang][key];
    } catch {
      try { return SITE_CONTENT[section]['en'][key]; } catch { return ''; }
    }
  },

  getMonument(id) {
    const lang = this.currentLang;
    const m = SITE_CONTENT.monumentData.find(m => m.id === id);
    if (!m) return null;
    return { ...m, ...m[lang], lang };
  },

  updateLangSwitcher() {
    const btns = document.querySelectorAll('.lang-btn');
    btns.forEach(btn => {
      const lang = btn.getAttribute('data-lang');
      btn.classList.toggle('active', lang === this.currentLang);
    });

    const currentLabel = document.getElementById('current-lang-label');
    if (currentLabel) {
      currentLabel.textContent = this.langShort[this.currentLang];
    }
  },

  setupLangSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.getAttribute('data-lang');
        this.setLang(lang);
      });
    });
  }
};

// Auto-init when DOM ready
document.addEventListener('DOMContentLoaded', () => I18N.init());
