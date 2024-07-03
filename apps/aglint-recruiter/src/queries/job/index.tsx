import type { DatabaseTable } from '@aglint/shared-types';
import { QueryClient, queryOptions } from '@tanstack/react-query';
import axios from 'axios';

import { GetInterviewPlansType } from '@/src/pages/api/scheduling/get_interview_plans';

import { GC_TIME } from '..';
import { applicationsQueries } from '../job-applications';
import { jobDashboardQueryKeys } from '../job-dashboard/keys';
import { readJob } from '../jobs';
import { jobsQueryKeys } from '../jobs/keys';
import { Job } from '../jobs/types';

const jobQueries = {
  job: ({ id, enabled, queryClient }: Pollers) =>
    queryOptions({
      queryKey: [...jobsQueryKeys.jobs().queryKey, { id }],
      enabled,
      queryFn: async () => {
        const job = await readJob(id);
        const { queryKey } = jobsQueryKeys.jobs();
        const jobs = queryClient.getQueryData<Job[]>(queryKey);
        queryClient.setQueryData<Job[]>(
          queryKey,
          jobs.reduce((acc, curr) => {
            if (curr.id === id) acc.push(job);
            else acc.push(curr);
            return acc;
          }, []),
        );
      },
    }),
  interview_plans: ({ id }: JobRequisite) =>
    queryOptions({
      queryKey: [...jobQueries.job({ id }).queryKey, 'interview_plans'],
      queryFn: async () =>
        (await axios.get(`/api/scheduling/get_interview_plans?job_id=${id}`))
          .data as GetInterviewPlansType['respone'],
    }),
  application_polling: ({ id, enabled, queryClient }: Pollers) =>
    queryOptions({
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      refetchInterval: enabled ? 5000 : false,
      queryKey: [...jobQueries.job({ id }).queryKey, 'application_polling'],
      queryFn: async () => {
        const { queryKey: jobQueryKeys } = jobQueries.job({ id });
        const { queryKey: dashboardQueryKey } = jobDashboardQueryKeys.dashboard(
          { id },
        );
        const { queryKey: locationFilterQueryKeys } =
          applicationsQueries.locationFilters({ job_id: id });
        const { queryKey: applicationsQueryKey } = applicationsQueries.all({
          job_id: id,
        });
        await Promise.allSettled([
          queryClient.refetchQueries({ queryKey: jobQueryKeys }),
          queryClient.refetchQueries({ queryKey: dashboardQueryKey }),
          queryClient.refetchQueries({ queryKey: applicationsQueryKey }),
          queryClient.refetchQueries({
            queryKey: locationFilterQueryKeys,
          }),
        ]);
      },
    }),
  score_polling: ({ id, enabled, queryClient }: Pollers) =>
    queryOptions({
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      refetchInterval: enabled ? 5000 : false,
      queryKey: [...jobQueries.job({ id }).queryKey, 'score_polling'],
      queryFn: async () => {
        const { queryKey: jobQueryKeys } = jobQueries.job({ id });
        await queryClient.refetchQueries({ queryKey: jobQueryKeys });
      },
    }),
};

type Pollers = JobRequisite &
  Partial<{ enabled: boolean; queryClient: QueryClient }>;

export type JobRequisite = Pick<DatabaseTable['public_jobs'], 'id'>;

export { jobQueries };
