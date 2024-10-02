import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
  topbar?: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
}

export function AppLayout({ children, topbar, sidebar }: AppLayoutProps) {
  return (
    <>
      {topbar && <nav>{topbar}</nav>}
      <div className='flex w-full'>
        {sidebar && <nav>{sidebar}</nav>}
        <main className='flex w-full flex-row pl-2 pr-4 pt-2'>{children}</main>
      </div>
    </>
  );
}
