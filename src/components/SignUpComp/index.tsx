import { Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

import { SignupSlider } from '@/devlink';
import { WelcomeSlider1 } from '@/devlink/WelcomeSlider1';
import { RcSuccessBlock, RecCompanyDetails } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';
import { companyType } from '@/src/utils/userRoles';

import Loader from './Loader/Index';
import SelectAtsSystem from './SelectAtsSystem';
import SlideDetailsOne from './SlideDetailsOne';
import SlideDetailsTwo from './SlideDetailsTwo';
import SlideTwoSignUp from './SlideSignup';
import { stepObj } from './SlideSignup/utils';
import AUIButton from '../Common/AUIButton';

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
      .eq('id', recruiter.id);
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
                    setStep(stepObj.signup);
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
                    setStep(stepObj.signup);
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
                    setStep(stepObj.signup);
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
                onClickSignIn={{
                  onClick: () => {
                    router.push(pageRoutes.LOGIN, undefined, {
                      shallow: true,
                    });
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
          <RecCompanyDetails
            slotMain={
              <RcSuccessBlock
                message='You are all set'
                slotButton={
                  <Stack direction={'row'} spacing={'10px'}>
                    <AUIButton
                      onClick={() => {
                        router.push(`${pageRoutes.JOBS}/new`, undefined, {
                          shallow: true,
                        });
                        sendOnboardingMail(
                          recruiterUser.email,
                          recruiterUser.first_name,
                        );
                      }}
                    >
                      Post your first job
                    </AUIButton>
                    <AUIButton
                      variant='outlined'
                      onClick={() => {
                        router.push(pageRoutes.JOBS);
                        sendOnboardingMail(
                          recruiterUser.email,
                          recruiterUser.first_name,
                        );
                      }}
                    >
                      Go to Dashboard
                    </AUIButton>
                  </Stack>
                }
              />
            }
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
