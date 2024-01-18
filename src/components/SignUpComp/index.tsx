import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { SignupSlider } from '@/devlink';
import { WelcomeSlider1 } from '@/devlink/WelcomeSlider1';
import { RcSuccessBlock, RecCompanyDetails } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useSignupDetails } from '@/src/context/SingupContext/SignupContext';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import { pageRoutes } from '@/src/utils/pageRouting';
import { companyType } from '@/src/utils/userRoles';

import Loader from './Loader/Index';
import SelectAtsSystem from './SelectAtsSystem';
import SlideDetailsOne from './SlideDetailsOne';
import SlideTwoSignUp from './SlideSignup';
import { stepObj } from './SlideSignup/utils';
import AUIButton from '../Common/AUIButton';

const SignUpComp = () => {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const { step, setStep, setFlow } = useSignupDetails();

  useEffect(() => {
    if (recruiter?.id) hanadleSession();
  }, [recruiter]);

  const hanadleSession = async () => {
    if (
      router.asPath == `/${stepObj.signup}` ||
      router.asPath == `/${stepObj.signup}?step=type`
    ) {
      if (recruiter?.id) {
        router.push(pageRoutes.JOBS);
      }
    }
  };
  return (
    <>
      {(step == 'type' || step == stepObj.signup) && (
        <SignupSlider
          slotRightSlider={
            step == 'type' ? (
              <WelcomeSlider1
                onClickAgency={{
                  onClick: () => {
                    setFlow(companyType.AGENCY);
                    localStorage.setItem('flow', companyType.AGENCY);
                    setStep(stepObj.signup);
                    router.push(`?step=signup&category=agency`, undefined, {
                      shallow: true,
                    });
                  },
                }}
                onClickCompany={{
                  onClick: () => {
                    setFlow(companyType.COMPANY);
                    localStorage.setItem('flow', companyType.COMPANY);
                    setStep(stepObj.signup);
                    router.push(`?step=signup&category=recruiter`, undefined, {
                      shallow: true,
                    });
                  },
                }}
                onClickConsultant={{
                  onClick: () => {
                    setFlow(companyType.CONSULTANT);
                    localStorage.setItem('flow', companyType.CONSULTANT);
                    setStep(stepObj.signup);
                    router.push(`?step=signup&category=consultant`, undefined, {
                      shallow: true,
                    });
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
            ) : step == stepObj.signup ? (
              <YTransform uniqueKey={step}>
                <SlideTwoSignUp />
              </YTransform>
            ) : null
          }
        />
      )}
      <>
        {step == stepObj.detailsOne || step == stepObj.detailsTwo ? (
          // <YTransform uniqueKey={router.query.step == 'details-two'}>
          <SlideDetailsOne />
        ) : // </YTransform>
        step == stepObj.atsSystem ? (
          <YTransform uniqueKey={step}>
            <SelectAtsSystem />
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
                        }}
                      >
                        Post your first job
                      </AUIButton>
                      <AUIButton
                        variant='outlined'
                        onClick={() => {
                          router.push(pageRoutes.JOBS);
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
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            height={'100vh'}
            width={'100vw'}
          >
            <Loader />
          </Stack>
        )}
      </>
    </>
  );
};

export default SignUpComp;
