import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { scrollToSection } from '@/lib/scroll';

// Ordered from bottom (ground) to top (summit)
const FLOORS = [
  { id: 'hero', label: 'Inicio', floor: '00' },
  { id: 'technologies', label: 'Mi Stack', floor: '01' },
  { id: 'projects', label: 'Mis Proyectos', floor: '02' },
  { id: 'contact', label: 'Contacto', floor: '03' },
];

/**
 * Fixed floor navigator:
 * - Side star dots on desktop (top-to-bottom matching visual sky order)
 * - Floating Up/Down floor elevator pill on all screens so users can ascend
 *   or descend without scrolling.
 */
export function FloorIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const sections = FLOORS.map((f) => document.getElementById(f.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = FLOORS.findIndex((f) => f.id === entry.target.id);
            if (idx !== -1) setActiveIndex(idx);
          }
        }
      },
      { threshold: 0.35 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const scrollToFloor = (id: string) => {
    scrollToSection(id, 500);
  };

  const canGoUp = activeIndex < FLOORS.length - 1;
  const canGoDown = activeIndex > 0;
  const currentFloor = FLOORS[activeIndex];

  return (
    <>
      {/* Desktop side star-dots (reversed so 03 is at top and 00 at bottom) */}
      <aside
        className="fixed right-5 lg:right-7 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3"
        aria-label="Navegación por pisos del cielo"
      >
        {[...FLOORS].reverse().map((item) => {
          const isActive = currentFloor.id === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToFloor(item.id)}
              className="group flex items-center gap-3 py-1 focus:outline-none"
              aria-label={`Ir a ${item.label}`}
            >
              <span
                className={`text-xs font-medium tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'opacity-100 text-foreground translate-x-0'
                    : 'opacity-0 translate-x-2 group-hover:opacity-80 group-hover:translate-x-0 text-muted-foreground'
                }`}
              >
                <span className="text-primary/80 font-mono mr-1.5">{item.floor}</span>
                {item.label}
              </span>
              <span
                className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-3.5 h-3.5 bg-primary shadow-[0_0_12px_rgba(59,130,246,0.9)]'
                    : 'w-2 h-2 bg-white/30 group-hover:bg-white/70'
                }`}
              />
            </button>
          );
        })}
      </aside>

      {/* Floating Ascend / Descend Floor Elevator (works on mobile & desktop without scrolling) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-1.5 p-1.5 rounded-full glass border border-white/15 bg-[#070b1e]/80 shadow-xl shadow-black/40">
        <button
          type="button"
          onClick={() => canGoDown && scrollToFloor(FLOORS[activeIndex - 1].id)}
          disabled={!canGoDown}
          className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 disabled:opacity-25 disabled:pointer-events-none transition-colors"
          aria-label="Bajar un piso"
          title="Bajar"
        >
          <ChevronDown className="w-4 h-4" />
        </button>

        <span className="px-2 text-xs font-medium text-foreground/90 select-none min-w-[92px] text-center">
          <span className="text-primary font-mono mr-1">{currentFloor.floor}</span>
          {currentFloor.label}
        </span>

        <button
          type="button"
          onClick={() => canGoUp && scrollToFloor(FLOORS[activeIndex + 1].id)}
          disabled={!canGoUp}
          className="p-2 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-25 disabled:bg-transparent disabled:text-muted-foreground disabled:pointer-events-none transition-all"
          aria-label="Subir un piso"
          title="Subir"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>
    </>
  );
}
