'use client';

import { cn } from '@lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { type LucideIcon, type LucideProps } from 'lucide-react';
import * as React from 'react';

import { Badge } from './ui/badge';

const badgeVariants = cva(
  'inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'hover:bg-primary  bg-primary text-primary-foreground ',
        secondary:
          'hover:bg-secondary  bg-secondary text-secondary-foreground ',
        accent: 'hover:bg-accent  bg-accent text-accent-foreground ',
        info: 'hover:bg-blue-100  bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-200 ',
        success:
          'hover:bg-green-100  bg-green-100 text-green-800  dark:bg-green-100/20 dark:text-green-200 ',
        warning:
          'hover:bg-yellow-100  bg-yellow-100 text-yellow-800 dark:bg-yellow-100/20 dark:text-yellow-200 ',
        destructive:
          'hover:bg-destructive  bg-destructive text-destructive-foreground dark:bg-destructive/40 dark:text-red-300 ',
        purple:
          'hover:bg-purple-100  bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-200 ',
        neutral: 'hover:bg-muted  bg-muted text-muted-foreground ',
      },
      size: {
        default: 'h-6',
        sm: 'h-5 text-[10px] px-1.5',
        lg: 'h-7 px-3',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'default',
    },
  },
);

export interface UIBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: LucideIcon;
  iconProps?: Partial<LucideProps>;
  textBadge?: string | number;
}

export function UIBadge({
  className,
  variant,
  size,
  textBadge,
  icon: Icon,
  iconProps,
  ...props
}: UIBadgeProps) {
  return (
    <Badge
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {Icon && (
        <Icon
          className={cn('mr-1', textBadge ? 'mr-1.5' : '')}
          size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14}
          {...iconProps}
        />
      )}
      {textBadge != null && <span>{textBadge.toString()}</span>}
    </Badge>
  );
}
