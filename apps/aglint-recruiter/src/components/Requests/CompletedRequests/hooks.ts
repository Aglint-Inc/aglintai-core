import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

import { CompletedRequests, useCompletedRequestsStore } from './store';
import { dayjsLocal } from '@aglint/shared-utils';
import { REQUEST_SELECT } from '@/src/queries/requests';

export const useCompletedRequests = ({
  completedFilters,
}: {
  completedFilters: CompletedRequests['completedFilters'];
}) => {
  console.log('completedFilters', completedFilters);
  const {
    recruiterUser: { user_id },
  } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_requests_Count', user_id, completedFilters],
    refetchInterval: 30000,
    refetchOnMount: true,
    queryFn: () =>
      getCompletedRequests({
        assigner_id: user_id,
        completedFilters: completedFilters,
      }),
    gcTime: 20000,
    enabled: !!user_id,
  });
  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['get_requests_Count', user_id, completedFilters],
    });
  return { ...query, refetch };
};

export const getCompletedRequests = async ({
  assigner_id,
  completedFilters,
}: {
  assigner_id: string;
  completedFilters: CompletedRequests['completedFilters'];
}) => {
  const { type, applications, jobs, assigneeList, assignerList, title, date } =
    completedFilters;

  const query = supabase
    .from('request')
    .select(REQUEST_SELECT)
    .eq('status', 'completed');

  query.or(`assigner_id.eq.${assigner_id},assignee_id.eq.${assigner_id}`);

  if (type?.length) query.or(`type.in.(${type.join(',')})`);
  if (jobs?.length)
    query.or(`job_id.in.(${jobs.join(',')})`, {
      referencedTable: 'applications',
    });
  if (applications?.length)
    query.or(`application_id.in.(${applications.join(',')})`);

  if (assignerList?.length)
    query.or(`assigner_id.in.(${assignerList.join(',')})`);
  if (assigneeList?.length)
    query.or(`assignee_id.in.(${assigneeList.join(',')})`);

  if (title?.length) {
    query.ilike('title', `%${title}%`);
  }

  if (date.length > 0) {
    let selectedDate = null;
    if (date[0] === 'today') {
      selectedDate = dayjsLocal().format('YYYY-MM-DD');
      query.gte('completed_at', selectedDate);
      query.lt('completed_at', dayjsLocal().add(1, 'day').format('YYYY-MM-DD'));
    }
    if (date[0] === 'yesterday') {
      selectedDate = dayjsLocal().add(-1, 'day').format('YYYY-MM-DD');
      query.gte('completed_at', selectedDate);
      query.lt('completed_at', dayjsLocal().add(0, 'day').format('YYYY-MM-DD'));
    }
    if (date[0] === 'last_7_days') {
      selectedDate = dayjsLocal().add(-7, 'day').format('YYYY-MM-DD');
      query.gte('completed_at', selectedDate);
      query.lte(
        'completed_at',
        dayjsLocal().add(1, 'day').format('YYYY-MM-DD'),
      );
    }
    if (date[0] === 'last_30_days') {
      selectedDate = dayjsLocal().add(-30, 'day').format('YYYY-MM-DD');
      query.gte('completed_at', selectedDate);
      query.lte(
        'completed_at',
        dayjsLocal().add(1, 'day').format('YYYY-MM-DD'),
      );
    }
  }
  console.log((await query).data.map((ele) => ele.completed_at));
  return (await query).data ?? [];
};
