// Datos del negocio y precios. Edita aquí el número, la dirección, los horarios y los precios.

export const BUSINESS = {
  name: 'Autolavado Torres',
  slogan: 'Brillo que se nota',
  whatsapp: '527225550142',
  phoneDisplay: '722 555 0142',
  email: 'contacto@autolavadotorres.mx',
  address: {
    street: 'Av. Independencia 123',
    colony: 'Col. Centro',
    city: 'Toluca, Edo. Méx.',
    zip: 'C.P. 50000',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Av.+Independencia+123,+Col.+Centro,+Toluca,+Edo.+Mex.,+C.P.+50000',
  timeZone: 'America/Mexico_City',
  openHour: 9,
  closeHour: 17,
  slotMinutes: 30,
  closedWeekdays: [0] as number[],
  payments: ['Efectivo', 'Tarjeta', 'Transferencia'],
} as const;

export const VEHICLES = [
  { id: 'auto', label: 'Auto' },
  { id: 'camioneta', label: 'Camioneta' },
  { id: 'moto', label: 'Moto' },
] as const;

export type VehicleId = (typeof VEHICLES)[number]['id'];

export interface ServicePackage {
  id: 'basico' | 'completo' | 'premium';
  name: string;
  tagline: string;
  prices: Record<VehicleId, number>;
  features: string[];
  popular?: boolean;
}

export const PACKAGES: ServicePackage[] = [
  {
    id: 'basico',
    name: 'Básico',
    tagline: 'Lo esencial para verse bien',
    prices: { auto: 80, camioneta: 110, moto: 50 },
    features: ['Lavado exterior', 'Secado a mano', 'Llantas limpias'],
  },
  {
    id: 'completo',
    name: 'Completo',
    tagline: 'El favorito de nuestros clientes',
    prices: { auto: 150, camioneta: 200, moto: 90 },
    features: ['Todo lo del Básico', 'Aspirado', 'Limpieza de tablero', 'Aromatizante'],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Brillo total para tu vehículo',
    prices: { auto: 350, camioneta: 450, moto: 200 },
    features: ['Todo lo del Completo', 'Encerado', 'Lavado de motor', 'Brillo en llantas'],
  },
];

// Precios de los extras: EDITA estos montos, no fueron definidos en el brief.
// includedIn indica los paquetes que ya incluyen el extra (no se cobra doble).
export interface Extra {
  id: string;
  name: string;
  price: number;
  includedIn: ReadonlyArray<ServicePackage['id']>;
}

export const EXTRAS: Extra[] = [
  { id: 'aspirado', name: 'Aspirado interior', price: 60, includedIn: ['completo', 'premium'] },
  { id: 'encerado', name: 'Encerado', price: 120, includedIn: ['premium'] },
  { id: 'motor', name: 'Lavado de motor', price: 100, includedIn: ['premium'] },
  { id: 'tapiceria', name: 'Limpieza de tapicería', price: 250, includedIn: [] },
  { id: 'pulido', name: 'Pulido', price: 300, includedIn: [] },
];

export const PROMOS = {
  tuesday: { weekday: 2, percent: 20, packageId: 'completo' as const },
  loyaltyWashes: 10,
  membership: { price: 480, washes: 4, packageId: 'completo' as const },
};

// Reseñas de ejemplo: reemplázalas con reseñas reales de tus clientes.
export const REVIEWS = [
  {
    name: 'Jorge M.',
    car: 'Sedán, Completo',
    text: 'Llevo años con el señor Torres y siempre sale mi auto como nuevo. Atención rápida y muy honesta.',
  },
  {
    name: 'Laura G.',
    car: 'Camioneta, Premium',
    text: 'El encerado dura semanas. Agendé desde el celular en un minuto y me esperaron puntual.',
  },
  {
    name: 'Ricardo S.',
    car: 'Moto, Básico',
    text: 'Mi moto quedó brillando y sin manchas. Precio justo y trato de confianza.',
  },
];

export const FAQS = [
  {
    question: '¿Cuánto tarda el lavado?',
    answer:
      'El tiempo depende del paquete y del tamaño del vehículo. Al agendar te confirmamos una hora estimada por WhatsApp.',
  },
  {
    question: '¿Tengo que dejar el auto?',
    answer:
      'No es obligatorio. Puedes esperar en nuestra zona de espera o dejarlo con nosotros y regresar por él cuando te avisemos que está listo.',
  },
  {
    question: '¿Qué formas de pago aceptan?',
    answer: 'Aceptamos efectivo, tarjeta y transferencia bancaria.',
  },
  {
    question: '¿Cada cuánto debo lavar mi auto?',
    answer:
      'Como guía general, cada 2 a 4 semanas. Si vives en una zona con mucho polvo o tráfico, conviene acortar el intervalo.',
  },
];
