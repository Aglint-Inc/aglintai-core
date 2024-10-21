/* eslint-disable no-unused-vars */
import { type DatabaseEnums } from '@aglint/shared-types';

export enum TriggerCategory {
  CandidateExperience = 'Candidate Experience',
  InterviewerManagement = 'Interviewer Management',
  SchedulingManagement = 'Scheduling Management',
  InterviewProcess = 'Interview Process',
}
type JobRelatedCTriggers = Extract<
  DatabaseEnums['workflow_trigger'],
  | 'selfScheduleReminder'
  | 'interviewStart'
  | 'sendAvailReqReminder'
  | 'interviewerConfirmation'
  | 'interviewEnd'
  | 'meetingAccepted'
  | 'candidateBook'
  | 'onReceivingAvailReq'
  | 'onRequestSchedule'
  | 'onRequestCancel'
  | 'onRequestReschedule'
  | 'onRequestInterviewerDecline'
  | 'interviewEnd'
>;

export const triggerToCategoryMap: Record<
  JobRelatedCTriggers,
  TriggerCategory
> = {
  selfScheduleReminder: TriggerCategory.CandidateExperience,
  sendAvailReqReminder: TriggerCategory.CandidateExperience,
  onRequestCancel: TriggerCategory.InterviewerManagement,
  onRequestReschedule: TriggerCategory.CandidateExperience,
  candidateBook: TriggerCategory.CandidateExperience,
  meetingAccepted: TriggerCategory.InterviewerManagement,
  interviewStart: TriggerCategory.InterviewProcess,
  interviewEnd: TriggerCategory.InterviewProcess,
  interviewerConfirmation: TriggerCategory.SchedulingManagement,
  onReceivingAvailReq: TriggerCategory.SchedulingManagement,
  onRequestInterviewerDecline: TriggerCategory.InterviewerManagement,
  onRequestSchedule: TriggerCategory.SchedulingManagement,
};

export const triggerToQuestion: Record<JobRelatedCTriggers, string> = {
  candidateBook: 'What happens when a candidate books a meeting?',
  onRequestCancel: 'How do we respond if a candidate cancels?',
  onRequestReschedule: 'What is our process for rescheduling requests?',
  selfScheduleReminder: 'How do we remind candidates to self-schedule?',
  interviewStart: 'Remind the interviewer before the interview starts?',
  sendAvailReqReminder: 'How do we remind candidates for availability?',
  interviewerConfirmation: 'How do we confirm when an interviewer accepts an invitation?',
  interviewEnd: 'What happens after an interview ends?',
  meetingAccepted: 'What happens when an interviewer confirms?',
  onReceivingAvailReq: 'What happens after receiving candidate availability?',
  onRequestSchedule: 'What is our process after receiving a schedule request?',
  onRequestInterviewerDecline: 'What happens when an interviewer declines a request?',

};

export const agentInstructionEmailTargetApi: Partial<
  Record<DatabaseEnums['email_slack_types'], DatabaseEnums['email_slack_types']>
> = {
  onRequestSchedule_emailLink_sendSelfSchedulingLink:
    'sendSelfScheduleRequest_email_applicant',
  onRequestSchedule_emailLink_getCandidateAvailability:
    'sendAvailabilityRequest_email_applicant',
};
