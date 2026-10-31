import { Star } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { REVIEWS } from '@/config/business';

export default function Reviews() {
  return (
    <section id="resenas" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Reseñas" title="Lo que dicen nuestros clientes" />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-3xl border border-white/10 bg-night-800 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-aqua/40"
            >
              <div className="flex gap-1" role="img" aria-label="Calificación de 5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-aqua text-aqua" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-white/90">“{review.text}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-azure font-display text-lg text-white">
                  {review.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-medium text-white">{review.name}</span>
                  <span className="block text-sm text-mist">{review.car}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
