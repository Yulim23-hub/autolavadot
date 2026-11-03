import SectionHeading from '@/components/SectionHeading';

interface Comparison {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

const COMPARISONS: Comparison[] = [
  {
    src: '/images/antes-despues-lateral.webp',
    alt: 'Auto plateado de perfil: la mitad izquierda cubierta de lodo y la derecha limpia y brillante',
    caption: 'Lateral · lodo y brillo',
    width: 260,
    height: 260,
  },
  {
    src: '/images/antes-despues-frente.jpeg',
    alt: 'Auto azul de frente: la mitad izquierda cubierta de lodo y la derecha limpia y brillante',
    caption: 'Frente · lodo y brillo',
    width: 260,
    height: 260,
  },
];

export default function BeforeAfterGallery() {
  return (
    <section id="galeria" className="scroll-mt-20 border-t border-white/5 bg-night-800/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Antes y después"
          title="Mira la diferencia"
          description="El mismo auto, con la mitad sin lavar y la mitad después de nuestro servicio."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {COMPARISONS.map((item) => (
            <figure key={item.src} className="group">
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white p-6 transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-aqua/20">
                <img
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-4 text-center text-sm text-mist">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
