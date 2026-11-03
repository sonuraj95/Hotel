import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Users, Maximize, BedDouble } from 'lucide-react'
import Button from '../components/Button'
import RoomCard from '../components/RoomCard'
import { rooms } from '../data/rooms'

export default function RoomDetails() {
    const { id } = useParams()
    const room = rooms.find((r) => r.id === Number(id))

    if (!room) {
        return (
            <div className="container-x pt-40 pb-24 text-center">
                <p className="section-label">Not found</p>
                <h1 className="section-title mt-3">This room doesn’t exist</h1>
                <div className="mt-8">
                    <Button to="/rooms">Back to Rooms</Button>
                </div>
            </div>
        )
    }

    const others = rooms.filter((r) => r.id !== room.id).slice(0, 3)

    return (
        <div className="pt-28">
            {/* Back */}
            <div className="container-x py-6">
                <Link
                    to="/rooms"
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-navy/60 hover:text-gold"
                >
                    <ArrowLeft size={14} /> All Rooms
                </Link>
            </div>

            {/* Gallery + Info */}
            <section className="container-x pb-20">
                <div className="grid gap-10 lg:grid-cols-2">
                    {/* Gallery */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="overflow-hidden">
                            <img
                                src={room.gallery[0] || room.image}
                                alt={room.name}
                                className="h-[420px] w-full object-cover md:h-[520px]"
                            />
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-2">
                            {room.gallery.slice(1, 4).map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt={`${room.name} ${i + 2}`}
                                    className="h-24 w-full object-cover md:h-32"
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="lg:pl-8"
                    >
                        <span className="section-label">{room.tag}</span>
                        <h1 className="section-title mt-3">{room.name}</h1>

                        <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
                            {room.description}
                        </p>

                        {/* Price */}
                        <div className="mt-8 border-y border-navy/10 py-5">
                            <p className="text-2xl font-heading text-gold">
                                ₹{room.price.toLocaleString()}
                                <span className="ml-1 text-xs text-muted font-body">/ night</span>
                            </p>
                        </div>

                        {/* Specs */}
                        <div className="mt-6 grid grid-cols-3 gap-4 text-xs text-navy/70">
                            <div className="flex flex-col items-start gap-2">
                                <Maximize size={16} className="text-gold" />
                                <span>{room.size}</span>
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <Users size={16} className="text-gold" />
                                <span>{room.guests} Guests</span>
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <BedDouble size={16} className="text-gold" />
                                <span>{room.beds}</span>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="mt-8">
                            <h3 className="text-[11px] font-medium uppercase tracking-[0.22em] text-navy/60">
                                Amenities
                            </h3>
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                {room.amenities.map((a) => (
                                    <div
                                        key={a}
                                        className="flex items-center gap-2 text-sm text-navy/70"
                                    >
                                        <Check size={14} className="shrink-0 text-gold" />
                                        {a}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10">
                            <Button to={`/booking?room=${room.id}`} variant="solid" className="w-full md:w-auto">
                                Book This Room
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* You may also like */}
            <section className="border-t border-navy/10 py-20">
                <div className="container-x">
                    <div className="mb-12 flex items-end justify-between">
                        <div>
                            <p className="section-label">Also explore</p>
                            <h2 className="section-title mt-3">You may also like</h2>
                        </div>
                        <Link
                            to="/rooms"
                            className="text-[11px] uppercase tracking-[0.18em] text-navy hover:text-gold"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {others.map((r, i) => (
                            <RoomCard key={r.id} room={r} index={i} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}