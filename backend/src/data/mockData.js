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
      id: 'bgmi-championship',
      title: 'BGMI Championship',
      date: 'June 14, 2026',
      time: '5:00 PM',
      fee: 799,
      prize: 'Rs.60,000 prize pool',
      venue: 'Mobile esports wing',
    },
    {
      id: 'valorant-cup',
      title: 'Valorant Cup',
      date: 'June 21, 2026',
      time: '2:00 PM',
      fee: 2499,
      prize: 'Rs.80,000 prize pool',
      venue: 'Main PC arena',
    },
    {
      id: 'fifa-league',
      title: 'FIFA League',
      date: 'June 25, 2026',
      time: '6:30 PM',
      fee: 999,
      prize: 'Rs.20,000 prize pool',
      venue: 'PS5 spotlight lounge',
    },
    {
      id: 'free-fire-clash',
      title: 'Free Fire Clash',
      date: 'June 29, 2026',
      time: '4:00 PM',
      fee: 699,
      prize: 'Rs.45,000 prize pool',
      venue: 'Alpha tournament floor',
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

export const tournamentRegistrationStore = [
  {
    id: 'REG-741221',
    userId: 'player-neon-rider',
    tournamentId: 'valorant-cup',
    tournamentName: 'Valorant Cup',
    tournamentDate: 'June 21, 2026',
    tournamentTime: '2:00 PM',
    registrationDate: '30 May 2026',
    teamName: 'Pixel Raiders',
    captainName: 'Raj Singh',
    mobileNumber: '+91 90000 11122',
    gameId: 'NeonRider#7781',
    status: 'Approved',
    matchSchedule: 'Quarterfinals | June 21, 2026 | 4:30 PM',
    createdAt: '2026-05-30T15:30:00+05:30',
  },
]

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
