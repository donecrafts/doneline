import { images } from '../data/content'
import { FoodImage } from './FoodImage'

export function Experience() {
  return (
    <section className="experience" aria-labelledby="experience-title">
      <FoodImage
        src={images.experience}
        alt="A dining room set for the evening"
        className="experience-photo"
      />
      <div className="experience-scrim" aria-hidden="true" />
      <div className="wrap experience-inner">
        <div className="experience-copy">
          <h2 id="experience-title">More than a meal.</h2>
          <p>
            From the first bite to the last conversation, every detail is designed to make your
            time with us feel special.
          </p>
          <a className="btn btn-light" href="#contact">
            Reserve a Table
          </a>
        </div>
      </div>
    </section>
  )
}
