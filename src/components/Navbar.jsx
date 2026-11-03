import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { name: 'Home', path: '/' },
  { name: 'Rooms', path: '/rooms' },
  { name: 'About', path: '/about' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const solid = scrolled || open || !isHome

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-cream/95 backdrop-blur-md border-b border-navy/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={`font-heading text-xl tracking-wide transition-colors md:text-2xl ${
            solid ? 'text-navy' : 'text-cream'
          }`}
        >
          The Grand <span className="text-gold">Palace</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden items-center gap-10 lg:flex">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
                    solid
                      ? isActive
                        ? 'text-gold'
                        : 'text-navy/70 hover:text-navy'
                      : isActive
                        ? 'text-gold'
                        : 'text-cream/80 hover:text-cream'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span
                      className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            to="/booking"
            className="hidden border border-gold px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-gold transition-all duration-300 hover:bg-gold hover:text-navy sm:block"
          >
            Book Now
          </Link>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className={`lg:hidden ${solid ? 'text-navy' : 'text-cream'}`}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-navy/10 bg-cream lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-6">
              {links.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block py-3 text-xs uppercase tracking-[0.18em] transition-colors ${
                        isActive ? 'text-gold' : 'text-navy/70'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              <Link
                to="/booking"
                className="mt-3 border border-gold px-6 py-3 text-center text-[11px] uppercase tracking-[0.18em] text-gold"
              >
                Book Now
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}