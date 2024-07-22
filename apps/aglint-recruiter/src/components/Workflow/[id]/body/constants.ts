import { DatabaseTable } from '@aglint/shared-types';

import { Workflow } from '@/src/types/workflow.types';

export const DURATION_OPTIONS: { name: string; value: number }[] = [
  {
    name: 'No delay',
    value: 0,
  },
  {
    name: '30 mins',
    value: 30,
  },
  {
    name: '1 hour',
    value: 60,
  },
  {
    name: '2 hours',
    value: 120,
  },
  {
    name: '1 day',
    value: 1440,
  },
];

export const TRIGGER_PAYLOAD: {
  trigger: Workflow['trigger'];
  phase: Workflow['phase'][];
}[] = [
  {
    trigger: 'sendAvailReqReminder',
    phase: ['after'],
  },
  {
    trigger: 'selfScheduleReminder',
    phase: ['after'],
  },
  {
    trigger: 'interviewStart',
    phase: ['before'],
  },
  {
    trigger: 'interviewerConfirmation',
    phase: ['after'],
  },
  {
    trigger: 'interviewEnd',
    phase: ['after'],
  },
  {
    trigger: 'meetingDeclined',
    phase: ['after'],
  },
  {
    trigger: 'meetingAccepted',
    phase: ['after'],
  },
  {
    trigger: 'candidateBook',
    phase: ['after'],
  },
  {
    trigger: 'onQualified',
    phase: ['after'],
  },
];

export function getTriggerOption(
  trigger: Workflow['trigger'],
  phase: Workflow['phase'],
): string {
  let message = '';
  switch (trigger) {
    case 'sendAvailReqReminder':
      message = 'sending an availability request';
      break;
    case 'selfScheduleReminder':
      message = 'sending a self schedule request';
      break;
    case 'interviewStart':
      message = 'starting an interview';
      break;
    case 'interviewerConfirmation':
      message = 'an interviewer confirms an interview';
      break;
    case 'interviewEnd':
      message = 'ending an interview';
      break;
    case 'meetingDeclined':
      message = 'an interviewer declines a meeting invitation';
      break;
    case 'meetingAccepted':
      message = 'an interviewer accepts a meeting invitation';
      break;
    case 'candidateBook':
      message = 'a candidate books a meeting';
      break;
    case 'onQualified':
      message = 'a trainee qualifies';
      break;
  }
  let preMessage = '';
  switch (phase) {
    case 'before':
      preMessage = 'Before';
      break;
    case 'after':
      preMessage = 'After';
      break;
    case 'now':
      preMessage = 'When';
      break;
  }
  return `${preMessage} ${message}`;
}

export const ACTION_TRIGGER_MAP: {
  // eslint-disable-next-line no-unused-vars
  [trigger in Workflow['trigger']]: {
    name: string;
    value: DatabaseTable['company_email_template']['type'];
  }[];
} = {
  sendAvailReqReminder: [
    {
      value: 'sendAvailReqReminder_email_applicant',
      name: 'Send email to applicant',
    },
  ],
  selfScheduleReminder: [
    {
      value: 'selfScheduleReminder_email_applicant',
      name: 'Send email to applicant',
    },
  ],
  interviewStart: [
    {
      value: 'interviewStart_email_applicant',
      name: 'Send email to applicant',
    },
    {
      value: 'interviewStart_email_interviewers',
      name: 'Send emails to interviewers',
    },
    {
      value: 'interviewStart_email_organizer',
      name: 'Send emails to organizer',
    },
    {
      value: 'interviewStart_slack_interviewers',
      name: 'Send slack messages to interviewers',
    },
  ],
  interviewerConfirmation: [
    {
      value: 'interviewerConfirmation_slack_interviewers',
      name: 'Send slack messages to interviewers',
    },
  ],
  interviewEnd: [
    {
      value: 'interviewEnd_email_interviewerForFeedback',
      name: 'Send feedback emails to interviewers',
    },
    {
      value: 'interviewEnd_slack_interviewerForFeedback',
      name: 'Send feedback messages to interviewers on slack',
    },
    {
      value: 'interviewEnd_email_organizerForMeetingStatus',
      name: 'Send a meeting completion confirmation form to the organizer, through email',
    },
    {
      value: 'interviewEnd_slack_organizerForMeetingStatus',
      name: 'Send a meeting completion confirmation form to the organizer, through slack',
    },
    {
      value: 'interviewEnd_email_shadowTraineeForMeetingAttendence',
      name: 'Send an attendance confirmation form to shadowing trainees, through email',
    },
    {
      value: 'interviewEnd_slack_shadowTraineeForMeetingAttendence',
      name: 'Send an attendance confirmation form to shadowing trainees, through slack',
    },
    {
      value: 'interviewEnd_email_rShadowTraineeForMeetingAttendence',
      name: 'Send an attendance confirmation form to reverse shadowing trainees, through email',
    },
    {
      value: 'interviewEnd_slack_rShadowTraineeForMeetingAttendence',
      name: 'Send an attendance confirmation form to reverse shadowing trainees, through slack',
    },
  ],
  meetingDeclined: [
    {
      value: 'meetingDeclined_email_organizer',
      name: 'Send email to organizer',
    },
  ],
  meetingAccepted: [
    {
      value: 'meetingAccepted_email_organizer',
      name: 'Send email to organizer',
    },
  ],
  candidateBook: [
    {
      value: 'candidateBook_slack_interviewerForConfirmation',
      name: 'Send confirmation messages to interviewers on slack',
    },
  ],
  onQualified: [
    {
      value: 'onQualified_email_trainee',
      name: 'Send email to trainee',
    },
    {
      value: 'onQualified_slack_trainee',
      name: 'Send slack notification to trainee',
    },
  ],
};
