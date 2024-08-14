import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

import { FilterCandidateState } from '../filter-store';

const ROWS = 30;

export const useAllInterviewSchedules = ({
  filter,
  rec_id,
  count,
  isLoading,
}: {
  filter: FilterCandidateState['filter'];
  rec_id: string;
  count: number;
  isLoading: boolean;
}) => {
  const query = useInfiniteQuery({
    queryKey: ['all_candidates_schedules', { filter }],
    initialPageParam: { index: 0, rec_id, ...filter },
    enabled: !!rec_id && !isLoading,
    maxPages: Math.trunc(count / ROWS) + (count % ROWS ? 1 : 0) + 1,
    placeholderData: keepPreviousData,
    getPreviousPageParam: (firstPage) =>
      firstPage?.[0]
        ? {
            index: firstPage[0].index,
            filter,
            rec_id,
          }
        : undefined,
    getNextPageParam: (lastPage) => {
      const len = lastPage?.length ?? 0;
      if (!len) return undefined;
      const index = lastPage[len - 1].index + 1;
      if (!count || index >= count) return undefined;
      return {
        index,
        filter,
        rec_id,
      };
    },
    queryFn: fetchData,
  });
  return query;
};

export type ApplicationList = Awaited<ReturnType<typeof fetchData>>;

export const useGetCount = ({ recruiter_id }: { recruiter_id: string }) => {
  const queryKey = ['all_candidates_schedules', { recruiter_id }];
  const query = useQuery({
    queryKey: queryKey,
    queryFn: async () => getCount(recruiter_id),
    enabled: !!recruiter_id,
    refetchOnWindowFocus: true,
  });

  return { ...query };
};

const getCount = async (recruiter_id: string) => {
  const { count } = await supabase
    .from('interview_data_view')
    .select('*', {
      count: 'exact',
      head: true,
    })
    .eq('recruiter_id', recruiter_id)
    .throwOnError();

  return count;
};

const fetchData = async ({
  pageParam,
}: {
  pageParam: {
    index: number;
    rec_id: string;
  } & FilterCandidateState['filter'];
}) => {
  const {
    index,
    rec_id,
    job_ids,
    textSearch,
    department_ids,
    coordinator_ids,
  } = pageParam;

  const query = supabase
    .from('interview_data_view')
    .select()
    .eq('recruiter_id', rec_id)
    .range(index, index + ROWS - 1)
    .order('last_log_time', { ascending: false });

  if (job_ids?.length) {
    query.in('public_jobs->>id', job_ids);
  }

  if (department_ids?.length) {
    query.in('public_jobs->>department_id', department_ids);
  }

  if (coordinator_ids?.length) {
    query.in(
      'public_jobs->>recruiting_coordinator',
      coordinator_ids.map((user) => user.user_id),
    );
  }

  if (textSearch) {
    query.ilike('search_query', `%${textSearch}%`);
  }

  const applications = (await query.throwOnError()).data.map(
    (application, i) => ({ ...application, index: index + i }),
  );
  return applications;
};
