import { api, HydrateClient } from '@/trpc/server';

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    pool: string;
  };
}) => {
  void api.interview_pool.module_and_users.prefetch({
    module_id: params.pool,
  });
  void api.interview_pool.schedules.prefetch({
    module_id: params.pool,
    filter: ['confirmed', 'completed', 'cancelled'],
  });
  void api.interview_pool.candidates.prefetch({
    module_id: params.pool,
  });
  void api.interview_pool.feedbacks.prefetch({
    module_id: params.pool,
  });
  return <HydrateClient>{children}</HydrateClient>;
};

export default Layout;
