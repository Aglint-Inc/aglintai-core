import { ScrollArea } from '@components/ui/scroll-area';
import { cn } from '@lib/utils';
import * as React from 'react';

const Layout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('w-full', className)} {...props} />
));
Layout.displayName = 'Layout';

const LayoutHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('w-full px-4 pb-4', className)} {...props} />
));
LayoutHeader.displayName = 'LayoutHeader';

const LayoutFilter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex w-full flex-row px-4 pb-4', className)}
    {...props}
  />
));
LayoutFilter.displayName = 'LayoutFilter';

interface LayoutBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebarPosition?: 'left' | 'right' | 'none';
}

const LayoutBody = React.forwardRef<HTMLDivElement, LayoutBodyProps>(
  ({ className, sidebarPosition = 'none', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'w-full gap-[1px] overflow-hidden rounded-lg border border-border bg-gray-200',
        {
          'grid grid-cols-[max-content_1fr]': sidebarPosition === 'left',
          'grid grid-cols-[1fr_max-content]': sidebarPosition === 'right',
        },
        className,
      )}
      {...props}
    />
  ),
);
LayoutBody.displayName = 'LayoutBody';

interface LayoutSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
}

const LayoutSidebar = React.forwardRef<HTMLDivElement, LayoutSidebarProps>(
  ({ className, width = '16rem', ...props }, ref) => {
    const widthStyle = typeof width === 'number' ? `${width}px` : width;

    return (
      <div
        ref={ref}
        className={cn('border-border', className)}
        style={{ width: widthStyle }}
      >
        <ScrollArea className='h-[calc(100vh-68px)] bg-white'>
          <div className='p-4' {...props} />
        </ScrollArea>
      </div>
    );
  },
);
LayoutSidebar.displayName = 'LayoutSidebar';

const LayoutContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <ScrollArea className='h-[calc(100vh-68px)] bg-white'>
    <div
      ref={ref}
      className={cn('flex h-full w-full flex-grow flex-col py-4', className)}
      {...props}
    />
  </ScrollArea>
));
LayoutContent.displayName = 'LayoutContent';

export {
  Layout,
  LayoutBody,
  LayoutContent,
  LayoutFilter,
  LayoutHeader,
  LayoutSidebar,
};
