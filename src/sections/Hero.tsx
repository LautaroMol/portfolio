import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Linkedin, Github, Mail, ChevronUp, Sparkles } from 'lucide-react';
import { SilhouetteScene } from '@/components/SilhouetteScene';
import { scrollToSection } from '@/lib/scroll';

const socialLinks = [
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/lautaro-maximiliano-castellanos-molina/',
    label: 'LinkedIn',
  },
  { icon: Github, href: 'https://github.com/LautaroMol', label: 'GitHub' },
  { icon: Mail, href: 'mailto:lautaro.castellanos.dev@gmail.com', label: 'Email' },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 0.05 }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', delay: 0.16 }
      );

      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', delay: 0.25 }
      );

      gsap.fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.34 }
      );

      gsap.fromTo(
        socialsRef.current?.children || [],
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.06, ease: 'back.out(1.6)', delay: 0.42 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (id: string) => {
    scrollToSection(id, 500);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-24 sm:pt-28 pb-56 sm:pb-64"
    >
      {/* Upward Ascent Cue */}
      <div className="relative z-10 mb-5">
        <button
          onClick={() => handleScrollTo('#technologies')}
          className="group inline-flex flex-col items-center gap-1 text-xs uppercase tracking-[0.2em] text-blue-200/75 hover:text-white transition-colors"
        >
          <ChevronUp className="w-5 h-5 animate-bounce text-primary" />
          <span>Deslizá hacia arriba para subir</span>
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-7 glass rounded-full">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-muted-foreground">Disponible para proyectos</span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5"
        >
          <span className="text-foreground">Lautaro Maximiliano</span>
          <br />
          <span className="text-gradient">Castellanos Molina</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground mb-5"
        >
          Desarrollador <span className="text-primary">FullStack</span>
        </p>

        {/* Description */}
        <p
          ref={descRef}
          className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground/85 leading-relaxed mb-9"
        >
          Desarrollador de Software. Programando desde 2019, creo soluciones de software
          usando .NET y Angular. Tecnología en servidores: Docker y Linux Debian. Bilingüe
          español/inglés (B2).
        </p>

        {/* CTA Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <button
            onClick={() => handleScrollTo('#technologies')}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
          >
            <Sparkles className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Explorar el cielo</span>
            <ChevronUp className="w-4 h-4 relative z-10 group-hover:-translate-y-0.5 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={() => handleScrollTo('#projects')}
            className="px-8 py-4 glass text-foreground font-medium rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Ver proyectos
          </button>

          <button
            onClick={() => handleScrollTo('#contact')}
            className="px-7 py-4 glass text-muted-foreground hover:text-foreground font-medium rounded-full hover:bg-white/10 transition-all duration-300"
          >
            Contactarme
          </button>
        </div>

        {/* Social Links */}
        <div ref={socialsRef} className="flex items-center justify-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Minimalist Silhouette on the Horizon */}
      <SilhouetteScene />
    </section>
  );
}
