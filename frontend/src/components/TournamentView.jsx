import SectionHeading from './SectionHeading'

const tournamentPayments = ['UPI', 'Card', 'Wallet']

function TournamentView({
  tournaments,
  tournamentForm,
  selectedTournament,
  tournamentPass,
  onUpdateField,
  onRegister,
}) {
  return (
    <div className="view-stack">
      <section className="section-block">
        <SectionHeading
          eyebrow="Tournament module"
          title="Launch registrations, entry fee payments, and instant tournament pass generation."
          description="The flow is designed for serious competitors and casual challengers without adding friction to team signups."
        />

        <div className="tournament-preview-grid">
          {tournaments.map((tournament) => (
            <article key={tournament.id} className="glass-card tournament-card">
              <img src={tournament.image} alt={tournament.title} className="tournament-image" />
              <div className="tournament-copy">
                <div className="card-topline">
                  <span className="accent-badge">{tournament.mode}</span>
                  <span className="muted-copy">{tournament.spots}</span>
                </div>
                <h3>{tournament.title}</h3>
                <p>{tournament.summary}</p>
                <div className="detail-column">
                  <span>{tournament.date}</span>
                  <span>{tournament.prize}</span>
                  <span>{tournament.venue}</span>
                </div>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => onUpdateField('tournamentId', tournament.id)}
                >
                  Participate Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block tournament-registration-grid">
        <div className="glass-panel booking-form-panel">
          <div className="form-block">
            <label className="form-label" htmlFor="tournamentId">
              Tournament Registration Form
            </label>
            <select
              id="tournamentId"
              className="form-input"
              value={tournamentForm.tournamentId}
              onChange={(event) => onUpdateField('tournamentId', event.target.value)}
            >
              {tournaments.map((tournament) => (
                <option key={tournament.id} value={tournament.id}>
                  {tournament.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-block inline-two">
            <div>
              <label className="form-label" htmlFor="teamName">
                Team Registration
              </label>
              <input
                id="teamName"
                className="form-input"
                type="text"
                placeholder="Enter team name"
                value={tournamentForm.teamName}
                onChange={(event) => onUpdateField('teamName', event.target.value)}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="captain">
                Team Captain
              </label>
              <input
                id="captain"
                className="form-input"
                type="text"
                placeholder="Captain name"
                value={tournamentForm.captain}
                onChange={(event) => onUpdateField('captain', event.target.value)}
              />
            </div>
          </div>

          <div className="form-block inline-two">
            <div>
              <label className="form-label" htmlFor="contact">
                Contact Number
              </label>
              <input
                id="contact"
                className="form-input"
                type="text"
                placeholder="+91"
                value={tournamentForm.contact}
                onChange={(event) => onUpdateField('contact', event.target.value)}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="email">
                Team Email
              </label>
              <input
                id="email"
                className="form-input"
                type="email"
                placeholder="squad@team.gg"
                value={tournamentForm.email}
                onChange={(event) => onUpdateField('email', event.target.value)}
              />
            </div>
          </div>

          <div className="form-block">
            <label className="form-label" htmlFor="roster">
              Roster List
            </label>
            <textarea
              id="roster"
              className="form-input form-textarea"
              placeholder="Player 1, Player 2, Player 3..."
              value={tournamentForm.roster}
              onChange={(event) => onUpdateField('roster', event.target.value)}
            />
          </div>

          <div className="form-block">
            <label className="form-label">Entry Fee Payment</label>
            <div className="payment-toggle">
              {tournamentPayments.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={tournamentForm.paymentMethod === mode ? 'selector-chip active' : 'selector-chip'}
                  onClick={() => onUpdateField('paymentMethod', mode)}
                >
                  <span>Pay via</span>
                  <strong>{mode}</strong>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="glass-panel booking-summary-panel">
          <img src={selectedTournament.image} alt={selectedTournament.title} className="summary-image" />
          <div className="summary-header">
            <span className="accent-badge">{selectedTournament.mode}</span>
            <h3>{selectedTournament.title}</h3>
            <p>{selectedTournament.summary}</p>
          </div>

          <div className="summary-list">
            <div>
              <span>Date</span>
              <strong>{selectedTournament.date}</strong>
            </div>
            <div>
              <span>Venue</span>
              <strong>{selectedTournament.venue}</strong>
            </div>
            <div>
              <span>Prize pool</span>
              <strong>{selectedTournament.prize}</strong>
            </div>
            <div>
              <span>Entry fee</span>
              <strong>Rs.{selectedTournament.fee}</strong>
            </div>
          </div>

          <button type="button" className="primary-button full-width" onClick={onRegister}>
            Generate Tournament Pass
          </button>

          {tournamentPass ? (
            <div className="pass-card">
              <span className="section-eyebrow">Tournament Pass Generated</span>
              <h3>{tournamentPass.id}</h3>
              <p>{tournamentPass.title}</p>
              <div className="summary-list compact-list">
                <div>
                  <span>Team</span>
                  <strong>{tournamentPass.teamName}</strong>
                </div>
                <div>
                  <span>Captain</span>
                  <strong>{tournamentPass.captain}</strong>
                </div>
                <div>
                  <span>Check-in</span>
                  <strong>{tournamentPass.checkIn}</strong>
                </div>
              </div>
            </div>
          ) : null}
        </aside>
      </section>
    </div>
  )
}

export default TournamentView
