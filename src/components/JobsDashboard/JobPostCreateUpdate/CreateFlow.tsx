import Drawer from '@mui/material/Drawer';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { get } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { useState } from 'react';
import React from 'react';

import {
  CreateNewJobDrawer,
  JobDraftPopup,
  StepBottomProgress,
} from '@/devlink';
import { useJobs } from '@/src/context/JobsContext';
import toast from '@/src/utils/toast';

import { FormJobType, useJobForm } from './JobPostFormProvider';
import StepOne from './JobPostForms/BasicStepOne';
import StepTwo from './JobPostForms/BasicStepTwo';
import Stepthree from './JobPostForms/ScreeningQns';
import StepFour from './JobPostForms/ScreeningSettings';
import SelectImportMethod from './JobPostForms/SelectImportMethod';
import SuccessPage from './JobPostForms/SuccessPage';
import SyncStatus from './JobPostForms/SyncStatus';
import MuiPopup from '../../Common/MuiPopup';

function CreateNewJob() {
  const { jobForm, dispatch, handleFormClose } = useJobForm();
  const [formError, setFormError] = useState({
    jobTitle: '',
    company: '',
    location: '',
    department: '',
  });
  const { handleJobDelete } = useJobs();
  const [showDiscardWarn, setShowDiscardWarn] = useState(false);

  let formSlide = null;
  const { slideNo } = jobForm;
  if (slideNo === 0) {
    formSlide = <SelectImportMethod />;
  } else if (slideNo === 1) {
    formSlide = <StepOne formError={formError} setFormError={setFormError} />;
  } else if (slideNo === 2) {
    formSlide = <StepTwo />;
  } else if (slideNo === 3) {
    formSlide = <Stepthree />;
  } else if (slideNo == 4) {
    formSlide = <StepFour />;
  } else if (slideNo == 5) {
    formSlide = <SuccessPage />;
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
      if (isEmpty(department.trim())) {
        flag = false;
        setFormError((p) => ({ ...p, department: 'Please Enter Department' }));
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
      if (totalQns < 10 || totalQns > 25) {
        flag = false;
        toast.error('Please set atleast 10 and at max 25 Questions');
      }
    }
    return flag;
  };

  const handleClickBack = () => {
    changeSlide(slideNo !== 0 ? slideNo - 1 : slideNo);
  };

  const handleClickContinue = () => {
    if (!isformValid()) return;

    changeSlide(slideNo + 1);
  };

  const handleCloseDrawer = () => {
    if (slideNo > 2 || !jobForm.createdAt) resetToInitialState();
    else setShowDiscardWarn(true);
    // router.push(pageRoutes.JOBS, undefined, {
    //   shallow: true,
    // });
  };

  const discardJob = async () => {
    try {
      const flag = await handleJobDelete(jobForm.jobPostId);
      if (!flag) throw new Error('');
      toast.success('discarded Job Post SuccessFully');
      resetToInitialState();
    } catch (err) {
      toast.error('Something Went Wrong. Please Try Again');
    } finally {
      setShowDiscardWarn(false);
    }
  };

  const resetToInitialState = () => {
    handleFormClose();
    setFormError(() => ({
      jobTitle: '',
      company: '',
      location: '',
      department: '',
    }));
  };

  return (
    <>
      <Drawer
        anchor='right'
        open={jobForm.isFormOpen}
        onClose={handleCloseDrawer}
      >
        <Stack p={2} width={'600px'} position={'relative'} minHeight={'100vh'}>
          <CreateNewJobDrawer
            onClickClose={{ onClick: handleCloseDrawer }}
            slotNewJobStep={formSlide}
            slotBottomButtonProgress={
              slideNo >= 1 &&
              slideNo < 5 && (
                <StepBottomProgress
                  textStepCount={`Step ${slideNo} of 4`}
                  onClickBack={{
                    onClick: handleClickBack,
                  }}
                  onClickContinue={{
                    onClick: handleClickContinue,
                  }}
                  isBackVisible={slideNo !== 1}
                  slotProgressBar={
                    <>
                      <LinearProgress
                        variant='determinate'
                        color='primary'
                        value={(slideNo / 4) * 100}
                      />
                    </>
                  }
                  isSkipButtonVisible={false}
                  onClickSkip={{
                    onClick: handleCloseDrawer,
                  }}
                  slotSaveStatus={
                    <>
                      <SyncStatus status={jobForm.syncStatus} />
                    </>
                  }
                  // slotSavingDraftLottie={<></>}
                  // isDraftSaved={true}
                  // isSavetoDraftVisible={true}
                />
              )
            }
          />
        </Stack>
      </Drawer>
      <MuiPopup props={{ open: showDiscardWarn, maxWidth: 'md' }}>
        <Paper>
          <JobDraftPopup
            onClickDiscard={{
              onClick: discardJob,
            }}
            onClickDraft={{
              onClick: () => {
                setShowDiscardWarn(false);
                handleFormClose();
              },
            }}
          />
        </Paper>
      </MuiPopup>
    </>
  );
}

export default CreateNewJob;
