import {
  Alert,
  AlertDescription,
  AlertTitle,
  type alertVariants,
} from '@components/ui/alert';
import { cn } from '@lib/utils';
import { type VariantProps } from 'class-variance-authority';
import * as Icons from 'lucide-react';
import React from 'react';

interface UIAlertProps {
  color?: VariantProps<typeof alertVariants>['variant'];
  title?: React.ReactNode;
  description?: React.ReactNode;
  iconName?: keyof typeof Icons;
  actions?: React.ReactNode;
  notes?: React.ReactNode;
  className?: string;
  type?: 'large' | 'small' | 'inline';
}

export function UIAlert({
  color = 'default',
  title,
  description,
  iconName = 'Calendar',
  actions,
  notes,
  className,
  type = 'large',
}: UIAlertProps) {
  const IconComponent = iconName
    ? (Icons[iconName] as React.ElementType)
    : null;

  const alertClass = cn(
    'flex items-start',
    'flex-col w-full',
    type === 'inline' ? 'px-2 py-1' : type === 'small' ? 'p-3' : 'p-4',
    className,
  );

  return (
    <Alert variant={color} className={alertClass}>
      {type === 'large' ? (
        <div className='flex w-full flex-col'>
          <div
            className={
              'flex w-full flex-row items-center justify-between gap-2'
            }
          >
            <div className={'flex flex-row gap-2'}>
              <div className='p-1'>
                {IconComponent && <IconComponent size={32} className='mr-2' />}
              </div>
              <div className='flex flex-col justify-center'>
                {title && <AlertTitle>{title}</AlertTitle>}
                {description && (
                  <AlertDescription>{description}</AlertDescription>
                )}
              </div>
            </div>
            {actions && <div className='flex gap-2'>{actions}</div>}
          </div>
          {notes && (
            <div className='mt-4 pl-2'>
              <div className={'flex flex-row items-center gap-2'}>
                <Icons.NotebookPen
                  size={16}
                  className='text-muted-foreground'
                />
                <p>Additional Note</p>
              </div>
              <AlertDescription>{notes}</AlertDescription>
            </div>
          )}
        </div>
      ) : type === 'inline' ? (
        <div
          className={'flex w-full flex-row items-center justify-between gap-2'}
        >
          <div className={'flex flex-row gap-2'}>
            {IconComponent && <IconComponent size={16} />}
            <div className='flex flex-col'>
              {title && <AlertTitle>{title}</AlertTitle>}
            </div>
          </div>
          {actions && <div className='flex gap-2'>{actions}</div>}
        </div>
      ) : (
        <div className={'flex w-full flex-col gap-1'}>
          <div className={'flex flex-row gap-2'}>
            {IconComponent && <IconComponent size={16} />}
            <div className='flex flex-col'>
              {title && <AlertTitle>{title}</AlertTitle>}
            </div>
          </div>
          {description && (
            <AlertDescription className='text-sm'>
              {description}
            </AlertDescription>
          )}
          {actions && <div className='flex w-full gap-2'>{actions}</div>}
        </div>
      )}
    </Alert>
  );
}
