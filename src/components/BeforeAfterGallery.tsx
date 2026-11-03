import { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import CarIllustration from '@/components/CarIllustration';

interface Comparison {
  id: string;
  caption: string;
  color: string;
}

const COMPARISONS: Comparison[] = [
  { id: 'plata', caption: 'Mismo auto plata · antes y después', color: '#7C8CA8' },
  { id: 'azul', caption: 'Mismo auto azul · antes y después', color: '#2F7BFF' },
];

function BeforeAfterSlider({ caption, color }: Omit<Comparison, 'id'>) {
  const [position, setPosition] = useState(50);

  return (
    <figure>
      <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-night-800 select-none">
        <div className="absolute inset-0 p-6 sm:p-8">
          <CarIllustration color={color} />
        </div>
        <div className="absolute inset-0 p-6 sm:p-8" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <CarIllustration color={color} dirty />
        </div>

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
          description="Desliza la línea en cada auto para comparar cómo queda después del lavado."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {COMPARISONS.map((item) => (
            <BeforeAfterSlider key={item.id} caption={item.caption} color={item.color} />
          ))}
        </div>
      </div>
    </section>
  );
}
