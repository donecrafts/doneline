import { aboutImage } from '../data/content'
import { FoodImage } from './FoodImage'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-line bg-beige lg:aspect-[4/5]">
            <FoodImage
              src={aboutImage.src}
              alt={aboutImage.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="max-w-lg lg:py-4">
            <h2 id="about-heading" className="section-title text-ink">
              Our Story
            </h2>
            <p className="section-lead text-muted">
              SAVORÉ was created around a simple idea: great food does not need to be complicated.
              We combine fresh ingredients, thoughtful techniques, and a relaxed atmosphere to
              create memorable dining experiences.
            </p>
            <a href="#about" className="btn btn-secondary btn-small mt-8">
              Discover Our Story
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
