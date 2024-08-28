import type {
  CustomAgentInstructionPayload,
  Trigger_API_Action_Mapper,
} from '@aglint/shared-types';

import type { Workflow } from '@/src/types/workflow.types';
import { SafeObject } from '@/src/utils/safeObject';
import { ReactNode } from 'react';

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
] as const;

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
  {
    trigger: 'onTrainingComplete',
    phase: ['after'],
  },
  {
    trigger: 'onRequestSchedule',
    phase: ['after'],
  },
  {
    trigger: 'onReceivingAvailReq',
    phase: ['after'],
  },
  {
    trigger: 'onSelfScheduleReqAgent',
    phase: ['after'],
  },
  {
    phase: ['after'],
    trigger: 'onRequestCancel',
  },
  {
    phase: ['after'],
    trigger: 'onRequestReschedule',
  },
  {
    phase: ['after'],
    trigger: 'onRequestInterviewerDecline',
  },
] as const;

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
    case 'onTrainingComplete':
      message = 'a trainee completes training';
      break;
    case 'onRequestSchedule':
      message = 'Receiving a candidate schedule request';
      break;
    case 'onReceivingAvailReq':
      message = 'Receiving a candidate availability';
      break;
    case 'onSelfScheduleReqAgent':
      message = 'Candidate submits a self-schedule';
      break;
    case 'onRequestCancel':
      message = 'Candidate cancels a request';
      break;
    case 'onRequestReschedule':
      message = 'Candiate requests a reschedule';
      break;
    case 'onRequestInterviewerDecline':
      message = 'Interviewer declines a meeting';
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

