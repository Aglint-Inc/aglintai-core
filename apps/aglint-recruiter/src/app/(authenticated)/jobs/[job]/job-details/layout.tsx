'use client';

import { type PropsWithChildren } from 'react';

import { JobProvider } from '@/job/contexts';

const Layout = ({ children }: PropsWithChildren) => {
  return <JobProvider>{children}</JobProvider>;
};

export default Layout;
