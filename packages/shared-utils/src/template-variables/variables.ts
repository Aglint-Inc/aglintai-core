export const candidates = [
  "candidateFirstName",
  "candidateLastName",
  "candidateName",
] as const;

export const jobDetails = ["companyName", "jobRole"] as const;

export const company = ["companyName"];

export const recruiter = [
  "recruiterName",
  "recruiterFirstName",
  "recruiterLastName",
  "recruiterTimeZone",
] as const;

export const interviewer = [
  "interviewerName",
  "interviewerFirstName",
  "interviewerLastName",
] as const;

export const dates = ["startDate", "endDate"] as const;

export const selfSchedulingLink = "selfScheduleLink" as const;

export const allTempvariables = [
  ...candidates,
  ...jobDetails,
  ...company,
  ...recruiter,
  ...interviewer,
  ...dates,
] as const;
