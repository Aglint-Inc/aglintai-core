import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { get } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { useState } from 'react';
import React from 'react';

import { EditJob } from '@/devlink';
import toast from '@/src/utils/toast';

import { useJobForm } from './JobPostFormProvider';
import ApplyForm from './JobPostForms/ApplyForm';
import StepOne from './JobPostForms/BasicStepOne';
import StepTwo from './JobPostForms/BasicStepTwo';
import EmailTemplates from './JobPostForms/EmailTemplates';
import ScreeningQns from './JobPostForms/ScreeningQns';
import ScreeningSettings from './JobPostForms/ScreeningSettings';
import SyncStatus from './JobPostForms/SyncStatus';

function EditFlow() {
  const { jobForm, dispatch } = useJobForm();
  const [formError, setFormError] = useState({
    jobTitle: '',
    company: '',
    location: '',
    department: '',
  });
  // const [showWarn, setShowWarn] = useState(true);
  const [jdWarn, setJdWarn] = useState<'' | 'show' | 'shown'>('');
  let formSlide = null;
  const { slideNo } = jobForm;
  if (slideNo === 1) {
    formSlide = (
      <>
        <StepOne formError={formError} setFormError={setFormError} />
        <StepTwo
          showWarnOnEdit={() => {
            if (jdWarn !== 'shown') setJdWarn('show');
          }}
        />
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
    const { company, jobTitle, jobLocation, department } = jobForm.formFields;
    if (slideNo === 1) {
      if (isEmpty(jobTitle.trim())) {
        flag = false;
        setFormError((p) => ({ ...p, jobTitle: 'Please Enter Job Title' }));
      }

      if (isEmpty(company.trim())) {
        flag = false;
        setFormError((p) => ({ ...p, company: 'Please Enter Company Name' }));
      }

      if (isEmpty(jobLocation.trim())) {
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
      if (isEmpty(department.trim())) {
        flag = false;
        setFormError((p) => ({ ...p, department: 'Please Enter Department' }));
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
    if (isformValid()) {
      dispatch({
        type: 'closeForm',
      });
    }
  };
  return (
    <>
      <Drawer
        anchor='right'
        open={jobForm.isFormOpen}
        onClose={handleDrawerClose}
      >
        <Stack width={'800px'} minHeight={'100vh'}>
          <EditJob
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
              onClick: handleDrawerClose,
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
                setJdWarn('shown');
              },
            }}
            isWarningVisibles={jdWarn === 'show' && slideNo == 1}
            slotSaveStatus={<SyncStatus status={jobForm.syncStatus} />}
          />
        </Stack>
      </Drawer>
    </>
  );
}

export default EditFlow;
