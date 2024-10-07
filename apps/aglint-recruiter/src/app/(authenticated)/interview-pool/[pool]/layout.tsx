import { unstable_noStore } from 'next/cache';

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
  unstable_noStore();
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
  void api.interview_pool.archive_get_sessions.prefetch({
    id: params.pool,
  });
  void api.interview_pool.feedbacks.prefetch({
    module_id: params.pool,
  });
  void api.analytics.interview.candidate_pipeline.prefetch({
    module_id: params.pool,
  });
  void api.analytics.interview.interview_statistics.prefetch({
    module_id: params.pool,
  });
  void api.analytics.interview.interviewer_performance.prefetch({
    module_id: params.pool,
  });
  return <HydrateClient>{children}</HydrateClient>;
};

export default Layout;
