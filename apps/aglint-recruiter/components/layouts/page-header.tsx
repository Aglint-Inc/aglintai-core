import { cn } from '@lib/utils';
import * as React from 'react';

const Page = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex w-full flex-col space-y-2', className)}
    {...props}
  />
));
Page.displayName = 'Page';

const PageHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-row', className)} {...props} />
));
PageHeader.displayName = 'PageHeader';

const PageHeaderText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-1 flex-col', className)} {...props} />
));
PageHeaderText.displayName = 'PageHeaderText';

const PageTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn('text-xl font-medium tracking-tight', className)}
    {...props}
  >
    {props.children || 'Default Heading'}
  </h1>
));
PageTitle.displayName = 'PageTitle';

const PageDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mt-1 max-w-3xl text-sm text-muted-foreground', className)}
    {...props}
  />
));
PageDescription.displayName = 'PageDescription';

const PageActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-end flex items-center space-x-2', className)}
    {...props}
  />
));
PageActions.displayName = 'PageActions';

const PageFilters = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-end flex items-center space-x-2', className)}
    {...props}
  />
));
PageFilters.displayName = 'PageFilters';

export {
  Page,
  PageActions,
  PageDescription,
  PageFilters,
  PageHeader,
  PageHeaderText,
  PageTitle,
};
