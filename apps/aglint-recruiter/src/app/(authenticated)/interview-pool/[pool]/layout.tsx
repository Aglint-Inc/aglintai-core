'use client';

import { FullWidthLayout } from '@components/layouts/full-width-layout';
import { type PropsWithChildren } from 'react';

import { useBreadcrumContext } from '@/context/BreadcrumContext/BreadcrumContext';
import SchedulingProvider from '@/context/SchedulingMain/SchedulingMainProvider';

const Layout = ({ children }: PropsWithChildren) => {
  const { breadcrum } = useBreadcrumContext();
  return (
    <SchedulingProvider>
      <FullWidthLayout
        header={
          <nav className='mb-6 flex items-center space-x-2 text-sm text-gray-600'>
            {breadcrum}
          </nav>
        }
      >
        {children}
      </FullWidthLayout>
    </SchedulingProvider>
  );
};

export default Layout;
