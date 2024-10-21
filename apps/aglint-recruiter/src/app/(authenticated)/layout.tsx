import { AppLayout } from '@components/layouts/app-layout';
import { unstable_noStore as noStore } from 'next/cache';
import dynamic from 'next/dynamic';
import { type PropsWithChildren } from 'react';

import { OnboardPending } from '@/components/Navigation/OnboardPending';
import SideNavbar from '@/components/Navigation/SideNavbar';
import { api, HydrateClient } from '@/trpc/server';

import { ThemeWrapper } from '../(public)/theme/_common/components/ThemeWrapper';
import { Provider } from './providers';

const TopBar = dynamic(() => import('@/components/Navigation/TopBar'), {
  ssr: false,
});

const Layout = async ({ children }: PropsWithChildren) => {
  noStore();
  void api.tenant.read.prefetch();
  void api.tenant.flags.prefetch();
  void api.tenant.all_departments.prefetch();
  void api.tenant.officeLocations.prefetch();
  return (
    <ThemeWrapper>
      <HydrateClient>
        <Provider>
          <AppLayout topbar={<TopBar />} sidebar={<SideNavbar />}>
            {children}
            <OnboardPending />
          </AppLayout>
        </Provider>
      </HydrateClient>
    </ThemeWrapper>
  );
};

export default Layout;
