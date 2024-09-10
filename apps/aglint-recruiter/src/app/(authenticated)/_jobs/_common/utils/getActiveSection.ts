import { ApplicationStore } from '@/context/ApplicationContext/store';
import { Job } from '@/queries/jobs/types';

export const getActiveSection = ({
  isAssessmentEnabled,
  isSchedulingEnabled,
  isScreeningEnabled,
  isScoringEnabled,
  job,
}: {
  isAssessmentEnabled: boolean;
  isSchedulingEnabled: boolean;
  isScreeningEnabled: boolean;
  isScoringEnabled: boolean;
  job: Pick<Job, 'phone_screen_enabled' | 'assessment'>;
  // eslint-disable-next-line no-unused-vars
}): { [_id in ApplicationStore['tab']]: boolean } => ({
  Resume: true,
  Details: isScoringEnabled,
  Screening: !!job?.phone_screen_enabled && isScreeningEnabled,
  Assessment: !!job?.assessment && isAssessmentEnabled,
  Activity: true,
  Interview: isSchedulingEnabled,
  Tasks: isSchedulingEnabled,
});
