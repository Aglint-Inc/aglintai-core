import { appKey } from '..';

export const interviewModuleKeys = {
  interview_module: {
    queryKey: [appKey, 'interview_modules'] as string[],
  },
} as const;
