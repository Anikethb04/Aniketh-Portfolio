import { useEffect, useRef, useState } from 'react';

interface ParticlesCanvasProps {
  intensity: number;
  enableMotion: boolean;
  mode: 'minimal' | 'standard' | 'max';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function ParticlesCanvas({ intensity, enableMotion, mode }: ParticlesCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(true);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Store CSS dimensions for particle simulation
    let cssWidth = 0;
    let cssHeight = 0;

    // Set canvas size with devicePixelRatio support
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      cssWidth = rect.width;
      cssHeight = rect.height;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system setup
    const colors = [
      'rgba(0, 225, 255, 1)', // neon blue
      'rgba(179, 101, 247, 1)', // neon purple
      'rgba(0, 255, 148, 1)', // neon green
      'rgba(255, 0, 122, 1)', // neon pink
      'rgba(255, 221, 0, 1)' // neon yellow
    ];

    const particles: Particle[] = [];
    const maxParticles = mode === 'minimal' ? 30 : mode === 'standard' ? 60 : 100;
    const particleSpeed = intensity * 0.5;

    // Create particles
    const createParticle = (): Particle => ({
      x: Math.random() * cssWidth,
      y: cssHeight + 50,
      vx: (Math.random() - 0.5) * particleSpeed,
      vy: -Math.random() * particleSpeed - 0.5,
      size: Math.random() * 3 + 1,
      alpha: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 300 + 200
    });

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    // Animation loop with better performance control
    const animate = () => {
      if (!enableMotion || !isVisibleRef.current) {
        // Don't schedule next frame if motion is disabled or tab is hidden
        return;
      }

      ctx.clearRect(0, 0, cssWidth, cssHeight);
      ctx.globalCompositeOperation = 'lighter';

      particles.forEach((particle, index) => {
        // Update particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Fade in/out effect
        if (particle.life < 60) {
          particle.alpha = particle.life / 60;
        } else if (particle.life > particle.maxLife - 60) {
          particle.alpha = (particle.maxLife - particle.life) / 60;
        } else {
          particle.alpha = intensity * 0.8;
        }

        // Add subtle drift
        particle.vx += (Math.random() - 0.5) * 0.02;
        particle.vy += (Math.random() - 0.5) * 0.02;

        // Draw particle
        const alpha = Math.max(0, particle.alpha);
        ctx.save();
        ctx.globalAlpha = alpha;
        
        // Glow effect
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = particle.size * 4;
        
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Extra glow for larger particles
        if (particle.size > 2) {
          ctx.globalAlpha = alpha * 0.3;
          ctx.shadowBlur = particle.size * 8;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();

        // Reset particle if it's dead or out of bounds
        if (particle.life >= particle.maxLife || 
            particle.x < -50 || particle.x > cssWidth + 50 || 
            particle.y < -50) {
          particles[index] = createParticle();
        }
      });

      // Draw connections between nearby particles
      if (mode === 'max') {
        ctx.globalCompositeOperation = 'lighter';
        particles.forEach((particle1, i) => {
          particles.slice(i + 1).forEach(particle2 => {
            const distance = Math.sqrt(
              (particle1.x - particle2.x) ** 2 + 
              (particle1.y - particle2.y) ** 2
            );
            
            if (distance < 100) {
              const alpha = (1 - distance / 100) * intensity * 0.3;
              ctx.globalAlpha = alpha;
              ctx.strokeStyle = 'rgba(0, 225, 255, 1)';
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle1.x, particle1.y);
              ctx.lineTo(particle2.x, particle2.y);
              ctx.stroke();
            }
          });
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation only if motion is enabled
    if (enableMotion && isVisible) {
      animate();
    }

    // Visibility API to pause animation when tab is not visible
    const handleVisibilityChange = () => {
      const newVisibility = !document.hidden;
      isVisibleRef.current = newVisibility;
      setIsVisible(newVisibility);
      
      // Restart animation when becoming visible
      if (newVisibility && enableMotion) {
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity, enableMotion, mode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}