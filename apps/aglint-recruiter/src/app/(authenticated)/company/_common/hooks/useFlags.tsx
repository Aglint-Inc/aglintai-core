import { useCallback } from 'react';

import { api, TRPC_CLIENT_CONTEXT } from '@/trpc/client';

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

export const useFlags = () => {
  const preferences = api.tenant.flags.useSuspenseQuery(undefined, {
    trpc: TRPC_CLIENT_CONTEXT,
  })[0];

  const isShowFeature = useCallback(
    (feature: Features) => {
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
    },
    [preferences],
  );

  return { ...preferences, isShowFeature };
};
