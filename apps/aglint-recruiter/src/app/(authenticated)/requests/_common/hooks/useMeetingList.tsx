import { api } from '@/trpc/client';

export const useMeetingList = api.requests.utils.requestSessions.useQuery;
