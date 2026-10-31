import { CalendarRange, Gift, Repeat, Truck } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { BUSINESS, PACKAGES, PROMOS } from '@/config/business';
import { formatMoney } from '@/lib/format';

const completoPackage = PACKAGES.find((pkg) => pkg.id === PROMOS.membership.packageId);
const LOYALTY_DOTS = Array.from({ length: PROMOS.loyaltyWashes });

export default function Promotions() {
  return (
    <section id="promociones" className="scroll-mt-20 border-t border-white/5 bg-night-800/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Promociones"
          title="Más brillo, menos gasto"
          description="Beneficios pensados para que vuelvas seguido y tu auto siempre luzca bien."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="group relative overflow-hidden rounded-3xl border border-gold/40 bg-night p-8 transition-all duration-300 hover:-translate-y-1">
            <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/15 blur-2xl" />
            <CalendarRange className="h-8 w-8 text-gold" />
            <p className="mt-5 text-sm font-bold uppercase tracking-wider text-gold">Cada martes</p>
            <h3 className="mt-2 font-display text-3xl uppercase">Martes de descuento</h3>
            <p className="mt-3 text-base leading-relaxed text-mist">
              {PROMOS.tuesday.percent}% de descuento en el lavado {completoPackage?.name} todos los martes.
            </p>
          </article>

          <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-night p-8 transition-all duration-300 hover:-translate-y-1 hover:border-aqua/40">
            <Repeat className="h-8 w-8 text-aqua" />
            <h3 className="mt-5 font-display text-3xl uppercase">Tarjeta de lealtad</h3>
            <p className="mt-3 text-base leading-relaxed text-mist">
              Cada lavado suma un sello. El décimo lavado es gratis.
            </p>
            <div className="mt-6 flex flex-wrap gap-2" aria-label={`${PROMOS.loyaltyWashes} lavados, el último gratis`}>
              {LOYALTY_DOTS.map((_, i) => {
                const isFree = i === PROMOS.loyaltyWashes - 1;
                return (
                  <span
                    key={i}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold ${
                      isFree ? 'border-gold bg-gold text-night' : 'border-aqua/40 text-aqua'
                    }`}
                  >
                    {isFree ? <Gift className="h-4 w-4" /> : i + 1}
                  </span>
                );
              })}
            </div>
          </article>

          <article className="relative overflow-hidden rounded-3xl border border-azure/50 bg-gradient-to-br from-azure/30 to-night-800 p-8 transition-all duration-300 hover:-translate-y-1">
            <p className="text-sm font-bold uppercase tracking-wider text-aqua">Membresía mensual</p>
            <h3 className="mt-3 font-display text-3xl uppercase">4 lavados {completoPackage?.name} al mes</h3>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-5xl text-white">{formatMoney(PROMOS.membership.price)}</span>
              <span className="text-sm text-mist">al mes, MXN</span>
            </p>
            <p className="mt-3 text-base leading-relaxed text-white/85">
              Ideal para flotillas pequeñas y para quien quiere su auto siempre limpio.
            </p>
            <a
              href="#agenda"
              className="mt-6 inline-flex rounded-full bg-aqua px-6 py-3 text-sm font-bold text-night transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-aqua/30"
            >
              Quiero la membresía
            </a>
          </article>

          <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-night p-8 transition-all duration-300 hover:-translate-y-1 hover:border-aqua/40">
            <Truck className="h-8 w-8 text-aqua" />
            <h3 className="mt-5 font-display text-3xl uppercase">Servicio a domicilio</h3>
            <p className="mt-3 text-base leading-relaxed text-mist">
              Llevamos el lavado hasta donde estés en Toluca y zonas cercanas. Escríbenos y te confirmamos disponibilidad.
            </p>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent('Hola, quiero información sobre el servicio a domicilio.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex text-sm font-medium text-aqua underline-offset-4 hover:underline"
            >
              Pregunta por WhatsApp
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
