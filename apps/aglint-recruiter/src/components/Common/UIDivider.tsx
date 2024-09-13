import { cn } from '@lib/utils';
import React from 'react';

interface DividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'fullWidth' | 'inset' | 'middle';
  flexItem?: boolean;
  light?: boolean;
}

export const UIDivider: React.FC<DividerProps> = ({
  className,
  orientation = 'horizontal',
  variant = 'fullWidth',
  flexItem = false,
  light = false,
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  const orientationClasses =
    orientation === 'vertical' ? 'h-auto w-px' : 'h-px w-full';
  const variantClasses = {
    fullWidth: '',
    inset: 'mx-4',
    middle: 'mx-2',
  };
  const flexItemClass = flexItem ? 'flex-shrink-0' : '';
  const lightClass = light ? 'opacity-50' : '';

  return (
    <hr
      className={cn(
        baseClasses,
        orientationClasses,
        variantClasses[variant],
        flexItemClass,
        lightClass,
        className,
      )}
      role={orientation === 'vertical' ? 'separator' : undefined}
    />
  );
};
