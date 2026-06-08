import heroSetup from '../assets/gaming/hero-setup.svg'
import ps5Bay from '../assets/gaming/ps5-bay.svg'
import featuredValorant from '../assets/gaming/featured-valorant.jpeg'
import featuredEaFc from '../assets/gaming/featured-eafc.jpeg'
import featuredBeatSaber from '../assets/gaming/featured-beatsaber.jpeg'
import featuredGranTurismo from '../assets/gaming/featured-granturismo.jpeg'
import heroAlphaBanner from '../assets/gaming/hero-alpha-banner.png'
import vrGamingActionOne from '../assets/gaming/vr-gaming-action-1.jpeg'
import vrGamingActionTwo from '../assets/gaming/vr-gaming-action-2.jpg'
import racingSimPhoto from '../assets/gaming/racing-sim-photo.jpg'
import arcadeDualScreenPhoto from '../assets/gaming/arcade-dual-screen-photo.jpg'
import pcGamingDeskPhoto from '../assets/gaming/pc-gaming-desk-photo.jpeg'
import pcGamingArenaPhoto from '../assets/gaming/pc-gaming-arena-photo.jpeg'
import pcGamingFocusPhoto from '../assets/gaming/pc-gaming-focus-photo.jpg'
import valorantCupPhoto from '../assets/gaming/valorant-cup-photo.jpeg'

export const primaryNavItems = [
  {
    id: 'home',
    label: 'Home',
    summary: 'Hero section and live venue experience',
    icon: 'home',
  },
  {
    id: 'setups',
    label: 'Gaming Setup',
    summary: 'PS5, PC, VR, private rooms, and racing bays',
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
    summary: 'Upcoming events and registrations',
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
    title: 'Valorant Broadcast Nights',
    genre: '5v5 tactical arena',
    detail: 'Tournament desk energy, low-latency PC bays, and highlight-ready lighting.',
    accent: 'Esports stage',
    image: featuredValorant,
  },
  {
    title: 'EA FC Rival Nights',
    genre: 'Console showdown',
    detail: 'PS5 couch battles with crowd screens, premium audio, and instant rematches.',
    accent: 'Crowd favorite',
    image: featuredEaFc,
  },
  {
    title: 'VR Neon Rush',
    genre: 'Immersive motion zone',
    detail: 'Room-scale adventures, guided calibration, and social clips after every session.',
    accent: 'Immersion first',
    image: featuredBeatSaber,
  },
  {
    title: 'Apex Racing Circuit',
    genre: 'Sim racing experience',
    detail: 'Force-feedback cockpits, time-trial boards, and leaderboard heat all night.',
    accent: 'Premium thrill',
    image: featuredGranTurismo,
  },
]

export const heroStats = [
  { value: '5000+', label: 'Gamers' },
  { value: '100+', label: 'Tournaments' },
  { value: '50+', label: 'Gaming setups' },
  { value: '4.9', label: 'Arena rating' },
]

