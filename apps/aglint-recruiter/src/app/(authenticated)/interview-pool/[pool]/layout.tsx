'use client';
import { type PropsWithChildren } from 'react';

import SchedulingProvider from '@/context/SchedulingMain/SchedulingMainProvider';

const Layout = ({ children }: PropsWithChildren) => {
  return <SchedulingProvider>{children}</SchedulingProvider>;
};

export default Layout;
