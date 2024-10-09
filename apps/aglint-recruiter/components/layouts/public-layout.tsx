'use client';
import { ScrollArea } from '@components/ui/scroll-area';
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
    <div className='container m-8 flex flex-col'>
      <main className='flex w-full flex-col rounded-lg border border-border bg-white'>
        <header>{header}</header>
        <ScrollArea className='h-[calc(100vh-260px)]'>
          <div className={cn('h-full', className)}>{children}</div>
        </ScrollArea>
      </main>
      <footer>{footer}</footer>
    </div>
  );
}
