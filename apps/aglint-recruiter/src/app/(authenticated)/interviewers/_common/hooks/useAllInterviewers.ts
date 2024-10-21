import { useTenant } from '@/company/hooks';
import type { GetAllInterviewers } from '@/routers/interviewers/all_interviewers';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useAllInterviewers = () => {
  const query = useAllInterviewersProcedure();
  return { ...query, data: query?.data ?? [] };
};

const useAllInterviewersProcedure = (): ProcedureQuery<GetAllInterviewers> => {
  const { recruiter_id } = useTenant();
  return api.interviewers.get_all_interviewers.useQuery({
    recruiter_id,
  });
};
