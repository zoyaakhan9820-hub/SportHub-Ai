/**
 * ATHLETIX Booking Engine
 * Handles facility slot selection, date picking, add-on calculations,
 * coach 1-on-1 scheduling, checkout and digital match ticket QR generation.
 */

const BookingEngine = {
  activeFacility: null,
  selectedSlot: null,
  selectedDate: null,
  selectedCourt: null,
  selectedAddons: [],

  init() {
    this.bindEvents();
  },

  bindEvents() {
    // Global booking modal triggers
    document.addEventListener('click', (e) => {
      const bookBtn = e.target.closest('[data-book-facility]');
      if (bookBtn) {
        const facilityId = bookBtn.getAttribute('data-book-facility');
        this.openFacilityBookingModal(facilityId);
      }

      const bookCoachBtn = e.target.closest('[data-book-coach]');
      if (bookCoachBtn) {
        const coachId = bookCoachBtn.getAttribute('data-book-coach');
        this.openCoachBookingModal(coachId);
      }

      const slotBtn = e.target.closest('.time-slot-btn.available');
      if (slotBtn) {
        document.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
        slotBtn.classList.add('selected');
        this.selectedSlot = slotBtn.getAttribute('data-slot-time');
        this.updatePriceSummary();
      }

      const addonCheckbox = e.target.closest('.booking-addon-checkbox');
      if (addonCheckbox) {
        this.updatePriceSummary();
      }
    });

    // Booking form submit
    const confirmBookingBtn = document.getElementById('btnConfirmFacilityBooking');
    if (confirmBookingBtn) {
      confirmBookingBtn.addEventListener('click', () => this.processBooking());
    }

    const confirmCoachBtn = document.getElementById('btnConfirmCoachBooking');
    if (confirmCoachBtn) {
      confirmCoachBtn.addEventListener('click', () => this.processCoachBooking());
    }
  },

  openFacilityBookingModal(facilityId) {
    const facility = ATHLETIX_DATA.facilities.find(f => f.id === facilityId) || ATHLETIX_DATA.facilities[0];
    this.activeFacility = facility;
    this.selectedSlot = '08:00 PM - 09:00 PM';
    this.selectedDate = new Date().toISOString().split('T')[0];
    this.selectedCourt = facility.courtTypes[0];

    const modal = document.getElementById('facilityBookingModal');
    if (!modal) return;

    // Fill Modal Data
    document.getElementById('bookingFacilityName').textContent = facility.name;
    document.getElementById('bookingFacilityLocation').textContent = facility.location;
    document.getElementById('bookingFacilityPrice').textContent = `₹${facility.pricePerHour}/hr`;

    // Populate Court Types
    const courtSelect = document.getElementById('bookingCourtSelect');
    if (courtSelect) {
      courtSelect.innerHTML = facility.courtTypes.map(c => `<option value="${c}">${c}</option>`).join('');
    }

    // Set Date input min value to today
    const dateInput = document.getElementById('bookingDateInput');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
    }

    // Render Slots Matrix
    this.renderSlotMatrix();
    this.updatePriceSummary();

    // Show modal
    modal.classList.add('active');
  },

  renderSlotMatrix() {
    const matrixContainer = document.getElementById('slotMatrixContainer');
    if (!matrixContainer) return;

    const slots = [
      { time: '06:00 AM - 07:00 AM', status: 'available' },
      { time: '07:00 AM - 08:00 AM', status: 'booked' },
      { time: '08:00 AM - 09:00 AM', status: 'available' },
      { time: '05:00 PM - 06:00 PM', status: 'available' },
      { time: '06:00 PM - 07:00 PM', status: 'booked' },
      { time: '07:00 PM - 08:00 PM', status: 'available' },
      { time: '08:00 PM - 09:00 PM', status: 'available', default: true },
      { time: '09:00 PM - 10:00 PM', status: 'available' }
    ];

    matrixContainer.innerHTML = slots.map(s => `
      <div class="time-slot-btn ${s.status} ${s.default ? 'selected' : ''}" data-slot-time="${s.time}">
        <span class="slot-time">${s.time.split(' - ')[0]}</span>
        <span class="slot-status">${s.status === 'booked' ? 'Booked' : 'Available'}</span>
      </div>
    `).join('');
  },

  updatePriceSummary() {
    if (!this.activeFacility) return;

    const basePrice = this.activeFacility.pricePerHour;
    let addonsTotal = 0;

    const selectedAddonInputs = document.querySelectorAll('.booking-addon-checkbox:checked');
    selectedAddonInputs.forEach(input => {
      addonsTotal += parseFloat(input.value || 0);
    });

    const tax = Math.round((basePrice + addonsTotal) * 0.08 * 100) / 100;
    const grandTotal = basePrice + addonsTotal + tax;

    const baseEl = document.getElementById('summaryBasePrice');
    const addonsEl = document.getElementById('summaryAddonsPrice');
    const taxEl = document.getElementById('summaryTaxPrice');
    const totalEl = document.getElementById('summaryTotalPrice');

    if (baseEl) baseEl.textContent = `₹${basePrice.toFixed(2)}`;
    if (addonsEl) addonsEl.textContent = `₹${addonsTotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `₹${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `₹${grandTotal.toFixed(2)}`;
  },

  processBooking() {
    if (!this.selectedSlot) {
      App.showToast('Please select an available time slot', 'warning');
      return;
    }

    const modal = document.getElementById('facilityBookingModal');
    if (modal) modal.classList.remove('active');

    // Generate Ticket Modal
    const ticketModal = document.getElementById('bookingTicketModal');
    if (ticketModal) {
      const ticketId = 'ATH-' + Math.floor(100000 + Math.random() * 900000);
      document.getElementById('ticketFacilityName').textContent = this.activeFacility.name;
      document.getElementById('ticketSlotTime').textContent = this.selectedSlot;
      document.getElementById('ticketCourtType').textContent = document.getElementById('bookingCourtSelect')?.value || this.activeFacility.courtTypes[0];
      document.getElementById('ticketIdCode').textContent = ticketId;

      ticketModal.classList.add('active');
    }

    // Trigger Success Toast
    App.showToast(`🎉 Booking Confirmed at ${this.activeFacility.name}!`, 'success');
  },

  openCoachBookingModal(coachId) {
    const coach = ATHLETIX_DATA.coaches.find(c => c.id === coachId) || ATHLETIX_DATA.coaches[0];
    const modal = document.getElementById('coachBookingModal');
    if (!modal) return;

    document.getElementById('coachModalName').textContent = coach.name;
    document.getElementById('coachModalTitle').textContent = coach.title;
    document.getElementById('coachModalPrice').textContent = `₹${coach.hourlyRate}/session`;
    document.getElementById('coachModalAvatar').src = coach.avatar;

    const programsSelect = document.getElementById('coachProgramSelect');
    if (programsSelect) {
      programsSelect.innerHTML = coach.programs.map(p => `<option value="${p.name}">${p.name} (${p.duration} - ${p.price})</option>`).join('');
    }

    modal.classList.add('active');
  },
  

  processCoachBooking() {
    const modal = document.getElementById('coachBookingModal');
    if (modal) modal.classList.remove('active');
    App.showToast('🏆 Coaching session request sent! Coach will confirm within 1 hour.', 'success');
  }
};
