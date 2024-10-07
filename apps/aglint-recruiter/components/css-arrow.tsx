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

  const positionMap = {
    up: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    down: 'bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2',
    left: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    right: 'right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2',
  };

  return (
    <div className={`z-5 relative ${sizeMap[size]}`}>
      <div
        className={`absolute ${positionMap[direction]} h-full w-full ${arrowStyles[direction]} ${backgroundColor} ${borderColor} ${rotationMap[direction]} rounded-[0_${cornerRadius}px_0_0] `}
      ></div>
    </div>
  );
}
