import { useEffect, useState } from 'react'
import { Menu, X, Camera, LogIn, User, LogOut, LayoutDashboard } from 'lucide-react'

export default function Navbar({ onOpenAuth, user, onLogout, onAdmin }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const nav = document.getElementById('nav')
      if (!nav) return
      if (window.scrollY > 10) nav.classList.add('backdrop-blur-md', 'bg-slate-900/40', 'border-b', 'border-white/10')
      else nav.classList.remove('backdrop-blur-md', 'bg-slate-900/40', 'border-b', 'border-white/10')
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#rooms', label: 'Selfie Rooms' },
    { href: '#booking', label: 'Booking' },
    { href: '#equipment', label: 'Equipment' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav id="nav" className="fixed top-0 left-0 right-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#top" className="flex items-center gap-2 text-white font-semibold tracking-tight">
            <Camera className="w-5 h-5" /> StudioLux
          </a>
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-slate-200 hover:text-white transition-colors">{l.label}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {user.is_admin && (
                  <button onClick={onAdmin} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm">
                    <LayoutDashboard className="w-4 h-4" /> Admin
                  </button>
                )}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 text-white text-sm">
                  <User className="w-4 h-4" /> {user.name || 'User'}
                </div>
                <button onClick={onLogout} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <button onClick={onOpenAuth} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white text-slate-900 text-sm font-semibold">
                <LogIn className="w-4 h-4" /> Sign in
              </button>
            )}
          </div>
          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-slate-900/90 backdrop-blur border-t border-white/10 px-4 py-3 space-y-2">
          {links.map(l => (
            <a key={l.href} href={l.href} className="block text-slate-200" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <div className="pt-2">
            {user ? (
              <button onClick={onLogout} className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-white/10 text-white">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            ) : (
              <button onClick={onOpenAuth} className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-white text-slate-900 font-semibold">
                <LogIn className="w-4 h-4" /> Sign in
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
