import { Camera } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { avatarUrl, fullName } from '../auth/account'
import { useAuth } from '../auth/AuthContext'
import { supabase } from '../lib/supabase'
import { Avatar } from './Avatar'

const AVATAR_BUCKET = 'avatars'
const AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_AVATAR_BYTES = 2 * 1024 * 1024

type SavedRequest = {
  id: string
  reservation_date: string
  reservation_time: string
  guests: number
}

function formatDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return value
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function Profile() {
  const { user, loading, openAuth } = useAuth()
  const fileRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [savingName, setSavingName] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [requests, setRequests] = useState<SavedRequest[]>([])

  const savedName = user ? fullName(user) : ''
  const userId = user?.id

  useEffect(() => {
    setName(savedName)
  }, [savedName])

  useEffect(() => {
    if (!userId || !supabase) {
      setRequests([])
      return
    }

    let active = true

    supabase
      .from('reservations')
      .select('id, reservation_date, reservation_time, guests')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .then(({ data, error: loadError }) => {
        if (!active || loadError) return
        setRequests((data ?? []) as SavedRequest[])
      })

    return () => {
      active = false
    }
  }, [userId])

  if (loading) {
    return <section className="section profile" aria-busy="true" />
  }

  if (!user || !supabase) {
    return (
      <section className="section profile" aria-labelledby="profile-title">
        <div className="wrap profile-empty">
          <p className="eyebrow">Your account</p>
          <h1 id="profile-title" className="section-title">
            Profile
          </h1>
          <p className="section-lead">Sign in to view your profile.</p>
          <button type="button" className="btn btn-primary" onClick={() => openAuth('sign-in')}>
            Sign in
          </button>
        </div>
      </section>
    )
  }

  const client = supabase
  const account = user
  const photo = avatarUrl(account)
  const avatarPath = `${account.id}/avatar`
  const memberSince = new Date(account.created_at).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  })

  async function onPhotoChosen(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setError('')
    setNotice('')

    if (!AVATAR_TYPES.includes(file.type)) {
      setError('Choose a JPG, PNG, WebP, or GIF image.')
      return
    }
    if (file.size > MAX_AVATAR_BYTES) {
      setError('Choose an image under 2 MB.')
      return
    }

    setUploading(true)

    const { error: uploadError } = await client.storage
      .from(AVATAR_BUCKET)
      .upload(avatarPath, file, { upsert: true, contentType: file.type })

    if (uploadError) {
      setUploading(false)
      setError(uploadError.message)
      return
    }

    const { data } = client.storage.from(AVATAR_BUCKET).getPublicUrl(avatarPath)
    const { error: updateError } = await client.auth.updateUser({
      data: { avatar_url: `${data.publicUrl}?v=${Date.now()}` },
    })

    setUploading(false)
    if (updateError) setError(updateError.message)
    else setNotice('Profile photo updated.')
  }

  async function removePhoto() {
    setError('')
    setNotice('')
    setUploading(true)

    const { error: removeError } = await client.storage.from(AVATAR_BUCKET).remove([avatarPath])
    const { error: updateError } = removeError
      ? { error: removeError }
      : await client.auth.updateUser({ data: { avatar_url: null } })

    setUploading(false)
    if (updateError) setError(updateError.message)
    else setNotice('Profile photo removed.')
  }

  async function saveName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setNotice('')
    setSavingName(true)

    const { error: updateError } = await client.auth.updateUser({ data: { full_name: name.trim() } })

    setSavingName(false)
    if (updateError) setError(updateError.message)
    else setNotice('Your name has been updated.')
  }

  return (
    <section className="section profile" aria-labelledby="profile-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">Your account</p>
          <h1 id="profile-title" className="section-title">
            Profile
          </h1>
        </div>

        <div className="profile-grid">
          <div className="profile-card profile-photo">
            <Avatar user={account} size="lg" />
            <input
              ref={fileRef}
              type="file"
              accept={AVATAR_TYPES.join(',')}
              hidden
              onChange={(event) => void onPhotoChosen(event)}
            />
            <div className="profile-photo-actions">
              <button
                type="button"
                className="btn btn-outline btn-small"
                disabled={uploading}
                onClick={() => fileRef.current?.click()}
              >
                <Camera size={16} strokeWidth={1.5} />
                {uploading ? 'Saving…' : photo ? 'Change photo' : 'Upload photo'}
              </button>
              {photo ? (
                <button
                  type="button"
                  className="text-button"
                  disabled={uploading}
                  onClick={() => void removePhoto()}
                >
                  Remove photo
                </button>
              ) : null}
            </div>
            <p className="form-note">JPG, PNG, WebP, or GIF up to 2 MB.</p>
          </div>

          <form className="profile-card" onSubmit={(event) => void saveName(event)}>
            <div className="form-grid">
              <label className="field">
                <span>Name</span>
                <input
                  type="text"
                  autoComplete="name"
                  maxLength={80}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </label>
              <label className="field">
                <span>Email</span>
                <input type="email" value={account.email ?? ''} readOnly />
              </label>
            </div>
            <p className="form-note">Member since {memberSince}</p>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={savingName || name.trim() === savedName}
            >
              {savingName ? 'Saving…' : 'Save changes'}
            </button>
          </form>
        </div>

        <div className="form-status" aria-live="polite">
          {notice ? <p className="form-success">{notice}</p> : null}
          {error ? <p className="auth-error">{error}</p> : null}
        </div>

        <div className="profile-card profile-requests">
          <h2>Reservation requests</h2>
          {requests.length > 0 ? (
            <ul className="profile-request-list">
              {requests.map((request) => (
                <li key={request.id}>
                  <span>{formatDate(request.reservation_date)}</span>
                  <span>
                    {request.reservation_time} · {request.guests} {request.guests === 1 ? 'guest' : 'guests'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="form-note">
              No requests yet.{' '}
              <a className="contact-link" href="#contact">
                Reserve a table
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
