
    // Mobile menu functionality
    document.addEventListener('DOMContentLoaded', () => {
        const hamburger = document.getElementById('hamburger');
        const header = document.getElementById('main-header');
        
        if (hamburger) {
            const mobileNav = document.createElement('div');
            mobileNav.className = 'mobile-nav';
            mobileNav.innerHTML = `
                <a href="index.html">Home</a>
                <a href="destinations.html">Destinations</a>
                <a href="flights.html">Flights</a>
                <a href="hotels.html">Hotels</a>
                <a href="about.html" class="active">About</a>
                <a href="contact.html">Contact</a>
                <div class="mobile-buttons">
                    <button class="login" id="mobileLoginBtn">Log In</button>
                    <button class="signup" id="mobileSignupBtn">Sign Up</button>
                </div>
            `;
            header.insertAdjacentElement('afterend', mobileNav);
            
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('open');
                mobileNav.classList.toggle('open');
                document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
            });
            
            mobileNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('open');
                    mobileNav.classList.remove('open');
                    document.body.style.overflow = '';
                });
            });
        }
        
        // Scroll shadow on header
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 10);
        });
        
        // Simple toast for auth buttons demo
        function showMessage(msg) {
            const toast = document.createElement('div');
            toast.style.cssText = 'position:fixed; bottom:30px; right:30px; background:#059669; color:white; padding:14px 24px; border-radius:999px; z-index:3000; box-shadow:0 10px 25px rgba(0,0,0,0.2);';
            toast.innerText = msg;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }
        
        document.getElementById('loginBtn')?.addEventListener('click', () => showMessage('🔐 Login modal would open here (integrated with main site)'));
        document.getElementById('signupBtn')?.addEventListener('click', () => showMessage('📝 Sign up modal would open here'));
    });
