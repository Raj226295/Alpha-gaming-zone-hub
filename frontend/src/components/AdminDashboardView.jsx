import SectionHeading from './SectionHeading'

function AdminDashboardView({ admin, offers, setups, bookingConfirmation, latestTournamentRegistration }) {
  return (
    <div className="view-stack">
      <section className="section-block">
        <SectionHeading
          eyebrow="Admin dashboard"
          title="Monitor setup inventory, slot health, bookings, tournaments, participants, coupons, and revenue."
          description="This screen is structured like an operator cockpit so staff can react quickly during peak lounge hours."
        />
        <div className="metric-grid">
          {admin.analytics.map((metric) => (
            <article key={metric.label} className="glass-card metric-card">
              <span className="muted-copy">{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.trend}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block dashboard-grid">
        <div className="dashboard-column">
          <article className="glass-panel dashboard-panel">
            <h3>Management Modules</h3>
            <div className="module-grid">
              {admin.modules.map((module) => (
                <div key={module.title} className="glass-card module-card">
                  <h4>{module.title}</h4>
                  <p>{module.detail}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="glass-panel dashboard-panel">
            <h3>Gaming Setup Management</h3>
            <div className="stack-list">
              {setups.map((setup) => (
                <div key={setup.id} className="list-row">
                  <div>
                    <strong>{setup.name}</strong>
                    <p>{setup.availability}</p>
                  </div>
                  <div className="row-end">
                    <span className="status-pill">{setup.badge}</span>
                    <strong>Rs.{setup.price}/hr</strong>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="dashboard-column">
          <article className="glass-panel dashboard-panel">
            <h3>Live Activity Feed</h3>
            <div className="stack-list">
              {admin.recentActions.map((action) => (
                <div key={action} className="list-row solo-row">
                  <p>{action}</p>
                </div>
              ))}
              {bookingConfirmation ? (
                <div className="list-row solo-row">
                  <p>
                    New booking received: {bookingConfirmation.id} for {bookingConfirmation.setup} on{' '}
                    {bookingConfirmation.dateLabel}.
                  </p>
                </div>
              ) : null}
              {latestTournamentRegistration ? (
                <div className="list-row solo-row">
                  <p>
                    Tournament registration {latestTournamentRegistration.id} received for team{' '}
                    {latestTournamentRegistration.teamName} in{' '}
                    {latestTournamentRegistration.tournamentName}.
                  </p>
                </div>
              ) : null}
            </div>
          </article>

          <article className="glass-panel dashboard-panel">
            <h3>Offers and Banners</h3>
            <div className="stack-list">
              {offers.map((offer) => (
                <div key={offer.title} className="list-row">
                  <div>
                    <strong>{offer.title}</strong>
                    <p>{offer.description}</p>
                  </div>
                  <div className="row-end">
                    <span className="status-pill">{offer.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

export default AdminDashboardView
