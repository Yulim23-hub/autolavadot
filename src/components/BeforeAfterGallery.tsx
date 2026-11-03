import { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';

interface Photo {
  src: string;
  alt: string;
}

interface Comparison {
  id: string;
  caption: string;
  before: Photo;
  after: Photo;
}

const COMPARISONS: Comparison[] = [
  {
    id: 'negro',
    caption: 'Auto negro · antes y después',
    before: {
      src: 'https://images.pexels.com/photos/13430757/pexels-photo-13430757.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Auto negro cubierto de polvo y hojas, antes del lavado',
    },
    after: {
      src: 'https://images.pexels.com/photos/11139416/pexels-photo-11139416.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: '',
    },
  },
  {
    id: 'clasico',
    caption: 'Auto clásico · antes y después',
    before: {
      src: 'https://images.pexels.com/photos/12953619/pexels-photo-12953619.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: 'Auto clásico beige cubierto de polvo, antes del lavado',
    },
    after: {
      src: 'https://images.pexels.com/photos/27670977/pexels-photo-27670977.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      alt: '',
    },
  },
];

function BeforeAfterSlider({ caption, before, after }: Omit<Comparison, 'id'>) {
  const [position, setPosition] = useState(50);

  return (
    <figure>
      <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-night-800 select-none md:aspect-[16/10]">
        <img
          src={after.src}
          alt={after.alt}
          draggable={false}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={before.src}
          alt={before.alt}
          draggable={false}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-aqua text-night shadow-lg shadow-black/40 transition-transform group-hover:scale-110">
            <span className="text-sm font-bold">&#8644;</span>
          </span>
        </div>

        <span className="absolute left-4 top-4 rounded-full bg-night/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
          Antes
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-aqua px-3 py-1 text-xs font-bold uppercase tracking-wider text-night">
          Después
        </span>

        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label="Desliza para comparar antes y después"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-4 text-center text-sm text-mist">{caption}</figcaption>
    </figure>
  );
}

export default function BeforeAfterGallery() {
  return (
    <section id="galeria" className="scroll-mt-20 border-t border-white/5 bg-night-800/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Antes y después"
          title="Mira la diferencia"
          description="Desliza la línea en cada foto para comparar el auto sucio con el resultado final."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {COMPARISONS.map((item) => (
            <BeforeAfterSlider key={item.id} caption={item.caption} before={item.before} after={item.after} />
          ))}
        </div>
      </div>
    </section>
  );
}
