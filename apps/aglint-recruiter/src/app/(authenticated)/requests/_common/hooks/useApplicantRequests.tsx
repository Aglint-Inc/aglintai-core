import { api } from '@/trpc/client';

export const useApplicantRequests = api.requests.read.applicantRequest.useQuery;
