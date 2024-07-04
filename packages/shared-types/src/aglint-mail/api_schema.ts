import { company } from '@aglint/shared-utils/src/template-variables/variables';
import * as v from 'valibot';
export const applicationRecievedEmailApplicantSchema = v.object({
  application_id: v.string(),
  organizer_id: v.string(),
});

export const debriefEmailInterviewerSchema = v.object({
  session_id: v.string(),
  application_id: v.string(),
});

export const interviewCancelEmailApplicantSchema = v.object({
  session_ids: v.array(v.string()),
  application_id: v.string(),
});

export const agentEmailCandidateSchema = v.object({
  agent_email: v.string(),
  recruiter_user_id: v.string(),
  filter_id: v.string(),
  mail_headers: v.object({
    'Message-ID': v.string(),
    'In-Reply-To': v.string(),
  }),
});

export const confInterviewEmailOrganizerSchema = v.object({
  session_ids: v.array(v.string()),
  application_id: v.string(),
});

export const confirmInterviewEmailApplicantSchema = v.object({
  application_id: v.string(),
  session_ids: v.array(v.string()),
  schedule_id: v.nullish(v.string()),
  filter_id: v.nullish(v.string()),
  availability_req_id: v.nullish(v.string()),
});

export const applicantRejectEmailApplicantSchema = v.object({
  application_id: v.string(),
  organizer_id: v.string(),
});
export const availabilityReqResendEmailCandidateSchema = v.object({
  avail_req_id: v.string(),
  recruiter_user_id: v.string(),
});

export const phoneScreenEmailCandidateSchema = v.object({
  application_id: v.string(),
});

export const interviewReminderEmailApplicantSchema = v.object({
  application_id: v.string(),
  session_id: v.string(),
});

export const interviewReminderEmailInterviewerSchema = v.object({
  application_id: v.string(),
  session_id: v.string(),
});

export const phoneScreenRemindEmailApplicantSchema = v.object({
  application_id: v.string(),
});

export const interviewCancelReqEmailRecruiterSchema = v.object({
  session_ids: v.array(v.string()),
  application_id: v.string(),
  interview_cancel_id: v.string(),
});

export const interReschedReqEmailRecruiterSchema = v.object({
  session_ids: v.array(v.string()),
  application_id: v.string(),
  interview_cancel_id: v.string(),
});

export const interviewRescheduleEmailApplicantSchema = v.object({
  application_id: v.string(),
  session_ids: v.array(v.string()),
  self_schedule_link: v.string(),
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

export const interviewStartEmailOrganizerSchema = v.object({
  session_id: v.string(),
  application_id: v.string(),
  is_preview: v.optional(v.boolean(), false),
});

export const sendSelfScheduleRequest_email_applicant = v.object({
  filter_json_id: v.string(),
  organizer_id: v.string(),
  is_preview: v.optional(v.boolean(), false),
  task_id: v.optional(v.string(), undefined),
});

export const sendAvailabilityRequestEmailApplicantSchema = v.object({
  organizer_user_id: v.string(),
  avail_req_id: v.nullish(v.string('missing avail_req_id'), undefined),
  preview_details: v.nullish(
    v.object({
      application_id: v.string(),
    }),
    undefined
  ),
});
export const sendAvailReqReminderEmailApplicant = v.object({
  avail_req_id: v.string(),
});

export const selfScheduleReminderEmailApplicantSchema = v.object({
  filter_id: v.string(),
  task_id: v.optional(v.string(), undefined),
});

export const meetingDeclinedEmailOrganizerSchema = v.object({
  session_id: v.string(),
  interviewer_id: v.string(),
  application_id: v.string(),
});
export const MeetingAcceptedEmailOrganizerSchema = v.object({
  session_id: v.string(),
  interviewer_id: v.string(),
  application_id: v.string(),
});
