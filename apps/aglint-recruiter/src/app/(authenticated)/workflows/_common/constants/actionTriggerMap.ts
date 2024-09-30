import type { Trigger_API_Action_Mapper } from '@aglint/shared-types';

export const ACTION_TRIGGER_MAP: Trigger_API_Action_Mapper = {
  sendAvailReqReminder: [
    {
      value: {
        target_api: 'sendAvailReqReminder_email_applicant',
        action_type: 'email',
        payload: {
          email: null,
        },
      },
      name: 'Send Availability Request Reminder to Applicant',
    },
  ],
  selfScheduleReminder: [
    {
      value: {
        target_api: 'selfScheduleReminder_email_applicant',
        action_type: 'email',
        payload: {
          email: null,
        },
      },
      name: 'Send Self-Schedule Reminder to Applicant',
    },
  ],
  interviewStart: [
    {
      value: {
        target_api: 'interviewStart_email_applicant',
        action_type: 'email',
        payload: {
          email: null,
        },
      },
      name: 'Send email to applicant',
    },
    {
      value: {
        target_api: 'interviewStart_email_interviewers',
        action_type: 'email',
        payload: {
          email: null,
        },
      },
      name: 'Send emails to interviewers',
    },
    {
      value: {
        target_api: 'interviewStart_email_organizer',
        action_type: 'email',
        payload: {
          email: null,
        },
      },
      name: 'Send emails to organizer',
    },
    {
      value: {
        target_api: 'interviewStart_slack_interviewers',
        action_type: 'slack',
        payload: {
          slack: null,
        },
      },
      name: 'Send slack messages to interviewers',
    },
  ],
  interviewerConfirmation: [
    {
      value: {
        target_api: 'interviewerConfirmation_slack_interviewers',
        action_type: 'slack',
        payload: {
          slack: null,
        },
      },
      name: 'Send slack messages to interviewers',
    },
  ],
  interviewEnd: [
    {
      value: {
        target_api: 'interviewEnd_email_interviewerForFeedback',
        action_type: 'email',
        payload: {
          email: null,
        },
      },
      name: 'Send feedback emails to interviewers',
    },
    {
      value: {
        target_api: 'interviewEnd_slack_interviewerForFeedback',
        action_type: 'slack',
        payload: {
          slack: null,
        },
      },
      name: 'Send feedback messages to interviewers on slack',
    },
    {
      value: {
        target_api: 'interviewEnd_email_organizerForMeetingStatus',
        action_type: 'email',
        payload: {
          email: null,
        },
      },
      name: 'Send a meeting completion confirmation form to the organizer, through email',
    },
    {
      value: {
        target_api: 'interviewEnd_slack_organizerForMeetingStatus',
        action_type: 'slack',
        payload: {
          slack: null,
        },
      },
      name: 'Send a meeting completion confirmation form to the organizer, through slack',
    },
    {
      value: {
        target_api: 'interviewEnd_email_shadowTraineeForMeetingAttendence',
        action_type: 'email',
        payload: {
          email: null,
        },
      },
      name: 'Send an attendance confirmation form to shadowing trainees, through email',
    },
    {
      value: {
        target_api: 'interviewEnd_slack_shadowTraineeForMeetingAttendence',
        action_type: 'slack',
        payload: {
          slack: null,
        },
      },
      name: 'Send an attendance confirmation form to shadowing trainees, through slack',
    },
    {
      value: {
        target_api: 'interviewEnd_email_rShadowTraineeForMeetingAttendence',
        action_type: 'email',
        payload: {
          email: null,
        },
      },
      name: 'Send an attendance confirmation form to reverse shadowing trainees, through email',
    },
    {
      value: {
        target_api: 'interviewEnd_slack_rShadowTraineeForMeetingAttendence',
        action_type: 'slack',
        payload: {
          slack: null,
        },
      },
      name: 'Send an attendance confirmation form to reverse shadowing trainees, through slack',
    },
  ],
  meetingDeclined: [
    {
      value: {
        target_api: 'meetingDeclined_email_organizer',
        action_type: 'email',
        payload: {
          email: null,
        },
      },
      name: 'Send email to organizer',
    },
  ],
  meetingAccepted: [
    {
      value: {
        target_api: 'meetingAccepted_email_organizer',
        action_type: 'email',
        payload: {
          email: null,
        },
      },
      name: 'Send email to organizer',
    },
  ],
  candidateBook: [
    {
      value: {
        target_api: 'candidateBook_slack_interviewerForConfirmation',
        action_type: 'slack',
        payload: {
          slack: null,
        },
      },
      name: 'Send confirmation messages to interviewers on slack',
    },
  ],
  onQualified: [
    {
      value: {
        target_api: 'onQualified_email_trainee',
        action_type: 'email',
        payload: {
          email: null,
        },
      },
      name: 'Send email to trainee',
    },
    {
      value: {
        target_api: 'onQualified_slack_trainee',
        action_type: 'slack',
        payload: {
          slack: null,
        },
      },
      name: 'Send slack notification to trainee',
    },
  ],
  onTrainingComplete: [
    {
      value: {
        target_api:
          'onTrainingComplete_email_approverForTraineeMeetingQualification',
        action_type: 'email',
        payload: {
          email: null,
        },
      },
      name: 'Send email to approver',
    },
    {
      value: {
        target_api:
          'onTrainingComplete_slack_approverForTraineeMeetingQualification',
        action_type: 'slack',
        payload: {
          slack: null,
        },
      },
      name: 'Send slack notification to approver',
    },
  ],
  onRequestSchedule: [
    {
      name: 'Send Self-Scheduling Link to Candidate',
      value: {
        target_api: 'onRequestSchedule_emailLink_sendSelfSchedulingLink',
        action_type: 'agent_instruction',
        payload: {
          agent: {
            instruction: `Pick maximum slots of 5 without any conflicts and candidate preferred time is morning 9 to 12`,
          },
          email: null,
        },
      },
    },
    {
      name: 'Request Availability through link',
      value: {
        target_api: 'onRequestSchedule_emailLink_getCandidateAvailability',
        action_type: 'email',
        payload: {
          email: null,
        },
      },
    },
  ],
  onReceivingAvailReq: [
    {
      value: {
        target_api: 'onReceivingAvailReq_slack_suggestSlots',
        action_type: 'end_point',
        payload: {
          end_point: null,
        },
      },
      name: 'Pick Suitable slot/s and Schedule Interviews',
    },
    {
      value: {
        target_api: 'onReceivingAvailReq_agent_sendSelfScheduleRequest',
        action_type: 'end_point',
        payload: {
          end_point: null,
        },
      },
      name: 'Let Aglint AI choose time slots and send a self-schedule link to the candidate.',
    },
  ],
  onRequestCancel: [
    {
      name: 'Cancel Calender Invites',
      value: {
        action_type: 'end_point',
        target_api: 'onRequestCancel_agent_cancelEvents',
        payload: {
          end_point: null,
        },
      },
    },
    {
      name: 'Inform interviewers and slack regarding interview cancellation through slack',
      value: {
        action_type: 'end_point',
        target_api: 'onRequestCancel_slack_interviewersOrganizer',
        payload: {
          end_point: null,
        },
      },
    },
  ],
  onRequestReschedule: [
    {
      name: 'Ask Candidate for providing new availability',
      value: {
        action_type: 'end_point',
        target_api: 'onRequestReschedule_emailLink_resendAvailRequest',
        payload: {
          end_point: null,
        },
      },
    },
  ],
  onRequestInterviewerDecline: [
    {
      name: 'Change next Available interviewer',
      value: {
        action_type: 'end_point',
        target_api: 'onRequestInterviewerDecline_agent_changeInterviewer',
        payload: {
          end_point: null,
        },
      },
    },
  ],
} as const;
