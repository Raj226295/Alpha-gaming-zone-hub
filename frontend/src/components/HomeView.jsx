import SectionHeading from './SectionHeading'
import alphaCrest from '../assets/gaming/alpha-crest.svg'

function HomeView({
  heroStats,
  setups,
  pricing,
  tournaments,
  offers,
  gallery,
  contact,
  onNavigate,
  onSelectSetup,
}) {
  return (
    <div className="view-stack">
      <section className="hero-panel glass-panel">
        <div className="hero-copy">
          <span className="section-eyebrow">Futuristic gaming lounge</span>
          <div className="hero-logo-row">
            <img src={alphaCrest} alt="Alpha Gaming logo" className="hero-brand-mark" />
            <div className="hero-brand-copy">
              <span>Play</span>
              <span>Compete</span>
              <span>Conquer</span>
            </div>
          </div>
          <h2>Premium booking, esports nights, and late-hour neon energy in one arena.</h2>
          <p>
            Launch console sessions, VR adventures, creator nights, and tournament
            registrations from a single high-end booking experience built for players who
            care about atmosphere as much as performance.
          </p>
          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={() => onNavigate('booking')}>
              Book Slot
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => onNavigate('tournaments')}
            >
              Upcoming Tournaments
            </button>
          </div>
          <div className="hero-stats">
            {heroStats.map((stat) => (
              <div key={stat.label} className="stat-pill">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <img src={gallery[0].image} alt="Premium gaming lounge hero setup" />
          <img src={alphaCrest} alt="" aria-hidden="true" className="hero-banner-logo" />
          <div className="floating-card card-left">
            <span>Today&apos;s hot lane</span>
            <strong>Racing Simulator</strong>
            <p>Only 6 prime slots left</p>
          </div>
          <div className="floating-card card-right">
            <span>Tonight at 8 PM</span>
            <strong>Valorant Neon Clash</strong>
            <p>Stage check-in opens in 2 hours</p>
          </div>
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="Setup showcase"
          title="Choose the arena that matches your play style."
          description="Every bay is tuned with lounge lighting, responsive peripherals, and a premium comfort-first layout."
        />
        <div className="setup-grid">
          {setups.map((setup) => (
            <article key={setup.id} className="glass-card setup-card">
              <img src={setup.image} alt={setup.name} className="setup-image" />
              <div className="setup-card-content">
                <div className="card-topline">
                  <span className="accent-badge">{setup.badge}</span>
                  <span className="muted-copy">{setup.availability}</span>
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
          eyebrow="Hourly pricing"
          title="Flexible packages for walk-ins, squads, and grind sessions."
          description="Transparent pricing with clear perks, controller add-ons, and tournament-ready extras."
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
        <SectionHeading
          eyebrow="Tournament pulse"
          title="Upcoming competitions with prize pools, live casting, and instant registration."
          description="From tactical shooters to football finals and sim-racing qualifiers, the stage is always active."
        />
        <div className="tournament-preview-grid">
          {tournaments.map((tournament) => (
            <article key={tournament.id} className="glass-card tournament-card">
              <img src={tournament.image} alt={tournament.title} className="tournament-image" />
              <div className="tournament-copy">
                <div className="card-topline">
                  <span className="accent-badge">{tournament.mode}</span>
                  <span className="muted-copy">{tournament.date}</span>
                </div>
                <h3>{tournament.title}</h3>
                <p>{tournament.summary}</p>
                <div className="detail-row">
                  <span>{tournament.prize}</span>
                  <span>{tournament.spots}</span>
                </div>
                <button type="button" className="primary-button" onClick={() => onNavigate('tournaments')}>
                  Participate Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block two-column-layout">
        <div>
          <SectionHeading
            eyebrow="Special offers"
            title="Curated perks for squads, streamers, and celebration nights."
            description="These offers rotate weekly and feed directly into the booking flow."
          />
          <div className="offer-list">
            {offers.map((offer) => (
              <article key={offer.title} className="glass-card offer-card">
                <span className="accent-badge">{offer.badge}</span>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Gallery"
            title="The lounge looks as sharp in person as it does on stream."
            description="Explore our premium corners, competitive pits, and post-match hangout zones."
          />
          <div className="gallery-grid">
            {gallery.map((item) => (
              <figure key={item.title} className="gallery-tile">
                <img src={item.image} alt={item.title} />
                <figcaption>{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block contact-block glass-panel">
        <div>
          <SectionHeading
            eyebrow="Contact and location"
            title="Find the arena, reserve your session, and drop into the glow."
            description="The venue is built for walk-ins and online reservations, with food, parking, and late-night access."
          />
          <div className="contact-list">
            <div>
              <span className="label-copy">Address</span>
              <p>{contact.address}</p>
            </div>
            <div>
              <span className="label-copy">Call</span>
              <p>{contact.phone}</p>
            </div>
            <div>
              <span className="label-copy">Email</span>
              <p>{contact.email}</p>
            </div>
            <div>
              <span className="label-copy">Hours</span>
              <p>{contact.hours}</p>
            </div>
          </div>
        </div>

        <div className="map-card glass-card">
          <span className="section-eyebrow">Arena map</span>
          <h3>Cyber Avenue, Lucknow</h3>
          <p>{contact.mapNote}</p>
          <div className="map-grid">
            <div>Metro line</div>
            <div>Valet drop</div>
            <div>Food court</div>
            <div>VIP entry</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomeView
