import React, { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = '', glow = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage for tilt
    const xPct = x / rect.width;
    const yPct = y / rect.height;

    // Max rotation in degrees
    const maxRotate = 10;
    const rotateX = (0.5 - yPct) * maxRotate * 2; // Invert Y
    const rotateY = (xPct - 0.5) * maxRotate * 2;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
    setGlowPos({ x: xPct * 100, y: yPct * 100 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-200 ease-out transform-gpu preserve-3d relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ transform }}
    >
      {glow && (
        <div 
          className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none z-0 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.2), transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-10 h-full w-full preserve-3d">
        {children}
      </div>
    </div>
  );
};