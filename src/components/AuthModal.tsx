import { X } from 'lucide-react'
import { useEffect, useId, useState, type FormEvent } from 'react'
import { useAuth, type AuthMode } from '../auth/AuthContext'
import { supabase } from '../lib/supabase'

export function AuthModal() {
  const { authOpen, authMode, closeAuth, openAuth, configured } = useAuth()
  const titleId = useId()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (!authOpen) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAuth()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [authOpen, closeAuth])

  useEffect(() => {
    if (!authOpen) return
    setError('')
    setNotice('')
    setPending(false)
  }, [authOpen, authMode])

  if (!authOpen) return null

  function switchMode(mode: AuthMode) {
    openAuth(mode)
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setNotice('')

    if (!supabase) {
      setError('Add your Supabase URL and anon key to a .env file, then restart the dev server.')
      return
    }

    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    setPending(true)

    if (authMode === 'sign-up') {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name.trim() } },
      })

      setPending(false)

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      if (!data.session) {
        setNotice('Check your email to confirm the account, then sign in.')
        return
      }

      closeAuth()
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    setPending(false)

    if (signInError) {
      setError(signInError.message)
      return
    }

    closeAuth()
  }

  return (
    <div className="auth-backdrop" onClick={closeAuth}>
      <div
        className="auth-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="auth-head">
          <h2 id={titleId}>{authMode === 'sign-up' ? 'Create an account' : 'Sign in'}</h2>
          <button type="button" className="auth-close" aria-label="Close" onClick={closeAuth}>
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="auth-switch" role="tablist" aria-label="Account">
          <button
            type="button"
            className={`tab${authMode === 'sign-in' ? ' is-active' : ''}`}
            aria-selected={authMode === 'sign-in'}
            onClick={() => switchMode('sign-in')}
          >
            Sign in
          </button>
          <button
            type="button"
            className={`tab${authMode === 'sign-up' ? ' is-active' : ''}`}
            aria-selected={authMode === 'sign-up'}
            onClick={() => switchMode('sign-up')}
          >
            Sign up
          </button>
        </div>

        {!configured ? (
          <p className="auth-error">
            Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to a
            .env file in the project folder, then restart the dev server.
          </p>
        ) : null}

        <form className="form-grid" onSubmit={onSubmit}>
          {authMode === 'sign-up' ? (
            <label className="field">
              <span>Name</span>
              <input
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
          ) : null}
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              autoComplete={authMode === 'sign-up' ? 'new-password' : 'current-password'}
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error ? <p className="auth-error">{error}</p> : null}
          {notice ? <p className="form-success">{notice}</p> : null}

          <button className="btn btn-primary" type="submit" disabled={pending || !configured}>
            {pending ? 'Please wait…' : authMode === 'sign-up' ? 'Create account' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
