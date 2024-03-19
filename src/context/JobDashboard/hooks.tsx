/* eslint-disable security/detect-object-injection */
import { useRouter } from 'next/router';
import { useState } from 'react';

import { JdJsonType } from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import {
  useAllAssessments,
  useAllAssessmentTemplates,
} from '@/src/queries/assessment';
import { Assessment } from '@/src/queries/assessment/types';
import { Job } from '@/src/queries/job/types';
import {
  useJobLocations,
  useJobMatches,
  useJobSchedules,
  useJobSkills,
  useJobTenureAndExperience,
} from '@/src/queries/job-dashboard';
import { useJobScoringPoll } from '@/src/queries/job-scoring-param';

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
          otherAssessments: [] as Assessment[],
        },
      )
    : {
        jobAssessments: [] as Assessment[],
        otherAssessments: [] as Assessment[],
      };
  const skills = useJobSkills();
  const locations = useJobLocations();
  const matches = useJobMatches();
  const tenureAndExperience = useJobTenureAndExperience();
  const schedules = useJobSchedules();
  const scoringPoll = useJobScoringPoll();

  const draftValidity = getDraftValidity(job);

  const jdValidity = !validateJd(job?.draft?.jd_json);

  const publishable = draftValidity && jdValidity;
  const [dismiss, setDismiss] = useState(false);

  const status = job &&
    jobLoad && {
      loading: job.scoring_param_status === 'loading',
      description_error:
        job.scoring_param_status !== 'loading' &&
        validateDescription(job?.draft?.description ?? ''),
      description_changed:
        job.scoring_param_status !== 'loading' &&
        hashCode(job?.draft?.description ?? '') !== job?.description_hash,
      generation_error:
        job.scoring_param_status !== 'loading' &&
        job.scoring_param_status === null &&
        !validateDescription(job?.draft?.description ?? ''),
    };

  const initialLoad =
    jobLoad &&
    assessments.status !== 'pending' &&
    schedules.status !== 'pending' &&
    scoringPoll.status !== 'pending' &&
    tenureAndExperience.status !== 'pending' &&
    templates.status !== 'pending' &&
    matches.status !== 'pending' &&
    skills.status !== 'pending' &&
    locations.status !== 'pending'
      ? true
      : false;

  const value = {
    job,
    dismiss,
    setDismiss,
    draftValidity,
    jdValidity,
    scoringPoll,
    schedules,
    status,
    publishable,
    initialLoad,
    assessments: {
      ...assessments,
      data: assessmentData,
    },
    tenureAndExperience,
    templates,
    skills,
    locations,
    matches,
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
    ...(job.draft ?? {}),
  };
  return Object.entries(draft).reduce((acc, [key, value]) => {
    if (acc) {
      const safeKey = key as keyof typeof draft;
      switch (safeKey) {
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

export const validateJd = (jd_json: JdJsonType) => {
  return (
    !jd_json ||
    Object.entries(jd_json).length === 0 ||
    Object.values(jd_json).filter((a) => Array.isArray(a) && a.length !== 0)
      .length === 0
  );
};

export const validateString = (str: string) => {
  return !str || typeof str !== 'string' || str.length === 0;
};

export const validateDescription = (str: string) => {
  return validateString(str) || str.length < 100;
};

export const hashCode = (str: string) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i);
    hash = (hash << 5) - hash + code;
    hash = hash & hash;
  }
  return hash;
};

export default useProviderJobDashboardActions;
