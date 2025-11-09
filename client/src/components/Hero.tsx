import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(0);
  const titles = [
    "Java Full-Stack Developer", 
    "AI Enthusiast",
    "Web Innovator",
    "Problem Solver"
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen pt-24 md:pt-28 pb-8 bg-gradient-to-br from-background via-card to-background relative overflow-hidden" data-testid="hero-section">
      {/* Dynamic background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-pulse"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 border border-primary/30 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border border-secondary/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-accent/20 transform rotate-45 animate-spin"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 border-2 border-primary/20 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main name title */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-orbitron font-black mb-8 sm:mb-16 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent neon-text leading-tight" data-testid="hero-title">Belpu Aniketh</h1>
          </div>

          
          {/* Dynamic rotating subtitle */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="h-16 mb-8 flex items-center justify-center">
              <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent transition-all duration-500" data-testid="hero-subtitle">
                {titles[currentTitle]}
              </p>
            </div>
          </div>
          {/* Enhanced action buttons */}
          <div className={`flex flex-col md:flex-row gap-6 justify-center items-center mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button 
              className="btn-primary group relative overflow-hidden"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-view-work"
            >
              <span className="relative z-10 flex items-center gap-2">
                <i className="fas fa-rocket"></i>
                View My Work
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </span>
            </button>
            <button 
              className="btn-secondary group relative overflow-hidden"
              onClick={() => document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-download-resume"
            >
              <span className="relative z-10 flex items-center gap-2">
                <i className="fas fa-download"></i>
                Download Resume
                <i className="fas fa-file-pdf group-hover:scale-110 transition-transform"></i>
              </span>
            </button>
          </div>
          
          {/* Social links with animated icons */}
          <div className={`flex justify-center gap-6 mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a href="https://github.com/Anikethb04" className="w-12 h-12 glass rounded-full flex items-center justify-center text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-300 group">
              <i className="fab fa-github text-xl group-hover:scale-110 transition-transform"></i>
            </a>
            <a href="https://www.linkedin.com/in/aniketh-b-a692602a5/" className="w-12 h-12 glass rounded-full flex items-center justify-center text-secondary hover:text-secondary-foreground hover:bg-secondary transition-all duration-300 group">
              <i className="fab fa-linkedin text-xl group-hover:scale-110 transition-transform"></i>
            </a>
            <a href="anikethb04@gmail.com" className="w-12 h-12 glass rounded-full flex items-center justify-center text-accent hover:text-accent-foreground hover:bg-accent transition-all duration-300 group">
              <i className="fas fa-envelope text-xl group-hover:scale-110 transition-transform"></i>
            </a>
          </div>
          
          {/* Enhanced 3D Code Blocks with staggered animations */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16" data-testid="code-blocks">
            {[
              { keyword: "const", code: "passion = true;", color: "accent", delay: "delay-[900ms]" },
              { keyword: "function", code: "solve(problem)", color: "secondary", delay: "delay-[1000ms]" },
              { keyword: "while", code: "(learning)", color: "primary", delay: "delay-[1100ms]" },
              { keyword: "return", code: "innovation;", color: "accent", delay: "delay-[1200ms]" }
            ].map((block, index) => (
              <div 
                key={index}
                className={`glass p-6 rounded-xl card-3d transition-all duration-1000 ${block.delay} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} hover:scale-105 group`}
                data-testid={`code-block-${index + 1}`}
              >
                <div className="relative">
                  <div className={`text-${block.color} font-mono text-lg font-bold mb-2 group-hover:scale-110 transition-transform`}>
                    {block.keyword}
                  </div>
                  <div className="text-foreground font-mono text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                    {block.code}
                  </div>
                  <div className={`absolute -top-1 -right-1 w-2 h-2 bg-${block.color} rounded-full animate-ping opacity-60`}></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll indicator */}
          <div className={`mt-20 flex flex-col items-center transition-all duration-1000 delay-[1300ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-muted-foreground text-sm mb-4">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Interactive background elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card to-transparent pointer-events-none"></div>
    </section>
  );
}
