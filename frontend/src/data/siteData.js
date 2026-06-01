import heroSetup from '../assets/gaming/hero-setup.svg'
import ps5Bay from '../assets/gaming/ps5-bay.svg'
import pcBattlestation from '../assets/gaming/pc-battlestation.svg'
import vrPod from '../assets/gaming/vr-pod.svg'
import racingRig from '../assets/gaming/racing-rig.svg'
import galleryClub from '../assets/gaming/gallery-club.svg'
import featuredValorant from '../assets/gaming/featured-valorant.jpeg'
import featuredEaFc from '../assets/gaming/featured-eafc.jpeg'
import featuredBeatSaber from '../assets/gaming/featured-beatsaber.jpeg'
import featuredGranTurismo from '../assets/gaming/featured-granturismo.jpeg'

export const primaryNavItems = [
  {
    id: 'home',
    label: 'Home',
    summary: 'Hero section and featured games',
    icon: 'home',
  },
  {
    id: 'setups',
    label: 'Gaming Setup',
    summary: 'PS5, PC, VR, and racing bays',
    icon: 'setups',
  },
  {
    id: 'booking',
    label: 'Book Slot',
    summary: 'Select date, time, and checkout',
    icon: 'booking',
  },
  {
    id: 'tournaments',
    label: 'Tournament',
    summary: 'Upcoming events and registration',
    icon: 'tournaments',
  },
  {
    id: 'dashboard',
    label: 'Account',
    summary: 'Profile, wallet, and history',
    icon: 'account',
  },
]

export const featuredGames = [
  {
    title: 'Valorant Neon Clash',
    genre: '5v5 tactical',
    detail: 'Stage-ready scrims with shoutcast energy and low-latency rigs.',
    accent: 'Night ranked',
    image: featuredValorant,
  },
  {
    title: 'EA FC Lounge Finals',
    genre: 'Competitive football',
    detail: 'DualSense bays, couch rivalries, and instant replay moments.',
    accent: 'Crowd favorite',
    image: featuredEaFc,
  },
  {
    title: 'Beat Saber After Dark',
    genre: 'VR rhythm',
    detail: 'Immersion pods tuned for motion-heavy party sessions and clips.',
    accent: 'Creator pick',
    image: featuredBeatSaber,
  },
  {
    title: 'Gran Turismo Apex Run',
    genre: 'Sim racing',
    detail: 'Force-feedback cockpit laps with ghost mode and leaderboard heat.',
    accent: 'Elite circuit',
    image: featuredGranTurismo,
  },
]

export const heroStats = [
  { value: '48', label: 'Daily battle slots' },
  { value: '4.9/5', label: 'Lounge rating' },
  { value: '20ms', label: 'Tournament grade ping' },
]

export const setups = [
  {
    id: 'ps5',
    name: 'PS5 Royal Bay',
    shortLabel: 'PS5',
    headline: '4K sofa arena with DualSense haptics',
    description:
      'A premium couch bay tuned for story campaigns, FIFA nights, and local co-op sessions with studio-grade audio.',
    price: 499,
    includedPlayers: 2,
    playersRange: '1-4 players',
    badge: 'Most booked',
    availability: '18 slots open today',
    image: ps5Bay,
    accent: '#CAE9EA',
    features: ['65 inch 4K OLED', 'DualSense Edge controllers', 'Spatial audio headset pair'],
  },
  {
    id: 'pc',
    name: 'PC Battlestation',
    shortLabel: 'PC',
    headline: 'Esports-ready rigs with 240Hz clarity',
    description:
      'Built for ranked grinds and LAN scrims with ultra-low latency peripherals, streaming lights, and pro seating.',
    price: 599,
    includedPlayers: 1,
    playersRange: '1-3 players',
    badge: 'Competitive',
    availability: '12 slots open today',
    image: pcBattlestation,
    accent: '#2B8C8C',
    features: ['RTX-powered towers', '240Hz monitor wall', 'Mechanical keyboard loadout'],
  },
  {
    id: 'vr',
    name: 'VR Immersion Pod',
    shortLabel: 'VR',
    headline: 'Room-scale quests with guided setup',
    description:
      'Step into multiplayer rhythm games, sci-fi combat, and cinematic simulations with padded motion-ready space.',
    price: 799,
    includedPlayers: 2,
    playersRange: '1-4 players',
    badge: 'Premium',
    availability: '8 slots open today',
    image: vrPod,
    accent: '#CAE9EA',
    features: ['Room-scale tracking', 'On-floor safety assistant', 'Hygiene kit and capture clips'],
  },
  {
    id: 'racing',
    name: 'Racing Simulator',
    shortLabel: 'Racing',
    headline: 'Force-feedback cockpit with triple-view thrill',
    description:
      'Full racing posture, responsive pedals, and immersive steering feedback for solo time trials or head-to-head sessions.',
    price: 899,
    includedPlayers: 1,
    playersRange: '1-2 players',
    badge: 'Elite pick',
    availability: '6 slots open today',
    image: racingRig,
    accent: '#2B8C8C',
    features: ['Triple-screen cockpit', 'Load-cell pedals', 'Leaderboard ghost mode'],
  },
]

