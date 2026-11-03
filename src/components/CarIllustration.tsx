import { useId } from 'react';

interface CarIllustrationProps {
  color?: string;
  dirty?: boolean;
  animated?: boolean;
  className?: string;
}

const WHEELS = [120, 362];

function sparkle(x: number, y: number, s: number): string {
  return `M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s} Z`;
}

// Auto sedán de perfil. Con "dirty" muestra el mismo auto cubierto de polvo.
export default function CarIllustration({
  color = '#2F7BFF',
  dirty = false,
  animated = false,
  className = 'h-full w-full',
}: CarIllustrationProps) {
  const id = useId().replace(/:/g, '');
  const bodyTop = dirty ? '#8C8476' : color;
  const glassTop = dirty ? '#7D8AA0' : '#E3F7FF';
  const glassBottom = dirty ? '#3E4A60' : '#2E62B0';

  return (
    <svg
      viewBox="0 0 480 240"
      className={className}
      role="img"
      aria-label={dirty ? 'Auto sucio' : 'Auto limpio y brillante'}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={bodyTop} />
          <stop offset="1" stopColor={dirty ? '#4D463E' : '#0A1A3F'} />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={glassTop} />
          <stop offset="1" stopColor={glassBottom} />
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

      <path d="M440 134 L452 138 L450 148 L438 146 Z" fill={dirty ? '#8C8476' : '#FFF8D6'} />
      <ellipse cx="36" cy="142" rx="5" ry="4" fill={dirty ? '#5A3B33' : '#FF4D6D'} />

      {!dirty && (
        <>
          <path d="M70 118 L140 72" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" />
          <path d="M280 96 Q300 88 320 96" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d={sparkle(92, 92, 9)} fill="#FFFFFF" />
          <path d={sparkle(400, 96, 7)} fill="#FFFFFF" opacity="0.9" />
          <path d={sparkle(240, 130, 6)} fill="#FFFFFF" opacity="0.8" />
        </>
      )}

      {dirty && (
        <g>
          <path d="M30 150 Q120 140 240 146 T450 146 L450 178 L30 178 Z" fill="#5C4B36" opacity="0.55" />
          <path d="M120 60 L210 60 L210 74 L120 74 Z" fill="#6B5A44" opacity="0.4" />
          <g fill="#4A3F2E" opacity="0.7">
            <ellipse cx="70" cy="132" rx="14" ry="8" />
            <ellipse cx="200" cy="112" rx="18" ry="7" />
            <ellipse cx="300" cy="134" rx="12" ry="9" />
            <ellipse cx="410" cy="124" rx="16" ry="6" />
            <ellipse cx="160" cy="92" rx="9" ry="5" />
            <ellipse cx="262" cy="84" rx="7" ry="5" />
          </g>
          <path d="M96 166 L110 190 L118 166 Z" fill="#5C4B36" opacity="0.6" />
          <path d="M260 170 L274 200 L284 170 Z" fill="#5C4B36" opacity="0.6" />
        </g>
      )}

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
