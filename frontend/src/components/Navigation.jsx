import { primaryNavItems } from '../data/siteData'
import alphaCrest from '../assets/gaming/alpha-crest.svg'

const promoMessages = [
  'PS5 Room bookings starting from Rs.499/hr',
  'Tournament registrations are live for June weekends',
  'VR and racing simulator prime slots filling fast',
]

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5.5h-5V21H5a1 1 0 0 1-1-1z" />
    </svg>
  )
}

function SetupIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 7.5h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2.5l-2.5 2-2.5-2H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z" />
      <path d="M8.5 12h2m3 0h2" />
    </svg>
  )
}

function BookingIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4.5V7m10-2.5V7M5 8.5h14M6 5.5h12a1.5 1.5 0 0 1 1.5 1.5v10A1.5 1.5 0 0 1 18 18.5H6A1.5 1.5 0 0 1 4.5 17V7A1.5 1.5 0 0 1 6 5.5Z" />
      <path d="m9 13 1.8 1.8L15 10.5" />
    </svg>
  )
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5h8v2.5a4 4 0 0 1-8 0Z" />
      <path d="M8 6H5.5A1.5 1.5 0 0 0 4 7.5v.5A4 4 0 0 0 8 12m8-6h2.5A1.5 1.5 0 0 1 20 7.5v.5A4 4 0 0 1 16 12" />
      <path d="M12 11.5V15m-3 4.5h6m-5-2h4" />
    </svg>
  )
}

const iconMap = {
  home: HomeIcon,
  setups: SetupIcon,
  booking: BookingIcon,
  tournaments: TrophyIcon,
}

function getProfileInitials(profile) {
  const source = profile.fullName?.trim() || profile.gamerTag?.trim() || 'AG'
  const parts = source.split(/\s+/).filter(Boolean)

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
}

function Navigation({ activeView, onNavigate, profile }) {
  const initials = getProfileInitials(profile)

  return (
    <>
      <div className="promo-strip" aria-label="Latest offers">
        <div className="promo-marquee">
          {[...promoMessages, ...promoMessages].map((message, index) => (
            <span key={`${message}-${index}`}>{message}</span>
          ))}
        </div>
      </div>

      <header className="site-header">
        <div className="brand-lockup">
          <img src={alphaCrest} alt="Alpha Gaming crest" className="brand-logo" />
          <div className="brand-copy">
            <p className="brand-kicker">Alpha gaming zone</p>
            <h1>Alpha Gaming Zone</h1>
            <p className="brand-subcopy">Premium lounge booking, esports events, and high-end gaming setups.</p>
          </div>
        </div>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryNavItems.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={tab.id === activeView ? 'desktop-nav-link active' : 'desktop-nav-link'}
              onClick={() => onNavigate(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="masthead-actions">
          <div className="header-status">
            <span className="status-dot"></span>
            <div>
              <p className="brand-kicker">Today</p>
              <strong>Open till 1:30 AM</strong>
            </div>
          </div>

          <button
            type="button"
            className={activeView === 'admin' ? 'ops-console active' : 'ops-console'}
            onClick={() => onNavigate('admin')}
          >
            <span>Operations</span>
            <strong>Control Room</strong>
          </button>

          <button
            type="button"
            className={activeView === 'dashboard' ? 'header-avatar active' : 'header-avatar'}
            onClick={() => onNavigate('dashboard')}
            aria-label="Open account"
          >
            {initials}
          </button>
        </div>
      </header>

      <div className="bottom-nav-dock">
        <nav className="bottom-nav" aria-label="Primary navigation">
          {primaryNavItems.map((tab) => {
            const isActive = tab.id === activeView
            const Icon = iconMap[tab.icon]

            return (
              <button
                key={tab.id}
                type="button"
                title={tab.summary}
                aria-label={tab.label}
                className={tab.id === 'dashboard'
                  ? isActive
                    ? 'dock-item dock-item-account active'
                    : 'dock-item dock-item-account'
                  : isActive
                    ? 'dock-item active'
                    : 'dock-item'}
                onClick={() => onNavigate(tab.id)}
              >
                <span className="dock-visual">
                  {tab.id === 'dashboard' ? (
                    <span className="profile-avatar" aria-hidden="true">
                      {initials}
                    </span>
                  ) : (
                    <span className="dock-icon" aria-hidden="true">
                      <Icon />
                    </span>
                  )}
                </span>
                <span className="dock-copy">
                  <strong>{tab.label}</strong>
                  <small>{tab.summary}</small>
                </span>
              </button>
            )
          })}
        </nav>
      </div>
    </>
  )
}

export default Navigation
