import { useState } from 'react'

const api = import.meta.env.VITE_BACKEND_URL

export default function Checkout({ token }) {
  const [amount, setAmount] = useState(59)
  const [status, setStatus] = useState('')

  const pay = async () => {
    if (!token) return alert('Sign in to pay')
    const res = await fetch(`${api}/api/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ amount: Number(amount), items: [{ label: 'Studio Session', quantity: 1, amount: Number(amount) }], related_type: 'booking', related_id: 'placeholder' })
    })
    const data = await res.json()
    if (res.ok) setStatus('Payment successful')
    else setStatus(data.detail || 'Payment failed')
  }

  return (
    <section className="py-16 bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-2xl font-semibold text-white mb-4">Checkout</h3>
        <div className="flex items-center gap-3">
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="bg-white/5 text-white rounded-md px-3 py-2 w-40" />
          <button onClick={pay} className="px-4 py-2 rounded-md bg-white text-slate-900 font-semibold">Pay</button>
          {status && <div className="text-white/80 text-sm">{status}</div>}
        </div>
      </div>
    </section>
  )
}
