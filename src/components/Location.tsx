import { Clock, CreditCard, ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import MapIllustration from '@/components/MapIllustration';
import SectionHeading from '@/components/SectionHeading';
import { BUSINESS } from '@/config/business';
import { buildWhatsappUrl } from '@/lib/format';
import { useOpenNow } from '@/hooks/useOpenNow';

const HOURS_TEXT = `Lunes a sábado, ${BUSINESS.openHour}:00 a ${BUSINESS.closeHour}:00`;

export default function Location() {
  const open = useOpenNow();

  return (
    <section id="ubicacion" className="scroll-mt-20 border-t border-white/5 bg-night-800/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Ubicación" title="Estamos en el Centro de Toluca" />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-stretch">
          <MapIllustration />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl border border-white/10 bg-night p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-aqua" />
                <h3 className="font-display text-2xl uppercase">Dirección</h3>
              </div>
              <address className="mt-4 text-base not-italic leading-relaxed text-white/90">
                {BUSINESS.address.street}
                <br />
                {BUSINESS.address.colony}
                <br />
                {BUSINESS.address.city}
                <br />
                {BUSINESS.address.zip}
              </address>
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-aqua px-5 py-2.5 text-sm font-bold text-night transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-aqua/30"
              >
                Cómo llegar
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="rounded-3xl border border-white/10 bg-night p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-aqua" />
                <h3 className="font-display text-2xl uppercase">Horarios</h3>
              </div>
              <p className="mt-4 text-base text-white/90">{HOURS_TEXT}</p>
              <p className="mt-1 text-base text-mist">Domingo cerrado</p>
              <p
                className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                  open ? 'bg-emerald-400/10 text-emerald-300' : 'bg-white/5 text-mist'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${open ? 'bg-emerald-400' : 'bg-mist'}`} />
                {open ? 'Abierto ahora' : 'Cerrado en este momento'}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-night p-6 sm:p-7">
              <h3 className="font-display text-2xl uppercase">Contacto</h3>
              <ul className="mt-4 space-y-3 text-base">
                <li>
                  <a
                    href={buildWhatsappUrl('Hola, quiero información sobre Autolavado Torres.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white transition-colors hover:text-aqua"
                  >
                    <MessageCircle className="h-5 w-5 text-aqua" />
                    WhatsApp {BUSINESS.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`tel:+52${BUSINESS.whatsapp.slice(2)}`} className="flex items-center gap-3 text-white transition-colors hover:text-aqua">
                    <Phone className="h-5 w-5 text-aqua" />
                    Llamar {BUSINESS.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-3 break-all text-white transition-colors hover:text-aqua">
                    <Mail className="h-5 w-5 shrink-0 text-aqua" />
                    {BUSINESS.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-night p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-aqua" />
                <h3 className="font-display text-2xl uppercase">Formas de pago</h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {BUSINESS.payments.map((payment) => (
                  <li key={payment} className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/90">
                    {payment}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
