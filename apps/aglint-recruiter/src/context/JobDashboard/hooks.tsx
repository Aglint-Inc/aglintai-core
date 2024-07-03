/* eslint-disable security/detect-object-injection */
// import { getHelper } from '@/src/components/Jobs/Job/Email-Templates';
// import { templateObj } from '@/src/components/Jobs/Job/Email-Templates/utils';
import {
  useAllAssessments,
  useAllAssessmentTemplates,
} from '@/src/queries/assessment';
import { Assessment } from '@/src/queries/assessment/types';
import {
  useJobLocations,
  useJobMatches,
  useJobSchedules,
  useJobSkills,
  useJobTenureAndExperience,
} from '@/src/queries/job-dashboard';
import { useJobWorkflow } from '@/src/queries/job-workflow';

import { useJob } from '../JobContext';
import { getDetailsValidity, getHiringTeamValidity } from '../JobContext/utils';

const useProviderJobDashboardActions = () => {
  const { jobLoad, job, job_id, interviewPlans, jdValidity, status } = useJob();

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
  const workflows = useJobWorkflow({ id: job?.id });

  const isInterviewPlanDisabled =
    interviewPlans.isFetched && !interviewPlans?.data;
  const isInterviewSessionEmpty =
    interviewPlans.isFetched &&
    (isInterviewPlanDisabled ||
      interviewPlans?.data?.interview_session?.length === 0);

  const detailsValidity = getDetailsValidity(job);
  const hiringTeamValidity = getHiringTeamValidity(job);

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

  const initialLoad = !!(
    jobLoad &&
    !assessments.isPending &&
    !templates.isPending &&
    !skills.isPending &&
    !locations.isPending &&
    !matches.isPending &&
    !tenureAndExperience.isPending &&
    !schedules.isPending &&
    // !interviewPlans.isPending &&
    !workflows.isPending
  );

  // const emailTemplateValidity = validateEmailTemplates(job?.email_template);

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
    // emailTemplateValidity,
    workflows,
    isInterviewPlanDisabled,
    isInterviewSessionEmpty,
    schedules,
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
    status,
  };

  return value;
};

// export const validateEmailTemplates = (
//   emailTemplates: Job['email_template'],
// ) => {
//   return (
//     emailTemplates &&
//     Object.entries(emailTemplates).reduce((acc, [key, value]) => {
//       const label = templateObj[key]?.heading;
//       Object.entries(value).forEach(([key, value]) => {
//         if (key !== 'default' && validateString(String(value)))
//           acc.push(`${getHelper(key as any)} in ${label}`);
//       });
//       return acc;
//     }, [] as string[])
//   );
// };

export default useProviderJobDashboardActions;
