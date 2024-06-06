/* eslint-disable security/detect-object-injection */
import {
  JobDetailsForm,
  JobHiringTeamForm,
} from '@/src/components/JobCreate/form';
import { getHelper } from '@/src/components/JobEmailTemplates';
import { templateObj } from '@/src/components/JobEmailTemplates/utils';
import { JdJsonType } from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import {
  useAllAssessments,
  useAllAssessmentTemplates,
} from '@/src/queries/assessment';
import { Assessment } from '@/src/queries/assessment/types';
import { useInterviewPlans } from '@/src/queries/interview-plans';
import {
  useJobDashboardRefresh,
  useJobInterviewPlanEnabled,
  useJobLocations,
  useJobMatches,
  useJobSchedules,
  useJobSkills,
  useJobTenureAndExperience,
} from '@/src/queries/job-dashboard';
import { useJobScoringPoll } from '@/src/queries/job-scoring';
import { useJobWorkflow } from '@/src/queries/job-workflow';
import { Job } from '@/src/queries/jobs/types';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import { useJob } from '../JobContext';
import { useJobs } from '../JobsContext';
import { useJobDashboardStore } from './store';

const useProviderJobDashboardActions = () => {
  const { handleJobRefresh: jobRefresh } = useJobs();
  const { jobLoad, job, job_id } = useJob();

  const assessments = useAllAssessments();
  const templates = useAllAssessmentTemplates();
  const assessmentData = assessments?.data
    ? assessments.data.reduce(
        (acc, curr) => {
          if (curr.jobs.find(({ id }) => id === job_id))
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
  const skills = useJobSkills(job);
  const locations = useJobLocations(job);
  const matches = useJobMatches(job);
  const tenureAndExperience = useJobTenureAndExperience(job);
  const schedules = useJobSchedules(job);
  const interviewPlanEnabled = useJobInterviewPlanEnabled(job);
  const interviewPlans = useInterviewPlans();
  const scoringPoll = useJobScoringPoll(job);
  const workflows = useJobWorkflow({ id: job?.id });

  const refreshDashboard = useJobDashboardRefresh();

  const isInterviewPlanDisabled =
    interviewPlans.isFetched && !interviewPlans?.data;
  const isInterviewSessionEmpty =
    interviewPlans.isFetched &&
    (isInterviewPlanDisabled ||
      interviewPlans?.data?.interview_session?.length === 0);

  const detailsValidity = getDetailsValidity(job);
  const hiringTeamValidity = getHiringTeamValidity(job);

  const jdValidity = !validateJd(job?.draft?.jd_json);

  const publishStatus = {
    detailsValidity,
    hiringTeamValidity,
    jdValidity,
    loading: job?.scoring_criteria_loading,
    publishable:
      detailsValidity.validity &&
      hiringTeamValidity.validity &&
      jdValidity &&
      !job?.scoring_criteria_loading,
  };
  const { dismissWarnings } = useJobDashboardStore(({ dismissWarnings }) => ({
    dismissWarnings,
  }));

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
        !dismissWarnings.job_description &&
        hashCode(job?.draft?.description ?? '') !== job?.description_hash,
      jd_json_error: !job.scoring_criteria_loading && !jdValidity,
      scoring_criteria_changed:
        hashCode(JSON.stringify(job?.draft?.jd_json ?? {})) !==
        hashCode(JSON.stringify(job?.jd_json ?? {})),
    };

  const initialLoad = !!(
    jobLoad &&
    !assessments.isPending &&
    !templates.isPending &&
    !skills.isPending &&
    !locations.isPending &&
    !matches.isPending &&
    !tenureAndExperience.isPending &&
    !schedules.isPending &&
    !interviewPlanEnabled.isPending &&
    !interviewPlans.isPending &&
    !scoringPoll.isPending &&
    !workflows.isPending
  );

  const handleJobRefresh = async () => {
    await jobRefresh(job?.id);
    refreshDashboard(job?.id);
  };

  const emailTemplateValidity = validateEmailTemplates(job?.email_template);

  const loadStatus: 'loading' | 'error' | 'success' =
    jobLoad && job !== undefined
      ? job === null
        ? 'error'
        : initialLoad
          ? 'success'
          : 'loading'
      : 'loading';

  const value = {
    job,
    jobLoad,
    loadStatus,
    jobPolling,
    emailTemplateValidity,
    interviewPlanEnabled,
    workflows,
    handleJobRefresh,
    isInterviewPlanDisabled,
    isInterviewSessionEmpty,
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

type DetailsValidity = {
  validity: boolean;
  invalidFields: (keyof JobDetailsForm)[];
  message: string;
};

export const getDetailsValidity = (job: Job): DetailsValidity => {
  if (!job) {
    const invalidFields: DetailsValidity['invalidFields'] = [
      'company',
      'department',
      'description',
      'job_title',
      'job_type',
      'location',
      'workplace_type',
    ];
    const message = getMessage(invalidFields);
    return {
      validity: false,
      invalidFields,
      message,
    };
  }
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
  const result = Object.entries(draft).reduce(
    (acc, [key, value]) => {
      const safeKey = key as keyof typeof draft;
      switch (safeKey) {
        case 'description':
          {
            const valid = !validateDescription(value as string);
            if (acc.validity && !valid) acc.validity = valid;
            if (!valid) acc.invalidFields.push(safeKey);
          }
          break;
        //TODO: HACK HERE AGAIN
        case 'company':
        case 'department':
        case 'job_title':
        case 'job_type':
        case 'location':
        case 'workplace_type':
          {
            const valid = !validateString(value as string);
            if (acc.validity && !valid) acc.validity = valid;
            if (!valid) acc.invalidFields.push(safeKey);
          }
          break;
      }
      return acc;
    },
    { validity: true, invalidFields: [] } as DetailsValidity,
  );
  result['message'] = getMessage(result.invalidFields);
  return result;
};

const getMessage = (invalidFields: string[]) => {
  const titles = (invalidFields ?? []).map((field) => capitalizeAll(field));
  return `${titles.join(', ').replace(/(,)(?!.*\1)/, ' and')} ${
    titles.length === 1 ? 'field is' : 'fields are'
  } incomplete`;
};

type HiringTeamValidity = {
  validity: boolean;
  invalidFields: (keyof Pick<
    JobHiringTeamForm,
    'hiring_manager' | 'recruiter'
  >)[];
  message: string;
};

export const getHiringTeamValidity = (job: Job): HiringTeamValidity => {
  if (!job) {
    const invalidFields: HiringTeamValidity['invalidFields'] = [
      'hiring_manager',
      'recruiter',
    ];
    const message = getMessage(invalidFields);
    return {
      validity: false,
      invalidFields,
      message,
    };
  }

  //TODO: HACK FOR BACKWARD COMPATABILITY, DELETE LATER
  const draft = {
    hiring_manager: job.hiring_manager,
    recruiter: job.recruiter,
  };
  const result = Object.entries(draft).reduce(
    (acc, [key, value]) => {
      const safeKey = key as keyof typeof draft;
      switch (safeKey) {
        //TODO: HACK HERE AGAIN
        case 'hiring_manager':
        case 'recruiter':
          {
            const valid = !validateString(value as string);
            if (acc.validity && !valid) acc.validity = valid;
            if (!valid) acc.invalidFields.push(safeKey);
          }
          break;
      }
      return acc;
    },
    { validity: true, invalidFields: [] } as HiringTeamValidity,
  );
  result['message'] = getMessage(result.invalidFields);
  return result;
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
        if (key !== 'default' && validateString(String(value)))
          acc.push(`${getHelper(key as any)} in ${label}`);
      });
      return acc;
    }, [] as string[])
  );
};

export default useProviderJobDashboardActions;
