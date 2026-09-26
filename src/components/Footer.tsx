import { type MouseEvent } from 'react'
import { footerLinks } from '../data/content'

export function Footer() {
  function onPlaceholderClick(event: MouseEvent<HTMLAnchorElement>, placeholder: boolean) {
    if (placeholder) event.preventDefault()
  }

  return (
    <footer className="border-t border-line">
      <div className="wrap py-14 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <a href="#home" className="font-serif text-3xl font-medium tracking-[0.22em] text-ink">
              SAVORÉ
            </a>
            <p className="mt-3 text-sm text-muted">Simple food. Beautiful moments.</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => onPlaceholderClick(event, link.placeholder)}
                className="text-sm text-ink-soft transition-colors duration-200 hover:text-olive"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="mt-10 border-t border-line pt-6 text-xs tracking-wide text-muted">
          © 2026 SAVORÉ. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
