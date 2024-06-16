import { candidates, interviewer, jobDetails, recruiter } from './variables';

export const emailVariablePayloads = {
  debrief_email_interviewer: [...interviewer, ...candidates, ...jobDetails],
  applicationRecieved_email_applicant: [
    ...recruiter,
    ...candidates,
    ...jobDetails,
  ],
  interviewCancel_email_applicant: [...recruiter, ...candidates, ...jobDetails],
};
