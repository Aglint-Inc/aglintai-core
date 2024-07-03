/* eslint-disable security/detect-object-injection */
import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import { useAuthDetails } from '@context/AuthContext/AuthContext';
import { useMemo } from 'react';

import { useJobCreate, useJobDelete, useJobsRead } from '@/src/queries/jobs';
import { Job } from '@/src/queries/jobs/types';

import { handleGenerateJd } from '../JobContext/hooks';

const JOB_SECTIONS: DatabaseEnums['application_status'][] = [
  'new',
  'screening',
  'assessment',
  'interview',
  'qualified',
  'disqualified',
];

export const getActiveSection = ({
  isAssessmentEnabled,
  isSchedulingEnabled,
  isScreeningEnabled,
  job,
}: {
  isAssessmentEnabled: boolean;
  isSchedulingEnabled: boolean;
  isScreeningEnabled: boolean;
  job: Pick<Job, 'phone_screen_enabled' | 'assessment'>;
}) =>
  JOB_SECTIONS.filter((section) => {
    switch (section) {
      case 'new':
        return true;
      case 'screening':
        return (job?.phone_screen_enabled ?? false) && isScreeningEnabled;
      case 'assessment':
        return (job?.assessment ?? false) && isAssessmentEnabled;
      case 'interview':
        return isSchedulingEnabled;
      case 'qualified':
        return true;
      case 'disqualified':
        return true;
    }
  });

export const useJobActiveSections = (
  job: Pick<
    DatabaseTable['public_jobs'],
    'phone_screen_enabled' | 'assessment'
  >,
) => {
  const { isAssessmentEnabled, isSchedulingEnabled, isScreeningEnabled } =
    useAuthDetails();
  return getActiveSection({
    isAssessmentEnabled,
    isSchedulingEnabled,
    isScreeningEnabled,
    job,
  });
};

const useJobActions = () => {
  const {
    recruiter,
    isAssessmentEnabled,
    isSchedulingEnabled,
    isScreeningEnabled,
  } = useAuthDetails();

  const jobs = useJobsRead();

  const customJobs = useMemo(
    () => ({
      ...jobs,
      data: (jobs?.data ?? []).map(({ flags, ...job }) => ({
        ...job,
        flags: {
          ...flags,
          screening: flags.screening && isScreeningEnabled,
          assessment: flags.assessment && isAssessmentEnabled,
          interview: flags.interview && isSchedulingEnabled,
        },
      })),
    }),
    [
      jobs,
      jobs.status,
      isScreeningEnabled,
      isAssessmentEnabled,
      isSchedulingEnabled,
    ],
  );

  const { mutateAsync: jobCreate } = useJobCreate();

  const initialLoad = !!(jobs.status !== 'pending' && recruiter?.id);

  const handleJobCreate = async (newJob: Parameters<typeof jobCreate>[0]) => {
    if (recruiter) {
      try {
        const data = await jobCreate(newJob);
        await handleGenerateJd(data.id);
        return data;
      } catch {
        //
      }
    }
  };

  const { mutate: jobDelete } = useJobDelete();

  const handleJobDelete = async (jobId: string) => {
    if (recruiter) {
      jobDelete(jobId);
    }
  };

  const value = {
    jobs: customJobs,
    handleJobCreate,
    handleJobsRefresh: jobs.refetch,
    handleJobDelete,
    initialLoad,
  };

  return value;
};

export default useJobActions;
