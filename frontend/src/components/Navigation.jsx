import alphaLogoPremium from '../assets/gaming/alpha-logo-premium.png'

const navItems = [
  { id: 'home', label: 'Home', view: 'home', sectionId: 'home' },
  { id: 'gaming-setup', label: 'Gaming Setup', view: 'home', sectionId: 'gaming-setups' },
  { id: 'book-slot', label: 'Book Slot', view: 'booking' },
  { id: 'tournament', label: 'Tournament', view: 'home', sectionId: 'tournament-section' },
  { id: 'pricing', label: 'Pricing', view: 'pricing' },
  { id: 'gallery', label: 'Gallery', view: 'gallery' },
]

function getProfileInitials(profile) {
  const source = profile.fullName?.trim() || profile.gamerTag?.trim() || 'AG'
  const parts = source.split(/\s+/).filter(Boolean)

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
}

function isItemActive(itemId, activeView) {
  if (itemId === 'book-slot') {
    return activeView === 'booking'
  }

  if (itemId === 'gaming-setup') {
    return activeView === 'setups'
  }

  if (itemId === 'tournament') {
    return activeView === 'tournaments'
  }

  if (itemId === 'pricing') {
    return activeView === 'pricing'
  }

  if (itemId === 'gallery') {
    return activeView === 'gallery'
  }

  return activeView === 'home' && itemId === 'home'
}

function Navigation({ activeView, onNavigate, profile }) {
  const initials = getProfileInitials(profile)

  return (
    <header className="alpha-header-shell">
      <div className="alpha-header">
        <button
          type="button"
          className="alpha-brand-lockup"
          onClick={() => onNavigate('home', { sectionId: 'home' })}
        >
          <span className="alpha-logo-shell alpha-logo-shell-sm">
            <img src={alphaLogoPremium} alt="Alpha Gaming logo" className="alpha-brand-logo" />
          </span>
          <span className="alpha-brand-copy">
            <strong>ALPHA GAMING</strong>
            <small>The Zone of Legends</small>
          </span>
        </button>

        <nav className="alpha-nav-menu" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={isItemActive(item.id, activeView) ? 'alpha-nav-link active' : 'alpha-nav-link'}
              onClick={() => onNavigate(item.view, item.sectionId ? { sectionId: item.sectionId } : {})}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="alpha-nav-actions">
          <button type="button" className="alpha-login-button" onClick={() => onNavigate('dashboard')}>
            Login
          </button>
          <button type="button" className="alpha-signup-button" onClick={() => onNavigate('dashboard')}>
            Sign Up
          </button>
          <button
            type="button"
            className={activeView === 'dashboard' ? 'alpha-profile-avatar active' : 'alpha-profile-avatar'}
            onClick={() => onNavigate('dashboard')}
            aria-label="Open profile dashboard"
          >
            {initials}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navigation
