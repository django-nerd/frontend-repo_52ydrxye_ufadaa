import { useEffect, useState } from 'react'

const api = import.meta.env.VITE_BACKEND_URL

export default function Rooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${api}/api/rooms`)
      .then(r => r.json())
      .then(setRooms)
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="rooms" className="relative py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Selfie Rooms</h2>
          <a href="#booking" className="text-white/70 hover:text-white">View Calendar</a>
        </div>
        {loading ? (
          <p className="text-white/60">Loading...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map(room => (
              <div key={room.id} className="group rounded-2xl overflow-hidden bg-gradient-to-b from-slate-800/40 to-slate-900/60 border border-white/10">
                <div className="aspect-[16/10] bg-slate-800">
                  {room.images?.[0] ? (
                    <img src={room.images[0]} alt={room.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">No image</div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white">{room.title}</h3>
                  <p className="text-white/60 text-sm mt-1 line-clamp-3">{room.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-white font-semibold">${'{'}room.price_per_session.toFixed(2){'}'}</span>
                    <a href="#booking" className="px-3 py-1.5 rounded-md bg-white text-slate-900 text-sm font-semibold">Book</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
