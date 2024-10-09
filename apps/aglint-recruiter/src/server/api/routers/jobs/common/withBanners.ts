import type { DatabaseView } from '@aglint/shared-types';
import { isEqual } from 'lodash';
import { z, type ZodSchema } from 'zod';

import { jdSchema } from './generateJd';
import { jobDescriptionSchema } from './jobDescriptionSchema';

type MissingInfo = Pick<
  DatabaseView['job_view'],
  'job_title' | 'description' | 'hiring_manager' | 'recruiter'
>;

const missingInfoSchema = z.object({
  job_title: z.string().min(1),
  description: jobDescriptionSchema,
  hiring_manager: z.string().uuid(),
  recruiter: z.string().uuid(),
}) satisfies ZodSchema<MissingInfo>;

type Banner = {
  interview_plan_missing: boolean;
  scoring_criteria_missing: boolean;
  scoring_criteria_generating: boolean;
  scoring_criteria_changed: boolean;
  missing_info: {
    [_id in keyof MissingInfo]: boolean;
  };
};

export const withBanners = (
  job: DatabaseView['job_view'],
): DatabaseView['job_view'] & Banner => {
  const banner: Banner = {
    interview_plan_missing: interviewPlanMissing(job),
    scoring_criteria_changed: scoringCriteriaChanged(job),
    scoring_criteria_generating: scoringCriteriaGenerating(job),
    scoring_criteria_missing: scoringCriteriaMissing(job),
    missing_info: missingInfo(job),
  };
  return {
    ...job,
    ...banner,
  };
};

const interviewPlanMissing = (job: DatabaseView['job_view']) => {
  return job.interview_plan_count === 0;
};

const scoringCriteriaChanged = (job: DatabaseView['job_view']) => {
  return !isEqual(job.jd_json, job.draft_jd_json);
};

const scoringCriteriaGenerating = (job: DatabaseView['job_view']) => {
  return job.scoring_criteria_loading ?? false;
};

const scoringCriteriaMissing = (job: DatabaseView['job_view']) => {
  return !jdSchema.safeParse(job.draft_jd_json).success;
};

const missingInfo = (job: DatabaseView['job_view']): Banner['missing_info'] => {
  return {
    description: !missingInfoSchema.shape.description.safeParse(job.description)
      .success,
    hiring_manager: !missingInfoSchema.shape.hiring_manager.safeParse(
      job.hiring_manager,
    ).success,
    job_title: !missingInfoSchema.shape.job_title.safeParse(job.job_title)
      .success,
    recruiter: !missingInfoSchema.shape.recruiter.safeParse(job.recruiter)
      .success,
  };
};
