const TripovaBookings = {
  STORAGE_KEY: 'tripova_bookings',

  // Save a new booking. type: 'flight' | 'hotel'
  save(booking) {
    const bookings = this.getAll();
    const record = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      bookedAt: new Date().toISOString(),
      ...booking
    };
    bookings.unshift(record); // newest first
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));
    return record;
  },

  // Get all bookings (both types)
  getAll() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Could not read bookings from storage', e);
      return [];
    }
  },

  // Get bookings filtered by type
  getByType(type) {
    return this.getAll().filter(b => b.type === type);
  },

  // Remove a booking by id
  remove(id) {
    const bookings = this.getAll().filter(b => b.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bookings));
  },

  // Clear all bookings
  clearAll() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
};