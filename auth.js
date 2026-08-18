/**
 * ATHLETIX Authentication & Multi-Step Onboarding Engine
 * Handles login modal, multi-step role signup wizard, and quick demo profile logins.
 */

const AuthEngine = {
  currentStep: 1,
  selectedRole: 'player',

  init() {
    this.bindEvents();
  },

  bindEvents() {
    // Open Auth Modal
    document.addEventListener('click', (e) => {
      const openAuthBtn = e.target.closest('[data-open-auth]');
      if (openAuthBtn) {
        const mode = openAuthBtn.getAttribute('data-open-auth') || 'login';
        this.openAuthModal(mode);
      }

      // Switch between Login / Signup inside modal
      const switchAuthBtn = e.target.closest('[data-switch-auth]');
      if (switchAuthBtn) {
        const targetMode = switchAuthBtn.getAttribute('data-switch-auth');
        this.switchMode(targetMode);
      }

      // Role selection cards in signup
      const roleCard = e.target.closest('.auth-role-card');
      if (roleCard) {
        document.querySelectorAll('.auth-role-card').forEach(c => c.classList.remove('selected'));
        roleCard.classList.add('selected');
        this.selectedRole = roleCard.getAttribute('data-role');
      }

      // Next / Prev step buttons in multi-step signup
      const nextStepBtn = e.target.closest('#btnSignupNextStep');
      if (nextStepBtn) {
        this.nextStep();
      }

      const prevStepBtn = e.target.closest('#btnSignupPrevStep');
      if (prevStepBtn) {
        this.prevStep();
      }

      // Complete signup button
      const completeSignupBtn = e.target.closest('#btnCompleteSignup');
      if (completeSignupBtn) {
        this.completeSignup();
      }

      // Quick Demo logins
      const demoLoginBtn = e.target.closest('[data-demo-role]');
      if (demoLoginBtn) {
        const role = demoLoginBtn.getAttribute('data-demo-role');
        this.demoLogin(role);
      }
    });

    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.processLogin();
      });
    }
  },

  openAuthModal(mode = 'login') {
    const modal = document.getElementById('authModal');
    if (!modal) return;

    this.switchMode(mode);
    this.currentStep = 1;
    this.updateStepView();
    modal.classList.add('active');
  },

  switchMode(mode) {
    const loginBox = document.getElementById('authLoginSection');
    const signupBox = document.getElementById('authSignupSection');

    if (mode === 'login') {
      if (loginBox) loginBox.style.display = 'block';
      if (signupBox) signupBox.style.display = 'none';
      document.getElementById('authModalTitle').textContent = 'Welcome Back to Athletix';
    } else {
      if (loginBox) loginBox.style.display = 'none';
      if (signupBox) signupBox.style.display = 'block';
      document.getElementById('authModalTitle').textContent = 'Create Athletix Account';
      this.currentStep = 1;
      this.updateStepView();
    }
  },

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
      this.updateStepView();
    }
  },

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateStepView();
    }
  },

  updateStepView() {
    document.querySelectorAll('.signup-step-pane').forEach((pane, idx) => {
      pane.style.display = (idx + 1 === this.currentStep) ? 'block' : 'none';
    });

    // Update Progress Indicator
    document.querySelectorAll('.step-indicator-dot').forEach((dot, idx) => {
      if (idx + 1 <= this.currentStep) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    const prevBtn = document.getElementById('btnSignupPrevStep');
    const nextBtn = document.getElementById('btnSignupNextStep');
    const completeBtn = document.getElementById('btnCompleteSignup');

    if (prevBtn) prevBtn.style.display = this.currentStep > 1 ? 'inline-flex' : 'none';
    if (nextBtn) nextBtn.style.display = this.currentStep < 3 ? 'inline-flex' : 'none';
    if (completeBtn) completeBtn.style.display = this.currentStep === 3 ? 'inline-flex' : 'none';
  },

  completeSignup() {
    const name = document.getElementById('signupNameInput')?.value || 'Alex Athlete';
    const email = document.getElementById('signupEmailInput')?.value || 'alex@athletix.io';

    ATHLETIX_DATA.currentUser.name = name;
    ATHLETIX_DATA.currentUser.role = `${this.selectedRole.toUpperCase()} • Level 1`;

    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('active');

    this.updateUserUI();
    App.showToast(`🎉 Welcome to Athletix, ${name}! Your ${this.selectedRole} profile is ready.`, 'success');
  },

  processLogin() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('active');

    this.updateUserUI();
    App.showToast('✨ Logged in successfully as Zoya Khan!', 'success');
  },

  demoLogin(role) {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('active');

    if (role === 'player') {
      ATHLETIX_DATA.currentUser.name = 'Zoya Khan';
      ATHLETIX_DATA.currentUser.role = 'Diamond Striker • MVP';
      App.showToast('👤 Logged in as Demo Player: Zoya Khan', 'success');
      App.navigateTo('profile');
    } else if (role === 'coach') {
      ATHLETIX_DATA.currentUser.name = 'Coach Marcus Sterling';
      ATHLETIX_DATA.currentUser.role = 'UEFA-A Licensed Pro Coach';
      App.showToast('⚽ Logged in as Demo Coach: Marcus Sterling', 'success');
      App.navigateTo('coaches');
    } else if (role === 'admin') {
      ATHLETIX_DATA.currentUser.name = 'Platform Admin';
      ATHLETIX_DATA.currentUser.role = 'Super Administrator';
      App.showToast('🛡️ Admin Mode Activated: Operations Dashboard', 'info');
      App.navigateTo('admin');
    }

    this.updateUserUI();
  },

  updateUserUI() {
    const nameEls = document.querySelectorAll('.current-user-name');
    nameEls.forEach(el => el.textContent = ATHLETIX_DATA.currentUser.name);

    const roleEls = document.querySelectorAll('.current-user-role');
    roleEls.forEach(el => el.textContent = ATHLETIX_DATA.currentUser.role);
  }
};
