import { MessageCircle } from 'lucide-react';
import Logo from '@/components/Logo';
import { BUSINESS } from '@/config/business';
import { buildWhatsappUrl } from '@/lib/format';

const FOOTER_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#calculadora', label: 'Calculadora' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#galeria', label: 'Galería' },
  { href: '#resenas', label: 'Reseñas' },
  { href: '#promociones', label: 'Promociones' },
  { href: '#faq', label: 'Preguntas' },
  { href: '#ubicacion', label: 'Ubicación' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <a href="#inicio" className="flex items-center gap-3">
            <Logo className="h-11 w-11" />
            <span className="font-display text-2xl uppercase tracking-wide">
              Autolavado <span className="text-aqua">Torres</span>
            </span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-mist">
            {BUSINESS.slogan}. Lavado de auto, camioneta y moto en Toluca desde hace más de 10 años.
          </p>
        </div>

        <nav aria-label="Pie de página">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-4">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-mist transition-colors hover:text-aqua">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 px-4 pt-8 text-xs text-mist sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} Autolavado Torres. Todos los derechos reservados.</p>
        <a
          href={buildWhatsappUrl('Hola, quiero agendar un lavado.')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 transition-colors hover:text-aqua"
        >
          <MessageCircle className="h-4 w-4" />
          {BUSINESS.phoneDisplay}
        </a>
      </div>
    </footer>
  );
}
