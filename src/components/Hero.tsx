import { heroImage, hoursLine } from '../data/content'
import { FoodImage } from './FoodImage'
import { Reveal } from './Reveal'

export function Hero() {
  return (
    <section id="home" className="pt-32 pb-10 md:pt-40 md:pb-14">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <h1 className="display text-balance text-ink">Good food, made beautifully.</h1>
          <p className="section-lead text-muted">
            A modern dining experience built around seasonal ingredients, thoughtful cooking, and
            simple moments worth sharing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#menu" className="btn btn-primary">
              Explore Menu
            </a>
            <a href="#about" className="btn btn-secondary">
              Our Story
            </a>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={90}>
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-line bg-beige lg:aspect-[4/5]">
            <FoodImage
              src={heroImage.src}
              alt={heroImage.alt}
              eager
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>

      <div className="wrap mt-12 border-t border-line pt-6 md:mt-16">
        <p className="flex items-start gap-3 text-sm tracking-wide text-muted">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-peach" aria-hidden="true" />
          {hoursLine}
        </p>
      </div>
    </section>
  )
}
