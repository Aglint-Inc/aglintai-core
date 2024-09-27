import { useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/utils/supabase/client';

export const useApplicantRequests = ({
  application_id,
}: {
  application_id: string;
}) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['get_Applicant_Requests', application_id],
    queryFn: () => getApplicantRequests(application_id),
    enabled: !!application_id,
    gcTime: 20000,
    refetchOnMount: true,
  });
  const refetch = () => {
    queryClient.invalidateQueries({
      queryKey: ['get_Applicant_Requests', application_id],
    });
  };
  return { ...query, refetch };
};

export async function getApplicantRequests(application_id: string) {
  const { data } = await supabase
    .from('request')
    .select(
      '*,assignee_details:recruiter_user!request_assignee_id_fkey(first_name, last_name, profile_image),request_relation(*,interview_session(id,name,session_duration,session_type)),applications(id, job_id, recruiter_id, public_jobs(id,job_title,departments(name)))',
    )
    .eq('application_id', application_id)
    .throwOnError();
  return data;
}
