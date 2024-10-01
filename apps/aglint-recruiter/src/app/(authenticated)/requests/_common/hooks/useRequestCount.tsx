import { api } from '@/trpc/client';

export const useRequestCount = api.requests.read.requestCount.useQuery;
