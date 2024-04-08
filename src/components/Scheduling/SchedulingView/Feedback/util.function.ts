import { useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/src/utils/supabase/client';

export const useInterviewerRelations = ({
  session_ids,
}: {
  session_ids: string[];
}) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [`interviewer_relations`],
    queryFn: () => getInterviewersRelations({ session_ids }),
  });
  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: [`interviewer_relations`],
    });
  return { ...query, refetch };
};

export const getInterviewersRelations = async ({
  session_ids,
}: {
  session_ids: string[];
}) => {
  return await supabase
    .from('interview_session_relation')
    .select(' session_id, feedback, interview_module_relation(id,user_id)')
    .in('session_id', session_ids)
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data;
    });
};

export const saveInterviewerFeedback = async ({
  feedback,
  session_id,
  relation_id,
}: {
  feedback: any;
  session_id: string;
  relation_id: string;
}) => {
  return supabase
    .from('interview_session_relation')
    .update({ feedback })
    .eq('session_id', session_id)
    .eq('interview_module_relation_id', relation_id);
  // .select()
  // .single()
  // .then(({ data, error }) => {
  //   if (error) throw new Error(error.message);
  //   return data as unknown as CustomDatabase['public']['Tables']['interview_meeting_user']['Row'];
  // });
};

export const re_mapper = {
  0: 'Strongly not recommended',
  1: 'Not recommended',
  2: 'Not recommended',
  3: 'Not recommended',
  4: 'Not recommended',
  5: 'Neutral',
  6: 'Mildly recommended',
  7: 'Recommended',
  8: 'Recommended',
  9: 'Highly recommended',
  10: 'Exceptionally recommended',
};
