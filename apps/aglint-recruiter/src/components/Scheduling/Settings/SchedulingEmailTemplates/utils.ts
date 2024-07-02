/* eslint-disable no-unused-vars */
import { DatabaseEnums, DatabaseTableInsert } from '@aglint/shared-types';

import { supabase } from '@/src/utils/supabase/client';

export async function upateEmailTemplate({
  id,
  data,
}: {
  id: string;
  data: DatabaseTableInsert['company_email_template'];
}) {
  const { data: emailDetails, error } = await supabase
    .from('company_email_template')
    .update({ ...data })
    .eq('id', id)
    .select()
    .single();

  if (!error) {
    return emailDetails;
  } else {
    return error;
  }
}

export enum TEMPLATE_TABS {
  Email = 'email',
  Slack = 'slack',
  Agent = 'agent',
  Calender = 'calender',
}
export const template_tabs = [
  {
    label: 'Email',
    key: TEMPLATE_TABS.Email,
  },
  {
    label: 'Slack',
    key: TEMPLATE_TABS.Slack,
  },
  {
    label: 'Agent',
    key: TEMPLATE_TABS.Agent,
  },
  {
    label: 'Calender',
    key: TEMPLATE_TABS.Calender,
  },
] as const;

export const filterEmailByTemplateTab = (
  tab: TEMPLATE_TABS,
  email_type: DatabaseEnums['email_slack_types'],
): boolean => {
  if (tab === TEMPLATE_TABS.Agent && email_type === 'agent_email_candidate') {
    return true;
  } else if (
    tab === TEMPLATE_TABS.Email &&
    email_type !== 'agent_email_candidate'
  ) {
    return emailTempKeys.includes(email_type);
  } else if (tab === TEMPLATE_TABS.Slack) {
    return email_type.split('_')[1] === 'slack';
  } else if (tab === TEMPLATE_TABS.Calender) {
    return email_type.split('_')[1] === 'calender';
  }
  return false;
};

export const emailTempKeys: DatabaseEnums['email_slack_types'][] = [
  'agent_email_candidate',
  'confInterview_email_organizer',
  'confirmInterview_email_applicant',
  'debrief_email_interviewer',
  'interReschedReq_email_recruiter',
  'interviewCancel_email_applicant',
  'InterviewCancelReq_email_recruiter',
  'interviewReschedule_email_applicant',
  'interviewStart_email_applicant',
  'interviewStart_email_interviewers',
  'selfScheduleReminder_email_applicant',
  'sendAvailabilityRequest_email_applicant',
  'sendAvailReqReminder_email_applicant',
  'sendSelfScheduleRequest_email_applicant',
  'availabilityReqResend_email_candidate',
  'interviewDetails_calender_interviewer',
  'rescheduleSelfSchedule_email_applicant',
  'interviewStart_email_organizer',
  'meetingDeclined_email_organizer',
  'meetingAccepted_email_organizer',
];

export const slackTempKeys: DatabaseEnums['email_slack_types'][] = [
  'interviewEnd_slack_interviewers',
  'interviewEnd_slack_interviewers',
  'interviewerConfirmation_slack_interviewers',
];

export const calenderTempKeys: DatabaseEnums['email_slack_types'][] = [
  'interviewDetails_calender_interviewer',
];

export const allTempKeys: DatabaseEnums['email_slack_types'][] = [
  ...emailTempKeys,
  ...slackTempKeys,
  ...calenderTempKeys,
];
