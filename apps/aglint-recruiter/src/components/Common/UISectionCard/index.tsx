import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';

interface InfoCardProps {
  title: string;
  description?: string;
  titleAddon?: React.ReactNode;
  descriptionAddon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  isLoading?: boolean;
  emptyStateIcon?: React.ReactNode;
  emptyStateHeading?: string;
  isHoverEffect?: boolean;
  emptyStateMessage?: string | React.ReactNode;
  type?: 'graph' | 'info' | 'compact';
}

export default function UISectionCard({
  title,
  description,
  titleAddon,
  descriptionAddon,
  action,
  children,
  isHoverEffect = true,
  isLoading = false,
  emptyStateIcon,
  emptyStateHeading,
  emptyStateMessage,
  type = 'info',
}: InfoCardProps) {
  const [isHover, setIsHover] = useState(false);
  return (
    <Card
      className={`w-full ${type === 'graph' ? 'bg-background' : ''} ${type === 'compact' ? 'border-0 shadow-none' : ''}`}
      onMouseEnter={() => setIsHover(true)}
      onFocus={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onBlur={() => setIsHover(false)}
    >
      <CardHeader className={`${type === 'compact' ? 'p-0' : ''}`}>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <div className='flex items-center space-x-2'>
              <h3
                className={`${type === 'compact' ? 'text-md font-medium' : 'text-lg font-semibold'}`}
              >
                {title}
              </h3>
              {titleAddon && <span>{titleAddon}</span>}
            </div>
            <div className='mt-1 flex items-center space-x-2'>
              <p className='max-w-4xl text-sm text-muted-foreground'>
                {description}
              </p>
              {descriptionAddon && (
                <span className='max-w-4xl'>{descriptionAddon}</span>
              )}
            </div>
          </div>
          {action && (
            <div
              className={`ml-4 flex-shrink-0 ${isHover || !isHoverEffect ? 'opacity-100' : 'opacity-0'} transition`}
            >
              {action}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className={`${type === 'compact' ? 'mt-2 p-0' : ''}`}>
        {isLoading ? (
          <div className='flex h-32 items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
          </div>
        ) : emptyStateHeading || emptyStateMessage ? (
          <div className='flex-col items-center justify-center text-center'>
            {emptyStateIcon && <div className='mb-2'>{emptyStateIcon}</div>}
            {emptyStateHeading && (
              <h4 className='mb-1 text-lg font-semibold'>
                {emptyStateHeading}
              </h4>
            )}
            {emptyStateMessage && (
              <p className='text-sm text-muted-foreground'>
                {emptyStateMessage}
              </p>
            )}
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}
