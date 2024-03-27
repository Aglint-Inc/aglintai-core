export type InitAgentBodyParams = {
  application_id;
  start_date;
  end_date;
  company_id;
  recruiter_user_id;
  organizer_time_zone;
  schedule_type: 'phone' | 'email';
  candidate_email: string;
};
