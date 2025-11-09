import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    let scrollTimeout: number;
    const sections = ['hero', 'about', 'skills', 'projects', 'resume', 'contact'];
    let sectionOffsets: { [key: string]: { top: number; bottom: number } } = {};

    // Pre-calculate section offsets
    const calculateOffsets = () => {
      sectionOffsets = sections.reduce((acc, section) => {
        const element = document.getElementById(section);
        if (element) {
          acc[section] = {
            top: element.offsetTop,
            bottom: element.offsetTop + element.offsetHeight
          };
        }
        return acc;
      }, {} as { [key: string]: { top: number; bottom: number } });
    };

    // Throttled scroll handler
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          
          // Update isScrolled state
          setIsScrolled(scrollPosition > 50);
          
          // Update active section using pre-calculated offsets
          const scrollWithOffset = scrollPosition + 200;
          
          for (const section of sections) {
            const offsets = sectionOffsets[section];
            if (offsets && scrollWithOffset >= offsets.top && scrollWithOffset < offsets.bottom) {
              setActiveSection(section);
              break;
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Debounced resize handler
    const handleResize = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(calculateOffsets, 100);
    };

    // Initial calculation
    calculateOffsets();

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home', icon: 'fas fa-home' },
    { id: 'about', label: 'About', icon: 'fas fa-user' },
    { id: 'skills', label: 'Skills', icon: 'fas fa-code' },
    { id: 'projects', label: 'Projects', icon: 'fas fa-folder' },
    { id: 'resume', label: 'Resume', icon: 'fas fa-file-alt' },
    { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' }
  ];

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 w-full z-[1000] glass border-b border-primary/20 shadow-lg shadow-primary/10 backdrop-blur-xl bg-background/80" 
        style={{ 
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          perspective: 1000,
          willChange: 'transform'
        }}
        data-testid="navigation"
      >
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <div className="flex justify-between items-center">
            {/* Enhanced logo with performance optimizations */}
            <div className="flex items-center gap-3 will-change-transform">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg transform-gpu">
                <span className="text-white font-orbitron font-bold text-lg" data-testid="logo">BA</span>
              </div>
            </div>
            
            {/* Desktop navigation - centered on hero, right-aligned otherwise */}
            <div className={`hidden lg:flex items-center space-x-1 transition-transform duration-300 ${
              activeSection === 'hero' 
                ? 'absolute left-1/2 -translate-x-1/2 transform-gpu' 
                : ''
            }`}>
              <ThemeToggle />
              {navItems.map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  className={`nav-link flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform-gpu ${
                    activeSection === item.id 
                      ? 'bg-primary/20 text-primary border border-primary/30' 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                  data-testid={`link-${item.id}`}
                >
                  <i className={item.icon}></i>
                  {item.label}
                </a>
              ))}
            </div>
            
            {/* Mobile menu button */}
            <button 
              className={`lg:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 transform-gpu ${
                isMenuOpen 
                  ? 'bg-primary text-primary-foreground' 
                  : 'glass border border-primary/30 text-primary hover:bg-primary/10'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-menu-toggle"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}></i>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Enhanced Mobile Menu with Performance Optimizations */}
      <div
        className={`fixed top-24 left-0 right-0 bottom-0 z-40 lg:hidden transform-gpu will-change-opacity will-change-transform ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        style={{
          transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Backdrop with optimized blur */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-[8px]"
          onClick={() => setIsMenuOpen(false)}
          style={{
            transform: 'translate3d(0,0,0)',
            backfaceVisibility: 'hidden',
            perspective: '1000px'
          }}
        ></div>
        
        {/* Menu content with hardware acceleration */}
        <div 
          className={`absolute top-0 right-0 bottom-0 w-80 max-w-[80vw] glass border-l border-primary/20 transform-gpu ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform',
            transform: 'translate3d(0,0,0)',
            backfaceVisibility: 'hidden',
            perspective: '1000px'
          }}
          data-testid="mobile-menu"
        >
          <div className="p-6">
            {/* Mobile menu header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-orbitron font-bold text-xl">A</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">Belpu Aniketh</div>
                  <div className="text-sm text-muted-foreground">Portfolio Menu</div>
                </div>
              </div>
              <ThemeToggle />
            </div>
            
            {/* Mobile navigation links */}
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  className={`nav-link flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'bg-primary/20 text-primary border border-primary/30' 
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activeSection === item.id 
                      ? 'bg-primary/30' 
                      : 'bg-muted/20'
                  }`}>
                    <i className={item.icon}></i>
                  </div>
                  <div>
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-xs opacity-60">
                      {item.id === 'hero' && 'Welcome & Introduction'}
                      {item.id === 'about' && 'My Story & Journey'}
                      {item.id === 'skills' && 'Technical Expertise'}
                      {item.id === 'projects' && 'Featured Work'}
                      {item.id === 'resume' && 'Experience & Education'}
                      {item.id === 'contact' && 'Let\'s Connect'}
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Mobile social links */}
            <div className="mt-8 pt-6 border-t border-primary/20">
              <div className="text-sm font-semibold text-foreground mb-4">Connect with me</div>
              <div className="flex gap-3">
                <a href="#" className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
