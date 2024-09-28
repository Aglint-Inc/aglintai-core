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
  emptyStateMessage?: string;
  type?: 'graph' | 'info';
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
      className={`w-full ${type === 'graph' ? 'bg-background' : ''}`}
      onMouseEnter={() => setIsHover(true)}
      onFocus={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onBlur={() => setIsHover(false)}
    >
      <CardHeader>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <div className='flex items-center space-x-2'>
              <h3 className='text-lg font-semibold'>{title}</h3>
              {titleAddon && <span>{titleAddon}</span>}
            </div>
            <div className='mt-1 flex items-center space-x-2'>
              <p className='text-sm text-muted-foreground'>{description}</p>
              {descriptionAddon && <span>{descriptionAddon}</span>}
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
      <CardContent>
        {isLoading ? (
          <div className='flex h-32 items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
          </div>
        ) : emptyStateHeading || emptyStateMessage ? (
          <div className='flex h-32 flex-col items-center justify-center text-center'>
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
