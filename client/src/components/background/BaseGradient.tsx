interface BaseGradientProps {
  intensity: number;
  enableMotion: boolean;
}

export default function BaseGradient({ intensity, enableMotion }: BaseGradientProps) {

  return (
    <div className="absolute inset-0">
      {/* Primary gradient layer */}
      <div 
        className={`absolute inset-0 ${enableMotion ? 'animate-spin-slow' : ''}`}
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, 
              hsla(195, 100%, 15%, ${intensity * 0.4}) 0%, 
              transparent 60%),
            radial-gradient(ellipse at 80% 80%, 
              hsla(280, 85%, 15%, ${intensity * 0.4}) 0%, 
              transparent 60%),
            radial-gradient(ellipse at 50% 50%, 
              hsla(145, 100%, 10%, ${intensity * 0.2}) 0%, 
              transparent 70%)
          `,
          animationDuration: enableMotion ? '120s' : 'none'
        }}
      />
      
      {/* Secondary animated gradient */}
      <div 
        className={`absolute inset-0 ${enableMotion ? 'animate-pulse-scale' : ''}`}
        style={{
          background: `
            conic-gradient(from 0deg at 30% 70%, 
              transparent 0deg,
              hsla(320, 100%, 20%, ${intensity * 0.15}) 60deg,
              transparent 120deg,
              hsla(50, 100%, 20%, ${intensity * 0.1}) 180deg,
              transparent 240deg)
          `,
          mixBlendMode: 'multiply',
          animationDuration: enableMotion ? '8s' : 'none'
        }}
      />
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
            <svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'>
              <filter id='noise'>
                <feTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/>
                <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/>
              </filter>
              <rect width='100%' height='100%' filter='url(#noise)' opacity='0.4'/>
            </svg>
          `)}")`,
          backgroundSize: '256px 256px',
          animation: enableMotion ? 'float-noise 15s ease-in-out infinite' : 'none'
        }}
      />
    </div>
  );
}