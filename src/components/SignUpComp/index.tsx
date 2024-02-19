import { Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

import { OnboardingFinalState, SignupSlider } from '@/devlink';
import { WelcomeSlider1 } from '@/devlink/WelcomeSlider1';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabase/client';
import { companyType } from '@/src/utils/userRoles';

import SelectAtsSystem from './SelectAtsSystem';
import SlideDetailsOne from './SlideDetailsOne';
import SlideDetailsTwo from './SlideDetailsTwo';
import SlideTwoSignUp from './SlideSignup';
import { stepObj } from './SlideSignup/utils';
import Loader from '../Common/Loader';

const SignUpComp = () => {
  const router = useRouter();
  const { step, setStep, setFlow } = useSignupDetails();
  const { recruiter, recruiterUser } = useAuthDetails();

  async function updateAuthDetails(type: string) {
    await supabase.auth.updateUser({
      data: { role: type },
    });
    await supabase
      .from('recruiter')
      .update({
        recruiter_type: type,
      })
      .eq('id', recruiter?.id);
  }

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
      {step == stepObj.detailsOne ? (
        <YTransform uniqueKey={step}>
          <SlideDetailsOne />
        </YTransform>
      ) : step == stepObj.detailsTwo ? (
        <YTransform uniqueKey={step}>
          <SlideDetailsTwo />
        </YTransform>
      ) : step == stepObj.atsSystem ? (
        <YTransform uniqueKey={step}>
          <YTransform uniqueKey={step}>
            <SelectAtsSystem />
          </YTransform>
        </YTransform>
      ) : step == stepObj.allSet ? (
        <YTransform uniqueKey={step}>
          <OnboardingFinalState
            onClickImportJob={{
              onClick: () => {
                router.push(pageRoutes.JOBS);
                sendOnboardingMail(
                  recruiterUser.email,
                  recruiterUser.first_name,
                );
              },
            }}
            onClickSourceCandidates={{
              onClick: () => {
                router.push(pageRoutes.CANDIDATES);
                sendOnboardingMail(
                  recruiterUser.email,
                  recruiterUser.first_name,
                );
              },
            }}
          />
        </YTransform>
      ) : (
        <YTransform uniqueKey={'loader-signup'}>
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            height={'100vh'}
            width={'100vw'}
          >
            <Loader />
          </Stack>
        </YTransform>
      )}
    </>
  );
};

export default SignUpComp;

const sendOnboardingMail = async (email: string, name: string) => {
  try {
    await axios.post(
      'https://us-central1-aglint-cloud-381414.cloudfunctions.net/mails-sender',
      {
        mail_type: 'recruiter-onboarding',
        recipient_email: email,
        payload: {
          name: name,
        },
      },
    );
  } catch (err) {
    //
  }
};
