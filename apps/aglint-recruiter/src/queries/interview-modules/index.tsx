import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { type getInterviewModulesType } from '@/pages/api/scheduling/get_interview_modules';

import { interviewModuleKeys } from './keys';

export const useInterviewModules = () => {
  const { recruiter_id } = useAuthDetails();
  const queryClient = useQueryClient();
  const { queryKey } = interviewModuleKeys.interview_module();
  const response = useQuery({
    queryKey,
    queryFn: () => getInterviewModulesAPI(recruiter_id as string),
    enabled: !!recruiter_id,
  });
  const refetch = async () => {
    await queryClient.invalidateQueries({ queryKey });
  };
  return { ...response, refetch };
};

export const getInterviewModulesAPI = async (recruiter_id: string) => {
  return (
    await axios.get(
      `/api/scheduling/get_interview_modules?recruiter_id=${recruiter_id}`,
    )
  ).data.sort(
    (a, b) => b.order - a.order,
  ) as ReturnType<getInterviewModulesType>;
};
