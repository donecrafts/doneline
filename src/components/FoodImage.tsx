import { useState } from 'react'

type FoodImageProps = {
  src: string
  alt: string
  className?: string
  eager?: boolean
}

export function FoodImage({ src, alt, className = '', eager = false }: FoodImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-beige px-6 text-center ${className}`}>
        <span className="font-serif text-xl text-muted">{alt}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
      onError={() => setFailed(true)}
    />
  )
}
