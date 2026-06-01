import SectionHeading from './SectionHeading'
import heroAlphaBanner from '../assets/gaming/hero-alpha-banner.png'

function HomeView({
  heroStats,
  featuredGames,
  tournaments,
  offers,
  gallery,
  contact,
  onNavigate,
}) {
  return (
    <div className="view-stack">
      <section className="hero-poster-panel">
        <div className="hero-poster-frame">
          <img
            src={heroAlphaBanner}
            alt="Alpha Gaming Zone banner showcasing PS5 room, PC gaming, VR gaming, racing simulator, private room, and multiplayer cabin."
            className="hero-poster-image"
          />
        </div>

        <div className="hero-poster-actions">
          <div className="hero-poster-copy">
            <span className="section-eyebrow">Signature banner</span>
            <h2>The zone of legends is live at Alpha Gaming Zone.</h2>
            <p>
              Jump into premium setups, instant slot booking, and high-energy tournaments
              from one esports-first experience.
            </p>
          </div>

          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={() => onNavigate('booking')}>
              Book Now
            </button>
            <button type="button" className="secondary-button" onClick={() => onNavigate('setups')}>
              View Setups
            </button>
          </div>
        </div>
      </section>

      <section className="hero-stats-strip">
        {heroStats.map((stat) => (
          <div key={stat.label} className="stat-pill">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="Featured games"
          title="Headline experiences built for couch rivals, ranked grinders, and spectacle nights."
          description="These are the titles and formats that define the Alpha Gaming Zone energy right now."
        />
        <div className="featured-game-grid">
          {featuredGames.map((game) => (
            <article key={game.title} className="glass-card featured-game-card">
              <img src={game.image} alt={game.title} className="featured-game-image" />
              <div className="featured-game-content">
                <div className="card-topline">
                  <span className="accent-badge">{game.accent}</span>
                  <span className="muted-copy">{game.genre}</span>
                </div>
                <h3>{game.title}</h3>
                <p>{game.detail}</p>
                <button type="button" className="text-button" onClick={() => onNavigate('setups')}>
                  Match with a setup
                </button>
              </div>
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
