import { useId } from 'react';

interface CarIllustrationProps {
  color?: string;
  animated?: boolean;
  className?: string;
}

const WHEELS = [120, 362];

function sparkle(x: number, y: number, s: number): string {
  return `M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s} Z`;
}

// Auto sedán brillante de perfil, usado como ilustración del inicio.
export default function CarIllustration({
  color = '#2F7BFF',
  animated = false,
  className = 'h-full w-full',
}: CarIllustrationProps) {
  const id = useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 480 240"
      className={className}
      role="img"
      aria-label="Auto limpio y brillante"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} />
          <stop offset="1" stopColor="#0A1A3F" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E3F7FF" />
          <stop offset="1" stopColor="#2E62B0" />
        </linearGradient>
      </defs>

      <ellipse cx="240" cy="204" rx="210" ry="10" fill="#000" opacity="0.4" />

      <path
        d="M30 166 Q28 140 42 132 L96 120 L150 66 Q162 56 182 56 L318 56 Q340 56 356 72 L398 118 L436 128 Q452 134 452 152 L452 166 Q452 178 440 178 L42 178 Q30 178 30 166 Z"
        fill={`url(#${id}-body)`}
      />
      <path d="M36 160 L446 160 L446 170 Q446 178 438 178 L42 178 Q36 178 36 170 Z" fill="#000" opacity="0.18" />

      <path d="M158 72 L214 72 L214 116 L124 116 Z" fill={`url(#${id}-glass)`} stroke="#050B1E" strokeOpacity="0.4" />
      <path d="M224 72 L316 72 L348 116 L224 116 Z" fill={`url(#${id}-glass)`} stroke="#050B1E" strokeOpacity="0.4" />

      <path d="M262 124 L262 168" stroke="#050B1E" strokeOpacity="0.3" strokeWidth="2" />
      <path d="M356 128 L356 168" stroke="#050B1E" strokeOpacity="0.2" strokeWidth="2" />

      <path d="M440 134 L452 138 L450 148 L438 146 Z" fill="#FFF8D6" />
      <ellipse cx="36" cy="142" rx="5" ry="4" fill="#FF4D6D" />

      <path d="M70 118 L140 72" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" />
      <path d="M280 96 Q300 88 320 96" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d={sparkle(92, 92, 9)} fill="#FFFFFF" />
      <path d={sparkle(400, 96, 7)} fill="#FFFFFF" opacity="0.9" />
      <path d={sparkle(240, 130, 6)} fill="#FFFFFF" opacity="0.8" />

      {WHEELS.map((cx) => (
        <g key={cx} transform={`translate(${cx} 178)`}>
          <g className={animated ? 'svg-spin' : undefined}>
            <circle r="28" fill="#0B0F1A" />
            <circle r="17" fill="#C9D3E6" />
            <circle r="6" fill="#4A5568" />
            <path d="M0 -15 L0 15 M-15 0 L15 0" stroke="#6B7689" strokeWidth="3" />
          </g>
        </g>
      ))}
    </svg>
  );
}
