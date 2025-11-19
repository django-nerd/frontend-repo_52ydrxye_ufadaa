import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section id="top" className="relative h-[80vh] md:h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-end md:items-center">
        <div className="pb-12 md:pb-0">
          <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-white/70 mb-3">StudioLux</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
            Cinematic Selfie Rooms & Studio Experiences
          </h1>
          <p className="mt-4 max-w-xl text-white/80">
            Futuristic spaces, professional gear, and seamless online booking. Designed for creators.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#booking" className="px-5 py-2.5 rounded-md bg-white text-slate-900 font-semibold">Book a Session</a>
            <a href="#equipment" className="px-5 py-2.5 rounded-md bg-white/10 text-white hover:bg-white/20">Rent Gear</a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/70"></div>
    </section>
  )
}
