/**
 * ATHLETIX Player Profile & Performance Engine
 * Renders player radar charts, upcoming booked matches, match history timeline,
 * achievement badges, and profile editing modal.
 */

const ProfileEngine = {
  init() {
    this.bindEvents();
    this.renderProfileData();
    this.drawProfileRadar();
  },

  bindEvents() {
    // Edit Profile Trigger
    const editBtn = document.getElementById('btnEditProfileModal');
    if (editBtn) {
      editBtn.addEventListener('click', () => this.openEditModal());
    }

    // Save Profile Changes
    const saveBtn = document.getElementById('btnSaveProfileChanges');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.saveProfileChanges());
    }
  },

  renderProfileData() {
    const user = ATHLETIX_DATA.currentUser;

    // Set text elements
    const nameEl = document.getElementById('profileUserName');
    const roleEl = document.getElementById('profileUserRole');
    const bioEl = document.getElementById('profileUserBio');
    const cityEl = document.getElementById('profileUserCity');

    if (nameEl) nameEl.textContent = user.name;
    if (roleEl) roleEl.textContent = user.role;
    if (bioEl) bioEl.textContent = user.bio;
    if (cityEl) cityEl.textContent = user.city;

    // Render Stats
    const matchesEl = document.getElementById('profileStatMatches');
    const winsEl = document.getElementById('profileStatWins');
    const winRateEl = document.getElementById('profileStatWinRate');
    const mvpEl = document.getElementById('profileStatMvp');

    if (matchesEl) matchesEl.textContent = user.stats.matchesPlayed;
    if (winsEl) winsEl.textContent = user.stats.wins;
    if (winRateEl) winRateEl.textContent = user.stats.winRate;
    if (mvpEl) mvpEl.textContent = user.stats.mvpCount;

    // Render Badges
    const badgeContainer = document.getElementById('profileBadgesList');
    if (badgeContainer) {
      badgeContainer.innerHTML = user.badges.map(b => `
        <div style="display:flex; align-items:center; gap:0.6rem; background:var(--bg-surface); border:1px solid var(--glass-border); padding:0.6rem 1rem; border-radius:var(--radius-md);">
          <span style="font-size:1.4rem;">${b.icon}</span>
          <div>
            <div style="font-size:0.85rem; font-weight:700; color:white;">${b.name}</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">${b.desc}</div>
          </div>
        </div>
      `).join('');
    }

    // Render Upcoming Bookings
    const upcomingContainer = document.getElementById('profileUpcomingBookingsList');
    if (upcomingContainer) {
      upcomingContainer.innerHTML = user.upcomingBookings.map(b => `
        <div style="background:var(--bg-surface); border:1px solid var(--glass-border); border-radius:var(--radius-md); padding:1.2rem; margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.3rem;">
              <span class="badge badge-emerald">Confirmed</span>
              <span style="font-size:0.85rem; color:var(--text-muted);">${b.date} • ${b.time}</span>
            </div>
            <div style="font-size:1.1rem; font-weight:700; color:white;">${b.facility}</div>
            <div style="font-size:0.85rem; color:var(--emerald-neon); font-weight:600;">${b.court}</div>
          </div>
          <button class="btn btn-sm btn-outline-emerald" onclick="App.showToast('🎟️ Digital Pass Refreshed', 'info')">
            Pass QR
          </button>
        </div>
      `).join('');
    }

    // Render Match History
    const historyContainer = document.getElementById('profileMatchHistoryList');
    if (historyContainer) {
      historyContainer.innerHTML = user.matchHistory.map(m => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:0.9rem 0; border-bottom:1px solid var(--glass-border);">
          <div>
            <div style="font-size:0.95rem; font-weight:700; color:white;">${m.match}</div>
            <div style="font-size:0.78rem; color:var(--text-muted);">${m.role} • 📍 ${m.venue}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.95rem; font-weight:800; color:var(--emerald-neon);">${m.score}</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">${m.date}</div>
          </div>
        </div>
      `).join('');
    }
  },

  drawProfileRadar() {
    const canvas = document.getElementById('profileRadarCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 85;

    ctx.clearRect(0, 0, width, height);

    const labels = ['Speed', 'Stamina', 'Technique', 'Teamwork', 'Power'];
    const count = labels.length;
    const angleStep = (Math.PI * 2) / count;

    // Draw polygon grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;

    for (let level = 1; level <= 4; level++) {
      const r = (radius / 4) * level;
      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Draw axes
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Labels
      const labelX = centerX + Math.cos(angle) * (radius + 20);
      const labelY = centerY + Math.sin(angle) * (radius + 20);
      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 11px Plus Jakarta Sans';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(labels[i], labelX, labelY);
    }

    // User values
    const values = [
      ATHLETIX_DATA.currentUser.skillRadar.speed,
      ATHLETIX_DATA.currentUser.skillRadar.stamina,
      ATHLETIX_DATA.currentUser.skillRadar.technique,
      ATHLETIX_DATA.currentUser.skillRadar.teamwork,
      ATHLETIX_DATA.currentUser.skillRadar.power
    ];

    // Draw user shape
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const r = (radius * (values[i] / 100));
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 229, 255, 0.35)';
    ctx.fill();
    ctx.strokeStyle = '#00E5FF';
    ctx.lineWidth = 2.5;
    ctx.stroke();
  },

  openEditModal() {
    const modal = document.getElementById('editProfileModal');
    if (!modal) return;

    document.getElementById('editBioInput').value = ATHLETIX_DATA.currentUser.bio;
    document.getElementById('editCityInput').value = ATHLETIX_DATA.currentUser.city;

    modal.classList.add('active');
  },

  saveProfileChanges() {
    const bio = document.getElementById('editBioInput')?.value;
    const city = document.getElementById('editCityInput')?.value;

    if (bio) ATHLETIX_DATA.currentUser.bio = bio;
    if (city) ATHLETIX_DATA.currentUser.city = city;

    const modal = document.getElementById('editProfileModal');
    if (modal) modal.classList.remove('active');

    this.renderProfileData();
    App.showToast('✅ Profile updated successfully!', 'success');
  }
};
