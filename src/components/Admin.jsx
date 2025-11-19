import { useEffect, useState } from 'react'

const api = import.meta.env.VITE_BACKEND_URL

export default function Admin({ token }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    if (!token) return
    fetch(`${api}/api/admin/overview`, { headers: { Authorization: `Bearer ${token}` }})
      .then(r => r.json()).then(setData)
  }, [token])

  if (!token) return null

  return (
    <section className="py-20 bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Admin Dashboard</h2>
        </div>
        {!data ? (
          <div className="text-white/70">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-4 gap-6">
            {Object.entries(data.stats).map(([k,v]) => (
              <div key={k} className="rounded-xl border border-white/10 p-4 bg-white/5">
                <div className="text-white/60 text-xs uppercase tracking-wide">{k}</div>
                <div className="text-white text-3xl font-bold">{v}</div>
              </div>
            ))}
            <div className="md:col-span-2 rounded-xl border border-white/10 p-4 bg-white/5">
              <div className="text-white font-semibold mb-2">Recent Bookings</div>
              <ul className="space-y-2 text-white/80 text-sm">
                {data.recent.bookings.map(b => (
                  <li key={b.id} className="flex justify-between border-b border-white/10 pb-1">
                    <span>{b.room_id}</span><span>${'{'}(b.total_amount||0){'}'}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2 rounded-xl border border-white/10 p-4 bg-white/5">
              <div className="text-white font-semibold mb-2">Recent Payments</div>
              <ul className="space-y-2 text-white/80 text-sm">
                {data.recent.payments.map(p => (
                  <li key={p.id} className="flex justify-between border-b border-white/10 pb-1">
                    <span>{p.status}</span><span>${'{'}p.amount{'}'}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
