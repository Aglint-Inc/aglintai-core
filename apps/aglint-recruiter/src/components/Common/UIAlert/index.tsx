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
  variant?: VariantProps<typeof alertVariants>['variant'];
  title?: React.ReactNode;
  description?: React.ReactNode;
  iconName?: keyof typeof Icons;
  iconSize?: number;
  actions?: React.ReactNode;
  notes?: React.ReactNode;
  className?: string;
  inline?: boolean;
  short?: boolean;
}

export function UIAlert({
  variant = 'default',
  title,
  description,
  iconName,
  iconSize = 20,
  actions,
  notes,
  className,
  inline = false,
  short = false,
}: UIAlertProps) {
  const IconComponent = iconName
    ? (Icons[iconName] as React.ElementType)
    : null;

  const alertClass = cn(
    'flex items-start',
    inline ? 'flex-row items-center' : 'flex-col',
    short ? 'py-2' : 'py-4',
    className,
  );

  const contentClass = cn(
    'flex',
    inline || short ? 'flex-row items-center' : 'flex-col',
    'gap-2',
  );

  return (
    <Alert variant={variant} className={alertClass}>
      <div className={contentClass}>
        {IconComponent && <IconComponent size={iconSize} className='mr-2' />}
        <div className='flex flex-col'>
          {title && <AlertTitle>{title}</AlertTitle>}
          {description && <AlertDescription>{description}</AlertDescription>}
        </div>
      </div>
      {actions && <div className='flex gap-2 mt-2'>{actions}</div>}
      {notes && (
        <div className='mt-4 pl-2'>
          <AlertDescription>{notes}</AlertDescription>
        </div>
      )}
    </Alert>
  );
}
