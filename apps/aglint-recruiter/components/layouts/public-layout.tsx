import { cn } from '@lib/utils';
import React from 'react';

interface PublicPageLayoutProps {
  children: React.ReactNode;
  footer: React.ReactNode;
  className?: string;
}

export function PublicPageLayout({
  children,
  footer,
  className,
}: PublicPageLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col bg-gray-50'>
      <main className='flex-grow px-4 py-10 sm:px-10'>
        <div className={cn('', className)}>{children}</div>
      </main>
      <footer className='mt-auto'>{footer}</footer>
    </div>
  );
}
