import type { DatabaseView } from '@aglint/shared-types';
import type { ReactNode } from 'react';

import { SafeObject } from '@/utils/safeObject';
import { getWorkflowTagIcon } from '@/workflows/utils/getWorkflowTagIcon';

type WorkflowTagOptionsType<
  T extends
    DatabaseView['workflow_view']['tags'][number] = DatabaseView['workflow_view']['tags'][number],
  // eslint-disable-next-line no-unused-vars
> = {
  // eslint-disable-next-line no-unused-vars
  [_id in T]: string;
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
  company: 'Aglint AI',
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
          payload['color'] = 'info';
          payload['icon'] = getWorkflowTagIcon('email');
        }
        break;
      case 'slack':
        {
          payload['color'] = 'purple';
          payload['icon'] = getWorkflowTagIcon('slack');
        }
        break;
      case 'company':
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
      color: 'purple' | 'info' | 'accent' | 'neutral';
      value: T;
    };
  },
);