export const ACTION_TRIGGER_MAP: Partial<Trigger_API_Action_Mapper> = {
  sendAvailReqReminder: [
    {
      value: {
        target_api: 'sendAvailReqReminder_email_applicant',
        action_type: 'email',
      },
      name: 'Send email to applicant',
    },
  ],
  selfScheduleReminder: [
    {
      value: {
        target_api: 'selfScheduleReminder_email_applicant',
        action_type: 'email',
      },
      name: 'Send email to applicant',
    },
  ],
  interviewStart: [
    {
      value: {
        target_api: 'interviewStart_email_applicant',
        action_type: 'email',
      },
      name: 'Send email to applicant',
    },
    {
      value: {
        target_api: 'interviewStart_email_interviewers',
        action_type: 'email',
      },
      name: 'Send emails to interviewers',
    },
    {
      value: {
        target_api: 'interviewStart_email_organizer',
        action_type: 'email',
      },
      name: 'Send emails to organizer',
    },
    {
      value: {
        target_api: 'interviewStart_slack_interviewers',
        action_type: 'slack',
      },
      name: 'Send slack messages to interviewers',
    },
  ],
  interviewerConfirmation: [
    {
      value: {
        target_api: 'interviewerConfirmation_slack_interviewers',
        action_type: 'slack',
      },
      name: 'Send slack messages to interviewers',
    },
  ],
  interviewEnd: [
    {
      value: {
        target_api: 'interviewEnd_email_interviewerForFeedback',
        action_type: 'email',
      },
      name: 'Send feedback emails to interviewers',
    },
    {
      value: {
        target_api: 'interviewEnd_slack_interviewerForFeedback',
        action_type: 'slack',
      },
      name: 'Send feedback messages to interviewers on slack',
    },
    {
      value: {
        target_api: 'interviewEnd_email_organizerForMeetingStatus',
        action_type: 'email',
      },
      name: 'Send a meeting completion confirmation form to the organizer, through email',
    },
    {
      value: {
        target_api: 'interviewEnd_slack_organizerForMeetingStatus',
        action_type: 'slack',
      },
      name: 'Send a meeting completion confirmation form to the organizer, through slack',
    },
    {
      value: {
        target_api: 'interviewEnd_email_shadowTraineeForMeetingAttendence',
        action_type: 'email',
      },
      name: 'Send an attendance confirmation form to shadowing trainees, through email',
    },
    {
      value: {
        target_api: 'interviewEnd_slack_shadowTraineeForMeetingAttendence',
        action_type: 'slack',
      },
      name: 'Send an attendance confirmation form to shadowing trainees, through slack',
    },
    {
      value: {
        target_api: 'interviewEnd_email_rShadowTraineeForMeetingAttendence',
        action_type: 'email',
      },
      name: 'Send an attendance confirmation form to reverse shadowing trainees, through email',
    },
    {
      value: {
        target_api: 'interviewEnd_slack_rShadowTraineeForMeetingAttendence',
        action_type: 'slack',
      },
      name: 'Send an attendance confirmation form to reverse shadowing trainees, through slack',
    },
  ],
  meetingDeclined: [
    {
      value: {
        target_api: 'meetingDeclined_email_organizer',
        action_type: 'email',
      },
      name: 'Send email to organizer',
    },
  ],
  meetingAccepted: [
    {
      value: {
        target_api: 'meetingAccepted_email_organizer',
        action_type: 'email',
      },
      name: 'Send email to organizer',
    },
  ],
  candidateBook: [
    {
      value: {
        target_api: 'candidateBook_slack_interviewerForConfirmation',
        action_type: 'slack',
      },
      name: 'Send confirmation messages to interviewers on slack',
    },
  ],
  onQualified: [
    {
      value: {
        target_api: 'onQualified_email_trainee',
        action_type: 'email',
      },
      name: 'Send email to trainee',
    },
    {
      value: {
        target_api: 'onQualified_slack_trainee',
        action_type: 'slack',
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
      },
      name: 'Send email to approver',
    },
    {
      value: {
        target_api:
          'onTrainingComplete_slack_approverForTraineeMeetingQualification',
        action_type: 'slack',
      },
      name: 'Send slack notification to approver',
    },
  ],
  onRequestSchedule: [
    {
      name: 'Send Self-Scheduling Link to Candidate',
      value: {
        target_api: 'onRequestSchedule_emailLink_sendSelfSchedulingLink',
        action_type: 'email',
      },
    },
    {
      name: 'Request Availability through link',
      value: {
        target_api: 'onRequestSchedule_emailLink_getCandidateAvailability',
        action_type: 'agent_instruction',
      },
    },
    {
      name: 'Self Schedule with Agent via mail',
      value: {
        target_api: 'onRequestSchedule_emailAgent_selfSchedule',
        action_type: 'agent_instruction',
      },
    },
    {
      name: 'Self Schedule with Agent via Phone',
      value: {
        action_type: 'agent_instruction',
        target_api: 'onRequestSchedule_phoneAgent_selfSchedule',
      },
    },
  ],
  onReceivingAvailReq: [
    {
      value: {
        target_api: 'onReceivingAvailReq_agent_confirmSlot',
        action_type: 'agent_instruction',
      },
      name: 'Pick Suitable slot/s and Schedule Interviews',
    },
    {
      value: {
        target_api: 'onReceivingAvailReq_agent_sendSelfScheduleRequest' as any, //TODO: fix lint
        action_type: 'agent_instruction',
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
      },
    },
    {
      name: 'Inform interviewers and slack regarding interview cancellation through slack',
      value: {
        action_type: 'end_point',
        target_api: 'onRequestCancel_slack_interviewersOrganizer',
      },
    },
  ],
  onRequestReschedule: [
    {
      name: 'Ask Candidate for providing new availability',
      value: {
        action_type: 'agent_instruction',
        target_api: 'onRequestReschedule_emailLink_resendAvailRequest',
      },
    },
  ],
  onRequestInterviewerDecline: [
    {
      name: 'Change next Available interviewer',
      value: {
        action_type: 'agent_instruction',
        target_api: 'onRequestInterviewerDecline_agent_changeInterviewer',
      },
    },
  ],
} as const;

