import { useState } from 'react'

const api = import.meta.env.VITE_BACKEND_URL

export default function Auth({ onClose, onAuthed }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (mode === 'signup') {
        const res = await fetch(`${api}/api/auth/signup`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        })
        if (!res.ok) throw new Error((await res.json()).detail || 'Signup failed')
      }
      const res = await fetch(`${api}/api/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Login failed')
      onAuthed({ token: data.token, user: data.user })
      onClose()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60">
      <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-xl p-6">
        <h3 className="text-white font-semibold text-lg mb-1">{mode === 'login' ? 'Sign in' : 'Create account'}</h3>
        <p className="text-white/60 text-sm mb-4">Access bookings, rentals, and payments</p>
        <form className="space-y-3" onSubmit={submit}>
          {mode === 'signup' && (
            <input className="w-full bg-white/5 text-white rounded-md px-3 py-2" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
          )}
          <input className="w-full bg-white/5 text-white rounded-md px-3 py-2" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="w-full bg-white/5 text-white rounded-md px-3 py-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button type="submit" className="w-full px-4 py-2 rounded-md bg-white text-slate-900 font-semibold">{mode === 'login' ? 'Sign in' : 'Create account'}</button>
        </form>
        <div className="mt-4 text-white/60 text-sm">
          {mode === 'login' ? (
            <button onClick={() => setMode('signup')} className="underline">New here? Create an account</button>
          ) : (
            <button onClick={() => setMode('login')} className="underline">Already have an account? Sign in</button>
          )}
        </div>
      </div>
    </div>
  )
}
