import type { DatabaseTable } from '@aglint/shared-types';
import { QueryClient, queryOptions } from '@tanstack/react-query';
import axios from 'axios';

import { GetInterviewPlansType } from '@/src/pages/api/scheduling/get_interview_plans';
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
  interview_plans: ({ id }: JobRequisite) =>
    queryOptions({
      queryKey: [...jobQueries.job({ id }).queryKey, 'interview_plans'],
      queryFn: async () =>
        (await axios.get(`/api/scheduling/get_interview_plans?job_id=${id}`))
          .data as GetInterviewPlansType['respone'],
    }),
  job_application_count: ({
    id,
    enabled,
    queryClient,
    initialData,
  }: Pollers & {
    initialData?: Awaited<ReturnType<typeof getApplicationCount>>;
  }) =>
    queryOptions({
      initialData,
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      queryKey: [...jobQueries.job({ id }).queryKey, 'application_count'],
      queryFn: async () => {
        const count = await getApplicationCount(id);
        queryClient.setQueryData<Job[]>(jobsQueryKeys.jobs().queryKey, (prev) =>
          prev.reduce((acc, curr) => {
            if (curr.id === id) acc.push({ ...curr, count });
            else acc.push(curr);
            return acc;
          }, [] as Job[]),
        );
        return count;
      },
    }),
  job_processing_count: ({
    id,
    enabled,
    queryClient,
    initialData,
  }: Pollers & {
    initialData?: Awaited<ReturnType<typeof getProcessingCount>>;
  }) =>
    queryOptions({
      initialData,
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      queryKey: [...jobQueries.job({ id }).queryKey, 'processing_count'],
      queryFn: async () => {
        const processing_count = await getProcessingCount(id);
        queryClient.setQueryData<Job[]>(jobsQueryKeys.jobs().queryKey, (prev) =>
          prev.reduce((acc, curr) => {
            if (curr.id === id) acc.push({ ...curr, processing_count });
            else acc.push(curr);
            return acc;
          }, [] as Job[]),
        );
        return processing_count;
      },
    }),
  scoring_param: ({
    id,
    enabled,
    queryClient,
    initialData,
  }: Pollers & {
    initialData?: Awaited<ReturnType<typeof getScoringParam>>;
  }) =>
    queryOptions({
      initialData,
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      refetchInterval: enabled ? 5000 : false,
      queryKey: [...jobQueries.job({ id }).queryKey, 'scoring_parameters'],
      queryFn: async () => {
        const polledData = await getScoringParam(id);
        queryClient.setQueryData<Job[]>(jobsQueryKeys.jobs().queryKey, (prev) =>
          prev.reduce((acc, curr) => {
            if (curr.id === id) acc.push({ ...curr, ...polledData });
            else acc.push(curr);
            return acc;
          }, [] as Job[]),
        );
        return polledData;
      },
    }),
  application_scoring: ({ id, enabled, queryClient }: Pollers) =>
    queryOptions({
      enabled,
      gcTime: enabled ? GC_TIME : 0,
      refetchInterval: enabled ? 5000 : false,
      queryKey: [...jobQueries.job({ id }).queryKey, 'application_scoring'],
      queryFn: async () => {
        const { queryKey: locationQueryKey } = jobDashboardQueryKeys.locations({
          id,
        });
        const { queryKey: matchesQueryKey } = jobDashboardQueryKeys.matches({
          id,
        });
        const { queryKey: skillsQueryKey } = jobDashboardQueryKeys.skills({
          id,
        });
        const { queryKey: tenureAndExperienceQueryKey } =
          jobDashboardQueryKeys.tenureAndExperience({
            id,
          });
        const newApplicationsQueryKey = [
          ...applicationsQueries.all({
            job_id: id,
          }).queryKey,
          { status: 'new' },
        ];
        const { queryKey: processingCountQueryKey } =
          jobQueries.job_processing_count({
            id,
          });
        await Promise.allSettled([
          queryClient.refetchQueries({ queryKey: locationQueryKey }),
          queryClient.refetchQueries({ queryKey: matchesQueryKey }),
          queryClient.refetchQueries({ queryKey: skillsQueryKey }),
          queryClient.refetchQueries({ queryKey: tenureAndExperienceQueryKey }),
          queryClient.refetchQueries({ queryKey: newApplicationsQueryKey }),
          queryClient.refetchQueries({ queryKey: processingCountQueryKey }),
          queryClient.refetchQueries({
            queryKey: applicationsQueries.locationFilters({ job_id: id })
              .queryKey,
          }),
        ]);
      },
    }),
};

type Pollers = JobRequisite &
  Partial<{ enabled: boolean; queryClient: QueryClient }>;

export type JobRequisite = Pick<DatabaseTable['public_jobs'], 'id'>;

export { jobQueries };

const getScoringParam = async (id: string) =>
  (
    await supabase
      .from('public_jobs')
      .select(
        'scoring_criteria_loading, draft, parameter_weights, description_hash',
      )
      .eq('id', id)
      .single()
      .throwOnError()
  ).data;

const getProcessingCount = async (id: string) =>
  (
    await supabase
      .rpc('getjob', {
        jobid: id,
      })
      .single()
      .throwOnError()
  ).data.processing_count as Job['processing_count'];

const getApplicationCount = async (id: string) =>
  (
    await supabase
      .rpc('getsectioncounts', {
        jobid: id,
      })
      .throwOnError()
  ).data;
