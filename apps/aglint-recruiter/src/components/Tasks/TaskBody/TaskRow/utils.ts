export type indicatorType =
  | 'REQUEST_AVAILABILITY'
  | 'REQUEST_SUBMITTED'
  | 'AWAITING_RESPONSE'
  | 'NO_RESPONSE'
  | 'MAIL_SENT'
  | 'SCHEDULE'
  | 'SCHEDULE_WAITING_24H_48H'
  | 'SEND_LINK'
  | 'BOOKED'
  | 'SCHEDULED'
  | 'RESCHEDULE'
  | 'SWITCH_INTERVIEWER'
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
    case 'SCHEDULE_WAITING_24H_48H':
      return 'Schedule waiting (24h/48h)';
    case 'SEND_LINK':
      return 'Send Link';
    case 'BOOKED':
      return 'Booked';
    case 'SCHEDULED':
      return 'Scheduled';
    case 'RESCHEDULE':
      return 'Reschedule';
    case 'SWITCH_INTERVIEWER':
      return 'Switch Interviewer';
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
