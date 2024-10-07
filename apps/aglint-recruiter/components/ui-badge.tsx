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
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        accent: 'bg-accent text-accent-foreground hover:bg-accent/80',
        info: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
        success: 'bg-green-100 text-green-800 hover:bg-green-200',
        warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
        neutral: 'bg-muted text-muted-foreground hover:bg-muted/80',
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
