import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  parallax: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  active: boolean;
}

const STAR_COLORS = ['#ffffff', '#dbeafe', '#e0e7ff', '#fef3c7', '#bae6fd'];

/**
 * Full-screen interactive starry sky canvas optimized for 60fps:
 * - Caches scrollY via passive listener
 * - Pauses when tab is hidden
 * - Uses fast fillRect for small stars and arc only for larger ones
 */
export function StarrySky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let scrollY = window.scrollY;

    const starCount = Math.min(115, Math.floor((width * height) / 13000));
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.4,
      baseAlpha: Math.random() * 0.65 + 0.25,
      twinkleSpeed: Math.random() * 0.022 + 0.008,
      twinklePhase: Math.random() * Math.PI * 2,
      parallax: Math.random() * 0.16 + 0.03,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    }));

    const shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      alpha: 0,
      active: false,
    };

    let lastShootingTime = performance.now();

    const spawnShootingStar = () => {
      shootingStar.x = Math.random() * width * 0.8 + width * 0.1;
      shootingStar.y = Math.random() * height * 0.4;
      const angle = (Math.random() * 25 + 20) * (Math.PI / 180);
      const speed = Math.random() * 7 + 9;
      shootingStar.vx = Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1);
      shootingStar.vy = Math.sin(angle) * speed;
      shootingStar.alpha = 1;
      shootingStar.active = true;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    const render = (now: number) => {
      if (!document.hidden) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          star.twinklePhase += star.twinkleSpeed;
          const twinkle = 0.5 + 0.5 * Math.sin(star.twinklePhase);
          const alpha = star.baseAlpha * (0.45 + 0.55 * twinkle);

          const rawY = star.y - scrollY * star.parallax;
          const wrappedY = ((rawY % height) + height) % height;

          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha;

          if (star.radius < 1.15) {
            const size = star.radius * 1.8;
            ctx.fillRect(star.x, wrappedY, size, size);
          } else {
            ctx.beginPath();
            ctx.arc(star.x, wrappedY, star.radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        if (!shootingStar.active && now - lastShootingTime > 5200) {
          spawnShootingStar();
          lastShootingTime = now;
        }

        if (shootingStar.active) {
          const tailX = shootingStar.x - shootingStar.vx * 5.5;
          const tailY = shootingStar.y - shootingStar.vy * 5.5;

          const grad = ctx.createLinearGradient(
            shootingStar.x,
            shootingStar.y,
            tailX,
            tailY
          );
          grad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.alpha})`);
          grad.addColorStop(0.4, `rgba(147, 197, 253, ${shootingStar.alpha * 0.55})`);
          grad.addColorStop(1, 'rgba(147, 197, 253, 0)');

          ctx.globalAlpha = 1;
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          shootingStar.x += shootingStar.vx;
          shootingStar.y += shootingStar.vy;
          shootingStar.alpha -= 0.028;

          if (
            shootingStar.alpha <= 0 ||
            shootingStar.x < -100 ||
            shootingStar.x > width + 100 ||
            shootingStar.y > height + 100
          ) {
            shootingStar.active = false;
          }
        }

        ctx.globalAlpha = 1;
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
