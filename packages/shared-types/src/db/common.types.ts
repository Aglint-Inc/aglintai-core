import { Database, Tables } from './schema.types';

export type CustomMembersMeta = {
  [id in
    | keyof Pick<
        Tables<'public_jobs'>,
        'hiring_manager' | 'recruiter' | 'recruiting_coordinator' | 'sourcer'
      >
    | 'previous_interviewers']: boolean;
};

export type CustomApplicationBadges = {
  skills: number;
  schools: number;
  positions: number;
  leadership: number;
  jobStability: number;
  careerGrowth: number;
  jobHopping: number;
};

export type CustomEmailTypes = Extract<
  Database['public']['Enums']['email_slack_types'],
  | 'selfScheduleReminder_email_applicant'
  | 'interviewStart_email_applicant'
  | 'interviewStart_email_interviewers'
  | 'interviewStart_slack_interviewers'
  | 'sendAvailReqReminder_email_applicant'
  | 'interviewerConfirmation_slack_interviewers'
  | 'interviewEnd_slack_interviewers'
  | 'agent_email_candidate'
>;
