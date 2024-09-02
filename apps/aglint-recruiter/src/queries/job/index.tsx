import type { DatabaseTable } from '@aglint/shared-types';
import {
  type QueryClient,
  type QueryFilters,
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { useCallback } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { type GetInterviewPlansType } from '@/src/pages/api/scheduling/get_interview_plans';
import { syncGreenhouseJob } from '@/src/utils/jobs.api';
import toast from '@/src/utils/toast';

import { GC_TIME, noPollingKey } from '..';
import { readJob } from '../jobs';
import { jobKey, jobsQueryKeys } from '../jobs/keys';
import { type Job } from '../jobs/types';

const jobQueries = {
  job: ({
    id,
    enabled,
    queryClient,
    initialData,
    refetchOnMount,
  }: Pollers & { initialData?: Job }) =>
    queryOptions({
      queryKey: [...jobsQueryKeys.jobs().queryKey, { id }],
      enabled,
      initialData,
      refetchOnMount,
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
        return job;
      },
    }),
  interview_plans: ({ id }: JobRequisite) =>
    queryOptions({
      queryKey: [
        ...jobQueries.job({ id }).queryKey,
        'interview_plans',
        noPollingKey,
      ],
      queryFn: async () =>
        (await axios.get(`/api/scheduling/get_interview_plans?job_id=${id}`))
          .data as GetInterviewPlansType['respone'],
    }),
  polling: ({ id, enabled, queryClient }: Pollers) => {
    return queryOptions({
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      refetchInterval: enabled ? 5000 : false,
      queryKey: ['job_polling', { id }],
      queryFn: async () => {
        await jobQueries.refresh({ id, queryClient });
        return true;
      },
    });
  },
  refresh: async ({ id, queryClient }: Pollers) => {
    await queryClient.invalidateQueries({
      predicate: (query) =>
        query.queryKey.includes(jobKey) &&
        query.queryKey.find((key) => (key as any)?.id === id) &&
        !query.queryKey.includes(noPollingKey),
    });
  },
};

export const useJobSync = () => {
  const { recruiter_id } = useAuthDetails();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await syncGreenhouseJob(id, recruiter_id);
      await jobQueries.refresh({ id, queryClient });
    },
    onSuccess: () => toast.success('Synced successfully'),
    onError: () => toast.error('Synced failed'),
  });
};

export const useInvalidateJobQueries = () => {
  const queryClient = useQueryClient();
  const predicateFn = useCallback(
    (id): QueryFilters['predicate'] =>
      (query) =>
        query.queryKey.includes(jobKey) &&
        query.queryKey.find((key) => (key as any)?.id === id) &&
        !query.queryKey.includes(noPollingKey),
    [jobKey, noPollingKey],
  );
  const revalidateJobQueries = async (id: Job['id']) =>
    await Promise.allSettled([
      queryClient.refetchQueries({
        type: 'active',
        predicate: predicateFn(id),
      }),
      queryClient.removeQueries({
        type: 'inactive',
        predicate: predicateFn(id),
      }),
    ]);

  return { revalidateJobQueries };
};

type Pollers = JobRequisite &
  Partial<{
    enabled: boolean;
    queryClient: QueryClient;
    refetchOnMount: boolean;
  }>;

export type JobRequisite = Pick<DatabaseTable['public_jobs'], 'id'>;

export { jobQueries };
