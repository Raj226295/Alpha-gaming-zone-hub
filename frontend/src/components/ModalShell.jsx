function ModalShell({ titleId, className = '', onClose, children }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={`modal-panel ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  )
}

export default ModalShell
