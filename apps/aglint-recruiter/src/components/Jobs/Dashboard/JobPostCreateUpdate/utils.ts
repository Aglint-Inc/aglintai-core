import { JobTypeDB } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { get, isEmpty } from 'lodash';

import { supabase } from '@/src/utils/supabase/client';

import { templateObj } from '../../../CompanyDetailComp/EmailTemplate';
import { FormErrorParams } from './JobForm/JobForm';
import { FormJobType, JobFormState } from './JobPostFormProvider';

export async function getVideo(videoId: any) {
  const { data, error } = await supabase
    .from('ai_videos')
    .select()
    .eq('video_id', videoId);
  if (!error) {
    return data[0];
  }
}

export async function saveJobPostToDb(jobForm: JobFormState) {
  const updateJobData = getjobformToDbcolumns(jobForm);

  let [updatedJob] = supabaseWrap(
    await supabase
      .from('public_jobs')
      .upsert({
        id: updateJobData.id,
        recruiter_id: updateJobData.recruiter_id,
        draft: updateJobData,
      })
      .select('*'),
  );

  return updatedJob as JobTypeDB;
}

export const getjobformToDbcolumns = (jobForm: JobFormState) => {
  const updateJobData = {
    id: jobForm.jobPostId,
    logo: jobForm.formFields.logo,
    company: jobForm.formFields.company,
    description: jobForm.formFields.jobDescription,
    job_title: jobForm.formFields.jobTitle,
    job_type: jobForm.formFields.jobType,
    workplace_type: jobForm.formFields.workPlaceType,
    department: jobForm.formFields.department,
    // slug: jobForm.createdAt
    //   ? undefined
    //   : getjobPostSlug(
    //       jobForm.jobPostId,
    //       jobForm.formFields.jobTitle,
    //       jobForm.formFields.company,
    //       jobForm.formFields.jobLocation,
    //     ),
    recruiter_id: jobForm.formFields.recruiterId,
    location: jobForm.formFields.jobLocation,
    email_template: jobForm.formFields.screeningEmail.emailTemplates,
    new_screening_setting: {
      ...jobForm.formFields.newScreeningConfig,
    },
    parameter_weights: jobForm.formFields.resumeScoreSettings,
    status: jobForm.jobPostStatus,
    jd_json: jobForm.formFields.jdJson,
    jd_changed: jobForm.formFields.isjdChanged,
    phone_screen_enabled: jobForm.formFields.isPhoneScreenEnabled,
    screening_template: jobForm.formFields.phoneScreeningTemplateId
      ? jobForm.formFields.phoneScreeningTemplateId
      : undefined,
  };

  return updateJobData;
};

export const API_FAIL_MSG = 'Something went wrong. Please try again.';

export const findDisclaimers = (jobForm: FormJobType) => {
  let warnings: FormErrorParams = {
    details: {
      err: [],
      title: '',
      rightErr: [],
    },
    phoneScreening: {
      err: [],
      title: '',
      rightErr: [],
    },
    screening: {
      err: [],
      title: '',
      rightErr: [],
    },

    templates: {
      err: [],
      title: '',
      rightErr: [],
    },
    workflow: {
      err: [],
      title: '',
      rightErr: [],
    },
    resumeScore: {
      err: [],
      title: '',
      rightErr: [],
    },
  };

  if (isEmpty(jobForm.jobTitle.trim())) {
    warnings.details.err.push('Missing job title');
  }

  if (isEmpty(jobForm.company?.trim())) {
    warnings.details.err.push('Missing company name');
  }

  if (isEmpty(jobForm.jobLocation.trim())) {
    warnings.details.err.push('Missing job location');
  }
  let isJdTooShort =
    !jobForm.jobDescription || jobForm.jobDescription.split(' ').length <= 10;
  if (isJdTooShort) {
    warnings.details.err.push('Job description incomplete');
  }

  if (jobForm.isjdChanged) {
    warnings.resumeScore.err.push('Job description altered');
  }

  if (jobForm.isPhoneScreenEnabled) {
    //
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
    warnings.resumeScore.rightErr.push('Total sections score should be 100');
  }
  return warnings;
};

export const isWarningsCleared = (warnings: FormErrorParams) => {
  let flag = true;
  Object.keys(warnings).forEach((key: JobFormState['currSlide']) => {
    if (
      warnings[String(key)].err.length > 0 ||
      warnings[String(key)]?.rightErr.length > 0
    ) {
      flag = false;
    }
  });

  return flag;
};

export const isEnvProd = () => {
  return process.env.NEXT_PUBLIC_HOST_NAME.includes('app.aglinthq.com');
};

export const slidePathToNum: Record<JobFormState['currSlide'], number> = {
  details: 1,
  resumeScore: 2,
  phoneScreening: 3,
  workflow: 4,
  templates: 5,
};

export const jobSlides: { path: JobFormState['currSlide']; title: string }[] = [
  { title: 'Details', path: 'details' },
  { title: 'Profile Score', path: 'resumeScore' },
  { title: 'Screening', path: 'phoneScreening' },
  { title: 'Workflows', path: 'workflow' },
  { title: 'Email Templates', path: 'templates' },
];

export const isShoWWarn = (
  formType,
  formWarnings: FormErrorParams,
  path,
  slideNum,
  jobPostId,
  isAssesment = false,
) => {
  if (!isAssesment) {
    const isShowWarn =
      (formType === 'edit' &&
        (formWarnings[String(path)].err.length > 0 ||
          formWarnings[String(path)].rightErr.length > 0)) ||
      (formType === 'new' &&
        slideNum <=
          Number(
            localStorage.getItem(`MaxVisitedSlideNo-${jobPostId}`) || -1,
          ) &&
        (formWarnings[String(path)].err.length > 0 ||
          formWarnings[String(path)].rightErr.length > 0));

    return isShowWarn;
  }
};
