import type { ApplicantRequest } from '@/routers/requests/read/applicantRequest';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';

export const useApplicantRequests = (
  input: ApplicantRequest['input'],
): ProcedureQuery<ApplicantRequest> =>
  api.requests.read.applicantRequest.useQuery(input);
