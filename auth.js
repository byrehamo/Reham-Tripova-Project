const TripovaAuth = (function () {
    const STORAGE_KEY = 'tripova_user';

    function getUser() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    function setUser(user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }

    function clearUser() {
        localStorage.removeItem(STORAGE_KEY);
    }

    function isLoggedIn() {
        return !!getUser();
    }

    function showToast(msg, bg) {
        const existing = document.querySelectorAll('.toast');
        existing.forEach(t => t.remove());
        const toast = document.createElement('div');
        toast.className = `toast ${bg === '#dc2626' ? 'error' : (bg === '#0a1f6e' ? 'info' : 'success')}`;
        toast.innerHTML = `<i class="fa-solid ${bg === '#dc2626' ? 'fa-circle-exclamation' : 'fa-circle-check'}"></i> ${msg}`;
        toast.style.background = bg;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
    }

    function openModal(content) {
        document.querySelectorAll('.modal').forEach(m => m.remove());
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `<div class="modal-content"><button class="close-modal-btn">&times;</button>${content}</div>`;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        setTimeout(() => modal.classList.add('open'), 10);
        const close = () => {
            modal.classList.remove('open');
            setTimeout(() => { modal.remove(); document.body.style.overflow = ''; }, 200);
        };
        modal.querySelector('.close-modal-btn').onclick = close;
        modal.onclick = (e) => { if (e.target === modal) close(); };
        return { modal, close };
    }

    function showLoginModal() {
        const html = `
            <h2 style="color:#0a1f6e; margin-bottom:8px;"><i class="fa-solid fa-right-to-bracket"></i> Log In</h2>
            <p style="color:#6b7280; margin-bottom:20px;">Welcome back to Tripova</p>
            <input type="text" id="authName" placeholder="Full Name" style="width:100%; padding:12px; margin:10px 0; border:1.5px solid #e5e7eb; border-radius:12px; box-sizing:border-box;">
            <input type="email" id="authEmail" placeholder="Email Address" style="width:100%; padding:12px; margin:10px 0; border:1.5px solid #e5e7eb; border-radius:12px; box-sizing:border-box;">
            <button class="confirm-booking-btn" id="authSubmitBtn">Log In</button>
            <p style="text-align:center; margin-top:14px; color:#6b7280;">Don't have an account? <a href="#" id="switchToSignup" style="color:#ff6b35; font-weight:600;">Sign Up</a></p>
        `;
        const { modal, close } = openModal(html);
        modal.querySelector('#authSubmitBtn').onclick = () => {
            const name = modal.querySelector('#authName').value.trim();
            const email = modal.querySelector('#authEmail').value.trim();
            if (!name || !email) { showToast('Please enter your name and email', '#dc2626'); return; }
            if (!email.includes('@')) { showToast('Valid email required', '#dc2626'); return; }
            setUser({ name, email });
            close();
            showToast(`Welcome back, ${name.split(' ')[0]}!`, '#059669');
            renderAuthUI();
        };
        modal.querySelector('#switchToSignup').onclick = (e) => {
            e.preventDefault();
            close();
            setTimeout(showSignupModal, 220);
        };
    }

    function showSignupModal() {
        const html = `
            <h2 style="color:#0a1f6e; margin-bottom:8px;"><i class="fa-solid fa-user-plus"></i> Sign Up</h2>
            <p style="color:#6b7280; margin-bottom:20px;">Create your Tripova account</p>
            <input type="text" id="authName" placeholder="Full Name" style="width:100%; padding:12px; margin:10px 0; border:1.5px solid #e5e7eb; border-radius:12px; box-sizing:border-box;">
            <input type="email" id="authEmail" placeholder="Email Address" style="width:100%; padding:12px; margin:10px 0; border:1.5px solid #e5e7eb; border-radius:12px; box-sizing:border-box;">
            <button class="confirm-booking-btn" id="authSubmitBtn">Create Account</button>
            <p style="text-align:center; margin-top:14px; color:#6b7280;">Already have an account? <a href="#" id="switchToLogin" style="color:#ff6b35; font-weight:600;">Log In</a></p>
        `;
        const { modal, close } = openModal(html);
        modal.querySelector('#authSubmitBtn').onclick = () => {
            const name = modal.querySelector('#authName').value.trim();
            const email = modal.querySelector('#authEmail').value.trim();
            if (!name || !email) { showToast('Please enter your name and email', '#dc2626'); return; }
            if (!email.includes('@')) { showToast('Valid email required', '#dc2626'); return; }
            setUser({ name, email });
            close();
            showToast(`Account created! Welcome, ${name.split(' ')[0]}!`, '#059669');
            renderAuthUI();
        };
        modal.querySelector('#switchToLogin').onclick = (e) => {
            e.preventDefault();
            close();
            setTimeout(showLoginModal, 220);
        };
    }

    function logout() {
        clearUser();
        showToast('You have been logged out', '#0a1f6e');
        renderAuthUI();
    }

    // Replaces the Log In / Sign Up buttons with a user pill + logout,
    // or restores the original buttons if logged out.
    function renderAuthUI() {
        const user = getUser();

        document.querySelectorAll('.buttons, .mobile-buttons').forEach(container => {
            const isMobile = container.classList.contains('mobile-buttons');

            if (user) {
                container.innerHTML = `
                    <div class="user-pill" style="display:flex; align-items:center; gap:10px;">
                        <span class="user-pill-name" style="display:flex; align-items:center; gap:6px; font-weight:600; color:#0a1f6e;">
                            <i class="fa-solid fa-circle-user" style="font-size:18px;"></i> ${user.name.split(' ')[0]}
                        </span>
                        <button class="logout-btn" style="background:transparent; border:1.5px solid #e5e7eb; border-radius:10px; padding:8px 14px; cursor:pointer; font-weight:600; color:#374151;">Log Out</button>
                    </div>
                `;
                container.querySelector('.logout-btn').onclick = () => {
                    if (isMobile) {
                        const mobileNav = document.querySelector('.mobile-nav');
                        const hamburger = document.getElementById('hamburger');
                        if (mobileNav) mobileNav.classList.remove('open');
                        if (hamburger) hamburger.classList.remove('open');
                        document.body.style.overflow = '';
                    }
                    logout();
                };
            } else {
                if (isMobile) {
                    container.innerHTML = `
                        <button class="login" id="mobileLoginBtn">Log In</button>
                        <button class="signup" id="mobileSignupBtn">Sign Up</button>
                    `;
                } else {
                    container.innerHTML = `
                        <button class="login" id="loginBtn">Log In</button>
                        <button class="signup" id="signupBtn">Sign Up</button>
                    `;
                }
            }

            container.classList.add('auth-ready');
        });

        attachAuthButtonListeners();
    }

    function attachAuthButtonListeners() {
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const mobileLoginBtn = document.getElementById('mobileLoginBtn');
        const mobileSignupBtn = document.getElementById('mobileSignupBtn');

        if (loginBtn) loginBtn.onclick = showLoginModal;
        if (signupBtn) signupBtn.onclick = showSignupModal;

        if (mobileLoginBtn) {
            mobileLoginBtn.onclick = () => {
                const mobileNav = document.querySelector('.mobile-nav');
                const hamburger = document.getElementById('hamburger');
                if (mobileNav) mobileNav.classList.remove('open');
                if (hamburger) hamburger.classList.remove('open');
                document.body.style.overflow = '';
                showLoginModal();
            };
        }
        if (mobileSignupBtn) {
            mobileSignupBtn.onclick = () => {
                const mobileNav = document.querySelector('.mobile-nav');
                const hamburger = document.getElementById('hamburger');
                if (mobileNav) mobileNav.classList.remove('open');
                if (hamburger) hamburger.classList.remove('open');
                document.body.style.overflow = '';
                showSignupModal();
            };
        }
    }

    // Run as early as possible for the desktop ".buttons" (present in raw HTML),
    // so there is no flash of the wrong state.
    function init() {
        renderAuthUI();

        // The mobile nav (".mobile-buttons") is injected dynamically by
        // booking.js/flight.js, possibly after this script runs. Watch for
        // it and render immediately the moment it appears, instead of
        // guessing with a delay (which still flashes before the user-pill).
        const observer = new MutationObserver(() => {
            const mobileButtons = document.querySelector('.mobile-buttons');
            if (mobileButtons && !mobileButtons.classList.contains('auth-ready')) {
                renderAuthUI();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return {
        getUser,
        isLoggedIn,
        logout,
        showLoginModal,
        showSignupModal,
        renderAuthUI
    };
    
})();