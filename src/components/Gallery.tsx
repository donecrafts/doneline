import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { galleryFrames, galleryImages } from '../data/content'
import { FoodImage } from './FoodImage'
import { Reveal } from './Reveal'

export function Gallery() {
  const [active, setActive] = useState<number | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const wasOpen = useRef(false)
  const shouldFocusClose = useRef(false)

  const current = active === null ? null : galleryImages[active]

  function openAt(index: number) {
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    shouldFocusClose.current = true
    setActive(index)
  }

  function close() {
    setActive(null)
  }

  function step(direction: 1 | -1) {
    setActive((index) => {
      if (index === null) return index
      return (index + direction + galleryImages.length) % galleryImages.length
    })
  }

  useEffect(() => {
    if (active === null) {
      if (wasOpen.current) {
        triggerRef.current?.focus()
        wasOpen.current = false
      }
      return
    }

    wasOpen.current = true
    document.body.classList.add('scroll-lock')

    if (shouldFocusClose.current) {
      closeRef.current?.focus()
      shouldFocusClose.current = false
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActive(null)
        return
      }
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
      if (event.key !== 'Tab') return

      const overlay = overlayRef.current
      if (!overlay) return
      const focusable = overlay.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])')
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('scroll-lock')
      window.removeEventListener('keydown', onKey)
    }
  }, [active])

  return (
    <section id="gallery" className="section" aria-labelledby="gallery-heading">
      <div className="wrap">
        <Reveal>
          <h2 id="gallery-heading" className="section-title text-ink">
            Gallery
          </h2>
        </Reveal>

        <Reveal delay={70}>
          <div className="gallery-grid mt-12 md:mt-14">
            {galleryImages.map((image, index) => (
              <button
                key={image.id}
                type="button"
                className={`card-media relative h-full w-full overflow-hidden rounded-2xl border border-line bg-beige ${galleryFrames[index]}`}
                onClick={() => openAt(index)}
                aria-label={`Open image: ${image.alt}`}
              >
                <FoodImage
                  src={image.src}
                  alt={image.alt}
                  className="zoom-img absolute inset-0 h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {current &&
        createPortal(
          <div
            ref={overlayRef}
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            onClick={close}
          >
            <button
              ref={closeRef}
              type="button"
              className="lightbox-control absolute top-4 right-4"
              aria-label="Close gallery"
              onClick={close}
            >
              <X strokeWidth={1.5} size={20} />
            </button>

            <div className="lightbox-panel flex w-full max-w-5xl flex-col items-center" onClick={(event) => event.stopPropagation()}>
              <img
                key={current.src}
                src={current.src}
                alt={current.alt}
                className="lightbox-photo bg-beige"
              />
              <p className="lightbox-caption mt-4 max-w-md text-center text-sm">{current.alt}</p>
              <div className="mt-4 flex items-center gap-4">
                <button
                  type="button"
                  className="lightbox-control"
                  aria-label="Previous image"
                  onClick={() => step(-1)}
                >
                  <ChevronLeft strokeWidth={1.5} size={18} />
                </button>
                <p className="lightbox-caption min-w-12 text-center text-xs tracking-[0.18em]">
                  {(active ?? 0) + 1} / {galleryImages.length}
                </p>
                <button
                  type="button"
                  className="lightbox-control"
                  aria-label="Next image"
                  onClick={() => step(1)}
                >
                  <ChevronRight strokeWidth={1.5} size={18} />
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  )
}
