// ===== Tripova Contact Page Script =====

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile Hamburger Menu (built dynamically, matches about.html) ---------- */
  const hamburger = document.getElementById('hamburger');
  const header = document.getElementById('main-header');

  if (hamburger && header) {
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
      <a href="index.html">Home</a>
      <a href="destinations.html">Destinations</a>
      <a href="flights.html">Flights</a>
      <a href="hotels.html">Hotels</a>
      <a href="about.html">About</a>
      <a href="contact.html" class="active">Contact</a>
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

    // Wire up mobile login/signup buttons (added after creation)
    mobileNav.querySelector('#mobileLoginBtn')?.addEventListener('click', () => {
      showToast('Login page coming soon!', 'success');
    });
    mobileNav.querySelector('#mobileSignupBtn')?.addEventListener('click', () => {
      showToast('Sign up page coming soon!', 'success');
    });
  }

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other open items (accordion behavior)
      faqItems.forEach(other => other.classList.remove('active'));

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value;
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email) {
        showToast('Please fill in your name and email.', 'error');
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate successful submission (no backend wired up yet)
      console.log('Contact form submitted:', { name, email, subject, message });

      showToast(`Thanks, ${name}! Your message has been sent.`, 'success');
      contactForm.reset();
    });
  }

  /* ---------- Back to Top Button ---------- */
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Desktop Login / Signup Buttons ---------- */
  document.getElementById('loginBtn')?.addEventListener('click', () => {
    showToast('Login page coming soon!', 'success');
  });
  document.getElementById('signupBtn')?.addEventListener('click', () => {
    showToast('Sign up page coming soon!', 'success');
  });

  /* ---------- Toast Notification Helper ---------- */
  function showToast(text, type = 'success') {
    // Remove any existing toast first
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-circle-check' : 'fas fa-circle-exclamation';

    const span = document.createElement('span');
    span.textContent = text;

    toast.appendChild(icon);
    toast.appendChild(span);
    document.body.appendChild(toast);

    // Trigger show animation
    requestAnimationFrame(() => toast.classList.add('show'));

    // Auto-remove after 3.5s
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

});