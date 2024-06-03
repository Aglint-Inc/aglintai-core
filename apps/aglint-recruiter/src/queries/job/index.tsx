import type { DatabaseTable } from '@aglint/shared-types';
import { queryOptions, useQuery } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { jobsQueryKeys } from '../jobs/keys';

const queries = {
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
};

export type JobRequisite = Pick<DatabaseTable['public_jobs'], 'id'>;
export const useJobRead = (args: JobRequisite) => {
  const { id } = args;
  return useQuery(queries.job({ id }));
};
