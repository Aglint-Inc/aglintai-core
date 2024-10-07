'use client';
import { cn } from '@lib/utils';
import React from 'react';

interface PublicPageLayoutProps {
  children: React.ReactNode;
  footer: React.ReactNode;
  className?: string;
  header: React.ReactNode;
}

export function PublicPageLayout({
  children,
  footer,
  className,
  header,
}: PublicPageLayoutProps) {
  return (
    <div className='container flex min-h-screen flex-col'>
      <main className='mt-8 flex w-full flex-col rounded-lg border border-border bg-white p-8 sm:px-10'>
        <header>{header}</header>
        <div className={cn('h-full overflow-auto', className)}>{children}</div>
      </main>
      <footer className='mt-auto'>{footer}</footer>
    </div>
  );
}
