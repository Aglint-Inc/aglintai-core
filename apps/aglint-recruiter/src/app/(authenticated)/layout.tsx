export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { type PropsWithChildren } from 'react';

import { api, HydrateClient } from '@/trpc/server';

import { Provider } from './providers';

const Layout = async ({ children }: PropsWithChildren) => {
  void api.tenant.read.prefetch();
  void api.tenant.flags.prefetch();
  return (
    <HydrateClient>
      <Provider>{children}</Provider>
    </HydrateClient>
  );
};

export default Layout;
