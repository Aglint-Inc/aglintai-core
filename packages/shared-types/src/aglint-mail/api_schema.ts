import * as v from "valibot";
export const applicationRecievedEmailApplicantSchema = v.object({
  application_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const debriefEmailInterviewerSchema = v.object({
  session_id: v.string(),
  application_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const interviewCancelEmailApplicantSchema = v.object({
  session_ids: v.array(v.string()),
  application_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const agentEmailCandidateSchema = v.object({
  agent_email: v.string(),
  recruiter_user_id: v.string(),
  filter_id: v.string(),
  mail_headers: v.object({
    "Message-ID": v.string(),
    "In-Reply-To": v.string(),
  }),
});

export const confInterviewEmailOrganizerSchema = v.object({
  session_ids: v.array(v.string()),
  application_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const confirmInterviewEmailApplicantSchema = v.object({
  application_id: v.string(),
  session_ids: v.array(v.string()),
  filter_id: v.nullish(v.string()),
  availability_req_id: v.nullish(v.string()),
  preview_details: v.optional(
    v.object({
      meeting_timings: v.array(
        v.object({
          meeting_start_time: v.string(),
          meeting_end_time: v.string(),
        })
      ),
    }),
    undefined
  ),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const applicantRejectEmailApplicantSchema = v.object({
  application_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});
export const availabilityReqResendEmailCandidateSchema = v.object({
  avail_req_id: v.string(),
  recruiter_user_id: v.string(),
  is_preview: v.optional(v.boolean(), false),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const interviewReminderEmailApplicantSchema = v.object({
  application_id: v.string(),
  session_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const interviewReminderEmailInterviewerSchema = v.object({
  application_id: v.string(),
  session_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const interviewCancelReqEmailRecruiterSchema = v.object({
  session_ids: v.array(v.string()),
  application_id: v.string(),
  interview_cancel_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const interReschedReqEmailRecruiterSchema = v.object({
  session_ids: v.array(v.string()),
  application_id: v.string(),
  interview_cancel_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const interviewRescheduleEmailApplicantSchema = v.object({
  application_id: v.string(),
  session_ids: v.array(v.string()),
  self_schedule_link: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const interviewStartEmailApplicantSchema = v.object({
  application_id: v.string(),
  meeting_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const interviewStartEmailInterviewersSchema = v.object({
  application_id: v.string(),
  meeting_id: v.string(),
  recruiter_user_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const interviewStartEmailOrganizerSchema = v.object({
  session_id: v.string(),
  application_id: v.string(),
  is_preview: v.optional(v.boolean(), false),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const sendSelfScheduleRequest_email_applicant = v.object({
  organizer_id: v.string(),
  filter_json_id: v.optional(v.string()),
  application_id: v.optional(v.string()),
  is_preview: v.nullish(v.boolean(), false),
  request_id: v.optional(v.string(), undefined),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const sendAvailabilityRequestEmailApplicantSchema = v.object({
  organizer_user_id: v.string(),
  avail_req_id: v.nullish(v.string("missing avail_req_id"), undefined),
  preview_details: v.nullish(
    v.object({
      application_id: v.string(),
    }),
    undefined
  ),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});
export const sendAvailReqReminderEmailApplicant = v.object({
  avail_req_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const selfScheduleReminderEmailApplicantSchema = v.object({
  filter_id: v.string(),
  task_id: v.optional(v.string(), undefined),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const meetingDeclinedEmailOrganizerSchema = v.object({
  session_id: v.string(),
  interviewer_id: v.string(),
  application_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});
export const MeetingAcceptedEmailOrganizerSchema = v.object({
  session_id: v.string(),
  interviewer_id: v.string(),
  application_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});
export const interviewEndEmailInterviewerForFeedbackSchema = v.object({
  session_id: v.string(),
  recruiter_user_id: v.string(),
  application_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});
export const onSignupEmailAdminSchema = v.object({
  recruiter_user_id: v.string(),
  recruiter_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const interviewerResumedEmailAdminSchema = v.object({
  interviewe_module_relation_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});

export const onShadowCompleteEmailTraineeSchema = v.object({
  meeting_id: v.string(),
  application_id: v.string(),
  session_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});
export const onRShadowCompleteEmailTraineeSchema = v.object({
  meeting_id: v.string(),
  session_id: v.string(),
  application_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});
export const onQualifiedEmailTraineeSchema = v.object({
  interview_module_relation_id: v.string(),
  approver_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});
export const onQualifiedEmailApproverSchema = v.object({
  session_relation_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});
export const interviewEndEmailOrganizerForMeetingStatusSchema = v.object({
  session_id: v.string(),
  payload: v.optional(
    v.object({
      subject: v.string(),
      body: v.string(),
    })
  ),
});
