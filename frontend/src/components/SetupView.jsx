import SectionHeading from './SectionHeading'

function SetupView({ setups, onNavigate, onSelectSetup }) {
  return (
    <div className="view-stack">
      <section className="section-block">
        <SectionHeading
          eyebrow="Gaming setups"
          title="Choose your game setup."
          description="Pick any setup card below and move straight into booking."
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
    </div>
  )
}

export default SetupView
