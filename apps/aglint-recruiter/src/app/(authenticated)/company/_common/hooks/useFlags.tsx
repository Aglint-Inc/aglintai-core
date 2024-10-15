import type { Flags } from '@/routers/tenant/flags';
import { api } from '@/trpc/client';

type Features =
  | 'SCORING'
  | 'INTEGRATIONS'
  | 'ROLES'
  | 'REQUESTS'
  | 'WORKFLOW'
  | 'SCHEDULING'
  | 'ANALYTICS'
  | 'CANDIDATE_PORTAL'
  | 'REPORTS'
  | 'AGENT'
  | 'THEMES';

type Output = Flags['output'] & ReturnType<typeof useShowFlag>;

export const useFlags = (): Output => {
  const preferences = api.tenant.flags.useSuspenseQuery(undefined, {
    staleTime: Infinity,
  })[0];

  const { isShowFeature } = useShowFlag(preferences);

  return { ...preferences, isShowFeature };
};

const useShowFlag = (preferences: Flags['output']) => {
  const isShowFeature = (feature: Features) =>
    showFeature(feature, preferences);
  return { isShowFeature };
};

const showFeature = (feature: Features, preferences: Flags['output']) => {
  if (preferences) {
    const recruiterPref: Record<Features, boolean> = {
      SCORING: preferences.scoring,
      INTEGRATIONS: preferences.integrations,
      ROLES: Boolean(preferences.roles),
      REQUESTS: preferences.request,
      WORKFLOW: preferences.workflow,
      SCHEDULING: preferences.scheduling,
      ANALYTICS: preferences.analytics,
      CANDIDATE_PORTAL: preferences.candidate_portal,
      AGENT: preferences.agent,
      REPORTS: preferences.reports,
      THEMES: preferences.themes,
    };
    return recruiterPref[feature];
  }
  return false;
};
