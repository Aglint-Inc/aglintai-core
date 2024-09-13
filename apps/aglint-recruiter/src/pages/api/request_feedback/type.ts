import { type TargetApiPayloadType } from '@aglint/shared-types';

export type API_request_feedback = {
  request: requestFeedbackType;
  response:
    | {
        mailSent: boolean;
        error: null;
      }
    | {
        mailSent: null;
        error: string;
      };
};

type requestFeedbackType =
  TargetApiPayloadType<'interviewEnd_email_interviewerForFeedback'> & {
    tool: 'email' | 'slack';
  };
