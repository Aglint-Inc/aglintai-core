import { DatabaseTable } from '@aglint/shared-types';
import { queryOptions } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { jobQueryKeys } from '../job/keys';

export const applicationsQueries = {
  all: ({ job_id }: ApplicationAllQueryPrerequistes) => ({
    queryKey: [...jobQueryKeys.job({ id: job_id }).queryKey, 'applications'],
  }),
  applications: ({ job_id, ...filters }: Filters) =>
    queryOptions({
      queryKey: [...applicationsQueries.all({ job_id }).queryKey, filters],
      queryFn: async () =>
        (
          await supabase
            .from('applications')
            .select('*')
            .eq('job_id', job_id)
            .limit(1)
            .single()
            .throwOnError()
        ).data,
    }),
};

type ApplicationAllQueryPrerequistes = {
  job_id: DatabaseTable['public_jobs']['id'];
};

type Filters = ApplicationAllQueryPrerequistes & {
  overall_score?: number;
};
