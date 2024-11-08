import type { DatabaseTableInsert } from '@aglint/shared-types';

export const RECRUITER_USER: Omit<
  DatabaseTableInsert['recruiter_user'],
  'user_id'
>[] = [
  {
    first_name: 'Test',
    email: 'chinmai@aglinthq.com',
  },
];
