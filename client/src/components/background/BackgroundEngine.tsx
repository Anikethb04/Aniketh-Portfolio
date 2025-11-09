import { useEffect, useState } from "react";
import BaseGradient from "./BaseGradient";
import GridOverlay from "./GridOverlay";
import ParticlesCanvas from "./ParticlesCanvas";
import AccentShapes from "./AccentShapes";
import { useBackgroundControl } from "./BackgroundContext";

export default function BackgroundEngine() {
  const { mode, intensity, enableParticles, enableMotion } = useBackgroundControl();
  const [isReduced, setIsReduced] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReduced(mediaQuery.matches);
    
    const handleChange = () => setIsReduced(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    // small screen detection to disable heavy layers on mobile
    const mqSmall = window.matchMedia('(max-width: 767px)');
    setIsSmallScreen(mqSmall.matches);
    const handleSmall = () => setIsSmallScreen(mqSmall.matches);
    mqSmall.addEventListener('change', handleSmall);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // remove small screen listener in a separate effect to avoid mixing returns
  useEffect(() => {
    const mqSmall = window.matchMedia('(max-width: 767px)');
    const handleSmall = () => setIsSmallScreen(mqSmall.matches);
    mqSmall.addEventListener('change', handleSmall);
    return () => mqSmall.removeEventListener('change', handleSmall);
  }, []);

  const shouldShowLayer = (layer: 'particles' | 'shapes' | 'grid') => {
    if (mode === 'minimal') return false;
    // Avoid heavy visual layers on small screens even if enabled in settings
    if (isSmallScreen) return false;
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