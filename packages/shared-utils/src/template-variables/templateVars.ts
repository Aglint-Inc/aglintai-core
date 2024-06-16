import { candidates, interviewer, jobDetails, recruiter } from './variables';

export const emailVariablePayloads = {
  debrief_email_interviewer: [
    ...interviewer,
    ...candidates,
    ...jobDetails,
  ] as const,
  applicationRecieved_email_applicant: [
    ...recruiter,
    ...candidates,
    ...jobDetails,
  ] as const,
  interviewCancel_email_applicant: [...recruiter, ...candidates, ...jobDetails],
};
