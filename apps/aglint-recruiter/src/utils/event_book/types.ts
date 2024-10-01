import type {
  CompServiceKeyCred,
  RecruiterUserType,
} from '@aglint/shared-types';

export type GetAuthParams = {
  company_cred: CompServiceKeyCred | null;
  recruiter: CalEventAttendeesAuthDetails | null;
};

export type CalEventAttendeesAuthDetails = Pick<
  RecruiterUserType,
  'user_id' | 'schedule_auth' | 'email'
>;

export type CalEventOrganizerAuthDetails = CalEventAttendeesAuthDetails & {
  timezone: string;
};
