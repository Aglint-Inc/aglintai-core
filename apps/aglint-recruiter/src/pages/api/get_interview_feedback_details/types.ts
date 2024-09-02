import { type DatabaseTable } from '@aglint/shared-types';

export type API_get_interview_feedback_details = {
  request: {
    interview_id: string;
  };
  response:
    | {
        data: {
          candidate_feedback: DatabaseTable['interview_meeting']['candidate_feedback'];
          company_logo: string;
          company_name: string;
          job_title: string;
        };
        error: null;
      }
    | {
        data: null;
        error: string;
      };
};
