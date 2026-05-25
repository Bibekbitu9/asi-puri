/**
 * ASI Puri Circle - Gallery & Lightbox Module
 */

const Gallery = {
  currentIndex: 0,
  items: [],
  filteredItems: [],
  currentFilter: 'all',

  init() {
    this.lightbox = document.getElementById('lightbox');
    if (!this.lightbox) return;

    this.lightboxImg = this.lightbox.querySelector('.lightbox-img');
    this.lightboxCaption = this.lightbox.querySelector('.lightbox-caption');
    this.lightboxCounter = this.lightbox.querySelector('.lightbox-counter');

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox || !this.lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    });

    // Close on overlay click
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox || e.target.classList.contains('lightbox-overlay')) {
        this.close();
      }
    });

    // Touch gestures
    let touchStartX = 0;
    this.lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.lightbox.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.prev() : this.next();
      }
    }, { passive: true });

    this.setupFilterButtons();
    this.setupGalleryItems();
  },

  setupGalleryItems() {
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
      item.addEventListener('click', () => {
        this.currentIndex = index;
        this.open(index);
      });
    });
  },

  setupFilterButtons() {
    document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        this.filterGallery(filter);
        
        document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  },

  filterGallery(category) {
    this.currentFilter = category;
    document.querySelectorAll('.gallery-item').forEach(item => {
      const cat = item.getAttribute('data-category');
      if (category === 'all' || cat === category) {
        item.style.display = '';
        item.classList.add('fade-in');
      } else {
        item.style.display = 'none';
      }
    });
  },

  open(index) {
    const items = document.querySelectorAll('.gallery-item:not([style*="display: none"])');
    if (!items.length) return;

    this.filteredItems = Array.from(items);
    this.currentIndex = Math.min(index, this.filteredItems.length - 1);
    this.showCurrent();
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  close() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  },

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.filteredItems.length;
    this.showCurrent();
  },

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.filteredItems.length) % this.filteredItems.length;
    this.showCurrent();
  },

  showCurrent() {
    const item = this.filteredItems[this.currentIndex];
    if (!item) return;

    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption');

    if (this.lightboxImg && img) {
      this.lightboxImg.src = img.src;
      this.lightboxImg.alt = img.alt;
    }
    if (this.lightboxCaption && caption) {
      this.lightboxCaption.textContent = caption.textContent;
    }
    if (this.lightboxCounter) {
      this.lightboxCounter.textContent = `${this.currentIndex + 1} / ${this.filteredItems.length}`;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => Gallery.init());
