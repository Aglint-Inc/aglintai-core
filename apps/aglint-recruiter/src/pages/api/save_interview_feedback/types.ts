import { type DatabaseTable } from '@aglint/shared-types';

export type API_save_interview_feedback = {
  request: {
    interview_id: string;
    feedback: DatabaseTable['interview_meeting']['candidate_feedback'];
  };
  response:
    | {
        data: boolean;
        error: null;
      }
    | {
        data: null;
        error: string;
      };
};
