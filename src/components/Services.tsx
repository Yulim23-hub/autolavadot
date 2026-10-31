import { useState } from 'react';
import { Check, Star } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { PACKAGES, VEHICLES, type VehicleId } from '@/config/business';
import { formatMoney } from '@/lib/format';

export default function Services() {
  const [vehicle, setVehicle] = useState<VehicleId>('auto');

  return (
    <section id="servicios" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Servicios y precios"
          title="Elige el brillo que necesitas"
          description="Precios en pesos mexicanos. Elige el tipo de vehículo para ver su precio."
        />

        <div
          role="tablist"
          aria-label="Tipo de vehículo"
          className="mx-auto mt-10 flex w-full max-w-md rounded-full border border-white/10 bg-night-800 p-1.5"
        >
          {VEHICLES.map((item) => {
            const selected = vehicle === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={selected}
                aria-controls="panel-precios"
                onClick={() => setVehicle(item.id)}
                className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-all duration-300 sm:text-base ${
                  selected ? 'bg-azure text-white shadow-lg shadow-azure/30' : 'text-mist hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div
          id="panel-precios"
          role="tabpanel"
          aria-labelledby={`tab-${vehicle}`}
          key={vehicle}
          className="mt-12 grid gap-6 md:grid-cols-3 animate-fade-up"
        >
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className={`relative flex flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                pkg.popular
                  ? 'border-aqua/60 bg-gradient-to-b from-night-600 to-night-800 shadow-2xl shadow-aqua/15 md:-my-4'
                  : 'border-white/10 bg-night-800 hover:border-white/25'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gold px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-night shadow-lg shadow-gold/25">
                  <Star className="h-3.5 w-3.5 fill-night" />
                  Más popular
                </span>
              )}

              <h3 className="font-display text-3xl uppercase">{pkg.name}</h3>
              <p className="mt-1 text-sm text-mist">{pkg.tagline}</p>

              <p className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl text-white">{formatMoney(pkg.prices[vehicle])}</span>
                <span className="text-sm text-mist">MXN</span>
              </p>

              <ul className="mt-6 flex-1 space-y-3 border-t border-white/10 pt-6">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-white/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-aqua" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#agenda"
                className={`mt-8 block rounded-full py-3.5 text-center text-sm font-bold transition-all ${
                  pkg.popular
                    ? 'bg-aqua text-night hover:shadow-lg hover:shadow-aqua/30'
                    : 'border border-white/20 text-white hover:border-aqua hover:text-aqua'
                }`}
              >
                Agendar {pkg.name}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
