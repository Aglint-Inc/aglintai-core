import { useQuery } from '@tanstack/react-query';
import { fetchInterviewModules } from 'src/app/(authenticated)/_interview-pool/[pool]/_common/utils/utils';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';

export const useInterviewModules = ({
  recruiter_id,
  user_id,
}: {
  recruiter_id: string;
  user_id: string;
}) => {
  const { recruiter } = useAuthDetails();
  const query = useQuery({
    queryKey: ['my_interview_module'],
    queryFn: () =>
      fetchInterviewModules(recruiter_id).then((data) =>
        data.filter((item) =>
          Boolean(item.users.find((user) => user.user_id === user_id)),
        ),
      ),
    enabled: !!recruiter.id,
    refetchOnWindowFocus: false,
  });
  return query;
};
