/* eslint-disable security/detect-object-injection */

import { useJob } from '../JobContext';

const useProviderJobDashboardActions = () => {
  const {
    jobLoad,
    job,
    total,
    job_id,
    interviewPlans,
    status,
    manageJob,
    devlinkProps,
  } = useJob();

  // Since we don't have access to the assessment data anymore, we'll create placeholder data
  const assessmentData = {
    jobAssessments: [],
    otherAssessments: [],
  };

  // We'll need to replace these with local implementations or remove them if not needed
  const skills = [];
  const locations = [];
  const tenureAndExperience = {};
  const schedules = [];

  const isInterviewPlanDisabled =
    interviewPlans.status !== 'pending' &&
    !interviewPlans?.data &&
    !job?.interview_plan_warning_ignore;
  const isInterviewSessionEmpty =
    interviewPlans.status !== 'pending' &&
    interviewPlans?.data?.flatMap((item) => item.interview_session)?.length ===
      0 &&
    !job?.interview_session_warning_ignore;

  const value = {
    job,
    jobLoad,
    isInterviewPlanDisabled,
    isInterviewSessionEmpty,
    schedules,
    assessments: {
      data: assessmentData,
    },
    tenureAndExperience,
    skills,
    locations,
    total,
    status,
    manageJob,
    devlinkProps,
  };

  return value;
};

export default useProviderJobDashboardActions;
