import * as v from 'valibot';
export const applicationRecievedEmailApplicantSchema = v.object({
  application_id: v.string(),
});

export const debriefEmailInterviewerSchema = v.object({
  session_ids: v.array(v.string()),
  application_id: v.string(),
  meeting_id: v.string(),
  recruiter_user_id: v.string(),
});

export const interviewCancelEmailApplicantSchema = v.object({
  meeting_id: v.string(),
  filter_id: v.string(),
});

export const agentEmailCandidateSchema = v.object({
  meeting_id: v.string(),
  filter_id: v.string(),
});

export const confInterviewEmailOrganizerSchema = v.object({
  session_id: v.array(v.string()),
  application_id: v.string(),
  meeting_id: v.string(),
  recruiter_user_id: v.string(),
});

export const confirmInterviewEmailApplicantSchema = v.object({
  application_id: v.string(),
});

export const applicantRejectEmailApplicantSchema = v.object({
  application_id: v.string(),
});

export const phoneScreenEmailCandidateSchema = v.object({
  application_id: v.string(),
});

export const interviewReminderEmailApplicantSchema = v.object({
  application_id: v.string(),
});

export const phoneScreenRemindEmailApplicantSchema = v.object({
  application_id: v.string(),
});

export const interviewCancelReqEmailRecruiterSchema = v.object({
  session_id: v.array(v.string()),
  application_id: v.string(),
  meeting_id: v.string(),
  interview_cancel_id: v.string(),
  recruiter_user_id: v.string(),
});

export const interReschedReqEmailRecruiterSchema = v.object({
  session_ids: v.array(v.string()),
  application_id: v.string(),
  meeting_id: v.string(),
  interview_cancel_id: v.string(),
  recruiter_user_id: v.string(),
});

export const interviewRescheduleEmailApplicantSchema = v.object({
  session_ids: v.array(v.string()),
  application_id: v.string(),
  meeting_id: v.string(),
  interview_cancel_id: v.string(),
});

export const interviewStartEmailApplicantSchema = v.object({
  application_id: v.string(),
  meeting_id: v.string(),
});

export const interviewStartEmailInterviewersSchema = v.object({
  application_id: v.string(),
  meeting_id: v.string(),
  recruiter_user_id: v.string(),
});
