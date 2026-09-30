import type { User } from '@supabase/supabase-js'
import { useState } from 'react'
import { accountInitials, avatarUrl } from '../auth/account'

type AvatarProps = {
  user: User
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({ user, size = 'sm' }: AvatarProps) {
  const url = avatarUrl(user)
  const [failedUrl, setFailedUrl] = useState<string | null>(null)

  return (
    <span className={`avatar avatar-${size}`} aria-hidden="true">
      {url && failedUrl !== url ? (
        <img src={url} alt="" onError={() => setFailedUrl(url)} />
      ) : (
        accountInitials(user)
      )}
    </span>
  )
}
