import { MessageCircle } from 'lucide-react';
import { buildWhatsappUrl } from '@/lib/format';

export default function WhatsAppButton() {
  return (
    <a
      href={buildWhatsappUrl('Hola, quiero agendar un lavado en Autolavado Torres.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-aqua text-night shadow-xl shadow-aqua/30 transition-transform duration-300 hover:scale-110 sm:bottom-6 sm:right-6"
    >
      <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-aqua/40" />
      <MessageCircle className="relative h-6 w-6" />
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-full bg-night-700 px-4 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 md:block">
        ¿Agendamos?
      </span>
    </a>
  );
}
