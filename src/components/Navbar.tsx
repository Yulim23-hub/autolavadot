import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import { BUSINESS } from '@/config/business';

const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios', desktop: true },
  { href: '#calculadora', label: 'Calculadora', desktop: false },
  { href: '#agenda', label: 'Agenda', desktop: false },
  { href: '#galeria', label: 'Galería', desktop: true },
  { href: '#resenas', label: 'Reseñas', desktop: true },
  { href: '#promociones', label: 'Promociones', desktop: true },
  { href: '#faq', label: 'Preguntas', desktop: false },
  { href: '#ubicacion', label: 'Ubicación', desktop: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'border-b border-white/10 bg-night/90 shadow-lg shadow-black/20 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:h-20">
        <a href="#inicio" className="flex items-center gap-3" onClick={closeMenu}>
          <Logo className="h-10 w-10 transition-transform duration-500 hover:rotate-6" />
          <span className="font-display text-xl uppercase tracking-wide sm:text-2xl">
            Autolavado <span className="text-aqua">Torres</span>
          </span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.filter((link) => link.desktop).map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-mist transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#agenda"
            className="hidden rounded-full bg-aqua px-5 py-2.5 text-sm font-bold text-night transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-aqua/30 sm:inline-flex"
          >
            Agenda ahora
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        id="menu-movil"
        className={`overflow-hidden border-t border-white/10 bg-night/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          menuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 border-transparent opacity-0'
        }`}
      >
        <ul className="grid grid-cols-2 gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                className="block rounded-xl px-4 py-3 text-base font-medium text-mist transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="px-4 pb-5">
          <a
            href="#agenda"
            onClick={closeMenu}
            className="block rounded-full bg-aqua py-3 text-center font-bold text-night"
          >
            Agenda ahora
          </a>
          <p className="mt-3 text-center text-sm text-mist">{BUSINESS.phoneDisplay}</p>
        </div>
      </div>
    </header>
  );
}
