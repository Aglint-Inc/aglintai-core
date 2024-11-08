import { AppLayout } from '@components/layouts/app-layout';
import { unstable_noStore } from 'next/cache';
import { type PropsWithChildren } from 'react';

import { OnboardPending } from '@/components/Navigation/OnboardPending';
import SideNavbar from '@/components/Navigation/SideNavbar';
import TopBar from '@/components/Navigation/TopBar';
import { api, HydrateClient } from '@/trpc/server';

import { ThemeWrapper } from '../(public)/theme/_common/components/ThemeWrapper';
import { Provider } from './providers';

const Layout = async ({ children }: PropsWithChildren) => {
  unstable_noStore();
  void api.tenant.read.prefetch();
  void api.tenant.flags.prefetch();
  void api.tenant.all_departments.prefetch();
  void api.tenant.readLocations.prefetch();
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
