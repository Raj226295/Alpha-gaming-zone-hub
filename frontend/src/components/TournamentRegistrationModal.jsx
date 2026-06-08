import ModalShell from './ModalShell'

function TournamentRegistrationModal({
  tournament,
  form,
  errorMessage,
  isSubmitting,
  onChange,
  onClose,
  onSubmit,
}) {
  if (!tournament) {
    return null
  }

  return (
    <ModalShell
      titleId="tournament-registration-title"
      className="tournament-modal-panel"
      onClose={onClose}
    >
      <div className="tournament-modal-header">
        <div className="modal-copy-block">
          <span className="status-pill">Live Registration</span>
          <h2 id="tournament-registration-title">{tournament.title}</h2>
          <p>
            Lock your squad in with a fast submission. We auto-fill your captain details from
            your player profile, and you can edit them before sending.
          </p>
        </div>

        <div className="tournament-highlight-card">
          <span>{tournament.date}</span>
          <strong>{tournament.time}</strong>
          <p>{tournament.venue}</p>
        </div>
      </div>

      <form
        className="tournament-modal-form"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <div className="tournament-modal-grid">
          <label className="form-block">
            <span className="form-label">Team Name</span>
            <input
              className="form-input"
              type="text"
              placeholder="Enter your team name"
              value={form.teamName}
              onChange={(event) => onChange('teamName', event.target.value)}
            />
          </label>

          <label className="form-block">
            <span className="form-label">Captain Name</span>
            <input
              className="form-input"
              type="text"
              placeholder="Captain full name"
              value={form.captainName}
              onChange={(event) => onChange('captainName', event.target.value)}
            />
          </label>

          <label className="form-block">
            <span className="form-label">Mobile Number</span>
            <input
              className="form-input"
              type="tel"
              placeholder="Enter captain mobile number"
              value={form.mobileNumber}
              onChange={(event) => onChange('mobileNumber', event.target.value)}
            />
          </label>

          <label className="form-block">
            <span className="form-label">Game ID / Riot ID</span>
            <input
              className="form-input"
              type="text"
              placeholder="Example: NeonRider#7781"
              value={form.gameId}
              onChange={(event) => onChange('gameId', event.target.value)}
            />
          </label>
        </div>

        <label className="modal-checkbox" htmlFor="tournamentRulesConsent">
          <input
            id="tournamentRulesConsent"
            type="checkbox"
            checked={form.agreeToRules}
            onChange={(event) => onChange('agreeToRules', event.target.checked)}
          />
          <span>I agree to the tournament rules and regulations.</span>
        </label>

        <p className={errorMessage ? 'form-feedback form-feedback-error' : 'form-feedback'}>
          {errorMessage ||
            'Your registration will be linked with your logged-in Alpha account and marked Pending Approval for review.'}
        </p>

        <div className="modal-action-row">
          <button type="button" className="secondary-button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="primary-button" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register Now'}
          </button>
        </div>
      </form>
    </ModalShell>
  )
}

export default TournamentRegistrationModal
