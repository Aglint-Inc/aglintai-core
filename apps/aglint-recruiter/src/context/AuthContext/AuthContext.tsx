/* eslint-disable no-unused-vars */
import {
  DatabaseTable,
  RecruiterUserType,
  SocialsType,
} from '@aglint/shared-types';
import { Stack } from '@mui/material';
import posthog from 'posthog-js';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { LoaderSvg } from '@/devlink/LoaderSvg';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import type { GetUserDetailsAPI } from '@/src/pages/api/getUserDetails/type';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { Session } from './types';
import {
  fetchUserLocation,
  getUserDetails,
  isRoutePublic,
  updateJoinedStatus,
} from './utils';

export interface ContextValue {
  userCountry: string | null;
  recruiter: GetUserDetailsAPI['response']['recruiter'];
  userPermissions: {
    role: string;
    permissions: Partial<{
      [key in DatabaseTable['permissions']['name']]: boolean;
    }>;
  };
  recruiter_id: string | null;
  setRecruiter: Dispatch<SetStateAction<this['recruiter']>>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  handleLogout: () => Promise<void>;
  recruiterUser: RecruiterUserType | null;
  setRecruiterUser: Dispatch<SetStateAction<RecruiterUserType>>;
}

const defaultProvider: ContextValue = {
  userCountry: 'us',
  recruiter: null,
  userPermissions: null,
  recruiter_id: null,
  setRecruiter: () => {},
  loading: true,
  setLoading: () => {},
  handleLogout: () => Promise.resolve(),
  recruiterUser: null,
  setRecruiterUser: () => {},
};

export const useAuthDetails = () => useContext(AuthContext);
const AuthContext = createContext<ContextValue>(defaultProvider);
const AuthProvider = ({ children }) => {
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

      if (router.pathName !== ROUTES['/loading']() && data?.session?.user?.id) {
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
      }}
    >
      {loading ? <AuthLoader /> : children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

const AuthLoader = () => {
  return (
    <Stack height={'100vh'} justifyContent={'center'} alignItems={'center'}>
      <LoaderSvg />
    </Stack>
  );
};
