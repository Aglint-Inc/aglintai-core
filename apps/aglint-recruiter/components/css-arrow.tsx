import React from 'react';

interface ArrowProps {
  size?: 'sm' | 'md' | 'lg';
  direction?: 'up' | 'down' | 'left' | 'right';
  borderColor?: string;
  backgroundColor?: string;
  cornerRadius?: number;
}

export default function CSSArrow({
  size = 'md',
  direction = 'up',
  borderColor = 'border-gray-300',
  backgroundColor = 'bg-white',
  cornerRadius = 4,
}: ArrowProps) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const arrowStyles = {
    up: 'border-r border-b',
    down: 'border-l border-t',
    left: 'border-t border-r',
    right: 'border-b border-l',
  };

  const rotationMap = {
    up: '-rotate-45',
    down: 'rotate-135',
    left: '-rotate-45',
    right: 'rotate-135',
  };

  return (
    <div className={`relative ${sizeMap[size]}`}>
      <div
        className={`absolute z-40 h-full w-full ${arrowStyles[direction]} ${backgroundColor} ${borderColor} ${rotationMap[direction]} rounded-[0_${cornerRadius}px_0_0] `}
      ></div>
      <div
        className={`absolute z-50 h-1/2 w-1/2 scale-[4] bg-red-500/10`}
      ></div>
    </div>
  );
}
