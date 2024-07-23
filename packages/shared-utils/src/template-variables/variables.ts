export const jobDetails = ["companyName", "jobRole"] as const;

export const company = ["companyName"] as const;

export const candidates = [
  "candidateFirstName",
  "candidateLastName",
  "candidateName",
] as const;

export const organizer = [
  "organizerName",
  "organizerFirstName",
  "organizerLastName",
  "OrganizerTimeZone",
] as const;

export const interviewer = [
  "interviewerName",
  "interviewerFirstName",
  "interviewerLastName",
] as const;

export const trainee = [
  "traineeName",
  "traineeFirstName",
  "traineeLastName",
] as const;

export const interviewerInfo = [
  "interviewerDepartment",
  "interviewerLocation",
  "interviewerEmail",
] as const;

export const approver = [
  "approverName",
  "approverFirstName",
  "approverLastName",
] as const;

export const admin = ["adminName", "adminFirstName", "adminLastName"] as const;
export const dates = ["startDate", "endDate"] as const;
export const date_range = "dateRange" as const;
export const time = "time" as const;
export const interviewTypes = "interviewTypes" as const;
export const interviewType = "interviewType" as const;
export const sessionName = "sessionName" as const;
export const cancelReason = "cancelReason" as const;
export const shadowCount = "shadowCount" as const;
export const reverseShadowCount = "reverseShadowCount" as const;

export const additionalRescheduleNotes = "additionalRescheduleNotes" as const;
export const rescheduleReason = "rescheduleReason" as const;

export const candidateProfileLink = "candidateProfileLink" as const;
export const interviewInstructionLink = "interviewInstructionLink" as const;
export const interviewFeedbackLink = "interviewFeedbackLink" as const;
export const candidateScheduleLink = "candidateScheduleLink" as const;
export const meetingDetailsLink = "meetingDetailsLink" as const;
export const selfSchedulingLink = "selfScheduleLink" as const;
export const supportLink = "supportLink" as const;
export const availabilityReqLink = "availabilityReqLink" as const;
export const interviewerPauseLink = "interviewerPauseLink" as const;
export const interviewAttentedConfirmLink =
  "interviewAttentedConfirmLink" as const;
export const shadowConfirmLink = "shadowConfirmLink" as const;
export const reverseShadowConfirmLink = "reverseShadowConfirmLink" as const;
export const qualifiedApproverConfirmLink =
  "qualifiedApproverConfirmLink" as const;
export const meetingStatusUpdateLink = "meetingStatusUpdateLink" as const;

export const allTempvariables = [
  ...candidates,
  ...jobDetails,
  ...company,
  ...organizer,
  ...interviewer,
  ...interviewerInfo,
  ...admin,
  ...dates,
  ...trainee,
  ...approver,
  time,
  interviewType,
  interviewTypes,
  meetingDetailsLink,
  interviewerPauseLink,
  reverseShadowConfirmLink,
  qualifiedApproverConfirmLink,
  shadowConfirmLink,
  meetingStatusUpdateLink,
] as const;
