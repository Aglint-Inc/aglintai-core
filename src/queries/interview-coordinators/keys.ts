import { appKey } from '..';

export const interviewCoordinatorKeys = {
  all: { queryKey: [appKey, 'interview_coordinator'] as string[] },
} as const;
