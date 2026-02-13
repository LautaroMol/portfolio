import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Server, Layout, Cloud, Database, Shield, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const techCategories = [
  {
    icon: Server,
    title: 'Backend',
    description: 'Desarrollo de APIs robustas en .NET 8, 10  y ASP.NET Core, integración con bases de datos SQL Server.',
    skills: ['.NET 8', 'ASP.NET Core', 'SQL Server', 'JWT', 'Entity Framework', 'REST APIs'],
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: Layout,
    title: 'Frontend',
    description: 'Creación de interfaces intuitivas y responsivas con Angular e Ionic. Formularios validados y UX fluido.',
    skills: ['Angular', 'Ionic', 'TypeScript', 'Tailwind CSS', 'RxJS', 'Blazor'],
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: Cloud,
    title: 'DevOps & Cloud',
    description: 'Configuración de entornos en Linux con Docker, NGINX y SSL.',
    skills: ['Docker', 'NGINX', 'Linux', 'CI/CD', 'SSL/Let\'s Encrypt'],
    color: 'from-cyan-500/20 to-teal-500/20',
    iconColor: 'text-cyan-400',
  },
];

const additionalSkills = [
  { icon: Database, label: 'Bases de Datos', items: 'SQL Server' },
  { icon: Shield, label: 'Seguridad', items: 'JWT, HTTPS' },
  { icon: Zap, label: 'Performance', items: 'Caching, Optimization' },
];

export function Technologies() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const extrasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.tech-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Extras animation
      const extras = extrasRef.current?.querySelectorAll('.extra-item');
      extras?.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            delay: index * 0.1,
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technologies"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16 lg:mb-20">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
            Stack Tecnológico
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Mis <span className="text-gradient">Tecnologías</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Experiencia sólida en el desarrollo full-stack con tecnologías modernas 
            y mejores prácticas de la industria.
          </p>
        </div>

        {/* Tech Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {techCategories.map((category) => (
            <div
              key={category.title}
              className="tech-card group relative p-6 lg:p-8 rounded-2xl glass hover:bg-white/[0.08] transition-all duration-500"
              style={{ perspective: '1000px' }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex p-3 mb-6 rounded-xl bg-white/5 ${category.iconColor}`}>
                  <category.icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3">{category.title}</h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs font-medium bg-white/5 text-muted-foreground rounded-full border border-white/10 hover:border-primary/30 hover:text-foreground transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div ref={extrasRef} className="grid sm:grid-cols-3 gap-4 lg:gap-6">
          {additionalSkills.map((skill) => (
            <div
              key={skill.label}
              className="extra-item flex items-center gap-4 p-4 lg:p-6 rounded-xl glass hover:bg-white/[0.08] transition-all duration-300"
            >
              <div className="p-3 rounded-lg bg-white/5 text-primary">
                <skill.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-sm">{skill.label}</h4>
                <p className="text-xs text-muted-foreground">{skill.items}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
