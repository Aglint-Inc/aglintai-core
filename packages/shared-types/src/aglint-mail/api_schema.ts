import { z } from 'zod';

export const applicationRecievedEmailApplicantSchema = z.object({
  application_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const debriefEmailInterviewerSchema = z.object({
  session_id: z.string(),
  application_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const interviewCancelEmailApplicantSchema = z.object({
  session_ids: z.array(z.string()),
  application_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const agentEmailCandidateSchema = z.object({
  agent_email: z.string(),
  recruiter_user_id: z.string(),
  filter_id: z.string(),
  mail_headers: z.object({
    'Message-ID': z.string(),
    'In-Reply-To': z.string(),
  }),
});

export const confInterviewEmailOrganizerSchema = z.object({
  session_ids: z.array(z.string()),
  application_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const confirmInterviewEmailApplicantSchema = z.object({
  application_id: z.string(),
  session_ids: z.array(z.string()),
  filter_id: z.string().nullish(),
  availability_req_id: z.string().nullish(),
  preview_details: z
    .object({
      meeting_timings: z.array(
        z.object({
          meeting_start_time: z.string(),
          meeting_end_time: z.string(),
        })
      ),
    })
    .nullish(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
  is_preview: z.boolean().nullish().default(false),
});

export const applicantRejectEmailApplicantSchema = z.object({
  application_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const availabilityReqResendEmailCandidateSchema = z.object({
  avail_req_id: z.string(),
  recruiter_user_id: z.string(),
  is_preview: z.boolean().nullish().default(false),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const interviewReminderEmailApplicantSchema = z.object({
  application_id: z.string(),
  session_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const interviewReminderEmailInterviewerSchema = z.object({
  application_id: z.string(),
  session_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const interviewCancelReqEmailRecruiterSchema = z.object({
  session_ids: z.array(z.string()),
  application_id: z.string(),
  interview_cancel_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const interReschedReqEmailRecruiterSchema = z.object({
  session_ids: z.array(z.string()),
  application_id: z.string(),
  interview_cancel_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const interviewRescheduleEmailApplicantSchema = z.object({
  application_id: z.string(),
  session_ids: z.array(z.string()),
  self_schedule_link: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const interviewStartEmailApplicantSchema = z.object({
  application_id: z.string(),
  meeting_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const interviewStartEmailInterviewersSchema = z.object({
  application_id: z.string(),
  meeting_id: z.string(),
  recruiter_user_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const interviewStartEmailOrganizerSchema = z.object({
  session_id: z.string(),
  application_id: z.string(),
  is_preview: z.boolean().nullish().default(false),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const sendSelfScheduleRequest_email_applicant = z.object({
  organizer_id: z.string(),
  filter_json_id: z.string().nullish(),
  application_id: z.string().nullish(),
  is_preview: z.boolean().nullish().default(false),
  request_id: z.string().nullish(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const sendAvailabilityRequestEmailApplicantSchema = z.object({
  organizer_user_id: z.string(),
  avail_req_id: z.string().nullish(),
  preview_details: z
    .object({
      application_id: z.string(),
    })
    .nullish(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
  is_preview: z.boolean().nullish().default(false),
});

export const sendAvailReqReminderEmailApplicant = z.object({
  avail_req_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const selfScheduleReminderEmailApplicantSchema = z.object({
  filter_id: z.string(),
  task_id: z.string().nullish(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const meetingDeclinedEmailOrganizerSchema = z.object({
  session_id: z.string(),
  interviewer_id: z.string(),
  application_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const MeetingAcceptedEmailOrganizerSchema = z.object({
  session_id: z.string(),
  interviewer_id: z.string(),
  application_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const interviewEndEmailInterviewerForFeedbackSchema = z.object({
  session_id: z.string(),
  recruiter_user_id: z.string(),
  application_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const onSignupEmailAdminSchema = z.object({
  recruiter_user_id: z.string(),
  recruiter_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const interviewerResumedEmailAdminSchema = z.object({
  interviewe_module_relation_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const onShadowCompleteEmailTraineeSchema = z.object({
  meeting_id: z.string(),
  application_id: z.string(),
  session_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const onRShadowCompleteEmailTraineeSchema = z.object({
  meeting_id: z.string(),
  session_id: z.string(),
  application_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const onQualifiedEmailTraineeSchema = z.object({
  interview_module_relation_id: z.string(),
  approver_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const onQualifiedEmailApproverSchema = z.object({
  session_relation_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const interviewEndEmailOrganizerForMeetingStatusSchema = z.object({
  session_id: z.string(),
  overridedMailSubBody: z
    .object({
      subject: z.string(),
      body: z.string(),
    })
    .nullish(),
});

export const candidateBookSlackInterviewerForConfirmationSchema = z.object({
  session_id: z.string(),
  application_id: z.string(),
  request_id: z.string(),
});

export const interviewStartSlackInterviewersSchema = z.object({
  session_id: z.string(),
  recruiter_user_id: z.string(),
  application_id: z.string(),
});

export const onTrainingCompleteSlackApproverForTraineeMeetingQualificationSchema =
  z.object({
    session_relation_id: z.string(),
  });

export const onQualifiedSlackTraineeSchema = z.object({
  interview_module_relation_id: z.string(),
  approver_id: z.string(),
});

export const interviewEndSlackRShadowTraineeForMeetingAttendenceSchema =
  z.object({
    session_id: z.string(),
  });

export const interviewEndSlackShadowTraineeForMeetingAttendenceSchema =
  z.object({
    session_id: z.string(),
  });

export const interviewEndSlackOrganizerForMeetingStatusSchema = z.object({
  session_id: z.string(),
});

export const onRequestCancelSlackInterviewersOrganizerSchema = z.object({
  session_ids: z.array(z.string()),
  request_id: z.string(),
  event_run_id: z.number(),
});
