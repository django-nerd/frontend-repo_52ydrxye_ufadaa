import { useEffect, useMemo, useState } from 'react'

const api = import.meta.env.VITE_BACKEND_URL

function timeslots() {
  // 9:00 to 21:00 hourly
  const slots = []
  for (let h = 9; h < 21; h++) {
    const start = new Date()
    start.setHours(h, 0, 0, 0)
    const end = new Date(start)
    end.setHours(h + 1)
    slots.push({ start, end })
  }
  return slots
}

export default function Booking({ token }) {
  const [rooms, setRooms] = useState([])
  const [roomId, setRoomId] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [unavailable, setUnavailable] = useState([])
  const [selected, setSelected] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(`${api}/api/rooms`)
      .then(r => r.json())
      .then(data => { setRooms(data); if (data[0]) setRoomId(data[0].id) })
  }, [])

  useEffect(() => {
    if (!roomId || !date) return
    fetch(`${api}/api/rooms/${roomId}/availability?date=${date}`)
      .then(r => r.json())
      .then(d => setUnavailable(d.unavailable || []))
  }, [roomId, date])

  const slots = useMemo(() => timeslots(), [])

  const isBlocked = (slot) => {
    return unavailable.some(b => {
      const s = new Date(b.start_time)
      const e = new Date(b.end_time)
      return slot.start < e && slot.end > s
    })
  }

  const book = async () => {
    if (!selected || !token) { setMessage('Select a time and sign in.'); return }
    const startISO = new Date(`${date}T${selected.start.toTimeString().slice(0,8)}`)
    const endISO = new Date(`${date}T${selected.end.toTimeString().slice(0,8)}`)
    const res = await fetch(`${api}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ room_id: roomId, start_time: startISO, end_time: endISO, total_amount: 59 })
    })
    const data = await res.json()
    if (res.ok) setMessage('Booking confirmed. Proceed to payment below.')
    else setMessage(data.detail || 'Error')
  }

  return (
    <section id="booking" className="py-20 bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Real-time Booking</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-3">
            <select value={roomId} onChange={e => setRoomId(e.target.value)} className="w-full bg-white/5 text-white rounded-md px-3 py-2">
              {rooms.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
            </select>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-white/5 text-white rounded-md px-3 py-2" />
            <div className="text-white/70 text-sm">Select a one-hour slot.</div>
            <button onClick={book} className="px-4 py-2 rounded-md bg-white text-slate-900 font-semibold">Confirm Booking</button>
            {message && <div className="text-white/80 text-sm">{message}</div>}
          </div>
          <div className="md:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {slots.map((s, idx) => {
              const blocked = isBlocked(s)
              const active = selected && selected.start.getHours() === s.start.getHours()
              return (
                <button key={idx} disabled={blocked} onClick={() => setSelected(s)} className={`text-left px-4 py-3 rounded-lg border ${blocked ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/5'} ${active ? 'bg-white text-slate-900 border-transparent' : 'border-white/10 text-white'}`}>
                  {s.start.getHours()}:00 - {s.end.getHours()}:00
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
