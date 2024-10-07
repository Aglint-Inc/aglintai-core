import { cn } from '@lib/utils';
import { type LucideIcon } from 'lucide-react';
import React from 'react';

interface EmptyStateProps {
  variant?: 'default' | 'inline';
  icon?: LucideIcon;
  header?: string;
  description?: React.ReactNode;
  primarySlot?: React.ReactNode;
  secondarySlot?: React.ReactNode;
  width?: 'narrow' | 'wide';
  className?: string;
}

export function EmptyState({
  variant = 'default',
  icon: Icon,
  header,
  description,
  primarySlot,
  secondarySlot,
  width = 'wide',
  className,
}: EmptyStateProps) {
  const content = (
    <>
      {Icon && (
        <div
          className={cn(
            'rounded-full bg-muted',
            variant === 'inline' ? 'p-1' : 'mb-4 p-4',
          )}
        >
          <Icon
            className={cn(
              'text-muted-foreground/70',
              variant === 'inline' ? 'h-4 w-4' : 'h-8 w-8',
            )}
            aria-hidden='true'
          />
        </div>
      )}
      {header && (
        <h3
          className={cn(
            'font-semibold',
            variant === 'inline' ? 'text-sm' : 'mb-2 text-lg',
          )}
        >
          {header}
        </h3>
      )}
      {description && (
        <p
          className={cn(
            'text-muted-foreground',
            variant === 'inline' ? 'text-sm' : 'mb-6 max-w-md text-sm',
          )}
        >
          {description}
        </p>
      )}
      {(primarySlot || secondarySlot) && (
        <div
          className={cn(
            variant === 'inline'
              ? 'flex items-center space-x-3'
              : 'flex flex-col gap-3 sm:flex-row',
          )}
          aria-label='Action buttons'
        >
          {secondarySlot}
          {primarySlot}
        </div>
      )}
    </>
  );

  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center space-x-3 py-2', className)}>
        {content}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center',
        width === 'narrow' ? 'max-w-md' : 'max-w-2xl',
        'mx-auto',
        className,
      )}
    >
      {content}
    </div>
  );
}