export const AI_RESPONSE_PLACEHOLDER: CustomAgentInstructionPayload['ai_response'] =
  {
    scheduleWithinNumDays: 3,
    schedulewithMaxNumDays: 5,
    prefferredInterviewTimes: [{ startTime: '10:00', endTime: '18:00' }],
    excludeInterviewTimes: [],
    maxOptionsToCandidates: 10,
    balanceWorkloadAmongInterviewers: true,
    scheduleOutsideOfficeHoursForTimezoneDifferences: true,
    preferredInterviewer: [],
  } as const;

type WorkflowTagOptionsType<
  T extends Workflow['tags'][number] = Workflow['tags'][number],
  // eslint-disable-next-line no-unused-vars
> = {
  [id in T]: string;
};

const TAG_MAP: WorkflowTagOptionsType = {
  candidateBook: 'Candidate book',
  interviewEnd: 'Interview End',
  interviewerConfirmation: 'Interviewer Confirmation',
  interviewStart: 'Interview Start',
  meetingAccepted: 'Meeting Accepted',
  meetingDeclined: 'Meeting Declined',
  onQualified: 'On Qualification',
  onReceivingAvailReq: 'Receiving Availability Request',
  onRequestCancel: 'Cancel Request',
  onRequestInterviewerDecline: 'Decline Request',
  onRequestReschedule: 'Reschedule Request',
  onRequestSchedule: 'Schedule Request',
  onSelfScheduleReqAgent: 'Self Schedule Request',
  onTrainingComplete: 'Training Completion',
  selfScheduleReminder: 'Self Schedule Reminder',
  sendAvailReqReminder: 'Availiability Request Reminder',
  email: 'Email',
  slack: 'Slack',
  system: 'Aglint AI',
};

export const TAG_OPTIONS = SafeObject.entries(TAG_MAP).reduce(
  (acc, [key, value]) => {
    const payload: (typeof acc)[typeof key] = {
      name: value,
      value: key,
      color: 'neutral',
      iconName: null,
      icon: null,
    };
    switch (key) {
      case 'email':
        {
          payload['color'] = 'blue';
          payload['iconName'] = 'forward_to_inbox';
        }
        break;
      case 'slack':
        {
          payload['color'] = 'pink';
          payload['icon'] = <SlackIcon />;
        }
        break;
      case 'system':
        {
          payload['color'] = 'accent';
          payload['icon'] = <AIIcon />;
        }
        break;
    }
    acc[key] = payload as any;
    return acc;
  },
  {} as {
    [T in keyof WorkflowTagOptionsType]: {
      name: string;
      iconName: string | null;
      icon: ReactNode | null;
      color: string;
      value: T;
    };
  },
);

function SlackIcon() {
  return (
    <svg
      width='10'
      height='10'
      viewBox='0 0 10 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.10045 6.3192C2.10045 6.89732 1.62723 7.37054 1.04911 7.37054C0.470982 7.37054 0 6.89732 0 6.3192C0 5.74107 0.473214 5.26786 1.05134 5.26786H2.10268V6.3192H2.10045ZM2.62946 6.3192C2.62946 5.74107 3.10268 5.26786 3.6808 5.26786C4.25893 5.26786 4.73214 5.74107 4.73214 6.3192V8.94866C4.73214 9.52679 4.25893 10 3.6808 10C3.10268 10 2.62946 9.52679 2.62946 8.94866V6.3192ZM3.6808 2.10045C3.10268 2.10045 2.62946 1.62723 2.62946 1.04911C2.62946 0.470982 3.10268 0 3.6808 0C4.25893 0 4.73214 0.473214 4.73214 1.05134V2.10268H3.6808V2.10045ZM3.6808 2.62946C4.25893 2.62946 4.73214 3.10268 4.73214 3.6808C4.73214 4.25893 4.25893 4.73214 3.6808 4.73214H1.05134C0.473214 4.73214 0 4.25893 0 3.6808C0 3.10268 0.473214 2.62946 1.05134 2.62946H3.6808ZM7.89955 3.6808C7.89955 3.10268 8.37277 2.62946 8.95089 2.62946C9.52902 2.62946 10.0022 3.10268 10.0022 3.6808C10.0022 4.25893 9.52902 4.73214 8.95089 4.73214H7.89955V3.6808ZM7.37054 3.6808C7.37054 4.25893 6.89732 4.73214 6.3192 4.73214C5.74107 4.73214 5.26786 4.25893 5.26786 3.6808V1.05134C5.26786 0.473214 5.74107 0 6.3192 0C6.89732 0 7.37054 0.473214 7.37054 1.05134V3.6808ZM6.3192 7.89955C6.89732 7.89955 7.37054 8.37277 7.37054 8.95089C7.37054 9.52902 6.89732 10.0022 6.3192 10.0022C5.74107 10.0022 5.26786 9.52902 5.26786 8.95089V7.89955H6.3192ZM6.3192 7.37054C5.74107 7.37054 5.26786 6.89732 5.26786 6.3192C5.26786 5.74107 5.74107 5.26786 6.3192 5.26786H8.94866C9.52679 5.26786 10 5.74107 10 6.3192C10 6.89732 9.52679 7.37054 8.94866 7.37054H6.3192Z'
        fill='#B60074'
        fill-opacity='0.839216'
      />
    </svg>
  );
}

