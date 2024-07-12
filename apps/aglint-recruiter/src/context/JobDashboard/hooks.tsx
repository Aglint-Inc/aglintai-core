/* eslint-disable security/detect-object-injection */

import {
  useAllAssessments,
  useAllAssessmentTemplates,
} from '@/src/queries/assessment';
import { Assessment } from '@/src/queries/assessment/types';
import {
  useJobLocations,
  useJobSchedules,
  useJobSkills,
  useJobTenureAndExperience,
} from '@/src/queries/job-dashboard';
import { useJobWorkflow } from '@/src/queries/job-workflow';

import { useJob } from '../JobContext';

const useProviderJobDashboardActions = () => {
  const { jobLoad, job, total, job_id, interviewPlans, status } = useJob();

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
  const tenureAndExperience = useJobTenureAndExperience(job);
  const schedules = useJobSchedules(job);
  const workflows = useJobWorkflow({ id: job?.id });

  const isInterviewPlanDisabled =
    interviewPlans.status !== 'pending' &&
    !interviewPlans?.data &&
    !job?.interview_plan_warning_ignore;
  const isInterviewSessionEmpty =
    interviewPlans.status !== 'pending' &&
    interviewPlans?.data?.interview_session?.length === 0 &&
    !job?.interview_session_warning_ignore;

  const value = {
    job,
    jobLoad,
    workflows,
    isInterviewPlanDisabled,
    isInterviewSessionEmpty,
    schedules,
    assessments: {
      ...assessments,
      data: assessmentData,
    },
    tenureAndExperience,
    templates,
    skills,
    locations,
    total,
    status,
  };

  return value;
};

export default useProviderJobDashboardActions;
