export default function Portfolio() {
  const items = Array.from({ length: 9 }).map((_, i) => ({ id: i, src: `https://images.unsplash.com/photo-15${30+i}000000-0a9f0${i}0b7?auto=format&fit=crop&w=1200&q=60` }))
  return (
    <section id="portfolio" className="py-20 bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Studio Portfolio</h2>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]
         *:mb-4">
          {items.map(it => (
            <img key={it.id} src={it.src} alt="Portfolio" className="w-full rounded-xl border border-white/10" />
          ))}
        </div>
      </div>
    </section>
  )
}
