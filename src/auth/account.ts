import type { User } from '@supabase/supabase-js'

export function fullName(user: User) {
  const value = user.user_metadata?.full_name
  return typeof value === 'string' ? value.trim() : ''
}

export function accountName(user: User) {
  const name = fullName(user)
  if (name) return name
  if (!user.email) return 'Account'
  const local = user.email.split('@')[0]
  return local.length > 18 ? `${local.slice(0, 16)}…` : local
}

export function accountInitials(user: User) {
  const source = fullName(user) || user.email?.split('@')[0] || '?'
  const parts = source.split(/[\s._-]+/).filter(Boolean)
  const letters = parts.length > 1 ? parts[0][0] + parts[1][0] : source.slice(0, 2)
  return letters.toUpperCase()
}

export function avatarUrl(user: User) {
  const value = user.user_metadata?.avatar_url
  return typeof value === 'string' && value ? value : null
}
