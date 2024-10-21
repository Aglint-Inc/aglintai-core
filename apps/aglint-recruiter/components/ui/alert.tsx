import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@lib/utils';

export const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        error:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive dark:bg-red-700/10 dark:text-red-300',
        info: 'bg-sky-50 border border-sky-500 dark:text-sky-200 text-sky-800 dark:bg-sky-600/20',
        success:
          'bg-green-50 border border-green-500 text-green-800 dark:text-green-200 dark:bg-green-600/20',
        warning:
          'bg-yellow-50 border border-yellow-500 text-yellow-800 dark:text-yellow-200 dark:bg-yellow-600/20',
        neutral:
          'bg-neutral-50 border border-neutral-500 text-neutral-500 dark:text-neutral-200 dark:bg-neutral-600/20',
        purple:
          'bg-purple-50 border border-purple-500 text-purple-800 dark:text-purple-200 dark:bg-purple-700/20',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role='alert'
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };
