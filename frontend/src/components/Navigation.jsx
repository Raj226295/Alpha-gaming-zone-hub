import { viewTabs } from '../data/siteData'
import alphaCrest from '../assets/gaming/alpha-crest.svg'

function Navigation({ activeView, onNavigate }) {
  return (
    <header className="site-header">
      <div className="brand-lockup">
        <img src={alphaCrest} alt="Alpha Gaming crest" className="brand-logo" />
        <div>
          <p className="brand-kicker">Premium esports arena</p>
          <h1>Alpha Game Zone</h1>
        </div>
      </div>

      <div className="nav-glass-shell">
        <nav className="top-nav" aria-label="Primary navigation">
          {viewTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={tab.id === activeView ? 'nav-chip active' : 'nav-chip'}
              onClick={() => onNavigate(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="header-status">
        <span className="status-dot"></span>
        <div>
          <p className="brand-kicker">Slots live</p>
          <strong>Open till 1:30 AM</strong>
        </div>
      </div>
    </header>
  )
}

export default Navigation
