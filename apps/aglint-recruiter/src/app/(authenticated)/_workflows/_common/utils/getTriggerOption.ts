import { DatabaseView } from '@aglint/shared-types';

export function getTriggerOption(
  trigger: DatabaseView['workflow_view']['trigger'],
  phase: DatabaseView['workflow_view']['phase'],
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
