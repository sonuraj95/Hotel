import { motion } from 'framer-motion'
import { Quote, Award, Heart, Leaf } from 'lucide-react'
import Button from '../components/Button'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: 'easeOut' },
}

/* ---------------- Data ---------------- */
const timeline = [
  {
    year: '1925',
    title: 'A Vision is Born',
    text: 'The Grand Palace opens its doors on Marine Drive — a modest 24-room retreat with a single promise: to make every guest feel at home.',
  },
  {
    year: '1952',
    title: 'The Golden Era',
    text: 'A decade of expansion. The Palace becomes a gathering place for artists, writers, and travellers from across the world.',
  },
  {
    year: '1978',
    title: 'A New Wing',
    text: 'The Heritage Wing is unveiled — designed by celebrated architect Meher Bhandari, blending old-world charm with modern comfort.',
  },
  {
    year: '2001',
    title: 'Restoration',
    text: 'A three-year restoration brings the Palace back to its original splendour, using handcrafted materials and traditional techniques.',
  },
  {
    year: '2025',
    title: 'A Century of Hospitality',
    text: 'One hundred years on, The Grand Palace remains a sanctuary — quieter, warmer, and more intentional than ever.',
  },
]

const team = [
  {
    name: 'Arjun Mehta',
    role: 'General Manager',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
  },
  {
    name: 'Priya Nair',
    role: 'Head of Guest Experience',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
  },
  {
    name: 'Rohan Kapoor',
    role: 'Executive Chef',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  },
  {
    name: 'Meera Joshi',
    role: 'Concierge Director',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80',
  },
]

const values = [
  {
    icon: Heart,
    title: 'Warmth',
    text: 'We greet every guest as we would a friend — with care, curiosity, and quiet attention.',
  },
  {
    icon: Award,
    title: 'Craft',
    text: 'From the linens to the lighting, every detail is chosen with intention and refined over time.',
  },
  {
    icon: Leaf,
    title: 'Stewardship',
    text: 'We care for the Palace, its heritage, and its surroundings — so the next century arrives intact.',
  },
]

/* ---------------- Hero ---------------- */
function AboutHero() {
  return (
    <section className="relative flex h-[70vh] min-h-[520px] items-center justify-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=2000&q=80"
        alt="The Grand Palace"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy/60" />
      <div className="container-x relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="section-label text-gold"
        >
          Our Story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-4 font-heading text-5xl leading-tight text-cream md:text-7xl"
        >
          A Century of <br />
          <span className="italic text-gold">Quiet Luxury</span>
        </motion.h1>
      </div>
    </section>
  )
}

/* ---------------- Intro ---------------- */
function Intro() {
  return (
    <section className="container-x py-24 md:py-32">
      <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
        <motion.div {...fadeUp}>
          <p className="section-label">Since 1925</p>
          <h2 className="section-title mt-4">
            A house built on <br />
            <span className="italic text-gold">hospitality</span>
          </h2>
          <p className="section-desc mt-6">
            The Grand Palace began as a simple dream — a place where travellers
            could rest, gather, and feel genuinely welcome. Nearly a hundred
            years later, that dream remains the heart of everything we do.
          </p>
          <p className="section-desc mt-4">
            We are not the largest hotel in the city, and we never aimed to be.
            We are a home for those who value warmth over grandeur, and story
            over spectacle.
          </p>
          <div className="mt-8">
            <Button to="/rooms">Explore Our Rooms</Button>
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
          <img
            src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80"
            alt="The Palace interior"
            className="h-[420px] w-full object-cover md:h-[560px]"
          />
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------- Quote ---------------- */
function QuoteSection() {
  return (
    <section className="border-y border-navy/10 bg-cream py-20 md:py-28">
      <motion.div {...fadeUp} className="container-x max-w-3xl text-center">
        <Quote size={32} className="mx-auto text-gold" strokeWidth={1.2} />
        <p className="mt-6 font-heading text-2xl leading-relaxed text-navy md:text-4xl">
          “The finest hotels are not remembered for their rooms, but for how
          they made you feel.”
        </p>
        <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-muted">
          — Arjun Mehta, General Manager
        </p>
      </motion.div>
    </section>
  )
}

/* ---------------- Timeline ---------------- */
function Timeline() {
  return (
    <section className="container-x py-24 md:py-32">
      <motion.div {...fadeUp} className="text-center">
        <p className="section-label">Our Journey</p>
        <h2 className="section-title mt-3">A century in moments</h2>
      </motion.div>

      <div className="relative mt-16">
        {/* Center line (desktop) */}
        <div className="absolute left-4 top-0 h-full w-px bg-navy/15 md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-12 md:space-y-20">
          {timeline.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative pl-12 md:grid md:grid-cols-2 md:gap-16 md:pl-0 ${
                  isLeft ? '' : 'md:[direction:rtl]'
                }`}
              >
                {/* Dot */}
                <span className="absolute left-[9px] top-2 h-3 w-3 rounded-full border-2 border-gold bg-cream md:left-1/2 md:-translate-x-1/2" />

                {/* Content */}
                <div
                  className={`md:[direction:ltr] ${
                    isLeft ? 'md:pr-4 md:text-right' : 'md:col-start-2 md:pl-4'
                  }`}
                >
                  <p className="font-heading text-3xl text-gold md:text-4xl">
                    {item.year}
                  </p>
                  <h3 className="mt-2 font-heading text-xl text-navy md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Values ---------------- */
function Values() {
  return (
    <section className="bg-navy py-24 md:py-32">
      <div className="container-x">
        <motion.div {...fadeUp} className="text-center">
          <p className="section-label">What We Believe</p>
          <h2 className="mt-3 font-heading text-4xl leading-tight text-cream md:text-5xl">
            Three quiet principles
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center border border-gold/40">
                <v.icon size={24} strokeWidth={1.3} className="text-gold" />
              </div>
              <h3 className="mt-6 font-heading text-xl text-cream">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/60">
                {v.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Team ---------------- */
function Team() {
  return (
    <section className="container-x py-24 md:py-32">
      <motion.div {...fadeUp} className="text-center">
        <p className="section-label">The People</p>
        <h2 className="section-title mt-3">Behind the Palace</h2>
        <p className="section-desc mx-auto mt-4 max-w-xl">
          A small team with a shared belief — that hospitality is the art of
          paying attention.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group text-center"
          >
            <div className="overflow-hidden">
              <img
                src={m.image}
                alt={m.name}
                className="h-[360px] w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
            <h3 className="mt-5 font-heading text-lg text-navy">{m.name}</h3>
            <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-gold">
              {m.role}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- CTA ---------------- */
function CTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <img
        src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=2000&q=80"
        alt="Stay"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-navy/70" />
      <motion.div {...fadeUp} className="container-x relative z-10 text-center">
        <p className="section-label">Be our guest</p>
        <h2 className="mt-4 font-heading text-4xl leading-tight text-cream md:text-6xl">
          Your chapter <span className="italic text-gold">begins here</span>
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button to="/booking" variant="solid">
            Book Your Stay
          </Button>
          <Button
            to="/contact"
            variant="outline"
            className="border-cream/60 text-cream hover:border-cream hover:bg-cream hover:text-navy"
          >
            Get in Touch
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

/* ---------------- Page ---------------- */
export default function About() {
  return (
    <>
      <AboutHero />
      <Intro />
      <QuoteSection />
      <Timeline />
      <Values />
      <Team />
      <CTA />
    </>
  )
}