import { useState } from 'react'
import { categories, menu, type MenuCategory } from '../data/content'
import { Reveal } from './Reveal'

export function Menu() {
  const [active, setActive] = useState<MenuCategory>('Starters')
  const items = menu[active]

  return (
    <section className="section" id="menu" aria-labelledby="menu-title">
      <div className="wrap">
        <Reveal>
          <div className="menu-layout">
            <h2 id="menu-title" className="section-title">
              The Menu
            </h2>

            <div className="tabs" role="tablist" aria-label="Menu categories">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  id={`tab-${category}`}
                  aria-selected={active === category}
                  aria-controls="menu-panel"
                  className={`tab${active === category ? ' is-active' : ''}`}
                  onClick={() => setActive(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <ul
              key={active}
              id="menu-panel"
              className="menu-list"
              role="tabpanel"
              aria-labelledby={`tab-${active}`}
            >
              {items.map((item) => (
                <li key={item.name}>
                  <div className="menu-row">
                    <h3>{item.name}</h3>
                    <p className="menu-price">{item.price}</p>
                  </div>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
