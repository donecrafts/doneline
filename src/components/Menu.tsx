import { useState, type KeyboardEvent } from 'react'
import { formatPrice, menu, menuCategories, type MenuCategory } from '../data/content'
import { Reveal } from './Reveal'

export function Menu() {
  const [category, setCategory] = useState<MenuCategory>('Starters')
  const items = menu[category]

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const direction = event.key === 'ArrowRight' ? 1 : -1
    const next = (index + direction + menuCategories.length) % menuCategories.length
    const nextCategory = menuCategories[next]
    setCategory(nextCategory)
    document.getElementById(`tab-${nextCategory}`)?.focus()
  }

  return (
    <section id="menu" className="section" aria-labelledby="menu-heading">
      <div className="wrap">
        <Reveal>
          <div className="text-center">
            <h2 id="menu-heading" className="section-title text-ink">
              The Menu
            </h2>
          </div>

          <div
            className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3"
            role="tablist"
            aria-label="Menu categories"
          >
            {menuCategories.map((item, index) => {
              const selected = item === category
              return (
                <button
                  key={item}
                  id={`tab-${item}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="menu-panel"
                  tabIndex={selected ? 0 : -1}
                  className={`relative px-1 pb-2 text-sm tracking-[0.16em] uppercase transition-colors duration-200 ${
                    selected ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                  onClick={() => setCategory(item)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                >
                  {item}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-leaf-deep transition-transform duration-300 ${
                      selected ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              )
            })}
          </div>

          <div
            id="menu-panel"
            role="tabpanel"
            aria-labelledby={`tab-${category}`}
            className="mx-auto mt-6 max-w-3xl"
          >
            <ul key={category} className="menu-swap divide-y divide-line border-y border-line">
              {items.map((item) => (
                <li key={item.name} className="py-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-[1.7rem] leading-tight text-ink">{item.name}</h3>
                    <p className="shrink-0 text-sm tracking-wide text-olive tabular-nums">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
