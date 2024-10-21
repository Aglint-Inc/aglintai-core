import type { CompletedRequest } from '@/routers/requests/read/completedRequest';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useCompletedRequests = (
  input: CompletedRequest['input'],
): ProcedureQuery<CompletedRequest> =>
  api.requests.read.completedRequest.useQuery(input);
