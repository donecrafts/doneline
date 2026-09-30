import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

export type AuthMode = 'sign-in' | 'sign-up'

type AuthContextValue = {
  user: Session['user'] | null
  loading: boolean
  configured: boolean
  authOpen: boolean
  authMode: AuthMode
  openAuth: (mode?: AuthMode) => void
  closeAuth: () => void
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>('sign-in')

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    let active = true

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setLoading(false)
    })

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
    })

    return () => {
      active = false
      data.subscription.unsubscribe()
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      loading,
      configured: isSupabaseConfigured,
      authOpen,
      authMode,
      openAuth: (mode = 'sign-in') => {
        setAuthMode(mode)
        setAuthOpen(true)
      },
      closeAuth: () => setAuthOpen(false),
      signOut: async () => {
        await supabase?.auth.signOut()
      },
    }),
    [session, loading, authOpen, authMode],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
