import SectionHeading from './SectionHeading'

function UserDashboardView({ dashboard, bookingConfirmation, tournamentPass, profile, onProfileChange }) {
  const bookings = bookingConfirmation
    ? [
        {
          id: bookingConfirmation.id,
          setup: bookingConfirmation.setup,
          date: bookingConfirmation.dateLabel,
          slot: bookingConfirmation.slotLabel,
          status: 'Just booked',
          total: `Rs.${bookingConfirmation.total}`,
        },
        ...dashboard.bookings,
      ]
    : dashboard.bookings

  const tournaments = tournamentPass
    ? [
        {
          id: tournamentPass.id,
          title: tournamentPass.title,
          date: tournamentPass.date,
          team: tournamentPass.teamName,
          status: 'Generated now',
        },
        ...dashboard.tournaments,
      ]
    : dashboard.tournaments

  return (
    <div className="view-stack">
      <section className="section-block">
        <SectionHeading
          eyebrow="User dashboard"
          title="Track bookings, tournaments, payments, wallet activity, and profile settings."
          description="Everything a returning player needs is visible in one premium dashboard surface."
        />
        <div className="metric-grid">
          {dashboard.stats.map((stat) => (
            <article key={stat.label} className="glass-card metric-card">
              <span className="muted-copy">{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block dashboard-grid">
        <div className="dashboard-column">
          <article className="glass-panel dashboard-panel">
            <h3>My Bookings</h3>
            <div className="stack-list">
              {bookings.map((booking) => (
                <div key={booking.id} className="list-row">
                  <div>
                    <strong>{booking.setup}</strong>
                    <p>
                      {booking.date} • {booking.slot}
                    </p>
                  </div>
                  <div className="row-end">
                    <span className="status-pill">{booking.status}</span>
                    <strong>{booking.total}</strong>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="glass-panel dashboard-panel">
            <h3>My Tournaments</h3>
            <div className="stack-list">
              {tournaments.map((tournament) => (
                <div key={tournament.id} className="list-row">
                  <div>
                    <strong>{tournament.title}</strong>
                    <p>
                      {tournament.date} • {tournament.team}
                    </p>
                  </div>
                  <div className="row-end">
                    <span className="status-pill">{tournament.status}</span>
                    <strong>{tournament.id}</strong>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="dashboard-column">
          <article className="glass-panel dashboard-panel">
            <h3>Payment History</h3>
            <div className="stack-list">
              {dashboard.paymentHistory.map((payment) => (
                <div key={payment.id} className="list-row">
                  <div>
                    <strong>{payment.label}</strong>
                    <p>
                      {payment.date} • {payment.mode}
                    </p>
                  </div>
                  <div className="row-end">
                    <span className="status-pill">{payment.id}</span>
                    <strong>{payment.amount}</strong>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="glass-panel dashboard-panel">
            <h3>Wallet and Refunds</h3>
            <div className="stack-list">
              {dashboard.wallet.map((item) => (
                <div key={item.label} className="list-row">
                  <div>
                    <strong>{item.label}</strong>
                  </div>
                  <div className="row-end">
                    <strong>{item.amount}</strong>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="glass-panel dashboard-panel">
            <h3>Profile Settings</h3>
            <div className="profile-grid">
              <label>
                <span className="form-label">Gamer Tag</span>
                <input
                  className="form-input"
                  type="text"
                  value={profile.gamerTag}
                  onChange={(event) => onProfileChange('gamerTag', event.target.value)}
                />
              </label>
              <label>
                <span className="form-label">Full Name</span>
                <input
                  className="form-input"
                  type="text"
                  value={profile.fullName}
                  onChange={(event) => onProfileChange('fullName', event.target.value)}
                />
              </label>
              <label>
                <span className="form-label">Email</span>
                <input
                  className="form-input"
                  type="email"
                  value={profile.email}
                  onChange={(event) => onProfileChange('email', event.target.value)}
                />
              </label>
              <label>
                <span className="form-label">Phone</span>
                <input
                  className="form-input"
                  type="text"
                  value={profile.phone}
                  onChange={(event) => onProfileChange('phone', event.target.value)}
                />
              </label>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

export default UserDashboardView
