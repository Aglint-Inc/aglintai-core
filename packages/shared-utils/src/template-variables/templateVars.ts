import {
  candidates,
  dates,
  interviewer,
  jobDetails,
  recruiter,
  selfSchedulingLink,
} from "./variables";

export const emailVariablePayloads = {
  debrief_email_interviewer: [...interviewer, ...candidates, ...jobDetails],
  applicationRecieved_email_applicant: [
    ...recruiter,
    ...candidates,
    ...jobDetails,
  ],
  interviewCancel_email_applicant: [...recruiter, ...candidates, ...jobDetails],
  agent_email_candidate: [
    ...recruiter,
    ...candidates,
    ...jobDetails,
    ...dates,
    selfSchedulingLink,
  ],
};
