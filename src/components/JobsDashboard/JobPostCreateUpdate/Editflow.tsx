import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { get } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { useState } from 'react';
import React from 'react';

import { EditJob } from '@/devlink';
import toast from '@/src/utils/toast';

import { FormJobType, useJobForm } from './JobPostFormProvider';
import ApplyForm from './JobPostForms/ApplyForm';
import StepOne from './JobPostForms/BasicStepOne';
import StepTwo from './JobPostForms/BasicStepTwo';
import EmailTemplates from './JobPostForms/EmailTemplates';
import ScreeningQns from './JobPostForms/ScreeningQns';
import ScreeningSettings from './JobPostForms/ScreeningSettings';

type CreateNewJobParams = {
  open: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditFlow({ open, setDrawerOpen }: CreateNewJobParams) {
  const { jobForm, dispatch } = useJobForm();
  const [formError, setFormError] = useState({
    jobTitle: '',
    company: '',
    location: '',
  });
  const [showWarn, setShowWarn] = useState(true);
  let formSlide = null;
  const { slideNo } = jobForm;
  if (slideNo === 1) {
    formSlide = (
      <>
        <StepOne formError={formError} setFormError={setFormError} />
        <StepTwo />
      </>
    );
  } else if (slideNo === 2) {
    formSlide = <EmailTemplates />;
  } else if (slideNo === 3) {
    formSlide = <ApplyForm />;
  } else if (slideNo == 4) {
    formSlide = <ScreeningQns />;
  } else if (slideNo == 5) {
    formSlide = <ScreeningSettings />;
  }

  const isformValid = () => {
    let flag = true;
    const { company, jobTitle, jobLocation } = jobForm.formFields;
    if (slideNo === 1) {
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

      if (isEmpty(get(jobForm, 'formFields.jobDescription', ''))) {
        toast.error('Please provide job description to move to next Step');
        return false;
      }

      if (isEmpty(get(jobForm, 'formFields.skills', []))) {
        toast.error('Please provide required skills to move to next Step');
        return false;
      }
    }
    if (slideNo === 3) {
      if (jobForm.formFields.interviewType === 'ai-powered') {
        return true;
      }
      const interviewConfig = get(
        jobForm,
        'formFields.interviewConfig',
        {},
      ) as FormJobType['interviewConfig'];

      let totalQns = 0;

      if (get(interviewConfig, 'cultural.value', false)) {
        totalQns += get(interviewConfig, 'cultural.questions', []).length;
      }
      if (get(interviewConfig, 'skill.value', false)) {
        totalQns += get(interviewConfig, 'skill.questions', []).length;
      }
      if (get(interviewConfig, 'personality.value', false)) {
        totalQns += get(interviewConfig, 'personality.questions', []).length;
      }
      if (get(interviewConfig, 'softSkills.value', false)) {
        totalQns += get(interviewConfig, 'softSkills.questions', []).length;
      }
      if (totalQns < 10 || totalQns > 15) {
        flag = false;
        toast.error('Please set atleast 10 and at max 15 Questions');
      }
    }
    return flag;
  };

  const changeSlide = (
    slide: 'basic' | 'applyfrom' | 'email' | 'screening' | 'workFlow',
  ) => {
    if (!isformValid()) return;

    if (slide === 'basic') {
      dispatch({
        type: 'moveToSlide',
        payload: {
          slideNo: 1,
        },
      });
    } else if (slide === 'screening') {
      dispatch({
        type: 'moveToSlide',
        payload: {
          slideNo: 4,
        },
      });
    } else if (slide === 'workFlow') {
      dispatch({
        type: 'moveToSlide',
        payload: {
          slideNo: 5,
        },
      });
    } else if (slide === 'email') {
      dispatch({
        type: 'moveToSlide',
        payload: {
          slideNo: 2,
        },
      });
    } else if (slide === 'applyfrom') {
      dispatch({
        type: 'moveToSlide',
        payload: {
          slideNo: 3,
        },
      });
    }
  };

  const handleDrawerClose = () => {
    setDrawerOpen(() => false);
    dispatch({ type: 'closeForm' });
  };
  return (
    <>
      <Drawer anchor='right' open={open} onClose={handleDrawerClose}>
        <Stack p={2} width={'800px'} position={'relative'} minHeight={'100vh'}>
          <EditJob
            isJobSaved={true}
            isDetailsActive={slideNo === 1}
            isEmailTemplatesActive={slideNo === 2}
            isScreeningQuestionsActive={slideNo === 4}
            isWorkflowActive={slideNo === 5}
            onClickApplyForm={{
              onClick: () => {
                changeSlide('applyfrom');
              },
            }}
            onClickClose={{
              onClick: () => {
                dispatch({
                  type: 'closeForm',
                });
              },
            }}
            onClickDetails={{
              onClick: () => {
                changeSlide('basic');
              },
            }}
            onClickEmailTemplates={{
              onClick: () => {
                changeSlide('email');
              },
            }}
            onClickScreeningQuestion={{
              onClick: () => {
                changeSlide('screening');
              },
            }}
            onClickWorkFlows={{
              onClick: () => {
                changeSlide('workFlow');
              },
            }}
            slotLoaderSaving={<></>}
            slotDetails={<>{formSlide}</>}
            onClickGotIt={{
              onClick: () => {
                setShowWarn(false);
              },
            }}
            isWarningVisibles={showWarn}
          />
        </Stack>
      </Drawer>
    </>
  );
}

export default EditFlow;
