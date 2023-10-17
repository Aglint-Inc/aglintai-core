import { Stack } from '@mui/material';
import { get } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useState } from 'react';
import React from 'react';

import { CreateNewJob } from '@/devlink';
import { useJobs } from '@/src/context/JobsContext';
import toast from '@/src/utils/toast';

import { ScoreWheelParams } from '../Common/ScoreWheel';
import UITypography from '../Common/UITypography';
import {
  FormJobType,
  useJobForm,
} from '../JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import ApplyForm from '../JobsDashboard/JobPostCreateUpdate/JobPostForms/ApplyForm';
import BasicStepOne from '../JobsDashboard/JobPostCreateUpdate/JobPostForms/BasicStepOne';
import BasicStepTwo from '../JobsDashboard/JobPostCreateUpdate/JobPostForms/BasicStepTwo';
import Emails from '../JobsDashboard/JobPostCreateUpdate/JobPostForms/EmailTemplates';
import ScoreSettings from '../JobsDashboard/JobPostCreateUpdate/JobPostForms/ScoreSettings';
import ScreeningQns from '../JobsDashboard/JobPostCreateUpdate/JobPostForms/ScreeningQns';
import ScreeningSettings from '../JobsDashboard/JobPostCreateUpdate/JobPostForms/ScreeningSettings';
import SyncStatus from '../JobsDashboard/JobPostCreateUpdate/JobPostForms/SyncStatus';

export type JobFormErrorParams = {
  jobTitle: string;
  company: string;
  location: string;
  department: string;
  aiQnGen: number;
};

type slideName = 'details' | 'templates' | 'qns' | 'workflow';
type FormErrorParams = Record<
  slideName,
  {
    title: string;
    err: string[];
  }
> | null;

function JobForm() {
  const { jobForm, dispatch } = useJobForm();
  const { handleGetJob } = useJobs();
  const router = useRouter();
  const jobId = router.query.job_id as string;
  const currentJob = handleGetJob(jobId);

  const [formError, setFormError] = useState<JobFormErrorParams>({
    jobTitle: '',
    company: '',
    location: '',
    department: '',
    aiQnGen: 0,
  });
  // const [showWarn, setShowWarn] = useState(true);
  const [jdWarn, setJdWarn] = useState<'' | 'show' | 'shown'>('');
  let formSlide = <></>;
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
  } else if (slideNo === 3) {
    formSlide = (
      <ScoreSettings
        defaultWeights={currentJob.parameter_weights as ScoreWheelParams}
        jobId={currentJob.id}
      />
    );
  } else if (slideNo === 4) {
    formSlide = <Emails />;
  } else if (slideNo == 5) {
    formSlide = <ScreeningQns setFormError={setFormError} />;
  } else if (slideNo == 6) {
    formSlide = <ScreeningSettings />;
  }

  const formValidation = () => {
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
        return false;
      }

      if (isEmpty(get(jobForm, 'formFields.skills', []))) {
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
          return false;
        }
        totalQns += count;
      }
      if (get(interviewConfig, 'behavior.value', false)) {
        let count = get(interviewConfig, 'behavior.questions', []).length;
        if (count === 0) {
          return false;
        }
        totalQns += count;
      }
      if (get(interviewConfig, 'communication.value', false)) {
        let count = get(interviewConfig, 'communication.questions', []).length;
        if (count === 0) {
          return false;
        }
        totalQns += count;
      }
      if (get(interviewConfig, 'performance.value', false)) {
        let count = get(interviewConfig, 'performance.questions', []).length;
        if (count === 0) {
          return false;
        }
        totalQns += count;
      }
      if (get(interviewConfig, 'education.value', false)) {
        let count = get(interviewConfig, 'education.questions', []).length;
        if (count === 0) {
          return false;
        }
        totalQns += count;
      }
      if (get(interviewConfig, 'general.value', false)) {
        let count = get(interviewConfig, 'general.questions', []).length;
        if (count === 0) {
          return false;
        }
        totalQns += count;
      }
      if (totalQns < 10 || totalQns > 25) {
        flag = false;
      }
    }
    return flag;
  };

  const changeSlide = (
    slide:
      | 'basic'
      | 'applyfrom'
      | 'email'
      | 'screening'
      | 'workFlow'
      | 'scoreSettings',
  ) => {
    formValidation();
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
    } else if (slide === 'scoreSettings') {
      dispatch({
        type: 'moveToSlide',
        payload: {
          slideNo: 3,
        },
      });
    }
  };

  let formTitle = `Create Job - ${jobForm.formFields.jobTitle}`;
  if (jobForm.formType === 'edit') {
    formTitle = `Edit Job - ${jobForm.formFields.jobTitle}`;
  }

  const warning = findDisclaimers(jobForm.formFields);
  return (
    <>
      <CreateNewJob
        slotCreateJob={<Stack alignItems={'center'}>{formSlide}</Stack>}
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
            changeSlide('scoreSettings');
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
        isApplyFormActive={slideNo === 2}
        isDetailsActive={slideNo === 1}
        isEmailTemplateActive={slideNo === 4}
        isScreeningQuestionsActive={slideNo === 5}
        isScoreSettingActive={slideNo === 3}
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
        slotDisclaimerDetails={
          <>
            <SectionWarning warnings={warning} slidePath={'details'} />
          </>
        }
        isDisclaimerDetailsVisible={!isEmpty(get(warning, 'details.err', []))}
        isDisclaimerApplyFormVisible={true}
        isDisclaimerScreeningVisible={true}
        isDisclaimerEmailVisible={true}
        isDisclaimerScoreVisible={true}
        isDisclaimerWorkflowVisible={true}
        isSavedChangesVisible={true}
        // textJobEdit={jobForm.formType === 'edit' ? 'Edit' : 'Create Job'}
      />
    </>
  );
}

export default JobForm;

const SectionWarning = ({
  warnings,
  slidePath,
}: {
  warnings: FormErrorParams;
  slidePath: slideName;
}) => {
  return (
    <Stack gap={2}>
      <Stack direction={'row'} gap={0.5} alignItems={'center'}>
        <Image alt='info' height={14} width={14} src={'/images/svg/info.svg'} />
        <UITypography fontBold='normal' type='small'>
          Details
        </UITypography>
      </Stack>
      <Stack>
        <ul>
          {warnings[String(slidePath)].err.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      </Stack>
    </Stack>
  );
};

const findDisclaimers = (jobForm: FormJobType) => {
  let warnings: FormErrorParams = {
    details: {
      err: [],
      title: '',
    },
    qns: {
      err: [],
      title: '',
    },
    templates: {
      err: [],
      title: '',
    },
    workflow: {
      err: [],
      title: '',
    },
  };

  if (isEmpty(jobForm.jobTitle.trim())) {
    warnings.details.err.push('Missing job title');
  }

  if (isEmpty(jobForm.company.trim())) {
    warnings.details.err.push('Missing company name');
  }

  if (isEmpty(jobForm.jobLocation.trim())) {
    warnings.details.err.push('Missing job location');
  }

  if (isEmpty(get(jobForm, 'jobDescription', ''))) {
    warnings.details.err.push('Missing job description');
  }

  if (isEmpty(get(jobForm, 'skills', []))) {
    warnings.details.err.push('Select skills for job description');
  }
  if (isEmpty(jobForm.department.trim())) {
    warnings.details.err.push('Missing department');
  }
  return warnings;
};
