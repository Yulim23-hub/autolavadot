import { useEffect, useState } from 'react';
import { isOpenNow } from '@/lib/schedule';

// Revisa cada 30 segundos si el negocio está abierto según la hora de CDMX.
export function useOpenNow(): boolean {
  const [open, setOpen] = useState(() => isOpenNow());

  useEffect(() => {
    const id = window.setInterval(() => setOpen(isOpenNow()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return open;
}
