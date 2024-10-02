import { type DatabaseTable } from '@aglint/shared-types';

export const modified_seed_workflow_actions: {
  workflow: Pick<
    DatabaseTable['workflow'],
    | 'auto_connect'
    | 'description'
    | 'interval'
    | 'phase'
    | 'title'
    | 'trigger'
    | 'workflow_type'
  >;
  actions: Pick<
    DatabaseTable['workflow_action'],
    'payload' | 'order' | 'target_api' | 'action_type'
  >[];
}[] = [
  {
    workflow: {
      auto_connect: true,
      description: '',
      interval: 0,
      phase: 'after',
      title:
        'Send Candidate Availability Request email on Recieving Schedule Request',
      trigger: 'onRequestSchedule',
      workflow_type: 'job',
    },
    actions: [
      {
        order: 0,
        target_api: 'onRequestSchedule_emailLink_getCandidateAvailability',
        action_type: 'end_point',
        payload: {},
      },
    ],
  },
  {
    workflow: {
      trigger: 'sendAvailReqReminder',
      phase: 'after',
      interval: 24 * 60,
      title: 'Candidate Availability reminder',
      auto_connect: true,
      description:
        'Send a reminder to the candidate if they do not respond to the Avalibility request link within 24 hours',
      workflow_type: 'job',
    },
    actions: [
      {
        order: 0,
        target_api: 'sendAvailReqReminder_email_applicant',
        action_type: 'email',
        payload: {},
      },
    ],
  },
  {
    workflow: {
      auto_connect: true,
      phase: 'after',
      title: 'Send Self-Schedule Request on Receiving Availability Request',
      description: '',
      interval: 0,
      trigger: 'onReceivingAvailReq',
      workflow_type: 'job',
    },
    actions: [
      {
        order: 0,
        target_api: 'onReceivingAvailReq_agent_sendSelfScheduleRequest',
        action_type: 'agent_instruction',
        payload: {
          agent: {
            instruction: '',
          },
        },
      },
    ],
  },
  {
    workflow: {
      trigger: 'selfScheduleReminder',
      phase: 'after',
      interval: 24 * 60,
      title: 'Candidate Confirmation Reminder',
      auto_connect: true,
      description: '',
      workflow_type: 'job',
    },
    actions: [
      {
        order: 0,
        target_api: 'selfScheduleReminder_email_applicant',
        action_type: 'email',
        payload: {},
      },
    ],
  },
  {
    workflow: {
      trigger: 'candidateBook',
      phase: 'after',
      interval: 0,
      title: 'Slack: RSVP Interviewers',
      auto_connect: true,
      description: '',
      workflow_type: 'job',
    },
    actions: [
      {
        order: 0,
        target_api: 'candidateBook_slack_interviewerForConfirmation',
        action_type: 'slack',
        payload: {},
      },
    ],
  },
  {
    workflow: {
      auto_connect: true,
      description: '',
      interval: 0,
      phase: 'after',
      title:
        'Send Slack and Email notifications to the Trainee interviewer for confirming whether He attended or not',
      trigger: 'interviewEnd',
      workflow_type: 'company',
    },
    actions: [
      {
        order: 0,
        target_api: 'interviewEnd_email_shadowTraineeForMeetingAttendence',
        action_type: 'email',
        payload: {},
      },
      {
        order: 1,
        target_api: 'interviewEnd_slack_rShadowTraineeForMeetingAttendence',
        action_type: 'slack',
        payload: {},
      },
      {
        order: 2,
        target_api: 'interviewEnd_email_rShadowTraineeForMeetingAttendence',
        action_type: 'email',
        payload: {},
      },
      {
        order: 3,
        target_api: 'interviewEnd_slack_shadowTraineeForMeetingAttendence',
        action_type: 'slack',
        payload: {},
      },
    ],
  },
  {
    workflow: {
      auto_connect: true,
      description: '',
      interval: 0,
      phase: 'after',
      title: 'Interviewer declines meeting',
      trigger: 'onRequestInterviewerDecline',
      workflow_type: 'job',
    },
    actions: [
      {
        action_type: 'end_point',
        order: 0,
        target_api: 'onRequestInterviewerDecline_agent_changeInterviewer',
        payload: {},
      },
    ],
  },
];
