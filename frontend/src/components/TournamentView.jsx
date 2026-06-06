function TournamentView({ tournaments, onUpdateField }) {
  return (
    <div className="view-stack">
      <section className="tournament-preview-grid">
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
      </section>
    </div>
  )
}

export default TournamentView
