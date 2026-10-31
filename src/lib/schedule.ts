import { BUSINESS } from '@/config/business';

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const cdmxFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: BUSINESS.timeZone,
  weekday: 'short',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

// Usa la hora de la Ciudad de México sin importar la zona del visitante.
export function getCdmxNow(date: Date = new Date()) {
  const parts = Object.fromEntries(cdmxFormatter.formatToParts(date).map((p) => [p.type, p.value]));
  return {
    weekday: WEEKDAY_INDEX[parts.weekday],
    dateKey: `${parts.year}-${parts.month}-${parts.day}`,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  };
}

export function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function isOpenNow(date: Date = new Date()): boolean {
  const { weekday, minutes } = getCdmxNow(date);
  return (
    !BUSINESS.closedWeekdays.includes(weekday) &&
    minutes >= BUSINESS.openHour * 60 &&
    minutes < BUSINESS.closeHour * 60
  );
}

export function buildTimeSlots(): string[] {
  const slots: string[] = [];
  for (let m = BUSINESS.openHour * 60; m < BUSINESS.closeHour * 60; m += BUSINESS.slotMinutes) {
    const h = String(Math.floor(m / 60)).padStart(2, '0');
    const min = String(m % 60).padStart(2, '0');
    slots.push(`${h}:${min}`);
  }
  return slots;
}

export function getDateError(dateKey: string): string | null {
  if (!dateKey) return 'Elige una fecha.';
  const day = new Date(`${dateKey}T12:00:00`).getDay();
  if (BUSINESS.closedWeekdays.includes(day)) return 'Los domingos estamos cerrados. Elige otro día.';
  if (dateKey < getCdmxNow().dateKey) return 'Esa fecha ya pasó. Elige una fecha futura.';
  return null;
}

export function getTimeError(dateKey: string, time: string): string | null {
  if (!time) return 'Elige una hora.';
  const minutes = toMinutes(time);
  const openAt = BUSINESS.openHour * 60;
  const closeAt = BUSINESS.closeHour * 60;
  if (minutes < openAt || minutes >= closeAt) {
    return `Atendemos de ${BUSINESS.openHour}:00 a ${BUSINESS.closeHour}:00. Elige una hora dentro de ese horario.`;
  }
  const now = getCdmxNow();
  if (dateKey === now.dateKey && minutes <= now.minutes) return 'Esa hora ya pasó. Elige otra.';
  return null;
}

export function formatTime12h(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'p.m.' : 'a.m.';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${suffix}`;
}

export function formatDateLong(dateKey: string): string {
  return new Date(`${dateKey}T12:00:00`).toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
