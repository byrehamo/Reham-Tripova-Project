document.addEventListener('DOMContentLoaded', () => {

    
    const flightData = {
        'Bangkok': { code: 'BKK', basePrice: 1990, duration: '1h 15m', airlines: ['Thai Airways', 'Bangkok Airways', 'Thai Smile'] },
        'Phuket': { code: 'HKT', basePrice: 2490, duration: '1h 30m', airlines: ['Thai Airways', 'Air Asia', 'Nok Air'] },
        'Chiang Mai': { code: 'CNX', basePrice: 2190, duration: '1h 10m', airlines: ['Thai Smile', 'Lion Air', 'Bangkok Airways'] },
        'Krabi': { code: 'KBV', basePrice: 2590, duration: '1h 25m', airlines: ['Air Asia', 'Thai Airways', 'VietJet Air'] },
        'Pattaya': { code: 'UTP', basePrice: 1890, duration: '1h 00m', airlines: ['Bangkok Airways', 'Thai Airways'] },
        'Khao Yai': { code: 'NAKHON', basePrice: 1690, duration: '45m', airlines: ['Thai Smile', 'Lion Air'] }
    };

    const classMultipliers = {
        'Economy': 1.0,
        'Economy Class': 1.0,
        'Business': 2.5,
        'Business Class': 2.5,
        'First': 4.0,
        'First Class': 4.0
    };

    const popularDestinations = [
        { name: 'Bangkok', img: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=800&auto=format'},
        { name: 'Phuket', img: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=800&auto=format'},
        { name: 'Chiang Mai', img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format'},
        { name: 'Krabi', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format'},
        { name: 'Pattaya', img: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=800&auto=format'},
        { name: 'Khao Yai', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format'}
    ];

    const fromInput = document.getElementById('fromCity');
    const toInput = document.getElementById('toCity');
    const departureDate = document.getElementById('departureDate');
    const returnDate = document.getElementById('returnDate');
    const returnGroup = document.getElementById('returnGroup');
    const tripRadios = document.querySelectorAll('input[name="tripType"]');
    const passCountSpan = document.getElementById('passCount');
    const decPassBtn = document.getElementById('decPass');
    const incPassBtn = document.getElementById('incPass');
    const searchBtn = document.getElementById('searchFlightBtn');
    const cardsContainer = document.getElementById('flightCardsContainer');
    const hamburger = document.getElementById('hamburger');
    const header = document.querySelector('header');

    let passengerCount = 1;

    const today = new Date().toISOString().split('T')[0];
    if (departureDate) departureDate.min = today;
    if (returnDate) returnDate.min = today;

    function getPriceByClass(basePrice, flightClass) {
        const multiplier = classMultipliers[flightClass] || 1.0;
        return Math.round(basePrice * multiplier);
    }

    function getClassDetails(flightClass) {
        switch(flightClass) {
            case 'Economy':
            case 'Economy Class':
                return { name: 'Economy', icon: 'fa-chair', color: '#6b7280', multiplier: '1x' };
            case 'Business':
            case 'Business Class':
                return { name: 'Business', icon: 'fa-crown', color: '#f59e0b', multiplier: '2.5x' };
            case 'First':
            case 'First Class':
                return { name: 'First Class', icon: 'fa-gem', color: '#ff6b35', multiplier: '4x' };
            default:
                return { name: 'Economy', icon: 'fa-chair', color: '#6b7280', multiplier: '1x' };
        }
    }

    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 10);
        }
    });

    const currentPage = window.location.pathname.split('/').pop() || 'flight.html';
    
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
        <a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">Home</a>
        <a href="destinations.html" class="${currentPage === 'destinations.html' ? 'active' : ''}">Destinations</a>
        <a href="flight.html" class="${currentPage === 'flight.html' ? 'active' : ''}">Flights</a>
        <a href="hotel.html" class="${currentPage === 'hotel.html' ? 'active' : ''}">Hotels</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <a href="booking.html"><i class="fa-solid fa-ticket"></i> My Bookings</a>
        <div class="mobile-buttons">
            <button class="login" id="mobileLoginBtn">Log In</button>
            <button class="signup" id="mobileSignupBtn">Sign Up</button>
        </div>
    `;
    
    if (header) header.after(mobileNav);

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('open');
            mobileNav.classList.toggle('open', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
    }

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    tripRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (returnGroup) {
                returnGroup.style.display = this.value === 'roundtrip' ? 'block' : 'none';
            }
        });
    });
    
    if (returnGroup) {
        const selectedTrip = document.querySelector('input[name="tripType"]:checked');
        if (selectedTrip) {
            returnGroup.style.display = selectedTrip.value === 'roundtrip' ? 'block' : 'none';
        } else {
            returnGroup.style.display = 'none';
        }
    }

    function updatePassengerCount() {
        if (passCountSpan) {
            passCountSpan.textContent = passengerCount;
        }
    }

    if (decPassBtn) {
        decPassBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (passengerCount > 1) {
                passengerCount--;
                updatePassengerCount();
            }
        });
    }

    if (incPassBtn) {
        incPassBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (passengerCount < 10) {
                passengerCount++;
                updatePassengerCount();
                if (passengerCount === 10) {
                    showToast('Maximum 10 passengers reached', '#ff6b35');
                }
            } else {
                showToast('Maximum 10 passengers allowed', '#dc2626');
            }
        });
    }

    updatePassengerCount();

    function renderPopularCards() {
        if (!cardsContainer) return;
        
        const classSelect = document.getElementById('flightClass');
        const selectedClass = classSelect ? classSelect.value : 'Economy';
        const classDetails = getClassDetails(selectedClass);
        
        cardsContainer.innerHTML = popularDestinations.map(dest => {
            return `
            <div class="card">
                <img src="${dest.img}" alt="${dest.name}" loading="lazy">
                <div class="card-content">
                    <h3>${dest.name}</h3>
                    <p>Direct flights available daily</p>
                    <div class="price-container">
                        <span class="class-badge" style="background: ${classDetails.color};">
                            <i class="fa-solid ${classDetails.icon}"></i> ${classDetails.name}
                        </span>
                    </div>
                    <button class="view-details-btn" data-dest="${dest.name}">Select this destinaion</button>
                </div>
            </div>
            `;
        }).join('');

        const style = document.createElement('style');
        style.textContent = `
            .price-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                gap: 8px;
                margin: 12px 0;
            }
            .class-badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                color: white;
            }
            .price {
                margin: 0;
            }
        `;
        if (!document.querySelector('#class-badge-style')) {
            style.id = 'class-badge-style';
            document.head.appendChild(style);
        }

        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const destName = btn.dataset.dest;
                if (toInput) toInput.value = destName;
                document.querySelector('.search-box')?.scrollIntoView({ behavior: 'smooth' });
                showToast(`Selected ${destName}. Complete your flight search!`, '#0a1f6e');
            });
        });
    }

    const classSelect = document.getElementById('flightClass');
    if (classSelect) {
        classSelect.addEventListener('change', () => {
            renderPopularCards();
        });
    }
    
    renderPopularCards();

    function showToast(message, bgColor = '#059669') {
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fa-solid ${bgColor === '#dc2626' ? 'fa-circle-exclamation' : 'fa-circle-check'}"></i> ${message}`;
        toast.style.background = bgColor;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    function openModal(contentHTML) {
        const existingModals = document.querySelectorAll('.modal');
        existingModals.forEach(modal => modal.remove());
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal-btn">&times;</button>
                ${contentHTML}
            </div>
        `;
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        setTimeout(() => modal.classList.add('open'), 10);

        const closeBtn = modal.querySelector('.close-modal-btn');
        closeBtn.onclick = () => {
            modal.classList.remove('open');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 200);
        };

        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = '';
                }, 200);
            }
        };
        
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                modal.classList.remove('open');
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = '';
                }, 200);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
        
        return modal;
    }

    function searchFlights() {
        const from = fromInput?.value.trim();
        const to = toInput?.value.trim();
        const depart = departureDate?.value;
        const returnVal = returnDate?.value;
        const tripType = document.querySelector('input[name="tripType"]:checked')?.value;
        const flightClass = document.getElementById('flightClass')?.value;
        const classDetails = getClassDetails(flightClass);

        if (!from) { showToast('Please enter departure city', '#dc2626'); return; }
        if (!to) { showToast('Please enter destination city', '#dc2626'); return; }
        if (!depart) { showToast('Please select departure date', '#dc2626'); return; }
        if (tripType === 'roundtrip' && !returnVal) { showToast('Please select return date for round trip', '#dc2626'); return; }

        let destKey = null;
        for (let key in flightData) {
            if (to.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(to.toLowerCase())) {
                destKey = key;
                break;
            }
        }
        
        if (!destKey) {
            showToast(`No flights found to "${to}". Try Bangkok, Phuket, Chiang Mai, Krabi, Pattaya, or Khao Yai`, '#dc2626');
            return;
        }

        const dest = flightData[destKey];
        const multiplier = tripType === 'roundtrip' ? 2 : 1;
        const pricePerPassenger = getPriceByClass(dest.basePrice, flightClass);

        const airlinesHTML = dest.airlines.map((airline, idx) => {
            const airlinePrice = idx === 0 ? pricePerPassenger : Math.round(pricePerPassenger * 0.95);
            const airlineTotal = airlinePrice * passengerCount * multiplier;
            return `
                <div class="flight-card-item">
                    <div>
                        <i class="fa-solid fa-plane" style="color: #ff6b35;"></i>
                        <strong>${airline}</strong>
                        <div style="font-size: 12px; color: #6b7280;">Flight ${String.fromCharCode(65 + idx)}${Math.floor(Math.random() * 900 + 100)}</div>
                    </div>
                    <div>
                        <div>⏱️ ${dest.duration}</div>
                        <div style="font-size: 12px;">Direct flight</div>
                    </div>
                    <div style="text-align: right;">
                        <div>
                            <span style="font-size: 12px; color: ${classDetails.color};">${classDetails.name}</span>
                            <strong style="color: #ff6b35; font-size: 22px; margin-left: 8px;">฿${airlineTotal.toLocaleString()}</strong>
                        </div>
                        <div style="font-size: 11px;">for ${passengerCount} passenger(s)</div>
                        <button class="select-flight-btn" data-airline="${airline}" data-total="${airlineTotal}" data-price="${airlinePrice}">Select</button>
                    </div>
                </div>
            `;
        }).join('');

        const modalContent = `
            <h2 style="color: #0a1f6e; margin-bottom: 20px;"><i class="fa-solid fa-plane-departure"></i> Available Flights</h2>
            <div class="route-summary">
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
                    <div><i class="fa-solid fa-location-dot" style="color: #ff6b35;"></i> <strong>${from.toUpperCase()}</strong> → <strong>${destKey}</strong> (${dest.code})</div>
                    <div><i class="fa-regular fa-calendar"></i> ${depart} ${tripType === 'roundtrip' ? `→ Return: ${returnVal}` : ''}</div>
                    <div><i class="fa-solid fa-user-group"></i> ${passengerCount} passenger(s)</div>
                </div>
                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center;">
                    <span><i class="fa-solid ${classDetails.icon}" style="color: ${classDetails.color};"></i> <strong>${classDetails.name}</strong> <span style="font-size: 12px; color: #6b7280;">(${classDetails.multiplier} base price)</span></span>
                    <span style="background: ${classDetails.color}20; padding: 4px 12px; border-radius: 20px; font-size: 13px;">
                        Base fare: ฿${dest.basePrice} × ${classDetails.multiplier}
                    </span>
                </div>
            </div>
            ${airlinesHTML}
            <p style="font-size: 12px; color: #6b7280; margin-top: 16px; text-align: center;">
                <i class="fa-solid fa-info-circle"></i> ${classDetails.name} includes: ${flightClass === 'Economy' ? 'Standard seat, 1 carry-on' : flightClass === 'Business' ? 'Priority boarding, extra legroom, lounge access, 2 checked bags' : 'First class lounge, private suite, gourmet meals, 3 checked bags, chauffeur service'}
            </p>
        `;

        const modal = openModal(modalContent);
        
        setTimeout(() => {
            document.querySelectorAll('.select-flight-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const airline = btn.dataset.airline;
                    const total = btn.dataset.total;
                    modal.classList.remove('open');
                    setTimeout(() => {
                        modal.remove();
                        document.body.style.overflow = '';
                        showBookingModal(destKey, airline, total, depart, returnVal, tripType, passengerCount, flightClass, dest.basePrice, from);
                    }, 200);
                });
            });
        }, 50);
    }

    function showBookingModal(destination, airline, total, depart, returnVal, tripType, passengers, flightClass, basePrice, fromCity) {
        const classDetails = getClassDetails(flightClass);
        const pricePerPerson = getPriceByClass(basePrice, flightClass);
        
        const modalContent = `
            <h2 style="color: #0a1f6e;">Complete Your Booking</h2>
            <div class="booking-details">
                <div class="detail-row"><span><i class="fa-solid fa-location-dot"></i> Destination:</span><strong>${destination}</strong></div>
                <div class="detail-row"><span><i class="fa-solid fa-plane"></i> Airline:</span><strong>${airline}</strong></div>
                <div class="detail-row"><span><i class="fa-regular fa-calendar"></i> Departure:</span><strong>${depart}</strong></div>
                ${tripType === 'roundtrip' ? `<div class="detail-row"><span><i class="fa-regular fa-calendar"></i> Return:</span><strong>${returnVal}</strong></div>` : ''}
                <div class="detail-row">
                    <span><i class="fa-solid ${classDetails.icon}" style="color: ${classDetails.color};"></i> Travel Class:</span>
                    <strong style="color: ${classDetails.color};">${classDetails.name} <span style="font-size: 12px;">(${classDetails.multiplier} × ฿${basePrice})</span></strong>
                </div>
                <div class="detail-row"><span><i class="fa-solid fa-user-group"></i> Passengers:</span><strong>${passengers}</strong></div>
                <div class="detail-row price-row">
                    <span><i class="fa-solid fa-tag"></i> Price per person:</span>
                    <strong>฿${pricePerPerson.toLocaleString()}</strong>
                </div>
                <div class="detail-row price-row">
                    <span><i class="fa-solid fa-receipt"></i> Total Price:</span>
                    <strong style="color: #ff6b35; font-size: 20px;">฿${parseInt(total).toLocaleString()}</strong>
                </div>
            </div>
            <div style="background: #f0fdf4; padding: 12px; border-radius: 12px; margin: 16px 0;">
                <small><i class="fa-solid fa-gift"></i> ${classDetails.name} benefits:</small>
                <small style="display: block; margin-top: 4px;">${flightClass === 'Economy' ? '✓ Standard seat selection ✓ 1 carry-on bag (7kg)' : flightClass === 'Business' ? '✓ Priority check-in ✓ Extra legroom seat ✓ Lounge access ✓ 2 checked bags (30kg each)' : '✓ Private first class lounge ✓ Lie-flat seat ✓ Gourmet dining ✓ 3 checked bags (40kg each) ✓ Chauffeur service'}</small>
            </div>
            <input type="text" id="passengerName" placeholder="Full Name" style="width:100%; padding:12px; margin:10px 0; border-radius:12px; border:1.5px solid #e5e7eb;">
            <input type="email" id="passengerEmail" placeholder="Email Address" style="width:100%; padding:12px; margin:10px 0; border-radius:12px; border:1.5px solid #e5e7eb;">
            <input type="tel" id="passengerPhone" placeholder="Phone Number" style="width:100%; padding:12px; margin:10px 0; border-radius:12px; border:1.5px solid #e5e7eb;">
            <button class="confirm-booking-btn" id="confirmBookingBtn">Confirm & Pay ฿${parseInt(total).toLocaleString()}</button>
        `;

        const modal = openModal(modalContent);
        
        setTimeout(() => {
            const confirmBtn = document.getElementById('confirmBookingBtn');
            if (confirmBtn) {
                confirmBtn.onclick = () => {
                    const name = document.getElementById('passengerName')?.value;
                    const email = document.getElementById('passengerEmail')?.value;
                    const phone = document.getElementById('passengerPhone')?.value;
                    
                    if (!name || !email || !phone) {
                        showToast('Please fill in all contact details', '#dc2626');
                        return;
                    }
                    if (!email.includes('@')) {
                        showToast('Please enter a valid email address', '#dc2626');
                        return;
                    }
                    
                    modal.classList.remove('open');
                    setTimeout(() => {
                        modal.remove();
                        document.body.style.overflow = '';
                        showSuccessModal({
                            destination, airline, total, depart, returnVal, tripType,
                            passengers, flightClass, classDetails, fromCity,
                            name, email, phone
                        });
                    }, 200);
                };
            }
        }, 50);
    }

    function showSuccessModal(details) {
        const { destination, airline, total, depart, returnVal, tripType,
                passengers, flightClass, classDetails, fromCity,
                name, email, phone } = details;

        if (typeof TripovaBookings !== 'undefined') {
            TripovaBookings.save({
                type: 'flight',
                from: fromCity,
                to: destination,
                airline,
                departDate: depart,
                returnDate: returnVal || null,
                tripType,
                passengers,
                flightClass: classDetails.name,
                total: parseInt(total),
                passengerName: name,
                passengerEmail: email,
                passengerPhone: phone
            });
        }
        
        const modalContent = `
            <div style="text-align: center;">
                <div class="success-icon">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <h2 style="color: #0a1f6e;">Booking Confirmed! 🎉</h2>
                <p style="margin: 16px 0;">Thank you <strong>${name}</strong>, your <strong style="color: ${classDetails.color};">${classDetails.name}</strong> flight to <strong>${destination}</strong> is confirmed.</p>
                <div style="background: linear-gradient(135deg, ${classDetails.color}10, #fff); padding: 16px; border-radius: 16px; margin: 16px 0;">
                    <p><strong>Total Paid: ฿${parseInt(total).toLocaleString()}</strong></p>
                    <p style="font-size: 13px; margin-top: 8px;"><i class="fa-solid ${classDetails.icon}"></i> ${classDetails.name} class benefits included</p>
                </div>
                <p style="color: #6b7280; font-size: 14px;">A confirmation email with e-ticket has been sent to your inbox.</p>
                <button class="confirm-booking-btn" id="closeSuccessBtn" style="margin-top: 20px;">View My Trips</button>
            </div>
        `;
        
        const modal = openModal(modalContent);
        
        setTimeout(() => {
            const closeBtn = document.getElementById('closeSuccessBtn');
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

    if (searchBtn) {
        searchBtn.addEventListener('click', searchFlights);
    }

    const searchInputs = [fromInput, toInput, departureDate, returnDate];
    searchInputs.forEach(input => {
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    searchFlights();
                }
            });
        }
    });

    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    
    function showAuthModal(type) {
        showToast(`${type === 'login' ? 'Login' : 'Sign up'} feature coming soon!`, '#0a1f6e');
    }
    
    if (loginBtn) loginBtn.addEventListener('click', () => showAuthModal('login'));
    if (signupBtn) signupBtn.addEventListener('click', () => showAuthModal('signup'));
    
    document.addEventListener('click', (e) => {
        if (e.target.id === 'mobileLoginBtn') {
            mobileNav.classList.remove('open');
            if (hamburger) hamburger.classList.remove('open');
            showAuthModal('login');
        }
        if (e.target.id === 'mobileSignupBtn') {
            mobileNav.classList.remove('open');
            if (hamburger) hamburger.classList.remove('open');
            showAuthModal('signup');
        }
    });

    if (!sessionStorage.getItem('flight_page_visited')) {
        setTimeout(() => {
            showToast('✈️ Find the best flight deals to Thailand! Upgrade to Business or First Class for luxury travel.', '#0a1f6e');
        }, 1000);
        sessionStorage.setItem('flight_page_visited', 'true');
    }

    console.log('%cTripova Flight Page Loaded ✈️ - Dynamic Class Pricing Active', 'color:#0a1f6e;font-weight:bold;font-size:14px');
});