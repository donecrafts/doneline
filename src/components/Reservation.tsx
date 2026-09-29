import { useState, type FormEvent } from 'react'
import { reservationTimes } from '../data/content'
import { Reveal } from './Reveal'

function todayISO() {
  const now = new Date()
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

export function Reservation() {
  const [submitted, setSubmitted] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    setSubmitted(true)
    form.reset()
  }

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <Reveal>
          <div className="reserve-grid">
            <div>
              <h2 id="contact-title" className="section-title">
                Come dine with us.
              </h2>

              <div className="contact-list">
                <div>
                  <p className="eyebrow">Visit</p>
                  <p>
                    123 Olive Street
                    <br />
                    Downtown
                  </p>
                </div>
                <div>
                  <p className="eyebrow">Hours</p>
                  <p>
                    Tuesday — Sunday
                    <br />
                    11:30 AM — 10:00 PM
                  </p>
                </div>
                <div>
                  <p className="eyebrow">Email</p>
                  <p>
                    <a className="contact-link" href="mailto:hello@savore.example">
                      hello@savore.example
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <form className="reserve-form" onSubmit={onSubmit} noValidate={false}>
              <div className="form-grid">
                <label className="field">
                  <span>Name</span>
                  <input name="name" type="text" autoComplete="name" required />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input name="email" type="email" autoComplete="email" required />
                </label>
                <div className="form-row">
                  <label className="field">
                    <span>Date</span>
                    <input name="date" type="date" min={todayISO()} required />
                  </label>
                  <label className="field">
                    <span>Time</span>
                    <select name="time" defaultValue="" required>
                      <option value="" disabled>
                        Select a time
                      </option>
                      {reservationTimes.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="field">
                  <span>Guests</span>
                  <select name="guests" defaultValue="" required>
                    <option value="" disabled>
                      Select guests
                    </option>
                    {Array.from({ length: 8 }, (_, index) => index + 1).map((count) => (
                      <option key={count} value={count}>
                        {count} {count === 1 ? 'guest' : 'guests'}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span>Message</span>
                  <textarea name="message" rows={4} />
                </label>
              </div>

              <div className="form-status" aria-live="polite">
                {submitted ? (
                  <p className="form-success">Thank you! Your reservation request has been received.</p>
                ) : null}
              </div>

              <button className="btn btn-primary" type="submit">
                Request a Table
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
