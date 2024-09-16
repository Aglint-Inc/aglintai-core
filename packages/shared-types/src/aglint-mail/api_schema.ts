import { z } from 'zod';

export const applicationRecievedEmailApplicantSchema = z.object({
  application_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const debriefEmailInterviewerSchema = z.object({
  session_id: z.string(),
  application_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const interviewCancelEmailApplicantSchema = z.object({
  session_ids: z.array(z.string()),
  application_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
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
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const confirmInterviewEmailApplicantSchema = z.object({
  application_id: z.string(),
  session_ids: z.array(z.string()),
  filter_id: z.nullable(z.string()),
  availability_req_id: z.nullable(z.string()),
  preview_details: z.optional(
    z.object({
      meeting_timings: z.array(
        z.object({
          meeting_start_time: z.string(),
          meeting_end_time: z.string(),
        })
      ),
    })
  ),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
  is_preview: z.optional(z.boolean()).default(false),
});

export const applicantRejectEmailApplicantSchema = z.object({
  application_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const availabilityReqResendEmailCandidateSchema = z.object({
  avail_req_id: z.string(),
  recruiter_user_id: z.string(),
  is_preview: z.optional(z.boolean()).default(false),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const interviewReminderEmailApplicantSchema = z.object({
  application_id: z.string(),
  session_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const interviewReminderEmailInterviewerSchema = z.object({
  application_id: z.string(),
  session_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const interviewCancelReqEmailRecruiterSchema = z.object({
  session_ids: z.array(z.string()),
  application_id: z.string(),
  interview_cancel_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const interReschedReqEmailRecruiterSchema = z.object({
  session_ids: z.array(z.string()),
  application_id: z.string(),
  interview_cancel_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const interviewRescheduleEmailApplicantSchema = z.object({
  application_id: z.string(),
  session_ids: z.array(z.string()),
  self_schedule_link: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const interviewStartEmailApplicantSchema = z.object({
  application_id: z.string(),
  meeting_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const interviewStartEmailInterviewersSchema = z.object({
  application_id: z.string(),
  meeting_id: z.string(),
  recruiter_user_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const interviewStartEmailOrganizerSchema = z.object({
  session_id: z.string(),
  application_id: z.string(),
  is_preview: z.optional(z.boolean()).default(false),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const sendSelfScheduleRequest_email_applicant = z.object({
  organizer_id: z.string(),
  filter_json_id: z.optional(z.string()),
  application_id: z.optional(z.string()),
  is_preview: z.nullable(z.boolean()).default(false),
  request_id: z.optional(z.string(), undefined),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const sendAvailabilityRequestEmailApplicantSchema = z.object({
  organizer_user_id: z.string(),
  avail_req_id: z.nullable(z.string().optional(), undefined),
  preview_details: z.nullable(
    z
      .object({
        application_id: z.string(),
      })
      .optional(),
    undefined
  ),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
  is_preview: z.optional(z.boolean()).default(false),
});

export const sendAvailReqReminderEmailApplicant = z.object({
  avail_req_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const selfScheduleReminderEmailApplicantSchema = z.object({
  filter_id: z.string(),
  task_id: z.optional(z.string(), undefined),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const meetingDeclinedEmailOrganizerSchema = z.object({
  session_id: z.string(),
  interviewer_id: z.string(),
  application_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const MeetingAcceptedEmailOrganizerSchema = z.object({
  session_id: z.string(),
  interviewer_id: z.string(),
  application_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const interviewEndEmailInterviewerForFeedbackSchema = z.object({
  session_id: z.string(),
  recruiter_user_id: z.string(),
  application_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const onSignupEmailAdminSchema = z.object({
  recruiter_user_id: z.string(),
  recruiter_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const interviewerResumedEmailAdminSchema = z.object({
  interviewe_module_relation_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const onShadowCompleteEmailTraineeSchema = z.object({
  meeting_id: z.string(),
  application_id: z.string(),
  session_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const onRShadowCompleteEmailTraineeSchema = z.object({
  meeting_id: z.string(),
  session_id: z.string(),
  application_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const onQualifiedEmailTraineeSchema = z.object({
  interview_module_relation_id: z.string(),
  approver_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const onQualifiedEmailApproverSchema = z.object({
  session_relation_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
});

export const interviewEndEmailOrganizerForMeetingStatusSchema = z.object({
  session_id: z.string(),
  overridedMailSubBody: z.optional(
    z.object({
      subject: z.string(),
      body: z.string(),
    })
  ),
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
