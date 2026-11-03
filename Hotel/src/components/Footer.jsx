import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa'

const socials = [
  { Icon: FaInstagram, label: 'Instagram' },
  { Icon: FaFacebookF, label: 'Facebook' },
  { Icon: FaTwitter, label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-cream/80">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl text-cream">
              The Grand <span className="text-gold">Palace</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-cream/60">
              A sanctuary of timeless elegance — where every stay becomes a
              story worth telling.
            </p>
            <div className="mt-6 flex gap-4">
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center border border-cream/20 text-cream/70 transition-all hover:border-gold hover:text-gold"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              {['Home', 'Rooms', 'About', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-cream/60 transition-colors hover:text-gold"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-cream/60">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                12 Marine Drive, Mumbai 400020
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-gold" />
                +91 98765 43210
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-gold" />
                stay@grandpalace.com
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-gold">
              Newsletter
            </h4>
            <p className="text-sm text-cream/60">
              Receive curated offers & stories from the Palace.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex border-b border-cream/20 focus-within:border-gold"
            >
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent py-2 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-gold hover:text-cream"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/40 md:flex-row">
          <p>© {new Date().getFullYear()} The Grand Palace. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">Privacy</a>
            <a href="#" className="hover:text-gold">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}