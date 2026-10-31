import { BUSINESS } from '@/config/business';

const moneyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

export function formatMoney(amount: number): string {
  return moneyFormatter.format(amount);
}

export function buildWhatsappUrl(message: string): string {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}
