import { get, isEmpty } from 'lodash';

import { JobTypeDB } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';

import { FormErrorParams } from './JobForm/JobForm';
import {
  AssesMenusType,
  FormJobType,
  InterviewParam,
  JobFormState,
} from './JobPostFormProvider';
import { templateObj } from '../../CompanyDetailComp/EmailTemplate';

export const supabaseWrap = ({ data, error }: { data: any; error: any }) => {
  if (error) throw new Error(error.message);
  return data;
};

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
      .select(),
  );

  return updatedJob as JobTypeDB;
}

const getjobPostSlug = (
  jobId: string,
  jobTitle: string,
  company: string,
  location: string,
) => {
  if (!jobId || !jobTitle || !company || !location) return '';

  const convertedJobTitle = jobTitle
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/,/g, '')
    .replace(/\//g, '-')
    .replace(/[()]/g, '');
  const convertedCompany = company
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/,/g, '');
  const convertedJobLocation = location
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/,/g, '');
  let slug = `${convertedJobTitle}-at-${convertedCompany}-${convertedJobLocation}-${jobId}`;
  return slug;
};

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
    slug: jobForm.createdAt
      ? undefined
      : getjobPostSlug(
          jobForm.jobPostId,
          jobForm.formFields.jobTitle,
          jobForm.formFields.company,
          jobForm.formFields.jobLocation,
        ),
    recruiter_id: jobForm.formFields.recruiterId,
    location: jobForm.formFields.jobLocation,
    email_template: jobForm.formFields.screeningEmail.emailTemplates,
    screening_questions: jobForm.formFields.interviewConfig,
    new_screening_setting: {
      ...jobForm.formFields.newScreeningConfig,
    },
    parameter_weights: jobForm.formFields.resumeScoreSettings,
    video_assessment: jobForm.formFields.videoAssessment,
    intro_videos: jobForm.formFields.interviewSetting,
    start_video: jobForm.formFields.startVideo,
    end_video: jobForm.formFields.endVideo,
    status: jobForm.jobPostStatus,
    interview_instructions: jobForm.formFields.interviewInstrctions,
    assessment: jobForm.formFields.assessment,
    jd_json: jobForm.formFields.jdJson,
    phone_screening: jobForm.formFields.phoneScreening,
    jd_changed: jobForm.formFields.isjdChanged,
    phone_screen_enabled: jobForm.formFields.isPhoneScreenEnabled,
  };

  return updateJobData;
};

export const API_FAIL_MSG = 'Something went wrong please try again';

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
    assesqns: {
      err: [],
      title: '',
      rightErr: [],
    },
    epilogue: {
      err: [],
      title: '',
      rightErr: [],
    },
    instructions: {
      err: [],
      title: '',
      rightErr: [],
    },
    settings: {
      err: [],
      title: '',
      rightErr: [],
    },
    welcome: {
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

  if (jobForm.assessment && isEmpty(jobForm.interviewInstrctions)) {
    warnings.instructions.err.push('Please Provide Assessment Instructions');
  }

  if (
    jobForm.assessment &&
    jobForm.interviewSetting.showInstructionVideo &&
    isEmpty(jobForm.interviewSetting.aiGeneratedVideoInfo.videoUrl) &&
    isEmpty(jobForm.interviewSetting.uploadedVideoInfo.videoUrl)
  ) {
    warnings.instructions.err.push('Please add instruction video');
  }

  if (jobForm.isPhoneScreenEnabled) {
    if (jobForm.phoneScreening.questions.length === 0) {
      warnings.phoneScreening.err.push(
        'Please provide atleast 1 screening questions',
      );
    }
  }
  // screening qns
  const totalQns = Object.keys(jobForm.interviewConfig)
    .map((key: InterviewParam) => {
      return jobForm.interviewConfig[String(key)].questions;
    })
    .reduce((prev, curr) => {
      return prev + curr.length;
    }, 0);

  if (jobForm.assessment && totalQns < 1) {
    warnings.assesqns.err.push('Please provide atleast 1 assessment questions');
  }
  if (jobForm.assessment && totalQns > 20) {
    warnings.assesqns.err.push(
      'Please provide maximum 20 assessment questions',
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
  screening: 4,
  workflow: 5,
  templates: 6,
};

export const jobSlides: { path: JobFormState['currSlide']; title: string }[] = [
  { title: 'Details', path: 'details' },
  { title: 'Profile Score', path: 'resumeScore' },
  { title: 'Screening', path: 'phoneScreening' },
  { title: 'Assessment', path: 'screening' },
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
  } else {
    if (formType === 'edit') {
      let slides: AssesMenusType[] = [
        'assesqns',
        'epilogue',
        'instructions',
        'settings',
        'welcome',
      ];
      let isErr = false;
      slides.forEach((slide) => {
        if (formWarnings[String(slide)].err.length > 0) {
          isErr = true;
        }
      });
      return isErr;
    }
  }
};
