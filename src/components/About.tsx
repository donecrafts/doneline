import { images } from '../data/content'
import { FoodImage } from './FoodImage'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="wrap">
        <Reveal>
          <div className="about-grid">
            <div className="about-photo">
              <FoodImage
                src={images.about}
                alt="The dining room at SAVORÉ"
                className="cover-image"
              />
            </div>
            <div className="about-copy">
              <p className="eyebrow">The kitchen</p>
              <h2 id="about-title" className="section-title">
                Our Story
              </h2>
              <p>
                SAVORÉ was created around a simple idea: great food does not need to be
                complicated. We combine fresh ingredients, thoughtful techniques, and a relaxed
                atmosphere to create memorable dining experiences.
              </p>
              <a className="btn btn-outline btn-small" href="#about">
                Discover Our Story
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
