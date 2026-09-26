import { testimonials } from '../data/content'
import { Reveal } from './Reveal'

export function Testimonials() {
  return (
    <section className="section bg-leaf" aria-labelledby="testimonials-heading">
      <div className="wrap">
        <Reveal>
          <h2 id="testimonials-heading" className="section-title text-ink">
            Guests say
          </h2>
          <div className="mt-12 grid gap-12 md:mt-14 md:grid-cols-3 md:gap-8">
            {testimonials.map((item) => (
              <blockquote key={item.name} className="border-t border-peach pt-6">
                <p className="font-serif text-[1.65rem] leading-snug font-medium text-ink italic">
                  “{item.quote}”
                </p>
                <footer className="mt-6 text-xs tracking-[0.18em] text-muted uppercase">
                  — {item.name}
                </footer>
              </blockquote>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
