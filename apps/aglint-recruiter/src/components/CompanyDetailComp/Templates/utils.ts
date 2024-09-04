/* eslint-disable no-unused-vars */
import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { emailTemplateCopy } from '@/src/types/companyEmailTypes';
import { supabase } from '@/src/utils/supabase/client';

export enum TEMPLATE_TABS {
  Email = 'emailTemplate',
  Slack = 'slackTemplate',
  Agent = 'agentTemplate',
  Calender = 'calenderTemplate',
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
    label: 'Calendar',
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
  'rescheduleSelfSchedule_email_applicant',
  'interviewStart_email_organizer',
  'meetingDeclined_email_organizer',
  'meetingAccepted_email_organizer',
  'interviewEnd_email_interviewerForFeedback',
  'interviewerResumed_email_admin',
  'interviewEnd_email_rShadowTraineeForMeetingAttendence',
  'interviewEnd_email_shadowTraineeForMeetingAttendence',
  'onQualified_email_trainee',
  'onTrainingComplete_email_approverForTraineeMeetingQualification',
  'interviewEnd_email_organizerForMeetingStatus',
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

export const fetchEmailTemplates = async (recruiter_id) => {
  const templates = supabaseWrap(
    await supabase
      .from('company_email_template')
      .select()
      .eq('recruiter_id', recruiter_id),
  );
  return templates;
};

export const SortCurrentTabTemps = (
  templates: DatabaseTable['company_email_template'][],
) => {
  const curr_tab_temps = templates
    .filter((temp) => emailTemplateCopy[temp.type]?.heading)
    .sort((a, b) => {
      if (
        emailTemplateCopy[a.type].heading > emailTemplateCopy[b.type].heading
      ) {
        return 1;
      }
      if (
        emailTemplateCopy[b.type].heading > emailTemplateCopy[a.type].heading
      ) {
        return -1;
      }
      return 0;
    });

  return curr_tab_temps;
};

interface TempFilterOptions {
  emailTemplate: {
    candidate: DatabaseEnums['email_slack_types'][];
    interviewer: DatabaseEnums['email_slack_types'][];
    trainee: DatabaseEnums['email_slack_types'][];
    organizer: DatabaseEnums['email_slack_types'][];
    admin: DatabaseEnums['email_slack_types'][];
  };
  slackTemplate: {};
}
export const tempFilterOptions: TempFilterOptions = {
  emailTemplate: {
    candidate: [
      'agent_email_candidate',
      'confirmInterview_email_applicant',
      'interviewCancel_email_applicant',
      'interviewReschedule_email_applicant',
      'interviewStart_email_applicant',
      'selfScheduleReminder_email_applicant',
      'sendAvailabilityRequest_email_applicant',
      'sendAvailReqReminder_email_applicant',
      'sendSelfScheduleRequest_email_applicant',
      'availabilityReqResend_email_candidate',
      'rescheduleSelfSchedule_email_applicant',
    ],
    interviewer: [
      'debrief_email_interviewer',
      'interviewStart_email_interviewers',
      'interviewEnd_email_interviewerForFeedback',
      'onTrainingComplete_email_approverForTraineeMeetingQualification',
    ],
    trainee: [
      'interviewEnd_email_rShadowTraineeForMeetingAttendence',
      'interviewEnd_email_shadowTraineeForMeetingAttendence',
      'onQualified_email_trainee',
    ],
    organizer: [
      'interviewStart_email_organizer',
      'meetingDeclined_email_organizer',
      'meetingAccepted_email_organizer',
      'interviewEnd_email_organizerForMeetingStatus',
      'confInterview_email_organizer',
      'interReschedReq_email_recruiter',
      'InterviewCancelReq_email_recruiter',
    ],
    admin: ['interviewerResumed_email_admin'],
  },
  slackTemplate: {
    approver: [
      'onTrainingComplete_slack_approverForTraineeMeetingQualification',
    ],
    interviewer: [
      'interviewStart_slack_interviewers',
      'interviewEnd_slack_interviewerForFeedback',
    ],
    trainee: [
      'onQualified_slack_trainee',
      'interviewEnd_slack_rShadowTraineeForMeetingAttendence',
      'interviewEnd_slack_shadowTraineeForMeetingAttendence',
    ],
    organizer: ['interviewEnd_slack_organizerForMeetingStatus'],
  },
};
