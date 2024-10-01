import { api } from '@/trpc/client';

export const useCompletedRequests = api.requests.read.completedRequest.useQuery;
