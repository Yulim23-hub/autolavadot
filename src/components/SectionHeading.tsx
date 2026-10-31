interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-aqua">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl uppercase leading-[1.1] sm:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-mist sm:text-lg">{description}</p>}
    </div>
  );
}
