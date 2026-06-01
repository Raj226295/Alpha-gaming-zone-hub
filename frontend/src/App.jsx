import { startTransition, useDeferredValue, useState } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import HomeView from './components/HomeView'
import BookingView from './components/BookingView'
import TournamentView from './components/TournamentView'
import UserDashboardView from './components/UserDashboardView'
import AdminDashboardView from './components/AdminDashboardView'
import {
  adminDashboardSeed,
  contactDetails,
  coupons,
  defaultProfile,
  gallery,
  heroStats,
  hourlyPricing,
  offers,
  setups,
  timeSlots,
  tournaments,
  userDashboardSeed,
} from './data/siteData'

const initialBookingForm = {
  setupId: setups[0].id,
  date: '2026-06-02',
  slotId: timeSlots[1].id,
  players: 2,
  controllers: 1,
  coupon: '',
  paymentMethod: 'UPI',
}

const initialTournamentForm = {
  tournamentId: tournaments[0].id,
  teamName: '',
  captain: '',
  contact: '',
  email: '',
  roster: '',
  paymentMethod: 'UPI',
}

function formatDisplayDate(isoDate) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function App() {
  const [activeView, setActiveView] = useState('home')
  const deferredView = useDeferredValue(activeView)
  const [bookingForm, setBookingForm] = useState(initialBookingForm)
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponFeedback, setCouponFeedback] = useState(
    'Apply VIP25, SQUAD15, or NIGHT10 to unlock instant savings.',
  )
  const [bookingConfirmation, setBookingConfirmation] = useState(null)
  const [tournamentForm, setTournamentForm] = useState(initialTournamentForm)
  const [tournamentPass, setTournamentPass] = useState(null)
  const [profile, setProfile] = useState(defaultProfile)

  const selectedSetup =
    setups.find((setup) => setup.id === bookingForm.setupId) ?? setups[0]
  const selectedSlot =
    timeSlots.find((slot) => slot.id === bookingForm.slotId) ?? timeSlots[0]
  const selectedTournament =
    tournaments.find((tournament) => tournament.id === tournamentForm.tournamentId) ??
    tournaments[0]

  const baseAmount = selectedSetup.price * selectedSlot.hours
  const playerCharge = Math.max(bookingForm.players - selectedSetup.includedPlayers, 0) * 149
  const controllerCharge = bookingForm.controllers * 179
  const subtotal = baseAmount + playerCharge + controllerCharge
  const discountRate = appliedCoupon?.discount ?? 0
  const discountAmount = Math.round((subtotal * discountRate) / 100)
  const total = subtotal - discountAmount
  const dateLabel = formatDisplayDate(bookingForm.date)

  const bookingSummary = {
    baseAmount,
    playerCharge,
    controllerCharge,
    discountAmount,
    total,
    dateLabel,
  }

  const dashboardData = {
    ...userDashboardSeed,
    paymentHistory: [
      ...(bookingConfirmation
        ? [
            {
              id: `PAY-${bookingConfirmation.id.slice(-4)}`,
              label: `${bookingConfirmation.setup} booking`,
              amount: `Rs.${bookingConfirmation.total}`,
              mode: bookingConfirmation.paymentMethod,
              date: bookingConfirmation.dateLabel,
            },
          ]
        : []),
      ...(tournamentPass
        ? [
            {
              id: `PAY-${tournamentPass.id.slice(-4)}`,
              label: `${tournamentPass.title} entry fee`,
              amount: `Rs.${tournamentPass.fee}`,
              mode: tournamentPass.paymentMethod,
              date: tournamentPass.date,
            },
          ]
        : []),
      ...userDashboardSeed.paymentHistory,
    ],
  }

  function handleNavigate(viewId) {
    startTransition(() => {
      setActiveView(viewId)
    })

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleBookingField(field, value) {
    startTransition(() => {
      setBookingForm((current) => ({
        ...current,
        [field]: value,
      }))
    })

    if (field === 'coupon') {
      setAppliedCoupon(null)
      setCouponFeedback('Apply your code again to refresh the quote.')
    }
  }

  function handleApplyCoupon() {
    const normalizedCode = bookingForm.coupon.trim().toUpperCase()

    if (!normalizedCode) {
      setAppliedCoupon(null)
      setCouponFeedback('Enter a coupon code to test the discount flow.')
      return
    }

    const coupon = coupons[normalizedCode]

    if (!coupon) {
      setAppliedCoupon(null)
      setCouponFeedback('That coupon is not active right now. Try VIP25, SQUAD15, or NIGHT10.')
      return
    }

    setAppliedCoupon({ code: normalizedCode, ...coupon })
    setCouponFeedback(`${normalizedCode} applied. ${coupon.note}`)
  }

  function handleConfirmBooking() {
    const confirmation = {
      id: `AGZ-${Math.floor(1000 + Math.random() * 9000)}`,
      setup: selectedSetup.name,
      dateLabel,
      slotLabel: selectedSlot.label,
      total,
      paymentMethod: bookingForm.paymentMethod,
    }

    setBookingConfirmation(confirmation)
    setCouponFeedback('Booking confirmed. Your lounge lane is locked in.')
  }

  function handleTournamentField(field, value) {
    setTournamentForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleRegisterTournament() {
    const teamName = tournamentForm.teamName.trim() || 'Walk-in Squad'
    const captain = tournamentForm.captain.trim() || profile.fullName

    setTournamentPass({
      id: `PASS-${Math.floor(100 + Math.random() * 900)}`,
      title: selectedTournament.title,
      teamName,
      captain,
      checkIn: `${selectedTournament.date} • 1 hour before start`,
      date: selectedTournament.date,
      fee: selectedTournament.fee,
      paymentMethod: tournamentForm.paymentMethod,
    })
  }

  function handleProfileChange(field, value) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function renderView() {
    if (deferredView === 'booking') {
      return (
        <BookingView
          setups={setups}
          timeSlots={timeSlots}
          bookingForm={bookingForm}
          selectedSetup={selectedSetup}
          selectedSlot={selectedSlot}
          couponFeedback={couponFeedback}
          summary={bookingSummary}
          confirmation={bookingConfirmation}
          onUpdateField={handleBookingField}
          onApplyCoupon={handleApplyCoupon}
          onConfirmBooking={handleConfirmBooking}
          onNavigate={handleNavigate}
        />
      )
    }

    if (deferredView === 'tournaments') {
      return (
        <TournamentView
          tournaments={tournaments}
          tournamentForm={tournamentForm}
          selectedTournament={selectedTournament}
          tournamentPass={tournamentPass}
          onUpdateField={handleTournamentField}
          onRegister={handleRegisterTournament}
        />
      )
    }

    if (deferredView === 'dashboard') {
      return (
        <UserDashboardView
          dashboard={dashboardData}
          bookingConfirmation={bookingConfirmation}
          tournamentPass={tournamentPass}
          profile={profile}
          onProfileChange={handleProfileChange}
        />
      )
    }

    if (deferredView === 'admin') {
      return (
        <AdminDashboardView
          admin={adminDashboardSeed}
          offers={offers}
          setups={setups}
          bookingConfirmation={bookingConfirmation}
          tournamentPass={tournamentPass}
        />
      )
    }

    return (
      <HomeView
        heroStats={heroStats}
        setups={setups}
        pricing={hourlyPricing}
        tournaments={tournaments}
        offers={offers}
        gallery={gallery}
        contact={contactDetails}
        onNavigate={handleNavigate}
        onSelectSetup={(setupId) => handleBookingField('setupId', setupId)}
      />
    )
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-left"></div>
      <div className="ambient ambient-right"></div>
      <Navigation activeView={activeView} onNavigate={handleNavigate} />
      <main>{renderView()}</main>
    </div>
  )
}

export default App
