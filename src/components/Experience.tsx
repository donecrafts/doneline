import { experienceImage } from '../data/content'
import { FoodImage } from './FoodImage'
import { Reveal } from './Reveal'

export function Experience() {
  return (
    <section className="relative isolate min-h-[34rem] overflow-hidden" aria-labelledby="experience-heading">
      <FoodImage
        src={experienceImage.src}
        alt={experienceImage.alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="photo-scrim" aria-hidden="true" />
      <div className="relative flex min-h-[34rem] items-center justify-center px-6 py-24">
        <Reveal className="max-w-2xl text-center">
          <h2 id="experience-heading" className="section-title on-photo text-balance">
            More than a meal.
          </h2>
          <p className="section-lead on-photo-soft mx-auto">
            From the first bite to the last conversation, every detail is designed to make your
            time with us feel special.
          </p>
          <a href="#contact" className="btn btn-light mt-8">
            Reserve a Table
          </a>
        </Reveal>
      </div>
    </section>
  )
}
