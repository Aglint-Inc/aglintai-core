import type { DatabaseTable } from '@aglint/shared-types';
import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { GC_TIME } from '..';

export type JobRequisite = Pick<DatabaseTable['public_jobs'], 'id'>;
export const useJobRead = (args: JobRequisite) => {
  const { id } = args;
  return useQuery({
    queryKey: ['as'],
    queryFn: () => jobRead({ id }),
    enabled: !!id,
    gcTime: id ? GC_TIME : 0,
  });
};

const jobRead = async ({ id }: Pick<DatabaseTable['public_jobs'], 'id'>) => {
  return (
    await supabase
      .from('public_jobs')
      .select('*')
      .eq('id', id)
      .single()
      .throwOnError()
  ).data;
};
