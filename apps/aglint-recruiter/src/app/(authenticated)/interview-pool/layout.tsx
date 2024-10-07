import { unstable_noStore as noStore } from 'next/cache';
import { type PropsWithChildren } from 'react';

import { api, HydrateClient } from '@/trpc/server';

const Layout = async ({ children }: PropsWithChildren) => {
  noStore();

  void api.interview_pool.list.prefetch();

  return <HydrateClient>{children}</HydrateClient>;
};

export default Layout;
