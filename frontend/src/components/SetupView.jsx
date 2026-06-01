import SectionHeading from './SectionHeading'

function SetupView({ setups, pricing, onNavigate, onSelectSetup }) {
  return (
    <div className="view-stack">
      <section className="setup-hero-panel glass-panel">
        <div className="setup-hero-copy">
          <span className="section-eyebrow">Gaming setup showcase</span>
          <h2>Pick your arena lane, lock your gear, and step into a premium play environment.</h2>
          <p>
            From cinematic PS5 sessions to esports-grade PC grinds, every room is tuned
            with lounge lighting, responsive peripherals, and a high-end esports finish.
          </p>
          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={() => onNavigate('booking')}>
              Select Date and Time
            </button>
            <button type="button" className="secondary-button" onClick={() => onNavigate('tournaments')}>
              Explore Tournaments
            </button>
          </div>
        </div>

        <div className="setup-signal-grid">
          {setups.map((setup) => (
            <button
              key={setup.id}
              type="button"
              className="setup-signal-card"
              onClick={() => {
                onSelectSetup(setup.id)
                onNavigate('booking')
              }}
            >
              <span className="accent-badge">{setup.shortLabel}</span>
              <strong>{setup.name}</strong>
              <p>{setup.availability}</p>
              <span className="signal-price">Rs.{setup.price}/hr</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="Arena lineup"
          title="Four signature environments designed for every kind of player."
          description="Each setup is ready for walk-ins, squads, creator sessions, and tournament warmups."
        />
        <div className="setup-grid">
          {setups.map((setup) => (
            <article key={setup.id} className="glass-card setup-card">
              <img src={setup.image} alt={setup.name} className="setup-image" />
              <div className="setup-card-content">
                <div className="card-topline">
                  <span className="accent-badge">{setup.badge}</span>
                  <span className="muted-copy">{setup.playersRange}</span>
                </div>
                <h3>{setup.name}</h3>
                <p>{setup.headline}</p>
                <ul className="feature-list">
                  {setup.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="card-footer">
                  <strong>Rs.{setup.price}/hr</strong>
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => {
                      onSelectSetup(setup.id)
                      onNavigate('booking')
                    }}
                  >
                    Reserve this setup
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="Booking packages"
          title="Premium pricing built for quick sessions, squads, and long-haul grinds."
          description="Every package plugs directly into the booking flow so players can move from browse to checkout fast."
        />
        <div className="pricing-grid">
          {pricing.map((plan) => (
            <article key={plan.name} className="glass-card pricing-card">
              <span className="accent-badge">{plan.highlight}</span>
              <h3>{plan.name}</h3>
              <strong className="pricing-rate">{plan.rate}</strong>
              <p>{plan.summary}</p>
              <button type="button" className="secondary-button" onClick={() => onNavigate('booking')}>
                Book Slot
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="glass-panel loadout-panel">
          <div className="loadout-copy">
            <span className="section-eyebrow">Why players upgrade here</span>
            <h3>Every lane is tuned for comfort, spectacle, and competitive focus.</h3>
            <p>
              Neon ambience, calibrated audio, tournament-grade connectivity, and a
              hospitality-first team make the setup feel elevated before the match even starts.
            </p>
          </div>
          <div className="loadout-points">
            <div className="signal-chip">Instant booking confirmation</div>
            <div className="signal-chip">240Hz competitive bays</div>
            <div className="signal-chip">VR-ready motion zones</div>
            <div className="signal-chip">Triple-screen sim cockpit</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SetupView
