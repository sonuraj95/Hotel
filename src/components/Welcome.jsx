import { motion } from 'framer-motion'
import Button from './Button'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: 'easeOut' },
}

export default function Welcome() {
  return (
    <section className="container-x py-24 md:py-32">
      <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
        <motion.div {...fadeUp}>
          <img
            src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80"
            alt="Lobby"
            className="h-[420px] w-full object-cover md:h-[520px]"
          />
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
          <p className="section-label">Welcome to the Palace</p>
          <h2 className="section-title mt-4">
            A legacy of <br />
            <span className="italic text-gold">unhurried luxury</span>
          </h2>
          <p className="section-desc mt-6">
            For nearly a century, The Grand Palace has welcomed travellers
            seeking more than a place to stay — a place to pause. Each room is
            a study in quiet elegance, each meal a curated memory.
          </p>
          <p className="section-desc mt-4">
            We believe the finest luxuries are never loud — they whisper.
          </p>
          <div className="mt-8">
            <Button to="/about">Our Story</Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}