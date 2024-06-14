import { DatabaseTable } from '@aglint/shared-types';
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import { GetInterviewPlansType } from '@/src/pages/api/scheduling/get_interview_plans';
import { supabase } from '@/src/utils/supabase/client';

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
  interview: ({
    application_id,
    job_id,
    placeholderData,
    enabled,
  }: ToggleParams) =>
    queryOptions({
      placeholderData: placeholderData?.interview,
      enabled: enabled && !!application_id && !!job_id,
      gcTime: application_id ? 1 * 60_000 : 0,
      refetchOnMount: true,
      queryKey: [
        ...applicationQuery.application({ application_id, job_id }).queryKey,
        'interview',
      ],
      queryFn: () => getApplicationInterview({ application_id, job_id }),
    }),
  tasks: ({ application_id, job_id, enabled }: ToggleParams) =>
    queryOptions({
      enabled: enabled && !!application_id && !!job_id,
      gcTime: application_id ? 1 * 60_000 : 0,
      refetchOnMount: true,
      queryKey: [
        ...applicationQuery.application({ application_id, job_id }).queryKey,
        'tasks',
      ],
      queryFn: () => getApplicationTasks({ application_id }),
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
    meta?: Awaited<ReturnType<typeof getApplicationMeta>>;
    details?: Awaited<ReturnType<typeof getApplicationDetails>>;
    interview?: Awaited<ReturnType<typeof getApplicationInterview>>;
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
        'name, city, email, phone, current_job_title, resume_processing_state, processing_status, resume_score, badges, bookmarked, file_url',
      )
      .eq('id', application_id)
      .single()
      .throwOnError()
  ).data;
};

const getApplicationDetails = async ({
  application_id,
}: Pick<Params, 'application_id'>) => {
  const { candidate_files, score_json } = (
    await supabase
      .from('applications')
      .select(
        'score_json, overall_score, processing_status, candidate_files(resume_json)',
      )
      .eq('id', application_id)
      .not('candidate_files.resume_json', 'is', null)
      .single()
      .throwOnError()
  ).data;
  return {
    score_json,
    resume_json: candidate_files?.resume_json,
  };
};

const getApplicationInterview = async ({
  application_id,
  job_id,
}: Pick<Params, 'application_id' | 'job_id'>) => {
  const sessions = (
    (
      await supabase
        .from('application_view')
        .select('meeting_details')
        .eq('id', application_id)
        .single()
        .throwOnError()
    )?.data?.meeting_details ?? []
  ).sort((a, z) => a.session_order - z.session_order);
  if (sessions.length) return sessions;
  const plans: typeof sessions = (
    (
      (await axios.get(`/api/scheduling/get_interview_plans?job_id=${job_id}`))
        ?.data as GetInterviewPlansType['respone']
    )?.interview_session ?? []
  )
    .sort((a, z) => a.session_order - z.session_order)
    .map(
      ({
        session_duration,
        name,
        session_type,
        schedule_type,
        session_order,
      }) => ({
        session_duration,
        session_name: name,
        session_type,
        schedule_type,
        status: 'not_scheduled',
        session_order,
        date: null,
      }),
    );
  return plans;
};

const getApplicationTasks = async ({
  application_id,
}: Pick<Params, 'application_id'>) =>
  (
    await supabase
      .from('new_tasks')
      .select('id, name, created_by, status')
      .eq('application_id', application_id)
      .order('created_at', { ascending: false })
      .throwOnError()
  ).data;
