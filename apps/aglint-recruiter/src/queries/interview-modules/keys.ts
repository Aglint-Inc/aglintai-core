import { appKey } from '..';

export const interviewModuleKeys = {
  interview_module: ({ recruiter_id }: { recruiter_id: string }) => ({
    queryKey: [appKey, 'interview_modules', { recruiter_id }] as string[],
  }),
} as const;
