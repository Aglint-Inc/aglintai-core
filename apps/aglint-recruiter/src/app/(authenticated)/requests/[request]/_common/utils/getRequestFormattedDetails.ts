import { type getRequestProgress } from '@/queries/requests';

export const getRequestFormattedDetails = (
  request_progress: Awaited<ReturnType<typeof getRequestProgress>>,
  request_workflow: Awaited<ReturnType<typeof getRequestWorkflow>>,
) => {
  const scheduleFlow;
  return [];
};
