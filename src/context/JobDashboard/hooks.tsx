/* eslint-disable security/detect-object-injection */
import { useRouter } from 'next/router';
import { useState } from 'react';

import { getHelper } from '@/src/components/JobEmailTemplates';
import { templateObj } from '@/src/components/JobEmailTemplates/utils';
import { JdJsonType } from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import {
  useAllAssessments,
  useAllAssessmentTemplates,
} from '@/src/queries/assessment';
import { Assessment } from '@/src/queries/assessment/types';
import { Job } from '@/src/queries/job/types';
import {
  useJobDashboardRefresh,
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
  const {
    jobsData,
    initialLoad: jobLoad,
    handleJobRefresh: jobRefresh,
  } = useJobs();
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
  const refreshDashboard = useJobDashboardRefresh();
  const locations = useJobLocations();
  const matches = useJobMatches();
  const tenureAndExperience = useJobTenureAndExperience();
  const schedules = useJobSchedules();
  const scoringPoll = useJobScoringPoll();

  const settingsValidity = getSettingsValidity(job);

  const jdValidity = !validateJd(job?.draft?.jd_json);

  const publishStatus = {
    settingsValidity,
    jdValidity,
    loading: job?.scoring_criteria_loading,
    publishable:
      settingsValidity && jdValidity && !job?.scoring_criteria_loading,
  };
  settingsValidity && jdValidity && !job.scoring_criteria_loading;
  const [dismiss, setDismiss] = useState(false);
  // console.log(hashCode(job?.draft?.description ?? ''), job?.description_hash);

  const jobPolling =
    !!job &&
    job?.status === 'published' &&
    (job?.processing_count?.['not started'] !== 0 ||
      job?.processing_count?.processing !== 0);

  const status = job &&
    jobLoad && {
      loading: job.scoring_criteria_loading,
      description_error:
        !job.scoring_criteria_loading &&
        validateDescription(job?.draft?.description ?? ''),
      description_changed:
        !job.scoring_criteria_loading &&
        !dismiss &&
        hashCode(job?.draft?.description ?? '') !== job?.description_hash,
      jd_json_error: !job.scoring_criteria_loading && !jdValidity,
    };

  const initialLoad = !!(
    jobLoad &&
    assessments.status !== 'pending' &&
    schedules.status !== 'pending' &&
    scoringPoll.status !== 'pending' &&
    tenureAndExperience.status !== 'pending' &&
    templates.status !== 'pending' &&
    matches.status !== 'pending' &&
    skills.status !== 'pending' &&
    locations.status !== 'pending'
  );

  const handleJobRefresh = async () => {
    await jobRefresh(job?.id);
    refreshDashboard(job?.id);
  };

  const emailTemplateValidity = validateEmailTemplates(job?.email_template);

  const value = {
    job,
    dismiss,
    jobPolling,
    emailTemplateValidity,
    setDismiss,
    handleJobRefresh,
    scoringPoll,
    schedules,
    status,
    publishStatus,
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

export const getSettingsValidity = (job: Job) => {
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

export const validateEmailTemplates = (
  emailTemplates: Job['email_template'],
) => {
  return (
    emailTemplates &&
    Object.entries(emailTemplates).reduce((acc, [key, value]) => {
      const label = templateObj[key]?.heading;
      Object.entries(value).forEach(([key, value]) => {
        if (key !== 'default' && validateString(value))
          acc.push(`${getHelper(key as any)} in ${label}`);
      });
      return acc;
    }, [] as string[])
  );
};

export default useProviderJobDashboardActions;
