/* eslint-disable security/detect-object-injection */
import { useRouter } from 'next/router';

import {
  useAllAssessments,
  useAllAssessmentTemplates
} from '@/src/queries/assessment';
import { Assessment } from '@/src/queries/assessment/types';
import { Job } from '@/src/queries/job/types';
import {
  useJobLocations,
  useJobMatches,
  useJobSkills,
  useJobTenureAndExperience
} from '@/src/queries/job-dashboard';

import { useAuthDetails } from '../AuthContext/AuthContext';
import { useJobs } from '../JobsContext';

const useProviderJobDashboardActions = (job_id: string = undefined) => {
  const { recruiter } = useAuthDetails();
  const router = useRouter();
  const { jobsData, initialLoad: jobLoad } = useJobs();
  const initialJobLoad = recruiter?.id && jobLoad ? true : false;
  const jobId = job_id ?? (router.query?.id as string);
  const job = initialJobLoad
    ? jobsData.jobs.find((job) => job.id === jobId)
    : undefined;
  const assessments = useAllAssessments();
  const templates = useAllAssessmentTemplates();
  const assessmentData = assessments?.data
    ? assessments.data.reduce(
        (acc, curr) => {
          if (curr.jobs.find(({ id }) => id === jobId))
            acc.jobAssessments.push(curr);
          else if (curr.duration) acc.otherAssessments.push(curr);
          return acc;
        },
        {
          jobAssessments: [] as Assessment[],
          otherAssessments: [] as Assessment[]
        }
      )
    : {
        jobAssessments: [] as Assessment[],
        otherAssessments: [] as Assessment[]
      };
  const skills = useJobSkills();
  const locations = useJobLocations();
  const matches = useJobMatches();
  const tenureAndExperience = useJobTenureAndExperience();
  const draftValidity = getDraftValidity(job);

  const initialLoad =
    jobLoad &&
    assessments.status !== 'pending' &&
    tenureAndExperience.status !== 'pending' &&
    templates.status !== 'pending' &&
    matches.status !== 'pending' &&
    skills.status !== 'pending' &&
    locations.status !== 'pending'
      ? true
      : false;

  const value = {
    job,
    draftValidity,
    initialLoad,
    assessments: {
      ...assessments,
      data: assessmentData
    },
    tenureAndExperience,
    templates,
    skills,
    locations,
    matches
  };

  return value;
};

export const getDraftValidity = (job: Job) => {
  if (!job) return false;
  //TODO: HACK FOR BACKWARD COMPATABILITY, DELETE LATER
  const draft = {
    job_title: job.job_title,
    company: job.company,
    department: job.department,
    description: job.description,
    job_type: job.job_type,
    location: job.location,
    workplace_type: job.workplace_type,
    ...(job.draft ?? {})
  };
  return Object.entries(draft).reduce((acc, [key, value]) => {
    if (acc) {
      const safeKey = key as keyof typeof draft;
      switch (safeKey) {
        case 'jd_json':
          return acc;
        case 'description':
          return !validateDescription(value as string);
        //TODO: HACK HERE AGAIN
        case 'company':
        case 'department':
        case 'job_title':
        case 'job_type':
        case 'location':
        case 'workplace_type':
          return !validateString(value as string);
        default:
          return acc;
      }
    }
    return acc;
  }, true);
};

export const validateString = (str: string) => {
  return !str || typeof str !== 'string' || str.length === 0;
};

export const validateDescription = (str: string) => {
  return validateString(str) || str.length < 100;
};

export default useProviderJobDashboardActions;
