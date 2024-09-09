import { createContext, memo, PropsWithChildren } from 'react';

import { useJob } from '@/job/hooks';
import {
  useJobLocations,
  useJobSchedules,
  useJobSkills,
  useJobTenureAndExperience,
} from '@/queries/job-dashboard';

const useProviderJobDashboardContext = () => {
  const {
    jobLoad,
    job,
    total,
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
  const skills = useJobSkills(job);
  const locations = useJobLocations(job);
  const tenureAndExperience = useJobTenureAndExperience(job);
  const schedules = useJobSchedules(job);

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

export const JobDashboardContext =
  createContext<ReturnType<typeof useProviderJobDashboardContext>>(undefined);

export const JobDashboardProvider = memo(({ children }: PropsWithChildren) => {
  const value = useProviderJobDashboardContext();
  return (
    <JobDashboardContext.Provider value={value}>
      {children}
    </JobDashboardContext.Provider>
  );
});
JobDashboardProvider.displayName = 'JobDashboardProvider';
