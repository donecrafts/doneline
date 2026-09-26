import { featuredDishes, formatPrice } from '../data/content'
import { FoodImage } from './FoodImage'
import { Reveal } from './Reveal'

export function FeaturedDishes() {
  return (
    <section className="section" aria-labelledby="featured-heading">
      <div className="wrap">
        <Reveal>
          <h2 id="featured-heading" className="section-title text-balance text-ink">
            A taste of SAVORÉ
          </h2>
          <p className="section-lead text-muted">
            Thoughtfully prepared dishes made with fresh, seasonal ingredients.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-8">
          {featuredDishes.map((dish, index) => (
            <Reveal key={dish.name} delay={index * 80}>
              <article className="card-media group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-beige">
                  <FoodImage
                    src={dish.image}
                    alt={dish.alt}
                    className="zoom-img absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-[1.7rem] leading-tight text-ink transition-colors duration-300 group-hover:text-olive">
                    {dish.name}
                  </h3>
                  <p className="shrink-0 text-sm tracking-wide text-olive tabular-nums">
                    {formatPrice(dish.price)}
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{dish.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
