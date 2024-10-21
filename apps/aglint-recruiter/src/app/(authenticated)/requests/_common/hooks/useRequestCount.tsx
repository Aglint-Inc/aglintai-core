import type { RequestCount } from '@/routers/requests/read/requestCount';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useRequestCount = (
  input: RequestCount['input'],
): ProcedureQuery<RequestCount> =>
  api.requests.read.requestCount.useQuery(input);
