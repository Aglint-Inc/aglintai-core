import type { PropsWithChildren } from 'react';

import { api, HydrateClient } from '@/trpc/server';

import { JobsProvider } from './_common/contexts';

const Layout = async ({ children }: PropsWithChildren) => {
  void api.jobs.read.prefetch();
  return (
    <HydrateClient>
      <JobsProvider>{children}</JobsProvider>
    </HydrateClient>
  );
};

export default Layout;
