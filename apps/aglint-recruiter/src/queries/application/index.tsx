import { DatabaseTable } from '@aglint/shared-types';
import { queryOptions } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { jobQueryKeys } from '../job/keys';

const SELECT_QUERY =
  '*, candidates(* , candidate_files(created_at, candidate_id, file_url, resume_json, type))';

export const applicationQuery = {
  all: ({ job_id }: ApplicationAllQueryPrerequistes) => ({
    queryKey: [
      ...jobQueryKeys.job({ id: job_id }).queryKey,
      'application',
    ] as const,
  }),
  application: ({ application_id, job_id }: Params) =>
    queryOptions({
      enabled: !!application_id && !!job_id,
      gcTime: application_id ? 5 * 60_000 : 0,
      queryKey: [
        ...applicationQuery.all({ job_id }).queryKey,
        { application_id },
      ] as const,
      queryFn: () => getApplication({ application_id }),
    }),
};

type ApplicationAllQueryPrerequistes = {
  job_id: DatabaseTable['public_jobs']['id'];
};

type Params = ApplicationAllQueryPrerequistes & {
  application_id: DatabaseTable['applications']['id'];
};

const getApplication = async ({
  application_id,
}: Pick<Params, 'application_id'>) => {
  const { candidates, ...application } = (
    await supabase
      .from('applications')
      .select(SELECT_QUERY)
      .eq('id', application_id)
      .single()
      .throwOnError()
  ).data;
  if (!candidates) return { ...application, candidate: null, resume: null };
  const { candidate_files, ...candidate } = candidates;
  const resume = (candidate_files ?? []).find(({ type }) => type === 'resume');
  return { ...application, candidate, resume };
};
