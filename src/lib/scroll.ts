/**
 * Smooth, 60fps cubic ease-out scroll to a section ID.
 * Snappier and more consistent across browsers than native smooth scroll.
 */
export function scrollToSection(id: string, durationMs = 520) {
  const target = document.getElementById(id.replace(/^#/, ''));
  if (!target) return;

  const startY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + startY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  const startTime = performance.now();

  const step = (now: number) => {
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / durationMs);
    // Cubic ease-out for fast start and soft landing
    const eased = 1 - Math.pow(1 - t, 3);
    window.scrollTo(0, startY + distance * eased);

    if (t < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}
