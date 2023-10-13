import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { SignupSlider } from '@/devlink';
import { WelcomeSlider1 } from '@/devlink/WelcomeSlider1';
import { WelcomeSlider6 } from '@/devlink/WelcomeSlider6';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import { pageRoutes } from '@/src/utils/pageRouting';
import { companyType } from '@/src/utils/userRoles';

import SlideDetailsOne from './SlideDetailsOne';
import SlideDetailsTwo from './SlideDetailsTwo';
import SlideLogin from './SlideLogin';
import SlideTwoSignUp from './SlideSignup';
import { stepObj } from './SlideSignup/utils';

const SignUpComp = () => {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const { step, setStep, setFlow } = useSignupDetails();

  useEffect(() => {
    if (recruiter?.id && router.query.step) hanadleSession();
  }, [recruiter, router]);

  const hanadleSession = async () => {
    if (
      router.query.step == stepObj.signin ||
      router.query.step == stepObj.type
    ) {
      if (recruiter?.name) {
        router.push(pageRoutes.JOBS);
      } else {
        router.push(`?step=${stepObj.detailsOne}`, undefined, {
          shallow: true,
        });
      }
    }
  };

  return (
    <>
      <SignupSlider
        slotRightSlider={
          step == 'type' ? (
            <WelcomeSlider1
              onClickAgency={{
                onClick: () => {
                  setFlow(companyType.AGENCY);
                  localStorage.setItem('flow', companyType.AGENCY);
                  setStep(stepObj.signup);
                  router.push(`?step=signup`, undefined, { shallow: true });
                },
              }}
              onClickCompany={{
                onClick: () => {
                  setFlow(companyType.COMPANY);
                  localStorage.setItem('flow', companyType.COMPANY);
                  setStep(stepObj.signup);
                  router.push(`?step=signup`, undefined, { shallow: true });
                },
              }}
              onClickConsultant={{
                onClick: () => {
                  setFlow(companyType.CONSULTANT);
                  localStorage.setItem('flow', companyType.CONSULTANT);
                  setStep(stepObj.signup);
                  router.push(`?step=signup`, undefined, { shallow: true });
                },
              }}
              onClickSignIn={{
                onClick: () => {
                  router.push(`?step=signin`, undefined, { shallow: true });
                },
              }}
            />
          ) : step == stepObj.signup ? (
            <YTransform uniqueKey={step}>
              <SlideTwoSignUp />
            </YTransform>
          ) : step == stepObj.signin ? (
            <YTransform uniqueKey={step}>
              <SlideLogin />
            </YTransform>
          ) : step == stepObj.detailsOne ? (
            <YTransform uniqueKey={step}>
              <SlideDetailsOne />
            </YTransform>
          ) : step == stepObj.detailsTwo ? (
            <YTransform uniqueKey={step}>
              <SlideDetailsTwo />
            </YTransform>
          ) : (
            <YTransform uniqueKey={step}>
              <WelcomeSlider6
                textName={recruiter?.name}
                onClickDashboard={{
                  onClick: () => {
                    router.push(pageRoutes.JOBS);
                  },
                }}
                onClickPostJob={{
                  onClick: () => {
                    router.push(`?step=${stepObj.allSet}`, undefined, {
                      shallow: true,
                    });
                  },
                }}
              />
            </YTransform>
          )
        }
      />
    </>
  );
};

export default SignUpComp;
