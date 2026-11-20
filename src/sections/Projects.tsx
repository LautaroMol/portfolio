import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Github, Map } from 'lucide-react';
import { ProjectModal, type ProjectItem } from '@/components/ProjectModal';

gsap.registerPlugin(ScrollTrigger);

const VitalyxLogo = (
  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2dd4bf] to-[#06b6d4] flex items-center justify-center shadow-lg shadow-teal-500/25 shrink-0">
    <span className="text-2xl font-extrabold text-[#042f2e] tracking-tight">V</span>
  </div>
);

const OusLogo = (
  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center p-1 shadow-lg shadow-blue-900/30 border-2 border-[#0d6838] shrink-0 overflow-hidden">
    <svg viewBox="0 0 100 85" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text
        x="50"
        y="41"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="35"
        fill="#0d3c73"
        letterSpacing="-0.5"
      >
        OUS
      </text>
      {/* Top green curve */}
      <path
        d="M 20 54 Q 50 40 78 48 C 73 53 50 47 20 54 Z"
        fill="#15803d"
      />
      {/* Bottom cyan curve */}
      <path
        d="M 24 58 Q 48 49 65 58 C 60 62 46 55 24 58 Z"
        fill="#0284c7"
      />
    </svg>
  </div>
);

const GestoWorkLogo = (
  <div className="h-14 flex items-center justify-center p-1.5 rounded-2xl bg-[#070b1d] border border-white/10 shadow-lg shadow-amber-500/10 shrink-0 px-3">
    <img
      src="/projects/gestowork.png"
      alt="GestoWork Logo"
      className="h-10 w-auto object-contain"
    />
  </div>
);

const SeasonMedicLogo = (
  <div className="h-14 flex items-center justify-center p-1.5 rounded-2xl bg-[#070b1d] border border-white/10 shadow-lg shadow-emerald-500/10 shrink-0 px-2.5">
    <img
      src="/projects/seasonmedic.png"
      alt="Season Medic Logo"
      className="h-11 w-auto object-contain"
    />
  </div>
);

const projects: ProjectItem[] = [
  {
    id: 'vitalyx',
    title: 'Vitalyx',
    tagline: 'Sistema de gestión de turnos multi-centro y asistencia clínica personalizada con IA',
    category: 'Full-Stack',
    description:
      'Vitalyx es una plataforma de gestión hospitalaria y médica diseñada para optimizar el agendamiento de citas y asistir activamente al profesional durante la consulta. En el frontend, una SPA desarrollada con Angular y Tailwind CSS proporciona una interfaz clínica intuitiva con flujos de reserva guiados, selección de roles y un calendario interactivo de disponibilidad en tiempo real. El backend, construido en .NET 10 bajo Clean Architecture y CQRS con MediatR, gestiona la persistencia en SQL Server, la autenticación con Auth0 JWT y la generación de sugerencias diagnósticas integrando la IA de Google Gemini con los antecedentes del paciente y criterios médicos personalizados.',
    highlights: [
      'Asistente clínico inteligente con Gemini AI: analiza el motivo de consulta cruzándolo con el historial clínico del paciente y notas de criterio personalizadas del especialista para sugerir hipótesis y planes terapéuticos.',
      'Autenticación end-to-end con Auth0: soporte para Social Login (Google OAuth) y tokens JWT Bearer validados en ASP.NET Core, sincronizando perfiles y claims de rol (Paciente y Profesional).',
      'Motor de disponibilidad horaria reactivo: cálculo optimizado en lote de slots libres y excepciones de agenda semanales, visualizados mediante un calendario interactivo en Angular basado en Signals.',
    ],
    architectureNote:
      'Arquitectura desacoplada basada en Clean Architecture y CQRS en .NET 10 con documentación interactiva en Scalar, comunicada vía REST con una SPA en Angular zoneless impulsada por Signals y asegurada con Auth0.',
    customLogo: VitalyxLogo,
    tech: {
      frontend: ['Angular 22', 'TypeScript', 'Tailwind CSS', 'RxJS', 'Auth0 Angular SDK'],
      backend: [
        '.NET 10',
        'ASP.NET Core Web API',
        'MediatR (CQRS)',
        'FluentValidation',
        'Scalar OpenAPI',
        'Google Gemini AI',
      ],
      databaseAndInfra: [
        'SQL Server',
        'Entity Framework Core 10',
        'Docker',
        'IIS / MonsterASP',
        'Vercel',
      ],
    },
    links: {
      github: 'https://github.com/LautaroMol/APITurnero',
      demo: 'https://vytalix-swart.vercel.app/dashboard',
    },
    featured: true,
    color: 'from-teal-500/25 to-cyan-500/20',
    iconColor: 'text-teal-400',
    starColor: 'rgba(255, 255, 255, 0.85)',
  },
  {
    id: 'ous-gestion-seguros',
    title: 'OUS - Sistema de Gestión de Seguros y Servicios',
    tagline: 'SaaS multiempresa para la gestión integral de pólizas, cajas, sucursales y liquidaciones',
    category: 'Full-Stack',
    description:
      'Plataforma SaaS multi-tenant diseñada para centralizar la operación comercial, administrativa y financiera de intermediarios de servicios y seguros vehiculares. El frontend provee interfaces reactivas y modulares para la administración de clientes, vehículos, arqueos de caja en sucursales y métricas interactivas. El backend procesa las operaciones mediante una API REST en Clean Architecture, garantizando aislamiento de datos por empresa, transacciones atómicas y generación dinámica de reportes.',
    highlights: [
      'Arquitectura multi-tenant con autenticación JWT vía cookies HttpOnly, autorización por roles (RBAC) y control de acceso por sucursal.',
      'Módulo financiero integral con control de aperturas y cierres de cajas diarias, trazabilidad de movimientos y liquidación de rendiciones de productores.',
      'Motor de reportes y exportación masiva a PDF en backend con QuestPDF/SkiaSharp, complementado con dashboards estadísticos en frontend con Chart.js.',
    ],
    architectureNote:
      'Frontend y Backend se integran vía REST con credenciales HttpOnly y políticas de rate limiting, aplicando Clean Architecture en el servidor con filtros globales de query para soft-delete e interceptores automáticos de auditoría.',
    customLogo: OusLogo,
    tech: {
      frontend: ['Angular 22', 'TypeScript', 'TailwindCSS', 'Chart.js', 'RxJS', 'Vitest'],
      backend: [
        '.NET 8',
        'ASP.NET Core Web API',
        'ASP.NET Core Identity',
        'AutoMapper',
        'QuestPDF',
      ],
      databaseAndInfra: [
        'SQL Server 2022',
        'Entity Framework Core 8',
        'Docker',
        'Docker Compose',
      ],
    },
    links: {
      github: null,
      demo: null,
    },
    featured: true,
    color: 'from-blue-600/25 to-emerald-500/20',
    iconColor: 'text-blue-400',
    starColor: 'rgba(255, 255, 255, 0.85)',
  },
  {
    id: 'gestowork',
    title: 'GestoWork - Plataforma de Gestión de Personal y Asistencia',
    tagline: 'SaaS para gestión de personal, control de asistencia geolocalizada y turnos rotativos',
    category: 'Full-Stack',
    description:
      'Plataforma SaaS multi-tenant diseñada para la administración de personal, planificación de turnos rotativos y control de asistencia laboral. El frontend en Angular ofrece fichaje de autoservicio con geolocalización, mapas interactivos con Leaflet, calendarios de turnos con FullCalendar y paneles de gestión por roles. El backend en .NET 8 resuelve la lógica de rotaciones complejas con un motor de horarios personalizado, geofencing mediante cálculo de Haversine y vinculación segura de dispositivos.',
    highlights: [
      'Fichaje de asistencia geolocalizado con geofencing (cálculo de distancia Haversine) y vinculación criptográfica de dispositivos móviles (Device Binding) para evitar suplantaciones.',
      'Motor de horarios y rotaciones (ScheduleEngine) con soporte para ciclos de N días, excepciones, feriados y comparativa automática horario asignado vs. asistencia real.',
      'Arquitectura multi-empresa con RBAC granular por roles y sucursales (Branch Scoping con caché en memoria), más generación e impresión de códigos QR para sedes.',
    ],
    architectureNote:
      'Frontend y Backend se integran mediante API REST y JWT con autorización granular por sucursal (Branch Scoping), validando fichajes con geofencing y optimizando consultas con caché en memoria.',
    customLogo: GestoWorkLogo,
    tech: {
      frontend: [
        'Angular 22',
        'TypeScript',
        'TailwindCSS',
        'Leaflet',
        'FullCalendar',
        'Chart.js',
        'RxJS',
      ],
      backend: [
        '.NET 8',
        'ASP.NET Core Web API',
        'ASP.NET Core Identity',
        'Entity Framework Core 8',
        'AutoMapper',
        'QRCoder',
      ],
      databaseAndInfra: ['SQL Server', 'EF Core Migrations', 'Memory Cache'],
    },
    links: {
      github: null,
      demo: null,
    },
    featured: true,
    color: 'from-amber-500/25 to-purple-600/20',
    iconColor: 'text-amber-400',
    starColor: 'rgba(255, 255, 255, 0.85)',
  },
  {
    id: 'seasonal-medic',
    title: 'Seasonal Medic',
    tagline: 'Plataforma médica multi-país con app móvil, CRM web y gestión de abonos y consultas',
    category: 'Full-Stack',
    description:
      'Ecosistema de salud integral compuesto por una app móvil híbrida para pacientes (Ionic/Capacitor) y un CRM web con SSR para administradores, agentes, médicos y empresas (Angular). Ambos clientes consumen una API REST en .NET 8 que centraliza la gestión de consultas médicas, abonos mensuales, afiliaciones corporativas, pagos con MercadoPago y procesos automáticos en segundo plano.',
    highlights: [
      'Arquitectura multi-país (AR, BO, PY, EC): la app detecta la ubicación con Capacitor Geolocation + Nominatim para enrutar a la API regional, mientras el backend carga configuración y zonas horarias por país.',
      'Autenticación con JWT Bearer y Refresh Tokens (30 días), interceptor HTTP con renovación automática ante 401 en la app móvil, biometría y almacenamiento seguro nativo.',
      'Automatización y servicios externos: BackgroundServices para asignación automática de turnos y débitos mensuales, pagos con MercadoPago SDK, imágenes en Cloudinary, emails con MailKit y exportación a Excel/CSV.',
    ],
    architectureNote:
      'Tanto la app móvil como el CRM web se comunican vía REST con la API en .NET 8 usando interceptores HTTP para inyectar tokens JWT Bearer (con refresh automático en la app móvil) y autorización basada en roles.',
    customLogo: SeasonMedicLogo,
    tech: {
      frontend: [
        'Angular 22',
        'Ionic 8 & Capacitor 8',
        'Angular SSR & Tailwind CSS',
        'Angular Material & Chart.js',
      ],
      backend: [
        '.NET 8 / ASP.NET Core Web API',
        'ASP.NET Core Identity & JWT',
        'AutoMapper & MercadoPago SDK',
        'MailKit, Cloudinary & ClosedXML',
      ],
      databaseAndInfra: [
        'SQL Server 2022',
        'Entity Framework Core 8',
        'Docker & Docker Compose',
        'Swagger / OpenAPI',
      ],
    },
    links: {
      github: null,
      demo: 'https://play.google.com/store/apps/details?id=com.seasonmedicapps.seasonmedic&hl=es_AR&pli=1',
    },
    featured: true,
    color: 'from-emerald-500/25 to-teal-500/20',
    iconColor: 'text-emerald-400',
    starColor: 'rgba(255, 255, 255, 0.85)',
  },
  {
    id: 'gestor-viajes',
    title: 'Gestor y asistente de viajes',
    tagline: 'Plataforma web para logística, rutas y seguimiento en tiempo real',
    description:
      'Proyecto universitario destinado a dar asistencia y organizar viajes con carga, desarrollado en .NET 8 y Angular. Funciones: -Organizacion de viajes -Calculadora de costos -Gestion de cargas -Gestion de vehiculos y estado -Calculadora de ruta -Seguimiento en tiempo real del viaje',
    icon: Map,
    tech: ['ASP.NET', 'Angular', 'TypeScript', 'SQL Server', 'REST API', 'JWT', 'Leaflet'],
    links: {
      demo: '#',
      github: '#',
    },
    color: 'from-emerald-500/25 to-green-500/20',
    iconColor: 'text-emerald-400',
    starColor: 'rgba(255, 255, 255, 0.85)',
  },
  {
    id: 'gestion-hotelera',
    title: 'Sistema de Gestión Hotelera',
    tagline: 'Gestión integral de reservas, habitaciones y check-in/out',
    description:
      'Proyecto de gestión de hotel realizado en grupo como trabajo de la carrera. Funciones: -Gestión de reservas -Check-in y check-out -Gestión de habitaciones -Reservas a traves del tiempo -Modificacion de equipacion de la habitacion',
    icon: Calendar,
    tech: ['.NET 6', 'Blazor', 'Bootstrap', 'MudBlazor', 'SQL Server'],
    links: {
      demo: '#',
      github: '#',
    },
    color: 'from-amber-500/25 to-orange-500/20',
    iconColor: 'text-amber-400',
    starColor: 'rgba(255, 255, 255, 0.85)',
  },
];

// Organic asymmetric night-sky star positions (valid Tailwind v3 sizes only)
const STAR_POSITIONS = [
  { left: '12%', top: '34%', size: 'w-16 h-16 sm:w-20 sm:h-20', tilt: -8 },
  { left: '28%', top: '74%', size: 'w-14 h-14 sm:w-16 sm:h-16', tilt: 14 },
  { left: '44%', top: '24%', size: 'w-16 h-16 sm:w-20 sm:h-20', tilt: -12 },
  { left: '60%', top: '68%', size: 'w-14 h-14 sm:w-16 sm:h-16', tilt: 9 },
  { left: '76%', top: '26%', size: 'w-14 h-14 sm:w-16 sm:h-16', tilt: -15 },
  { left: '90%', top: '64%', size: 'w-12 h-12 sm:w-14 sm:h-14', tilt: 6 },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    let isActive = true;
    const activeTweens: gsap.core.Tween[] = [];
    const activeTimelines: gsap.core.Timeline[] = [];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    const nodes = Array.from(
      constellationRef.current?.querySelectorAll('.star-node') ?? []
    );

    // Initialize resting small star-dot state for every star
    nodes.forEach((node, index) => {
      const core = node.querySelector('.star-core');
      const halo = node.querySelector('.star-halo');
      if (core) gsap.set(core, { opacity: 0.65, scale: 0.26 });
      if (halo) gsap.set(halo, { opacity: 0.28, scale: 0.35 });

      gsap.fromTo(
        node,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'back.out(1.5)',
          delay: index * 0.1,
        }
      );
    });

    // Sequential random starlight twinkle: grows from small dot into bright 4-point star, then shrinks back
    let lastIndex = -1;
    const triggerRandomStar = () => {
      if (!isActive || nodes.length === 0) return;

      let nextIndex = Math.floor(Math.random() * nodes.length);
      if (nodes.length > 1 && nextIndex === lastIndex) {
        nextIndex = (nextIndex + 1 + Math.floor(Math.random() * (nodes.length - 1))) % nodes.length;
      }
      lastIndex = nextIndex;

      const node = nodes[nextIndex];
      const core = node?.querySelector('.star-core');
      const halo = node?.querySelector('.star-halo');

      if (core && halo) {
        const tl = gsap.timeline();
        tl.to(core, {
          opacity: 1,
          scale: 1.18,
          rotation: (Math.random() - 0.5) * 18,
          duration: 0.28,
          ease: 'power2.out',
        })
          .to(
            halo,
            {
              opacity: 0.9,
              scale: 1.35,
              duration: 0.28,
              ease: 'power2.out',
            },
            0
          )
          .to(core, {
            opacity: 0.65,
            scale: 0.26,
            rotation: 0,
            duration: 0.65,
            ease: 'sine.inOut',
          })
          .to(
            halo,
            {
              opacity: 0.28,
              scale: 0.35,
              duration: 0.65,
              ease: 'sine.inOut',
            },
            '<'
          );

        activeTimelines.push(tl);
      }

      const nextWaitSec = 0.32 + Math.random() * 0.38;
      activeTweens.push(gsap.delayedCall(nextWaitSec, triggerRandomStar));
    };

    activeTweens.push(gsap.delayedCall(0.35, triggerRandomStar));

    return () => {
      isActive = false;
      activeTweens.forEach((t) => t.kill());
      activeTimelines.forEach((tl) => tl.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-24 lg:py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-10 lg:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Mis <span className="text-gradient">Proyectos</span>
          </h2>
          <p className="max-w-xl mx-auto text-base sm:text-lg text-muted-foreground">
            Clickea en las estrellas y conoce mis proyectos
          </p>
        </div>

        {/* Pure Twinkling White Stars */}
        <div
          ref={constellationRef}
          className="relative w-full h-[360px] sm:h-[420px] max-w-5xl mx-auto"
        >
          {projects.map((project, index) => {
            const pos = STAR_POSITIONS[index] ?? STAR_POSITIONS[0];
            return (
              <div
                key={project.id}
                className="star-node absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: pos.left, top: pos.top }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="group relative flex items-center justify-center p-4 focus:outline-none cursor-pointer"
                  style={{ transform: `rotate(${pos.tilt}deg)` }}
                  aria-label={`Abrir proyecto ${project.title}`}
                >
                  <span
                    className="star-halo absolute -inset-3 rounded-full"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)',
                    }}
                    aria-hidden="true"
                  />

                  <span className="relative z-10 inline-flex transition-transform duration-300 group-hover:scale-125">
                    <svg
                      viewBox="0 0 100 100"
                      className={`star-core ${pos.size} text-white`}
                      aria-hidden="true"
                    >
                      <path
                        d="M50 4 L57 43 L96 50 L57 57 L50 96 L43 57 L4 50 L43 43 Z"
                        fill="currentColor"
                      />
                      <circle cx="50" cy="50" r="8" fill="#ffffff" />
                    </svg>
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* View More */}
        <div className="text-center mt-8">
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

      {/* Project Details Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
