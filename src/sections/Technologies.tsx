import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Server, Layout, Cloud, Database, Shield, Zap, Sparkles } from 'lucide-react';

const techCategories = [
  {
    icon: Server,
    title: 'Backend',
    description:
      'Desarrollo de APIs robustas en .NET 8, 10 y ASP.NET Core, integración con bases de datos SQL Server.',
    skills: ['.NET 8', 'ASP.NET Core', 'SQL Server', 'JWT', 'Entity Framework', 'REST APIs'],
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
    starHex: '#60a5fa',
    tailClass: 'via-blue-400',
    starGlow: 'hover:shadow-blue-500/25',
    fallFrom: { x: -95, y: -260, delay: 0.06, duration: 0.42 },
  },
  {
    icon: Layout,
    title: 'Frontend',
    description:
      'Creación de interfaces intuitivas y responsivas con Angular e Ionic. Formularios validados y UX fluido.',
    skills: ['Angular', 'Ionic', 'TypeScript', 'Tailwind CSS', 'RxJS', 'Blazor'],
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
    starHex: '#c084fc',
    tailClass: 'via-purple-400',
    starGlow: 'hover:shadow-purple-500/25',
    fallFrom: { x: -65, y: -290, delay: 0.22, duration: 0.38 },
  },
  {
    icon: Cloud,
    title: 'DevOps & Cloud',
    description: 'Configuración de entornos en Linux con Docker, NGINX y SSL.',
    skills: ['Docker', 'NGINX', 'Linux', 'CI/CD', "SSL/Let's Encrypt"],
    color: 'from-cyan-500/20 to-teal-500/20',
    iconColor: 'text-cyan-400',
    starHex: '#22d3ee',
    tailClass: 'via-cyan-400',
    starGlow: 'hover:shadow-cyan-500/25',
    fallFrom: { x: -80, y: -245, delay: 0.14, duration: 0.44 },
  },
];

const additionalSkills = [
  {
    icon: Database,
    label: 'Bases de Datos',
    items: 'SQL Server',
    starHex: '#60a5fa',
    tailClass: 'via-blue-300',
    fallFrom: { x: -70, y: -220, delay: 0.36, duration: 0.36 },
  },
  {
    icon: Shield,
    label: 'Seguridad',
    items: 'JWT, Auth0, HTTPS',
    starHex: '#a78bfa',
    tailClass: 'via-indigo-300',
    fallFrom: { x: -55, y: -250, delay: 0.48, duration: 0.34 },
  },
  {
    icon: Zap,
    label: 'Performance',
    items: 'Caching, Optimization',
    starHex: '#38bdf8',
    tailClass: 'via-cyan-300',
    fallFrom: { x: -80, y: -230, delay: 0.42, duration: 0.38 },
  },
];

const AMBIENT_METEORS = [
  { left: '8%', top: '8%', length: 80, delay: 0.02, duration: 0.48, travelX: 150, travelY: 320 },
  { left: '28%', top: '4%', length: 65, delay: 0.14, duration: 0.42, travelX: 125, travelY: 280 },
  { left: '50%', top: '6%', length: 95, delay: 0.08, duration: 0.52, travelX: 170, travelY: 360 },
  { left: '72%', top: '7%', length: 85, delay: 0.2, duration: 0.46, travelX: 155, travelY: 330 },
  { left: '88%', top: '14%', length: 70, delay: 0.32, duration: 0.42, travelX: 120, travelY: 270 },
  { left: '18%', top: '28%', length: 60, delay: 0.38, duration: 0.44, travelX: 130, travelY: 280 },
];

