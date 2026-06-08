import { startTransition, useDeferredValue, useEffect, useEffectEvent, useState } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import HomeView from './components/HomeView'
import SetupView from './components/SetupView'
import BookingView from './components/BookingView'
import TournamentView from './components/TournamentView'
import PricingView from './components/PricingView'
import GalleryView from './components/GalleryView'
import AuthView from './components/AuthView'
import CursorEffect from './components/CursorEffect'
import UserDashboardView from './components/UserDashboardView'
import AdminDashboardView from './components/AdminDashboardView'
import TournamentAuthPromptModal from './components/TournamentAuthPromptModal'
import TournamentRegistrationModal from './components/TournamentRegistrationModal'
import TournamentSuccessModal from './components/TournamentSuccessModal'
import { fetchTournamentRegistrations, registerTournamentEntry } from './lib/tournamentRegistration'
import {
  adminDashboardSeed,
  contactDetails,
  coupons,
  defaultProfile,
  footerLinks,
  gallery,
  hourlyPricing,
  offers,
  pricingMatrix,
  setups,
  socialLinks,
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

const initialLoginForm = {
  identity: '',
  password: '',
  rememberMe: false,
}

const initialSignupForm = {
  fullName: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  birthDate: '',
  city: '',
}

function formatDisplayDate(isoDate) {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function createTournamentForm(profile) {
  return {
    teamName: '',
    captainName: profile.fullName ?? '',
    mobileNumber: profile.phone ?? '',
    gameId: '',
    agreeToRules: true,
  }
}

function createUserId(seedValue) {
  const normalizedSeed = seedValue
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return `player-${normalizedSeed || 'alpha'}`
}

function formatMetricValue(value) {
  return String(value).padStart(2, '0')
}

function App() {
  const [activeView, setActiveView] = useState('home')
  const deferredView = useDeferredValue(activeView)
  const [pendingSection, setPendingSection] = useState(null)
  const [bookingForm, setBookingForm] = useState(initialBookingForm)
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponFeedback, setCouponFeedback] = useState(
    'Apply VIP25, SQUAD15, or NIGHT10 to unlock instant savings.',
  )
  const [bookingConfirmation, setBookingConfirmation] = useState(null)
  const [profile, setProfile] = useState(defaultProfile)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedTournamentId, setSelectedTournamentId] = useState(tournaments[0].id)
  const [tournamentForm, setTournamentForm] = useState(() => createTournamentForm(defaultProfile))
  const [tournamentRegistrations, setTournamentRegistrations] = useState([])
  const [latestTournamentRegistration, setLatestTournamentRegistration] = useState(null)
  const [showTournamentAuthPrompt, setShowTournamentAuthPrompt] = useState(false)
  const [isTournamentModalOpen, setIsTournamentModalOpen] = useState(false)
  const [isTournamentSuccessOpen, setIsTournamentSuccessOpen] = useState(false)
  const [pendingTournamentIntent, setPendingTournamentIntent] = useState(null)
  const [tournamentErrorMessage, setTournamentErrorMessage] = useState('')
  const [isTournamentSubmitting, setIsTournamentSubmitting] = useState(false)
  const [loginForm, setLoginForm] = useState(initialLoginForm)
  const [signupForm, setSignupForm] = useState(initialSignupForm)
  const [authFeedback, setAuthFeedback] = useState({
    message: '',
    tone: 'neutral',
  })

  const selectedSetup =
    setups.find((setup) => setup.id === bookingForm.setupId) ?? setups[0]
  const selectedSlot =
    timeSlots.find((slot) => slot.id === bookingForm.slotId) ?? timeSlots[0]
  const selectedTournament =
    tournaments.find((tournament) => tournament.id === selectedTournamentId) ?? tournaments[0]

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

  const seededTournamentEntries =
    profile.id === defaultProfile.id ? userDashboardSeed.tournaments : []

  const dashboardBookings = bookingConfirmation
    ? [
        {
          id: bookingConfirmation.id,
          setup: bookingConfirmation.setup,
          date: bookingConfirmation.dateLabel,
          slot: bookingConfirmation.slotLabel,
          status: 'Just booked',
          total: `Rs.${bookingConfirmation.total}`,
        },
        ...userDashboardSeed.bookings,
      ]
    : userDashboardSeed.bookings

  const dashboardTournaments = [...tournamentRegistrations, ...seededTournamentEntries]

  const dashboardData = {
    ...userDashboardSeed,
    stats: [
      { label: 'Active bookings', value: formatMetricValue(dashboardBookings.length) },
      { label: 'Tournament entries', value: formatMetricValue(dashboardTournaments.length) },
      userDashboardSeed.stats[2],
      userDashboardSeed.stats[3],
    ],
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
      ...userDashboardSeed.paymentHistory,
    ],
  }

  const scrollToHomeSection = useEffectEvent((sectionId) => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return
    }

    const target = document.getElementById(sectionId)

    if (!target) {
      return
    }

    const headerOffset = 128
    const targetOffset = target.getBoundingClientRect().top + window.scrollY - headerOffset

    window.scrollTo({
      top: Math.max(targetOffset, 0),
      behavior: 'smooth',
    })
  })

  useEffect(() => {
    if (deferredView !== 'home' || !pendingSection || typeof window === 'undefined') {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      scrollToHomeSection(pendingSection)
      setPendingSection(null)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [deferredView, pendingSection])

  useEffect(() => {
    if (!isLoggedIn || !profile.id) {
      return
    }

    let isCancelled = false

    async function loadRegistrations() {
      const savedRegistrations = await fetchTournamentRegistrations(profile.id)

      if (!isCancelled) {
        setTournamentRegistrations(savedRegistrations)
      }
    }

    loadRegistrations()

    return () => {
      isCancelled = true
    }
  }, [isLoggedIn, profile.id])

  useEffect(() => {
    const isAnyTournamentModalOpen =
      showTournamentAuthPrompt || isTournamentModalOpen || isTournamentSuccessOpen

    if (!isAnyTournamentModalOpen || typeof document === 'undefined' || typeof window === 'undefined') {
      return
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    function handleEscapeKey(event) {
      if (event.key !== 'Escape') {
        return
      }

      if (isTournamentSuccessOpen) {
        setIsTournamentSuccessOpen(false)
        return
      }

      if (isTournamentModalOpen) {
        setIsTournamentModalOpen(false)
        setTournamentErrorMessage('')
        return
      }

      if (showTournamentAuthPrompt) {
        setShowTournamentAuthPrompt(false)
        setPendingTournamentIntent(null)
      }
    }

    window.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscapeKey)
    }
  }, [showTournamentAuthPrompt, isTournamentModalOpen, isTournamentSuccessOpen])

  function handleNavigate(viewId, options = {}) {
    const nextSectionId = options.sectionId ?? null

    setPendingSection(nextSectionId)
    setAuthFeedback({
      message: '',
      tone: 'neutral',
    })

    startTransition(() => {
      setActiveView(viewId)
    })

    if (typeof window !== 'undefined' && !nextSectionId) {
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

  function openTournamentRegistration(tournamentId, profileSnapshot = profile) {
    setSelectedTournamentId(tournamentId)
    setShowTournamentAuthPrompt(false)
    setIsTournamentSuccessOpen(false)
    setTournamentErrorMessage('')
    setTournamentForm(createTournamentForm(profileSnapshot))
    setIsTournamentModalOpen(true)
  }

  function handleParticipateTournament(tournamentId) {
    setSelectedTournamentId(tournamentId)

    if (!isLoggedIn) {
      setPendingTournamentIntent({
        tournamentId,
        returnView: activeView,
      })
      setShowTournamentAuthPrompt(true)
      return
    }

    openTournamentRegistration(tournamentId)
  }

  function handleCloseTournamentAuthPrompt() {
    setShowTournamentAuthPrompt(false)
    setPendingTournamentIntent(null)
  }

  function handleTournamentAuthRedirect(targetView) {
    setShowTournamentAuthPrompt(false)
    handleNavigate(targetView)
  }

  function handleCloseTournamentRegistration() {
    setIsTournamentModalOpen(false)
    setTournamentErrorMessage('')
  }

  async function handleRegisterTournament() {
    const teamName = tournamentForm.teamName.trim()
    const captainName = tournamentForm.captainName.trim()
    const mobileNumber = tournamentForm.mobileNumber.trim()
    const gameId = tournamentForm.gameId.trim()

    if (!teamName || !captainName || !mobileNumber || !gameId) {
      setTournamentErrorMessage('Please complete all required registration fields.')
      return
    }

    if (mobileNumber.replace(/\D/g, '').length < 10) {
      setTournamentErrorMessage('Please enter a valid mobile number for the captain.')
      return
    }

    if (!tournamentForm.agreeToRules) {
      setTournamentErrorMessage('Please agree to the tournament rules and regulations to continue.')
      return
    }

    setIsTournamentSubmitting(true)
    setTournamentErrorMessage('')

    try {
      const registration = await registerTournamentEntry(
        {
          userId: profile.id,
          tournamentId: selectedTournament.id,
          teamName,
          captainName,
          mobileNumber,
          gameId,
          agreeToRules: tournamentForm.agreeToRules,
          profile: {
            fullName: profile.fullName,
            gamerTag: profile.gamerTag,
            email: profile.email,
            phone: profile.phone,
          },
        },
        selectedTournament,
      )

      setTournamentRegistrations((current) => [
        registration,
        ...current.filter((item) => item.id !== registration.id),
      ])
      setLatestTournamentRegistration(registration)
      setIsTournamentModalOpen(false)
      setIsTournamentSuccessOpen(true)
      setTournamentForm(createTournamentForm(profile))
    } catch (error) {
      setTournamentErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to submit registration right now. Please try again.',
      )
    } finally {
      setIsTournamentSubmitting(false)
    }
  }

  function handleViewMyTournaments() {
    setIsTournamentSuccessOpen(false)
    handleNavigate('dashboard')
  }

  function handleProfileChange(field, value) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleLoginField(field, value) {
    setLoginForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleSignupField(field, value) {
    setSignupForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function resumePendingTournamentFlow(nextProfile) {
    const pendingIntent = pendingTournamentIntent

    if (pendingIntent) {
      setPendingTournamentIntent(null)
      handleNavigate(pendingIntent.returnView)
      openTournamentRegistration(pendingIntent.tournamentId, nextProfile)
      return
    }

    handleNavigate('dashboard')
  }

  function handleLogin() {
    const identity = loginForm.identity.trim()
    const password = loginForm.password.trim()

    if (!identity || !password) {
      setAuthFeedback({
        message: 'Enter your email or mobile number and password to continue.',
        tone: 'error',
      })
      return
    }

    const isDefaultAccount =
      identity.toLowerCase() === defaultProfile.email.toLowerCase() || identity === defaultProfile.phone

    const nextProfile = {
      ...profile,
      id: isDefaultAccount ? defaultProfile.id : createUserId(identity),
      email: identity.includes('@') ? identity : profile.email,
      phone: identity.includes('@') ? profile.phone : identity,
    }

    setProfile(nextProfile)
    setIsLoggedIn(true)
    setAuthFeedback({
      message: '',
      tone: 'neutral',
    })
    setLoginForm(initialLoginForm)
    resumePendingTournamentFlow(nextProfile)
  }

  function handleSignup() {
    const fullName = signupForm.fullName.trim()
    const username = signupForm.username.trim()
    const email = signupForm.email.trim()
    const phone = signupForm.phone.trim()
    const password = signupForm.password.trim()
    const confirmPassword = signupForm.confirmPassword.trim()

    if (!fullName || !username || !email || !phone || !password || !confirmPassword) {
      setAuthFeedback({
        message: 'Complete the signup form before creating your account.',
        tone: 'error',
      })
      return
    }

    if (password !== confirmPassword) {
      setAuthFeedback({
        message: 'Password and confirm password must match.',
        tone: 'error',
      })
      return
    }

    const nextProfile = {
      ...profile,
      id: createUserId(username || email),
      fullName,
      gamerTag: username,
      email,
      phone,
      city: signupForm.city.trim() || profile.city,
    }

    setProfile(nextProfile)
    setIsLoggedIn(true)
    setAuthFeedback({
      message: '',
      tone: 'neutral',
    })
    setSignupForm(initialSignupForm)
    resumePendingTournamentFlow(nextProfile)
  }

  function renderView() {
    if (deferredView === 'setups') {
      return (
        <SetupView
          setups={setups}
          pricing={hourlyPricing}
          onNavigate={handleNavigate}
          onSelectSetup={(setupId) => handleBookingField('setupId', setupId)}
        />
      )
    }

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
          onParticipateTournament={handleParticipateTournament}
        />
      )
    }

    if (deferredView === 'pricing') {
      return (
        <PricingView
          pricingMatrix={pricingMatrix}
          hourlyPricing={hourlyPricing}
          onNavigate={handleNavigate}
        />
      )
    }

    if (deferredView === 'gallery') {
      return <GalleryView gallery={gallery} onNavigate={handleNavigate} />
    }

    if (deferredView === 'login') {
      return (
        <AuthView
          mode="login"
          loginForm={loginForm}
          signupForm={signupForm}
          feedbackMessage={authFeedback.message}
          feedbackTone={authFeedback.tone}
          contextNote={
            pendingTournamentIntent
              ? `Login to continue your ${selectedTournament.title} registration.`
              : ''
          }
          onLoginField={handleLoginField}
          onSignupField={handleSignupField}
          onSubmitLogin={handleLogin}
          onSubmitSignup={handleSignup}
          onNavigate={handleNavigate}
        />
      )
    }

    if (deferredView === 'signup') {
      return (
        <AuthView
          mode="signup"
          loginForm={loginForm}
          signupForm={signupForm}
          feedbackMessage={authFeedback.message}
          feedbackTone={authFeedback.tone}
          contextNote={
            pendingTournamentIntent
              ? `Create your account to continue your ${selectedTournament.title} registration.`
              : ''
          }
          onLoginField={handleLoginField}
          onSignupField={handleSignupField}
          onSubmitLogin={handleLogin}
          onSubmitSignup={handleSignup}
          onNavigate={handleNavigate}
        />
      )
    }

    if (deferredView === 'dashboard') {
      return (
        <UserDashboardView
          dashboard={dashboardData}
          bookings={dashboardBookings}
          tournaments={dashboardTournaments}
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
          latestTournamentRegistration={latestTournamentRegistration}
        />
      )
    }

    return (
      <HomeView
        tournaments={tournaments}
        offers={offers}
        gallery={gallery}
        contact={contactDetails}
        setups={setups}
        pricingMatrix={pricingMatrix}
        footerLinks={footerLinks}
        socialLinks={socialLinks}
        onNavigate={handleNavigate}
        onSelectSetup={(setupId) => handleBookingField('setupId', setupId)}
        onParticipateTournament={handleParticipateTournament}
      />
    )
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-left"></div>
      <div className="ambient ambient-right"></div>
      <CursorEffect />
      <Navigation
        activeView={activeView}
        isLoggedIn={isLoggedIn}
        profile={profile}
        onNavigate={handleNavigate}
      />
      <main>
        <div key={deferredView} className="page-transition-shell" data-view={deferredView}>
          {renderView()}
        </div>
      </main>

      {showTournamentAuthPrompt ? (
        <TournamentAuthPromptModal
          tournament={selectedTournament}
          onClose={handleCloseTournamentAuthPrompt}
          onLogin={() => handleTournamentAuthRedirect('login')}
          onCreateAccount={() => handleTournamentAuthRedirect('signup')}
        />
      ) : null}

      {isTournamentModalOpen ? (
        <TournamentRegistrationModal
          tournament={selectedTournament}
          form={tournamentForm}
          errorMessage={tournamentErrorMessage}
          isSubmitting={isTournamentSubmitting}
          onChange={handleTournamentField}
          onClose={handleCloseTournamentRegistration}
          onSubmit={handleRegisterTournament}
        />
      ) : null}

      {isTournamentSuccessOpen ? (
        <TournamentSuccessModal
          registration={latestTournamentRegistration}
          onClose={() => setIsTournamentSuccessOpen(false)}
          onViewTournaments={handleViewMyTournaments}
        />
      ) : null}
    </div>
  )
}

export default App