export const hourlyPricing = [
  {
    name: 'Quick Drop-In',
    rate: 'Starts at Rs.499/hr',
    summary: 'Great for after-class warmups and short ranked sessions.',
    highlight: 'Instant lane booking',
  },
  {
    name: 'Squad Session',
    rate: 'Starts at Rs.1,499/3hrs',
    summary: 'Optimized for small teams with lounge snacks and reserved seating.',
    highlight: 'Free tournament warmup slot',
  },
  {
    name: 'Midnight Grind',
    rate: 'Starts at Rs.2,999/6hrs',
    summary: 'The late-night bundle for scrims, creator streams, and endurance races.',
    highlight: '15% arcade wallet cashback',
  },
]

export const timeSlots = [
  { id: 'afternoon', label: '12:00 - 14:00', hours: 2, status: 'Open', capacity: '6 bays left' },
  { id: 'prime', label: '16:00 - 18:00', hours: 2, status: 'Fast filling', capacity: '3 bays left' },
  { id: 'night', label: '19:00 - 22:00', hours: 3, status: 'Prime time', capacity: '2 bays left' },
  { id: 'midnight', label: '22:30 - 01:30', hours: 3, status: 'Night owl', capacity: '5 bays left' },
]

export const coupons = {
  VIP25: { discount: 25, note: 'Valid for weekday lounge sessions above Rs.1,500.' },
  SQUAD15: { discount: 15, note: 'Best for 3+ player bookings.' },
  NIGHT10: { discount: 10, note: 'Works on midnight grind slots.' },
}

export const tournaments = [
  {
    id: 'valorant-clash',
    title: 'Valorant Neon Clash',
    date: 'June 12, 2026',
    mode: '5v5 Team',
    prize: 'Rs.50,000 prize pool',
    fee: 2499,
    spots: '14 teams left',
    venue: 'Main esports stage',
    image: pcBattlestation,
    summary: 'High-pressure tactical battles with shoutcast coverage and MVP spotlights.',
  },
  {
    id: 'fc-showdown',
    title: 'EA FC Weekend Showdown',
    date: 'June 19, 2026',
    mode: '1v1 Knockout',
    prize: 'Rs.15,000 prize pool',
    fee: 999,
    spots: '22 slots left',
    venue: 'PS5 royal bay',
    image: ps5Bay,
    summary: 'Fast brackets, live standings, and crowd-side replay screens for every final.',
  },
  {
    id: 'sim-masters',
    title: 'Sim Racing Masters',
    date: 'June 28, 2026',
    mode: 'Solo leaderboard',
    prize: 'Rs.25,000 prize pool',
    fee: 1499,
    spots: '9 seats left',
    venue: 'Racing simulator wing',
    image: racingRig,
    summary: 'Qualifiers on ghost laps, championship heat on the triple-screen rig.',
  },
]

export const offers = [
  {
    title: 'Weekday Duo Drop',
    description: 'Book any PS5 or VR setup before 5 PM and unlock one free energy mocktail.',
    badge: 'Limited time',
  },
  {
    title: 'Creator Night Bundle',
    description: 'Midnight PC bookings include ring light pods and instant highlight export support.',
    badge: 'Streamer pick',
  },
  {
    title: 'Birthday Arena Pass',
    description: 'Reserve 4+ bays and receive custom neon welcome screens plus wallet cashback.',
    badge: 'Celebration deal',
  },
]

