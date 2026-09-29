import { featuredDishes } from '../data/content'
import { FoodImage } from './FoodImage'
import { Reveal } from './Reveal'

export function FeaturedDishes() {
  return (
    <section className="section" aria-labelledby="featured-title">
      <div className="wrap">
        <Reveal>
          <header className="section-head">
            <h2 id="featured-title" className="section-title">
              A taste of SAVORÉ
            </h2>
            <p className="section-lead">
              Thoughtfully prepared dishes made with fresh, seasonal ingredients.
            </p>
          </header>

          <div className="dish-grid">
            {featuredDishes.map((dish) => (
              <article className="dish-card" key={dish.name}>
                <div className="dish-media">
                  <FoodImage src={dish.image} alt={dish.alt} className="cover-image dish-photo" />
                </div>
                <div className="dish-top">
                  <h3 className="dish-name">{dish.name}</h3>
                  <p className="dish-price">{dish.price}</p>
                </div>
                <p className="dish-desc">{dish.description}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
