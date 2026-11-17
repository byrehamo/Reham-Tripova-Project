document.addEventListener('DOMContentLoaded', function() {
    
    const hotelsData = [
        { id: 1, name: 'The Siam Hotel', location: 'Bangkok', address: 'Riverside, Bangkok', pricePerNight: 12500, rating: 4.9, stars: 5, category: '5star', amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi', 'Gym', 'Butler Service'], img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format', description: 'Luxury riverside hotel with Art Deco design.' },
        { id: 2, name: 'InterContinental Bangkok', location: 'Bangkok', address: 'Pathumwan, Bangkok', pricePerNight: 8900, rating: 4.8, stars: 5, category: '5star', amenities: ['Pool', 'Spa', 'Restaurant', 'Bar', 'Gym', 'Business Center'], img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format', description: 'Modern luxury hotel in the heart of Bangkok.' },
        { id: 3, name: 'Rosewood Phuket', location: 'Phuket', address: 'Patong Beach, Phuket', pricePerNight: 15800, rating: 4.9, stars: 5, category: '5star', amenities: ['Infinity Pool', 'Spa', 'Beach Access', 'Fine Dining', 'Butler Service'], img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format', description: 'Ultra-luxury resort with stunning ocean views.' },
        { id: 4, name: 'Shangri-La Chiang Mai', location: 'Chiang Mai', address: 'Old City, Chiang Mai', pricePerNight: 7200, rating: 4.7, stars: 5, category: '5star', amenities: ['Pool', 'Spa', 'Restaurant', 'Cultural Shows', 'Gym'], img: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format', description: 'Luxury hotel blending Lanna Thai design.' },
        { id: 5, name: 'Centara Grand Krabi', location: 'Krabi', address: 'Ao Nang, Krabi', pricePerNight: 6500, rating: 4.6, stars: 5, category: '5star', amenities: ['Beachfront', 'Pool', 'Spa', 'Water Sports', 'Kids Club'], img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format', description: 'Beachfront resort with stunning Andaman Sea views.' },
        { id: 6, name: 'Amari Pattaya', location: 'Pattaya', address: 'North Pattaya Beach', pricePerNight: 4800, rating: 4.5, stars: 4, category: '4star', amenities: ['Beachfront', 'Pool', 'Restaurants', 'Kids Club', 'Gym'], img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format', description: 'Family-friendly beachfront hotel.' },
        { id: 7, name: 'Pullman Pattaya Hotel G', location: 'Pattaya', address: 'Pattaya Beach Road', pricePerNight: 4200, rating: 4.4, stars: 4, category: '4star', amenities: ['Rooftop Pool', 'Bar', 'Restaurant', 'Spa', 'Gym'], img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format', description: 'Trendy hotel with spectacular sea views.' },
        { id: 8, name: 'Dusit Thani Krabi', location: 'Krabi', address: 'Khlong Muang Beach', pricePerNight: 5600, rating: 4.6, stars: 4, category: '4star', amenities: ['Beachfront', 'Pool', 'Spa', 'Restaurant', 'Wedding Venue'], img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format', description: 'Thai-inspired luxury resort on pristine beach.' },
        { id: 9, name: 'Nimman Mai Design Hotel', location: 'Chiang Mai', address: 'Nimmanhaemin, Chiang Mai', pricePerNight: 3500, rating: 4.5, stars: 4, category: '4star', amenities: ['Rooftop Bar', 'Pool', 'Restaurant', 'Art Gallery', 'Free WiFi'], img: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format', description: 'Boutique design hotel in trendy Nimman.' },
        { id: 10, name: 'Travelodge Sukhumvit', location: 'Bangkok', address: 'Sukhumvit, Bangkok', pricePerNight: 2200, rating: 4.2, stars: 3, category: '3star', amenities: ['Pool', 'Restaurant', 'Free WiFi', '24h Front Desk'], img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format', description: 'Modern budget hotel near BTS Skytrain.' },
        { id: 11, name: 'Samed Resort', location: 'Koh Samet', address: 'Ao Noi Na, Koh Samet', pricePerNight: 2800, rating: 4.3, stars: 3, category: '3star', amenities: ['Beachfront', 'Restaurant', 'Kayaking', 'Free WiFi'], img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format', description: 'Beachfront resort on beautiful Koh Samet.' },
        { id: 12, name: 'The Sand Beach Resort', location: 'Pattaya', address: 'Jomtien Beach', pricePerNight: 1900, rating: 4.1, stars: 3, category: '3star', amenities: ['Beachfront', 'Pool', 'Restaurant', 'Free Parking'], img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format', description: 'Affordable beachfront hotel with great value.' },
        { id: 13, name: 'Phi Phi Island Village', location: 'Krabi', address: 'Phi Phi Islands', pricePerNight: 9800, rating: 4.8, stars: 5, category: 'resort', amenities: ['Private Beach', 'Diving', 'Spa', 'Multiple Pools', 'Organic Farm'], img: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=800&auto=format', description: 'Luxury eco-resort on stunning Phi Phi Islands.' },
        { id: 14, name: 'Lub d Hostel Siam', location: 'Bangkok', address: 'Siam Square, Bangkok', pricePerNight: 650, rating: 4.3, stars: 2, category: 'budget', amenities: ['Dormitory', 'Common Room', 'Free WiFi', 'Lockers'], img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format', description: 'Trendy hostel in the heart of Siam Square.' },
        { id: 15, name: 'Stamps Backpackers', location: 'Chiang Mai', address: 'Old City, Chiang Mai', pricePerNight: 450, rating: 4.5, stars: 2, category: 'budget', amenities: ['Dormitory', 'Free Breakfast', 'Tours Desk', 'Free WiFi'], img: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format', description: 'Social backpacker hostel with great atmosphere.' }
    ];

    const destinationInput = document.getElementById('destination');
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const guestCountSpan = document.getElementById('guestCount');
    const roomsSelect = document.getElementById('rooms');
    const searchBtn = document.getElementById('searchBtn');
    const hotelsGrid = document.getElementById('hotelsGrid');
    const noResultsDiv = document.getElementById('noResults');
    const priceRange = document.getElementById('priceRange');
    const priceValueSpan = document.getElementById('priceValue');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const hamburger = document.getElementById('hamburger');
    const decGuests = document.getElementById('decGuests');
    const incGuests = document.getElementById('incGuests');

    let guestCount = 2;
    let currentFilter = 'all';
    let currentMaxPrice = 20000;
    let searchTerm = '';

    const today = new Date().toISOString().split('T')[0];
    if (checkinInput) checkinInput.value = today;
    if (checkoutInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        checkoutInput.value = tomorrow.toISOString().split('T')[0];
    }

    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
        <a href="index.html">Home</a>
        <a href="destinations.html">Destinations</a>
        <a href="flight.html">Flights</a>
        <a href="hotel.html">Hotels</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <a href="booking.html"><i class="fa-solid fa-ticket"></i> My Bookings</a>
        <div class="mobile-buttons">
            <button class="login" id="mobileLoginBtn">Log In</button>
            <button class="signup" id="mobileSignupBtn">Sign Up</button>
        </div>
    `;
    document.body.appendChild(mobileNav);
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileNav.classList.toggle('open');
            document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
        });
    }

    function updateGuestDisplay() { if (guestCountSpan) guestCountSpan.textContent = guestCount; }
    if (decGuests) {
        decGuests.addEventListener('click', () => { if (guestCount > 1) { guestCount--; updateGuestDisplay(); } });
    }
    if (incGuests) {
        incGuests.addEventListener('click', () => { 
            if (guestCount < 10) { 
                guestCount++; 
                updateGuestDisplay(); 
                if (guestCount === 10) showToast('Maximum 10 guests', '#ff6b35');
            } else {
                showToast('Maximum 10 guests allowed', '#dc2626');
            }
        });
    }

    if (priceRange) {
        priceRange.addEventListener('input', (e) => {
            currentMaxPrice = parseInt(e.target.value);
            priceValueSpan.textContent = `Up to ฿${currentMaxPrice.toLocaleString()}`;
            renderHotels();
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderHotels();
        });
    });

    function renderHotels() {
        let filtered = [...hotelsData];
        
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(h => h.location.toLowerCase().includes(term) || h.name.toLowerCase().includes(term));
        }
        
        if (currentFilter !== 'all') {
            filtered = filtered.filter(h => h.category === currentFilter);
        }
        
        filtered = filtered.filter(h => h.pricePerNight <= currentMaxPrice);
        
        if (filtered.length === 0) {
            if (hotelsGrid) hotelsGrid.style.display = 'none';
            if (noResultsDiv) noResultsDiv.style.display = 'block';
            return;
        }
        
        if (hotelsGrid) hotelsGrid.style.display = 'grid';
        if (noResultsDiv) noResultsDiv.style.display = 'none';
        
        hotelsGrid.innerHTML = filtered.map(hotel => {
            let badgeClass = '', badgeText = '';
            if (hotel.category === '5star') { badgeClass = 'star5'; badgeText = '5★ Luxury'; }
            else if (hotel.category === '4star') { badgeClass = 'star4'; badgeText = '4★ Premium'; }
            else if (hotel.category === '3star') { badgeClass = 'star3'; badgeText = '3★ Standard'; }
            else if (hotel.category === 'resort') { badgeClass = 'resort'; badgeText = '🏖️ Resort'; }
            else if (hotel.category === 'budget') { badgeClass = 'budget'; badgeText = '💰 Budget'; }
            
            return `
                <div class="hotel-card" data-id="${hotel.id}">
                    <div class="hotel-img">
                        <img src="${hotel.img}" alt="${hotel.name}" loading="lazy">
                        <div class="hotel-badge ${badgeClass}">${badgeText}</div>
                        <div class="hotel-rating"><i class="fa-solid fa-star"></i> ${hotel.rating}</div>
                    </div>
                    <div class="hotel-info">
                        <h3>${hotel.name}</h3>
                        <div class="hotel-location"><i class="fa-solid fa-location-dot"></i> ${hotel.address}</div>
                        <div class="hotel-amenities">
                            ${hotel.amenities.slice(0, 4).map(a => `<span class="amenity"><i class="fa-solid fa-check"></i> ${a}</span>`).join('')}
                        </div>
                        <div class="hotel-footer">
                            <div class="hotel-price"><strong>฿${hotel.pricePerNight.toLocaleString()}</strong><span>/ night</span></div>
                            <button class="book-btn" data-id="${hotel.id}">Book Now</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        document.querySelectorAll('.book-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(btn.dataset.id);
                const hotel = hotelsData.find(h => h.id === id);
                if (hotel) showBookingModal(hotel);
            });
        });
    }

    function performSearch() {
        searchTerm = destinationInput?.value.trim() || '';
        renderHotels();
        if (searchTerm) showToast(`Searching for hotels in ${searchTerm}`, '#0a1f6e');
    }
    
    if (searchBtn) searchBtn.addEventListener('click', performSearch);
    if (destinationInput) {
        destinationInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(); });
    }

    function calculateNights(checkin, checkout) {
        if (!checkin || !checkout) return 1;
        const start = new Date(checkin);
        const end = new Date(checkout);
        const diff = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 1;
    }

    function showBookingModal(hotel) {
        const checkin = checkinInput?.value || 'Not selected';
        const checkout = checkoutInput?.value || 'Not selected';
        const nights = calculateNights(checkin, checkout);
        const rooms = parseInt(roomsSelect?.value || 1);
        const total = hotel.pricePerNight * nights * guestCount;
        
        const modalHtml = `
            <h2 style="color: #0a1f6e; margin-bottom: 20px;"><i class="fa-solid fa-hotel"></i> Complete Your Booking</h2>
            <div style="margin-bottom: 20px;"><img src="${hotel.img}" style="width:100%; border-radius:16px; height:150px; object-fit:cover;"></div>
            <div class="booking-details">
                <div class="detail-row"><span><i class="fa-solid fa-building"></i> Hotel:</span><strong>${hotel.name}</strong></div>
                <div class="detail-row"><span><i class="fa-solid fa-location-dot"></i> Location:</span><strong>${hotel.address}</strong></div>
                <div class="detail-row"><span><i class="fa-regular fa-calendar"></i> Check-in:</span><strong>${checkin}</strong></div>
                <div class="detail-row"><span><i class="fa-regular fa-calendar"></i> Check-out:</span><strong>${checkout}</strong></div>
                <div class="detail-row"><span><i class="fa-solid fa-moon"></i> Nights:</span><strong>${nights}</strong></div>
                <div class="detail-row"><span><i class="fa-solid fa-user-group"></i> Guests:</span><strong>${guestCount}</strong></div>
                <div class="detail-row"><span><i class="fa-solid fa-bed"></i> Rooms:</span><strong>${rooms}</strong></div>
                <div class="detail-row"><span><i class="fa-solid fa-tag"></i> Price per night:</span><strong>฿${hotel.pricePerNight.toLocaleString()}</strong></div>
                <div class="detail-row" style="border-top:2px solid #e5e7eb; margin-top:8px; padding-top:16px;">
                    <span><strong>Total Amount:</strong></span>
                    <strong style="color:#ff6b35; font-size:22px;">฿${total.toLocaleString()}</strong>
                </div>
            </div>
            <input type="text" id="guestName" placeholder="Full Name" style="width:100%; padding:12px; margin:10px 0; border:1.5px solid #e5e7eb; border-radius:12px;">
            <input type="email" id="guestEmail" placeholder="Email Address" style="width:100%; padding:12px; margin:10px 0; border:1.5px solid #e5e7eb; border-radius:12px;">
            <input type="tel" id="guestPhone" placeholder="Phone Number" style="width:100%; padding:12px; margin:10px 0; border:1.5px solid #e5e7eb; border-radius:12px;">
            <button class="confirm-booking-btn" id="confirmBooking">Confirm & Pay ฿${total.toLocaleString()}</button>
        `;
        
        const modal = openModal(modalHtml);
        setTimeout(() => {
            const confirmBtn = document.getElementById('confirmBooking');
            if (confirmBtn) {
                confirmBtn.onclick = () => {
                    const name = document.getElementById('guestName')?.value;
                    const email = document.getElementById('guestEmail')?.value;
                    const phone = document.getElementById('guestPhone')?.value;
                    if (!name || !email || !phone) { showToast('Please fill all details', '#dc2626'); return; }
                    if (!email.includes('@')) { showToast('Valid email required', '#dc2626'); return; }
                    modal.classList.remove('open');
                    setTimeout(() => {
                        modal.remove();
                        document.body.style.overflow = '';
                        showSuccessModal({
                            hotel, name, email, phone, checkin, checkout, nights, rooms, guestCount, total
                        });
                    }, 200);
                };
            }
        }, 50);
    }

    function showSuccessModal(details) {
        const { hotel, name, email, phone, checkin, checkout, nights, rooms, guestCount: guests, total } = details;

        if (typeof TripovaBookings !== 'undefined') {
            TripovaBookings.save({
                type: 'hotel',
                hotelName: hotel.name,
                hotelAddress: hotel.address,
                hotelImg: hotel.img,
                checkin,
                checkout,
                nights,
                rooms,
                guests,
                pricePerNight: hotel.pricePerNight,
                total: parseInt(total),
                guestName: name,
                guestEmail: email,
                guestPhone: phone
            });
        }

        const modalHtml = `
            <div style="text-align:center;">
                <div class="success-icon"><i class="fa-solid fa-circle-check"></i></div>
                <h2 style="color:#0a1f6e;">Booking Confirmed! 🎉</h2>
                <p style="margin:16px 0;">Thank you <strong>${name}</strong>, your stay at <strong>${hotel.name}</strong> is confirmed.</p>
                <div style="background:#f0fdf4; padding:16px; border-radius:16px; margin:16px 0;"><strong>Total Paid: ฿${parseInt(total).toLocaleString()}</strong></div>
                <p style="color:#6b7280;">A confirmation email has been sent to your inbox.</p>
                <button class="confirm-booking-btn" id="closeSuccess">View My Bookings</button>
            </div>
        `;
        const modal = openModal(modalHtml);
        setTimeout(() => {
            const closeBtn = document.getElementById('closeSuccess');
            if (closeBtn) {
                closeBtn.onclick = () => {
                    modal.classList.remove('open');
                    setTimeout(() => {
                        modal.remove();
                        document.body.style.overflow = '';
                        window.location.href = 'booking.html';
                    }, 200);
                };
            }
        }, 50);
    }

    function openModal(content) {
        const existing = document.querySelectorAll('.modal');
        existing.forEach(m => m.remove());
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `<div class="modal-content"><button class="close-modal-btn">&times;</button>${content}</div>`;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        setTimeout(() => modal.classList.add('open'), 10);
        const closeBtn = modal.querySelector('.close-modal-btn');
        if (closeBtn) closeBtn.onclick = () => { modal.classList.remove('open'); setTimeout(() => { modal.remove(); document.body.style.overflow = ''; }, 200); };
        modal.onclick = (e) => { if (e.target === modal) { modal.classList.remove('open'); setTimeout(() => { modal.remove(); document.body.style.overflow = ''; }, 200); } };
        return modal;
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
        setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3500);
    }

    const subscribeBtn = document.getElementById('subscribeBtn');
    const newsletterEmail = document.getElementById('newsletterEmail');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', () => {
            const email = newsletterEmail?.value.trim();
            if (!email) { showToast('Enter your email', '#dc2626'); return; }
            if (!email.includes('@')) { showToast('Valid email required', '#dc2626'); return; }
            newsletterEmail.value = '';
            showToast('Subscribed! Check your inbox', '#059669');
        });
    }

    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    function showAuthMsg(type) { showToast(`${type === 'login' ? 'Login' : 'Sign up'} feature coming soon!`, '#0a1f6e'); }
    if (loginBtn) loginBtn.addEventListener('click', () => showAuthMsg('login'));
    if (signupBtn) signupBtn.addEventListener('click', () => showAuthMsg('signup'));
    document.addEventListener('click', (e) => {
        if (e.target.id === 'mobileLoginBtn') { mobileNav.classList.remove('open'); if(hamburger) hamburger.classList.remove('open'); showAuthMsg('login'); }
        if (e.target.id === 'mobileSignupBtn') { mobileNav.classList.remove('open'); if(hamburger) hamburger.classList.remove('open'); showAuthMsg('signup'); }
    });

    window.resetAllFilters = function() {
        if (destinationInput) destinationInput.value = '';
        if (priceRange) priceRange.value = '20000';
        if (priceValueSpan) priceValueSpan.textContent = 'Up to ฿20,000';
        currentMaxPrice = 20000;
        currentFilter = 'all';
        searchTerm = '';
        filterBtns.forEach(btn => { if (btn.dataset.filter === 'all') btn.classList.add('active'); else btn.classList.remove('active'); });
        renderHotels();
        showToast('All filters cleared', '#0a1f6e');
    };

    renderHotels();
    
    if (!sessionStorage.getItem('hotel_visited')) {
        setTimeout(() => showToast('🏨 Find the best hotel deals in Thailand!', '#0a1f6e'), 1000);
        sessionStorage.setItem('hotel_visited', 'true');
    }
    
    console.log('Tripova Hotel Page Loaded 🏨');
});