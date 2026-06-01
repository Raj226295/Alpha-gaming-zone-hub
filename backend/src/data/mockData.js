export const mockData = {
  homepage: {
    hero: {
      title: 'Alpha Game Zone',
      theme: 'Futuristic gaming lounge with premium esports energy',
    },
    setups: [
      { id: 'ps5', name: 'PS5 Royal Bay', price: 499 },
      { id: 'pc', name: 'PC Battlestation', price: 599 },
      { id: 'vr', name: 'VR Immersion Pod', price: 799 },
      { id: 'racing', name: 'Racing Simulator', price: 899 },
    ],
    offers: [
      { code: 'VIP25', title: 'Weekday lounge boost', discount: 25 },
      { code: 'SQUAD15', title: 'Squad savings', discount: 15 },
      { code: 'NIGHT10', title: 'Night grind rate', discount: 10 },
    ],
  },
  slots: [
    { id: 'afternoon', label: '12:00 - 14:00', hours: 2, status: 'Open' },
    { id: 'prime', label: '16:00 - 18:00', hours: 2, status: 'Fast filling' },
    { id: 'night', label: '19:00 - 22:00', hours: 3, status: 'Prime time' },
    { id: 'midnight', label: '22:30 - 01:30', hours: 3, status: 'Night owl' },
  ],
  tournaments: [
    {
      id: 'valorant-clash',
      title: 'Valorant Neon Clash',
      date: 'June 12, 2026',
      fee: 2499,
      prize: 'Rs.50,000 prize pool',
    },
    {
      id: 'fc-showdown',
      title: 'EA FC Weekend Showdown',
      date: 'June 19, 2026',
      fee: 999,
      prize: 'Rs.15,000 prize pool',
    },
    {
      id: 'sim-masters',
      title: 'Sim Racing Masters',
      date: 'June 28, 2026',
      fee: 1499,
      prize: 'Rs.25,000 prize pool',
    },
  ],
  userDashboard: {
    bookings: 3,
    tournaments: 2,
    walletBalance: 1240,
    refundsPending: 350,
  },
  adminDashboard: {
    revenue: 58400,
    occupancy: '84%',
    signups: 47,
    couponConversion: '32%',
  },
}

export const pricingLookup = {
  ps5: 499,
  pc: 599,
  vr: 799,
  racing: 899,
}

export const couponLookup = {
  VIP25: 25,
  SQUAD15: 15,
  NIGHT10: 10,
}
