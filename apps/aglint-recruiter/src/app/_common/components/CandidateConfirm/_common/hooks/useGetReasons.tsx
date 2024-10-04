import { api } from '@/trpc/client';

export const useGetReasons = ({
  session_ids,
  application_id,
  recruiter_id,
}: {
  session_ids: string[];
  application_id: string;
  recruiter_id: string;
}) => {
  const query = api.scheduling.candidate_invite.get_scheduling_reason.useQuery({
    session_ids,
    application_id,
    recruiter_id,
  });

  return { ...query, data: query.data! };
};
