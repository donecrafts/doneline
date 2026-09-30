import { LogOut, Menu, UserRound, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { accountName } from '../auth/account'
import { useAuth } from '../auth/AuthContext'
import { navLinks } from '../data/content'
import { Avatar } from './Avatar'

export function Navbar() {
  const { user, loading, openAuth, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false)
    }

    const lockScroll = window.innerWidth < 980
    if (lockScroll) document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      if (lockScroll) document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  const close = () => setOpen(false)

  async function handleSignOut() {
    close()
    await signOut()
    if (window.location.hash === '#profile') window.location.hash = '#home'
  }

  return (
    <header ref={headerRef} className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="wrap nav-bar">
        <a className="logo" href="#home" onClick={close}>
          SAVORÉ
        </a>

        <nav className="nav-links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          {!loading && !user ? (
            <button
              type="button"
              className="btn btn-outline btn-small nav-cta"
              onClick={() => openAuth('sign-in')}
            >
              Sign in
            </button>
          ) : null}
          <button
            type="button"
            className={`menu-toggle${user ? ' has-avatar' : ''}`}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {user ? <Avatar user={user} /> : null}
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <div id="site-menu" className="menu-panel" inert={!open} aria-hidden={!open}>
        <div className="menu-inner">
          <nav className="menu-links" aria-label="Menu">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={close}>
                {link.label}
              </a>
            ))}
          </nav>

          {!loading && user ? (
            <div className="menu-account">
              <div className="menu-user">
                <Avatar user={user} size="md" />
                <div>
                  <p className="menu-user-name">{accountName(user)}</p>
                  <p className="menu-user-email">{user.email}</p>
                </div>
              </div>
              <a className="menu-item" href="#profile" onClick={close}>
                <UserRound size={18} strokeWidth={1.5} />
                My profile
              </a>
              <button type="button" className="menu-item" onClick={() => void handleSignOut()}>
                <LogOut size={18} strokeWidth={1.5} />
                Sign out
              </button>
            </div>
          ) : null}

          {!loading && !user ? (
            <div className="menu-account">
              <button
                type="button"
                className="btn btn-primary menu-signin"
                onClick={() => {
                  close()
                  openAuth('sign-in')
                }}
              >
                Sign in
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
