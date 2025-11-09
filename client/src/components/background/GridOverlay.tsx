interface GridOverlayProps {
  intensity: number;
  enableMotion: boolean;
}

export default function GridOverlay({ intensity, enableMotion }: GridOverlayProps) {

  const gridOpacity = intensity * 0.08;
  const glowOpacity = intensity * 0.15;

  return (
    <div className="absolute inset-0">
      <svg 
        className={`absolute inset-0 w-full h-full ${enableMotion ? 'animate-grid-drift' : ''}`}
        style={{ animationDuration: enableMotion ? '25s' : 'none' }}
      >
        <defs>
          {/* Grid pattern */}
          <pattern 
            id="grid" 
            width="60" 
            height="60" 
            patternUnits="userSpaceOnUse"
          >
            <path 
              d="M 60 0 L 0 0 0 60" 
              fill="none" 
              stroke={`rgba(0, 225, 255, ${gridOpacity})`}
              strokeWidth="1"
            />
          </pattern>
          
          {/* Hexagon pattern */}
          <pattern 
            id="hexGrid" 
            width="40" 
            height="35" 
            patternUnits="userSpaceOnUse"
          >
            <polygon 
              points="20,5 30,15 30,25 20,35 10,25 10,15" 
              fill="none" 
              stroke={`rgba(179, 101, 247, ${gridOpacity * 0.6})`}
              strokeWidth="0.5"
            />
          </pattern>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Radial mask for vignette effect */}
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0.2 }} />
          </radialGradient>
        </defs>
        
        {/* Main grid */}
        <rect 
          width="100%" 
          height="100%" 
          fill="url(#grid)" 
          mask="url(#vignetteMask)"
        />
        
        {/* Hex grid overlay */}
        <rect 
          width="100%" 
          height="100%" 
          fill="url(#hexGrid)" 
          mask="url(#vignetteMask)"
          className={enableMotion ? 'animate-grid-drift-slow' : ''}
          style={{ animationDuration: enableMotion ? '35s' : 'none' }}
        />
        
        {/* Glowing lines */}
        {Array.from({ length: 3 }, (_, i) => (
          <line
            key={i}
            x1={`${10 + i * 30}%`}
            y1="0%"
            x2={`${20 + i * 30}%`}
            y2="100%"
            stroke={`rgba(0, 255, 148, ${glowOpacity})`}
            strokeWidth="1"
            filter="url(#glow)"
            style={{
              animationDuration: enableMotion ? `${4 + i}s` : 'none',
              animationName: enableMotion ? 'gridPulse' : 'none',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out'
            }}
          />
        ))}
        
        {/* Vignette mask */}
        <defs>
          <mask id="vignetteMask">
            <rect width="100%" height="100%" fill="url(#vignette)" />
          </mask>
        </defs>
      </svg>
      
      <style>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}