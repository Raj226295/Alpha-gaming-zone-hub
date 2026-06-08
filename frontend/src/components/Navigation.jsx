import alphaLogoNight from '../assets/gaming/alpha-logo-night.png'

const navItems = [
  { id: 'home', label: 'Home', view: 'home', sectionId: 'home' },
  { id: 'gaming-setup', label: 'Gaming Setup', view: 'setups' },
  { id: 'book-slot', label: 'Book Slot', view: 'booking' },
  { id: 'tournament', label: 'Tournament', view: 'tournaments' },
  { id: 'pricing', label: 'Pricing', view: 'pricing' },
  { id: 'gallery', label: 'Gallery', view: 'gallery' },
]

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

function Navigation({ activeView, isLoggedIn, onNavigate, profile }) {
  return (
    <header className="alpha-header-shell">
      <div className="alpha-header">
        <button
          type="button"
          className="alpha-brand-lockup"
          onClick={() => onNavigate('home', { sectionId: 'home' })}
        >
          <span className="alpha-logo-shell alpha-logo-shell-sm">
            <img src={alphaLogoNight} alt="Alpha Gaming logo" className="alpha-brand-logo" />
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
          {isLoggedIn ? <span className="status-pill nav-status-pill">{profile.gamerTag}</span> : null}
          <button
            type="button"
            className={
              activeView === (isLoggedIn ? 'dashboard' : 'login')
                ? 'alpha-login-button active'
                : 'alpha-login-button'
            }
            onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'login')}
          >
            {isLoggedIn ? 'My Account' : 'Login'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navigation
