import { About } from './components/About'
import { Experience } from './components/Experience'
import { FeaturedDishes } from './components/FeaturedDishes'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Menu } from './components/Menu'
import { Navbar } from './components/Navbar'
import { Reservation } from './components/Reservation'
import { Testimonials } from './components/Testimonials'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <FeaturedDishes />
        <About />
        <Menu />
        <Experience />
        <Gallery />
        <Testimonials />
        <Reservation />
      </main>
      <Footer />
    </>
  )
}
