import { type FC, type ReactNode, createContext, useContext } from 'react';

import {
  useAllAssessments,
  useAllAssessmentTemplates,
} from '@/src/queries/assessment';
import { Assessment } from '@/src/queries/assessment/types';
import { useCurrentJob } from '@/src/queries/job-assessment/keys';

const JobAssessmentContext =
  createContext<ReturnType<typeof useJobAssessmentActions>>(undefined);

export const useJobAssessments = () => {
  return useContext(JobAssessmentContext);
};

export const JobAssessmentContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const value = useJobAssessmentActions();
  return (
    <JobAssessmentContext.Provider value={value}>
      {children}
    </JobAssessmentContext.Provider>
  );
};

const useJobAssessmentActions = () => {
  const { job_id } = useCurrentJob();
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
  const value = {
    job_id,
    assessments: {
      ...assessments,
      data: assessmentData,
    },
    templates,
  };
  return value;
};
