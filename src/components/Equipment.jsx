import { useEffect, useState } from 'react'

const api = import.meta.env.VITE_BACKEND_URL

export default function Equipment({ token }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch(`${api}/api/equipment`)
      .then(r => r.json())
      .then(setItems)
  }, [])

  const rent = async (equipment_id) => {
    if (!token) return alert('Sign in to rent')
    const start = new Date()
    const end = new Date(Date.now() + 24*60*60*1000)
    const res = await fetch(`${api}/api/rentals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ equipment_id, start_date: start, end_date: end, days: 1, total_amount: 49 })
    })
    if (res.ok) alert('Rental confirmed')
  }

  return (
    <section id="equipment" className="py-20 bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Equipment Rentals</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="group rounded-2xl overflow-hidden bg-gradient-to-b from-slate-800/40 to-slate-900/60 border border-white/10">
              <div className="aspect-[16/10] bg-slate-800">
                {item.images?.[0] ? (
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">No image</div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="text-white/60 text-sm mt-1 line-clamp-3">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-white font-semibold">${'{'}item.price_per_day.toFixed(2){'}'}/day</span>
                  <button onClick={() => rent(item.id)} className="px-3 py-1.5 rounded-md bg-white text-slate-900 text-sm font-semibold">Rent</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
