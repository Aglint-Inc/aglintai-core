import { get } from 'lodash';
import { nanoid } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';

import { JobTypeDB } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';

import { JobFormState } from './JobPostFormProvider';
import { scoreWheelDependencies } from '../../Common/ScoreWheel';

export const getSeedJobFormData = (
  recruiter?: Database['public']['Tables']['recruiter']['Row'],
) => {
  const seedFormState: JobFormState = {
    isFormOpen: false,
    createdAt: undefined,
    updatedAt: undefined,
    jobPostId: uuidv4(),
    syncStatus: '',
    formType: 'new',
    currSlide: 'details',
    formFields: {
      company: '',
      jobLocation: '',
      jobTitle: '',
      jobType: 'fullTime',
      department: '',
      logo: '',
      defaultJobType: [],
      defaultWorkPlaceTypes: [],
      workPlaceType: 'onSite',
      skills: [],
      jobDescription: '',
      interviewType: 'questions-preset',
      defaultAddress: [],
      defaultDepartments: [],
      interviewConfig: [
        {
          category: 'skill',
          copy: 'Skill',
          id: nanoid(),
          questions: [],
        },
        {
          category: 'behavior',
          copy: 'Behavior',
          id: nanoid(),
          questions: [],
        },
        {
          category: 'communication',
          copy: 'communication',
          id: nanoid(),
          questions: [],
        },
        {
          category: 'performance',
          copy: 'Performance',
          id: nanoid(),
          questions: [],
        },
        {
          category: 'education',
          copy: 'Education',
          id: nanoid(),
          questions: [],
        },
        {
          category: 'general',
          copy: 'General',
          id: nanoid(),
          questions: [],
        },
      ],
      screeningEmail: {
        date: new Date().toISOString(),
        isImmediate: true,
        emailTemplates: {},
      },
      newScreeningConfig: {
        screening: {
          qualificationRange: null,
          isManual: true,
        },
        interview: {
          qualificationRange: null,
          isManual: true,
        },
        interviewMail: {
          timestamp: null,
          isManual: true,
        },
        disqualifiedMail: {
          timestamp: null,
          isManual: true,
        },
        feedbackVisible: false,
      },
      resumeScoreSettings: {
        ...scoreWheelDependencies.initialScoreWheelWeights,
      },
      recruiterId: '',
      videoAssessment: false,
    },
  };

  if (recruiter) {
    const defaultAddress = get(recruiter, 'office_locations', []).map((s) => ({
      label: [s.city, s.region, s.country].filter(Boolean).join(', '),
      value: [s.city, s.region, s.country].filter(Boolean).join(', '),
    }));

    seedFormState.formFields.recruiterId = recruiter.id;
    seedFormState.formFields.company = recruiter.name;
    seedFormState.formFields.logo = recruiter.logo;
    seedFormState.formFields.videoAssessment = recruiter.video_assessment;
    seedFormState.formFields.defaultWorkPlaceTypes = Object.keys(
      recruiter.workplace_type,
    ).map((o) => {
      if (o === 'hybrid') {
        return {
          value: o,
          name: 'Hybrid',
        };
      } else if (o === 'onsite') {
        return {
          name: 'On Site',
          value: o,
        };
      } else if (o === 'offsite') {
        return {
          name: 'Off Site',
          value: o,
        };
      }
    });
    seedFormState.formFields.defaultJobType = Object.keys(
      recruiter.employment_type,
    ).map((o) => {
      if (o === 'contract') {
        return {
          name: 'Contract',
          value: o,
        };
      } else if (o === 'fulltime') {
        return {
          name: 'Full Time',
          value: o,
        };
      } else if (o === 'parttime') {
        return {
          name: 'Part Time',
          value: o,
        };
      } else if (o === 'temporary') {
        return {
          name: 'Temporary',
          value: o,
        };
      } else if (o === 'volunteer') {
        return {
          name: 'Volunteer',
          value: o,
        };
      } else if (o === 'internship') {
        return {
          name: 'Internship',
          value: o,
        };
      }
    });
    seedFormState.formFields.workPlaceType = 'onsite';
    seedFormState.formFields.jobType = 'fulltime';
    seedFormState.formFields.jobLocation = get(defaultAddress, '[0].value', '');
    seedFormState.formFields.department = get(recruiter, 'departments[0]', '');

    seedFormState.formFields.defaultAddress = defaultAddress;
    seedFormState.formFields.screeningEmail = {
      ...seedFormState.formFields.screeningEmail,
      emailTemplates: get(
        recruiter,
        'email_template',
        {},
      ) as JobFormState['formFields']['screeningEmail']['emailTemplates'],
    };
    seedFormState.formFields.defaultDepartments = get(
      recruiter,
      'departments',
      [],
    ).map((d) => ({ label: d, value: d }));
  }

  return seedFormState;
};

export const dbToClientjobPostForm = (
  jobPost: JobTypeDB,
  recruiter: Database['public']['Tables']['recruiter']['Row'],
) => {
  const seedData = getSeedJobFormData(recruiter);
  const jp: JobFormState = {
    ...seedData,
    createdAt: jobPost.created_at,
    formType: 'edit',
    jobPostId: jobPost.id,
    currSlide: 'details',
    updatedAt: '',
    formFields: {
      ...seedData.formFields,
      company: jobPost.company,
      workPlaceType: jobPost.workplace_type,
      interviewConfig: get(
        jobPost,
        'screening_questions',
        seedData.formFields.interviewConfig,
      ) as any,
      interviewType: get(
        jobPost,
        'screening_setting.interviewType',
        'questions-preset',
      ),
      department: jobPost.department,
      jobDescription: jobPost.description,
      jobLocation: jobPost.location,
      logo: jobPost.logo,
      skills: get(jobPost, 'skills', []),
      jobTitle: jobPost.job_title,
      jobType: jobPost.job_type,
      newScreeningConfig: {
        screening: {
          ...(get(
            jobPost,
            'new_screening_setting.screening',
            seedData.formFields.newScreeningConfig.screening,
          ) as any),
        },
        interview: {
          ...(get(
            jobPost,
            'new_screening_setting.interview',
            seedData.formFields.newScreeningConfig.interview,
          ) as any),
        },
        interviewMail: {
          ...(get(
            jobPost,
            'new_screening_setting.interviewMail',
            seedData.formFields.newScreeningConfig.interviewMail,
          ) as any),
        },
        disqualifiedMail: {
          ...(get(
            jobPost,
            'new_screening_setting.disqualifiedMail',
            seedData.formFields.newScreeningConfig.disqualifiedMail,
          ) as any),
        },
        feedbackVisible: get(
          jobPost,
          'new_screening_setting.feedbackVisible',
          seedData.formFields.newScreeningConfig.feedbackVisible,
        ) as boolean,
      },
      resumeScoreSettings: {
        ...(get(jobPost, 'parameter_weights', {
          ...scoreWheelDependencies.initialScoreWheelWeights,
        }) as JobFormState['formFields']['resumeScoreSettings']),
      },
      videoAssessment: jobPost.video_assessment,
    },
  };

  return jp;
};
