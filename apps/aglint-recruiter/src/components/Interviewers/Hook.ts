import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { initUser } from '@/src/pages/api/interviewers';
import { supabase } from '@/src/utils/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// -------------------------------------------------------- InterviewerLoad
export type useAllInterviewerType = Awaited<
  ReturnType<typeof useAllInterviewer>
>;

export function useAllInterviewer(recruiter_id: string) {
  return useQuery({
    queryKey: ['recruiter_id', recruiter_id],
    queryFn: () => fetchAllInterviewer(recruiter_id),
    enabled: Boolean(recruiter_id),
  });
}

const fetchAllInterviewer = async (recruiter_id: string) => {
  const { data, error } = await supabase
    .from('all_interviewers')
    .select()
    .eq('recruiter_id', recruiter_id);
  if (error) throw new Error(error.message);

  return data;
};

//------------------------------------------------------------- Availability

export type useAvailabiltyWithCalType = Awaited<
  ReturnType<typeof useAvailabilty>
>;

console.log('object');

export const useAvailabilty = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const { recruiter_id } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_fetchAvailabiltyWithCal', startDate, endDate],
    refetchOnMount: true,
    queryFn: () => fetchAvailabiltyWithCal(recruiter_id, startDate, endDate),
    gcTime: 20000,
    enabled: !!recruiter_id,
  });
  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['get_fetchAvailabiltyWithCal', startDate, endDate],
    });
  return { ...query, refetch };
};

const fetchAvailabiltyWithCal = async (
  recruiter_id: string,
  startDate: string,
  endDate: string,
) => {
  return axios
    .post('/api/interviewers', {
      recruiter_id,
      startDate,
      endDate,
    })
    .then((data) => {
      return data.data.data as initUser[];
    });
};
