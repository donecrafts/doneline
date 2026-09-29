import { testimonials } from '../data/content'
import { Reveal } from './Reveal'

export function Testimonials() {
  return (
    <section className="section" aria-labelledby="testimonials-title">
      <div className="wrap">
        <Reveal>
          <header className="section-head">
            <h2 id="testimonials-title" className="section-title">
              Guests say
            </h2>
          </header>

          <div className="quote-grid">
            {testimonials.map((item) => (
              <figure className="quote" key={item.name}>
                <blockquote>
                  <p>&ldquo;{item.quote}&rdquo;</p>
                </blockquote>
                <figcaption>— {item.name}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
