import { unstable_noStore } from 'next/cache';

import { api, HydrateClient } from '@/trpc/server';

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { filter: string };
}) => {
  unstable_noStore();
  void api.scheduling.candidate_invite.meta.prefetch({
    filter_id: params.filter,
  });

  return <HydrateClient>{children}</HydrateClient>;
};

export default Layout;
