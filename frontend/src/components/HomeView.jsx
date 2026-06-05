import SectionHeading from './SectionHeading'
import heroGamingZoneBanner from '../assets/gaming/hero-gaming-zone-banner.png'
import alphaCrest from '../assets/gaming/alpha-crest.svg'

function HomeView({
  tournaments,
  offers,
  gallery,
  contact,
  setups,
  whyChoose,
  pricingMatrix,
  reviews,
  footerLinks,
  socialLinks,
  onNavigate,
  onSelectSetup,
  onSelectTournament,
}) {
  return (
    <div className="alpha-home">
      <section id="home" className="alpha-hero-section">
        <div className="alpha-hero-banner">
          <img
            src={heroGamingZoneBanner}
            alt="Alpha Gaming lounge banner"
            className="alpha-hero-banner-image"
          />
        </div>
      </section>

      <section id="gaming-setups" className="section-block">
        <SectionHeading
          eyebrow="Featured gaming setups"
          title="Six premium play zones crafted for console rivals, esports grinders, and immersive group nights."
          description="Every setup is wrapped in soft blur lighting, high-end hardware, and a lounge-first experience."
        />

        <div className="alpha-setup-grid">
          {setups.map((setup) => (
            <article key={setup.id} className="alpha-setup-card glass-card">
              <div className="alpha-setup-media">
                <img src={setup.image} alt={setup.name} className="setup-image" />
                <span className="alpha-price-pill">Rs.{setup.price}/hr</span>
              </div>

              <div className="alpha-setup-content">
                <div className="card-topline">
                  <span className="accent-badge">{setup.shortLabel}</span>
                  <span className="muted-copy">{setup.capacityLabel}</span>
                </div>
                <h3>{setup.name}</h3>
                <p>{setup.headline}</p>

                <div className="alpha-setup-meta">
                  <span>{setup.playersRange}</span>
                  <span>{setup.availability}</span>
                </div>

                <button
                  type="button"
                  className="primary-button full-width"
                  onClick={() => {
                    onSelectSetup(setup.id)
                    onNavigate('booking')
                  }}
                >
                  Book Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="tournament-section" className="section-block">
        <SectionHeading
          eyebrow="Upcoming tournaments"
          title="From mobile battle royale nights to tactical PC cups, the competitive stage stays live."
          description="Secure your slot, warm up in the lounge, and step into events built for hype, prizes, and elite atmosphere."
        />

        <div className="alpha-tournament-grid">
          {tournaments.map((tournament) => (
            <article key={tournament.id} className="alpha-tournament-card glass-card">
              <img src={tournament.image} alt={tournament.title} className="tournament-image" />

              <div className="tournament-copy">
                <div className="card-topline">
                  <span className="accent-badge">{tournament.mode}</span>
                  <span className="muted-copy">{tournament.spots}</span>
                </div>
                <h3>{tournament.title}</h3>
                <p>{tournament.summary}</p>

                <div className="alpha-tournament-meta">
                  <div>
                    <span>Entry fee</span>
                    <strong>Rs.{tournament.fee}</strong>
                  </div>
                  <div>
                    <span>Prize pool</span>
                    <strong>{tournament.prize}</strong>
                  </div>
                  <div>
                    <span>Date and time</span>
                    <strong>
                      {tournament.date} at {tournament.time}
                    </strong>
                  </div>
                  <div>
                    <span>Remaining slots</span>
                    <strong>{tournament.spots}</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="primary-button full-width"
                  onClick={() => {
                    onSelectTournament(tournament.id)
                    onNavigate('tournaments')
                  }}
                >
                  Participate Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="Why choose Alpha Gaming"
          title="Designed like a premium esports lounge, not a generic gaming cafe."
          description="Comfort, speed, visual polish, and modern gaming hardware come together for a high-end social experience."
        />

        <div className="alpha-feature-grid">
          {whyChoose.map((feature) => (
            <article key={feature.id} className="alpha-feature-card glass-card">
              <span className="alpha-feature-tag">{feature.tag}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing-section" className="section-block">
        <div className="glass-panel alpha-pricing-panel">
          <SectionHeading
            eyebrow="Pricing"
            title="Transparent premium pricing for every style of play."
            description="Choose your lane, lock your time, and move from discovery to booking in one sleek flow."
            align="center"
          />

          <div className="alpha-pricing-table">
            {pricingMatrix.map((plan) => (
              <article key={plan.name} className="alpha-pricing-row">
                <div>
                  <h3>{plan.name}</h3>
                  <p>{plan.summary}</p>
                </div>
                <strong>{plan.rate}</strong>
              </article>
            ))}
          </div>

          <div className="alpha-pricing-cta">
            <button type="button" className="secondary-button" onClick={() => onNavigate('setups')}>
              View Full Pricing
            </button>
          </div>
        </div>
      </section>

      <section id="gallery-section" className="section-block">
        <SectionHeading
          eyebrow="Gallery"
          title="A cinematic gaming zone that looks as sharp on camera as it feels in person."
          description="Browse tournament moments, premium setups, and lounge corners built for standout nights."
        />

        <div className="alpha-gallery-grid">
          {gallery.map((item) => (
            <figure key={item.title} className="alpha-gallery-tile">
              <img src={item.image} alt={item.title} />
              <figcaption>{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="alpha-split-showcase">
        <div className="section-block">
          <SectionHeading
            eyebrow="Customer reviews"
            title="Five-star reactions from players who came for one match and stayed for the vibe."
            description="The glow, comfort, and competitive energy keep players coming back for more."
          />

          <div className="alpha-review-grid">
            {reviews.map((review) => (
              <article key={review.id} className="alpha-review-card glass-card">
                <span className="alpha-review-score">5-Star Review</span>
                <h3>{review.title}</h3>
                <p>{review.quote}</p>
                <div className="alpha-review-author">
                  <strong>{review.author}</strong>
                  <span>{review.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="section-block">
          <SectionHeading
            eyebrow="Special offers"
            title="Premium perks crafted for first-timers, weekend squads, and tournament regulars."
            description="Use these offers to unlock more play time, better value, and faster entry into featured events."
          />

          <div className="alpha-offer-grid">
            {offers.map((offer) => (
              <article key={offer.title} className="alpha-offer-card glass-card">
                <span className="accent-badge">{offer.badge}</span>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-section" className="alpha-contact-section">
        <div className="glass-panel alpha-contact-panel">
          <SectionHeading
            eyebrow="Contact"
            title="Reserve your next session, ping the team, or navigate straight to the arena."
            description="Everything you need to connect with Alpha Gaming is right here, from WhatsApp booking to maps and opening hours."
          />

          <div className="alpha-contact-actions">
            <a
              className="primary-button alpha-button-link"
              href={contact.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a className="secondary-button alpha-button-link" href={contact.phoneHref}>
              Call Now
            </a>
            <a
              className="secondary-button alpha-button-link"
              href={contact.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Google Maps
            </a>
          </div>

          <div className="alpha-contact-grid">
            <article className="alpha-contact-card">
              <span className="label-copy">Address</span>
              <strong>{contact.address}</strong>
              <p>{contact.mapNote}</p>
            </article>

            <article className="alpha-contact-card">
              <span className="label-copy">Opening hours</span>
              <strong>{contact.hours}</strong>
              <p>{contact.hoursList.join(' | ')}</p>
            </article>

            <article className="alpha-contact-card">
              <span className="label-copy">Call us</span>
              <strong>{contact.phone}</strong>
              <p>{contact.email}</p>
            </article>
          </div>
        </div>

        <div className="glass-card alpha-map-card">
          <span className="section-eyebrow">Arena location</span>
          <h3>Find the Alpha Gaming lounge</h3>
          <iframe
            title="Alpha Gaming location map"
            src={contact.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <footer id="footer-section" className="alpha-footer glass-panel">
        <div className="alpha-footer-brand">
          <span className="alpha-logo-shell alpha-logo-shell-md">
            <img src={alphaCrest} alt="Alpha Gaming crest" className="alpha-footer-logo" />
          </span>
          <div>
            <p className="alpha-hero-brand">ALPHA GAMING</p>
            <h3>The Zone of Legends</h3>
            <p>
              Premium gaming atmosphere, high-end setups, and tournament nights designed
              to feel unforgettable.
            </p>
          </div>
        </div>

        <div className="alpha-footer-links">
          {footerLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              className="alpha-footer-link"
              onClick={() => onNavigate('home', { sectionId: link.sectionId })}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="alpha-footer-social">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default HomeView
