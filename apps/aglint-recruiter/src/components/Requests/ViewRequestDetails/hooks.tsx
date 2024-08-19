import { useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

export const useMeetingList = ({ session_ids }: { session_ids: string[] }) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_meeting_list', session_ids],
    refetchInterval: 30000,
    refetchOnMount: true,
    queryFn: () => getMeetingsList({ session_ids }),
    gcTime: 20000,
    enabled: !!session_ids && !!session_ids.length,
  });

  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['get_meeting_list', session_ids],
    });
  return { ...query, refetch };
};

export async function getMeetingsList({
  session_ids,
}: {
  session_ids: string[];
}) {
  const [meeting_details, meeting_interviewers] = await Promise.allSettled([
    await supabase
      .from('meeting_details')
      .select()
      .in('session_id', session_ids)
      .throwOnError(),
    await supabase
      .from('meeting_interviewers')
      .select()
      .in('session_id', session_ids)
      .throwOnError(),
  ]);

  return {
    meeting_details:
      meeting_details.status === 'fulfilled' && meeting_details.value.data,
    meeting_interviewers:
      meeting_interviewers.status === 'fulfilled' &&
      meeting_interviewers.value.data,
  };
}
