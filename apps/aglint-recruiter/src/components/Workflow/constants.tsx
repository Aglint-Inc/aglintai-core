import type {
  CustomActionType,
  CustomAgentInstructionPayload,
  Trigger_API_Action_Mapper,
} from '@aglint/shared-types';
import { Lightbulb, Mail, Slack } from 'lucide-react';
import { type ReactNode } from 'react';

import type { Workflow } from '@/types/workflow.types';
import { SafeObject } from '@/utils/safeObject';

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

export const ACTION_TRIGGER_MAP: Trigger_API_Action_Mapper = {
  sendAvailReqReminder: [
    {
      value: {
        target_api: 'sendAvailReqReminder_email_applicant',
        action_type: 'email',
        payload: {},
      },
      name: 'Send email to applicant',
    },
  ],
  selfScheduleReminder: [
    {
      value: {
        target_api: 'selfScheduleReminder_email_applicant',
        action_type: 'email',
        payload: {},
      },
      name: 'Send email to applicant',
    },
  ],
  interviewStart: [
    {
      value: {
        target_api: 'interviewStart_email_applicant',
        action_type: 'email',
        payload: {},
      },
      name: 'Send email to applicant',
    },
    {
      value: {
        target_api: 'interviewStart_email_interviewers',
        action_type: 'email',
        payload: {},
      },
      name: 'Send emails to interviewers',
    },
    {
      value: {
        target_api: 'interviewStart_email_organizer',
        action_type: 'email',
        payload: {},
      },
      name: 'Send emails to organizer',
    },
    {
      value: {
        target_api: 'interviewStart_slack_interviewers',
        action_type: 'slack',
        payload: null,
      },
      name: 'Send slack messages to interviewers',
    },
  ],
  interviewerConfirmation: [
    {
      value: {
        target_api: 'interviewerConfirmation_slack_interviewers',
        action_type: 'slack',
        payload: null,
      },
      name: 'Send slack messages to interviewers',
    },
  ],
  interviewEnd: [
    {
      value: {
        target_api: 'interviewEnd_email_interviewerForFeedback',
        action_type: 'email',
        payload: {},
      },
      name: 'Send feedback emails to interviewers',
    },
    {
      value: {
        target_api: 'interviewEnd_slack_interviewerForFeedback',
        action_type: 'slack',
        payload: null,
      },
      name: 'Send feedback messages to interviewers on slack',
    },
    {
      value: {
        target_api: 'interviewEnd_email_organizerForMeetingStatus',
        action_type: 'email',
        payload: {},
      },
      name: 'Send a meeting completion confirmation form to the organizer, through email',
    },
    {
      value: {
        target_api: 'interviewEnd_slack_organizerForMeetingStatus',
        action_type: 'slack',
        payload: null,
      },
      name: 'Send a meeting completion confirmation form to the organizer, through slack',
    },
    {
      value: {
        target_api: 'interviewEnd_email_shadowTraineeForMeetingAttendence',
        action_type: 'email',
        payload: {},
      },
      name: 'Send an attendance confirmation form to shadowing trainees, through email',
    },
    {
      value: {
        target_api: 'interviewEnd_slack_shadowTraineeForMeetingAttendence',
        action_type: 'slack',
        payload: null,
      },
      name: 'Send an attendance confirmation form to shadowing trainees, through slack',
    },
    {
      value: {
        target_api: 'interviewEnd_email_rShadowTraineeForMeetingAttendence',
        action_type: 'email',
        payload: {},
      },
      name: 'Send an attendance confirmation form to reverse shadowing trainees, through email',
    },
    {
      value: {
        target_api: 'interviewEnd_slack_rShadowTraineeForMeetingAttendence',
        action_type: 'slack',
        payload: null,
      },
      name: 'Send an attendance confirmation form to reverse shadowing trainees, through slack',
    },
  ],
  meetingDeclined: [
    {
      value: {
        target_api: 'meetingDeclined_email_organizer',
        action_type: 'email',
        payload: {},
      },
      name: 'Send email to organizer',
    },
  ],
  meetingAccepted: [
    {
      value: {
        target_api: 'meetingAccepted_email_organizer',
        action_type: 'email',
        payload: {},
      },
      name: 'Send email to organizer',
    },
  ],
  candidateBook: [
    {
      value: {
        target_api: 'candidateBook_slack_interviewerForConfirmation',
        action_type: 'slack',
        payload: null,
      },
      name: 'Send confirmation messages to interviewers on slack',
    },
  ],
  onQualified: [
    {
      value: {
        target_api: 'onQualified_email_trainee',
        action_type: 'email',
        payload: null,
      },
      name: 'Send email to trainee',
    },
    {
      value: {
        target_api: 'onQualified_slack_trainee',
        action_type: 'slack',
        payload: null,
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
        payload: null,
      },
      name: 'Send email to approver',
    },
    {
      value: {
        target_api:
          'onTrainingComplete_slack_approverForTraineeMeetingQualification',
        action_type: 'slack',
        payload: null,
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
        payload: null,
      },
    },
    {
      name: 'Request Availability through link',
      value: {
        target_api: 'onRequestSchedule_emailLink_getCandidateAvailability',
        action_type: 'email',
        payload: null,
      },
    },
    {
      name: 'Self Schedule with Agent via mail',
      value: {
        target_api: 'onRequestSchedule_emailAgent_selfSchedule',
        action_type: 'agent_instruction',
        payload: null,
      },
    },
    {
      name: 'Self Schedule with Agent via Phone',
      value: {
        action_type: 'agent_instruction',
        target_api: 'onRequestSchedule_phoneAgent_selfSchedule',
        payload: null,
      },
    },
  ],
  onReceivingAvailReq: [
    {
      value: {
        target_api: 'onReceivingAvailReq_agent_confirmSlot',
        action_type: 'agent_instruction',
        payload: {
          agent: null,
        },
      },
      name: 'Pick Suitable slot/s and Schedule Interviews',
    },
    {
      value: {
        target_api: 'onReceivingAvailReq_agent_sendSelfScheduleRequest',
        action_type: 'agent_instruction',
        payload: {
          agent: null,
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
        payload: null,
      },
    },
    {
      name: 'Inform interviewers and slack regarding interview cancellation through slack',
      value: {
        action_type: 'end_point',
        target_api: 'onRequestCancel_slack_interviewersOrganizer',
        payload: null,
      },
    },
  ],
  onRequestReschedule: [
    {
      name: 'Ask Candidate for providing new availability',
      value: {
        action_type: 'agent_instruction',
        target_api: 'onRequestReschedule_emailLink_resendAvailRequest',
        payload: {
          agent: null,
        },
      },
    },
  ],
  onRequestInterviewerDecline: [
    {
      name: 'Change next Available interviewer',
      value: {
        action_type: 'agent_instruction',
        target_api: 'onRequestInterviewerDecline_agent_changeInterviewer',
        payload: {
          agent: null,
        },
      },
    },
  ],
} as const;

export const AI_RESPONSE_PLACEHOLDER: CustomAgentInstructionPayload['agent']['ai_response'] =
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
  // eslint-disable-next-line no-unused-vars
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
          payload['icon'] = getWorkflowTagIcon('email');
        }
        break;
      case 'slack':
        {
          payload['color'] = 'pink';
          payload['icon'] = getWorkflowTagIcon('slack');
        }
        break;
      case 'system':
        {
          payload['color'] = 'accent';
          payload['icon'] = getWorkflowTagIcon('end_point');
        }
        break;
    }
    // eslint-disable-next-line security/detect-object-injection
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

export function getWorkflowTagIcon(type: CustomActionType) {
  switch (type) {
    case 'slack':
      return <Slack />;
    case 'email':
      return <Mail />;
    default:
      return <Lightbulb />;
  }
}
