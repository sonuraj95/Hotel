import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function RoomCard({ room, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <Link to={`/rooms/${room.id}`} className="group block">
        <div className="relative overflow-hidden">
          <img
            src={room.image}
            alt={room.name}
            className="h-[340px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 bg-cream px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-navy">
            {room.tag}
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading text-xl text-navy">{room.name}</h3>
            <p className="mt-1 text-xs text-muted">
              {room.size} · {room.guests} Guests
            </p>
          </div>
          <p className="whitespace-nowrap text-sm text-gold">
            ₹{room.price.toLocaleString()}
            <span className="text-[10px] text-muted"> / night</span>
          </p>
        </div>
      </Link>
    </motion.div>
  )
}