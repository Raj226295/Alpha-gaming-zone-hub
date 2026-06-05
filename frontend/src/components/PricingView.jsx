import SectionHeading from './SectionHeading'

function PricingView({ pricingMatrix, hourlyPricing, onNavigate }) {
  return (
    <div className="alpha-home alpha-subview">
      <section className="glass-panel alpha-focus-panel">
        <div className="alpha-focus-copy">
          <span className="section-eyebrow">Pricing overview</span>
          <h2>Clear rates, cleaner layout, and faster decisions.</h2>
          <p>
            Pricing now lives in its own screen so the homepage stays focused on setups,
            tournaments, and quick booking.
          </p>
        </div>

        <div className="alpha-focus-actions">
          <button type="button" className="primary-button" onClick={() => onNavigate('booking')}>
            Book Slot
          </button>
          <button type="button" className="secondary-button" onClick={() => onNavigate('home')}>
            Back Home
          </button>
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="Hourly rates"
          title="Choose the setup that fits your mood, squad size, and session length."
          description="Straightforward pricing for console, PC, VR, and simulator sessions without crowding the landing page."
        />

        <div className="glass-panel alpha-pricing-panel">
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
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="Session bundles"
          title="Longer plays and squad sessions with better value."
          description="Useful for weekend groups, practice runs, and extended night grinds."
        />

        <div className="alpha-rate-grid">
          {hourlyPricing.map((plan) => (
            <article key={plan.name} className="glass-card alpha-rate-card">
              <span className="accent-badge">{plan.highlight}</span>
              <h3>{plan.name}</h3>
              <strong>{plan.rate}</strong>
              <p>{plan.summary}</p>
              <button type="button" className="secondary-button" onClick={() => onNavigate('booking')}>
                Continue to Booking
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default PricingView
