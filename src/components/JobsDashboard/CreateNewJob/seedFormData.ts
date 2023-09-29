import { get } from 'lodash';
import { nanoid } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';

import { Database } from '@/src/types/schema';

import { JobFormState } from './JobPostFormProvider';

export const getSeedJobFormData = (
  recruiter?: Database['public']['Tables']['recruiter']['Row'],
) => {
  const seedFormState: JobFormState = {
    createdAt: undefined,
    updatedAt: undefined,
    jobPostId: uuidv4(),
    formType: 'new',
    slideNo: 0,
    formFields: {
      applicantsCount: 0,
      company: '',
      interviewingCount: 0,
      jobLocation: '',
      jobTitle: '',
      jobType: 'fullTime',
      shortListedCount: 0,
      logo: '',
      defaultJobType: [],
      defaultWorkPlaceTypes: [],
      status: 'inactive',
      workPlaceType: 'onSite',
      skills: [],
      jobDescription: '',
      interviewType: 'questions-preset',
      defaultAddress: [],
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
          minScore: true,
          minApplicants: true,
          minNoApplicants: 40,
          minNoResumeScore: 50,
        },
        useAglintMatchingAlgo: true,
        shortlist: {
          algoScore: true,
          interviewScore: true,
          minAlgoScore: 8,
          minInterviewScore: 80,
        },
      },
      recruiterId: '',
    },
  };

  if (recruiter) {
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
    seedFormState.formFields.jobLocation = get(
      recruiter,
      'office_locations[0]',
      '',
    );
    seedFormState.formFields.defaultAddress = get(
      recruiter,
      'office_locations',
      [],
    ).map((s) => ({ label: s, value: s }));
  }

  return seedFormState;
};
