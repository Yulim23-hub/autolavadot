import { CalendarCheck, MessageCircle, Droplets, Sparkles, Banknote } from 'lucide-react';
import CarIllustration from '@/components/CarIllustration';
import { buildWhatsappUrl } from '@/lib/format';
import { useOpenNow } from '@/hooks/useOpenNow';

const WHATSAPP_MESSAGE = 'Hola, quiero información para lavar mi vehículo en Autolavado Torres.';

const DROPS = [
  { left: '34%', delay: '0s' },
  { left: '48%', delay: '0.8s' },
  { left: '62%', delay: '1.5s' },
  { left: '76%', delay: '0.4s' },
];

const BUBBLES = [
  { left: '12%', size: 14, delay: '0s', duration: '4.6s' },
  { left: '22%', size: 8, delay: '1.3s', duration: '5.2s' },
  { left: '84%', size: 18, delay: '0.6s', duration: '4.2s' },
  { left: '92%', size: 10, delay: '2.2s', duration: '5.6s' },
  { left: '60%', size: 6, delay: '1.9s', duration: '3.8s' },
];

export default function Hero() {
  const open = useOpenNow();

  return (
    <section id="inicio" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(47,123,255,0.35),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(0,194,255,0.18),transparent_55%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="animate-fade-up">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium ${
                open ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300' : 'border-white/15 bg-white/5 text-mist'
              }`}
              role="status"
            >
              <span className="relative flex h-2.5 w-2.5">
                {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
                <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${open ? 'bg-emerald-400' : 'bg-mist'}`} />
              </span>
              {open ? 'Abierto ahora' : 'Cerrado'}
            </span>
            <span className="text-sm text-mist">Más de 10 años de experiencia</span>
          </div>

          <h1 className="mt-6 font-display text-5xl uppercase leading-[1.05] sm:text-6xl lg:text-7xl">
            Tu auto con un <span className="text-aqua">brillo que se nota</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
            Lavado exterior, interior y encerado con la atención de siempre. Atendido por el señor Torres en el corazón
            de Toluca, de lunes a sábado.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#agenda"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-aqua px-7 py-4 text-base font-bold text-night shadow-lg shadow-aqua/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-aqua/35"
            >
              <CalendarCheck className="h-5 w-5" />
              Agenda tu lavado ahora
            </a>
            <a
              href={buildWhatsappUrl(WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-base font-medium text-white transition-colors hover:border-aqua hover:text-aqua"
            >
              <MessageCircle className="h-5 w-5" />
              Escríbenos por WhatsApp
            </a>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 text-sm text-mist sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 shrink-0 text-aqua" />
              Lun a sáb, 9:00 a 17:00
            </li>
            <li className="flex items-center gap-2">
              <Droplets className="h-4 w-4 shrink-0 text-aqua" />
              Av. Independencia 123, Centro
            </li>
            <li className="flex items-center gap-2">
              <Banknote className="h-4 w-4 shrink-0 text-aqua" />
              Efectivo, tarjeta y transferencia
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xl animate-float">
          <div aria-hidden="true" className="absolute inset-6 rounded-[2.5rem] bg-gradient-to-br from-azure/30 to-aqua/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-night-800/80 p-6 shadow-2xl shadow-black/40 sm:p-10">
            <div className="relative aspect-[2/1] w-full">
              <CarIllustration color="#2F7BFF" animated />
              {DROPS.map((drop, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="absolute top-0 h-5 w-3 animate-drop rounded-b-full rounded-t-[50%] bg-gradient-to-b from-aqua to-azure/60"
                  style={{ left: drop.left, animationDelay: drop.delay }}
                />
              ))}
              {BUBBLES.map((bubble, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="absolute bottom-4 animate-bubble rounded-full border border-aqua/60 bg-aqua/15"
                  style={{
                    left: bubble.left,
                    width: bubble.size,
                    height: bubble.size,
                    animationDelay: bubble.delay,
                    animationDuration: bubble.duration,
                  }}
                />
              ))}
              <span
                aria-hidden="true"
                className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-night shadow-lg shadow-gold/30"
              >
                <Sparkles className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-4 text-center text-sm text-mist">Del polvo al brillo en un solo lavado</p>
          </div>
        </div>
      </div>
    </section>
  );
}
