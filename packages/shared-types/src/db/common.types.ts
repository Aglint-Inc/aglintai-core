import { Database, Tables } from './schema.types';

export type CustomMembersMeta = {
  [id in
    | keyof Pick<
        Tables<'public_jobs'>,
        'hiring_manager' | 'recruiter' | 'recruiting_coordinator' | 'sourcer'
      >
    | 'previous_interviewers']: boolean;
};

export type CustomEmailTypes = Extract<
  Database['public']['Enums']['email_types'],
  | 'sendSelfScheduleRequest_email_applicant'
  | 'interviewStart_email_applicant'
  | 'interviewStart_email_interviewers'
  | 'interviewStart_slack_interviewers'
  | 'sendAvailabilityRequest_email_applicant'
  | 'interviewerConfirmation_slack_interviewers'
  | 'interviewEnd_slack_interviewers'
>;
