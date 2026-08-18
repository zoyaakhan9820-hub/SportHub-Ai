/**
 * ATHLETIX Main Application Controller & SPA Router
 * Handles hash navigation, facility/coach rendering, universal search (Ctrl+K),
 * notification center dropdown, toast alerts, and counter animations.
 */

const App = {
  currentView: 'home',
  facilitiesFilter: {
    sport: 'all',
    maxPrice: 60,
    amenities: []
  },
  coachesFilter: {
    sport: 'all'
  },
  galleryFilter: {
    sport: 'all'
  },
  currentGalleryImageIndex: 0,
  currentGalleryImages: [],

  init() {
    this.initRouter();
    this.bindGlobalEvents();
    this.initCounters();
    this.renderFacilities();
    this.renderCoaches();
    this.renderGallery();

    // Initialize Sub-Engines
    BookingEngine.init();
    AIMatchmaker.init();
    TournamentEngine.init();
    CommunityEngine.init();
    AdminDashboard.init();
    AuthEngine.init();
    ProfileEngine.init();

    console.log('⚡ ATHLETIX Core Platform Initialized');
  },

  initRouter() {
    // Check initial hash
    window.addEventListener('hashchange', () => this.handleHashChange());
    this.handleHashChange();
  },

  handleHashChange() {
    const hash = window.location.hash.replace('#', '') || 'home';
    this.navigateTo(hash, false);
  },

  navigateTo(viewId, updateHash = true) {
    const validViews = ['home', 'facilities', 'tournaments', 'coaches', 'community', 'about', 'admin', 'profile'];
    if (!validViews.includes(viewId)) viewId = 'home';

    this.currentView = viewId;

    // Toggle active view section
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const targetSection = document.getElementById(`view-${viewId}`);
    if (targetSection) {
      targetSection.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      const target = link.getAttribute('data-nav');
      if (target === viewId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (updateHash) {
      window.location.hash = `#${viewId}`;
    }

    // Re-draw charts when entering admin or profile views
    if (viewId === 'admin') {
      setTimeout(() => {
        AdminDashboard.drawRevenueChart();
        AdminDashboard.drawSportsDonutChart();
      }, 100);
    } else if (viewId === 'profile') {
      setTimeout(() => {
        ProfileEngine.drawProfileRadar();
      }, 100);
    } else if (viewId === 'facilities') {
      setTimeout(() => {
        this.renderGallery();
      }, 100);
    }
  },

  bindGlobalEvents() {
    // Nav link click delegation
    document.addEventListener('click', (e) => {
      const navLink = e.target.closest('[data-nav]');
      if (navLink) {
        const targetView = navLink.getAttribute('data-nav');
        this.navigateTo(targetView);
      }

      // Close all modals
      const closeBtn = e.target.closest('.modal-close-btn');
      if (closeBtn) {
        const modal = closeBtn.closest('.modal-backdrop');
        if (modal) modal.classList.remove('active');
      }

      // Backdrop click to close
      if (e.target.classList.contains('modal-backdrop')) {
        e.target.classList.remove('active');
      }

      // Notification Center Toggle
      const notifToggle = e.target.closest('#btnNotificationToggle');
      if (notifToggle) {
        const dropdown = document.getElementById('notificationDropdown');
        if (dropdown) {
          dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        }
      }

      // Universal Search Trigger
      const searchTrigger = e.target.closest('[data-open-search]');
      if (searchTrigger) {
        const modal = document.getElementById('universalSearchModal');
        if (modal) {
          modal.classList.add('active');
          document.getElementById('universalSearchInput')?.focus();
        }
      }

      // Facility Details modal trigger
      const viewFacBtn = e.target.closest('[data-view-facility]');
      if (viewFacBtn) {
        const facId = viewFacBtn.getAttribute('data-view-facility');
        this.openFacilityDetailsModal(facId);
      }

      // Coach Profile modal trigger
      const viewCoachBtn = e.target.closest('[data-view-coach]');
      if (viewCoachBtn) {
        const coachId = viewCoachBtn.getAttribute('data-view-coach');
        this.openCoachProfileModal(coachId);
      }

      // Facility Sport Chip Filter
      const facChip = e.target.closest('.facility-sport-chip');
      if (facChip) {
        document.querySelectorAll('.facility-sport-chip').forEach(c => c.classList.remove('active'));
        facChip.classList.add('active');
        this.facilitiesFilter.sport = facChip.getAttribute('data-sport');
        this.renderFacilities();
      }

      // Coach Sport Chip Filter
      const coachChip = e.target.closest('.coach-sport-chip');
      if (coachChip) {
        document.querySelectorAll('.coach-sport-chip').forEach(c => c.classList.remove('active'));
        coachChip.classList.add('active');
        this.coachesFilter.sport = coachChip.getAttribute('data-sport');
        this.renderCoaches();
      }

      // Gallery Sport Chip Filter
      const galleryChip = e.target.closest('.gallery-sport-chip');
      if (galleryChip) {
        document.querySelectorAll('.gallery-sport-chip').forEach(c => c.classList.remove('active'));
        galleryChip.classList.add('active');
        this.galleryFilter.sport = galleryChip.getAttribute('data-gallery-sport');
        this.renderGallery();
      }
    });

    // Keyboard Shortcuts (Ctrl+K for search, Escape to close modals)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchModal = document.getElementById('universalSearchModal');
        if (searchModal) {
          searchModal.classList.add('active');
          document.getElementById('universalSearchInput')?.focus();
        }
      } else if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.active').forEach(m => m.classList.remove('active'));
        const notifDropdown = document.getElementById('notificationDropdown');
        if (notifDropdown) notifDropdown.style.display = 'none';
      } else if (e.key === 'ArrowLeft') {
        // Previous image in gallery
        const galleryModal = document.getElementById('galleryImageModal');
        if (galleryModal && galleryModal.classList.contains('active')) {
          this.previousGalleryImage();
        }
      } else if (e.key === 'ArrowRight') {
        // Next image in gallery
        const galleryModal = document.getElementById('galleryImageModal');
        if (galleryModal && galleryModal.classList.contains('active')) {
          this.nextGalleryImage();
        }
      }
    });

    // Universal Search Input Handler
    const universalInput = document.getElementById('universalSearchInput');
    if (universalInput) {
      universalInput.addEventListener('input', (e) => {
        this.handleUniversalSearch(e.target.value);
      });
    }

    // Facilities Price Slider
    const priceSlider = document.getElementById('facilityPriceSlider');
    if (priceSlider) {
      priceSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        document.getElementById('facilityPriceSliderVal').textContent = `₹${val}`;
        this.facilitiesFilter.maxPrice = parseInt(val);
        this.renderFacilities();
      });
    }

    // Facility Amenity Checkboxes
    document.querySelectorAll('.facility-amenity-filter').forEach(cb => {
      cb.addEventListener('change', () => {
        const checked = Array.from(document.querySelectorAll('.facility-amenity-filter:checked')).map(i => i.value);
        this.facilitiesFilter.amenities = checked;
        this.renderFacilities();
      });
    });

    // Sticky Header Effect
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.site-header');
      if (header) {
        if (window.scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobileMenuToggle');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => {
        const drawer = document.getElementById('mobileDrawer');
        if (drawer) drawer.classList.toggle('active');
      });
    }

    // Gallery Image Navigation
    const galleryPrevBtn = document.getElementById('galleryPrevBtn');
    const galleryNextBtn = document.getElementById('galleryNextBtn');
    if (galleryPrevBtn) {
      galleryPrevBtn.addEventListener('click', () => this.previousGalleryImage());
    }
    if (galleryNextBtn) {
      galleryNextBtn.addEventListener('click', () => this.nextGalleryImage());
    }
  },

  renderFacilities() {
    const grid = document.getElementById('facilitiesGrid');
    if (!grid) return;

    let list = ATHLETIX_DATA.facilities;

    if (this.facilitiesFilter.sport !== 'all') {
      list = list.filter(f => f.sport === this.facilitiesFilter.sport);
    }

    list = list.filter(f => f.pricePerHour <= this.facilitiesFilter.maxPrice);

    if (this.facilitiesFilter.amenities.length > 0) {
      list = list.filter(f => 
        this.facilitiesFilter.amenities.every(amenity => f.amenities.includes(amenity))
      );
    }

    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding: 4rem 1rem;">
          <div style="font-size:3rem; margin-bottom:1rem;">🏟️</div>
          <h3>No facilities match your active filters</h3>
          <p>Try widening your price range or clearing amenity filters.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map(f => `
      <div class="facility-card">
        <div class="facility-thumb-box">
          <img src="${f.image}" alt="${f.name}" class="facility-thumb">
          <div class="facility-badge-top">
            <span class="badge badge-emerald">${f.badge}</span>
          </div>
          <div class="facility-rating-tag">
            ★ ${f.rating} <span style="font-size:0.7rem; color:var(--text-muted);">(${f.reviewCount})</span>
          </div>
        </div>
        <div class="facility-body">
          <div class="facility-sport-tag">${f.sportName}</div>
          <h3 class="facility-name">${f.name}</h3>
          <div class="facility-location">
            <span>📍 ${f.location} • <b style="color:var(--text-white);">${f.distance}</b></span>
          </div>

          <div class="facility-amenities-tags">
            ${f.amenities.slice(0, 4).map(a => `<span class="facility-amenity-chip">${a}</span>`).join('')}
          </div>

          <div class="facility-footer">
            <div class="facility-price-box">
              <span class="facility-price-val">${f.currency}${f.pricePerHour}</span>
              <span class="facility-price-unit">per hour / court</span>
            </div>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-sm btn-secondary" data-view-facility="${f.id}">
                Details
              </button>
              <button class="btn btn-sm btn-primary" data-book-facility="${f.id}">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  },

  renderCoaches() {
    const grid = document.getElementById('coachesGrid');
    if (!grid) return;

    let list = ATHLETIX_DATA.coaches;

    if (this.coachesFilter.sport !== 'all') {
      list = list.filter(c => c.sport === this.coachesFilter.sport);
    }

    grid.innerHTML = list.map(c => `
      <div class="coach-card">
        <div class="coach-header-img">
          <img src="${c.cover}" alt="Cover" style="width:100%; height:100%; object-fit:cover;">
          <img src="${c.avatar}" alt="${c.name}" class="coach-avatar-large">
        </div>
        <div class="coach-content">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <h3 class="coach-name">${c.name}</h3>
              <div class="coach-title">${c.title}</div>
            </div>
            <div style="color:var(--gold); font-weight:700; font-size:0.9rem;">
              ★ ${c.rating}
            </div>
          </div>

          <div class="coach-badges-list">
            ${c.badges.map(b => `<span class="coach-badge-item">${b}</span>`).join('')}
          </div>

          <div class="coach-bio-snippet">${c.bio}</div>

          <div class="coach-footer-bar">
            <div>
              <div style="font-family:'Outfit'; font-size:1.35rem; font-weight:800; color:white;">
                ${c.currency}${c.hourlyRate}
              </div>
              <div style="font-size:0.75rem; color:var(--text-muted);">${c.experience} Exp</div>
            </div>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-sm btn-secondary" data-view-coach="${c.id}">Profile</button>
              <button class="btn btn-sm btn-primary" data-book-coach="${c.id}">Book</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  },

  renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    let images = ATHLETIX_DATA.galleryImages;

    if (this.galleryFilter.sport !== 'all') {
      images = images.filter(img => img.sport === this.galleryFilter.sport);
    }

    if (images.length === 0) {
      galleryGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding: 3rem 1rem;">
          <div style="font-size:2rem; margin-bottom:1rem;">🖼️</div>
          <h3>No images available for this sport</h3>
          <p>Try selecting a different sport category.</p>
        </div>
      `;
      return;
    }

    galleryGrid.innerHTML = images.map((img, idx) => `
      <div class="gallery-image-card" data-gallery-image-id="${img.id}" onclick="App.openGalleryImageModal('${img.id}')">
        <img src="${img.path}" alt="${img.label}" loading="lazy">
        <div class="gallery-image-overlay">
          <span class="gallery-image-label">${img.label}</span>
        </div>
      </div>
    `).join('');
  },

  openGalleryImageModal(imageId) {
    const modal = document.getElementById('galleryImageModal');
    if (!modal) return;

    // Get all images (not filtered)
    const allImages = ATHLETIX_DATA.galleryImages;
    const currentImageIndex = allImages.findIndex(img => img.id === imageId);
    
    if (currentImageIndex === -1) return;

    // Store the current image index for navigation
    this.currentGalleryImageIndex = currentImageIndex;
    this.currentGalleryImages = allImages;

    this.displayGalleryImage(currentImageIndex);
    modal.classList.add('active');
  },

  displayGalleryImage(index) {
    const modal = document.getElementById('galleryImageModal');
    const image = this.currentGalleryImages[index];

    if (!image) return;

    document.getElementById('galleryFullImage').src = image.path;
    document.getElementById('galleryFullImage').alt = image.label;
    document.getElementById('galleryImageTitle').textContent = image.label;
    document.getElementById('galleryImageCounter').textContent = `${index + 1} / ${this.currentGalleryImages.length}`;

    // Update button visibility
    document.getElementById('galleryPrevBtn').style.display = index > 0 ? 'block' : 'none';
    document.getElementById('galleryNextBtn').style.display = index < this.currentGalleryImages.length - 1 ? 'block' : 'none';
  },

  previousGalleryImage() {
    if (this.currentGalleryImageIndex > 0) {
      this.currentGalleryImageIndex--;
      this.displayGalleryImage(this.currentGalleryImageIndex);
    }
  },

  nextGalleryImage() {
    if (this.currentGalleryImageIndex < this.currentGalleryImages.length - 1) {
      this.currentGalleryImageIndex++;
      this.displayGalleryImage(this.currentGalleryImageIndex);
    }
  },

  openFacilityDetailsModal(facId) {
    const facility = ATHLETIX_DATA.facilities.find(f => f.id === facId) || ATHLETIX_DATA.facilities[0];
    const modal = document.getElementById('facilityDetailsModal');
    if (!modal) return;

    document.getElementById('facDetailsTitle').textContent = facility.name;
    document.getElementById('facDetailsLocation').textContent = `📍 ${facility.location} (${facility.distance})`;
    document.getElementById('facDetailsOverview').textContent = facility.overview;
    document.getElementById('facDetailsPrice').textContent = `${facility.currency}${facility.pricePerHour} / hour`;
    document.getElementById('facDetailsBanner').src = facility.image;

    // Amenities
    const amenitiesContainer = document.getElementById('facDetailsAmenitiesList');
    if (amenitiesContainer) {
      amenitiesContainer.innerHTML = facility.amenities.map(a => `
        <div style="background:var(--bg-surface); padding:0.5rem 0.9rem; border-radius:var(--radius-sm); border:1px solid var(--glass-border); font-size:0.85rem; color:white;">
          ✓ ${a}
        </div>
      `).join('');
    }

    // Rules
    const rulesContainer = document.getElementById('facDetailsRulesList');
    if (rulesContainer) {
      rulesContainer.innerHTML = facility.rules.map(r => `<li>${r}</li>`).join('');
    }

    // Set Book button
    const bookBtn = document.getElementById('facDetailsBookActionBtn');
    if (bookBtn) {
      bookBtn.setAttribute('data-book-facility', facility.id);
    }

    modal.classList.add('active');
  },

  openCoachProfileModal(coachId) {
    const coach = ATHLETIX_DATA.coaches.find(c => c.id === coachId) || ATHLETIX_DATA.coaches[0];
    const modal = document.getElementById('coachProfileModal');
    if (!modal) return;

    document.getElementById('coachProfileName').textContent = coach.name;
    document.getElementById('coachProfileTitle').textContent = coach.title;
    document.getElementById('coachProfileBio').textContent = coach.bio;
    document.getElementById('coachProfileAvatar').src = coach.avatar;
    document.getElementById('coachProfileCover').src = coach.cover;
    document.getElementById('coachProfileRate').textContent = `${coach.currency}${coach.hourlyRate}/hr`;

    // Achievements
    const achContainer = document.getElementById('coachAchievementsList');
    if (achContainer) {
      achContainer.innerHTML = coach.achievements.map(a => `<li>🏆 ${a}</li>`).join('');
    }

    // Specializations
    const specContainer = document.getElementById('coachSpecialtiesList');
    if (specContainer) {
      specContainer.innerHTML = coach.specialties.map(s => `<span class="badge badge-emerald">${s}</span>`).join(' ');
    }

    // Book button
    const bookBtn = document.getElementById('coachProfileBookActionBtn');
    if (bookBtn) {
      bookBtn.setAttribute('data-book-coach', coach.id);
    }

    modal.classList.add('active');
  },

  handleUniversalSearch(query) {
    const resultsContainer = document.getElementById('universalSearchResults');
    if (!resultsContainer) return;

    if (!query || query.trim().length < 2) {
      resultsContainer.innerHTML = `
        <div style="text-align:center; padding:2rem; color:var(--text-muted); font-size:0.9rem;">
          Type at least 2 characters to search across turfs, tournaments, coaches, and posts...
        </div>
      `;
      return;
    }

    const q = query.toLowerCase();

    // Search Facilities
    const matchedFacs = ATHLETIX_DATA.facilities.filter(f => f.name.toLowerCase().includes(q) || f.sportName.toLowerCase().includes(q));
    // Search Tournaments
    const matchedTours = ATHLETIX_DATA.tournaments.filter(t => t.title.toLowerCase().includes(q) || t.sportName.toLowerCase().includes(q));
    // Search Coaches
    const matchedCoaches = ATHLETIX_DATA.coaches.filter(c => c.name.toLowerCase().includes(q) || c.sportName.toLowerCase().includes(q));

    let html = '';

    if (matchedFacs.length > 0) {
      html += `<div style="font-size:0.75rem; font-weight:700; color:var(--emerald-neon); text-transform:uppercase; margin:0.8rem 0 0.4rem;">🏟️ Facilities (${matchedFacs.length})</div>`;
      matchedFacs.forEach(f => {
        html += `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:0.6rem 0.8rem; background:var(--bg-surface); border-radius:var(--radius-sm); margin-bottom:0.4rem; cursor:pointer;" onclick="App.navigateTo('facilities'); document.getElementById('universalSearchModal').classList.remove('active');">
            <div>
              <div style="font-weight:700; color:white; font-size:0.9rem;">${f.name}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">${f.sportName} • ${f.location}</div>
            </div>
            <div style="font-weight:700; color:var(--emerald-neon);">${f.currency}${f.pricePerHour}/hr</div>
          </div>
        `;
      });
    }

    if (matchedTours.length > 0) {
      html += `<div style="font-size:0.75rem; font-weight:700; color:var(--cyan); text-transform:uppercase; margin:1rem 0 0.4rem;">🏆 Tournaments (${matchedTours.length})</div>`;
      matchedTours.forEach(t => {
        html += `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:0.6rem 0.8rem; background:var(--bg-surface); border-radius:var(--radius-sm); margin-bottom:0.4rem; cursor:pointer;" onclick="App.navigateTo('tournaments'); document.getElementById('universalSearchModal').classList.remove('active');">
            <div>
              <div style="font-weight:700; color:white; font-size:0.9rem;">${t.title}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">${t.sportName} • Prize: ${t.prizePool}</div>
            </div>
            <span class="badge badge-cyan">${t.status}</span>
          </div>
        `;
      });
    }

    if (matchedCoaches.length > 0) {
      html += `<div style="font-size:0.75rem; font-weight:700; color:var(--gold); text-transform:uppercase; margin:1rem 0 0.4rem;">🎯 Coaches (${matchedCoaches.length})</div>`;
      matchedCoaches.forEach(c => {
        html += `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:0.6rem 0.8rem; background:var(--bg-surface); border-radius:var(--radius-sm); margin-bottom:0.4rem; cursor:pointer;" onclick="App.navigateTo('coaches'); document.getElementById('universalSearchModal').classList.remove('active');">
            <div>
              <div style="font-weight:700; color:white; font-size:0.9rem;">${c.name}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">${c.title} • ${c.experience}</div>
            </div>
            <div style="font-weight:700; color:white;">${c.currency}${c.hourlyRate}/hr</div>
          </div>
        `;
      });
    }

    if (!html) {
      html = `
        <div style="text-align:center; padding:2rem; color:var(--text-muted);">
          No results found for "${query}". Try searching for football, cricket, badminton, or coach names.
        </div>
      `;
    }

    resultsContainer.innerHTML = html;
  },

  initCounters() {
    const statsSection = document.querySelector('.stats-banner');
    if (!statsSection) return;

    let animated = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          this.animateCounter('counterFacilities', 1200, '+');
          this.animateCounter('counterPlayers', 25000, '+');
          this.animateCounter('counterTournaments', 850, '+');
          this.animateCounter('counterCoaches', 500, '+');
        }
      });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
  },

  animateCounter(id, target, suffix = '') {
    const el = document.getElementById(id);
    if (!el) return;

    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);

      if (target >= 1000) {
        el.innerHTML = `${(current >= 1000 ? (current / 1000).toFixed(current % 1000 === 0 ? 0 : 1) + 'K' : current)}<span>${suffix}</span>`;
      } else {
        el.innerHTML = `${current}<span>${suffix}</span>`;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (target >= 1000) {
          el.innerHTML = `${(target / 1000).toFixed(target % 1000 === 0 ? 0 : 1)}K<span>${suffix}</span>`;
        } else {
          el.innerHTML = `${target}<span>${suffix}</span>`;
        }
      }
    };

    requestAnimationFrame(update);
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    let icon = '⚡';
    if (type === 'success') icon = '✅';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div>
        <div class="toast-title">${type.toUpperCase()}</div>
        <div class="toast-msg">${message}</div>
      </div>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 20);

    // Remove after 4 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }
};

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
