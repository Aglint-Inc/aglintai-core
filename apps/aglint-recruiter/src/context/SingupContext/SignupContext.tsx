// ** React Imports

import { DatabaseTable } from '@aglint/shared-types';
import { useRouter } from 'next/router';
import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from 'react';

import { stepObj } from '@/src/components/SignUpComp/SlideSignup/utils';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';
import { companyType } from '@/src/utils/userRoles';

import { Session } from '../AuthContext/types';

interface ContextValue {
  step: string;
  setStep: Dispatch<React.SetStateAction<string>>;
  flow: string;
  setFlow: Dispatch<React.SetStateAction<string>>;
  companyName: null;
  setCompanyName: Dispatch<React.SetStateAction<string>>;
  recruiter: DatabaseTable['recruiter'];
  setRecruiter: Dispatch<React.SetStateAction<DatabaseTable['recruiter']>>;
  recruiterUser: DatabaseTable['recruiter_user'] & {
    role: string;
  };
  setRecruiterUser: Dispatch<
    React.SetStateAction<DatabaseTable['recruiter_user']>
  >;
  userDetails: Session;
  setUserDetails: Dispatch<React.SetStateAction<Session>>;
}

const defaultProvider: ContextValue = {
  step: stepObj.type,
  setStep: () => {},
  flow: companyType.COMPANY,
  setFlow: () => {},
  companyName: null,
  setCompanyName: () => {},
  recruiter: null,
  recruiterUser: null,
  setRecruiter: () => {},
  setRecruiterUser: () => {},
  userDetails: null,
  setUserDetails: () => {},
};

export const useSignupDetails = () => useContext(SignupContext);
const SignupContext = createContext<ContextValue>(defaultProvider);
const SignupProvider = ({ children }) => {
  const router = useRouter();
  const [step, setStep] = useState<string>(router.query.step as any);
  const [flow, setFlow] = useState<string>(companyType.COMPANY);
  const [companyName, setCompanyName] = useState(null);
  const [userDetails, setUserDetails] = useState<Session | null>(null);
  const [recruiter, setRecruiter] = useState<DatabaseTable['recruiter']>(null);
  const [recruiterUser, setRecruiterUser] = useState<
    DatabaseTable['recruiter_user'] & {
      role: string;
    }
  >(null);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.step) {
        setStep(router.query.step as string);
      }
      fetchUserDetails();
    }
  }, [router]);

  const fetchUserDetails = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) toast.error(error.message);

    if (data?.session) {
      setUserDetails(data.session);
      getRecruiterDetails(data.session);
    }
  };

  const getRecruiterDetails = async (userDetails: Session) => {
    const { data: recruiterRel, error: errorRel } = await supabase
      .from('recruiter_relation')
      .select(
        '*, recruiter(*),recruiter_user!public_recruiter_relation_user_id_fkey(*),roles(*)',
      )
      .match({ user_id: userDetails.user.id, is_active: true })
      .single();

    if (!errorRel) {
      const recruiterUser = recruiterRel.recruiter_user;

      setRecruiterUser({
        ...recruiterUser,
        role: recruiterRel.roles.name,
      });
      setRecruiter({
        ...recruiterRel.recruiter,
      });
    } else {
      toast.error('Something went wrong! Please try logging in again.');
    }
  };

  return (
    <SignupContext.Provider
      value={{
        step,
        setStep,
        flow,
        setFlow,
        companyName,
        setCompanyName,
        recruiter,
        setRecruiter,
        recruiterUser,
        setRecruiterUser,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export { SignupContext, SignupProvider };
