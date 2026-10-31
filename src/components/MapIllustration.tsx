import { MapPin } from 'lucide-react';

// Mapa ilustrado de calles con un marcador en Av. Independencia.
export default function MapIllustration() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-night-800 sm:aspect-[16/10]">
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="300" fill="#0A1431" />
        <g fill="#101C40">
          <rect x="20" y="20" width="110" height="70" rx="6" />
          <rect x="150" y="20" width="90" height="70" rx="6" />
          <rect x="260" y="20" width="120" height="70" rx="6" />
          <rect x="20" y="115" width="110" height="60" rx="6" />
          <rect x="150" y="115" width="90" height="60" rx="6" />
          <rect x="260" y="115" width="120" height="60" rx="6" />
          <rect x="20" y="200" width="110" height="80" rx="6" />
          <rect x="260" y="200" width="120" height="80" rx="6" />
        </g>
        <path d="M0 230 Q140 200 400 150" stroke="#0E3A6B" strokeWidth="18" fill="none" opacity="0.7" />
        <path d="M0 96 H400 M142 0 V300" stroke="#2A3F73" strokeWidth="10" opacity="0.8" />
        <path d="M0 96 H400 M142 0 V300" stroke="#18295A" strokeWidth="2" strokeDasharray="8 8" />
        <path d="M0 180 H400" stroke="#2A3F73" strokeWidth="8" opacity="0.6" />
        <text x="290" y="108" fill="#9FB0D6" fontSize="11" fontFamily="Outfit, sans-serif" letterSpacing="2">AV. INDEPENDENCIA</text>
        <text x="30" y="260" fill="#9FB0D6" fontSize="10" fontFamily="Outfit, sans-serif" opacity="0.7">CENTRO · TOLUCA</text>
      </svg>
      <div className="absolute left-[36%] top-[34%] -translate-x-1/2 -translate-y-full">
        <span className="absolute -inset-3 animate-ping rounded-full bg-aqua/40" />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-aqua text-night shadow-lg shadow-aqua/30">
          <MapPin className="h-6 w-6" strokeWidth={2.5} />
        </span>
      </div>
    </div>
  );
}
