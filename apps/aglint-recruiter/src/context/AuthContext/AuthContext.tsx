/* eslint-disable no-unused-vars */
import {
  type DatabaseTable,
  type RecruiterUserType,
} from '@aglint/shared-types';
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useContext,
} from 'react';

import { useTenant } from '@/company/hooks';
import { Loader } from '@/components/Common/Loader';
import type { GetUserDetailsAPI } from '@/pages/api/getUserDetails/type';

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
interface ContextValue {
  isShowFeature: (feature: Features) => boolean;
}

const defaultProvider: ContextValue = {
  isShowFeature: () => false,
};

export const useAuthDetails = () => useContext(AuthContext);

const AuthContext = createContext<ContextValue>(defaultProvider);
const AuthProvider = ({ children }) => {
  const { recruiter } = useTenant();
  const isShowFeature = useCallback(
    (feature: Features) => {
      if (recruiter?.recruiter_preferences) {
        const recruiterPref: Record<Features, boolean> = {
          SCORING: recruiter.recruiter_preferences.scoring,
          INTEGRATIONS: recruiter.recruiter_preferences.integrations,
          ROLES: recruiter.recruiter_preferences.roles,
          REQUESTS: recruiter.recruiter_preferences.request,
          WORKFLOW: recruiter.recruiter_preferences.workflow,
          SCHEDULING: recruiter.recruiter_preferences.scheduling,
          ANALYTICS: recruiter.recruiter_preferences.analytics,
          CANDIDATE_PORTAL: recruiter.recruiter_preferences.candidate_portal,
          AGENT: recruiter.recruiter_preferences.agent,
          REPORTS: recruiter.recruiter_preferences.reports,
          THEMES: recruiter.recruiter_preferences.themes,
        };
        return recruiterPref[feature];
      }
      return false;
    },
    [recruiter?.recruiter_preferences],
  );
  return (
    <AuthContext.Provider
      value={{
        isShowFeature,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

const AuthLoader = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Loader />
    </div>
  );
};
