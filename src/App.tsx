import { useEffect, useRef, useState } from 'react'
import { AuthProvider } from './auth/AuthContext'
import { About } from './components/About'
import { AuthModal } from './components/AuthModal'
import { Experience } from './components/Experience'
import { FeaturedDishes } from './components/FeaturedDishes'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Menu } from './components/Menu'
import { Navbar } from './components/Navbar'
import { Profile } from './components/Profile'
import { Reservation } from './components/Reservation'
import { Testimonials } from './components/Testimonials'

function useHash() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return hash
}

export default function App() {
  const hash = useHash()
  const showProfile = hash === '#profile'
  const wasProfile = useRef(showProfile)

  useEffect(() => {
    if (showProfile) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else if (wasProfile.current && hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' })
    }
    wasProfile.current = showProfile
  }, [showProfile, hash])

  return (
    <AuthProvider>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main')?.focus()
        }}
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        {showProfile ? (
          <Profile />
        ) : (
          <>
            <Hero />
            <FeaturedDishes />
            <About />
            <Menu />
            <Experience />
            <Gallery />
            <Testimonials />
            <Reservation />
          </>
        )}
      </main>
      <Footer />
      <AuthModal />
    </AuthProvider>
  )
}
