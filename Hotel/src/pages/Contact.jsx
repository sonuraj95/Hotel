import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  User,
  MessageSquare,
  Send,
  Check,
} from 'lucide-react'
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from 'react-icons/fa'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: 'easeOut' },
}

/* ---------------- Data ---------------- */
const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['12 Marine Drive', 'Mumbai 400020, India'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+91 98765 43210', '+91 22 4567 8900'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['stay@grandpalace.com', 'events@grandpalace.com'],
  },
  {
    icon: Clock,
    title: 'Front Desk',
    lines: ['Open 24 hours', 'Every day of the year'],
  },
]

const socials = [
  { Icon: FaInstagram, label: 'Instagram', href: '#' },
  { Icon: FaFacebookF, label: 'Facebook', href: '#' },
  { Icon: FaTwitter, label: 'Twitter', href: '#' },
  { Icon: FaLinkedinIn, label: 'LinkedIn', href: '#' },
]

/* ---------------- Field ---------------- */
function Field({ icon: Icon, label, error, children }) {
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

/* ---------------- Hero ---------------- */
function ContactHero() {
  return (
    <section className="relative flex h-[55vh] min-h-[420px] items-center justify-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=2000&q=80"
        alt="Contact"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy/65" />
      <div className="container-x relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="section-label text-gold"
        >
          Get in Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-4 font-heading text-5xl leading-tight text-cream md:text-7xl"
        >
          We'd love to <br />
          <span className="italic text-gold">hear from you</span>
        </motion.h1>
      </div>
    </section>
  )
}

/* ---------------- Info Cards ---------------- */
function InfoCards() {
  return (
    <section className="container-x -mt-16 relative z-10 pb-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {contactInfo.map((info, i) => (
          <motion.div
            key={info.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="border border-navy/10 bg-cream p-7"
          >
            <div className="flex h-11 w-11 items-center justify-center border border-gold/40">
              <info.icon size={18} className="text-gold" strokeWidth={1.4} />
            </div>
            <h3 className="mt-5 font-heading text-lg text-navy">
              {info.title}
            </h3>
            <div className="mt-2 space-y-0.5">
              {info.lines.map((l) => (
                <p key={l} className="text-sm text-muted">
                  {l}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Form + Map ---------------- */
function FormSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }))
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Enter your name'
    if (!form.email.trim()) e.email = 'Enter your email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email'
    if (!form.subject.trim()) e.subject = 'Enter a subject'
    if (!form.message.trim()) e.message = 'Enter your message'
    else if (form.message.trim().length < 10)
      e.message = 'Message is too short'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section className="container-x pb-24 md:pb-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* FORM */}
        <motion.div {...fadeUp}>
          <p className="section-label">Write to Us</p>
          <h2 className="section-title mt-3">Send a message</h2>
          <p className="section-desc mt-4">
            Whether it's a reservation, an event, or simply a hello — we read
            every message with care.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-7">
            <div className="grid gap-7 sm:grid-cols-2">
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
            </div>

            <Field icon={MessageSquare} label="Subject" error={errors.subject}>
              <input
                type="text"
                placeholder="Reservation enquiry"
                value={form.subject}
                onChange={(e) => update('subject', e.target.value)}
                className="w-full border-b border-navy/20 bg-transparent py-3 text-sm text-navy placeholder:text-navy/30 focus:border-gold focus:outline-none"
              />
            </Field>

            <Field icon={MessageSquare} label="Message" error={errors.message}>
              <textarea
                rows={5}
                placeholder="Tell us how we can help..."
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                className="w-full resize-none border border-navy/20 bg-transparent p-3 text-sm text-navy placeholder:text-navy/30 focus:border-gold focus:outline-none"
              />
            </Field>

            <div className="flex items-center gap-4">
              <button type="submit" className="btn-gold-solid">
                <Send size={14} />
                Send Message
              </button>

              {sent && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-xs text-green-700"
                >
                  <Check size={14} />
                  Message sent — we'll be in touch.
                </motion.p>
              )}
            </div>
          </form>
        </motion.div>

        {/* MAP + SOCIAL */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          className="flex flex-col"
        >
          {/* Map */}
          <div className="relative h-[380px] overflow-hidden border border-navy/10 lg:h-full lg:min-h-[420px]">
            <iframe
              title="The Grand Palace Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.5993608795815!2d72.82374357352507!3d18.94012063217139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1e26a1c0ea1%3A0x9b8f2e4a0f3a6c1f!2sMarine%20Drive%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(1) contrast(0.95)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Socials */}
          <div className="mt-8 border border-navy/10 bg-cream p-7">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
              Follow the Palace
            </p>
            <div className="mt-4 flex gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center border border-navy/15 text-navy/60 transition-all hover:border-gold hover:text-gold"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              For press, partnerships, or event enquiries, write to us at{' '}
              <a
                href="mailto:events@grandpalace.com"
                className="text-gold hover:underline"
              >
                events@grandpalace.com
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------- Page ---------------- */
export default function Contact() {
  return (
    <>
      <ContactHero />
      <InfoCards />
      <FormSection />
    </>
  )
}