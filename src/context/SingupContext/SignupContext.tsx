// ** React Imports

import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

import { stepObj } from '@/src/components/SignUpComp/SlideSignup/utils';
import { companyType } from '@/src/utils/userRoles';

interface ContextValue {
  step: string;
  // eslint-disable-next-line no-unused-vars
  setStep: (details: string) => void;
  flow: string;
  // eslint-disable-next-line no-unused-vars
  setFlow: (details: string) => void;
}

const defaultProvider = {
  step: stepObj.type,
  setStep: () => {},
  flow: companyType.COMPANY,
  setFlow: () => {},
};

export const useSignupDetails = () => useContext(SignupContext);
const SignupContext = createContext<ContextValue>(defaultProvider);
const SignupProvider = ({ children }) => {
  const router = useRouter();
  const [step, setStep] = useState<string>(stepObj.type);
  const [flow, setFlow] = useState<string>(companyType.COMPANY);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.step) {
        setStep(router.query.step as string);
      } else {
        router.push(`?step=${stepObj.type}`, undefined, {
          shallow: true,
        });
        setStep(stepObj.type);
      }
    }
  }, [router]);
  return (
    <SignupContext.Provider value={{ step, setStep, flow, setFlow }}>
      {children}
    </SignupContext.Provider>
  );
};

export { SignupContext, SignupProvider };
