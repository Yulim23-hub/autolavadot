import SectionHeading from '@/components/SectionHeading';

interface WorkPhoto {
  src: string;
  alt: string;
  caption: string;
  className: string;
}

const PHOTOS: WorkPhoto[] = [
  {
    src: 'https://images.pexels.com/photos/4870739/pexels-photo-4870739.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Auto cubierto de espuma durante el lavado',
    caption: 'Espuma en cada rincón',
    className: 'md:row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/14615260/pexels-photo-14615260.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Pulido a mano de un auto con paño amarillo',
    caption: 'Pulido a mano',
    className: 'md:col-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/4870702/pexels-photo-4870702.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Limpieza de un faro con esponja y jabón',
    caption: 'Detalle en faros',
    className: '',
  },
  {
    src: 'https://images.pexels.com/photos/4513028/pexels-photo-4513028.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Hombre lavando una moto con manguera al aire libre',
    caption: 'Motos también',
    className: '',
  },
];

export default function WorkPhotos() {
  return (
    <section id="en-accion" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="En acción"
          title="Así cuidamos cada vehículo"
          description="Lavado con cuidado, paso a paso, para autos, camionetas y motos."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {PHOTOS.map((photo) => (
            <figure
              key={photo.caption}
              className={`group relative h-64 overflow-hidden rounded-3xl border border-white/10 bg-night-800 md:h-72 ${photo.className}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <span className="font-display text-2xl uppercase leading-tight text-white drop-shadow-lg">
                  {photo.caption}
                </span>
                <span className="h-1.5 w-10 shrink-0 translate-y-1 rounded-full bg-aqua transition-all duration-500 group-hover:w-16" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
