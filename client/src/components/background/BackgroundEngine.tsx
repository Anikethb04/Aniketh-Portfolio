import { useEffect, useState } from "react";
import BaseGradient from "./BaseGradient";
import GridOverlay from "./GridOverlay";
import ParticlesCanvas from "./ParticlesCanvas";
import AccentShapes from "./AccentShapes";
import { useBackgroundControl } from "./BackgroundContext";

export default function BackgroundEngine() {
  const { mode, intensity, enableParticles, enableMotion } = useBackgroundControl();
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReduced(mediaQuery.matches);
    
    const handleChange = () => setIsReduced(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const shouldShowLayer = (layer: 'particles' | 'shapes' | 'grid') => {
    if (mode === 'minimal') return false;
    if (layer === 'particles' && !enableParticles) return false;
    if (layer === 'shapes' && mode === 'standard') return false;
    return true;
  };

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -10 }}
      data-testid="background-engine"
    >
      {/* Base gradient layer - always visible */}
      <BaseGradient intensity={intensity} enableMotion={enableMotion && !isReduced} />
      
      {/* Grid overlay layer */}
      {shouldShowLayer('grid') && (
        <GridOverlay intensity={intensity} enableMotion={enableMotion && !isReduced} />
      )}
      
      {/* Particles canvas layer */}
      {shouldShowLayer('particles') && (
        <ParticlesCanvas 
          intensity={intensity} 
          enableMotion={enableMotion && !isReduced}
          mode={mode}
        />
      )}
      
      {/* Accent shapes layer - only in max mode */}
      {shouldShowLayer('shapes') && mode === 'max' && (
        <AccentShapes intensity={intensity} enableMotion={enableMotion && !isReduced} />
      )}
    </div>
  );
}