export const gallery = [
  { title: 'Signature lounge', image: heroSetup },
  { title: 'Console royalty', image: ps5Bay },
  { title: 'Competitive pit', image: pcBattlestation },
  { title: 'Immersion chamber', image: vrPod },
  { title: 'Night circuit', image: racingRig },
  { title: 'Members afterparty', image: galleryClub },
]

export const contactDetails = {
  address: 'Alpha Game Zone, 3rd Floor, Cyber Avenue, Lucknow, Uttar Pradesh 226010',
  phone: '+91 98765 43210',
  email: 'bookings@alphagamezone.gg',
  hours: 'Open daily from 11:00 AM to 1:30 AM',
  mapNote: 'Located above the premium food court with valet and metro drop access.',
}

export const defaultProfile = {
  gamerTag: 'NeonRider',
  fullName: 'Raj Singh',
  email: 'raj@alphagamezone.gg',
  phone: '+91 90000 11122',
  city: 'Lucknow',
}

export const userDashboardSeed = {
  stats: [
    { label: 'Active bookings', value: '03' },
    { label: 'Tournament entries', value: '02' },
    { label: 'Wallet balance', value: 'Rs.1,240' },
    { label: 'Refunds pending', value: 'Rs.350' },
  ],
  bookings: [
    {
      id: 'AGZ-2041',
      setup: 'PC Battlestation',
      date: 'June 03, 2026',
      slot: '19:00 - 22:00',
      status: 'Confirmed',
      total: 'Rs.1,797',
    },
    {
      id: 'AGZ-1976',
      setup: 'PS5 Royal Bay',
      date: 'June 08, 2026',
      slot: '16:00 - 18:00',
      status: 'Awaiting play',
      total: 'Rs.998',
    },
  ],
  tournaments: [
    {
      id: 'PASS-741',
      title: 'Valorant Neon Clash',
      date: 'June 12, 2026',
      team: 'Pixel Raiders',
      status: 'Registered',
    },
  ],
  paymentHistory: [
    { id: 'PAY-9912', label: 'Weekend booking payment', amount: 'Rs.1,797', mode: 'UPI', date: 'June 01, 2026' },
    { id: 'PAY-9891', label: 'Tournament entry fee', amount: 'Rs.2,499', mode: 'Card', date: 'May 30, 2026' },
  ],
  wallet: [
    { label: 'Cashback credited', amount: '+Rs.240', tone: 'positive' },
    { label: 'Refund in progress', amount: 'Rs.350', tone: 'neutral' },
  ],
}

export const adminDashboardSeed = {
  analytics: [
    { label: 'Today revenue', value: 'Rs.58,400', trend: '+18% vs last Friday' },
    { label: 'Slot occupancy', value: '84%', trend: 'Prime slots nearly full' },
    { label: 'Tournament signups', value: '47', trend: '12 new entries today' },
    { label: 'Coupon conversion', value: '32%', trend: 'VIP25 performing best' },
  ],
  modules: [
    { title: 'Gaming Setup Management', detail: 'Add bays, update setup specs, change maintenance windows.' },
    { title: 'Slot Management', detail: 'Adjust daily inventory, blackout hours, and high-demand surge windows.' },
    { title: 'Booking Management', detail: 'Review pending reservations, overrides, and no-show handling.' },
    { title: 'Tournament Management', detail: 'Publish brackets, prize pools, stream notes, and rule decks.' },
    { title: 'Participant Management', detail: 'Track team captains, roster checks, and check-in status.' },
    { title: 'Coupon Management', detail: 'Launch promo codes, expiry dates, and tier-based offers.' },
    { title: 'Revenue Analytics', detail: 'Compare booking mix, setup utilization, and wallet performance.' },
    { title: 'Offers and Banners', detail: 'Rotate homepage promos, hero campaigns, and creator spotlight tiles.' },
  ],
  recentActions: [
    'PS5 Bay 02 marked available after controller swap.',
    'Valorant Neon Clash bracket auto-seeding locked for 14 teams.',
    'VIP25 usage cap raised for Thursday midnight sessions.',
  ],
}
