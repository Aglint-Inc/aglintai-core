import { useRouterPro } from '@/hooks/useRouterPro';
import { api } from '@/trpc/client';
export type InterviewerDetailType = NonNullable<
  Awaited<ReturnType<typeof useInterviewer>>['data']
>;

export const useInterviewer = () => {
  const router = useRouterPro();
  const user_id = router.params.user as string;
  return api.interviewers.get_user_details.useQuery({ user_id });
};
