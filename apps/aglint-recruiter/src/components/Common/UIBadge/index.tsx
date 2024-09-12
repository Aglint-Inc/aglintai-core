'use client';
import { Badge } from '@components/ui/badge';
import { cn } from '@lib/utils';
import { cva } from 'class-variance-authority';
import * as Icons from 'lucide-react';
import React from 'react';

const badgeVariants = cva(
  'inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        accent:
          'border-transparent bg-amber-300 text-amber-600 hover:bg-amber-500',
        info: 'border-transparent bg-sky-300 text-sky-800 hover:bg-sky-500',
        success:
          'border-transparent bg-green-300 text-green-600 hover:bg-green-500',
        warning:
          'border-transparent bg-yellow-300 text-yellow-600 hover:bg-yellow-500',
        error:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      },
      size: {
        default: 'h-6',
        sm: 'h-5 text-[10px]',
        lg: 'h-7',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface Props {
  iconName?: keyof typeof Icons;
  showIcon?: boolean;
  showText?: boolean;
  iconSize?: number;
  textBadge?: string;
  size?: 'default' | 'sm' | 'lg';
  variant?:
    | 'default'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';

  className?: string;
}

export function UIBadge({
  className,
  variant,
  size,
  showIcon = false,
  textBadge,
  iconName = 'Shapes',
  showText = true,
  iconSize = 16,
}: Props) {
  const IconComponent = Icons[iconName] as React.ElementType;

  return (
    <Badge
      className={cn(
        badgeVariants({ variant, size }),
        size === 'sm' ? 'p-1' : '',
        className,
      )}
    >
      {showIcon && (
        <IconComponent size={iconSize} className={textBadge ? 'mr-1' : ''} />
      )}
      {showText ? <div>{textBadge}</div> : null}
    </Badge>
  );
}
