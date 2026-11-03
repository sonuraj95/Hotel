import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

/* ---------------- Data ---------------- */
const images = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    category: 'Exterior',
    caption: 'The Palace at dusk',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',
    category: 'Rooms',
    caption: 'Deluxe Garden View',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80',
    category: 'Lobby',
    caption: 'The welcome lounge',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
    category: 'Rooms',
    caption: 'Premium Ocean Suite',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
    category: 'Dining',
    caption: 'The dining salon',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80',
    category: 'Pool',
    caption: 'The infinity pool',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
    category: 'Exterior',
    caption: 'Sunrise over the terrace',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
    category: 'Rooms',
    caption: 'Royal Palace Suite',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80',
    category: 'Spa',
    caption: 'The signature spa',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80',
    category: 'Dining',
    caption: 'Morning at the café',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
    category: 'Rooms',
    caption: 'Heritage Twin Room',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80',
    category: 'Lobby',
    caption: 'Quiet corners',
  },
]

const categories = ['All', 'Exterior', 'Rooms', 'Lobby', 'Dining', 'Pool', 'Spa']

/* ---------------- Lightbox ---------------- */
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  const current = images[index]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center border border-cream/20 text-cream/70 transition-colors hover:border-gold hover:text-gold"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <p className="absolute left-1/2 top-7 -translate-x-1/2 text-[10px] uppercase tracking-[0.22em] text-cream/50">
        {index + 1} / {images.length}
      </p>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        aria-label="Previous"
        className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center border border-cream/20 text-cream/70 transition-colors hover:border-gold hover:text-gold md:left-8"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.3 }}
          className="max-h-[80vh] max-w-[90vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={current.src}
            alt={current.caption}
            className="max-h-[80vh] w-auto object-contain"
          />
          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.2em] text-cream/60">
            {current.caption}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        aria-label="Next"
        className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center border border-cream/20 text-cream/70 transition-colors hover:border-gold hover:text-gold md:right-8"
      >
        <ChevronRight size={22} />
      </button>
    </motion.div>
  )
}

/* ---------------- Page ---------------- */
export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filtered =
    filter === 'All' ? images : images.filter((i) => i.category === filter)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevImage = useCallback(
    () =>
      setLightboxIndex((p) => (p === null ? null : (p - 1 + filtered.length) % filtered.length)),
    [filtered.length]
  )
  const nextImage = useCallback(
    () => setLightboxIndex((p) => (p === null ? null : (p + 1) % filtered.length)),
    [filtered.length]
  )

  return (
    <div className="pt-32">
      {/* Header */}
      <section className="container-x pb-14 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-label"
        >
          Visual Diary
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="section-title mt-3"
        >
          Moments at the Palace
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="section-desc mx-auto mt-4 max-w-xl"
        >
          A glimpse into the spaces, details, and quiet corners that make up
          The Grand Palace.
        </motion.p>
      </section>

      {/* Filter bar */}
      <section className="container-x pb-12">
        <div className="flex flex-wrap items-center justify-center gap-2 border-y border-navy/10 py-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors ${
                filter === c
                  ? 'bg-navy text-cream'
                  : 'text-navy/60 hover:text-navy'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="container-x pb-24">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {filtered.map((img, i) => (
            <motion.button
              key={img.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              onClick={() => setLightboxIndex(i)}
              className="group relative block w-full overflow-hidden text-left"
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 flex items-end bg-navy/0 p-5 opacity-0 transition-all duration-500 group-hover:bg-navy/40 group-hover:opacity-100">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-gold">
                    {img.category}
                  </p>
                  <p className="mt-1 font-heading text-lg text-cream">
                    {img.caption}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </div>
  )
}