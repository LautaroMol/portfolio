import { Heart, Code2 } from 'lucide-react';

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative py-8 lg:py-12 border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Lautaro Castellanos</p>
              <p className="text-xs text-muted-foreground">
                © {currentYear} Todos los derechos reservados
              </p>
            </div>
          </div>

          {/* Made with */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Hecho con</span>
            <span className="text-gradient font-medium">React + TypeScript</span>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Inicio
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Proyectos
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
