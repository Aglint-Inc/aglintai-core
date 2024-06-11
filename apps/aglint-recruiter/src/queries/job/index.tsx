import type { DatabaseTable } from '@aglint/shared-types';
import { QueryClient, queryOptions } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { GC_TIME } from '..';
import { applicationsQueries } from '../job-applications';
import { jobDashboardQueryKeys } from '../job-dashboard/keys';
import { jobsQueryKeys } from '../jobs/keys';
import { Job } from '../jobs/types';

const jobQueries = {
  job: ({ id }: JobRequisite) =>
    queryOptions({
      queryKey: [...jobsQueryKeys.jobs().queryKey, { id }],
      queryFn: async () =>
        (
          await supabase
            .from('public_jobs')
            .select('*')
            .eq('id', id)
            .single()
            .throwOnError()
        ).data,
    }),
  job_application_count: ({ id, enabled, queryClient }: Pollers) =>
    queryOptions({
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      queryKey: [...jobQueries.job({ id }).queryKey, 'application_count'],
      queryFn: async () => {
        const count = (
          await supabase
            .rpc('getsectioncounts', {
              jobid: id,
            })
            .throwOnError()
        ).data;
        queryClient.setQueryData<Job[]>(jobsQueryKeys.jobs().queryKey, (prev) =>
          prev.reduce((acc, curr) => {
            if (curr.id === id) acc.push({ ...curr, count });
            else acc.push(curr);
            return acc;
          }, [] as Job[]),
        );
      },
    }),
  job_processing_count: ({ id, enabled, queryClient }: Pollers) =>
    queryOptions({
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      queryKey: [...jobQueries.job({ id }).queryKey, 'processing_count'],
      queryFn: async () => {
        const processing_count = (
          await supabase
            .rpc('getjob', {
              jobid: id,
            })
            .single()
            .throwOnError()
        ).data.processing_count as Job['processing_count'];
        queryClient.setQueryData<Job[]>(jobsQueryKeys.jobs().queryKey, (prev) =>
          prev.reduce((acc, curr) => {
            if (curr.id === id) acc.push({ ...curr, processing_count });
            else acc.push(curr);
            return acc;
          }, [] as Job[]),
        );
      },
    }),
  scoring_param: ({ id, enabled, queryClient }: Pollers) =>
    queryOptions({
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      refetchInterval: enabled ? 5000 : false,
      queryKey: [...jobQueries.job({ id }).queryKey, 'scoring_parameters'],
      queryFn: async () => {
        const polledData = (
          await supabase
            .from('public_jobs')
            .select(
              'scoring_criteria_loading, draft, parameter_weights, description_hash',
            )
            .eq('id', id)
            .single()
            .throwOnError()
        ).data;
        queryClient.setQueryData<Job[]>(jobsQueryKeys.jobs().queryKey, (prev) =>
          prev.reduce((acc, curr) => {
            if (curr.id === id) acc.push({ ...curr, ...polledData });
            else acc.push(curr);
            return acc;
          }, [] as Job[]),
        );
      },
    }),
  application_scoring: ({ id, enabled, queryClient }: Pollers) =>
    queryOptions({
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      refetchInterval: enabled ? 5000 : false,
      queryKey: [...jobQueries.job({ id }).queryKey, 'application_scoring'],
      queryFn: async () => {
        const { queryKey: dashboardQueryKey } = jobDashboardQueryKeys.dashboard(
          { id },
        );
        const { queryKey: applicationsQueryKey } = applicationsQueries.all({
          job_id: id,
        });
        const { queryKey: processingCountQueryKey } =
          jobQueries.job_processing_count({
            id,
          });
        await Promise.allSettled([
          queryClient.refetchQueries({ queryKey: dashboardQueryKey }),
          queryClient.refetchQueries({ queryKey: applicationsQueryKey }),
          queryClient.refetchQueries({ queryKey: processingCountQueryKey }),
        ]);
      },
    }),
};

type Pollers = JobRequisite &
  Partial<{ enabled: boolean; queryClient: QueryClient }>;

export type JobRequisite = Pick<DatabaseTable['public_jobs'], 'id'>;

export { jobQueries };
