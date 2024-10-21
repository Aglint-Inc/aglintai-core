import type { Trigger_API_Action_Mapper } from '@aglint/shared-types';

export const ACTION_TRIGGER_MAP: Trigger_API_Action_Mapper = {
  sendAvailReqReminder: [
    {
      value: {
        target_api: 'sendAvailReqReminder_email_applicant',
        action_type: 'email',
        payload: {
          email: null!,
        },
      },
      name: 'Send Availability Reminder',
      description: 'Sends Availability Request Reminder to Applicant',
    },
  ],
  selfScheduleReminder: [
    {
      value: {
        target_api: 'selfScheduleReminder_email_applicant',
        action_type: 'email',
        payload: {
          email: null!,
        },
      },
      name: 'Send Self-Schedule Reminder',
      description: 'Sends Self-Schedule Reminder to Applicant',
    },
  ],
  interviewStart: [
    {
      value: {
        target_api: 'interviewStart_email_applicant',
        action_type: 'email',
        payload: {
          email: null!,
        },
      },
      name: 'Notify Applicant Interview Start',
      description: 'Notifies the applicant about the start of the interview',
    },
    {
      value: {
        target_api: 'interviewStart_email_interviewers',
        action_type: 'email',
        payload: {
          email: null!,
        },
      },
      name: 'Notify Interviewers Interview Start',
      description: 'Notifies the interviewers about the start of the interview',
    },
    {
      value: {
        target_api: 'interviewStart_email_organizer',
        action_type: 'email',
        payload: {
          email: null!,
        },
      },
      name: 'Notify Organizer Interview Start',
      description: 'Notifies the organizer about the start of the interview',
    },
    {
      value: {
        target_api: 'interviewStart_slack_interviewers',
        action_type: 'slack',
        payload: {
          slack: null!,
        },
      },
      name: 'Slack Interviewers Interview Start',
      description: 'Notifies the interviewers about the start of the interview',
    },
  ],
  interviewerConfirmation: [
    {
      value: {
        target_api: 'interviewerConfirmation_slack_interviewers',
        action_type: 'slack',
        payload: {
          slack: null!,
        },
      },
      name: 'Slack Interviewers Confirmation',
      description:
        'Notifies the interviewers about the confirmation of the interview',
    },
  ],
  interviewEnd: [
    {
      value: {
        target_api: 'interviewEnd_email_interviewerForFeedback',
        action_type: 'email',
        payload: {
          email: null!,
        },
      },
      name: 'Send Feedback Email Interviewers',
      description: 'Sends emails to interviewers asking for interview feedback',
    },
    {
      value: {
        target_api: 'interviewEnd_slack_interviewerForFeedback',
        action_type: 'slack',
        payload: {
          slack: null!,
        },
      },
      name: 'Send Feedback Slack Interviewers',
      description:
        'Sends messages to interviewers asking for interview feedback',
    },
    {
      value: {
        target_api: 'interviewEnd_email_organizerForMeetingStatus',
        action_type: 'email',
        payload: {
          email: null!,
        },
      },
      name: 'Email Organizer Meeting Status',
      description:
        'Sends email to organizer to ask for meeting completion status.',
    },
    {
      value: {
        target_api: 'interviewEnd_slack_organizerForMeetingStatus',
        action_type: 'slack',
        payload: {
          slack: null!,
        },
      },
      name: 'Slack Organizer Meeting Status',
      description:
        'Sends slack message to organizer to ask for meeting completion status.',
    },
    {
      value: {
        target_api: 'interviewEnd_email_shadowTraineeForMeetingAttendence',
        action_type: 'email',
        payload: {
          email: null!,
        },
      },
      name: 'Email Shadow Trainee Attendance',
      description:
        'Sends an attendance confirmation form to shadowing trainees, through email',
    },
    {
      value: {
        target_api: 'interviewEnd_slack_shadowTraineeForMeetingAttendence',
        action_type: 'slack',
        payload: {
          slack: null!,
        },
      },
      name: 'Slack Shadow Trainee Attendance',
      description:
        'Sends an attendance confirmation form to shadowing trainees, through Slack',
    },
    {
      value: {
        target_api: 'interviewEnd_email_rShadowTraineeForMeetingAttendence',
        action_type: 'email',
        payload: {
          email: null!,
        },
      },
      name: 'Email Reverse Shadow Trainee Attendance',
      description:
        'Sends an attendance confirmation form to reverse shadowing trainees, through email',
    },
    {
      value: {
        target_api: 'interviewEnd_slack_rShadowTraineeForMeetingAttendence',
        action_type: 'slack',
        payload: {
          slack: null!,
        },
      },
      name: 'Slack Reverse Shadow Trainee Attendance',
      description:
        'Sends an attendance confirmation form to reverse shadowing trainees, through Slack',
    },
  ],
  meetingDeclined: [
    {
      value: {
        target_api: 'meetingDeclined_email_organizer',
        action_type: 'email',
        payload: {
          email: null!,
        },
      },
      name: 'Notify Organizer Meeting Declined',
      description: 'Notifies the organizer about the declined meeting',
    },
  ],
  meetingAccepted: [
    {
      value: {
        target_api: 'meetingAccepted_email_organizer',
        action_type: 'email',
        payload: {
          email: null!,
        },
      },
      name: 'Notify Organizer Meeting Accepted',
      description: 'Notifies the organizer about the accepted meeting',
    },
  ],
  candidateBook: [
    {
      value: {
        target_api: 'candidateBook_slack_interviewerForConfirmation',
        action_type: 'slack',
        payload: {
          slack: null!,
        },
      },
      name: 'Slack Interviewers Confirmation',
      description: 'Sends confirmation messages to interviewers on Slack',
    },
  ],
  onQualified: [
    {
      value: {
        target_api: 'onQualified_email_trainee',
        action_type: 'email',
        payload: {
          email: null!,
        },
      },
      name: 'Notify Trainee Qualification',
      description: 'Sends email to trainee after qualification',
    },
    {
      value: {
        target_api: 'onQualified_slack_trainee',
        action_type: 'slack',
        payload: {
          slack: null!,
        },
      },
      name: 'Slack Trainee Qualification',
      description: 'Sends Slack notification to trainee after qualification',
    },
  ],
  onTrainingComplete: [
    {
      value: {
        target_api:
          'onTrainingComplete_email_approverForTraineeMeetingQualification',
        action_type: 'email',
        payload: {
          email: null!,
        },
      },
      name: 'Notify Approver Training Complete',
      description:
        'Sends email to approver after trainee completed the shadow and reverse shadow',
    },
    {
      value: {
        target_api:
          'onTrainingComplete_slack_approverForTraineeMeetingQualification',
        action_type: 'slack',
        payload: {
          slack: null!,
        },
      },
      name: 'Slack Approver Training Complete',
      description:
        'Sends slack notification to approver after trainee completed the shadow and reverse shadow',
    },
  ],
  onRequestSchedule: [
    {
      name: 'Send Self-Scheduling Link',
      value: {
        target_api: 'onRequestSchedule_emailLink_sendSelfSchedulingLink',
        action_type: 'agent_instruction',
        payload: {
          agent: {
            instruction: `Pick maximum slots of 5 without any conflicts and candidate preferred time is morning 9 to 12`,
          },
          email: null!,
        },
      },
      description: 'Send Self-Scheduling Link to Candidate',
    },
    {
      name: 'Request Availability Link',
      value: {
        target_api: 'onRequestSchedule_emailLink_getCandidateAvailability',
        action_type: 'email',
        payload: {
          email: null!,
        },
      },
      description: 'Request Availability through link',
    },
  ],
  onReceivingAvailReq: [
    {
      value: {
        target_api: 'onReceivingAvailReq_agent_sendSelfScheduleRequest',
        action_type: 'agent_instruction',
        payload: {
          agent: {
            instruction:
              'Pick maximum slots of 5 without any conflicts and candidate preferred time is morning 9 to 12',
          },
        },
      },
      name: 'AI Choose Time Slots and Send Self-Schedule Link',
      description:
        'Let Aglint AI choose time slots and send a self-schedule link to the candidate.',
    },
    {
      value: {
        target_api: 'onReceivingAvailReq_agent_suggestSlots',
        action_type: 'agent_instruction',
        payload: {
          agent: {
            instruction:
              'Pick maximum slots of 5 without any conflicts and candidate preferred time is morning 9 to 12',
          },
        },
      },
      name: 'Suggest Slots to Organizer',
      description:
        'Pick Suitable slot/s and suggest to the Meeting Organizer in Slack',
    },
  ],
  onRequestCancel: [
    {
      name: 'Cancel Calendar Invites',
      value: {
        action_type: 'end_point',
        target_api: 'onRequestCancel_agent_cancelEvents',
        payload: {
          end_point: null!,
        },
      },
      description: 'Cancel Calendar Invites',
    },
    {
      name: 'Inform Interviewers of Cancellation',
      value: {
        action_type: 'slack',
        target_api: 'onRequestCancel_slack_interviewersOrganizer',
        payload: {
          slack: null!,
        },
      },
      description:
        'Inform interviewers and Slack regarding interview cancellation through Slack',
    },
  ],
  onRequestReschedule: [
    {
      name: 'Ask for New Availability',
      value: {
        action_type: 'end_point',
        target_api: 'onRequestReschedule_emailLink_resendAvailRequest',
        payload: {
          end_point: null!,
        },
      },
      description: 'Ask Candidate for providing new availability',
    },
  ],
  onRequestInterviewerDecline: [
    {
      name: 'Change Next Available Interviewer',
      value: {
        action_type: 'end_point',
        target_api: 'onRequestInterviewerDecline_agent_changeInterviewer',
        payload: {
          end_point: null!,
        },
      },
      description: 'Change next Available interviewer',
    },
  ],
} as const;
