/* White Cherry Cottages — shared Alpine.js components */

/* --------------------------------------------------------
 * Tailwind CDN config (loaded inline by each HTML page).
 * Lives here so we don't duplicate it on every page —
 * each page calls window.wccTailwindConfig() right after
 * the Tailwind CDN <script> loads.
 * ------------------------------------------------------ */
window.wccTailwindConfig = function () {
  if (!window.tailwind) return;
  window.tailwind.config = {
    theme: {
      extend: {
        colors: {
          cream: '#FAF7F2',
          cherry: { DEFAULT: '#B23A48', dark: '#8E2D38' },
          wood: { DEFAULT: '#8B5E3C', light: '#D9B98C' },
          sky: { soft: '#DDEAF3', DEFAULT: '#7FB3D5' },
          forest: '#3C5A40',
          ink: '#1F2933'
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          display: ['Fraunces', 'Georgia', 'serif']
        }
      }
    }
  };
};

/* --------------------------------------------------------
 * fetchJSON — wraps fetch with a cache-friendly default
 * and a clear error path so Alpine can render a fallback.
 * ------------------------------------------------------ */
async function fetchJSON(url) {
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
  return res.json();
}

/* --------------------------------------------------------
 * siteShell()
 * Mounted on <body x-data="siteShell()" x-init="init()">.
 * Loads /data/site.json once, exposes:
 *  - site         (object)
 *  - bannerOpen   (bool)
 *  - mobileNavOpen (bool)
 *  - year         (current year, for footer)
 *  - currentPath  (so nav can highlight active link)
 *  - dismissBanner()
 * ------------------------------------------------------ */
window.siteShell = function () {
  return {
    site: null,
    siteLoaded: false,
    bannerOpen: true,
    mobileNavOpen: false,
    year: new Date().getFullYear(),
    currentPath: (typeof window !== 'undefined' ? window.location.pathname : '/'),

    async init () {
      try {
        this.site = await fetchJSON('/data/site.json');
      } catch (e) {
        console.error(e);
        this.site = {
          brand: 'White Cherry Cottages',
          tagline: '',
          announcement: { text: '', link: '', linkLabel: '' },
          phone: '', phoneHref: '', email: '',
          address: { line1: '', city: '', state: '', zip: '' },
          social: {},
          footerBlurb: ''
        };
      }
      this.siteLoaded = true;
      // Banner: keep open unless user previously dismissed for this exact text
      try {
        const dismissed = localStorage.getItem('wcc:banner-dismissed');
        if (dismissed && this.site.announcement && dismissed === this.site.announcement.text) {
          this.bannerOpen = false;
        }
      } catch (_) { /* localStorage blocked — ignore */ }
    },

    dismissBanner () {
      this.bannerOpen = false;
      try {
        if (this.site && this.site.announcement) {
          localStorage.setItem('wcc:banner-dismissed', this.site.announcement.text);
        }
      } catch (_) { /* ignore */ }
    },

    isActive (href) {
      if (!href) return false;
      const path = this.currentPath.replace(/\/$/, '') || '/';
      const target = href.replace(/\/$/, '') || '/';
      if (target === '/' || target === '/index.html') {
        return path === '/' || path === '/index.html';
      }
      return path === target;
    },

    fullAddress () {
      if (!this.site || !this.site.address) return '';
      const a = this.site.address;
      const line = [a.line1, a.line2].filter(Boolean).join(', ');
      const cityLine = [a.city, a.state].filter(Boolean).join(', ');
      return [line, cityLine, a.zip].filter(Boolean).join(' · ');
    }
  };
};

/* --------------------------------------------------------
 * Lightbox — shared across cabins & gallery pages.
 * Usage:
 *   <div x-data="lightbox()" @open-lightbox.window="open($event.detail)">...</div>
 *   $dispatch('open-lightbox', { images: [...], index: 0 })
 * ------------------------------------------------------ */
window.lightbox = function () {
  return {
    isOpen: false,
    images: [],
    index: 0,
    open ({ images, index = 0 }) {
      this.images = images || [];
      this.index = index;
      this.isOpen = true;
      document.documentElement.style.overflow = 'hidden';
    },
    close () {
      this.isOpen = false;
      document.documentElement.style.overflow = '';
    },
    next () { if (this.images.length) this.index = (this.index + 1) % this.images.length; },
    prev () { if (this.images.length) this.index = (this.index - 1 + this.images.length) % this.images.length; },
    handleKey (e) {
      if (!this.isOpen) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    },
    currentSrc () {
      const item = this.images[this.index];
      if (!item) return '';
      return typeof item === 'string' ? item : item.src;
    },
    currentAlt () {
      const item = this.images[this.index];
      if (!item) return '';
      return typeof item === 'string' ? '' : (item.alt || '');
    }
  };
};

/* --------------------------------------------------------
 * Image fallback handler — swap broken images to a soft
 * placeholder gradient (defined in site.css).
 * Use: <img ... onerror="wccImgFallback(this)">
 * ------------------------------------------------------ */
window.wccImgFallback = function (img) {
  if (img.dataset.fallback === 'true') return; // prevent loops
  img.dataset.fallback = 'true';
  img.removeAttribute('src');
  img.alt = img.alt || 'Image coming soon';
};

/* --------------------------------------------------------
 * Inline SVG icon set for amenities (keyed by iconKey).
 * Returns an SVG string given a key; unknown -> default.
 * ------------------------------------------------------ */
window.wccIcon = function (key) {
  const icons = {
    'sun':       '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m0 13.5V21M5.636 5.636l1.591 1.591m9.546 9.546l1.591 1.591M3 12h2.25m13.5 0H21M5.636 18.364l1.591-1.591m9.546-9.546l1.591-1.591M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>',
    'book-open': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>',
    'swing':     '<path stroke-linecap="round" stroke-linejoin="round" d="M4 5h16M7 5v6a5 5 0 0010 0V5M9 19h6M12 17v2"/>',
    'star':      '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4l2.39 4.84L19.8 9.6l-3.9 3.8.92 5.38L12 16.27 7.18 18.78l.92-5.38L4.2 9.6l5.41-.76L12 4z"/>',
    'droplet':   '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3.5s6 7 6 11a6 6 0 11-12 0c0-4 6-11 6-11z"/>',
    'snowflake': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07L19.07 4.93"/>',
    'home':      '<path stroke-linecap="round" stroke-linejoin="round" d="M3 11l9-8 9 8M5 10v10h14V10"/>',
    'tree':      '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3l5 7h-3l4 6H6l4-6H7l5-7zM12 16v5"/>'
  };
  return icons[key] || icons['home'];
};
