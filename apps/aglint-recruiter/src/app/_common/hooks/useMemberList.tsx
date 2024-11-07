import { api } from '@/trpc/client';

export const useMemberList = (includeSupended = true, isCalendar = false) => {
  const query = api.scheduling.get_members.useQuery({
    includeSupended,
    isCalendar,
  });

  return { ...query, data: query?.data ?? [] };
};
