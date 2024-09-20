/* eslint-disable no-unused-vars */
import {
  type DatabaseTable,
  type RecruiterUserType,
  type SocialsType,
} from '@aglint/shared-types';
import { useQueryClient } from '@tanstack/react-query';
import posthog from 'posthog-js';
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Loader } from '@/components/Common/Loader';
import { useRouterPro } from '@/hooks/useRouterPro';
import type { GetUserDetailsAPI } from '@/pages/api/getUserDetails/type';
import ROUTES from '@/utils/routing/routes';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import { type Session } from './types';
import {
  fetchUserLocation,
  getUserDetails,
  isRoutePublic,
  updateJoinedStatus,
} from './utils';

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
export interface ContextValue {
  userCountry: string | null;
  recruiter: GetUserDetailsAPI['response']['recruiter'];
  userPermissions: {
    role: string;
    permissions: Partial<{
      [_key in DatabaseTable['permissions']['name']]: boolean;
    }>;
  };
  recruiter_id: string | null;
  setRecruiter: Dispatch<SetStateAction<this['recruiter']>>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  handleLogout: () => Promise<void>;
  recruiterUser: RecruiterUserType | null;
  setRecruiterUser: Dispatch<SetStateAction<RecruiterUserType>>;
  isShowFeature: (feature: Features) => boolean;
}

const defaultProvider: ContextValue = {
  userCountry: 'us',
  recruiter: null,
  userPermissions: null,
  recruiter_id: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRecruiter: () => {},
  loading: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLoading: () => {},
  handleLogout: () => Promise.resolve(),
  recruiterUser: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRecruiterUser: () => {},
  isShowFeature: () => false,
};

export const useAuthDetails = () => useContext(AuthContext);
const AuthContext = createContext<ContextValue>(defaultProvider);
const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const router = useRouterPro();
  const [recruiter, setRecruiter] = useState<ContextValue['recruiter']>(null);
  const [recruiterUser, setRecruiterUser] = useState<RecruiterUserType | null>(
    null,
  );
  const recruiter_id = recruiter?.id ?? null;
  const [userCountry, setUserCountry] = useState('us');
  const [loading, setLoading] = useState<boolean>(true);
  const [userPermissions, setUserPermissions] =
    useState<ContextValue['userPermissions']>(null);

  useEffect(() => {
    Promise.all([
      getSupabaseSession(),
      fetchUserLocation().then((res) => {
        setUserCountry(res);
      }),
    ]);
  }, []);

  async function getSupabaseSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (!data?.session || error) {
        toast.error('Session not found');
        handleLogout();
        return;
      }

      if (data?.session?.user?.id) {
        await getRecruiterDetails(data.session);
      }
    } catch (err) {
      router.push(ROUTES['/login']());
      handleLogout();
    }
  }

  const getRecruiterDetails = async (userDetails: Session) => {
    const recruiterRel = await getUserDetails();
    // get user permissions
    const rolePermissions: ContextValue['userPermissions'] = {
      role: recruiterRel?.roles?.name || null,
      permissions:
        recruiterRel?.roles?.role_permissions.reduce(
          (prev, curr) => {
            prev[curr.permissions.name] = true;
            return prev;
          },
          {} as ContextValue['userPermissions']['permissions'],
        ) || {},
    };

    setUserPermissions(rolePermissions);

    if (recruiterRel?.recruiter_user) {
      posthog.identify(userDetails.user.email, {
        Email: userDetails.user.email,
        CompanyId: recruiterRel.recruiter.id,
      });
      const recruiterUser = recruiterRel.recruiter_user;

      if (recruiterUser.status !== 'active') {
        updateJoinedStatus(recruiterUser.user_id);
      }

      setRecruiterUser(recruiterUser);
      setRecruiter({
        ...recruiterRel.recruiter,
        socials: recruiterRel.recruiter?.socials as unknown as SocialsType,
      });
      setLoading(false);
    } else {
      toast.error('Something went wrong! Please try logging in again.');
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut({
      scope: 'local',
    });
    queryClient.removeQueries();
    posthog.reset();
    if (!error) {
      router.push(ROUTES['/login']());
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const redirect = window.location.href;
      if (isRoutePublic(router.pathName)) return;
      else if (!loading && !recruiterUser?.user_id)
        router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
    }
  }, [router.isReady, loading]);

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
        userCountry,
        recruiter,
        userPermissions,
        recruiter_id,
        setRecruiter,
        loading,
        setLoading,
        handleLogout,
        recruiterUser,
        setRecruiterUser,
        isShowFeature,
      }}
    >
      {loading ? <AuthLoader /> : children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

const AuthLoader = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Loader />
    </div>
  );
};
