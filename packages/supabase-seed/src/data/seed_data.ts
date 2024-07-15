/* eslint-disable @typescript-eslint/no-unused-vars */
import {DatabaseTable} from '@aglint/shared-types';
export const company_seed: Pick<
  DatabaseTable['recruiter_user'],
  'email' | 'first_name' | 'last_name' | 'user_id'
>[] = [
  {
    email: 'chinmai@aglinthq.com',
    first_name: 'china',
    last_name: '',
    user_id: '',
  },
];
