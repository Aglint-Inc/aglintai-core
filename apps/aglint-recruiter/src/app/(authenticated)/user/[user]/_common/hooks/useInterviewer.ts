import { useRouterPro } from '@/hooks/useRouterPro';
import type { GetInterviewerDetails } from '@/routers/interviewers/interviewer_detail';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';
export type InterviewerDetailType = NonNullable<
  Awaited<ReturnType<typeof useInterviewer>>['data']
>;

export const useInterviewer = () => {
  const query = useGetUserDetailsProcedure();
  return { ...query, data: query.data! };
};

const useGetUserDetailsProcedure =
  (): ProcedureQuery<GetInterviewerDetails> => {
    const router = useRouterPro();
    const user_id = router.params.user as string;
    return api.interviewers.get_user_details.useQuery({ user_id });
  };
