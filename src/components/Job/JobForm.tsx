import { Popper, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import { get } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useState } from 'react';

import { CreateNewJob } from '@/devlink';
import toast from '@/src/utils/toast';

import UITypography from '../Common/UITypography';
import { templateObj } from '../CompanyDetailComp/EmailTemplate';
import {
  FormJobType,
  InterviewParam,
  JobFormState,
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

type slideName =
  | 'details'
  | 'templates'
  | 'screening'
  | 'workflow'
  | 'resumeScore';

type FormErrorParams = Record<
  slideName,
  {
    title: string;
    err: string[];
  }
> | null;

function JobForm() {
  const { jobForm, dispatch } = useJobForm();
  const router = useRouter();

  const [formError, setFormError] = useState<JobFormErrorParams>({
    jobTitle: '',
    company: '',
    location: '',
    department: '',
    aiQnGen: 0,
  });

  const [jdWarn, setJdWarn] = useState<'' | 'show' | 'shown'>('');
  let formSlide = <></>;
  const { currSlide } = jobForm;
  if (currSlide === 'details') {
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
  } else if (currSlide === 'applyForm') {
    formSlide = <ApplyForm />;
  } else if (currSlide === 'resumeScore') {
    formSlide = <ScoreSettings />;
  } else if (currSlide === 'templates') {
    formSlide = <Emails />;
  } else if (currSlide == 'screening') {
    formSlide = <ScreeningQns setFormError={setFormError} />;
  } else if (currSlide == 'workflow') {
    formSlide = <ScreeningSettings />;
  }

  const formValidation = () => {
    let flag = true;
    const { company, jobTitle, jobLocation, department } = jobForm.formFields;
    if (currSlide === 'details') {
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

    if (currSlide === 'screening') {
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

  const changeSlide = (nextSlide: JobFormState['currSlide']) => {
    formValidation();
    dispatch({
      type: 'moveToSlide',
      payload: {
        nextSlide: nextSlide,
      },
    });
    handleUpdateMaxVisitedSlideNo(slidePathToNum[String(nextSlide)]);
  };

  let formTitle = `Create Job - ${
    jobForm.formFields.jobTitle ? jobForm.formFields.jobTitle : 'Untitled'
  }`;
  if (jobForm.formType === 'edit') {
    formTitle = `Edit Job - ${
      jobForm.formFields.jobTitle ? jobForm.formFields.jobTitle : 'Untitled'
    }`;
  }
  const warning = findDisclaimers(jobForm.formFields);

  const handleUpdateMaxVisitedSlideNo = (slideNo: number) => {
    if (jobForm.formType === 'edit') return;
    const currMax = Number(
      localStorage.getItem(`MaxVisitedSlideNo-${jobForm.jobPostId}`) || -1,
    );
    if (slideNo > currMax) {
      localStorage.setItem(
        `MaxVisitedSlideNo-${jobForm.jobPostId}`,
        String(slideNo),
      );
    }
  };
  return (
    <>
      <CreateNewJob
        slotCreateJob={<Stack alignItems={'center'}>{formSlide}</Stack>}
        onClickApplyForm={{
          onClick: () => {
            changeSlide('applyForm');
          },
        }}
        onClickEmailTemplates={{
          onClick: () => {
            changeSlide('templates');
          },
        }}
        onClickDetails={{
          onClick: () => {
            changeSlide('details');
          },
        }}
        onClickScoreSetting={{
          onClick: () => {
            changeSlide('resumeScore');
          },
        }}
        onClickScreeningQuestions={{
          onClick: () => {
            changeSlide('screening');
          },
        }}
        onClickWorkflows={{
          onClick: () => {
            changeSlide('workflow');
          },
        }}
        onClickBack={{
          onClick: () => {
            router.back();
          },
        }}
        isApplyFormActive={currSlide === 'applyForm'}
        isDetailsActive={currSlide === 'details'}
        isEmailTemplateActive={currSlide === 'templates'}
        isScreeningQuestionsActive={currSlide === 'screening'}
        isScoreSettingActive={currSlide === 'resumeScore'}
        isWorkflowsActive={currSlide === 'workflow'}
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
              `${process.env.NEXT_PUBLIC_WEBSITE}/job-post/${get(jobForm, 'jobPostId', '')}`,
              '_blank',
            );
          },
        }}
        slotDisclaimerDetails={
          <>
            <SectionWarning
              warnings={warning}
              slidePath={'details'}
              currSlideNo={1}
            />
          </>
        }
        slotDisclaimerApplyForm={
          <>
            {/* <SectionWarning warnings={warning} slidePath={'details'} /> */}
          </>
        }
        slotDisclaimerScoreSetting={
          <>
            <SectionWarning
              warnings={warning}
              slidePath={'resumeScore'}
              currSlideNo={3}
            />
          </>
        }
        slotDisclaimerScreening={
          <>
            <SectionWarning
              warnings={warning}
              slidePath={'screening'}
              currSlideNo={4}
            />
          </>
        }
        slotDisclaimerWorkflow={
          <>
            <SectionWarning
              warnings={warning}
              slidePath={'workflow'}
              currSlideNo={5}
            />
          </>
        }
        slotEmailDisclaimer={
          <>
            <SectionWarning
              warnings={warning}
              slidePath={'templates'}
              currSlideNo={6}
            />
          </>
        }
      />
    </>
  );
}

