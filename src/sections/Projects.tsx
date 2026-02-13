import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Calendar,Smartphone, Map } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'SeasonMedic - Telemedicina',
    description: 'Aplicación móvil desarrollada en Ionic con backend .NET con el propósito de ayudar a la telemedicina. Funciones: -organizar consultas \n -permitir pagos -Ingreso biometrico -Historia clinica -Tema claro y oscuro -Personalizacion de perfil',
    icon: Smartphone,
    tech: ['Ionic', '.NET', 'TypeScript', 'MercadoPago SDK', 'Cloudinary','JWT', 'Entity Framework', 'SQL Server'],
    links: {
      demo: 'https://play.google.com/store/apps/details?id=com.seasonmedicapps.seasonmedic',
      github: '#',
    },
    featured: true,
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
  },
  {
    title: 'Gestor y asistente de viajes',
    description: 'Proyecto universitario destinado a dar asistencia y organizar viajes con carga, desarrollado en .NET 8 y Angular. Funciones: -Organizacion de viajes -Calculadora de costos -Gestion de cargas -Gestion de vehiculos y estado -Calculadora de ruta -Seguimiento en tiempo real del viaje',
    icon: Map,
    tech: ['ASP.NET', 'Angular', 'TypeScript', 'SQL Server', 'REST API','JWT', 'Leaflet'],
    links: {
      demo: '#',
      github: '#',
    },
    color: 'from-emerald-500/20 to-green-500/20',
    iconColor: 'text-emerald-400',
  },
    {
    title: 'Sistema de Gestión Hotelera',
    description: 'Proyecto de gestión de hotel realizado en grupo como trabajo de la carrera. Funciones: -Gestión de reservas -Check-in y check-out -Gestión de habitaciones -Reservas a traves del tiempo -Modificacion de equipacion de la habitacion',
    icon: Calendar,
    tech: ['.NET 6', 'Blazor', 'Bootstrap', 'MudBlazor', 'SQL Server'],
    links: {
      demo: '#',
      github: '#',
    },
    color: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
  },

];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
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
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16 lg:mb-20">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Algunos <span className="text-gradient">Trabajos</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Proyectos desarrollados con pasión y atención al detalle, 
            aplicando las mejores prácticas de desarrollo.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={cardsRef} className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`project-card group relative rounded-2xl overflow-hidden ${
                project.featured ? 'lg:col-span-2 lg:row-span-1' : ''
              }`}
            >
              {/* Card Background */}
              <div className="absolute inset-0 glass" />
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 rounded-xl bg-white/5 ${project.iconColor}`}>
                    <project.icon className="w-6 h-6" />
                  </div>
                  
                  {/* Links */}
                  <div className="flex items-center gap-2">
                    <a
                      href={project.links.github}
                      className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-300"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-300"
                      aria-label="Ver demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-semibold mb-3 group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>

                {/* Description and Functions */}
                <div className="flex-grow mb-6">
                  {(() => {
                    const parts = project.description.split('Funciones:');
                    const mainDesc = parts[0].trim();
                    const functions = parts[1] ? parts[1].split('-').map(f => f.trim().replace(/\\n/g, '')).filter(f => f) : [];

                    return (
                      <>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {mainDesc}
                        </p>
                        {functions.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2 text-foreground">
                              Funciones
                            </h4>
                            <ul className="text-muted-foreground text-sm space-y-1">
                              {functions.map((func, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="mr-2 text-primary">-</span>
                                  <span>{func.charAt(0).toUpperCase() + func.slice(1)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>


                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-white/5 text-muted-foreground rounded-full border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/LautaroMol"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            <span>Ver más en GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
