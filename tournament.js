/**
 * ATHLETIX Tournament Management Engine
 * Handles live countdown timers, bracket visualization, status tab filtering,
 * team registration modal, and gold/silver/bronze leaderboards.
 */

const TournamentEngine = {
  currentTab: 'all', // 'all', 'live', 'upcoming', 'completed'
  currentSport: 'all',
  activeTournament: null,

  init() {
    this.bindEvents();
    this.renderTournaments();
    this.startLiveTimers();
  },

  bindEvents() {
    // Status tab filtering
    document.addEventListener('click', (e) => {
      const tabBtn = e.target.closest('.tournament-tab-btn');
      if (tabBtn) {
        document.querySelectorAll('.tournament-tab-btn').forEach(b => b.classList.remove('active'));
        tabBtn.classList.add('active');
        this.currentTab = tabBtn.getAttribute('data-tab');
        this.renderTournaments();
      }

      // View tournament details
      const detailsBtn = e.target.closest('[data-view-tournament]');
      if (detailsBtn) {
        const tourId = detailsBtn.getAttribute('data-view-tournament');
        this.openTournamentDetails(tourId);
      }

      // Register team trigger
      const registerBtn = e.target.closest('[data-register-tournament]');
      if (registerBtn) {
        const tourId = registerBtn.getAttribute('data-register-tournament');
        this.openTournamentRegistration(tourId);
      }
    });

    // Sport filter
    const sportFilter = document.getElementById('tournamentSportFilter');
    if (sportFilter) {
      sportFilter.addEventListener('change', (e) => {
        this.currentSport = e.target.value;
        this.renderTournaments();
      });
    }

    // Submit team registration form
    const submitRegBtn = document.getElementById('btnSubmitTournamentReg');
    if (submitRegBtn) {
      submitRegBtn.addEventListener('click', () => this.processRegistration());
    }
  },

  renderTournaments() {
    const grid = document.getElementById('tournamentsGrid');
    if (!grid) return;

    let list = ATHLETIX_DATA.tournaments;

    if (this.currentTab !== 'all') {
      list = list.filter(t => t.status === this.currentTab);
    }

    if (this.currentSport !== 'all') {
      list = list.filter(t => t.sport === this.currentSport);
    }

    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding: 4rem 1rem;">
          <div style="font-size:3rem; margin-bottom:1rem;">🏆</div>
          <h3>No tournaments found in this category</h3>
          <p>Try clearing your filters or check back for upcoming championships.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = list.map(t => {
      const statusBadge = t.status === 'live'
        ? '<span class="badge badge-live">● LIVE NOW</span>'
        : t.status === 'upcoming'
        ? '<span class="badge badge-cyan">Upcoming</span>'
        : '<span class="badge badge-gold">Completed</span>';

      return `
        <div class="tournament-card">
          <div class="tournament-banner-box">
            <img src="${t.banner}" alt="${t.title}" class="tournament-banner-img">
            <div style="position:absolute; top:1rem; left:1rem;">${statusBadge}</div>
            <div class="tournament-prize-tag">Prize: ${t.prizePool}</div>
          </div>
          <div class="tournament-body">
            <div style="font-size:0.78rem; color:var(--emerald-neon); font-weight:700; text-transform:uppercase; margin-bottom:0.3rem;">
              ${t.sportName} • ${t.format}
            </div>
            <h3 style="font-size:1.25rem; margin-bottom:0.6rem;">${t.title}</h3>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
              📍 ${t.location}
            </p>
            
            <div class="countdown-timer-box" data-target-date="${t.targetDate}">
              <div class="countdown-unit">
                <span class="countdown-num timer-days">02</span>
                <span class="countdown-lbl">Days</span>
              </div>
              <div class="countdown-unit">
                <span class="countdown-num timer-hours">14</span>
                <span class="countdown-lbl">Hours</span>
              </div>
              <div class="countdown-unit">
                <span class="countdown-num timer-mins">35</span>
                <span class="countdown-lbl">Mins</span>
              </div>
              <div class="countdown-unit">
                <span class="countdown-num timer-secs">42</span>
                <span class="countdown-lbl">Secs</span>
              </div>
            </div>

            <div style="display:flex; justify-content:space-between; font-size:0.82rem; margin-bottom:0.6rem;">
              <span>Teams Registered: <b style="color:var(--text-white);">${t.registeredTeams}/${t.maxTeams}</b></span>
              <span style="color:var(--emerald-neon); font-weight:600;">${Math.round((t.registeredTeams/t.maxTeams)*100)}% Full</span>
            </div>
            <div style="width:100%; height:6px; background:var(--bg-surface); border-radius:3px; overflow:hidden; margin-bottom:1.5rem;">
              <div style="width:${(t.registeredTeams/t.maxTeams)*100}%; height:100%; background:linear-gradient(90deg, var(--emerald), var(--cyan));"></div>
            </div>

            <div style="display:flex; gap:0.75rem;">
              <button class="btn btn-primary" style="flex:1;" data-register-tournament="${t.id}">
                ${t.status === 'completed' ? 'View Results' : 'Join Now'}
              </button>
              <button class="btn btn-secondary" data-view-tournament="${t.id}">
                Details
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  startLiveTimers() {
    setInterval(() => {
      document.querySelectorAll('.countdown-timer-box').forEach(timer => {
        const targetStr = timer.getAttribute('data-target-date');
        if (!targetStr) return;

        const target = new Date(targetStr).getTime();
        const now = new Date().getTime();
        let diff = target - now;

        if (diff < 0) diff = 0;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        const dEl = timer.querySelector('.timer-days');
        const hEl = timer.querySelector('.timer-hours');
        const mEl = timer.querySelector('.timer-mins');
        const sEl = timer.querySelector('.timer-secs');

        if (dEl) dEl.textContent = String(days).padStart(2, '0');
        if (hEl) hEl.textContent = String(hours).padStart(2, '0');
        if (mEl) mEl.textContent = String(mins).padStart(2, '0');
        if (sEl) sEl.textContent = String(secs).padStart(2, '0');
      });
    }, 1000);
  },

  openTournamentDetails(tourId) {
    const tour = ATHLETIX_DATA.tournaments.find(t => t.id === tourId) || ATHLETIX_DATA.tournaments[0];
    this.activeTournament = tour;

    const modal = document.getElementById('tournamentDetailsModal');
    if (!modal) return;

    document.getElementById('tourDetailsTitle').textContent = tour.title;
    document.getElementById('tourDetailsPrize').textContent = tour.prizePool;
    document.getElementById('tourDetailsVenue').textContent = tour.location;
    document.getElementById('tourDetailsRules').textContent = tour.rules;
    document.getElementById('tourDetailsOrganizer').textContent = tour.organizer;
    document.getElementById('tourDetailsFormat').textContent = tour.format;

    // Render Bracket Tree
    const bracketBox = document.getElementById('tourBracketTree');
    if (bracketBox) {
      if (tour.bracket) {
        bracketBox.innerHTML = `
          <div class="bracket-tree">
            <div>
              <div class="bracket-column-title">Quarter Finals</div>
              ${tour.bracket.quarterFinals.map(m => `
                <div class="match-box">
                  <div class="match-team-row ${m.scoreA > m.scoreB ? 'winner' : ''}">
                    <span>${m.teamA}</span>
                    <span class="match-score">${m.scoreA !== null ? m.scoreA : '-'}</span>
                  </div>
                  <div class="match-team-row ${m.scoreB > m.scoreA ? 'winner' : ''}">
                    <span>${m.teamB}</span>
                    <span class="match-score">${m.scoreB !== null ? m.scoreB : '-'}</span>
                  </div>
                </div>
              `).join('')}
            </div>
            <div>
              <div class="bracket-column-title">Semi Finals</div>
              ${tour.bracket.semiFinals.map(m => `
                <div class="match-box">
                  <div class="match-team-row">
                    <span>${m.teamA}</span>
                    <span class="match-score">${m.scoreA !== null ? m.scoreA : '-'}</span>
                  </div>
                  <div class="match-team-row">
                    <span>${m.teamB}</span>
                    <span class="match-score">${m.scoreB !== null ? m.scoreB : '-'}</span>
                  </div>
                </div>
              `).join('')}
            </div>
            <div>
              <div class="bracket-column-title">Finals 🏆</div>
              <div class="match-box" style="border-color:var(--gold); box-shadow:0 0 15px rgba(255,214,0,0.2);">
                <div class="match-team-row">
                  <span>${tour.bracket.finals[0].teamA}</span>
                  <span class="match-score">-</span>
                </div>
                <div class="match-team-row">
                  <span>${tour.bracket.finals[0].teamB}</span>
                  <span class="match-score">-</span>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        bracketBox.innerHTML = `
          <div style="text-align:center; padding:2rem; color:var(--text-muted);">
            Bracket pairings will be published once group stage registrations lock.
          </div>
        `;
      }
    }

    modal.classList.add('active');
  },

  openTournamentRegistration(tourId) {
    const tour = ATHLETIX_DATA.tournaments.find(t => t.id === tourId) || ATHLETIX_DATA.tournaments[0];
    this.activeTournament = tour;

    const modal = document.getElementById('tournamentRegisterModal');
    if (!modal) return;

    document.getElementById('tourRegTitle').textContent = tour.title;
    document.getElementById('tourRegFee').textContent = tour.entryFee;

    modal.classList.add('active');
  },

  processRegistration() {
    const teamName = document.getElementById('regTeamName')?.value;
    if (!teamName) {
      App.showToast('Please enter your team name', 'warning');
      return;
    }

    const modal = document.getElementById('tournamentRegisterModal');
    if (modal) modal.classList.remove('active');

    App.showToast(`🔥 Team "${teamName}" registered for ${this.activeTournament.title}! Captain bracket link sent.`, 'success');
  }
};
