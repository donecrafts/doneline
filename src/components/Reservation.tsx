import { useEffect, useState, type FormEvent } from 'react'
import { useAuth } from '../auth/AuthContext'
import { reservationTimes } from '../data/content'
import { supabase } from '../lib/supabase'
import { Reveal } from './Reveal'

type SavedRequest = {
  id: string
  reservation_date: string
  reservation_time: string
  guests: number
}

function todayISO() {
  const now = new Date()
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

export function Reservation() {
  const { user, configured, openAuth } = useAuth()
  const [submitted, setSubmitted] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [requests, setRequests] = useState<SavedRequest[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (!user || !supabase) {
      setRequests([])
      return
    }

    let active = true

    supabase
      .from('reservations')
      .select('id, reservation_date, reservation_time, guests')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error: loadError }) => {
        if (!active || loadError) return
        setRequests((data ?? []) as SavedRequest[])
      })

    return () => {
      active = false
    }
  }, [user, submitted])

  useEffect(() => {
    if (!user) return
    const savedName = typeof user.user_metadata?.full_name === 'string' ? user.user_metadata.full_name : ''
    setName((current) => current || savedName)
    setEmail((current) => current || user.email || '')
  }, [user])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSubmitted(false)

    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    if (!configured || !supabase) {
      setError('Supabase is not configured yet, so this request cannot be saved.')
      return
    }

    if (!user) {
      openAuth('sign-in')
      return
    }

    const data = new FormData(form)
    setPending(true)

    const { error: insertError } = await supabase.from('reservations').insert({
      user_id: user.id,
      name,
      email,
      reservation_date: String(data.get('date') ?? ''),
      reservation_time: String(data.get('time') ?? ''),
      guests: Number(data.get('guests')),
      message: String(data.get('message') ?? '') || null,
    })

    setPending(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    setSubmitted(true)
    form.reset()
    setName(typeof user.user_metadata?.full_name === 'string' ? user.user_metadata.full_name : '')
    setEmail(user.email ?? '')
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

            <form className="reserve-form" onSubmit={onSubmit}>
              <div className="form-grid">
                <label className="field">
                  <span>Name</span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
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
                {!user ? <p className="form-note">Sign in to send your reservation request.</p> : null}
                {submitted ? (
                  <p className="form-success">Thank you! Your reservation request has been received.</p>
                ) : null}
                {error ? <p className="auth-error">{error}</p> : null}
              </div>

              {requests.length > 0 ? (
                <ul className="request-list">
                  {requests.map((request) => (
                    <li key={request.id}>
                      {request.reservation_date} · {request.reservation_time} · {request.guests}{' '}
                      {request.guests === 1 ? 'guest' : 'guests'}
                    </li>
                  ))}
                </ul>
              ) : null}

              <button className="btn btn-primary" type="submit" disabled={pending}>
                {pending ? 'Sending…' : user ? 'Request a Table' : 'Sign in to request'}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
