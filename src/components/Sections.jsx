export function About() {
  return (
    <section id="about" className="py-20 bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">About StudioLux</h2>
        <p className="max-w-3xl text-white/70">We craft cinematic environments for creators and brands. Our themed selfie rooms, professional studio, and gear rentals are designed to make content production fast, beautiful, and fun. Smooth online booking and payments keep you in the flow.</p>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Contact</h2>
        <p className="text-white/70">Email: hello@studiolux.example • Phone: (555) 987-1234</p>
      </div>
    </section>
  )
}

export function Location() {
  return (
    <section id="location" className="py-20 bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Location</h2>
        <p className="text-white/70">123 Neon Ave, Creative City</p>
        <div className="mt-6 h-64 w-full rounded-xl overflow-hidden border border-white/10">
          <iframe title="map" width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen src="https://www.openstreetmap.org/export/embed.html?bbox=-0.15%2C51.5%2C-0.1%2C51.52&layer=mapnik"></iframe>
        </div>
      </div>
    </section>
  )
}
