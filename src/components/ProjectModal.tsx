import { useEffect, type ReactNode } from 'react';
import { ExternalLink, Github, Sparkles, X, Layers, Code2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface StructuredStack {
  frontend?: string[];
  backend?: string[];
  databaseAndInfra?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category?: string;
  description: string;
  highlights?: string[];
  architectureNote?: string;
  icon?: LucideIcon;
  customLogo?: ReactNode;
  tech: string[] | StructuredStack;
  links: {
    demo: string | null;
    github: string | null;
  };
  featured?: boolean;
  color: string;
  iconColor: string;
  starColor: string;
}

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

/**
 * Modern glassmorphism modal with fixed header, responsive 2-column body,
 * custom subtle scrollbar, and sticky actions footer for optimal vertical fit.
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const parts = project.description.split('Funciones:');
  const mainDesc = parts[0].trim();
  const legacyFunctions = parts[1]
    ? parts[1]
        .split('-')
        .map((f) => f.trim().replace(/\\n/g, ''))
        .filter(Boolean)
    : [];

  const highlights = project.highlights && project.highlights.length > 0
    ? project.highlights
    : legacyFunctions.map((f) => f.charAt(0).toUpperCase() + f.slice(1));

  const hasGithub = Boolean(project.links.github && project.links.github !== '#');
  const hasDemo = Boolean(project.links.demo && project.links.demo !== '#');
  const isStructuredStack = !Array.isArray(project.tech);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 md:p-10 lg:p-12 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[80vh] flex flex-col rounded-3xl glass border border-white/15 bg-[#070b1d]/95 shadow-2xl shadow-indigo-950/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle ambient gradient overlay */}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.color} opacity-25`}
        />

        {/* 1. STICKY TOP HEADER */}
        <header className="relative z-10 shrink-0 flex items-center justify-between gap-4 px-6 sm:px-8 py-4 border-b border-white/10 bg-[#070b1d]/90 backdrop-blur-md">
          <div className="flex items-center gap-4 min-w-0">
            {project.customLogo ? (
              project.customLogo
            ) : project.icon ? (
              <div
                className={`p-3 rounded-2xl bg-white/10 border border-white/10 ${project.iconColor} shrink-0`}
              >
                <project.icon className="w-6 h-6" />
              </div>
            ) : null}

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                {project.featured && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/20 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Destacado
                  </span>
                )}
                {project.category && (
                  <span className="px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded-full">
                    {project.category}
                  </span>
                )}
              </div>
              <h3
                id="project-modal-title"
                className="text-xl sm:text-2xl font-bold text-foreground truncate"
                title={project.title}
              >
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-primary/90 truncate mt-0.5" title={project.tagline}>
                {project.tagline}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/15 transition-colors shrink-0"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* 2. SCROLLABLE BODY (2 Columns on medium+ screens to cut height by 50%) */}
        <div className="relative z-10 flex-1 overflow-y-auto modal-scrollbar p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left Column: Description, Highlights, Architecture */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-2.5">
                  Descripción general
                </h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {mainDesc}
                </p>
              </div>

              {highlights.length > 0 && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Puntos clave & Funcionalidades
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                    {highlights.map((item, index) => (
                      <li key={index} className="flex items-start gap-2.5">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.architectureNote && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/15">
                  <Layers className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-1">
                      Nota de arquitectura
                    </h5>
                    <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed">
                      {project.architectureNote}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Organized Tech Stack Cards */}
            <div className="md:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-foreground font-semibold text-xs uppercase tracking-wider border-b border-white/10 pb-3">
                  <Code2 className="w-4 h-4 text-primary" />
                  Stack Tecnológico
                </div>

                {isStructuredStack ? (
                  <div className="space-y-4">
                    {(project.tech as StructuredStack).frontend?.length ? (
                      <div>
                        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80 block mb-2">
                          Frontend
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(project.tech as StructuredStack).frontend!.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 text-xs font-medium bg-white/5 text-foreground/90 rounded-lg border border-white/10 hover:border-primary/40 transition-colors"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {(project.tech as StructuredStack).backend?.length ? (
                      <div>
                        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80 block mb-2">
                          Backend
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(project.tech as StructuredStack).backend!.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 text-xs font-medium bg-white/5 text-foreground/90 rounded-lg border border-white/10 hover:border-primary/40 transition-colors"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {(project.tech as StructuredStack).databaseAndInfra?.length ? (
                      <div>
                        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80 block mb-2">
                          Base de Datos & Infra
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {(project.tech as StructuredStack).databaseAndInfra!.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 text-xs font-medium bg-white/5 text-foreground/90 rounded-lg border border-white/10 hover:border-primary/40 transition-colors"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {(project.tech as string[]).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium bg-white/5 text-foreground/90 rounded-lg border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. STICKY BOTTOM FOOTER (Always visible actions, no scroll required) */}
        <footer className="relative z-10 shrink-0 flex flex-wrap items-center justify-between gap-3 px-6 sm:px-8 py-3 sm:py-3.5 border-t border-white/10 bg-[#070b1d]/90 backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-3">
            {hasDemo && (
              <a
                href={project.links.demo!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-medium hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Ver Demo / App
              </a>
            )}
            {hasGithub ? (
              <a
                href={project.links.github!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors"
              >
                <Github className="w-4 h-4" />
                Ver Código
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-xs text-muted-foreground border border-white/5">
                <Github className="w-3.5 h-3.5" />
                Repositorio privado
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            Cerrar ventana
          </button>
        </footer>
      </div>
    </div>
  );
}
