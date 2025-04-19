'use client';

import React, { useState, useRef, MouseEvent, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MotionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glareIntensity?: number;
  rotationIntensity?: number;
  borderRadius?: string;
  glassEffect?: boolean;
  glowEffect?: boolean;
  bgGradient?: boolean;
}

export function MotionCard({
  children,
  className,
  glareIntensity = 0.2,
  rotationIntensity = 10,
  borderRadius = '20px',
  glassEffect = true,
  glowEffect = false,
  bgGradient = false,
  ...props
}: MotionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isMounted) return;

    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Calculate rotation values between -1 and 1
    const rotateY = -((x / width) - 0.5) * 2;
    const rotateX = ((y / height) - 0.5) * 2;
    
    // Apply rotation based on intensity
    setRotation({
      x: rotateX * rotationIntensity,
      y: rotateY * rotationIntensity,
    });

    // Set glare position (0-100%)
    setGlarePosition({
      x: (x / width) * 100,
      y: (y / height) * 100,
    });
  };

  const handleMouseEnter = () => {
    if (!isMounted) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isMounted) return;
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    setGlarePosition({ x: 50, y: 50 });
  };

  // 基础样式，用于服务器端渲染和客户端初始渲染
  const baseClassName = cn(
    'relative overflow-hidden',
    glassEffect && 'bg-white/5 backdrop-blur-lg border border-white/10',
    glowEffect && 'shadow-lg shadow-purple-500/10',
    bgGradient && 'bg-gradient-to-tr from-purple-900/20 to-blue-900/20',
    className
  );

  // 服务器端渲染时只返回基础样式
  if (!isMounted) {
    return (
      <div
        ref={cardRef}
        className={baseClassName}
        style={{ borderRadius }}
        {...props}
      >
        {children}
      </div>
    );
  }

  // 客户端渲染时添加交互效果
  return (
    <div
      ref={cardRef}
      className={cn(
        baseClassName,
        'transition-all duration-200',
        isHovered && glowEffect && 'shadow-xl shadow-purple-500/20'
      )}
      style={{
        borderRadius,
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: 'all 0.1s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
      {isHovered && (
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glareIntensity}) 0%, rgba(255,255,255,0) 50%)`,
          }}
        />
      )}
    </div>
  );
} 