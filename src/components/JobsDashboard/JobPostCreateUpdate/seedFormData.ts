import { get } from 'lodash';
import { nanoid } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';

import { JobTypeDB } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';

import { JobFormState } from './JobPostFormProvider';

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
    slideNo: 0,
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
      interviewConfig: {
        skill: {
          id: nanoid(),
          copy: 'Skill',
          questions: [],
          value: false,
        },
        cultural: {
          id: nanoid(),
          copy: 'Cultural',
          value: false,
          questions: [],
        },
        personality: {
          id: nanoid(),
          copy: 'Personality',
          questions: [],
          value: false,
        },
        softSkills: {
          id: nanoid(),
          copy: 'Soft Skills',
          questions: [],
          value: false,
        },
      },
      screeningConfig: {
        feedbackVisible: false,
        screening: {
          isSendInterviewToAll: false,
          minNoResumeScore: 50,
        },
        useAglintMatchingAlgo: true,
        shortlist: {
          interviewScore: true,
          minInterviewScore: 80,
        },
        screeningEmail: {
          date: new Date().toISOString(),
          isImmediate: true,
          emailTemplates: {},
        },
      },
      recruiterId: '',
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
    seedFormState.formFields.screeningConfig.screeningEmail = {
      ...seedFormState.formFields.screeningConfig.screeningEmail,
      emailTemplates: get(
        recruiter,
        'email_template',
        {},
      ) as JobFormState['formFields']['screeningConfig']['screeningEmail']['emailTemplates'],
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
    slideNo: 1,
    updatedAt: '',
    formFields: {
      ...seedData.formFields,
      company: jobPost.company,
      workPlaceType: jobPost.workplace_type,
      interviewConfig: {
        cultural: get(
          jobPost,
          'screening_questions[0].cultural',
          seedData.formFields.interviewConfig.cultural,
        ),
        personality: get(
          jobPost,
          'screening_questions[0].personality',
          seedData.formFields.interviewConfig.personality,
        ),
        skill: get(
          jobPost,
          'screening_questions[0].skill',
          seedData.formFields.interviewConfig.skill,
        ),
        softSkills: get(
          jobPost,
          'screening_questions[0].softSkills',
          seedData.formFields.interviewConfig.softSkills,
        ),
      },
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
      screeningConfig: {
        screening: {
          ...get(
            jobPost,
            'screening_setting.screening',
            seedData.formFields.screeningConfig.screening,
          ),
        },
        shortlist: {
          ...get(
            jobPost,
            'screening_setting.shortlist',
            seedData.formFields.screeningConfig.shortlist,
          ),
        },
        feedbackVisible: get(
          jobPost,
          'screening_setting.feedbackVisible',
          seedData.formFields.screeningConfig.feedbackVisible,
        ),
        useAglintMatchingAlgo: get(
          jobPost,
          'screening_setting.useAglintMatchingAlgo',
          seedData.formFields.screeningConfig.useAglintMatchingAlgo,
        ),
        screeningEmail: {
          ...get(
            jobPost,
            'screening_setting.screeningEmail',
            seedData.formFields.screeningConfig.screeningEmail,
          ),
          emailTemplates: get(jobPost, 'email_template', {}) as any,
        },
      },
    },
  };

  return jp;
};
