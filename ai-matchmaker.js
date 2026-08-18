/**
 * ATHLETIX AI Team Matchmaker & Recommendation Engine
 * Real-time player compatibility calculation, balanced squad synthesis,
 * and radar chart skill visualizer.
 */

const AIMatchmaker = {
  currentSport: 'football',
  currentSkill: 'intermediate',
  currentRole: 'striker',

  // Mock player pool for AI squad synthesis
  playerPool: [
    { name: 'Karan Kapoor', role: 'Striker / Finisher', score: 96, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', tier: 'Diamond Tier 9', stamina: 88, pace: 94 },
    { name: 'Vikram Mehta', role: 'CAM / Playmaker', score: 94, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', tier: 'Pro Tier 8', stamina: 92, pace: 89 },
    { name: 'Liam Gallagher', role: 'Center Back / Anchor', score: 91, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', tier: 'Elite Tier 8', stamina: 90, pace: 84 },
    { name: 'Rhea Sen', role: 'Wing Back / High Press', score: 93, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', tier: 'Diamond Tier 9', stamina: 96, pace: 92 },
    { name: 'David Miller', role: 'Goalkeeper / Sweeper', score: 89, avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80', tier: 'Gold Tier 7', stamina: 85, pace: 80 }
  ],

  init() {
    this.bindEvents();
    this.renderSquad();
    this.drawSkillRadar();
  },

  bindEvents() {
    // Sport selector in AI widget
    const sportSelect = document.getElementById('aiSportSelect');
    if (sportSelect) {
      sportSelect.addEventListener('change', (e) => {
        this.currentSport = e.target.value;
        this.synthesizeNewSquad();
      });
    }

    // Skill tier radio / select
    const skillSelect = document.getElementById('aiSkillSelect');
    if (skillSelect) {
      skillSelect.addEventListener('change', (e) => {
        this.currentSkill = e.target.value;
        this.synthesizeNewSquad();
      });
    }

    // Refresh Squad Button
    const refreshBtn = document.getElementById('btnRefreshAISquad');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => this.synthesizeNewSquad());
    }

    // Invite Squad Button
    const inviteBtn = document.getElementById('btnInviteAISquad');
    if (inviteBtn) {
      inviteBtn.addEventListener('click', () => {
        App.showToast('🚀 Team Invitations & Match Room Created!', 'success');
      });
    }
  },

  synthesizeNewSquad() {
    // Randomize compatibility metrics slightly for interactive feel
    const matchScore = Math.floor(92 + Math.random() * 7);
    const balanceScore = Math.floor(88 + Math.random() * 10);
    const chemScore = Math.floor(90 + Math.random() * 8);

    const matchEl = document.getElementById('aiMetricMatchScore');
    const balanceEl = document.getElementById('aiMetricBalanceScore');
    const chemEl = document.getElementById('aiMetricChemScore');

    if (matchEl) matchEl.textContent = `${matchScore}%`;
    if (balanceEl) balanceEl.textContent = `${balanceScore}%`;
    if (chemEl) chemEl.textContent = `${chemScore}%`;

    // Shuffle and pick roles
    this.renderSquad();
    this.drawSkillRadar();
    App.showToast('⚡ AI recalculated squad balance & synergy!', 'info');
  },

  renderSquad() {
    const listContainer = document.getElementById('aiSquadRosterList');
    if (!listContainer) return;

    // Render roster cards
    listContainer.innerHTML = this.playerPool.map(player => `
      <div class="squad-member-row">
        <div class="member-info">
          <img src="${player.avatar}" alt="${player.name}" class="member-avatar">
          <div>
            <div class="member-name">${player.name}</div>
            <div class="member-role">${player.role} • ${player.tier}</div>
          </div>
        </div>
        <div class="member-score">
          <span style="font-size:0.75rem; color:var(--text-muted); display:block;">SYNERGY</span>
          ${player.score}%
        </div>
      </div>
    `).join('');
  },

  drawSkillRadar() {
    const canvas = document.getElementById('aiRadarCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 80;

    ctx.clearRect(0, 0, width, height);

    const labels = ['Pace', 'Stamina', 'Technique', 'Teamwork', 'Tactics'];
    const count = labels.length;
    const angleStep = (Math.PI * 2) / count;

    // Draw background concentric polygons
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
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

      // Draw Labels
      const labelX = centerX + Math.cos(angle) * (radius + 18);
      const labelY = centerY + Math.sin(angle) * (radius + 18);
      ctx.fillStyle = '#94A3B8';
      ctx.font = '10px Plus Jakarta Sans';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(labels[i], labelX, labelY);
    }

    // Dynamic squad stats (80-98)
    const stats = [
      88 + Math.random() * 10,
      92 + Math.random() * 6,
      86 + Math.random() * 12,
      94 + Math.random() * 5,
      90 + Math.random() * 8
    ];

    // Draw filled radar polygon
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const r = (radius * (stats[i] / 100));
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 200, 83, 0.35)';
    ctx.fill();
    ctx.strokeStyle = '#00E676';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
};
