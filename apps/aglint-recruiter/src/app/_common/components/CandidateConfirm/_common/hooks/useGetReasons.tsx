import type { GetSchedulingReasonsCandidateInvite } from '@/routers/scheduling/candidate_invite/get_scheduling_reason';
import type { ProcedureQuery } from '@/server/api/trpc';
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
  const query = useGetReasonsProcedure({
    session_ids,
    application_id,
    recruiter_id,
  });

  return { ...query, data: query.data! };
};

const useGetReasonsProcedure = (
  input: GetSchedulingReasonsCandidateInvite['input'],
): ProcedureQuery<GetSchedulingReasonsCandidateInvite> =>
  api.scheduling.candidate_invite.get_scheduling_reason.useQuery(input);
