/**
 * AquaFlow / HydroPro - Multipurpose Service & Irrigation Template
 * Core Frontend JavaScript: Theme Switcher (Dark/Light), RTL Toggle,
 * Navigation Drawer, Accordions, Interactive Calculators, & Before/After Slider
 */

(function () {
  'use strict';

  // --- 1. Dark / Light Mode Manager ---
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && document.documentElement.classList.contains('dark'))) {
      document.documentElement.classList.add('dark');
      updateThemeIcons(true);
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      updateThemeIcons(false);
    } else if (prefersDark) {
      document.documentElement.classList.add('dark');
      updateThemeIcons(true);
    } else {
      document.documentElement.classList.remove('dark');
      updateThemeIcons(false);
    }

    // Bind all theme toggles
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcons(isDark);
  }

  function updateThemeIcons(isDark) {
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      const sunIcon = btn.querySelector('.sun-icon');
      const moonIcon = btn.querySelector('.moon-icon');
      if (sunIcon && moonIcon) {
        if (isDark) {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
        } else {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        }
      }
    });
  }

  // --- 2. LTR / RTL Direction Manager ---
  function initDirection() {
    const savedDir = localStorage.getItem('direction') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
    updateRtlButtons(savedDir === 'rtl');

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleRTL);
    });
  }

  function toggleRTL() {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('direction', newDir);
    updateRtlButtons(newDir === 'rtl');
  }

  function updateRtlButtons(isRTL) {
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      const label = btn.querySelector('.rtl-label');
      if (label) {
        label.textContent = isRTL ? 'LTR' : 'RTL';
      }
    });
  }

  // --- 3. Sticky Navbar with Scroll Shadow ---
  function initStickyNavbar() {
    const floatingNav = document.querySelector('.floating-nav-island');
    const headerNav = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
      const isScrolled = window.scrollY > 20;
      if (floatingNav) {
        if (isScrolled) {
          floatingNav.classList.add('scrolled');
          const inner = floatingNav.querySelector('.nav-island-card');
          if (inner) inner.classList.add('shadow-2xl', 'backdrop-blur-2xl');
        } else {
          floatingNav.classList.remove('scrolled');
          const inner = floatingNav.querySelector('.nav-island-card');
          if (inner) inner.classList.remove('shadow-2xl', 'backdrop-blur-2xl');
        }
      }
      if (headerNav) {
        if (isScrolled) {
          headerNav.classList.add('shadow-md', 'backdrop-blur-md');
        } else {
          headerNav.classList.remove('shadow-md');
        }
      }
    });
  }

  // --- 4. Mobile Navigation Drawer ---
  function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const closeBtn = document.getElementById('close-drawer-btn');
    const backdrop = document.getElementById('drawer-backdrop');

    if (!mobileDrawer) return;

    function openMenu() {
      mobileDrawer.classList.remove('translate-x-full', '-translate-x-full');
      if (backdrop) backdrop.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    }

    function closeMenu() {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      mobileDrawer.classList.add(isRtl ? '-translate-x-full' : 'translate-x-full');
      if (backdrop) backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }

    if (menuBtn) menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);
  }

  // --- 5. Accordion System (FAQs & Details) ---
  function initAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', function () {
        const item = this.closest('.accordion-item');
        const parent = item.parentElement;
        
        // Close siblings if in same accordion group
        parent.querySelectorAll('.accordion-item').forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
          }
        });

        item.classList.toggle('active');
      });
    });
  }

  // --- 6. Category Filter (Services & Blog) ---
  function initFilters() {
    const filterButtons = document.querySelectorAll('[data-filter-btn]');
    const filterItems = document.querySelectorAll('[data-filter-item]');

    if (!filterButtons.length || !filterItems.length) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const targetCategory = this.getAttribute('data-filter-btn');

        filterButtons.forEach(b => {
          b.classList.remove('bg-emerald-600', 'text-white');
          b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
        });

        this.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
        this.classList.add('bg-emerald-600', 'text-white');

        filterItems.forEach(item => {
          const itemCat = item.getAttribute('data-filter-item');
          if (targetCategory === 'all' || itemCat === targetCategory) {
            item.style.display = '';
            item.classList.add('animate-fadeIn');
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 7. Interactive Water & Cost Savings Calculator ---
  function initSavingsCalculator() {
    const areaInput = document.getElementById('calc-lawn-size');
    const systemType = document.getElementById('calc-system-type');
    const areaDisplay = document.getElementById('calc-lawn-display');
    const waterSavedDisplay = document.getElementById('calc-water-saved');
    const moneySavedDisplay = document.getElementById('calc-money-saved');

    if (!areaInput || !waterSavedDisplay || !moneySavedDisplay) return;

    function recalculate() {
      const sqft = parseInt(areaInput.value, 10) || 2500;
      if (areaDisplay) areaDisplay.textContent = sqft.toLocaleString() + ' sq ft';

      // Smart system saves ~35-50% water compared to traditional timer
      const multiplier = (systemType && systemType.value === 'smart-drip') ? 0.45 : 0.35;
      const annualGallons = Math.round(sqft * 22 * multiplier);
      // Average municipal water cost per 1k gallons is ~$8.50 + sewer surcharge
      const annualDollars = Math.round((annualGallons / 1000) * 8.65);

      waterSavedDisplay.textContent = annualGallons.toLocaleString() + ' gal';
      moneySavedDisplay.textContent = '$' + annualDollars.toLocaleString();
    }

    areaInput.addEventListener('input', recalculate);
    if (systemType) systemType.addEventListener('change', recalculate);
    recalculate();
  }

  // --- 8. Before & After Interactive Comparison Slider (Multi-Instance Draggable) ---
  function initBeforeAfterSlider() {
    const containers = document.querySelectorAll('.ba-container');
    if (!containers.length) return;

    containers.forEach(container => {
      const beforeWrap = container.querySelector('.ba-before');
      const beforeImg = container.querySelector('.ba-before img');
      const sliderLine = container.querySelector('.ba-slider');

      if (!beforeWrap || !sliderLine) return;

      function syncImageDimensions() {
        const rect = container.getBoundingClientRect();
        if (beforeImg) {
          beforeImg.style.width = rect.width + 'px';
          beforeImg.style.height = rect.height + 'px';
        }
      }

      window.addEventListener('resize', syncImageDimensions);
      // Run once immediately and once on full window load
      syncImageDimensions();
      window.addEventListener('load', syncImageDimensions);

      let isDown = false;

      function updatePosition(clientX) {
        const rect = container.getBoundingClientRect();
        let x = clientX - rect.left;
        let percent = (x / rect.width) * 100;
        if (percent < 0) percent = 0;
        if (percent > 100) percent = 100;

        beforeWrap.style.width = percent + '%';
        sliderLine.style.left = percent + '%';
      }

      // Pointer event based dragging (seamless for mouse & touch)
      container.addEventListener('pointerdown', (e) => {
        isDown = true;
        syncImageDimensions();
        container.style.cursor = 'ew-resize';
        try { container.setPointerCapture(e.pointerId); } catch(err) {}
        updatePosition(e.clientX);
      });

      container.addEventListener('pointermove', (e) => {
        if (!isDown) return;
        updatePosition(e.clientX);
      });

      const stopDragging = (e) => {
        if (isDown) {
          isDown = false;
          container.style.cursor = 'ew-resize';
          try { container.releasePointerCapture(e.pointerId); } catch(err) {}
        }
      };

      container.addEventListener('pointerup', stopDragging);
      container.addEventListener('pointercancel', stopDragging);
    });
  }

  // --- 9. Assessment Request / Quote Handler (Direct Action) ---
  function initQuoteModal() {
    const openBtns = document.querySelectorAll('[data-open-quote]');
    const modal = document.getElementById('quote-modal');
    const closeBtns = document.querySelectorAll('[data-close-quote]');

    if (modal) {
      openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          modal.classList.remove('hidden');
          modal.classList.add('flex');
          document.body.classList.add('overflow-hidden');
        });
      });

      closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
          document.body.classList.remove('overflow-hidden');
        });
      });
    } else {
      // Seamless direct action: if no modal, ensure buttons dial dispatch directly
      openBtns.forEach(btn => {
        const href = btn.getAttribute('href');
        if (!href || href === '#' || href === '#quick-assessment') {
          const quickSec = document.getElementById('quick-assessment');
          if (!quickSec) {
            btn.setAttribute('href', 'tel:5553829283');
          }
        }
      });
    }
  }

  // --- 10. Live Color Palette Manager & Theme Studio ---
  function initPaletteManager() {
    const savedPalette = localStorage.getItem('colorTheme') || 'greenwave';
    applyPalette(savedPalette);

    if (!document.getElementById('theme-customizer-widget')) {
      const widget = document.createElement('div');
      widget.id = 'theme-customizer-widget';
      widget.className = 'fixed bottom-5 left-5 rtl:left-auto rtl:right-5 z-50';
      widget.innerHTML = `
        <div class="relative">
          <button id="theme-customizer-toggle" class="w-11 h-11 rounded-full bg-[#0b291e] dark:bg-emerald-600 text-white shadow-xl flex items-center justify-center hover:scale-110 transition-all border-2 border-white/40 focus:outline-none" title="Customize Theme & Palette">
            <i class="fa-solid fa-palette text-sm"></i>
          </button>
          <div id="theme-customizer-panel" class="absolute bottom-14 left-0 rtl:left-auto rtl:right-0 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 hidden animate-modal-pop">
            <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
              <span class="text-xs font-heading font-black text-slate-900 dark:text-white uppercase tracking-wider">Theme Studio</span>
              <button id="theme-customizer-close" class="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs p-1">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <!-- Color Palettes -->
            <div class="mb-3">
              <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Accent Palette</span>
              <div class="grid grid-cols-4 gap-2">
                <button data-palette-set="greenwave" class="palette-btn p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#0F5D46] flex flex-col items-center gap-1 transition-all" title="Primary Green (#0F5D46)">
                  <span class="w-4 h-4 rounded-full bg-[#0F5D46]"></span>
                  <span class="text-[9px] font-bold text-slate-600 dark:text-slate-300">Primary</span>
                </button>
                <button data-palette-set="accent" class="palette-btn p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#22C55E] flex flex-col items-center gap-1 transition-all" title="Accent Green (#22C55E)">
                  <span class="w-4 h-4 rounded-full bg-[#22C55E]"></span>
                  <span class="text-[9px] font-bold text-slate-600 dark:text-slate-300">Accent</span>
                </button>
                <button data-palette-set="teal" class="palette-btn p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#14B8A6] flex flex-col items-center gap-1 transition-all" title="Teal (#14B8A6)">
                  <span class="w-4 h-4 rounded-full bg-[#14B8A6]"></span>
                  <span class="text-[9px] font-bold text-slate-600 dark:text-slate-300">Teal</span>
                </button>
                <button data-palette-set="olive" class="palette-btn p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#84CC16] flex flex-col items-center gap-1 transition-all" title="Olive Green (#84CC16)">
                  <span class="w-4 h-4 rounded-full bg-[#84CC16]"></span>
                  <span class="text-[9px] font-bold text-slate-600 dark:text-slate-300">Olive</span>
                </button>
              </div>
            </div>

            <!-- Quick Switches -->
            <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
              <span class="text-[10px] uppercase font-bold text-slate-400">Mode</span>
              <div class="flex items-center gap-1.5">
                <button class="theme-toggle-btn p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 text-xs" title="Toggle Dark/Light">
                  <i class="fa-solid fa-moon"></i>
                </button>
                <button class="rtl-toggle-btn px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 text-[10px] font-bold" title="Toggle RTL">
                  <span class="rtl-label">RTL</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(widget);

      const toggleBtn = widget.querySelector('#theme-customizer-toggle');
      const panel = widget.querySelector('#theme-customizer-panel');
      const closeBtn = widget.querySelector('#theme-customizer-close');

      if (toggleBtn && panel) {
        toggleBtn.addEventListener('click', () => panel.classList.toggle('hidden'));
      }
      if (closeBtn && panel) {
        closeBtn.addEventListener('click', () => panel.classList.add('hidden'));
      }

      widget.querySelectorAll('[data-palette-set]').forEach(btn => {
        btn.addEventListener('click', function () {
          const pal = this.getAttribute('data-palette-set');
          applyPalette(pal);
        });
      });
    }
  }

  function applyPalette(paletteName) {
    document.documentElement.setAttribute('data-theme', paletteName);
    localStorage.setItem('colorTheme', paletteName);

    document.querySelectorAll('[data-palette-set]').forEach(btn => {
      if (btn.getAttribute('data-palette-set') === paletteName) {
        btn.classList.add('ring-2', 'ring-emerald-500', 'bg-emerald-50/50', 'dark:bg-emerald-950/40');
      } else {
        btn.classList.remove('ring-2', 'ring-emerald-500', 'bg-emerald-50/50', 'dark:bg-emerald-950/40');
      }
    });
  }

  // --- 11. Interactive Google Map Location Switcher ---
  function initInteractiveMap() {
    const mapContainer = document.getElementById('interactive-map-section');
    if (!mapContainer) return;

    const mapIframe = document.getElementById('interactive-google-map');
    const titleEl = document.getElementById('map-active-title');
    const addressEl = document.getElementById('map-active-address');
    const descEl = document.getElementById('map-active-desc');
    const dispatchEl = document.getElementById('map-active-dispatch');
    const directionsLink = document.getElementById('map-directions-link');

    const locationData = {
      'austin-hq': {
        title: 'Austin Central Headquarters & Dispatch Hub',
        address: '123 Green Lane, Suite 300, Austin, TX 78704',
        query: '123 Green Lane, Austin, TX 78704',
        zoom: 14,
        desc: 'Primary equipment depot, master brass parts warehouse, state-certified backflow testing center, and 24/7 central dispatch office.',
        dispatch: 'Same-Day Dispatch • 6 Active Fleet Vans • < 20 Min Avg Response'
      },
      'westlake': {
        title: 'Westlake Hills & Barton Creek Estate Hub',
        address: 'Westlake Hills, Austin, TX 78746',
        query: 'Westlake Hills, Austin, TX 78746',
        zoom: 13,
        desc: 'Dedicated luxury residential crew specialized in high-elevation sloped terrain, multi-acre Zoysia turf balancing, and check-valve pressure regulation.',
        dispatch: 'Stationed Route Unit #2 • Daily Estate Sweeps • Dedicated Master Irrigator'
      },
      'lakeway': {
        title: 'Lakeway & Lake Travis Shoreline Corridor',
        address: 'Lakeway Blvd, Lakeway, TX 78734',
        query: 'Lakeway, TX 78734',
        zoom: 13,
        desc: 'Specialized lakeside irrigation team handling lake pump intake systems, limestone trenchless poly lines, and municipal WaterSense compliance.',
        dispatch: 'Lake Travis Route Unit #4 • Full Lake Pump & Backflow Rig'
      },
      'round-rock': {
        title: 'Round Rock & North Austin Tech Campus Zone',
        address: 'Round Rock, TX 78664',
        query: 'Round Rock, TX 78664',
        zoom: 13,
        desc: 'Commercial facilities & corporate campus division managing multi-master valves, central Hydrawise cloud clusters, and 24-zone IoT controllers.',
        dispatch: 'Commercial Team Alpha • 4-Hour Guaranteed SLA for Water Main Breaks'
      },
      'cedar-park': {
        title: 'Cedar Park & Leander Northwest Hub',
        address: 'Cedar Park, TX 78613',
        query: 'Cedar Park, TX 78613',
        zoom: 13,
        desc: 'Suburban residential division performing seasonal spring turn-ons, MP Rotator retrofits, and high-CFM winterization blowouts.',
        dispatch: 'Northwest Van Unit #3 • Rapid Residential Response'
      },
      'buda-kyle': {
        title: 'Buda, Kyle & South Hays County Corridor',
        address: 'Buda, TX 78610',
        query: 'Buda, TX 78610',
        zoom: 13,
        desc: 'Rapidly growing South Metro division installing subsurface Netafim drip lines and soil-calibrated Rachio 3 controllers for clay soil.',
        dispatch: 'South Route Unit #5 • Clay Soil Hydraulic Specialists'
      }
    };

    mapContainer.querySelectorAll('[data-map-key]').forEach(btn => {
      btn.addEventListener('click', function () {
        const key = this.getAttribute('data-map-key');
        const data = locationData[key];
        if (!data) return;

        // Update Buttons UI
        mapContainer.querySelectorAll('[data-map-key]').forEach(b => {
          b.classList.remove('bg-emerald-600', 'text-white', 'shadow-md', 'border-emerald-600');
          b.classList.add('bg-slate-100', 'dark:bg-[#1f1f1f]', 'text-slate-700', 'dark:text-neutral-300', 'border-transparent');
        });
        this.classList.remove('bg-slate-100', 'dark:bg-[#1f1f1f]', 'text-slate-700', 'dark:text-neutral-300', 'border-transparent');
        this.classList.add('bg-emerald-600', 'text-white', 'shadow-md', 'border-emerald-600');

        // Update Map Iframe smoothly
        if (mapIframe) {
          const encodedQuery = encodeURIComponent(data.query);
          mapIframe.src = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=${data.zoom}&ie=UTF8&iwloc=&output=embed`;
        }

        // Update Text Info
        if (titleEl) titleEl.textContent = data.title;
        if (addressEl) {
          addressEl.innerHTML = `<i class="fa-solid fa-location-dot text-emerald-500"></i><span>${data.address}</span>`;
        }
        if (descEl) descEl.textContent = data.desc;
        if (dispatchEl) dispatchEl.textContent = data.dispatch;
        if (directionsLink) {
          directionsLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.query)}`;
        }
      });
    });
  }

  // Initialize all components on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDirection();
    initPaletteManager();
    initStickyNavbar();
    initMobileMenu();
    initAccordions();
    initFilters();
    initSavingsCalculator();
    initBeforeAfterSlider();
    initInteractiveMap();
    initQuoteModal();
    if (window.lucide) {
      lucide.createIcons();
    }
  });
})();
