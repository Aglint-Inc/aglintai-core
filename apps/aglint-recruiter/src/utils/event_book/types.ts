import { CompServiceKeyCred, RecruiterUserType } from '@aglint/shared-types';

export type GetAuthParams = {
  company_cred: CompServiceKeyCred;
  recruiter: CalEventAttendeesAuthDetails;
};

export type CalEventAttendeesAuthDetails = Pick<
  RecruiterUserType,
  'user_id' | 'schedule_auth' | 'email'
>;

export type CalEventOrganizerAuthDetails = CalEventAttendeesAuthDetails & {
  timezone: string;
};
