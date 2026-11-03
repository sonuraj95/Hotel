import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Button from './Button'

export default function Hero() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2000&q=80"
        alt="The Grand Palace"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-navy/55" />

      {/* Content */}
      <div className="container-x relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="section-label text-gold"
        >
          Est. 1925 — Mumbai
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-6 font-heading text-5xl leading-[1.05] text-cream md:text-7xl lg:text-8xl"
        >
          Where Elegance <br />
          Meets <span className="italic text-gold">Serenity</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-cream/80 md:text-base"
        >
          Experience timeless hospitality at The Grand Palace — a curated
          retreat for those who value the finer things.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button to="/booking" variant="solid">
            Book Your Stay
          </Button>
          <Button
            to="/rooms"
            variant="outline"
            className="text-cream border-cream/60 hover:bg-cream hover:text-navy hover:border-cream"
          >
            Explore Rooms
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/60"
      >
        <ChevronDown size={22} />
      </motion.div>
    </section>
  )
}