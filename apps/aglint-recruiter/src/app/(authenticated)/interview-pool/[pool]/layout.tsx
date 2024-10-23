import { unstable_noStore as noStore } from 'next/cache';

import { api, HydrateClient } from '@/trpc/server';

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    pool: string;
  };
}) => {
  noStore();
  const { pool } = await params;
  void api.interview_pool.module_and_users.prefetch({
    module_id: pool,
  });
  void api.interview_pool.schedules.prefetch({
    module_id: pool,
    filter: ['confirmed', 'completed', 'cancelled'],
  });
  void api.interview_pool.candidates.prefetch({
    module_id: pool,
  });
  void api.interview_pool.archive_get_sessions.prefetch({
    id: pool,
  });
  void api.interview_pool.feedbacks.prefetch({
    module_id: pool,
  });
  void api.analytics.interview.candidate_pipeline.prefetch({
    module_id: pool,
  });
  void api.analytics.interview.interview_statistics.prefetch({
    module_id: pool,
  });
  void api.analytics.interview.interviewer_performance.prefetch({
    module_id: pool,
  });
  return <HydrateClient>{children}</HydrateClient>;
};

export default Layout;
