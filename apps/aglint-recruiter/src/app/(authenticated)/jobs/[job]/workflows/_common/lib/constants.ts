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
  | 'meetingDeclined'
  | 'meetingAccepted'
  | 'candidateBook'
  | 'onReceivingAvailReq'
  | 'onRequestSchedule'
  | 'onRequestCancel'
  | 'onRequestReschedule'
  | 'onRequestInterviewerDecline'
>;

export const triggerToCategoryMap: Record<
  JobRelatedCTriggers,
  TriggerCategory
> = {
  interviewEnd: TriggerCategory.CandidateExperience,
  onRequestCancel: TriggerCategory.CandidateExperience,
  onRequestReschedule: TriggerCategory.CandidateExperience,
  candidateBook: TriggerCategory.InterviewerManagement,
  meetingAccepted: TriggerCategory.InterviewerManagement,
  meetingDeclined: TriggerCategory.InterviewerManagement,
  interviewStart: TriggerCategory.InterviewProcess,
  interviewerConfirmation: TriggerCategory.SchedulingManagement,
  onReceivingAvailReq: TriggerCategory.SchedulingManagement,
  onRequestInterviewerDecline: TriggerCategory.SchedulingManagement,
  onRequestSchedule: TriggerCategory.SchedulingManagement,
  selfScheduleReminder: TriggerCategory.SchedulingManagement,
  sendAvailReqReminder: TriggerCategory.SchedulingManagement,
};

export const triggerToQuestion: Record<JobRelatedCTriggers, string> = {
  candidateBook: 'What happens when a candidate books a meeting ?',
  onRequestCancel: 'How do we respond if a candidate cancels ?',
  onRequestReschedule: 'What our process for rescheduling requests ?',
  selfScheduleReminder: 'how do we remind candidate for self schedule ?',
  interviewStart: 'remind interviewer before interview start ?',
  sendAvailReqReminder: 'how do we remind candidate for availability ?',
  interviewerConfirmation:
    'How do we confirm when an interviewer accepts an invitation ?',
  interviewEnd: '',
  meetingDeclined: 'How do we handle declined interview invitations ?',
  meetingAccepted: 'What happens when an interviewer confirms ?',
  onReceivingAvailReq: 'What happens after reciving candidate availability ?',
  onRequestSchedule: 'What our process after reciveing schedule request ?',
  onRequestInterviewerDecline:
    'What happens when interviewer decline request ?',
};
