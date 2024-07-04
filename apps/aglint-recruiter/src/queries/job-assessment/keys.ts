import { JobRequisite } from '../job';
import { jobQueries } from '../job';

export const jobAssessmentQueryKeys = {
  assessments: (args: JobRequisite) => ({
    queryKey: [...jobQueries.job(args).queryKey, 'assessments'],
  }),
} as const;
