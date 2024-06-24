/* eslint-disable security/detect-object-injection */
import { DatabaseTable } from '@aglint/shared-types';

import { Job } from '@/src/queries/jobs/types';

const Priority = {
  low: '#467B7C',

  medium: '#467B7C',

  high: '#F79A3E',

  highest: '#D93F4C',
};
// export const mapPriority = (level: string) => {
//   return Priority[String(level.toLocaleLowerCase())]?.text;
// };
export const mapPriorityColor = (level: string) => {
  return Priority[String(level.toLocaleLowerCase())];
};

const Status = {
  open: '#3498DB',
  pending: '#F1C40F',
  'on hold': '#95A5A6',
  resolved: '#228F67',
  escalated: '#9B59B6',
  canceled: '#34495E',
  reopened: '#E74C3C',
};
export const mapStatusColor = (status: string) => {
  return Status[String(status.toLocaleLowerCase())];
};
// export const mapPriorityColor = (level: string) => {
//   return Priority[String(level.toLocaleLowerCase())];
// };

// const Status = {
//   open: '#3498DB',
//   pending: '#F1C40F',
//   'on hold': '#95A5A6',
//   resolved: '#228F67',
//   escalated: '#9B59B6',
//   canceled: '#34495E',
//   reopened: '#E74C3C',
// };
// export const mapStatusColor = (status: string) => {
//   return Status[String(status.toLocaleLowerCase())];
// };

export const allPriority = ['low', 'medium', 'high', 'highest'];
export const allStatus = [
  // 'open',
  'pending',
  'in progress',
  'on hold',
  'resolved',
  'escalated',
  'canceled',
  'reopened',
];

export function fillEmailTemplate(
  template: string,
  email: {
    first_name: string;
    last_name: string;
    job_title: string;
    company_name: string;
    interview_link?: string;
    support_link?: string;
    phone_screening_link?: string;
    recruter_name?: string;
    candidate_name?: string;
    position_name?: string;
    schedule_name?: string;
    team_member_name?: string;
    view_details?: string;
    pick_your_slot_link?: string;
    session_name?: string;
    meeting_link?: string;
    date_range?: string;
    reschedule_reason?: string;
    additional_reschedule_notes?: string;
    cancle_reason?: string;
    availability_link?: string;
  },
) {
  let filledTemplate = template;
  const placeholders = {
    '[firstName]': email.first_name,
    '[lastName]': email.last_name,
    '[jobTitle]': email.job_title,
    '[companyName]': email.company_name,
    '[interviewLink]': email.interview_link,
    '[supportLink]': email.support_link,
    '[phoneScreeningLink]': email.phone_screening_link,
    '[recruiterName]': email.recruter_name,
    '[viewDetailsLink]': email.view_details,
    '[scheduleName]': email.schedule_name,
    '[teamMemberName]': email.team_member_name,
    '[pickYourSlotLink]': email.pick_your_slot_link,
    '[sessionName]': email.session_name,
    '[meetingLink]': email.meeting_link,
    '[dateRange]': email.date_range,
    '[rescheduleReason]': email.reschedule_reason,
    '[additionalRescheduleNotes]': email.additional_reschedule_notes,
    '[cancleReason]': email.cancle_reason,
    '[availabilityLink]': email.availability_link,
  };

  for (const [placeholder, value] of Object.entries(placeholders)) {
    // eslint-disable-next-line security/detect-non-literal-regexp
    const regex = new RegExp(placeholder.replace(/\[|\]/g, '\\$&'), 'g');
    filledTemplate = filledTemplate.replaceAll(regex, value);
  }

  return filledTemplate;
}

const allCandidateStatusColor = {
  'invitation not sent': {
    color: 'var(--error-11)',
    backgroundColor: 'var(--error-3)',
  },
  'invitation sent': {
    color: 'var(--warning-11)',
    backgroundColor: 'var(--warning-2',
  },
  'invitation accepted': {
    color: 'var(--success-11)',
    backgroundColor: 'var(--success-3)',
  },
  'invitation rejected': {
    color: 'var(--error-11)',
    backgroundColor: 'var(--error-3)',
  },
  'invitation expired': {
    color: 'var(--error-11)',
    backgroundColor: 'var(--error-3)',
  },
  'invitation completed': {
    color: 'var(--accent-11)',
    backgroundColor: 'var(--accent-2)',
  },
  'invitation incomplete': {
    color: 'var(--neutral-11)',
    backgroundColor: 'var(--neutral-3)',
  },
};
export const getCandidateStatusColor = (key: string) => {
  return (
    allCandidateStatusColor[String(key).toLocaleLowerCase()] || {
      color: 'var(--neutral-11)',
      backgroundColor: 'var(--neutral-3)',
    }
  );
};
export const priorityOrder = {
  low: 0,
  medium: 1,
  high: 2,
  highest: 3,
};
export const statusOrder = {
  created: -1,
  open: 0,
  pending: 1,
  'in progress': 2,
  'on hold': 3,
  resolved: 4,
  escalated: 5,
  canceled: 6,
  reopened: 7,
};

export type QualificationRelevance =
  | 'less match'
  | 'average match'
  | 'more match';

export const getOverallResumeScore = (
  scores: DatabaseTable['applications']['score_json']['scores'],
  parameter_weights: Job['parameter_weights'],
) => {
  return Math.trunc(
    Object.keys(parameter_weights).reduce((acc, curr) => {
      acc += (scores[curr] * parameter_weights[curr]) / 100;
      return acc;
    }, 0),
  );
};
