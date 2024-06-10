import { DatabaseTable } from '@aglint/shared-types';
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { jobQueryKeys } from '../job/keys';
import { diffApplication, updateApplication } from '../job-applications';

export const applicationQuery = {
  all: ({ job_id }: ApplicationAllQueryPrerequistes) => ({
    queryKey: [
      ...jobQueryKeys.job({ id: job_id }).queryKey,
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
      placeholderData,
      enabled: !!application_id && !!job_id,
      gcTime: application_id ? 1 * 60_000 : 0,
      queryKey: [
        ...applicationQuery.application({ application_id, job_id }).queryKey,
        'meta',
      ],
      queryFn: () => getApplicationMeta({ application_id }),
    }),
  details: ({ application_id, job_id }: Params) =>
    queryOptions({
      enabled: !!application_id && !!job_id,
      gcTime: application_id ? 1 * 60_000 : 0,
      queryKey: [
        ...applicationQuery.application({ application_id, job_id }).queryKey,
        'details',
      ],
      queryFn: () => getApplicationDetails({ application_id }),
    }),
};

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
  placeholderData?: Awaited<ReturnType<typeof getApplicationMeta>>;
};

const getApplicationMeta = async ({
  application_id,
}: Pick<Params, 'application_id'>) => {
  return (
    await supabase
      .from('application_view')
      .select()
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
      .select('score_json, candidate_files(resume_json)')
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
