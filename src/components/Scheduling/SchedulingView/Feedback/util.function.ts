import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { CustomDatabase } from '@/src/types/customSchema';
import { supabase } from '@/src/utils/supabase/client';

export const useInterviewerList = () => {
  const param = useSearchParams();
  const meeting_id = param.get('meeting_id');
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['interviewers_details'],
    queryFn: () => getInterviewers({ meeting_id }),
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['interviewers_details'] });
  return { ...query, refetch };
};

export const getInterviewers = async ({
  meeting_id,
}: {
  meeting_id: string;
}) => {
  const interviewers = await supabase
    .from('interview_meeting_user')
    .select()
    .eq('interview_meeting_id', meeting_id)
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data as unknown as CustomDatabase['public']['Tables']['interview_meeting_user']['Row'][];
    });
  if (interviewers.length) {
    const interviewersDetails = await supabase
      .from('recruiter_user')
      .select('user_id, first_name, last_name, position, profile_image')
      .in(
        'user_id',
        interviewers
          .map((da) => da.interviewer_id)
          .filter((item) => Boolean(item)),
      )
      .then(({ data: userData, error }) => {
        if (error) throw new Error(error.message);
        return userData;
      });
    const temp: { [key: string]: (typeof interviewersDetails)[number] } = {};
    interviewersDetails.forEach((detail) => (temp[detail.user_id] = detail));
    return interviewers.map((int) => ({
      ...int,
      interviewerDetails: temp[int.interviewer_id],
    }));
  } else interviewers.map((int) => ({ ...int, interviewerDetails: null }));
};

export const saveInterviewerFeedback = async ({
  feedback,
  id,
  meeting_id,
}: {
  feedback: any;
  id: string;
  meeting_id: string;
}) => {
  return supabase
    .from('interview_meeting_user')
    .update({ feedback })
    .eq('interviewer_id', id)
    .eq('interview_meeting_id', meeting_id);
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
