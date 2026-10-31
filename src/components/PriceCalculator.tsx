import { useState } from 'react';
import { Check, Plus, Sparkles } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { EXTRAS, PACKAGES, PROMOS, VEHICLES, type VehicleId } from '@/config/business';
import { formatMoney } from '@/lib/format';
import { getCdmxNow } from '@/lib/schedule';

type PackageChoice = (typeof PACKAGES)[number]['id'] | 'ninguno';

export default function PriceCalculator() {
  const [vehicle, setVehicle] = useState<VehicleId>('auto');
  const [packageChoice, setPackageChoice] = useState<PackageChoice>('completo');
  const [extras, setExtras] = useState<string[]>([]);
  const [isTuesday] = useState(() => getCdmxNow().weekday === PROMOS.tuesday.weekday);

  const selectedPackage = PACKAGES.find((pkg) => pkg.id === packageChoice);
  const packagePrice = selectedPackage ? selectedPackage.prices[vehicle] : 0;

  const discount =
    isTuesday && selectedPackage?.id === PROMOS.tuesday.packageId
      ? Math.round((packagePrice * PROMOS.tuesday.percent) / 100)
      : 0;

  const isIncluded = (includedIn: readonly string[]) =>
    packageChoice !== 'ninguno' && includedIn.includes(packageChoice);

  const chargedExtras = EXTRAS.filter((extra) => extras.includes(extra.id) && !isIncluded(extra.includedIn));
  const extrasTotal = chargedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const total = packagePrice - discount + extrasTotal;

  const toggleExtra = (id: string) => {
    setExtras((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));
  };

  return (
    <section id="calculadora" className="scroll-mt-20 border-y border-white/5 bg-night-800/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Calculadora de precio"
          title="Arma tu lavado a tu medida"
          description="Elige tu vehículo, un paquete y los extras que quieras. El total se actualiza al momento."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div className="space-y-8 rounded-3xl border border-white/10 bg-night p-6 sm:p-8">
            <fieldset>
              <legend className="mb-4 text-sm font-bold uppercase tracking-wider text-white">1. Tipo de vehículo</legend>
              <div className="grid grid-cols-3 gap-3">
                {VEHICLES.map((item) => (
                  <label key={item.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="vehiculo"
                      value={item.id}
                      checked={vehicle === item.id}
                      onChange={() => setVehicle(item.id)}
                      className="peer sr-only"
                    />
                    <span className="flex justify-center rounded-2xl border border-white/10 bg-night-800 py-3.5 text-sm font-medium text-mist transition-all peer-checked:border-aqua peer-checked:bg-aqua/10 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-aqua hover:border-white/25">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-4 text-sm font-bold uppercase tracking-wider text-white">2. Paquete</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {PACKAGES.map((pkg) => (
                  <label key={pkg.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="paquete"
                      value={pkg.id}
                      checked={packageChoice === pkg.id}
                      onChange={() => setPackageChoice(pkg.id)}
                      className="peer sr-only"
                    />
                    <span className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-night-800 px-5 py-4 transition-all peer-checked:border-aqua peer-checked:bg-aqua/10 peer-focus-visible:ring-2 peer-focus-visible:ring-aqua hover:border-white/25">
                      <span>
                        <span className="block font-medium text-white">{pkg.name}</span>
                        <span className="block text-xs text-mist">{formatMoney(pkg.prices[vehicle])}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          packageChoice === pkg.id ? 'border-aqua bg-aqua text-night' : 'border-white/30'
                        }`}
                      >
                        {packageChoice === pkg.id && <Check className="h-3 w-3" strokeWidth={3} />}
                      </span>
                    </span>
                  </label>
                ))}
                <label className="cursor-pointer sm:col-span-2">
                  <input
                    type="radio"
                    name="paquete"
                    value="ninguno"
                    checked={packageChoice === 'ninguno'}
                    onChange={() => setPackageChoice('ninguno')}
                    className="peer sr-only"
                  />
                  <span className="block rounded-2xl border border-dashed border-white/15 px-5 py-3.5 text-center text-sm text-mist transition-all peer-checked:border-aqua peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-aqua hover:border-white/30">
                    Solo quiero extras
                  </span>
                </label>
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-4 text-sm font-bold uppercase tracking-wider text-white">3. Extras</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {EXTRAS.map((extra) => {
                  const included = isIncluded(extra.includedIn);
                  const checked = extras.includes(extra.id);
                  return (
                    <label
                      key={extra.id}
                      className={`flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 transition-all ${
                        included
                          ? 'cursor-not-allowed border-white/5 bg-night-800/50 opacity-60'
                          : checked
                            ? 'cursor-pointer border-aqua bg-aqua/10'
                            : 'cursor-pointer border-white/10 bg-night-800 hover:border-white/25'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={checked || included}
                          disabled={included}
                          onChange={() => toggleExtra(extra.id)}
                        />
                        <span
                          aria-hidden="true"
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                            checked || included ? 'border-aqua bg-aqua text-night' : 'border-white/30'
                          } peer-focus-visible:ring-2 peer-focus-visible:ring-aqua`}
                        >
                          {(checked || included) && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                        </span>
                        <span className="text-white">{extra.name}</span>
                      </span>
                      <span className="text-sm text-mist">
                        {included ? 'Incluido' : `+${formatMoney(extra.price)}`}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <aside
            aria-live="polite"
            aria-label="Resumen del precio"
            className="rounded-3xl border border-aqua/30 bg-gradient-to-b from-night-600 to-night-800 p-6 shadow-2xl shadow-aqua/10 sm:p-8 lg:sticky lg:top-24"
          >
            <h3 className="font-display text-2xl uppercase">Tu resumen</h3>

            {isTuesday && (
              <p className="mt-4 flex items-center gap-2 rounded-xl bg-gold/15 px-3 py-2 text-sm font-medium text-gold">
                <Sparkles className="h-4 w-4 shrink-0" />
                Hoy es martes: {PROMOS.tuesday.percent}% en el paquete Completo
              </p>
            )}

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-mist">
                  {selectedPackage ? `Paquete ${selectedPackage.name}` : 'Sin paquete'}
                </dt>
                <dd className="font-medium text-white">{formatMoney(packagePrice)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between gap-4 text-gold">
                  <dt>Descuento de martes</dt>
                  <dd className="font-medium">-{formatMoney(discount)}</dd>
                </div>
              )}
              {chargedExtras.map((extra) => (
                <div key={extra.id} className="flex justify-between gap-4">
                  <dt className="flex items-center gap-2 text-mist">
                    <Plus className="h-3 w-3" aria-hidden="true" />
                    {extra.name}
                  </dt>
                  <dd className="font-medium text-white">{formatMoney(extra.price)}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-6">
              <span className="text-sm uppercase tracking-wider text-mist">Total</span>
              <span className="font-display text-5xl text-aqua transition-all">{formatMoney(total)}</span>
            </div>
            <p className="mt-2 text-right text-xs text-mist">MXN, pago en efectivo, tarjeta o transferencia</p>

            <a
              href="#agenda"
              className="mt-8 block rounded-full bg-aqua py-3.5 text-center text-sm font-bold text-night transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-aqua/30"
            >
              Agendar con este precio
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
