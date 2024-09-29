import React from 'react';

interface GlobalEmptyProps {
  header?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  width?: 'narrow' | 'wide';
}

export default function GlobalEmpty({
  header,
  description,
  icon,
  primaryAction,
  secondaryAction,
  width = 'wide',
}: GlobalEmptyProps) {
  if (!header && !description && !icon && !primaryAction && !secondaryAction) {
    return null;
  }

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${width === 'narrow' ? 'max-w-md' : 'max-w-2xl'} mx-auto`}
    >
      {icon && <div className='mb-4 rounded-full bg-muted p-4'>{icon}</div>}
      {header && <h3 className='mb-2 text-lg font-semibold'>{header}</h3>}
      {description && (
        <p className='mb-6 max-w-md text-sm text-muted-foreground'>
          {description}
        </p>
      )}
      {(primaryAction || secondaryAction) && (
        <div
          className='flex flex-col gap-3 sm:flex-row'
          aria-label='Action buttons'
        >
          {secondaryAction}
          {primaryAction}
        </div>
      )}
    </div>
  );
}
