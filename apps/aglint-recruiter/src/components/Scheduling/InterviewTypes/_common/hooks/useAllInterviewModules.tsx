import { useQuery } from '@tanstack/react-query';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';

import { fetchInterviewModules } from '../../DetailPage/_common/utils/utils';
import { QueryKeysInteviewModules } from '../../queries/type';

export const useAllInterviewModules = () => {
  const { recruiter } = useAuthDetails();
  const query = useQuery({
    queryKey: QueryKeysInteviewModules.INTERVIEW_MODULES,
    queryFn: () => fetchInterviewModules(recruiter.id),
    enabled: !!recruiter.id,
    refetchOnMount: true,
  });
  return query;
};