function AIIcon() {
  return (
    <svg
      width='10'
      height='10'
      viewBox='0 0 10 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M2.6001 0.600098C1.49553 0.600098 0.600098 1.49553 0.600098 2.6001C0.600098 3.70467 1.49553 4.6001 2.6001 4.6001C3.70467 4.6001 4.6001 3.70467 4.6001 2.6001C4.6001 1.49553 3.70467 0.600098 2.6001 0.600098ZM1.4001 2.6001C1.4001 1.93735 1.93735 1.4001 2.6001 1.4001C3.26284 1.4001 3.8001 1.93735 3.8001 2.6001C3.8001 3.26284 3.26284 3.8001 2.6001 3.8001C1.93735 3.8001 1.4001 3.26284 1.4001 2.6001ZM7.4001 0.600098C6.29553 0.600098 5.4001 1.49553 5.4001 2.6001C5.4001 3.70467 6.29553 4.6001 7.4001 4.6001C8.50466 4.6001 9.4001 3.70467 9.4001 2.6001C9.4001 1.49553 8.50466 0.600098 7.4001 0.600098ZM6.2001 2.6001C6.2001 1.93735 6.73735 1.4001 7.4001 1.4001C8.06282 1.4001 8.6001 1.93735 8.6001 2.6001C8.6001 3.26284 8.06282 3.8001 7.4001 3.8001C6.73735 3.8001 6.2001 3.26284 6.2001 2.6001ZM0.600098 7.4001C0.600098 6.29553 1.49553 5.4001 2.6001 5.4001C3.70467 5.4001 4.6001 6.29553 4.6001 7.4001C4.6001 8.50466 3.70467 9.4001 2.6001 9.4001C1.49553 9.4001 0.600098 8.50466 0.600098 7.4001ZM2.6001 6.2001C1.93735 6.2001 1.4001 6.73735 1.4001 7.4001C1.4001 8.06282 1.93735 8.6001 2.6001 8.6001C3.26284 8.6001 3.8001 8.06282 3.8001 7.4001C3.8001 6.73735 3.26284 6.2001 2.6001 6.2001ZM7.4001 5.4001C6.29553 5.4001 5.4001 6.29553 5.4001 7.4001C5.4001 8.50466 6.29553 9.4001 7.4001 9.4001C8.50466 9.4001 9.4001 8.50466 9.4001 7.4001C9.4001 6.29553 8.50466 5.4001 7.4001 5.4001ZM6.2001 7.4001C6.2001 6.73735 6.73735 6.2001 7.4001 6.2001C8.06282 6.2001 8.6001 6.73735 8.6001 7.4001C8.6001 8.06282 8.06282 8.6001 7.4001 8.6001C6.73735 8.6001 6.2001 8.06282 6.2001 7.4001Z'
        fill='#CC4E00'
      />
    </svg>
  );
}