export const setups = [
  {
    id: 'ps5',
    name: 'PS5 Zone',
    shortLabel: 'PS5',
    headline: '4K console lounge built for couch rivals and cinematic campaigns.',
    description:
      'A premium console bay with OLED visuals, DualSense Edge controllers, and deep lounge seating for relaxed or competitive sessions.',
    price: 300,
    includedPlayers: 2,
    playersRange: '1-4 players',
    capacityLabel: 'Up to 4 gamers',
    badge: 'Console elite',
    availability: '16 lounge slots available today',
    image: valorantCupPhoto,
    accent: '#CAE9EA',
    features: ['65 inch OLED display', 'DualSense Edge controllers', 'Spatial audio headset pairing'],
  },
  {
    id: 'pc',
    name: 'PC Gaming',
    shortLabel: 'PC',
    headline: '240Hz esports battle stations with RGB-loaded tournament ambience.',
    description:
      'Built for ranked grinds, scrims, streaming sessions, and intense LAN nights with ultra-fast peripherals and tuned network priority.',
    price: 200,
    includedPlayers: 1,
    playersRange: '1-3 players',
    capacityLabel: 'Solo or duo queue',
    badge: 'Esports ready',
    availability: '24 battle stations online now',
    image: pcGamingArenaPhoto,
    accent: '#2B8C8C',
    features: ['RTX-powered towers', '240Hz competitive displays', 'Mechanical keyboard and mouse loadout'],
  },
  {
    id: 'vr',
    name: 'VR Gaming',
    shortLabel: 'VR',
    headline: 'Room-scale adventures with guided setup and premium hygiene kits.',
    description:
      'Step into multiplayer rhythm games, sci-fi combat, and cinematic experiences inside a soft-lit, motion-friendly VR pod.',
    price: 400,
    includedPlayers: 2,
    playersRange: '1-4 players',
    capacityLabel: 'Shared VR lane',
    badge: 'Immersion pod',
    availability: '10 VR windows open tonight',
    image: vrGamingActionTwo,
    accent: '#CAE9EA',
    features: ['Room-scale tracking', 'Sanitized face kits', 'Instant replay clip support'],
  },
  {
    id: 'racing',
    name: 'Racing Simulator',
    shortLabel: 'Race',
    headline: 'Triple-screen cockpit with force feedback and leaderboard drama.',
    description:
      'A full racing rig tuned for time trials, head-to-head duels, and endurance sessions with premium pedal response.',
    price: 500,
    includedPlayers: 1,
    playersRange: '1-2 players',
    capacityLabel: 'Cockpit solo lane',
    badge: 'Apex circuit',
    availability: '6 race bays open today',
    image: racingSimPhoto,
    accent: '#2B8C8C',
    features: ['Triple-screen cockpit', 'Load-cell brake pedals', 'Ghost-lap leaderboard mode'],
  },
  {
    id: 'private',
    name: 'Private Room',
    shortLabel: 'VIP',
    headline: 'Luxury enclosed suite for squads, birthdays, and creator sessions.',
    description:
      'An elevated private gaming room with premium sound, flexible screen routing, and quiet lounge seating for focused or celebratory play.',
    price: 650,
    includedPlayers: 4,
    playersRange: '2-6 players',
    capacityLabel: 'VIP squad room',
    badge: 'Exclusive',
    availability: '3 private suites remaining',
    image: vrGamingActionOne,
    accent: '#CAE9EA',
    features: ['Private ambient lighting', 'Food and beverage call button', 'Creator-friendly sound isolation'],
  },
  {
    id: 'cabin',
    name: 'Multiplayer Cabin',
    shortLabel: 'Cabin',
    headline: 'Shared social lane designed for squads, college groups, and party matches.',
    description:
      'A multiplayer-first cabin with clustered screens, easy communication, and lounge-style flow for group sessions.',
    price: 350,
    includedPlayers: 4,
    playersRange: '2-6 players',
    capacityLabel: 'Party-ready cabin',
    badge: 'Squad zone',
    availability: '9 cabins available this evening',
    image: arcadeDualScreenPhoto,
    accent: '#2B8C8C',
    features: ['Group seating layout', 'Fast switch game routing', 'Best for team sessions'],
  },
]

export const hourlyPricing = [
  {
    name: 'Quick Drop-In',
    rate: 'Starts at Rs.200/hr',
    summary: 'Perfect for one quick ranked climb, practice block, or after-class chill.',
    highlight: 'Fast check-in',
  },
  {
    name: 'Squad Session',
    rate: 'Starts at Rs.899/3hrs',
    summary: 'Best value for groups using the multiplayer cabin, private room, or PS5 zone.',
    highlight: 'Group favorite',
  },
  {
    name: 'Midnight Grind',
    rate: 'Starts at Rs.1,499/6hrs',
    summary: 'Late-night access bundle for streamers, scrim squads, and tournament warmups.',
    highlight: 'After-dark access',
  },
]

export const pricingMatrix = [
  {
    name: 'PS5',
    rate: 'Rs.300/hr',
    summary: 'Console lounge access with premium display and DualSense comfort.',
  },
  {
    name: 'PC Gaming',
    rate: 'Rs.200/hr',
    summary: 'Tournament-tuned battlestations for ranked climbs and scrims.',
  },
  {
    name: 'VR Gaming',
    rate: 'Rs.400/hr',
    summary: 'Room-scale immersion with guided setup and sanitized equipment.',
  },
  {
    name: 'Racing Simulator',
    rate: 'Rs.500/hr',
    summary: 'High-intensity sim cockpit sessions with force-feedback precision.',
  },
]

export const timeSlots = [
  { id: 'afternoon', label: '12:00 - 14:00', hours: 2, status: 'Open', capacity: '8 bays left' },
  { id: 'prime', label: '16:00 - 18:00', hours: 2, status: 'Fast filling', capacity: '4 bays left' },
  { id: 'night', label: '19:00 - 22:00', hours: 3, status: 'Prime time', capacity: '3 bays left' },
  { id: 'midnight', label: '22:30 - 01:30', hours: 3, status: 'Night owl', capacity: '5 bays left' },
]

export const coupons = {
  VIP25: { discount: 25, note: 'Valid for weekday private room and multiplayer cabin sessions.' },
  SQUAD15: { discount: 15, note: 'Best for 3+ player bookings and group reservations.' },
  NIGHT10: { discount: 10, note: 'Applies on midnight gaming sessions after 10:30 PM.' },
}

