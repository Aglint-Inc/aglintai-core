import { get } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import React from 'react';

import { CreateNewJob } from '@/devlink';
import toast from '@/src/utils/toast';

import { JobFormErrorParams } from '../JobsDashboard/JobPostCreateUpdate/CreateFlow';
import {
  FormJobType,
  useJobForm,
} from '../JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import ApplyForm from '../JobsDashboard/JobPostCreateUpdate/JobPostForms/ApplyForm';
import BasicStepOne from '../JobsDashboard/JobPostCreateUpdate/JobPostForms/BasicStepOne';
import BasicStepTwo from '../JobsDashboard/JobPostCreateUpdate/JobPostForms/BasicStepTwo';
import Emails from '../JobsDashboard/JobPostCreateUpdate/JobPostForms/EmailTemplates';
import ScreeningQns from '../JobsDashboard/JobPostCreateUpdate/JobPostForms/ScreeningQns';
import ScreeningSettings from '../JobsDashboard/JobPostCreateUpdate/JobPostForms/ScreeningSettings';
import SyncStatus from '../JobsDashboard/JobPostCreateUpdate/JobPostForms/SyncStatus';

function JobForm() {
  const { jobForm, dispatch } = useJobForm();
  const [formError, setFormError] = useState<JobFormErrorParams>({
    jobTitle: '',
    company: '',
    location: '',
    department: '',
    aiQnGen: 0,
  });
  // const [showWarn, setShowWarn] = useState(true);
  const [jdWarn, setJdWarn] = useState<'' | 'show' | 'shown'>('');
  let formSlide = null;
  const { slideNo } = jobForm;
  if (slideNo === 1) {
    formSlide = (
      <>
        <BasicStepOne formError={formError} setFormError={setFormError} />
        <BasicStepTwo
          showWarnOnEdit={() => {
            if (jdWarn !== 'shown') setJdWarn('show');
          }}
        />
      </>
    );
  } else if (slideNo === 2) {
    formSlide = <ApplyForm />;
  } else if (slideNo === 4) {
    formSlide = <Emails />;
  } else if (slideNo == 5) {
    formSlide = <ScreeningQns setFormError={setFormError} />;
  } else if (slideNo == 6) {
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

    if (slideNo === 5) {
      const interviewConfig = get(
        jobForm,
        'formFields.interviewConfig',
        {},
      ) as FormJobType['interviewConfig'];

      if (formError.aiQnGen > 0) {
        toast.error('Please wait till qusetions get generated');
        return false;
      }

      let totalQns = 0;

      if (get(interviewConfig, 'skill.value', false)) {
        let count = get(interviewConfig, 'skill.questions', []).length;
        if (count === 0) {
          toast.error(
            `Please add questions from skill filter or turn off the filter`,
          );
          return false;
        }
        totalQns += count;
      }
      if (get(interviewConfig, 'behavior.value', false)) {
        let count = get(interviewConfig, 'behavior.questions', []).length;
        if (count === 0) {
          toast.error(
            `Please add questions from behaviour filter or turn off the filter`,
          );
          return false;
        }
        totalQns += count;
      }
      if (get(interviewConfig, 'communication.value', false)) {
        let count = get(interviewConfig, 'communication.questions', []).length;
        if (count === 0) {
          toast.error(
            `Please add questions from communication filter or turn off the filter`,
          );
          return false;
        }
        totalQns += count;
      }
      if (get(interviewConfig, 'performance.value', false)) {
        let count = get(interviewConfig, 'performance.questions', []).length;
        if (count === 0) {
          toast.error(
            `Please add questions from performance filter or turn off the filter`,
          );
          return false;
        }
        totalQns += count;
      }
      if (get(interviewConfig, 'education.value', false)) {
        let count = get(interviewConfig, 'education.questions', []).length;
        if (count === 0) {
          toast.error(
            `Please add questions from education filter or turn off the filter`,
          );
          return false;
        }
        totalQns += count;
      }
      if (get(interviewConfig, 'general.value', false)) {
        let count = get(interviewConfig, 'general.questions', []).length;
        if (count === 0) {
          toast.error(
            `Please add questions from general filter or turn off the filter`,
          );
          return false;
        }
        totalQns += count;
      }
      if (totalQns < 10 || totalQns > 25) {
        flag = false;
        toast.error('Please set atleast 10 and at max 25 Questions');
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
          slideNo: 5,
        },
      });
    } else if (slide === 'workFlow') {
      dispatch({
        type: 'moveToSlide',
        payload: {
          slideNo: 6,
        },
      });
    } else if (slide === 'email') {
      dispatch({
        type: 'moveToSlide',
        payload: {
          slideNo: 4,
        },
      });
    } else if (slide === 'applyfrom') {
      dispatch({
        type: 'moveToSlide',
        payload: {
          slideNo: 2,
        },
      });
    }
  };

  // const handleDrawerClose = () => {
  //   if (isformValid()) {
  //     dispatch({
  //       type: 'closeForm',
  //     });
  //   }
  //   setFormError(() => ({
  //     jobTitle: '',
  //     company: '',
  //     location: '',
  //     department: '',
  //     aiQnGen: 0,
  //   }));
  // };

  let formTitle = `Create Job - ${jobForm.formFields.jobTitle}`;
  if (jobForm.formType === 'edit') {
    formTitle = `Edit Job - ${jobForm.formFields.jobTitle}`;
  }

  const router = useRouter();

  return (
    <>
      <CreateNewJob
        slotCreateJob={<>{formSlide}</>}
        onClickApplyForm={{
          onClick: () => {
            changeSlide('applyfrom');
          },
        }}
        onClickEmailTemplates={{
          onClick: () => {
            changeSlide('email');
          },
        }}
        onClickDetails={{
          onClick: () => {
            changeSlide('basic');
          },
        }}
        onClickScoreSetting={{
          onClick: () => {
            // changeSlide('workFlow');
          },
        }}
        onClickScreeningQuestions={{
          onClick: () => {
            changeSlide('screening');
          },
        }}
        onClickWorkflows={{
          onClick: () => {
            changeSlide('workFlow');
          },
        }}
        onClickBack={{
          onClick: () => {
            router.back();
          },
        }}
        isApplyFormActive={slideNo === 3}
        isDetailsActive={slideNo === 1}
        isEmailTemplateActive={slideNo === 4}
        isScreeningQuestionsActive={slideNo === 5}
        isWorkflowsActive={slideNo === 6}
        textJobName={formTitle}
        slotPublishButton={<></>}
        slotSavedChanges={
          <>
            <SyncStatus status={jobForm.syncStatus} />
          </>
        }
        onClickPreview={{
          onClick: () => {
            window.open(
              `${process.env.NEXT_PUBLIC_HOST_NAME}/job-post/${get(
                jobForm,
                'jobPostId',
                '',
              )}`,
              '_blank',
            );
          },
        }}
        // textJobEdit={jobForm.formType === 'edit' ? 'Edit' : 'Create Job'}
      />
    </>
  );
}

export default JobForm;
