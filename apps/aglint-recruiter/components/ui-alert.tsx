import { cn } from '@lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  type LucideIcon,
  XCircle,
} from 'lucide-react';
import * as React from 'react';

import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const alertVariants = cva(
  'relative w-full p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        alert:
          'bg-red-50 text-red-600 dark:bg-red-900/30 border border-red-700/50 dark:text-red-200 [&>svg]:text-red-500 dark:[&>svg]:text-red-200',
        banner: 'bg-secondary',
        announcement:
          'bg-blue-50 text-blue-500 dark:bg-blue-900 dark:text-blue-200 [&>svg]:text-blue-500 dark:[&>svg]:text-blue-200',
        tip: 'bg-purple-50 text-purple-500 dark:bg-purple-900 dark:text-purple-200 [&>svg]:text-purple-500 dark:[&>svg]:text-purple-200',
      },
      type: {
        info: 'bg-blue-50 text-blue-500 dark:bg-blue-900 dark:text-blue-200 [&>svg]:text-blue-500 dark:[&>svg]:text-blue-200',
        warning:
          'bg-yellow-50 text-yellow-500 dark:bg-yellow-900 dark:text-yellow-200 [&>svg]:text-yellow-500 dark:[&>svg]:text-yellow-200',
        error:
          'bg-red-50 text-red-500 dark:bg-red-900 dark:text-red-200 [&>svg]:text-red-500 dark:[&>svg]:text-red-200',
        success:
          'bg-green-50 text-green-500 dark:bg-green-900 dark:text-green-200 [&>svg]:text-green-500 dark:[&>svg]:text-green-200',
      },
      bordered: {
        true: 'border',
        false: 'border-0',
      },
      rounded: {
        true: 'rounded-lg',
        false: 'rounded-none',
      },
    },
    compoundVariants: [
      {
        type: 'info',
        bordered: true,
        class: 'border-blue-200 dark:border-blue-800',
      },
      {
        type: 'warning',
        bordered: true,
        class: 'border-yellow-200 dark:border-yellow-800',
      },
      {
        type: 'error',
        bordered: true,
        class: 'border-red-200 dark:border-red-800',
      },
      {
        type: 'success',
        bordered: true,
        class: 'border-green-200 dark:border-green-800',
      },
    ],
    defaultVariants: {
      variant: 'default',
      bordered: true,
      rounded: true,
    },
  },
);

type AlertVariantProps = VariantProps<typeof alertVariants>;

type AlertType = NonNullable<AlertVariantProps['type']>;
type VariantType = NonNullable<AlertVariantProps['variant']>;

const iconMap: Record<AlertType | 'tip', LucideIcon> = {
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
  success: CheckCircle,
  tip: Lightbulb,
};

type BaseUIAlertProps = {
  title?: string;
  action?: React.ReactNode;
  bordered?: boolean;
  rounded?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type TypeUIAlertProps = BaseUIAlertProps & {
  type: AlertType;
  variant?: never;
  icon?: LucideIcon;
};

type VariantUIAlertProps = BaseUIAlertProps & {
  variant: VariantType;
  type?: never;
  icon?: LucideIcon;
};

type CustomIconUIAlertProps = BaseUIAlertProps & {
  icon: LucideIcon;
  type?: never;
  variant?: never;
};

export type UIAlertProps =
  | TypeUIAlertProps
  | VariantUIAlertProps
  | CustomIconUIAlertProps;

const UIAlert = React.forwardRef<HTMLDivElement, UIAlertProps>(
  (
    {
      className,
      variant,
      type,
      bordered,
      rounded = true,
      title,
      action,
      icon,
      children,
      ...props
    },
    ref,
  ) => {
    const Icon =
      icon || (type ? iconMap[type] : variant === 'tip' ? iconMap.tip : null);

    return (
      <Alert
        ref={ref}
        className={cn(
          alertVariants({ variant, type, bordered, rounded }),
          className,
        )}
        {...props}
      >
        {Icon && <Icon className='h-4 w-4' />}
        <div className='w-full'>
          {title && <AlertTitle>{title}</AlertTitle>}
          <AlertDescription>{children}</AlertDescription>
          {action && <div className='mt-3'>{action}</div>}
        </div>
      </Alert>
    );
  },
);
UIAlert.displayName = 'UIAlert';

export { UIAlert };
