'use client';

import { useRouter } from 'next/router';
import { useFeatureFlagEnabled } from 'posthog-js/react';

import { OnboardingFinalState } from '@/devlink/OnboardingFinalState';
import { SignupSlider } from '@/devlink/SignupSlider';
import { WelcomeSlider1 } from '@/devlink/WelcomeSlider1';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { RecruiterOnboardingEmailApi } from '@/src/pages/api/emails/recruiterOnboarding';
import { handleEmailApi } from '@/src/pages/api/emails/utils';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';
import { companyType } from '@/src/utils/userRoles';

import SelectAtsSystem from './SelectAtsSystem';
import SlideDetailsOne from './SlideDetailsOne';
import SlideDetailsTwo from './SlideDetailsTwo';
import SlideTwoSignUp from './SlideSignup';
import { stepObj } from './SlideSignup/utils';

const SignUpComp = () => {
  const router = useRouter();
  const { step, setStep, setFlow, recruiter, recruiterUser } =
    useSignupDetails();

  async function updateAuthDetails(type: string) {
    await supabase
      .from('recruiter')
      .update({
        recruiter_type: type,
      })
      .eq('id', recruiter?.id);
  }

  const isSourcingEnabled = useFeatureFlagEnabled('isSourcingEnabled');
  // const isSchedulingEnabled = useFeatureFlagEnabled('isSchedulingEnabled');

  const emailPayload = {
    email: recruiterUser?.email ?? null,
    name: recruiterUser?.first_name ?? null,
    flags:
      {
        sourcing: isSourcingEnabled,
        scheduling: true, //isSchedulingEnabled,
      } ?? null,
  };

  return (
    <>
      {router.asPath === pageRoutes.SIGNUP && (
        <YTransform uniqueKey={step}>
          <SlideTwoSignUp />
        </YTransform>
      )}
      {step === stepObj.type && (
        <SignupSlider
          slotRightSlider={
            <YTransform uniqueKey={step}>
              <WelcomeSlider1
                onClickAgency={{
                  onClick: () => {
                    setFlow(companyType.AGENCY);
                    localStorage.setItem('flow', companyType.AGENCY);
                    setStep(stepObj.detailsOne);
                    updateAuthDetails(companyType.AGENCY);
                    router.push(`?step=${stepObj.detailsOne}`, undefined, {
                      shallow: true,
                    });
                  },
                }}
                onClickCompany={{
                  onClick: () => {
                    setFlow(companyType.COMPANY);
                    localStorage.setItem('flow', companyType.COMPANY);
                    setStep(stepObj.detailsOne);
                    updateAuthDetails(companyType.COMPANY);
                    router.push(`?step=${stepObj.detailsOne}`, undefined, {
                      shallow: true,
                    });
                  },
                }}
                onClickConsultant={{
                  onClick: () => {
                    setFlow(companyType.CONSULTANT);
                    localStorage.setItem('flow', companyType.CONSULTANT);
                    setStep(stepObj.detailsOne);
                    updateAuthDetails(companyType.CONSULTANT);
                    router.push(
                      `?step=${stepObj.detailsOne}&category=consultant`,
                      undefined,
                      {
                        shallow: true,
                      },
                    );
                  },
                }}
              />
            </YTransform>
          }
        />
      )}
      {step == stepObj.detailsOne && (
        <YTransform uniqueKey={step}>
          <SlideDetailsOne />
        </YTransform>
      )}
      {step == stepObj.detailsTwo && (
        <YTransform uniqueKey={step}>
          <SlideDetailsTwo />
        </YTransform>
      )}
      {step == stepObj.atsSystem && (
        <YTransform uniqueKey={step}>
          <YTransform uniqueKey={step}>
            <SelectAtsSystem />
          </YTransform>
        </YTransform>
      )}
      {step == stepObj.allSet && (
        <YTransform uniqueKey={step}>
          <OnboardingFinalState
            onClickImportJob={{
              onClick: () => {
                router.push(pageRoutes.JOBS);
                sendOnboardingMail(emailPayload);
              },
            }}
            isSourcingVisible={isSourcingEnabled}
            onClickSourceCandidates={{
              onClick: () => {
                router.push(pageRoutes.CANDIDATES);
                sendOnboardingMail(emailPayload);
              },
            }}
            onClickScheduleInterview={{
              onClick: () => {
                router.push(pageRoutes.SCHEDULING);
                sendOnboardingMail(emailPayload);
              },
            }}
          />
        </YTransform>
      )}
    </>
  );
};

export default SignUpComp;

const sendOnboardingMail = async (
  props: RecruiterOnboardingEmailApi['request'],
) => {
  try {
    await handleEmailApi('recruiterOnboarding', props);
  } catch (err) {
    //
  }
};
