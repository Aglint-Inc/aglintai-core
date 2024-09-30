import { unstable_noStore as noStore } from 'next/cache';
import { type PropsWithChildren } from 'react';

import { api } from '@/trpc/server';

import { Provider } from './providers';

const Layout = async ({ children }: PropsWithChildren) => {
  noStore();
  void api.tenant.read.prefetch();
  void api.tenant.flags.prefetch();
  return <Provider>{children}</Provider>;
};

export default Layout;
