import ModalShell from './ModalShell'

function TournamentSuccessModal({ registration, onClose, onViewTournaments }) {
  if (!registration) {
    return null
  }

  return (
    <ModalShell
      titleId="tournament-success-title"
      className="tournament-modal-panel tournament-success-panel"
      onClose={onClose}
    >
      <div className="tournament-success-icon" aria-hidden="true">
        OK
      </div>

      <div className="modal-copy-block">
        <span className="status-pill status-approved">Registration Success</span>
        <h2 id="tournament-success-title">Registration Submitted Successfully</h2>
        <p>
          Your tournament registration is in review. You can track status updates and match
          schedule details from My Tournaments.
        </p>
      </div>

      <div className="tournament-success-details">
        <div>
          <span>Tournament</span>
          <strong>{registration.tournamentName}</strong>
        </div>
        <div>
          <span>Team Name</span>
          <strong>{registration.teamName}</strong>
        </div>
        <div>
          <span>Registration Status</span>
          <strong>{registration.status}</strong>
        </div>
      </div>

      <div className="modal-action-row">
        <button type="button" className="primary-button full-width" onClick={onViewTournaments}>
          View My Tournaments
        </button>
      </div>
    </ModalShell>
  )
}

export default TournamentSuccessModal
