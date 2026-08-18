/**
 * ATHLETIX Admin Operations & Analytics Engine
 * Real-time KPI summaries, dynamic canvas charts for revenue & sport distributions,
 * and live facility/booking management tables.
 */

const AdminDashboard = {
  init() {
    this.bindEvents();
    this.renderKPIs();
    this.renderBookingsTable();
    this.drawRevenueChart();
    this.drawSportsDonutChart();
  },

  bindEvents() {
    // Admin table search
    const tableSearch = document.getElementById('adminTableSearch');
    if (tableSearch) {
      tableSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        this.filterTable(query);
      });
    }

    // Status action buttons inside table
    document.addEventListener('click', (e) => {
      const approveBtn = e.target.closest('[data-approve-booking]');
      if (approveBtn) {
        const rowId = approveBtn.getAttribute('data-approve-booking');
        this.updateBookingStatus(rowId, 'Confirmed');
      }

      const cancelBtn = e.target.closest('[data-cancel-booking]');
      if (cancelBtn) {
        const rowId = cancelBtn.getAttribute('data-cancel-booking');
        this.updateBookingStatus(rowId, 'Cancelled');
      }
    });
  },

  renderKPIs() {
    const kpis = ATHLETIX_DATA.adminAnalytics.kpis;
    const revEl = document.getElementById('adminKpiRevenue');
    const bookEl = document.getElementById('adminKpiBookings');
    const playEl = document.getElementById('adminKpiPlayers');
    const coachEl = document.getElementById('adminKpiCoaches');

    if (revEl) revEl.textContent = kpis.totalRevenue;
    if (bookEl) bookEl.textContent = kpis.activeBookings;
    if (playEl) playEl.textContent = kpis.registeredPlayers;
    if (coachEl) coachEl.textContent = kpis.verifiedCoaches;
  },

  renderBookingsTable() {
    const tableBody = document.getElementById('adminBookingsTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = ATHLETIX_DATA.adminAnalytics.recentBookingsTable.map(row => {
      const statusBadge = row.status === 'Confirmed'
        ? '<span class="badge badge-emerald">Confirmed</span>'
        : row.status === 'Pending'
        ? '<span class="badge badge-orange">Pending</span>'
        : '<span class="badge badge-cyan">Completed</span>';

      return `
        <tr id="row-${row.id}">
          <td style="font-weight:700; color:var(--cyan);">${row.id}</td>
          <td style="font-weight:600; color:white;">${row.player}</td>
          <td>${row.facility}</td>
          <td><span style="font-size:0.8rem; color:var(--emerald-neon); font-weight:700;">${row.sport}</span></td>
          <td style="font-weight:700; color:white;">${row.amount}</td>
          <td style="color:var(--text-muted); font-size:0.82rem;">${row.date}</td>
          <td class="status-cell">${statusBadge}</td>
          <td>
            <div style="display:flex; gap:0.4rem;">
              <button class="btn btn-sm btn-outline-emerald" style="padding:0.25rem 0.6rem; font-size:0.75rem;" data-approve-booking="${row.id}">✓</button>
              <button class="btn btn-sm btn-secondary" style="padding:0.25rem 0.6rem; font-size:0.75rem; color:var(--rose);" data-cancel-booking="${row.id}">✕</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  filterTable(query) {
    const rows = document.querySelectorAll('#adminBookingsTableBody tr');
    rows.forEach(r => {
      const text = r.textContent.toLowerCase();
      r.style.display = text.includes(query) ? '' : 'none';
    });
  },

  updateBookingStatus(id, newStatus) {
    const row = document.getElementById(`row-${id}`);
    if (!row) return;

    const cell = row.querySelector('.status-cell');
    if (cell) {
      if (newStatus === 'Confirmed') {
        cell.innerHTML = '<span class="badge badge-emerald">Confirmed</span>';
        App.showToast(`Booking ${id} approved & calendar slot locked!`, 'success');
      } else {
        cell.innerHTML = '<span class="badge badge-orange">Cancelled</span>';
        App.showToast(`Booking ${id} cancelled and refund initiated.`, 'info');
      }
    }
  },

  drawRevenueChart() {
    const canvas = document.getElementById('adminRevenueCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const data = ATHLETIX_DATA.adminAnalytics.monthlyRevenue;

    ctx.clearRect(0, 0, width, height);

    const padding = 40;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    const maxVal = 160;
    const stepX = graphWidth / (data.length - 1);

    // Draw Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (graphHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      // Y-axis label ($K)
      ctx.fillStyle = '#64748B';
      ctx.font = '10px Plus Jakarta Sans';
      ctx.textAlign = 'right';
      ctx.fillText(`₹${Math.round(maxVal - (maxVal / 4) * i)}K`, padding - 8, y + 3);
    }

    // Draw Area Gradient
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(0, 200, 83, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 200, 83, 0.0)');

    ctx.beginPath();
    data.forEach((pt, index) => {
      const x = padding + index * stepX;
      const y = height - padding - (pt.revenue / maxVal) * graphHeight;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw Smooth Line
    ctx.beginPath();
    data.forEach((pt, index) => {
      const x = padding + index * stepX;
      const y = height - padding - (pt.revenue / maxVal) * graphHeight;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#00E676';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw Points & Labels
    data.forEach((pt, index) => {
      const x = padding + index * stepX;
      const y = height - padding - (pt.revenue / maxVal) * graphHeight;

      // Outer point
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#0B0F19';
      ctx.fill();
      ctx.strokeStyle = '#00E676';
      ctx.lineWidth = 2;
      ctx.stroke();

      // X-axis label (Month)
      ctx.fillStyle = '#94A3B8';
      ctx.font = '11px Plus Jakarta Sans';
      ctx.textAlign = 'center';
      ctx.fillText(pt.month, x, height - padding + 18);
    });
  },

  drawSportsDonutChart() {
    const canvas = document.getElementById('adminSportsDonutCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const outerRadius = 75;
    const innerRadius = 50;

    ctx.clearRect(0, 0, width, height);

    const data = ATHLETIX_DATA.adminAnalytics.sportsBreakdown;
    let startAngle = -Math.PI / 2;

    data.forEach(item => {
      const sliceAngle = (item.percentage / 100) * (Math.PI * 2);
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
      ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();

      startAngle = endAngle;
    });

    // Center Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px Outfit';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('100%', centerX, centerY - 6);
    ctx.font = '9px Plus Jakarta Sans';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText('Activity', centerX, centerY + 12);
  }
};
