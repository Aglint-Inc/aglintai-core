import type { ApplicationStore } from '@/context/ApplicationContext/store';

export const getActiveSection = ({
  isSchedulingEnabled,
  isScoringEnabled,
}: {
  isSchedulingEnabled: boolean;
  isScoringEnabled: boolean;
  // eslint-disable-next-line no-unused-vars
}): { [_id in ApplicationStore['tab']]: boolean } => ({
  Resume: true,
  Details: isScoringEnabled,
  Activity: true,
  Interview: isSchedulingEnabled,
  Tasks: isSchedulingEnabled,
});