export const tournaments = [
  {
    id: 'bgmi-championship',
    title: 'BGMI Championship',
    date: 'June 14, 2026',
    time: '5:00 PM',
    mode: 'Squad Battle',
    prize: 'Rs.60,000 prize pool',
    fee: 799,
    spots: '18 squads left',
    venue: 'Mobile esports wing',
    image: featuredValorant,
    summary: 'Stage-style battle royale competition with live screens, casting, and squad spotlight intros.',
  },
  {
    id: 'valorant-cup',
    title: 'Valorant Cup',
    date: 'June 21, 2026',
    time: '2:00 PM',
    mode: '5v5 Team',
    prize: 'Rs.80,000 prize pool',
    fee: 2499,
    spots: '10 teams left',
    venue: 'Main PC arena',
    image: valorantCupPhoto,
    summary: 'High-pressure tactical rounds across premium battle stations with stream-ready lighting and MVP moments.',
  },
  {
    id: 'fifa-league',
    title: 'FIFA League',
    date: 'June 25, 2026',
    time: '6:30 PM',
    mode: '1v1 Knockout',
    prize: 'Rs.20,000 prize pool',
    fee: 999,
    spots: '22 players left',
    venue: 'PS5 spotlight lounge',
    image: featuredEaFc,
    summary: 'Fast brackets, crowd-side highlights, and final-match intensity inside the neon console zone.',
  },
  {
    id: 'free-fire-clash',
    title: 'Free Fire Clash',
    date: 'June 29, 2026',
    time: '4:00 PM',
    mode: 'Squad Elimination',
    prize: 'Rs.45,000 prize pool',
    fee: 699,
    spots: '16 squads left',
    venue: 'Alpha tournament floor',
    image: heroAlphaBanner,
    summary: 'An all-out mobile showdown with high-energy hosting, fan seating, and instant prize announcements.',
  },
]

export const whyChoose = [
  {
    id: 'pc-power',
    tag: '01',
    title: 'High-End Gaming PCs',
    description: 'RTX graphics, 240Hz displays, low-latency peripherals, and tournament-tuned systems.',
  },
  {
    id: 'ps5-library',
    tag: '02',
    title: 'Latest PS5 Titles',
    description: 'Fresh console releases, couch co-op favorites, and competitive sports titles ready to launch.',
  },
  {
    id: 'vr-experience',
    tag: '03',
    title: 'VR Experience',
    description: 'Room-scale motion gaming with guided setup, clean gear, and soft-zone safety design.',
  },
  {
    id: 'ultra-fast-net',
    tag: '04',
    title: 'Ultra Fast Internet',
    description: 'Stable, high-speed connectivity designed for ranked matches, live events, and streaming.',
  },
  {
    id: 'chair-comfort',
    tag: '05',
    title: 'Comfortable Gaming Chairs',
    description: 'Long-session support with ergonomic seating, premium desk heights, and relaxed lounge options.',
  },
  {
    id: 'premium-lounge',
    tag: '06',
    title: 'Air Conditioned Gaming Lounge',
    description: 'A premium indoor environment with cinematic lighting, clean airflow, and elite atmosphere.',
  },
]

export const offers = [
  {
    title: 'First Booking 10% OFF',
    description: 'Use your first reservation to unlock an instant discount on PS5, PC, or VR bookings.',
    badge: 'New player perk',
  },
  {
    title: 'Weekend Gaming Offer',
    description: 'Bundle longer Saturday and Sunday sessions for extra play time and snack combo add-ons.',
    badge: 'Weekend drop',
  },
  {
    title: 'Tournament Entry Discounts',
    description: 'Register early for featured events and get reduced entry on selected championships.',
    badge: 'Limited seats',
  },
]

export const gallery = [
  { title: 'Alpha signature arena', image: heroAlphaBanner },
  { title: 'Tournament spotlight stage', image: arcadeDualScreenPhoto },
  { title: 'PS5 luxury zone', image: ps5Bay },
  { title: 'RGB battlestation row', image: pcGamingDeskPhoto },
  { title: 'VR immersion pod', image: vrGamingActionTwo },
  { title: 'Sim racing adrenaline lane', image: racingSimPhoto },
  { title: 'Multiplayer cabin moments', image: vrGamingActionOne },
  { title: 'Private room experience', image: heroSetup },
  { title: 'Competitive PC arena', image: pcGamingArenaPhoto },
  { title: 'Focused night grind', image: pcGamingFocusPhoto },
  { title: 'Valorant cup warmup station', image: valorantCupPhoto },
]

