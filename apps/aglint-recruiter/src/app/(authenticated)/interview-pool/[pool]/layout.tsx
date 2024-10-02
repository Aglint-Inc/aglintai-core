'use client';

import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';
import { type PropsWithChildren } from 'react';

import { useBreadcrumContext } from '@/context/BreadcrumContext/BreadcrumContext';
import SchedulingProvider from '@/context/SchedulingMain/SchedulingMainProvider';

const Layout = ({ children }: PropsWithChildren) => {
  const { breadcrum } = useBreadcrumContext();
  return (
    <SchedulingProvider>
      <OneColumnPageLayout
        header={
          <nav className='mb-6 flex items-center space-x-2 text-sm text-gray-600'>
            {breadcrum}
          </nav>
        }
      >
        {children}
      </OneColumnPageLayout>
    </SchedulingProvider>
  );
};

export default Layout;
