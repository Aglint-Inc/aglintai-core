import { DatabaseTable } from '@aglint/shared-types';
import { queryOptions } from '@tanstack/react-query';

import { jobQueryKeys } from '../job/keys';
import { supabase } from '@/src/utils/supabase/client';

export const applicationQuery = {
  all: ({ job_id }: ApplicationAllQueryPrerequistes) => ({
    queryKey: [...jobQueryKeys.job({ id: job_id }).queryKey, 'application'] as const,
  }),
  application: ({ application_id, job_id }: PageParams) =>
    queryOptions({
      queryKey: [
        ...applicationQuery.all({ job_id }).queryKey,
        { application_id },
      ] as const,
      queryFn: 
    }),
};

type ApplicationAllQueryPrerequistes = {
  job_id: DatabaseTable['public_jobs']['id'];
};

type Params = ApplicationAllQueryPrerequistes & {
  application_id: DatabaseTable['applications']['id'];
};


const getApplication = async ({
  params: {application_id},
}: {
  params: Params
}) => {
  return supabase
    .from('applications')
    .select()
    .eq('id', application_id);

  const applications = (await query.throwOnError()).data.map(
    (application, i) => ({ ...application, index: index + i }),
  );
  return applications;
};