export const reviews = [
  {
    id: 'review-1',
    title: 'Best Gaming Zone Experience',
    quote:
      'The setup quality, neon atmosphere, and overall service make Alpha Gaming feel like a premium esports club rather than a regular gaming cafe.',
    author: 'Rohan Verma',
    role: 'Weekend squad captain',
  },
  {
    id: 'review-2',
    title: 'Amazing Tournaments',
    quote:
      'The tournament vibe is unreal. Live screens, clean registration, and prize handling all felt professional from start to finish.',
    author: 'Sana Khan',
    role: 'Valorant competitor',
  },
  {
    id: 'review-3',
    title: 'Premium Setup and Environment',
    quote:
      'Everything from the chairs to the lighting and cooling feels thoughtfully designed. The private room was perfect for our team practice.',
    author: 'Aman Tiwari',
    role: 'Creator and streamer',
  },
]

export const footerLinks = [
  { label: 'About Us', sectionId: 'home' },
  { label: 'Contact', sectionId: 'contact-section' },
  { label: 'Terms & Conditions', sectionId: 'footer-section' },
  { label: 'Privacy Policy', sectionId: 'footer-section' },
]

export const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/alphagamingzone' },
  { label: 'Discord', href: 'https://discord.gg/alphagamingzone' },
  { label: 'YouTube', href: 'https://youtube.com/@alphagamingzone' },
]

export const contactDetails = {
  address: '2nd Floor, SBI Building, Sanoli Chowk, above The Alpha Gym & Fitness, Gulabbagh, Bihar 854326',
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  email: 'bookings@alphagamingzone.gg',
  hours: 'Open daily from 11:00 AM to 1:30 AM',
  hoursList: ['Mon-Thu: 11:00 AM - 12:30 AM', 'Fri-Sun: 11:00 AM - 1:30 AM'],
  mapNote: 'Located on the 2nd Floor of the SBI Building above The Alpha Gym & Fitness at Sanoli Chowk, Gulabbagh.',
  whatsappUrl: 'https://wa.me/919876543210',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=2nd+Floor+SBI+Building+Sanoli+Chowk+above+The+Alpha+Gym+%26+Fitness+Gulabbagh+Bihar+854326',
  mapEmbedUrl:
    'https://www.google.com/maps?q=2nd+Floor+SBI+Building+Sanoli+Chowk+above+The+Alpha+Gym+%26+Fitness+Gulabbagh+Bihar+854326&output=embed',
}

export const defaultProfile = {
  id: 'player-neon-rider',
  gamerTag: 'NeonRider',
  fullName: 'Raj Singh',
  email: 'raj@alphagamingzone.gg',
  phone: '+91 90000 11122',
  city: 'Lucknow',
}

export const userDashboardSeed = {
  stats: [
    { label: 'Active bookings', value: '03' },
    { label: 'Tournament entries', value: '02' },
    { label: 'Wallet balance', value: 'Rs.1,240' },
    { label: 'Rewards pending', value: 'Rs.350' },
  ],
  bookings: [
    {
      id: 'AGZ-2041',
      setup: 'PC Gaming',
      date: 'June 03, 2026',
      slot: '19:00 - 22:00',
      status: 'Confirmed',
      total: 'Rs.600',
    },
    {
      id: 'AGZ-1976',
      setup: 'PS5 Zone',
      date: 'June 08, 2026',
      slot: '16:00 - 18:00',
      status: 'Awaiting play',
      total: 'Rs.600',
    },
  ],
  tournaments: [
    {
      id: 'REG-741221',
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
    },
  ],
  paymentHistory: [
    { id: 'PAY-9912', label: 'Weekend booking payment', amount: 'Rs.600', mode: 'UPI', date: 'June 01, 2026' },
    { id: 'PAY-9891', label: 'Tournament entry fee', amount: 'Rs.2,499', mode: 'Card', date: 'May 30, 2026' },
  ],
  wallet: [
    { label: 'Cashback credited', amount: '+Rs.240', tone: 'positive' },
    { label: 'Referral perk pending', amount: 'Rs.350', tone: 'neutral' },
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
    { title: 'Gaming Setup Management', detail: 'Add bays, update setup specs, and manage maintenance windows.' },
    { title: 'Slot Management', detail: 'Adjust daily inventory, blackout hours, and high-demand windows.' },
    { title: 'Booking Management', detail: 'Review pending reservations, overrides, and no-show handling.' },
    { title: 'Tournament Management', detail: 'Publish brackets, prize pools, stream notes, and rules.' },
    { title: 'Participant Management', detail: 'Track captains, roster checks, and check-in status.' },
    { title: 'Coupon Management', detail: 'Launch promo codes, expiry dates, and offer tiers.' },
    { title: 'Revenue Analytics', detail: 'Compare booking mix, setup utilization, and wallet performance.' },
    { title: 'Offers and Banners', detail: 'Rotate homepage promos, hero campaigns, and creator spotlight tiles.' },
  ],
  recentActions: [
    'BGMI Championship registration desk opened for 18 squads.',
    'Private Room 02 marked available after sound check.',
    'Weekend Gaming Offer banner rotated to homepage spotlight.',
  ],
}
