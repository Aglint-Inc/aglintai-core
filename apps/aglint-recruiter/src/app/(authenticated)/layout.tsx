import { AppLayout } from '@components/layouts/app-layout';
import { unstable_noStore as noStore } from 'next/cache';
import dynamic from 'next/dynamic';
import { type PropsWithChildren } from 'react';

import { OnboardPending } from '@/components/Navigation/OnboardPending';
import SideNavbar from '@/components/Navigation/SideNavbar';
import { api } from '@/trpc/server';

import { Provider } from './providers';

const TopBar = dynamic(() => import('@/components/Navigation/TopBar'), {
  ssr: false,
});

const Layout = async ({ children }: PropsWithChildren) => {
  noStore();
  void api.tenant.read.prefetch();
  void api.tenant.flags.prefetch();

  return (
    <Provider>
      <AppLayout topbar={<TopBar />} sidebar={<SideNavbar />}>
        {children}
        <OnboardPending />
      </AppLayout>
    </Provider>
  );
};

export default Layout;
