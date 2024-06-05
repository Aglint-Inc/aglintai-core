/* eslint-disable no-unused-vars */
import { DatabaseEnums, DatabaseTableUpdate } from '@aglint/shared-types';
import {
  RecruiterRelationsType,
  RecruiterType,
  RecruiterUserType,
  SocialsType,
} from '@aglint/shared-types';
import { Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { LoaderSvg } from '@/devlink/LoaderSvg';
import { API_getMembersWithRole } from '@/src/pages/api/getMembersWithRole/type';
import { API_setMembersWithRole } from '@/src/pages/api/setMembersWithRole/type';
import { featureFlag } from '@/src/utils/Constants';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { Session } from './types';

export interface ContextValue {
  userDetails: Session | null;
  userCountry: string | null;
  setUserDetails: (details: Session | null) => void;
  recruiter: RecruiterType | null;
  recruiter_id: string | null;
  setRecruiter: Dispatch<SetStateAction<RecruiterType>>;
  allRecruiterRelation: RecruiterRelationsType[];
  setAllRecruiterRelation: Dispatch<SetStateAction<RecruiterRelationsType[]>>;
  loading: boolean;
  handleUpdateProfile: (userMeta: RecruiterUserType) => Promise<boolean>;
  handleUpdateEmail: (email: string, showToast?: boolean) => Promise<boolean>;
  setLoading: (loading: boolean) => void;
  handleLogout: () => Promise<void>;
  recruiterUser: RecruiterUserType | null;
  setRecruiterUser: Dispatch<SetStateAction<RecruiterUserType>>;
  members: RecruiterUserType[];
  setMembers: Dispatch<SetStateAction<RecruiterUserType[]>>;
  handelMemberUpdate: (x: {
    user_id: string;
    data: DatabaseTableUpdate['recruiter_user'] & {
      role?: DatabaseEnums['user_roles'];
      manager_id?: string;
    };
  }) => Promise<boolean>;
  isAllowed: (
    roles: DatabaseEnums['user_roles'][],
    flags?: featureFlag[],
  ) => boolean;
  allowAction: <T extends Function | ReactNode>(
    func: T,
    role: DatabaseEnums['user_roles'][],
  ) => T;
  isAssessmentEnabled: boolean;
  isScreeningEnabled: boolean;
  isSchedulingEnabled: boolean;
}

const defaultProvider = {
  userDetails: null,
  userCountry: 'us',
  setUserDetails: () => {},
  handleUpdateProfile: undefined,
  handleUpdateEmail: undefined,
  handleUpdatePassword: undefined,
  recruiter: null,
  recruiter_id: null,
  setRecruiter: () => {},
  allRecruiterRelation: null,
  setAllRecruiterRelation: () => {},
  loading: true,
  setLoading: () => {},
  handleLogout: () => Promise.resolve(),
  recruiterUser: null,
  setRecruiterUser: () => {},
  members: [],
  setMembers: () => {},
  handelMemberUpdate: (x) => Promise.resolve(true),
  isAllowed: (role) => true,
  allowAction: (func, role) => func,
  isAssessmentEnabled: false,
  isScreeningEnabled: false,
  isSchedulingEnabled: false,
};

export const useAuthDetails = () => useContext(AuthContext);
const AuthContext = createContext<ContextValue>(defaultProvider);
const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<Session | null>(null);
  const [recruiter, setRecruiter] = useState<RecruiterType | null>(null);
  const [recruiterUser, setRecruiterUser] = useState<RecruiterUserType | null>(
    null,
  );
  const recruiter_id = recruiter?.id ?? null;
  const [allRecruiterRelation, setAllRecruiterRelation] =
    useState<RecruiterRelationsType[]>(null);
  const [userCountry, setUserCountry] = useState('us');
  const [loading, setLoading] = useState<boolean>(true);
  const [members, setMembers] = useState<RecruiterUserType[]>([]);

  const getMembersFromDB = async (recruiter_id: string, user_id: string) => {
    setMembers(await getMembers(recruiter_id));
  };

  async function getSupabaseSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (!data?.session || error) {
        toast.error('Session not found');
        handleLogout();
        return;
      }
      if (data?.session?.user?.new_email) {
        const { data: newData, error } = await supabase.auth.refreshSession();
        if (!error) {
          setUserDetails(newData.session);
        }
      } else {
        setUserDetails(data.session);
      }
      if (router.route !== ROUTES['/loading']() && data?.session?.user?.id) {
        await getRecruiterDetails(data.session);
      }
    } catch (err) {
      router.push(ROUTES['/login']());
      handleLogout();
    }
  }

  const getRecruiterDetails = async (userDetails: Session) => {
    const { data: recruiterRel, error: errorRel } = await supabase
      .from('recruiter_relation')
      .select(
        '*, recruiter(*, company_email_template(*)), recruiter_user!public_recruiter_relation_user_id_fkey(*)',
      )
      .match({ user_id: userDetails.user.id, is_active: true })
      .single();

    if (!errorRel && recruiterRel?.recruiter_user) {
      posthog.identify(userDetails.user.email, {
        Email: userDetails.user.email,
        CompanyId: recruiterRel.recruiter.id,
      });
      const recruiterUser = recruiterRel.recruiter_user;
      (recruiterUser.join_status || '').toLocaleLowerCase() === 'invited' &&
        handleUpdateProfile({ join_status: 'joined' }, userDetails.user.id);
      setRecruiterUser({
        ...recruiterUser,
        role: recruiterRel.role,
        manager_id: recruiterRel.manager_id,
      });
      setRecruiter({
        ...recruiterRel.recruiter,
        socials: recruiterRel.recruiter?.socials as unknown as SocialsType,
      });
      setLoading(false);
      if (
        [
          'admin',
          'recruiter',
          'hiring_manager',
          'recruiting_coordinator',
        ].includes(recruiterRel.role)
      ) {
        await getMembersFromDB(recruiterRel.recruiter.id, userDetails.user.id);
      }
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

  const fetchUserLocation = async () => {
    try {
      const res = await fetch('/api/getUserLocation');
      const data = await res.json();

      const country = data.country; // Extract the country code from the response
      setUserCountry(country?.toLowerCase() ?? 'us'); // Set the default country based on the user's location
    } catch (error) {
      setUserCountry('us');
    }
  };

  const handleUpdateProfile = async (
    details: Partial<RecruiterUserType>,
    id?: string,
  ): Promise<boolean> => {
    const { data, error } = await supabase
      .from('recruiter_user')
      .update({
        ...details,
        manager_id: undefined,
        role: undefined,
        last_login: undefined,
      })
      .eq('user_id', id || userDetails.user.id)
      .select()
      .single();
    if (!error) {
      setRecruiterUser({
        ...details,
        ...data,
      } as RecruiterUserType);
      return true;
    } else {
      toast.error(`Oops! Something went wrong. (${error.message})`);
      return false;
    }
  };

  const handleUpdateEmail = async (
    email: string,
    showToast: boolean = false,
  ): Promise<boolean> => {
    const { error } = await supabase.auth.updateUser(
      {
        email: email,
      },
      { emailRedirectTo: `${process.env.NEXT_PUBLIC_HOST_NAME}/login` },
    );
    if (error) {
      toast.error(`Oops! Something went wrong. (${error.message})`);
      return false;
    } else {
      showToast && toast.success(`Confirmation email sent.`);
      return true;
    }
  };

  const handelMemberUpdate: ContextValue['handelMemberUpdate'] = async ({
    user_id,
    data,
  }) => {
    if (!user_id && data && recruiter.id) return Promise.resolve(false);
    return updateMember({
      data: { ...data, user_id },
      recruiter_id: recruiter.id,
    }).then((data) => {
      if (data) {
        setMembers((prev) =>
          prev.map((item) => {
            return data.user_id === item.user_id
              ? ({ ...item, ...data } as RecruiterUserType)
              : item;
          }),
        );
        return true;
      }
      return false;
    });
  };

  const isAssessmentEnabled = useFeatureFlagEnabled('isNewAssessmentEnabled');
  const isScreeningEnabled = useFeatureFlagEnabled('isPhoneScreeningEnabled');
  const isSchedulingEnabled = useFeatureFlagEnabled('isSchedulingEnabled');

  // role based access
  const isAllowed: ContextValue['isAllowed'] = (roles, flags) => {
    if (recruiterUser) {
      if (flags?.length)
        for (let item of flags) {
          if (!posthog.isFeatureEnabled(item)) return false;
        }
      return roles.includes(recruiterUser.role);
    }
    return false;
  };

  const allowAction: ContextValue['allowAction'] = <
    T extends Function | ReactNode,
  >(
    func: T,
    role,
  ) => {
    if (recruiterUser && role.includes(recruiterUser.role)) {
      return func;
    }

    // Return an empty function if func is a function
    if (typeof func === 'function') {
      return (() => {}) as unknown as T;
    }
    // Return an empty fragment if func is a React node
    return (<></>) as T;
  };

  useEffect(() => {
    Promise.all([getSupabaseSession(), fetchUserLocation()]);
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const redirect = window.location.href;
      if (isRoutePublic(router.route)) return;
      else if (!loading && !userDetails?.user)
        router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
    }
  }, [router.isReady, loading]);

  useEffect(() => {
    if (router.isReady && userDetails?.user) {
      const feature = pageFeatureMapper[`/${router.pathname.split('/')[1]}`];
      if (feature && !posthog.isFeatureEnabled(feature)) {
        // eslint-disable-next-line no-console
        console.log('Feature not enabled');
        router.push(ROUTES['/jobs']());
      }
    }
  }, [router.pathname, userDetails]);

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        userCountry,
        setUserDetails,
        recruiter,
        recruiter_id,
        handleUpdateProfile,
        handleUpdateEmail,
        setRecruiter,
        loading,
        setLoading,
        handleLogout,
        recruiterUser,
        allRecruiterRelation: allRecruiterRelation,
        setAllRecruiterRelation,
        setRecruiterUser,
        members,
        setMembers,
        handelMemberUpdate,
        isAllowed,
        allowAction,
        isAssessmentEnabled,
        isScreeningEnabled,
        isSchedulingEnabled,
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

const isRoutePublic = (path = '') => {
  const whiteListedRoutes = [
    ROUTES['/login'](),
    ROUTES['/signup'](),
    ROUTES['/assessment-new'](),
    ROUTES['/candidate-phone-screening'](),
  ];
  for (const route of whiteListedRoutes) {
    if (path.startsWith(route)) {
      return true;
    }
  }
};

const pageFeatureMapper = {
  [ROUTES['/assisstant']()]: 'isAssistantEnabled',
  [ROUTES['/assessment-new']()]: 'isNewAssessmentEnabled',
  [ROUTES['/agent']()]: 'isAgentEnabled',
  [ROUTES['/screening']()]: 'isPhoneScreeningEnabled',
  [ROUTES['/support']()]: 'isSupportEnabled',
  [ROUTES['/candidates/history']()]: 'isSourcingEnabled',
};

const updateMember = ({
  data,
  recruiter_id,
}: {
  data: Omit<DatabaseTableUpdate['recruiter_user'], 'user_id'> & {
    user_id: string;
    role?: DatabaseEnums['user_roles'];
    manager_id?: string;
  };
  recruiter_id: string;
}) => {
  const body: API_setMembersWithRole['request'] = { data: data, recruiter_id };
  return axios
    .post<API_setMembersWithRole['response']>('/api/setMembersWithRole', body)
    .then(({ data }) => {
      if (data.error) throw new Error(data.error);
      return data.data;
    });
};

const getMembers = (id: string) => {
  return axios
    .post<API_getMembersWithRole['response']>('/api/getMembersWithRole', { id })
    .then(({ data }) => {
      if (data.error) throw new Error(data.error);
      return data.members;
    });
};
