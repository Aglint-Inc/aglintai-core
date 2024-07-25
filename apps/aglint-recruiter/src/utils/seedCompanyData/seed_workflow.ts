import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';

export const seed_workflow_actions: {
  workflow: Pick<
    DatabaseTable['workflow'],
    'auto_connect' | 'description' | 'interval' | 'phase' | 'title' | 'trigger'
  >;
  actions: (Pick<DatabaseTable['workflow_action'], 'order'> & {
    template_type: DatabaseEnums['email_slack_types'];
  })[];
}[] = [
  {
    workflow: {
      trigger: 'interviewStart',
      phase: 'before',
      interval: 30,
      title:
        'Send Email Reminders to candidate, interviewers, organizer 30 Min Before Interview',
      auto_connect: true,
      description: '',
    },
    actions: [
      {
        order: 0,
        template_type: 'interviewStart_email_applicant',
      },
      {
        order: 1,
        template_type: 'interviewStart_email_interviewers',
      },
      {
        order: 2,
        template_type: 'interviewStart_email_organizer',
      },
    ],
  },
  {
    workflow: {
      trigger: 'interviewStart',
      phase: 'before',
      interval: 30,
      title: 'Send Slack Reminders 30 Minutes Before Interview',
      auto_connect: true,
      description: '',
    },
    actions: [
      {
        order: 1,
        template_type: 'interviewStart_slack_interviewers',
      },
    ],
  },
  {
    workflow: {
      trigger: 'candidateBook',
      phase: 'after',
      interval: 0,
      title: 'Slack Interviewer for Confirmation After Candidate Scheduling',
      auto_connect: true,
      description: '',
    },
    actions: [
      {
        order: 0,
        template_type: 'candidateBook_slack_interviewerForConfirmation',
      },
    ],
  },
  {
    workflow: {
      trigger: 'sendAvailReqReminder',
      phase: 'after',
      interval: 24 * 60,
      title: 'Send Availability Request Reminder Email for Candidate',
      auto_connect: true,
      description:
        'Send a reminder to the candidate if they do not respond to the Avalibility request link within 24 hours',
    },
    actions: [
      {
        order: 0,
        template_type: 'sendAvailReqReminder_email_applicant',
      },
    ],
  },
  {
    workflow: {
      trigger: 'selfScheduleReminder',
      phase: 'after',
      interval: 24 * 60,
      title:
        'Send a reminder to the candidate if they do not respond to the self-scheduling link within 24 hours.',
      auto_connect: true,
      description: '',
    },
    actions: [
      {
        order: 0,
        template_type: 'selfScheduleReminder_email_applicant',
      },
    ],
  },
  {
    workflow: {
      auto_connect: false,
      description: '',
      interval: 0,
      phase: 'after',
      title:
        'Send Email, Slack Reminder to Provide Feedback for the Candidate After the Interview',
      trigger: 'interviewEnd',
    },
    actions: [
      { order: 0, template_type: 'interviewEnd_email_interviewerForFeedback' },
      { order: 0, template_type: 'interviewEnd_slack_interviewerForFeedback' },
    ],
  },
  {
    workflow: {
      auto_connect: false,
      description: '',
      interval: 0,
      phase: 'after',
      title:
        'Send an Email to the Organizer When the Interviewer Declines the Meeting',
      trigger: 'meetingDeclined',
    },
    actions: [
      {
        order: 0,
        template_type: 'meetingDeclined_email_organizer',
      },
    ],
  },
  {
    workflow: {
      auto_connect: false,
      description: '',
      interval: 0,
      phase: 'now',
      title:
        'Send an Email to the Organizer When the Interviewer accepts the Meeting',
      trigger: 'meetingAccepted',
    },
    actions: [
      {
        order: 0,
        template_type: 'meetingAccepted_email_organizer',
      },
    ],
  },
  {
    workflow: {
      auto_connect: false,
      description: '',
      interval: 0,
      phase: 'after',
      title:
        'Send Email, Slack to Meeting organizer for Provide Meeting complete status',
      trigger: 'interviewEnd',
    },
    actions: [
      {
        order: 0,
        template_type: 'interviewEnd_slack_organizerForMeetingStatus',
      },
      {
        order: 0,
        template_type: 'interviewEnd_email_organizerForMeetingStatus',
      },
    ],
  },
  {
    workflow: {
      auto_connect: false,
      description: '',
      interval: 0,
      phase: 'after',
      title:
        'Send Slack and Email notifications to the Trainee interviewer for confirming whether He attended or not',
      trigger: 'interviewEnd',
    },
    actions: [
      {
        order: 0,
        template_type: 'interviewEnd_email_shadowTraineeForMeetingAttendence',
      },
      {
        order: 1,
        template_type: 'interviewEnd_slack_rShadowTraineeForMeetingAttendence',
      },
      {
        order: 2,
        template_type: 'interviewEnd_email_rShadowTraineeForMeetingAttendence',
      },
      {
        order: 3,
        template_type: 'interviewEnd_slack_shadowTraineeForMeetingAttendence',
      },
    ],
  },
  {
    workflow: {
      auto_connect: false,
      description: '',
      interval: 0,
      phase: 'after',
      title:
        'Send Email, Slack notification to the approver when all Shadow and Reverse Shadow training is completed',
      trigger: 'onTrainingComplete',
    },
    actions: [
      {
        order: 0,
        template_type:
          'onTrainingComplete_email_approverForTraineeMeetingQualification',
      },
      {
        order: 0,
        template_type:
          'onTrainingComplete_slack_approverForTraineeMeetingQualification',
      },
    ],
  },
  {
    workflow: {
      trigger: 'onQualified',
      auto_connect: false,
      description: '',
      interval: 0,
      phase: 'after',
      title:
        'Send Slack, Email confirmation for the Interviewer when he is moved to qualified',
    },
    actions: [
      {
        order: 0,
        template_type: 'onQualified_email_trainee',
      },
      {
        order: 1,
        template_type: 'onQualified_slack_trainee',
      },
    ],
  },
];