export default JobForm;

const SectionWarning = ({
  warnings,
  slidePath,
  currSlideNo,
}: {
  warnings: FormErrorParams;
  slidePath: slideName;
  currSlideNo: number;
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    jobForm: { formType, jobPostId },
  } = useJobForm();
  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const isShowWarn =
    (formType === 'edit' && warnings[String(slidePath)].err.length > 0) ||
    (formType === 'new' &&
      currSlideNo <=
        Number(localStorage.getItem(`MaxVisitedSlideNo-${jobPostId}`) || -1) &&
      warnings[String(slidePath)].err.length > 0);

  return (
    <>
      {isShowWarn && (
        <Stack onMouseOver={handleMouseEnter} onMouseOut={handleMouseLeave}>
          <Image
            alt='info'
            height={16}
            width={16}
            src={'/images/svg/info.svg'}
          />
        </Stack>
      )}
      <Popper
        open={open}
        anchorEl={anchorEl}
        sx={{
          zIndex: 1,
          borderRadius: 2,
        }}
      >
        <Paper sx={{ p: 1, mt: 4.5, width: '320px', borderRadius: '10px' }}>
          <Stack gap={2} borderRadius={4}>
            <Stack direction={'row'} gap={0.5} alignItems={'center'}>
              <Image
                alt='info'
                height={14}
                width={14}
                src={'/images/svg/info.svg'}
              />
              <UITypography fontBold='normal' type='small'>
                Warnings
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
        </Paper>
      </Popper>
    </>
  );
};

const findDisclaimers = (jobForm: FormJobType) => {
  let warnings: FormErrorParams = {
    details: {
      err: [],
      title: '',
    },
    screening: {
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
    resumeScore: {
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

  // screening qns
  const totalQns = Object.keys(jobForm.interviewConfig)
    .map((key: InterviewParam) => {
      return jobForm.interviewConfig[String(key)].questions;
    })
    .reduce((prev, curr) => {
      return prev + curr.length;
    }, 0);

  if (totalQns < 5) {
    warnings.screening.err.push('Please provide minimum 5 screening questions');
  }
  if (totalQns > 20) {
    warnings.screening.err.push(
      'Please provide maximum 20 screening questions',
    );
  }

  Object.keys(get(jobForm, 'screeningEmail.emailTemplates', {})).map(
    (emailPath) => {
      const template = jobForm.screeningEmail.emailTemplates[String(emailPath)];

      if (isEmpty(template.fromName.trim())) {
        warnings.templates.err.push(
          `Please provide From name template ${
            templateObj[String(emailPath)].listing
          }`,
        );
      }

      if (isEmpty(template.subject.trim())) {
        warnings.templates.err.push(
          `Please provide Subject template ${
            templateObj[String(emailPath)].listing
          }`,
        );
      }

      if (isEmpty(template.body.trim())) {
        warnings.templates.err.push(
          `Please provide email body for template ${
            templateObj[String(emailPath)].listing
          }`,
        );
      }
    },
  );

  const totalResScore = Object.values(jobForm.resumeScoreSettings).reduce(
    (acc, curr) => acc + curr,
    0,
  );
  if (totalResScore !== 100) {
    warnings.resumeScore.err.push('Total sections score should be 100');
  }
  return warnings;
};

const slidePathToNum: Record<JobFormState['currSlide'], number> = {
  details: 1,
  applyForm: 2,
  resumeScore: 3,
  screening: 4,
  workflow: 5,
  templates: 6,
};
