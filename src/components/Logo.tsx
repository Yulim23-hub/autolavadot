interface LogoProps {
  className?: string;
}

// Escudo hexagonal con una T blanca, una gota cian y un destello dorado.
export default function Logo({ className = 'h-10 w-10' }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Logo Autolavado Torres">
      <defs>
        <linearGradient id="logo-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2F7BFF" />
          <stop offset="1" stopColor="#0A2A6E" />
        </linearGradient>
        <linearGradient id="logo-drop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7FE6FF" />
          <stop offset="1" stopColor="#00C2FF" />
        </linearGradient>
      </defs>
      <path
        d="M32 3 L57 17.5 L57 46.5 L32 61 L7 46.5 L7 17.5 Z"
        fill="url(#logo-shield)"
        stroke="#00C2FF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M20 19 H44 V26 H35.5 V47 H28.5 V26 H20 Z" fill="#FFFFFF" />
      <path d="M45 30 C45 36 51 39 51 44 A6 6 0 0 1 39 44 C39 39 45 36 45 30 Z" fill="url(#logo-drop)" />
      <path d="M52 9 L53.4 12.6 L57 14 L53.4 15.4 L52 19 L50.6 15.4 L47 14 L50.6 12.6 Z" fill="#FFC247" />
    </svg>
  );
}
