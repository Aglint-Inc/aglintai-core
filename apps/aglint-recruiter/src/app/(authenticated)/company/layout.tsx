'use client';

import { FullWidthLayout } from '@components/layouts/full-width-layout';
import { type PropsWithChildren } from 'react';

import VerticalNav from './_common/components/SideNav';
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <FullWidthLayout sidebar={<VerticalNav />} sidebarPosition='left'>
      <div className='p-4'>{children}</div>
    </FullWidthLayout>
  );
};

export default Layout;
