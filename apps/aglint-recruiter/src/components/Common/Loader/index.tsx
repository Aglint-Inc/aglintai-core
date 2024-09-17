import { cn } from '@lib/utils';
import { Loader as LoaderIcon, Loader2 } from 'lucide-react';
import React from 'react';

interface LoaderProps {
  variant?: 'inline' | 'full';
  size?: number;
  className?: string;
}

export function Loader({ variant = 'inline', size, className }: LoaderProps) {
  if (variant === 'inline') {
    return (
      <div className={cn('animate-spin', className)}>
        <LoaderIcon size={size ?? 16} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center w-full h-full',
        className,
      )}
    >
      <Loader2 className='animate-spin' size={size ?? 24} />
    </div>
  );
}

// Simple loader
{
  /* <LoaderComponent /> */
}

// Full loader with custom size
{
  /* <LoaderComponent variant="full" size={32} /> */
}

// Loader with additional classes
{
  /* <LoaderComponent className="text-blue-500" /> */
}
