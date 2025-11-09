import { useEffect, useState } from 'react';

interface AccentShapesProps {
  intensity: number;
  enableMotion: boolean;
}

interface Shape {
  id: number;
  type: 'triangle' | 'hexagon' | 'circle' | 'square';
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  opacity: number;
  animationDelay: number;
}

export default function AccentShapes({ intensity, enableMotion }: AccentShapesProps) {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    // Generate accent shapes
    const colors = [
      'rgba(0, 225, 255, 0.1)', // neon blue
      'rgba(179, 101, 247, 0.1)', // neon purple
      'rgba(0, 255, 148, 0.1)', // neon green
      'rgba(255, 0, 122, 0.1)', // neon pink
    ];

    const shapeTypes: Shape['type'][] = ['triangle', 'hexagon', 'circle', 'square'];
    const newShapes: Shape[] = [];

    // Create 8-12 accent shapes
    for (let i = 0; i < 10; i++) {
      newShapes.push({
        id: i,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 60 + 40,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: (Math.random() * 0.3 + 0.1) * intensity,
        animationDelay: Math.random() * 10
      });
    }

    setShapes(newShapes);
  }, [intensity]);

  const getShapeElement = (shape: Shape) => {
    const baseTransform = `translate(${shape.x}vw, ${shape.y}vh) rotate(${shape.rotation}deg)`;

    const style = {
      position: 'absolute' as const,
      transform: baseTransform,
      transformOrigin: 'center',
      opacity: shape.opacity,
      filter: `blur(${2 - intensity}px)`,
      animation: enableMotion ? `float-shape ${8 + shape.animationDelay}s ease-in-out infinite` : 'none',
      animationDelay: `${shape.animationDelay}s`
    };

    switch (shape.type) {
      case 'triangle':
        return (
          <div
            key={shape.id}
            style={{
              ...style,
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
            }}
          />
        );

      case 'hexagon':
        return (
          <div
            key={shape.id}
            style={{
              ...style,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              background: shape.color,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          />
        );

      case 'circle':
        return (
          <div
            key={shape.id}
            style={{
              ...style,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              background: `linear-gradient(45deg, ${shape.color}, transparent)`,
              borderRadius: '50%',
              border: `2px solid ${shape.color}`,
            }}
          />
        );

      case 'square':
        return (
          <div
            key={shape.id}
            style={{
              ...style,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              background: `linear-gradient(45deg, ${shape.color}, transparent)`,
              border: `1px solid ${shape.color}`,
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {shapes.map(shape => getShapeElement(shape))}
      
      {/* Additional floating elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={`float-${i}`}
            className={`absolute ${enableMotion ? 'animate-float-dot' : ''}`}
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
              width: '2px',
              height: '2px',
              background: 'rgba(0, 225, 255, 0.6)',
              borderRadius: '50%',
              boxShadow: '0 0 10px rgba(0, 225, 255, 0.8)',
              opacity: intensity * 0.8,
              animationDelay: `${i * 0.5}s`,
              animationDuration: enableMotion ? `${6 + i}s` : 'none'
            }}
          />
        ))}
      </div>
    </div>
  );
}