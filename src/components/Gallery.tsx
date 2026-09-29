import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { galleryImages } from '../data/content'
import { FoodImage } from './FoodImage'
import { Reveal } from './Reveal'

type GalleryImage = (typeof galleryImages)[number]

export function Gallery() {
  const [selected, setSelected] = useState<GalleryImage | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!selected) return

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      previouslyFocused?.focus()
    }
  }, [selected])

  return (
    <section className="section" id="gallery" aria-labelledby="gallery-title">
      <div className="wrap">
        <Reveal>
          <header className="section-head">
            <h2 id="gallery-title" className="section-title">
              Gallery
            </h2>
            <p className="section-lead">A few quiet moments from the table and the kitchen.</p>
          </header>

          <div className="gallery-grid">
            {galleryImages.map((image) => (
              <button
                key={image.src}
                type="button"
                className="gallery-item"
                onClick={() => setSelected(image)}
              >
                <FoodImage src={image.src} alt={image.alt} className="cover-image gallery-photo" />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {selected ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.alt} onClick={() => setSelected(null)}>
          <button
            ref={closeRef}
            type="button"
            className="lightbox-close"
            aria-label="Close image"
            onClick={() => setSelected(null)}
          >
            <X size={20} strokeWidth={1.5} />
          </button>
          <figure className="lightbox-figure" onClick={(event) => event.stopPropagation()}>
            <img src={selected.src} alt={selected.alt} />
            <figcaption className="lightbox-caption">{selected.alt}</figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  )
}
