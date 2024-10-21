import { useRouterPro } from '@/hooks/useRouterPro';
import { type InterviewStages } from '@/routers/application/interview_stages';
import { type ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useInterviewStages = () => {
  const router = useRouterPro();
  const utils = api.useUtils();
  const application_id = router.params.application as string;
  const query = useInterviewStagesProcedure({ application_id });
  const refetch = () =>
    utils.application.interview_stages.invalidate({ application_id });
  return { ...query, data: query.data || [], refetch, application_id };
};

const useInterviewStagesProcedure = (
  input: InterviewStages['input'],
): ProcedureQuery<InterviewStages> =>
  api.application.interview_stages.useQuery(input);

export type StageWithSessions = ReturnType<typeof useInterviewStages>['data'];
