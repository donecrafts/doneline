import { images } from '../data/content'
import { FoodImage } from './FoodImage'

export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Simple food. Beautiful moments.</p>
            <h1 id="hero-title" className="hero-title">
              Good food, made beautifully.
            </h1>
            <p className="hero-text">
              A modern dining experience built around seasonal ingredients, thoughtful cooking, and
              simple moments worth sharing.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#menu">
                Explore Menu
              </a>
              <a className="btn btn-outline" href="#about">
                Our Story
              </a>
            </div>
          </div>

          <div className="hero-photo">
            <FoodImage
              src={images.hero}
              alt="A plated dish being served at the table"
              className="cover-image"
              eager
            />
          </div>
        </div>

        <p className="hero-meta">Open Tuesday — Sunday · 11:30 AM — 10:00 PM</p>
      </div>
    </section>
  )
}
