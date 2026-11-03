import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Wifi,
  Waves,
  UtensilsCrossed,
  Dumbbell,
  Sparkles,
  Car,
  ArrowRight,
  Star,
} from 'lucide-react'
import Button from '../components/Button'
import Hero from '../components/Hero'
import Welcome from '../components/Welcome'
import RoomCard from '../components/RoomCard'
import { rooms } from '../data/rooms'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: 'easeOut' },
}

function FeaturedRooms() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-x">
        <motion.div
          {...fadeUp}
          className="mb-14 flex flex-col items-end justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="section-label">Accommodation</p>
            <h2 className="section-title mt-3">Featured Rooms</h2>
          </div>
          <Link
            to="/rooms"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-navy hover:text-gold"
          >
            View all
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {rooms.slice(0, 3).map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

const amenities = [
  { icon: Wifi, label: 'High-Speed Wi-Fi' },
  { icon: Waves, label: 'Infinity Pool' },
  { icon: UtensilsCrossed, label: 'Fine Dining' },
  { icon: Dumbbell, label: 'Fitness Studio' },
  { icon: Sparkles, label: 'Signature Spa' },
  { icon: Car, label: 'Valet Parking' },
]

function Amenities() {
  return (
    <section className="border-y border-navy/10 py-24">
      <div className="container-x">
        <motion.div {...fadeUp} className="text-center">
          <p className="section-label">Amenities</p>
          <h2 className="section-title mt-3">Every detail, considered</h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
          {amenities.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center"
            >
              <a.icon size={28} strokeWidth={1.2} className="text-gold" />
              <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-navy/70">
                {a.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonial() {
  return (
    <section className="container-x py-24 text-center md:py-32">
      <motion.div {...fadeUp} className="mx-auto max-w-3xl">
        <div className="mb-6 flex justify-center gap-1 text-gold">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
        </div>
        <p className="font-heading text-2xl leading-relaxed text-navy md:text-4xl">
          “A stay at The Grand Palace feels like stepping into a world where
          time slows and every detail is a quiet love letter to hospitality.”
        </p>
        <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-muted">
          — Aanya Kapoor, Travel Editor
        </p>
      </motion.div>
    </section>
  )
}

function CTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <img
        src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=2000&q=80"
        alt="Stay"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy/65" />
      <motion.div {...fadeUp} className="container-x relative z-10 text-center">
        <p className="section-label">Your escape awaits</p>
        <h2 className="mt-4 font-heading text-4xl leading-tight text-cream md:text-6xl">
          Reserve your <span className="italic text-gold">chapter</span>
        </h2>
        <div className="mt-10">
          <Button to="/booking" variant="solid">
            Book Now
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <FeaturedRooms />
      <Amenities />
      <Testimonial />
      <CTA />
    </>
  )
}