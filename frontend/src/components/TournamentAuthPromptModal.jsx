import ModalShell from './ModalShell'

function TournamentAuthPromptModal({ tournament, onClose, onLogin, onCreateAccount }) {
  return (
    <ModalShell
      titleId="tournament-auth-title"
      className="tournament-modal-panel tournament-auth-panel"
      onClose={onClose}
    >
      <div className="modal-copy-block">
        <span className="status-pill status-pending">Tournament Access</span>
        <h2 id="tournament-auth-title">Please login to participate in tournaments.</h2>
        <p>
          {tournament
            ? `Join ${tournament.title} by logging in first. Once you are signed in, we will bring the registration form right back.`
            : 'Sign in or create an account first, then complete your tournament registration in a few quick steps.'}
        </p>
      </div>

      <div className="modal-action-row">
        <button type="button" className="primary-button" onClick={onLogin}>
          Login
        </button>
        <button type="button" className="secondary-button" onClick={onCreateAccount}>
          Create Account
        </button>
      </div>
    </ModalShell>
  )
}

export default TournamentAuthPromptModal
