import { DatabaseEnums, DatabaseView } from '@aglint/shared-types';

import dayjs from '@/src/utils/dayjs';

export type indicatorType =
  | 'REQUEST_AVAILABILITY'
  | 'REQUEST_SUBMITTED'
  | 'AWAITING_RESPONSE'
  | 'NO_RESPONSE'
  | 'MAIL_SENT'
  | 'SCHEDULE'
  | 'SEND_LINK'
  | 'BOOKED'
  | 'SCHEDULED'
  | 'RESCHEDULE'
  | 'ACTION_NEEDED_AGENT_FAIL'
  | 'UNKNOWN_STATUS';

export function getIndicatorMessage(indicator: indicatorType): string {
  switch (indicator) {
    case 'REQUEST_AVAILABILITY':
      return 'Request Availability';
    case 'REQUEST_SUBMITTED':
      return 'Request Submitted';
    case 'AWAITING_RESPONSE':
      return 'Awaiting Response';
    case 'NO_RESPONSE':
      return `No Response`;
    case 'SCHEDULE':
      return 'Schedule';
    case 'SEND_LINK':
      return 'Send Link';
    case 'BOOKED':
      return 'Booked';
    case 'SCHEDULED':
      return 'Scheduled';
    case 'RESCHEDULE':
      return 'Reschedule';
    case 'ACTION_NEEDED_AGENT_FAIL':
      return 'Action Needed (Agent Fail)';
    case 'UNKNOWN_STATUS':
      return 'Unknown Status';
    case 'MAIL_SENT':
      return 'Mail Sent';
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
  if (
    dueDateTime.isBefore(toDayDateTime.add(-2, 'day')) &&
    progress_type === 'email_messages'
  ) {
    return 'NO_RESPONSE' as indicatorType;
  }

  if (task.trigger_count === 2 && progress_type === 'call_disconnected') {
    return 'NO_RESPONSE' as indicatorType;
  }

  if (progress_type === 'send_email') {
    return 'MAIL_SENT' as indicatorType;
  }

  // progress_type
  if (progress_type === 'request_availability') {
    return 'REQUEST_AVAILABILITY' as indicatorType;
  }

  if (progress_type === 'self_schedule' || progress_type === 'schedule') {
    return 'SCHEDULE' as indicatorType;
  }

  if (progress_type === 'request_availability_list') {
    return 'REQUEST_SUBMITTED' as indicatorType;
  }

  if (
    progress_type === 'interview_schedule' ||
    progress_type === 'call_completed'
  ) {
    return 'BOOKED' as indicatorType;
  }

  if (
    progress_type === 'call_failed' ||
    progress_type === 'call_disconnected' ||
    progress_type === 'email_failed' ||
    task.status === 'failed'
  ) {
    return 'ACTION_NEEDED_AGENT_FAIL' as indicatorType;
  }
  return 'UNKNOWN_STATUS' as indicatorType;
}
