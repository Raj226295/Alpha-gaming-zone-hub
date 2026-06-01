import SectionHeading from './SectionHeading'

const bookingSteps = [
  'Select Gaming Setup',
  'Select Date',
  'Select Available Time Slot',
  'Add Players',
  'Add Extra Controllers',
  'Apply Coupon',
  'Payment Page',
  'Booking Confirmation',
]

const paymentModes = ['UPI', 'Card', 'Wallet']

function BookingView({
  setups,
  timeSlots,
  bookingForm,
  selectedSetup,
  selectedSlot,
  couponFeedback,
  summary,
  confirmation,
  onUpdateField,
  onApplyCoupon,
  onConfirmBooking,
  onNavigate,
}) {
  return (
    <div className="view-stack">
      <section className="section-block">
        <SectionHeading
          eyebrow="Slot booking flow"
          title="Build your session with setup, slot, players, and payment in one clean flow."
          description="Every selection updates the live cost summary so customers know exactly what they are booking."
        />

        <div className="step-strip">
          {bookingSteps.map((step, index) => (
            <div key={step} className="step-chip">
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>

        <div className="booking-grid">
          <div className="glass-panel booking-form-panel">
            <div className="form-block">
              <label className="form-label">Select Gaming Setup</label>
              <div className="setup-selector">
                {setups.map((setup) => (
                  <button
                    key={setup.id}
                    type="button"
                    className={bookingForm.setupId === setup.id ? 'selector-chip active' : 'selector-chip'}
                    onClick={() => onUpdateField('setupId', setup.id)}
                  >
                    <span>{setup.shortLabel}</span>
                    <strong>{setup.name}</strong>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-block inline-two">
              <div>
                <label className="form-label" htmlFor="booking-date">
                  Select Date
                </label>
                <input
                  id="booking-date"
                  className="form-input"
                  type="date"
                  min="2026-06-02"
                  value={bookingForm.date}
                  onChange={(event) => onUpdateField('date', event.target.value)}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="players">
                  Add Players
                </label>
                <select
                  id="players"
                  className="form-input"
                  value={bookingForm.players}
                  onChange={(event) => onUpdateField('players', Number(event.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6].map((count) => (
                    <option key={count} value={count}>
                      {count} players
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-block">
              <label className="form-label">Select Available Time Slot</label>
              <div className="slot-grid">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    className={bookingForm.slotId === slot.id ? 'slot-card active' : 'slot-card'}
                    onClick={() => onUpdateField('slotId', slot.id)}
                  >
                    <strong>{slot.label}</strong>
                    <span>{slot.status}</span>
                    <small>{slot.capacity}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-block inline-two">
              <div>
                <label className="form-label" htmlFor="controllers">
                  Add Extra Controllers
                </label>
                <select
                  id="controllers"
                  className="form-input"
                  value={bookingForm.controllers}
                  onChange={(event) => onUpdateField('controllers', Number(event.target.value))}
                >
                  {[0, 1, 2, 3].map((count) => (
                    <option key={count} value={count}>
                      {count} extra controllers
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label" htmlFor="coupon">
                  Apply Coupon
                </label>
                <div className="coupon-row">
                  <input
                    id="coupon"
                    className="form-input"
                    type="text"
                    placeholder="VIP25"
                    value={bookingForm.coupon}
                    onChange={(event) => onUpdateField('coupon', event.target.value.toUpperCase())}
                  />
                  <button type="button" className="secondary-button compact" onClick={onApplyCoupon}>
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <div className="form-block">
              <label className="form-label">Payment Page</label>
              <div className="payment-toggle">
                {paymentModes.map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    className={bookingForm.paymentMethod === mode ? 'selector-chip active' : 'selector-chip'}
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
            <img src={selectedSetup.image} alt={selectedSetup.name} className="summary-image" />
            <div className="summary-header">
              <span className="accent-badge">{selectedSetup.playersRange}</span>
              <h3>{selectedSetup.name}</h3>
              <p>{selectedSetup.description}</p>
            </div>

            <div className="summary-list">
              <div>
                <span>Date</span>
                <strong>{summary.dateLabel}</strong>
              </div>
              <div>
                <span>Selected slot</span>
                <strong>{selectedSlot.label}</strong>
              </div>
              <div>
                <span>Session time</span>
                <strong>{selectedSlot.hours} hours</strong>
              </div>
              <div>
                <span>Players</span>
                <strong>{bookingForm.players}</strong>
              </div>
              <div>
                <span>Payment method</span>
                <strong>{bookingForm.paymentMethod}</strong>
              </div>
            </div>

            <div className="quote-box">
              <div>
                <span>Base setup</span>
                <strong>Rs.{summary.baseAmount}</strong>
              </div>
              <div>
                <span>Extra players</span>
                <strong>Rs.{summary.playerCharge}</strong>
              </div>
              <div>
                <span>Controllers</span>
                <strong>Rs.{summary.controllerCharge}</strong>
              </div>
              <div>
                <span>Coupon discount</span>
                <strong>-Rs.{summary.discountAmount}</strong>
              </div>
            </div>

            <p className="feedback-note">{couponFeedback}</p>

            <div className="summary-total">
              <span>Total payable</span>
              <strong>Rs.{summary.total}</strong>
            </div>

            <button type="button" className="primary-button full-width" onClick={onConfirmBooking}>
              Confirm and Pay
            </button>

            {confirmation ? (
              <div className="confirmation-card">
                <span className="section-eyebrow">Booking Confirmation</span>
                <h3>{confirmation.id}</h3>
                <p>
                  {confirmation.setup} booked for {confirmation.dateLabel} at {confirmation.slotLabel}.
                </p>
                <p>Your payment of Rs.{confirmation.total} is secured.</p>
                <button type="button" className="secondary-button full-width" onClick={() => onNavigate('dashboard')}>
                  Open My Dashboard
                </button>
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </div>
  )
}

export default BookingView
