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
    'flex-col',
    type === 'inline' ? 'px-2 py-1' : type === 'small' ? 'p-3' : 'p-4',
    className,
  );

  return (
    <Alert variant={color} className={alertClass}>
      {type === 'large' ? (
        <div className='w-full'>
          <div
            className={
              'flex flex-row gap-2 justify-between w-full items-center'
            }
          >
            <div className={'flex flex-row gap-2'}>
              <div className='p-1'>
                {IconComponent && <IconComponent size={32} className='mr-2' />}
              </div>
              <div className='flex flex-col'>
                {title && <AlertTitle>{title}</AlertTitle>}
                {description && (
                  <AlertDescription>{description}</AlertDescription>
                )}
              </div>
            </div>
            {actions && <div className='flex gap-2 w-full'>{actions}</div>}
          </div>
          {notes && (
            <div className='mt-4 pl-2'>
              <div className={'flex flex-row gap-2 items-center'}>
                <Icons.NotebookPen size={16} className=' text-neutral-500' />
                <p>Additional Note</p>
              </div>
              <AlertDescription>{notes}</AlertDescription>
            </div>
          )}
        </div>
      ) : type === 'inline' ? (
        <div
          className={'flex flex-row gap-2 justify-between w-full items-center'}
        >
          <div className={'flex flex-row gap-2'}>
            {IconComponent && <IconComponent size={16} />}
            <div className='flex flex-col'>
              {title && <AlertTitle>{title}</AlertTitle>}
            </div>
          </div>
          {actions && <div className='flex gap-2 w-full'>{actions}</div>}
        </div>
      ) : (
        <div className={'flex flex-col gap-1 w-full'}>
          <div className={'flex flex-row gap-2'}>
            {IconComponent && <IconComponent size={16} />}
            <div className='flex flex-col'>
              {title && <AlertTitle>{title}</AlertTitle>}
            </div>
          </div>
          {description && (
            <AlertDescription className='text-xs'>
              {description}
            </AlertDescription>
          )}
          {actions && <div className='flex gap-2 w-full'>{actions}</div>}
        </div>
      )}
    </Alert>
  );
}
