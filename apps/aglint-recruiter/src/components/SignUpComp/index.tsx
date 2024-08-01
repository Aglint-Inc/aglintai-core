'use client';

import { Box, Container } from '@mui/material';
import { useFeatureFlagEnabled } from 'posthog-js/react';

import { OnboardingFinalState } from '@/devlink/OnboardingFinalState';
import { WelcomeSlider1 } from '@/devlink/WelcomeSlider1';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import { RecruiterOnboardingEmailApi } from '@/src/pages/api/emails/recruiterOnboarding';
import { handleEmailApi } from '@/src/pages/api/emails/utils';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import { companyType } from '@/src/utils/userRoles';

import Footer from '../Common/Footer';
import SelectAtsSystem from './SelectAtsSystem';
import SlideDetailsOne from './SlideDetailsOne';
import SlideDetailsTwo from './SlideDetailsTwo';
import SlideTwoSignUp from './SlideSignup';
import { stepObj } from './SlideSignup/utils';

const SignUpComp = () => {
  const router = useRouterPro<{ step: string; category: string }>();
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
      <Container
        maxWidth={false}
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'var(--neutral-2)',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {router.pathName === ROUTES['/signup']() && (
            <YTransform uniqueKey={step}>
              <SlideTwoSignUp />
            </YTransform>
          )}
          {step === stepObj.type && (
            <YTransform uniqueKey={step}>
              <WelcomeSlider1
                onClickAgency={{
                  onClick: () => {
                    setFlow(companyType.AGENCY);
                    localStorage.setItem('flow', companyType.AGENCY);
                    setStep(stepObj.detailsOne);
                    updateAuthDetails(companyType.AGENCY);
                    router.setQueryParams({
                      step: stepObj.detailsOne,
                    });
                  },
                }}
                onClickCompany={{
                  onClick: () => {
                    setFlow(companyType.COMPANY);
                    localStorage.setItem('flow', companyType.COMPANY);
                    setStep(stepObj.detailsOne);
                    updateAuthDetails(companyType.COMPANY);
                    router.setQueryParams({
                      step: stepObj.detailsOne,
                    });
                  },
                }}
                onClickConsultant={{
                  onClick: () => {
                    setFlow(companyType.CONSULTANT);
                    localStorage.setItem('flow', companyType.CONSULTANT);
                    setStep(stepObj.detailsOne);
                    updateAuthDetails(companyType.CONSULTANT);
                    router.setQueryParams({
                      step: stepObj.detailsOne,
                      category: 'consultant',
                    });
                  },
                }}
              />
            </YTransform>
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
                    router.push(ROUTES['/jobs']());
                    sendOnboardingMail(emailPayload);
                  },
                }}
                isSourcingVisible={isSourcingEnabled}
                onClickSourceCandidates={{
                  onClick: () => {
                    router.push(ROUTES['/candidates/history']());
                    sendOnboardingMail(emailPayload);
                  },
                }}
                onClickScheduleInterview={{
                  onClick: () => {
                    router.push(ROUTES['/scheduling']());
                    sendOnboardingMail(emailPayload);
                  },
                }}
              />
            </YTransform>
          )}
        </Box>
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Footer />
        </Box>
      </Container>
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
