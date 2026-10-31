import { useState, type FormEvent } from 'react';
import { CalendarCheck, MessageCircle } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { BUSINESS, PACKAGES, VEHICLES, type VehicleId } from '@/config/business';
import { buildWhatsappUrl, formatMoney } from '@/lib/format';
import {
  buildTimeSlots,
  formatDateLong,
  formatTime12h,
  getCdmxNow,
  getDateError,
  getTimeError,
  toMinutes,
} from '@/lib/schedule';

interface BookingValues {
  name: string;
  vehicle: VehicleId;
  packageId: (typeof PACKAGES)[number]['id'];
  date: string;
  time: string;
}

type BookingErrors = Partial<Record<keyof BookingValues, string>>;

const TIME_SLOTS = buildTimeSlots();

function validate(values: BookingValues): BookingErrors {
  const errors: BookingErrors = {};
  const name = values.name.trim();
  if (name.length < 3) errors.name = 'Escribe tu nombre completo (mínimo 3 letras).';
  else if (name.length > 60) errors.name = 'El nombre es demasiado largo.';

  const dateError = getDateError(values.date);
  if (dateError) errors.date = dateError;

  const timeError = getTimeError(values.date, values.time);
  if (timeError) errors.time = timeError;

  return errors;
}

function buildMessage(values: BookingValues): string {
  const pkg = PACKAGES.find((item) => item.id === values.packageId);
  const vehicle = VEHICLES.find((item) => item.id === values.vehicle);
  const price = pkg ? formatMoney(pkg.prices[values.vehicle]) : '';
  return [
    'Hola, quiero agendar un lavado en Autolavado Torres.',
    '',
    `Nombre: ${values.name.trim()}`,
    `Vehículo: ${vehicle?.label ?? ''}`,
    `Servicio: ${pkg?.name ?? ''} (${price} MXN)`,
    `Fecha: ${formatDateLong(values.date)}`,
    `Hora: ${formatTime12h(values.time)}`,
  ].join('\n');
}

const fieldClass =
  'w-full rounded-xl border border-white/15 bg-night px-4 py-3.5 text-white placeholder:text-mist/60 transition-colors focus:border-aqua focus:outline-none focus:ring-2 focus:ring-aqua/30 aria-[invalid=true]:border-red-400';

export default function BookingForm() {
  const [values, setValues] = useState<BookingValues>(() => ({
    name: '',
    vehicle: 'auto',
    packageId: 'completo',
    date: getCdmxNow().dateKey,
    time: '',
  }));
  const [errors, setErrors] = useState<BookingErrors>({});
  const [sent, setSent] = useState(false);

  const today = getCdmxNow();
  const isToday = values.date === today.dateKey;

  const update = <K extends keyof BookingValues>(key: K, value: BookingValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSent(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    window.open(buildWhatsappUrl(buildMessage(values)), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const selectedPackage = PACKAGES.find((pkg) => pkg.id === values.packageId);

  return (
    <section id="agenda" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Agenda en un minuto"
          title="Reserva tu lugar"
          description={`Atendemos de lunes a sábado, de ${BUSINESS.openHour}:00 a ${BUSINESS.closeHour}:00. Al enviar, se abre WhatsApp con tu cita lista para mandar.`}
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-[1fr_18rem]">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6 rounded-3xl border border-white/10 bg-night-800 p-6 sm:p-8"
          >
            <div>
              <label htmlFor="nombre" className="mb-2 block text-sm font-medium text-white">
                Nombre completo
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                autoComplete="name"
                placeholder="Ej. Juan Pérez"
                value={values.name}
                onChange={(e) => update('name', e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'nombre-error' : undefined}
                className={fieldClass}
              />
              {errors.name && (
                <p id="nombre-error" className="mt-2 text-sm text-red-300">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="vehiculo" className="mb-2 block text-sm font-medium text-white">
                  Vehículo
                </label>
                <select
                  id="vehiculo"
                  value={values.vehicle}
                  onChange={(e) => update('vehicle', e.target.value as VehicleId)}
                  className={fieldClass}
                >
                  {VEHICLES.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="servicio" className="mb-2 block text-sm font-medium text-white">
                  Servicio
                </label>
                <select
                  id="servicio"
                  value={values.packageId}
                  onChange={(e) => update('packageId', e.target.value as BookingValues['packageId'])}
                  className={fieldClass}
                >
                  {PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} · {formatMoney(pkg.prices[values.vehicle])}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="fecha" className="mb-2 block text-sm font-medium text-white">
                  Fecha
                </label>
                <input
                  id="fecha"
                  name="fecha"
                  type="date"
                  min={today.dateKey}
                  value={values.date}
                  onChange={(e) => {
                    update('date', e.target.value);
                    update('time', '');
                  }}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? 'fecha-error' : undefined}
                  className={`${fieldClass} [color-scheme:dark]`}
                />
                {errors.date && (
                  <p id="fecha-error" className="mt-2 text-sm text-red-300">
                    {errors.date}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="hora" className="mb-2 block text-sm font-medium text-white">
                  Hora
                </label>
                <select
                  id="hora"
                  value={values.time}
                  onChange={(e) => update('time', e.target.value)}
                  aria-invalid={Boolean(errors.time)}
                  aria-describedby={errors.time ? 'hora-error' : undefined}
                  className={fieldClass}
                >
                  <option value="">Elige una hora</option>
                  {TIME_SLOTS.map((slot) => {
                    const past = isToday && toMinutes(slot) <= today.minutes;
                    return (
                      <option key={slot} value={slot} disabled={past}>
                        {formatTime12h(slot)}
                      </option>
                    );
                  })}
                </select>
                {errors.time && (
                  <p id="hora-error" className="mt-2 text-sm text-red-300">
                    {errors.time}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-aqua py-4 text-base font-bold text-night shadow-lg shadow-aqua/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-aqua/35 active:translate-y-0"
            >
              <MessageCircle className="h-5 w-5" />
              Enviar por WhatsApp
            </button>

            {sent && (
              <p role="status" className="animate-fade-up rounded-xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                Listo, se abrió WhatsApp con tu cita. Solo falta enviar el mensaje.
              </p>
            )}
          </form>

          <aside className="rounded-3xl border border-white/10 bg-gradient-to-b from-azure/20 to-night-800 p-6 sm:p-8">
            <CalendarCheck className="h-8 w-8 text-aqua" />
            <h3 className="mt-4 font-display text-2xl uppercase">Tu cita</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-mist">Servicio</dt>
                <dd className="font-medium text-white">
                  {selectedPackage?.name} para {VEHICLES.find((v) => v.id === values.vehicle)?.label.toLowerCase()}
                </dd>
              </div>
              <div>
                <dt className="text-mist">Total</dt>
                <dd className="font-display text-3xl text-aqua">
                  {selectedPackage ? formatMoney(selectedPackage.prices[values.vehicle]) : ''}
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-xs leading-relaxed text-mist">
              Tu cita se confirma por WhatsApp. Si necesitas cambiar la hora, solo escríbenos.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
