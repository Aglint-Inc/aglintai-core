import { useRouter } from 'next/router';

import { api } from '@/trpc/client';

export type InterviewerDetailType = Awaited<
  ReturnType<typeof useInterviewer>
>['data'];
export const useInterviewer = () => {
  const router = useRouter();
  const user_id = router.query.user_id as string;
  return api.interviewers.get_user_details.useQuery({ user_id });
};
