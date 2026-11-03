import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Calendar,
  Users,
  User,
  Mail,
  Phone,
  MessageSquare,
  Check,
  ArrowLeft,
} from 'lucide-react'
import Button from '../components/Button'
import { rooms } from '../data/rooms'

/* ---------- Success Screen ---------- */
function Success({ reference, form, room, nights, total }) {
  return (
    <section className="pt-32 pb-24">
      <div className="container-x max-w-2xl text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.7 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold text-navy"
        >
          <Check size={36} strokeWidth={2.5} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="section-label mt-8"
        >
          Reservation Confirmed
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="section-title mt-3"
        >
          Thank you, {form.name.split(' ')[0]}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="section-desc mx-auto mt-4 max-w-md"
        >
          Your stay has been reserved. A confirmation has been sent to{' '}
          <span className="text-navy">{form.email}</span>.
        </motion.p>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 border border-navy/10 bg-cream p-8 text-left"
        >
          <div className="flex items-center justify-between border-b border-navy/10 pb-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
                Booking Reference
              </p>
              <p className="mt-1 font-heading text-2xl text-gold">{reference}</p>
            </div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-navy/60">
              {nights} {nights === 1 ? 'Night' : 'Nights'}
            </span>
          </div>

          <div className="mt-5 grid gap-4 text-sm text-navy/70 md:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Room</p>
              <p className="mt-1 text-navy">{room.name}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Guests</p>
              <p className="mt-1 text-navy">{form.guests}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Check-in</p>
              <p className="mt-1 text-navy">{form.checkIn}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Check-out</p>
              <p className="mt-1 text-navy">{form.checkOut}</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-navy/10 pt-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Total Paid</p>
            <p className="font-heading text-xl text-gold">
              ₹{total.toLocaleString()}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button to="/" variant="solid">
            Back to Home
          </Button>
          <Button to="/rooms">Explore More Rooms</Button>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Field Wrapper ---------- */
function Field({ icon: Icon, label, children, error }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-navy/60">
        <Icon size={12} className="text-gold" />
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}

/* ---------- Main Page ---------- */
export default function Booking() {
  const [searchParams] = useSearchParams()
  const initialRoomId = Number(searchParams.get('room')) || rooms[0].id

  const [form, setForm] = useState({
    roomId: initialRoomId,
    checkIn: '',
    checkOut: '',
    guests: 2,
    name: '',
    email: '',
    phone: '',
    requests: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [reference, setReference] = useState('')

  const today = new Date().toISOString().split('T')[0]
  const selectedRoom = rooms.find((r) => r.id === form.roomId) || rooms[0]

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0
    const diff = Math.ceil(
      (new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24)
    )
    return diff > 0 ? diff : 0
  }, [form.checkIn, form.checkOut])

  const minCheckout = useMemo(() => {
    if (!form.checkIn) return today
    const next = new Date(form.checkIn)
    next.setDate(next.getDate() + 1)
    return next.toISOString().split('T')[0]
  }, [form.checkIn, today])

  const subtotal = nights * selectedRoom.price
  const tax = Math.round(subtotal * 0.12)
  const total = subtotal + tax

  const update = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }))
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.checkIn) e.checkIn = 'Select check-in date'
    if (!form.checkOut) e.checkOut = 'Select check-out date'
    if (form.checkIn && form.checkOut && nights <= 0)
      e.checkOut = 'Check-out must be after check-in'
    if (!form.name.trim()) e.name = 'Enter your name'
    if (!form.email.trim()) e.email = 'Enter your email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email'
    if (!form.phone.trim()) e.phone = 'Enter your phone'
    else if (!/^\d{10,}$/.test(form.phone.replace(/\s+/g, '')))
      e.phone = 'Enter a valid number (10+ digits)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setReference('TGP-' + Math.random().toString(36).substring(2, 8).toUpperCase())
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <Success
        reference={reference}
        form={form}
        room={selectedRoom}
        nights={nights}
        total={total}
      />
    )
  }

  return (
    <>
      {/* Header */}
      <section className="bg-navy pt-32 pb-16">
        <div className="container-x text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-label"
          >
            Reservations
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 font-heading text-4xl leading-tight text-cream md:text-6xl"
          >
            Book Your <span className="italic text-gold">Stay</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-md text-sm text-cream/70"
          >
            A few details, and your escape begins.
          </motion.p>
        </div>
      </section>

      {/* Form + Summary */}
      <section className="container-x py-16 md:py-24">
        <Link
          to="/rooms"
          className="mb-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-navy/60 hover:text-gold"
        >
          <ArrowLeft size={14} /> Back to Rooms
        </Link>

        <form onSubmit={handleSubmit} className="grid gap-12 lg:grid-cols-3">
          {/* ---------- FORM ---------- */}
          <div className="space-y-12 lg:col-span-2">
            {/* Section 1 — Stay Details */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="text-[10px] font-medium tracking-[0.2em] text-gold">
                  01
                </span>
                <h2 className="font-heading text-xl text-navy md:text-2xl">
                  Stay Details
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Field icon={Calendar} label="Check-in" error={errors.checkIn}>
                  <input
                    type="date"
                    min={today}
                    value={form.checkIn}
                    onChange={(e) => update('checkIn', e.target.value)}
                    className="w-full border-b border-navy/20 bg-transparent py-3 text-sm text-navy focus:border-gold focus:outline-none"
                  />
                </Field>

                <Field icon={Calendar} label="Check-out" error={errors.checkOut}>
                  <input
                    type="date"
                    min={minCheckout}
                    value={form.checkOut}
                    onChange={(e) => update('checkOut', e.target.value)}
                    className="w-full border-b border-navy/20 bg-transparent py-3 text-sm text-navy focus:border-gold focus:outline-none"
                  />
                </Field>

                <Field icon={Users} label="Guests">
                  <select
                    value={form.guests}
                    onChange={(e) => update('guests', Number(e.target.value))}
                    className="w-full border-b border-navy/20 bg-transparent py-3 text-sm text-navy focus:border-gold focus:outline-none"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field icon={Calendar} label="Room">
                  <select
                    value={form.roomId}
                    onChange={(e) => update('roomId', Number(e.target.value))}
                    className="w-full border-b border-navy/20 bg-transparent py-3 text-sm text-navy focus:border-gold focus:outline-none"
                  >
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} — ₹{r.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            {/* Section 2 — Guest Info */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="text-[10px] font-medium tracking-[0.2em] text-gold">
                  02
                </span>
                <h2 className="font-heading text-xl text-navy md:text-2xl">
                  Guest Information
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Field icon={User} label="Full Name" error={errors.name}>
                  <input
                    type="text"
                    placeholder="Aanya Kapoor"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className="w-full border-b border-navy/20 bg-transparent py-3 text-sm text-navy placeholder:text-navy/30 focus:border-gold focus:outline-none"
                  />
                </Field>

                <Field icon={Mail} label="Email" error={errors.email}>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className="w-full border-b border-navy/20 bg-transparent py-3 text-sm text-navy placeholder:text-navy/30 focus:border-gold focus:outline-none"
                  />
                </Field>

                <Field icon={Phone} label="Phone" error={errors.phone}>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className="w-full border-b border-navy/20 bg-transparent py-3 text-sm text-navy placeholder:text-navy/30 focus:border-gold focus:outline-none"
                  />
                </Field>
              </div>
            </div>

            {/* Section 3 — Requests */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="text-[10px] font-medium tracking-[0.2em] text-gold">
                  03
                </span>
                <h2 className="font-heading text-xl text-navy md:text-2xl">
                  Special Requests
                </h2>
              </div>

              <Field icon={MessageSquare} label="Anything we should know? (optional)">
                <textarea
                  rows={4}
                  placeholder="Late check-in, dietary needs, celebrations..."
                  value={form.requests}
                  onChange={(e) => update('requests', e.target.value)}
                  className="w-full resize-none border border-navy/20 bg-transparent p-3 text-sm text-navy placeholder:text-navy/30 focus:border-gold focus:outline-none"
                />
              </Field>
            </div>
          </div>

          {/* ---------- SUMMARY ---------- */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 border border-navy/10 bg-cream p-6 md:p-8">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
                Your Reservation
              </p>

              <div className="mt-5 flex gap-4">
                <img
                  src={selectedRoom.image}
                  alt={selectedRoom.name}
                  className="h-20 w-20 shrink-0 object-cover"
                />
                <div>
                  <p className="font-heading text-base text-navy">
                    {selectedRoom.name}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {selectedRoom.size} · up to {selectedRoom.guests} guests
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-navy/10 pt-5 text-sm text-navy/70">
                <div className="flex justify-between">
                  <span className="text-muted">Check-in</span>
                  <span>{form.checkIn || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Check-out</span>
                  <span>{form.checkOut || '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Nights</span>
                  <span>{nights}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Guests</span>
                  <span>{form.guests}</span>
                </div>
              </div>

              <div className="mt-6 space-y-2 border-t border-navy/10 pt-5 text-sm">
                <div className="flex justify-between text-navy/70">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-navy/70">
                  <span>Taxes (12%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-navy/10 pt-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
                    Total
                  </span>
                  <span className="font-heading text-xl text-gold">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="btn-gold-solid mt-6 w-full"
              >
                Confirm Reservation
              </button>

              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.18em] text-muted">
                No charge until arrival
              </p>
            </div>
          </aside>
        </form>
      </section>
    </>
  )
}