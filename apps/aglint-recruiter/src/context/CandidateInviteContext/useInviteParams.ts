import { useRouterPro } from '@/hooks/useRouterPro';
import type { BodyParamsCandidateInvite } from '@/pages/api/scheduling/invite';
import dayjs from '@/utils/dayjs';

export const useInviteParams = (): BodyParamsCandidateInvite & {
  enabled: boolean;
} => {
  const { queryParams: query, params } = useRouterPro<{
    id: string;
    filter_id: string;
  }>();

  const application_id = params?.id ?? null;
  const filter_id = query?.filter_id ?? null;
  const user_tz = dayjs?.tz?.guess() ?? null;
  return {
    application_id,
    filter_id,
    user_tz,
    enabled: !!(application_id && filter_id && user_tz),
  };
};
