import { type DatabaseTable } from '@aglint/shared-types';
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { getActiveSection } from '@/jobs/utils/getActiveSection';
import { supabase } from '@/utils/supabase/client';

import { jobQueries } from '../job';
import { diffApplication, updateApplication } from '../job-applications';

export const applicationQuery = {
  all: ({ job_id }: ApplicationAllQueryPrerequistes) => ({
    queryKey: [
      ...jobQueries.job({ id: job_id }).queryKey,
      'application',
    ] as const,
  }),
  application: ({ application_id, job_id }: Params) => ({
    queryKey: [
      ...applicationQuery.all({ job_id }).queryKey,
      { application_id },
    ] as const,
  }),
  tabs: ({
    job_id,
    placeholderData,
    isSchedulingEnabled,
    isScoringEnabled,
    enabled,
  }: Omit<ToggleParams, 'application_id'> &
    Partial<{
      isSchedulingEnabled: boolean;
      isScoringEnabled: boolean;
    }>) =>
    queryOptions({
      placeholderData: placeholderData?.tabs,
      enabled: enabled && !!job_id,
      gcTime: job_id ? 1 * 60_000 : 0,
      queryKey: [...applicationQuery.all({ job_id }).queryKey, 'tabs'] as const,
      queryFn: async () =>
        getActiveSection({
          isSchedulingEnabled,
          isScoringEnabled,
        }),
    }),
  meta: ({ application_id, job_id, placeholderData }: Params) =>
    queryOptions({
      placeholderData: placeholderData?.meta,
      enabled: !!application_id && !!job_id,
      gcTime: application_id ? 1 * 60_000 : 0,
      refetchOnMount: true,
      queryKey: [
        ...applicationQuery.application({ application_id, job_id }).queryKey,
        'meta',
      ],
      queryFn: () => getApplicationMeta({ application_id }),
    }),
  details: ({ application_id, job_id, placeholderData }: Params) =>
    queryOptions({
      placeholderData: placeholderData?.details,
      enabled: !!application_id && !!job_id,
      gcTime: application_id ? 1 * 60_000 : 0,
      refetchOnMount: true,
      queryKey: [
        ...applicationQuery.application({ application_id, job_id }).queryKey,
        'details',
      ],
      queryFn: () => getApplicationDetails({ application_id }),
    }),

  requests: ({ application_id, job_id, enabled }: ToggleParams) =>
    queryOptions({
      enabled: enabled && !!application_id && !!job_id,
      gcTime: application_id ? 1 * 60_000 : 0,
      refetchOnMount: true,
      queryKey: [
        ...applicationQuery.application({ application_id, job_id }).queryKey,
        'tasks',
      ],
      queryFn: () => getApplicationRequests({ application_id }),
    }),
  activity: ({
    application_id,
    job_id,
    enabled,
    placeholderData,
  }: ToggleParams) =>
    queryOptions({
      placeholderData: placeholderData?.activity,
      enabled: enabled && !!application_id && !!job_id,
      gcTime: application_id ? 1 * 60_000 : 0,
      refetchOnMount: true,
      queryKey: [
        ...applicationQuery.application({ application_id, job_id }).queryKey,
        'activity',
      ],
      queryFn: () => getApplicationActivity({ application_id }),
    }),
} as const;

export const useUpdateApplication = (params: Params) => {
  const queryClient = useQueryClient();
  const { queryKey } = applicationQuery.meta(params);
  return useMutation({
    mutationFn: updateApplication,
    onMutate: (variables) => {
      const diffedApplication = diffApplication(variables.application);
      const oldApplication = queryClient.getQueryData(queryKey);
      if (Object.keys(diffedApplication).length)
        queryClient.setQueryData(
          queryKey,
          structuredClone({ ...oldApplication, ...diffedApplication }),
        );
      return { oldApplication };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        queryKey,
        structuredClone(context.oldApplication),
      );
    },
  });
};

type ApplicationAllQueryPrerequistes = {
  job_id: DatabaseTable['public_jobs']['id'];
};

type Params = ApplicationAllQueryPrerequistes & {
  application_id: DatabaseTable['applications']['id'];
  placeholderData?: {
    tabs?: Awaited<ReturnType<typeof getActiveSection>>;
    meta?: Awaited<ReturnType<typeof getApplicationMeta>>;
    details?: Awaited<ReturnType<typeof getApplicationDetails>>;
    requests?: Awaited<ReturnType<typeof getApplicationRequests>>;
    activity?: Awaited<ReturnType<typeof getApplicationActivity>>;
  };
};

type ToggleParams = { enabled: boolean } & Params;

const getApplicationMeta = async ({
  application_id,
}: Pick<Params, 'application_id'>) => {
  return (
    await supabase
      .from('application_view')
      .select(
        'name, city, email, phone, current_job_title, resume_processing_state,timezone, processing_status, resume_score, badges, bookmarked, file_url, task_count, activity_count, status, candidate_id',
      )
      .eq('id', application_id)
      .single()
      .throwOnError()
  ).data;
};

const getApplicationDetails = async ({
  application_id,
}: Pick<Params, 'application_id'>) => {
  const { candidate_files, score_json, public_jobs, status } = (
    await supabase
      .from('applications')
      .select(
        'score_json, overall_score, processing_status, candidate_files(resume_json),status,public_jobs(id,status)',
      )
      .eq('id', application_id)
      .not('candidate_files.resume_json', 'is', null)
      .single()
      .throwOnError()
  ).data;
  return {
    score_json,
    resume_json: candidate_files?.resume_json,
    status,
    job_status: public_jobs?.status,
  };
};

const getApplicationRequests = async ({
  application_id,
}: Pick<Params, 'application_id'>) =>
  (
    await supabase
      .from('request')
      .select(
        '*,assignee_details:recruiter_user!request_assignee_id_fkey(first_name, last_name, profile_image),request_relation(*)',
      )
      .eq('application_id', application_id)
      .order('created_at', { ascending: false })
      .throwOnError()
  ).data;

const getApplicationActivity = async ({
  application_id,
}: Pick<Params, 'application_id'>) =>
  (
    await supabase
      .from('application_logs')
      .select('*, recruiter_user(first_name, last_name, profile_image)')
      .eq('application_id', application_id)
      .order('created_at', { ascending: false })
      .throwOnError()
  ).data;
