export default function Footer() {
  return (
    <footer className="py-10 bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-white/60 text-sm">
        <div>© {new Date().getFullYear()} StudioLux. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a href="#about" className="hover:text-white">About</a>
          <a href="#contact" className="hover:text-white">Contact</a>
          <a href="#location" className="hover:text-white">Location</a>
        </div>
      </div>
    </footer>
  )
}
