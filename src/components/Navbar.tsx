import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { hoursLine, navLinks } from '../data/content'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('scroll-lock', open)
    return () => document.body.classList.remove('scroll-lock')
  }, [open])

  useEffect(() => {
    if (open) {
      wasOpen.current = true
      firstLinkRef.current?.focus()
      return
    }

    if (wasOpen.current) {
      menuButtonRef.current?.focus()
      wasOpen.current = false
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 border-b bg-cream transition-colors duration-300 ${
        scrolled || open ? 'border-line' : 'border-transparent'
      }`}
    >
      <div className="wrap flex h-full items-center justify-between gap-4">
        <a
          href="#home"
          onClick={close}
          className="font-serif text-[1.35rem] font-medium tracking-[0.22em] text-ink sm:text-[1.55rem]"
        >
          SAVORÉ
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.95rem] text-ink-soft transition-colors duration-200 hover:text-olive"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a href="#menu" onClick={close} className="btn btn-primary btn-small header-cta">
            View Menu
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            ref={menuButtonRef}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X strokeWidth={1.5} size={22} /> : <Menu strokeWidth={1.5} size={22} />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className="mobile-nav" data-open={open} inert={!open}>
        <div className="flex h-full flex-col justify-between px-6 py-8">
          <nav className="mobile-nav-links" aria-label="Mobile">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                ref={index === 0 ? firstLinkRef : undefined}
                onClick={close}
                className="block border-b border-line py-4 font-serif text-[2.35rem] leading-none text-ink"
              >
                {link.label}
              </a>
            ))}
            <a href="#menu" onClick={close} className="btn btn-primary mt-8">
              View Menu
            </a>
          </nav>
          <p className="text-sm tracking-wide text-muted">{hoursLine}</p>
        </div>
      </div>
    </header>
  )
}
