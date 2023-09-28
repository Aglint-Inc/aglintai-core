import Drawer from '@mui/material/Drawer';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import { get } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { useState } from 'react';
import React from 'react';

import { CreateNewJobDrawer, StepBottomProgress } from '@/devlink';
import { pageRoutes } from '@/src/utils/pageRouting';
import toast from '@/src/utils/toast';

import FormFive from './Forms/FormFive';
import FormFour from './Forms/FormFour';
import FormOne from './Forms/FormOne';
import FormSix from './Forms/FormSix';
import FormThree from './Forms/FormThree';
import FormTwo from './Forms/FormTwo';
import FormSeven from './Forms/SuccessPage';
import { useJobForm } from './JobPostFormProvider';

type CreateNewJobParams = {
  open: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateNewJob({ open, setDrawerOpen }: CreateNewJobParams) {
  const router = useRouter();
  const { jobForm, dispatch } = useJobForm();
  const [formError, setFormError] = useState({
    jobTitle: '',
    company: '',
    location: '',
  });

  let formSlide = null;
  const { slideNo } = jobForm;
  if (slideNo === 0) {
    formSlide = <FormOne nextSlide={() => changeSlide(1)} />;
  } else if (slideNo === 1) {
    formSlide = <FormTwo formError={formError} setFormError={setFormError} />;
  } else if (slideNo === 2) {
    formSlide = <FormThree />;
  } else if (slideNo === 3) {
    formSlide = <FormFour />;
  } else if (slideNo === 4) {
    formSlide = <FormFive />;
  } else if (slideNo == 5) {
    formSlide = <FormSix />;
  } else if (slideNo == 6) {
    formSlide = <FormSeven />;
  }
  const changeSlide = async (newSlideNo: number) => {
    try {
      dispatch({
        type: 'moveToSlide',
        payload: {
          slideNo: newSlideNo,
        },
      });
    } catch (err) {
      // console.log(err);
    }
  };

  const isformValid = () => {
    let flag = true;

    const { company, jobTitle, jobLocation } = jobForm.formFields;
    if (slideNo === 2) {
      if (isEmpty(jobTitle)) {
        flag = false;
        setFormError((p) => ({ ...p, jobTitle: 'Please Enter Job Title' }));
      }

      if (isEmpty(company)) {
        flag = false;
        setFormError((p) => ({ ...p, company: 'Please Enter Company Name' }));
      }

      if (isEmpty(jobLocation)) {
        flag = false;
        setFormError((p) => ({ ...p, location: 'Please Enter Location' }));
      }
    }

    if (slideNo == 2) {
      if (isEmpty(get(jobForm, 'formFields.jobDescription', ''))) {
        toast.error('Please provide job description to move to next Step');
        return false;
      }

      if (isEmpty(get(jobForm, 'formFields.skills', []))) {
        toast.error('Please provide required skills to move to next Step');
        return false;
      }
    }
    return flag;
  };

  const handleClickBack = () => {
    changeSlide(slideNo !== 0 ? slideNo - 1 : slideNo);
  };

  const handleClickContinue = () => {
    if (slideNo === 2) {
      if (!isformValid()) return;
    }
    changeSlide(slideNo + 1);
  };

  const handleDrawerClose = () => {
    router.push(pageRoutes.JOBS, undefined, {
      shallow: true,
    });
    setDrawerOpen(() => false);
    //remove generated ai skills
    changeSlide(0);
    dispatch({ type: 'closeForm' });
  };
  return (
    <>
      <Drawer anchor='right' open={open} onClose={handleDrawerClose}>
        <Stack p={2} width={'500px'} position={'relative'} minHeight={'100vh'}>
          <CreateNewJobDrawer
            onClickClose={{ onClick: handleDrawerClose }}
            slotNewJobStep={formSlide}
            slotBottomButtonProgress={
              slideNo !== 0 && (
                <StepBottomProgress
                  textStepCount={`Step ${slideNo} of 5`}
                  onClickBack={{
                    onClick: handleClickBack,
                  }}
                  onClickContinue={{
                    onClick: handleClickContinue,
                  }}
                  slotProgressBar={
                    <>
                      <LinearProgress
                        variant='determinate'
                        color='primary'
                        value={(slideNo / 6) * 100}
                      />
                    </>
                  }
                  isDraftSaved={false}
                  isSavetoDraftVisible={true}
                  isSkipButtonVisible={true}
                />
              )
            }
          />
        </Stack>
      </Drawer>
    </>
  );
}

export default CreateNewJob;
