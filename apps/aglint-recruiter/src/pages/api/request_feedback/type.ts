import { EmailTemplateAPi } from "@aglint/shared-types";

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
  EmailTemplateAPi<'interviewEnd_email_interviewerForFeedback'>['api_payload'] & {
    tool: 'email' | 'slack';
  };