export function Technologies() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const extrasRef = useRef<HTMLDivElement>(null);
  const meteorsRef = useRef<HTMLDivElement>(null);
  const [playCount, setPlayCount] = useState(0);
  const wasVisibleRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const resetToEmptySky = () => {
      tlRef.current?.kill();
      gsap.set(titleRef.current, { opacity: 0, y: 24 });
      gsap.set('.tech-card, .extra-card', {
        opacity: 0,
        scale: 0.35,
        y: -14,
        clearProps: 'filter',
      });
      gsap.set('.impact-ring', { opacity: 0, scale: 0.2 });
      gsap.set('.impact-glow', { opacity: 0, scale: 0.25 });
      gsap.set('.ambient-meteor, .falling-star', { opacity: 0 });
    };

    const ctx = gsap.context(resetToEmptySky, sectionRef);

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.intersectionRatio >= 0.22 && !wasVisibleRef.current) {
          wasVisibleRef.current = true;
          setPlayCount((c) => c + 1);
        } else if (!entry.isIntersecting && wasVisibleRef.current) {
          wasVisibleRef.current = false;
          resetToEmptySky();
        }
      },
      { threshold: [0, 0.22] }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (playCount === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
      });

      // Ambient background meteor shower
      const meteors = meteorsRef.current?.querySelectorAll('.ambient-meteor');
      meteors?.forEach((meteor, idx) => {
        const cfg = AMBIENT_METEORS[idx];
        if (!cfg) return;

        tl.fromTo(
          meteor,
          { x: -40, y: -80, opacity: 0 },
          {
            x: cfg.travelX,
            y: cfg.travelY,
            opacity: 0.85,
            duration: cfg.duration * 0.45,
            ease: 'power1.in',
          },
          cfg.delay
        ).to(
          meteor,
          {
            opacity: 0,
            duration: cfg.duration * 0.55,
            ease: 'power1.out',
          },
          cfg.delay + cfg.duration * 0.45
        );
      });

      // Helper to animate any card slot (main or extra) from a falling star impact
      const animateSlot = (
        slot: Element,
        fallCfg: { x: number; y: number; delay: number; duration: number },
        cardSelector: string
      ) => {
        const star = slot.querySelector('.falling-star');
        const ring = slot.querySelector('.impact-ring');
        const glow = slot.querySelector('.impact-glow');
        const card = slot.querySelector(cardSelector);

        const impactAt = fallCfg.delay + fallCfg.duration;

        tl.fromTo(
          star,
          { x: fallCfg.x, y: fallCfg.y, opacity: 0, scale: 0.7 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: fallCfg.duration,
            ease: 'power2.in',
          },
          fallCfg.delay
        );

        tl.fromTo(
          glow,
          { opacity: 0.9, scale: 0.3 },
          { opacity: 0, scale: 2.1, duration: 0.45, ease: 'power2.out' },
          impactAt - 0.02
        );

        tl.fromTo(
          ring,
          { opacity: 0.8, scale: 0.2 },
          { opacity: 0, scale: 2.0, duration: 0.42, ease: 'power2.out' },
          impactAt - 0.02
        );

        tl.to(
          star,
          { opacity: 0, scale: 1.35, duration: 0.14 },
          impactAt - 0.01
        );

        tl.to(
          card,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.48,
            ease: 'back.out(1.2)',
          },
          impactAt - 0.02
        );
      };

      const mainSlots = cardsContainerRef.current?.querySelectorAll('.tech-slot');
      mainSlots?.forEach((slot, index) => {
        animateSlot(slot, techCategories[index].fallFrom, '.tech-card');
      });

      const extraSlots = extrasRef.current?.querySelectorAll('.extra-slot');
      extraSlots?.forEach((slot, index) => {
        animateSlot(slot, additionalSkills[index].fallFrom, '.extra-card');
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [playCount]);

  return (
    <section
      id="technologies"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-24 lg:py-32 overflow-hidden"
    >
      {/* Atmospheric glow & ambient meteor shower */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[780px] h-[380px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
          }}
        />

        <div ref={meteorsRef} className="absolute inset-0">
          {AMBIENT_METEORS.map((m, idx) => (
            <div
              key={idx}
              className="ambient-meteor absolute flex flex-col items-center -rotate-[22deg]"
              style={{ left: m.left, top: m.top }}
              aria-hidden="true"
            >
              <div
                className="w-px bg-gradient-to-b from-transparent via-blue-200/70 to-white"
                style={{ height: `${m.length}px` }}
              />
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(147,197,253,0.9)] -mt-0.5" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Mi <span className="text-gradient">Stack</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Experiencia sólida en el desarrollo full-stack con tecnologías modernas y
            mejores prácticas de la industria.
          </p>
        </div>

        {/* 3 Main Tech Cards */}
        <div ref={cardsContainerRef} className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {techCategories.map((category) => (
            <div key={category.title} className="tech-slot relative flex flex-col">
              {/* Falling Star */}
              <div
                className="falling-star pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center -rotate-[20deg] opacity-0"
                aria-hidden="true"
              >
                <div
                  className={`w-0.5 h-28 bg-gradient-to-b from-transparent ${category.tailClass} to-white`}
                />
                <div
                  className="w-3 h-3 rounded-full bg-white -mt-1"
                  style={{
                    boxShadow: `0 0 16px 5px ${category.starHex}, 0 0 34px 10px ${category.starHex}`,
                  }}
                />
              </div>

              {/* Soft Impact Glow (pure radial gradient, zero CSS blur) */}
              <div
                className="impact-glow will-change-transform pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-36 h-36 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${category.starHex}80 0%, transparent 70%)`,
                }}
                aria-hidden="true"
              />

              {/* Impact Shockwave Ring */}
              <div
                className="impact-ring will-change-transform pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-32 h-32 rounded-full border"
                style={{
                  borderColor: category.starHex,
                }}
                aria-hidden="true"
              />

              {/* Materialized Tech Card (transition-colors only so CSS never fights GSAP transform) */}
              <div
                className={`tech-card will-change-transform group relative flex-1 p-6 lg:p-8 rounded-2xl glass border border-white/10 hover:border-white/25 hover:bg-white/[0.08] transition-colors duration-300 ${category.starGlow}`}
              >
                <div className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-[#090e26] border border-white/20 flex items-center justify-center shadow-lg">
                  <Sparkles className={`w-3.5 h-3.5 ${category.iconColor}`} />
                </div>

                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className={`inline-flex self-start p-3.5 mb-6 rounded-xl bg-white/5 border border-white/10 ${category.iconColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{category.title}</h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                    {category.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="skill-pill px-3 py-1 text-xs font-medium bg-white/5 text-muted-foreground rounded-full border border-white/10 hover:border-primary/40 hover:text-foreground transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Additional Skill Cards (also spawned from falling stars) */}
        <div ref={extrasRef} className="grid sm:grid-cols-3 gap-4 lg:gap-6">
          {additionalSkills.map((skill) => (
            <div key={skill.label} className="extra-slot relative">
              <div
                className="falling-star pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center -rotate-[20deg] opacity-0"
                aria-hidden="true"
              >
                <div
                  className={`w-0.5 h-20 bg-gradient-to-b from-transparent ${skill.tailClass} to-white`}
                />
                <div
                  className="w-2.5 h-2.5 rounded-full bg-white -mt-1"
                  style={{
                    boxShadow: `0 0 14px 4px ${skill.starHex}, 0 0 26px 8px ${skill.starHex}`,
                  }}
                />
              </div>

              <div
                className="impact-glow will-change-transform pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-28 h-28 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${skill.starHex}80 0%, transparent 70%)`,
                }}
                aria-hidden="true"
              />

              <div
                className="impact-ring will-change-transform pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-24 h-24 rounded-full border"
                style={{ borderColor: skill.starHex }}
                aria-hidden="true"
              />

              <div className="extra-card will-change-transform flex items-center gap-4 p-4 lg:p-6 rounded-xl glass border border-white/10 hover:bg-white/[0.08] transition-colors duration-300">
                <div className="p-3 rounded-lg bg-white/5 text-primary">
                  <skill.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">{skill.label}</h4>
                  <p className="text-xs text-muted-foreground">{skill.items}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
