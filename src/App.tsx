import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/Navigation';
import { StarrySky } from './components/StarrySky';
import { FloorIndicator } from './components/FloorIndicator';
import { Hero } from './sections/Hero';
import { Technologies } from './sections/Technologies';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    gsap.defaults({
      ease: 'power3.out',
      duration: 1,
      force3D: true,
    });

    // Start the journey cleanly framed on #hero (bottom horizon)
    const heroEl = document.getElementById('hero');
    if (heroEl && !window.location.hash) {
      heroEl.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
    }

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#02030a] text-foreground overflow-x-hidden">
      {/* Night sky gradient from deep cosmos (top) to midnight horizon (bottom) */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'linear-gradient(to bottom, #02030a 0%, #050819 40%, #090e29 78%, #0f1638 100%)',
        }}
      />

      {/* Interactive Starry Sky Canvas */}
      <StarrySky />

      {/* Top Navigation */}
      <Navigation />

      {/* Side Floor Elevator */}
      <FloorIndicator />

      {/* Main Content: Ordered from highest sky (top) down to horizon silhouette (bottom) */}
      <main className="relative z-10">
        <Contact />
        <Projects />
        <Technologies />
        <Hero />
      </main>
    </div>
  );
}

export default App;
