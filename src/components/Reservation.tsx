import { Mail, MapPin } from 'lucide-react'
import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  email,
  hoursDays,
  hoursTime,
  location,
  xProfile,
  reservationTimes,
  todayInputValue,
} from '../data/content'
import { Reveal } from './Reveal'

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-2 block text-[0.72rem] tracking-[0.16em] text-muted uppercase">
        {label}
      </label>
      {children}
    </div>
  )
}

export function Reservation() {
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const today = todayInputValue()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    formRef.current?.reset()
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="wrap grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 id="contact-heading" className="section-title text-balance text-ink">
            Come dine with us.
          </h2>
          <div className="mt-10 space-y-8">
            <div>
              <p className="eyebrow">Location</p>
              <p className="mt-3 flex items-center gap-3 text-lg text-ink">
                <span className="contact-mark" aria-hidden="true">
                  <MapPin size={18} strokeWidth={1.75} />
                </span>
                {location}
              </p>
            </div>
            <div>
              <p className="eyebrow">Hours</p>
              <p className="mt-3 text-lg leading-relaxed text-ink">{hoursDays}</p>
              <p className="text-lg leading-relaxed text-ink">{hoursTime}</p>
            </div>
            <div>
              <p className="eyebrow">Email</p>
              <a
                href={`mailto:${email}`}
                className="mt-3 inline-flex items-center gap-3 text-lg text-ink transition-colors duration-200 hover:text-olive"
              >
                <span className="contact-mark" aria-hidden="true">
                  <Mail size={18} strokeWidth={1.75} />
                </span>
                <span className="underline decoration-sand underline-offset-4">{email}</span>
              </a>
            </div>
            <div>
              <p className="eyebrow">X</p>
              <a
                href={xProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-3 text-lg text-ink transition-colors duration-200 hover:text-olive"
              >
                <span className="contact-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </span>
                @donecraft225
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="rounded-3xl border border-line bg-peach-soft p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="reserve-name" label="Name">
                <input id="reserve-name" name="name" type="text" required autoComplete="name" className="field" />
              </Field>
              <Field id="reserve-email" label="Email">
                <input
                  id="reserve-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="field"
                />
              </Field>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Field id="reserve-date" label="Date">
                <input id="reserve-date" name="date" type="date" required min={today} className="field" />
              </Field>
              <Field id="reserve-time" label="Time">
                <select id="reserve-time" name="time" required defaultValue="" className="field">
                  <option value="" disabled>
                    Select
                  </option>
                  {reservationTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="reserve-guests" label="Guests">
                <select id="reserve-guests" name="guests" required defaultValue="" className="field">
                  <option value="" disabled>
                    Select
                  </option>
                  {Array.from({ length: 8 }, (_, index) => index + 1).map((count) => (
                    <option key={count} value={count}>
                      {count} {count === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-4">
              <Field id="reserve-message" label="Message">
                <textarea id="reserve-message" name="message" rows={4} className="field min-h-32 resize-y" />
              </Field>
            </div>

            {submitted && (
              <p role="status" className="success-banner mt-5">
                Thank you! Your reservation request has been received.
              </p>
            )}

            <button type="submit" className="btn btn-primary mt-5 w-full sm:w-auto">
              Request a Table
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
