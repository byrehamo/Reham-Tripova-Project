
document.addEventListener('DOMContentLoaded', () => {


    const destinationData = {
        'Phuket': {
            img: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1200&auto=format&fit=crop',
            description: 'Phuket is Thailand\'s largest island and most beloved beach destination. Famous for its powdery white sands, turquoise seas, and energetic nightlife. Explore the iconic Big Buddha, take a boat trip to Phi Phi Islands, or relax with a cocktail watching the sunset from Promthep Cape.',
            location: 'Phuket Province, Southern Thailand',
            rating: '4.9 ★ · 12,500 reviews',
            duration: 'Recommended: 5–7 days',
            tags: ['Beach', 'Island', 'Nightlife', 'Luxury'],
        },
        'Chiang Mai': {
            img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop',
            description: 'Chiang Mai is the cultural heart of Northern Thailand. With over 300 ancient temples, lush mountain terrain, and a vibrant night bazaar, it offers a perfect blend of tradition and adventure. Don\'t miss the Doi Inthanon National Park, ethical elephant sanctuaries, and Thai cooking classes.',
            location: 'Chiang Mai Province, Northern Thailand',
            rating: '4.8 ★ · 9,800 reviews',
            duration: 'Recommended: 4–6 days',
            tags: ['Culture', 'Mountains', 'Temples', 'Nature'],
        },
        'Krabi': {
            img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
            description: 'Krabi is a paradise of soaring limestone karsts, crystal-clear emerald waters, and hidden lagoons. Take a long-tail boat to the car-free Railay Beach, kayak through sea caves, snorkel at the Four Islands, or dip into the natural Emerald Pool hot springs deep in the jungle.',
            location: 'Krabi Province, Southern Thailand',
            rating: '4.9 ★ · 11,200 reviews',
            duration: 'Recommended: 5–7 days',
            tags: ['Beach', 'Diving', 'Rock Climbing', 'Island'],
        },
        'Bangkok': {
            img: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=1200&auto=format&fit=crop',
            description: 'Bangkok is a neon-lit metropolis where ancient temples stand beside rooftop sky bars and luxury malls. Visit the Grand Palace and Wat Pho\'s giant Reclining Buddha, haggle at Chatuchak Weekend Market, or cruise the Chao Phraya River at golden hour. The street food scene alone is worth the trip.',
            location: 'Bangkok, Central Thailand',
            rating: '4.7 ★ · 15,300 reviews',            duration: 'Recommended: 3–5 days',
            tags: ['City', 'Food', 'Shopping', 'Temples'],
        },
        'Pattaya': {
            img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop',
            description: 'Pattaya has transformed into one of Thailand\'s most diverse beach destinations. Families love the Nong Nooch Tropical Garden, Cartoon Network Amazone Water Park, and the stunning Sanctuary of Truth. Water sports enthusiasts can enjoy jet-skiing, parasailing, and diving at Koh Larn island.',
            location: 'Pattaya City, Eastern Thailand',
            rating: '4.6 ★ · 8,400 reviews',
            duration: 'Recommended: 3–4 days',
            tags: ['Beach', 'Family', 'Entertainment', 'Water Sports'],
        },
        'Khao Yai': {
            img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop',
            description: 'Khao Yai is Thailand\'s oldest and most celebrated national park, a UNESCO World Heritage site blanketed in dense jungle. Trek to thundering Haew Narok waterfall, spot wild elephants and hornbills, stroll through boutique vineyards, or sip coffee at mountain cafés with misty valley views below.',
            location: 'Khao Yai, Nakhon Ratchasima Province',
            rating: '4.8 ★ · 7,200 reviews',
            duration: 'Recommended: 2–3 days',
            tags: ['Nature', 'Wildlife', 'Hiking', 'National Park'],
        },
    };


    // -------------------------------------------------------
    // TOAST NOTIFICATION SYSTEM
    // -------------------------------------------------------
    function showToast({ type = 'info', title, message, duration = 4000 }) {
        const icons = { success: 'fa-circle-check', info: 'fa-circle-info', error: 'fa-circle-xmark' };
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fa-solid ${icons[type] || icons.info}"></i>
            <div class="toast-body">
                <h4>${title}</h4>
                ${message ? `<p>${message}</p>` : ''}
            </div>
            <button class="toast-close" aria-label="Dismiss">&times;</button>
        `;
        document.body.appendChild(toast);
        requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
        const remove = () => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove(), { once: true });
        };
        const timer = setTimeout(remove, duration);
        toast.querySelector('.toast-close').addEventListener('click', () => { clearTimeout(timer); remove(); });
    }


    // -------------------------------------------------------
    // HEADER — scroll shadow
    // -------------------------------------------------------
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        header?.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });


    // -------------------------------------------------------
    // HAMBURGER MENU
    // -------------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
        <a href="index.html">Home</a>
        <a href="destinations.html" class="${currentPage === 'destinations.html' ? 'active' : ''}">Destinations</a>
        <a href="flight.html">Flights</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <div class="mobile-buttons">
            <button class="login" id="mobileLoginBtn">Log In</button>
            <button class="signup" id="mobileSignupBtn">Sign Up</button>
        </div>
    `;
    header?.after(mobileNav);

    hamburger?.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('open');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });


    // -------------------------------------------------------
    // SEARCH FUNCTIONALITY
    // -------------------------------------------------------
    const searchInput = document.getElementById('searchInput');
    const searchBtn   = document.getElementById('searchBtn');
    const cards       = document.querySelectorAll('.card');
    const noResults   = document.getElementById('noResults');

    // Pre-fill from URL params (e.g., coming from homepage search)
    const urlParams = new URLSearchParams(window.location.search);
    const qParam    = urlParams.get('q');
    if (qParam && searchInput) {
        searchInput.value = qParam;
        filterCards(qParam);
    }

    function filterCards(term = '') {
        term = term.toLowerCase().trim();
        let count = 0;

        cards.forEach(card => {
            const name     = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const desc     = card.querySelector('p')?.textContent.toLowerCase() || '';
            const location = card.querySelector('.card-location')?.textContent.toLowerCase() || '';
            const category = card.dataset.category || '';

            const match = !term ||
                name.includes(term) ||
                desc.includes(term) ||
                location.includes(term) ||
                category.includes(term);

            card.classList.toggle('hidden', !match);
            if (match) count++;
        });

        if (noResults) noResults.style.display = count === 0 ? 'block' : 'none';
    }

    searchBtn?.addEventListener('click', () => filterCards(searchInput?.value));
    searchInput?.addEventListener('keydown', e => { if (e.key === 'Enter') filterCards(searchInput.value); });
    // Live search with slight debounce
    let debounceTimer;
    searchInput?.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => filterCards(searchInput.value), 300);
    });


    // -------------------------------------------------------
    // CATEGORY FILTER TABS
    // -------------------------------------------------------
    const filterTabs = document.querySelectorAll('.filter-tab');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;
            // Clear text search when filtering by category
            if (searchInput) searchInput.value = '';

            cards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                } else {
                    const cats = (card.dataset.category || '').split(' ');
                    card.classList.toggle('hidden', !cats.includes(filter));
                }
            });

            const visibleCount = [...cards].filter(c => !c.classList.contains('hidden')).length;
            if (noResults) noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        });
    });


    // -------------------------------------------------------
    // DESTINATION MODAL
    // -------------------------------------------------------
    const destModal   = document.getElementById('destModal');
    const closeModal  = document.getElementById('closeModal');
    const modalImg    = document.getElementById('modal-img');
    const modalTitle  = document.getElementById('modal-title');
    const modalDesc   = document.getElementById('modal-description');
    const modalLoc    = document.getElementById('modal-location');
    const modalRating = document.getElementById('modal-rating');
    const modalPrice  = document.getElementById('modal-price');
    const modalDur    = document.getElementById('modal-duration');
    const modalTags   = document.getElementById('modal-tags');

    function openDestModal(destName) {
        const data = destinationData[destName];
        if (!data) return;

        // Populate modal fields
        modalImg.src          = data.img;
        modalImg.alt          = destName;
        modalTitle.textContent = destName;
        modalDesc.textContent  = data.description;
        modalLoc.textContent   = data.location;
        modalRating.textContent = data.rating;
        modalPrice.textContent  = data.price;
        modalDur.textContent    = data.duration;

        // Tags
        if (modalTags) {
            modalTags.innerHTML = (data.tags || [])
                .map(t => `<span class="modal-tag">${t}</span>`)
                .join('');
        }

        destModal?.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Store name for book button
        destModal.dataset.currentDest = destName;
    }

    function closeDestModal() {
        destModal?.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Both "View Details" and "Quick View" buttons open the modal
    document.querySelectorAll('.view-btn, .quick-view-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.stopPropagation();
            openDestModal(btn.dataset.dest);
        });
    });

    closeModal?.addEventListener('click', closeDestModal);
    destModal?.addEventListener('click', e => { if (e.target === destModal) closeDestModal(); });

    // Book Now inside modal
    document.getElementById('bookNowBtn')?.addEventListener('click', () => {
        const name = destModal?.dataset.currentDest || 'this destination';
        closeDestModal();
        showToast({
            type: 'success',
            title: 'Booking Started!',
            message: `Preparing your trip to ${name}…`,
            duration: 4000,
        });
        // In a real app: window.location.href = `booking.html?dest=${encodeURIComponent(name)}`;
    });

    // Close modal with Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeDestModal();
            closeAuthModal();
        }
    });


    // -------------------------------------------------------
    // AUTH MODAL
    // -------------------------------------------------------
    const authModal  = document.getElementById('authModal');
    const loginBtn   = document.getElementById('loginBtn');
    const signupBtn  = document.getElementById('signupBtn');
    const authTabs   = document.querySelectorAll('.auth-tab');
    const authForms  = document.querySelectorAll('.auth-form');

    function openAuth(tab = 'login') {
        authModal?.classList.add('open');
        document.body.style.overflow = 'hidden';
        authTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
        authForms.forEach(f => f.classList.toggle('active', f.id === `${tab}-form`));
    }

    function closeAuthModal() {
        authModal?.classList.remove('open');
        document.body.style.overflow = '';
    }

    loginBtn?.addEventListener('click',  () => openAuth('login'));
    signupBtn?.addEventListener('click', () => openAuth('signup'));

    document.addEventListener('click', e => {
        if (e.target.id === 'mobileLoginBtn')  { mobileNav.classList.remove('open'); hamburger?.classList.remove('open'); document.body.style.overflow = ''; openAuth('login'); }
        if (e.target.id === 'mobileSignupBtn') { mobileNav.classList.remove('open'); hamburger?.classList.remove('open'); document.body.style.overflow = ''; openAuth('signup'); }
    });

    document.getElementById('closeAuth')?.addEventListener('click', closeAuthModal);
    authModal?.addEventListener('click', e => { if (e.target === authModal) closeAuthModal(); });

    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const name = tab.dataset.tab;
            authTabs.forEach(t => t.classList.toggle('active', t === tab));
            authForms.forEach(f => f.classList.toggle('active', f.id === `${name}-form`));
        });
    });

    // Login submission
    document.getElementById('loginSubmit')?.addEventListener('click', e => {
        e.preventDefault();
        const email    = document.getElementById('login-email')?.value.trim();
        const password = document.getElementById('login-password')?.value;
        if (!email || !password) { showToast({ type: 'error', title: 'Missing fields', message: 'Please enter your email and password.' }); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast({ type: 'error', title: 'Invalid email', message: 'Please enter a valid email address.' }); return; }

        const username = email.split('@')[0];
        closeAuthModal();
        showToast({ type: 'success', title: `Welcome back, ${username}!`, message: 'You are now logged in.' });
        if (loginBtn)  { loginBtn.textContent = username; loginBtn.style.cssText = 'background:#059669;color:#fff;border-color:#059669'; }
        if (signupBtn) { signupBtn.style.display = 'none'; }
    });

    // Signup submission
    document.getElementById('signupSubmit')?.addEventListener('click', e => {
        e.preventDefault();
        const name     = document.getElementById('signup-name')?.value.trim();
        const email    = document.getElementById('signup-email')?.value.trim();
        const password = document.getElementById('signup-password')?.value;
        const confirm  = document.getElementById('signup-confirm')?.value;
        if (!name || !email || !password || !confirm) { showToast({ type: 'error', title: 'Missing fields', message: 'Please fill in all fields.' }); return; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast({ type: 'error', title: 'Invalid email', message: 'Please enter a valid email address.' }); return; }
        if (password.length < 6) { showToast({ type: 'error', title: 'Weak password', message: 'Password must be at least 6 characters.' }); return; }
        if (password !== confirm) { showToast({ type: 'error', title: 'Passwords don\'t match', message: 'Please make sure both passwords are the same.' }); return; }

        closeAuthModal();
        showToast({ type: 'success', title: `Welcome, ${name}! 🎉`, message: 'Your account has been created.' });
        if (loginBtn)  { loginBtn.textContent = name; loginBtn.style.cssText = 'background:#059669;color:#fff;border-color:#059669'; }
        if (signupBtn) { signupBtn.style.display = 'none'; }
    });


    // -------------------------------------------------------
    // SCROLL REVEAL
    // -------------------------------------------------------
    const revealEls = document.querySelectorAll('.card, .feature-box, .section-title');
    revealEls.forEach((el, i) => {
        el.classList.add('reveal');
        // Stagger cards in same parent
        const siblings = [...el.parentElement.children].filter(c => c.classList.contains(el.classList[0]));
        const idx = siblings.indexOf(el) % 4;
        if (idx > 0) el.classList.add(`reveal-delay-${idx}`);
    });

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));


    // -------------------------------------------------------
    // FIRST VISIT WELCOME
    // -------------------------------------------------------
    if (!sessionStorage.getItem('tripova_dest_visited')) {
        setTimeout(() => {
            showToast({ type: 'info', title: '6 destinations await! 🏝️', message: 'Filter by Beach, Mountains, or City to explore.', duration: 5000 });
        }, 1000);
        sessionStorage.setItem('tripova_dest_visited', 'true');
    }


    console.log('%cTripova Destinations Loaded ✈️', 'color:#0a1f6e;font-weight:bold;font-size:14px');
});