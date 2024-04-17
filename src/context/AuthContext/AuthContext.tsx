/* eslint-disable no-unused-vars */
import { Stack } from '@mui/material';
import { pageRoutes } from '@utils/pageRouting';
import { datacatalog_v1beta1 } from 'googleapis';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { LoaderSvg } from '@/devlink';
import { schedulingSettingType } from '@/src/components/Scheduling/Settings/types';
import {
  RecruiterRelationsType,
  RecruiterType,
  RecruiterUserType,
  SocialsType,
} from '@/src/types/data.types';
import { Database } from '@/src/types/schema';
import { featureFlag } from '@/src/utils/Constants';
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
  allrecruterRelation: RecruiterRelationsType[];
  setAllrecruterRelation: Dispatch<SetStateAction<RecruiterRelationsType[]>>;
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
    data: Database['public']['Tables']['recruiter_user']['Update'];
  }) => Promise<boolean>;
  isAllowed: (
    roles: Database['public']['Enums']['user_roles'][],
    flags?: featureFlag[],
  ) => boolean;
  allowAction: <T extends Function | ReactNode>(
    func: T,
    role: Database['public']['Enums']['user_roles'][],
  ) => T;
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
  allrecruterRelation: null,
  setAllrecruterRelation: () => {},
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
  const [allrecruterRelation, setAllrecruterRelation] =
    useState<RecruiterRelationsType[]>(null);
  const [userCountry, setUserCountry] = useState('us');
  const [loading, setLoading] = useState<boolean>(true);
  const [members, setMembers] = useState<RecruiterUserType[]>([]);

  const getMembersFromDB = async (recruiter_id: string, user_id: string) => {
    const { data, error } = await supabase
      .from('recruiter_relation')
      .select()
      .eq('recruiter_id', recruiter_id)
      .or(`user_id.eq.${user_id},created_by.eq.${user_id}`);
    if (!error && data.length) {
      const userIds = data.map((item) => item.user_id);
      const { data: users, error: userError } = await supabase
        .from('recruiter_user')
        .select()
        .in('user_id', userIds);
      if (!userError && users.length) {
        setMembers(users as RecruiterUserType[]);
      }
    }
    return [];
  };

  async function getSupabaseSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (!data?.session) {
        loading && setLoading(false);
      }
      if (data?.session?.user?.new_email) {
        const { data: newData, error } = await supabase.auth.refreshSession();
        if (!error) {
          setUserDetails(newData.session);
        }
      } else {
        setUserDetails(data.session);
      }
      if (router.route !== pageRoutes.LOADING && data?.session?.user?.id) {
        await getRecruiterDetails(data.session);
      }
    } catch (err) {
      router.push(pageRoutes.LOGIN);
      handleLogout();
    } finally {
      setLoading(false);
    }
  }

  const getRecruiterDetails = async (userDetails: Session) => {
    const { data: recruiterUser, error: errorUser } = await supabase
      .from('recruiter_user')
      .select('*')
      .eq('user_id', userDetails.user.id);
    if (!errorUser && recruiterUser.length > 0) {
      if (recruiterUser[0].is_suspended) {
        toast.error('Your account is Suspended.');
        return setTimeout(() => {
          handleLogout();
        }, 300);
      }
      setRecruiterUser(recruiterUser[0] as RecruiterUserType);
      (recruiterUser[0].join_status || '').toLocaleLowerCase() === 'invited' &&
        handleUpdateProfile({ join_status: 'joined' }, userDetails.user.id);
      const { data: recruiterRel, error: errorRel } = await supabase
        .from('recruiter_relation')
        .select('* , recruiter(*)')
        .match({ user_id: userDetails.user.id, is_active: true });

      if (!errorRel && recruiterRel.length > 0) {
        posthog.identify(userDetails.user.email, {
          Email: userDetails.user.email,
          CompanyId: recruiterRel[0].recruiter.id,
        });
        // posthog.setPersonPropertiesForFlags({
        //   CompanyId: recruiterRel[0].recruiter.id,
        // });
        // console.log({ cId: recruiterRel[0].recruiter.id });

        setRecruiter({
          ...recruiterRel[0].recruiter,
          socials: recruiterRel[0].recruiter?.socials as unknown as SocialsType,
        });
        if (
          recruiterUser[0].role === 'admin' ||
          recruiterUser[0].role === 'recruiter'
        ) {
          await getMembersFromDB(
            recruiterRel[0].recruiter.id,
            userDetails.user.id,
          );
        }
      } else {
        toast.error('Something went wrong! Please try logging in again.');
      }
    } else {
      toast.error('Something went wrong! Please try logging in again.');
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    posthog.reset();
    if (!error) {
      router.push(pageRoutes.LOGIN);
    }
  };

  const fetchUserLocation = async () => {
    try {
      const response = await fetch('https://ipinfo.io/json', {
        headers: {
          Authorization: `Bearer e82b96e5cb0802`,
        },
      });
      const data = await response.json();
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
      .update(details)
      .eq('user_id', id || userDetails.user.id)
      .select();
    if (!error) {
      setRecruiterUser(data[0] as RecruiterUserType);
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
      { emailRedirectTo: `${process.env.NEXT_PUBLIC_HOST_NAME}/loading` },
    );
    if (error) {
      toast.error(`Oops! Something went wrong. (${error.message})`);
      return false;
    } else {
      showToast && toast.success(`Confirmation email sent`);
      return true;
    }
  };

  const handelMemberUpdate: ContextValue['handelMemberUpdate'] = async ({
    user_id,
    data,
  }) => {
    if (!user_id && data) return Promise.resolve(false);
    return updateMember({ user_id, data }).then((data) => {
      if (data) {
        setMembers((prev) =>
          prev.map((item) => {
            return data.user_id !== item.user_id
              ? item
              : (data as RecruiterUserType);
          }),
        );
        return true;
      }
      return false;
    });
  };

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
        router.push(pageRoutes.JOBS);
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
        allrecruterRelation,
        setAllrecruterRelation,
        setRecruiterUser,
        members,
        setMembers,
        handelMemberUpdate,
        isAllowed,
        allowAction,
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
    pageRoutes.LOGIN,
    pageRoutes.SIGNUP,
    pageRoutes.MOCKTEST,
    pageRoutes.PHONESCREEN,
    pageRoutes.CONFIRM_SCHEDULE,
  ];
  for (const route of whiteListedRoutes) {
    if (path.startsWith(route)) {
      return true;
    }
  }
};

const pageFeatureMapper = {
  [pageRoutes.ASSISTANT]: 'isAssistantEnabled',
  [pageRoutes.ASSESSMENTS]: 'isNewAssessmentEnabled',
  [pageRoutes.AGENT]: 'isAgentEnabled',
  [pageRoutes.SCREENING]: 'isPhoneScreeningEnabled',
  [pageRoutes.SUPPORT]: 'isSupportEnabled',
  [pageRoutes.CANDIDATES]: 'isSourcingEnabled',
};

const updateMember = ({
  user_id,
  data,
}: {
  user_id: string;
  data: Database['public']['Tables']['recruiter_user']['Update'];
}) => {
  return supabase
    .from('recruiter_user')
    .update(data)
    .eq('user_id', user_id)
    .select()
    .single()
    .then(({ data, error }) => {
      if (error) {
        throw new Error(error.message);
      }
      return data;
    });
};
