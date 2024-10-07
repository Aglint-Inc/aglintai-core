import { unstable_noStore } from 'next/cache';
import { type PropsWithChildren } from 'react';

import { api, HydrateClient } from '@/trpc/server';
import {
  WorkflowsProvider,
  WorkflowsStoreProvider,
} from '@/workflows/contexts';

const Layout = async ({ children }: PropsWithChildren) => {
  unstable_noStore();
  void api.workflows.read.prefetch();
  return (
    <HydrateClient>
      <WorkflowsStoreProvider>
        <WorkflowsProvider>{children}</WorkflowsProvider>
      </WorkflowsStoreProvider>
    </HydrateClient>
  );
};

export default Layout;
