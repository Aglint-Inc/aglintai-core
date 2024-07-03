import { DatabaseEnums, DatabaseView } from '@aglint/shared-types';
import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';

import dayjs from '@/src/utils/dayjs';

export type indicatorType =
  | 'READY_TO_SCHEDULE'
  | 'AWAITING_RESPONSE'
  | 'NO_RESPONSE'
  | 'MAIL_SENT'
  | 'BOOKED'
  | 'SCHEDULED'
  | 'RESCHEDULE'
  | 'ACTION_NEEDED'
  | 'UNKNOWN_STATUS'
  | 'ASSIGNED_TO_AGENT'
  | 'COMPLETED'
  | 'CLOSED';

export function getIndicatorMessage(indicator: indicatorType): string {
  switch (indicator) {
    case 'READY_TO_SCHEDULE':
      return 'Ready to Schedule';
    case 'AWAITING_RESPONSE':
      return 'Awaiting Response';
    case 'NO_RESPONSE':
      return `No Response`;
    case 'BOOKED':
      return 'Booked';
    case 'SCHEDULED':
      return 'Ready to Schedule';
    case 'ACTION_NEEDED':
      return 'Action Needed';
    case 'UNKNOWN_STATUS':
      return 'Unknown Status';
    case 'MAIL_SENT':
      return 'Mail Sent';
    case 'ASSIGNED_TO_AGENT':
      return 'Assigned to Agent';
    case 'COMPLETED':
      return 'Task Completed';
    case 'CLOSED':
      return 'Task Closed';
    default:
      return 'Invalid indicator type';
  }
}

export function getIndicator({
  task,
  progress_type,
  created_at,
}: {
  task: DatabaseView['tasks_view'];
  progress_type: DatabaseEnums['progress_type'];
  created_at: string;
}) {
  let toDayDateTime = dayjs();
  let dueDateTime = dayjs(created_at);
  const assignee = task.assignee[0];
  const checkCloseOrCompleted =
    task.status !== 'closed' && task.status !== 'completed';
  if (
    dueDateTime.isBefore(toDayDateTime.add(-2, 'day')) &&
    progress_type === 'email_messages'
  ) {
    return 'NO_RESPONSE' as indicatorType;
  }
  if (
    progress_type === 'schedule' &&
    (assignee === EmailAgentId || assignee === PhoneAgentId)
  ) {
    return 'ASSIGNED_TO_AGENT' as indicatorType;
  }
  if (task.trigger_count === 2 && progress_type === 'call_disconnected') {
    return 'NO_RESPONSE' as indicatorType;
  }

  if (
    (progress_type === 'request_availability' && checkCloseOrCompleted) ||
    progress_type === 'send_email'
  ) {
    return 'AWAITING_RESPONSE' as indicatorType;
  }

  if (
    ((progress_type === 'schedule' && checkCloseOrCompleted) ||
      (progress_type === 'request_availability_list' &&
        checkCloseOrCompleted)) &&
    assignee !== EmailAgentId &&
    assignee !== PhoneAgentId
  ) {
    return 'READY_TO_SCHEDULE' as indicatorType;
  }

  if (progress_type === 'interview_schedule') {
    return 'BOOKED' as indicatorType;
  }

  if (
    progress_type === 'call_failed' ||
    progress_type === 'call_disconnected' ||
    progress_type === 'email_failed' ||
    task.status === 'failed' ||
    progress_type === 'call_completed'
  ) {
    return 'ACTION_NEEDED' as indicatorType;
  }
  if (task.status === 'completed') {
    return 'COMPLETED' as indicatorType;
  }
  if (task.status === 'closed') {
    return 'CLOSED' as indicatorType;
  }
  return 'UNKNOWN_STATUS' as indicatorType;
}
