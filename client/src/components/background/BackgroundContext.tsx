import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type BackgroundMode = 'minimal' | 'standard' | 'max';

interface BackgroundSettings {
  mode: BackgroundMode;
  intensity: number; // 0-1
  enableParticles: boolean;
  enableMotion: boolean;
  colorScheme: 'neon' | 'warm' | 'cool';
}

interface BackgroundContextType extends BackgroundSettings {
  setMode: (mode: BackgroundMode) => void;
  setIntensity: (intensity: number) => void;
  setEnableParticles: (enable: boolean) => void;
  setEnableMotion: (enable: boolean) => void;
  setColorScheme: (scheme: 'neon' | 'warm' | 'cool') => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

interface BackgroundProviderProps {
  children: ReactNode;
}

export function BackgroundProvider({ children }: BackgroundProviderProps) {
  // Compute initial settings synchronously to avoid a heavy first paint on mobile/low-end devices
  const getInitialSettings = (): BackgroundSettings => {
    try {
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isLowEnd = typeof navigator !== 'undefined' && 'deviceMemory' in navigator && (navigator as any).deviceMemory < 4;
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (isMobile || isLowEnd) {
        return {
          mode: 'minimal',
          intensity: 0.4,
          enableParticles: false,
          enableMotion: !prefersReducedMotion,
          colorScheme: 'neon'
        };
      }

      return {
        mode: 'standard',
        intensity: 0.7,
        enableParticles: true,
        enableMotion: !prefersReducedMotion,
        colorScheme: 'neon'
      };
    } catch (e) {
      // Fallback safe defaults
      return {
        mode: 'standard',
        intensity: 0.7,
        enableParticles: true,
        enableMotion: true,
        colorScheme: 'neon'
      };
    }
  };

  const [settings, setSettings] = useState<BackgroundSettings>(getInitialSettings);

  // Auto-detect device capabilities and adjust defaults
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = 'deviceMemory' in navigator && (navigator as any).deviceMemory < 4;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || isLowEnd) {
      setSettings(prev => ({
        ...prev,
        mode: 'minimal',
        intensity: 0.4,
        enableParticles: false
      }));
    }

    if (prefersReducedMotion) {
      setSettings(prev => ({
        ...prev,
        enableMotion: false
      }));
    }
  }, []);

  const contextValue: BackgroundContextType = {
    ...settings,
    setMode: (mode) => setSettings(prev => ({ ...prev, mode })),
    setIntensity: (intensity) => setSettings(prev => ({ ...prev, intensity })),
    setEnableParticles: (enableParticles) => setSettings(prev => ({ ...prev, enableParticles })),
    setEnableMotion: (enableMotion) => setSettings(prev => ({ ...prev, enableMotion })),
    setColorScheme: (colorScheme) => setSettings(prev => ({ ...prev, colorScheme })),
  };

  return (
    <BackgroundContext.Provider value={contextValue}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackgroundControl() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackgroundControl must be used within a BackgroundProvider');
  }
  return context;
}