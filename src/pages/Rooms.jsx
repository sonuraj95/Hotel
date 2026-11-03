import { useState } from 'react'
import { motion } from 'framer-motion'
import RoomCard from '../components/RoomCard'
import { rooms } from '../data/rooms'

const tags = ['All', 'Classic', 'Popular', 'Signature']

export default function Rooms() {
  const [filter, setFilter] = useState('All')

  const filtered =
    filter === 'All' ? rooms : rooms.filter((r) => r.tag === filter)

  return (
    <div className="pt-32">
      {/* Page header */}
      <section className="container-x pb-14 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          Our Collection
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="section-title mt-3"
        >
          Rooms & Suites
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="section-desc mx-auto mt-4 max-w-xl"
        >
          Six distinct spaces, each with its own story. Find the one that
          feels like yours.
        </motion.p>
      </section>

      {/* Filter bar */}
      <section className="container-x pb-12">
        <div className="flex flex-wrap items-center justify-center gap-3 border-y border-navy/10 py-6">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-5 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors ${
                filter === t
                  ? 'bg-navy text-cream'
                  : 'text-navy/60 hover:text-navy'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="container-x pb-24">
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-sm text-muted">
            No rooms in this category yet.
          </p>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}