import * as React from 'react';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { Session } from '../components/template/Sessions';
import { companyLogoDummy } from '../utils/assets/common';
import { ButtonSolid } from '../components/template/Button';
import { EmailContainer } from '../components/template/Container';
import {
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../utils/email/common/functions';

type EmailType = EmailTemplateAPi<'meetingAccepted_email_organizer'>;

export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="organizerFirstName">{{organizerFirstName}}</span>,</p><p></p><p>We are pleased to inform you that the <span class="temp-variable" data-type="temp-variable" data-id="interviewerName">{{interviewerName}}</span> has accepted the interview request for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>View Schedule details <span class="temp-variable" data-type="temp-variable" data-id="meetingDetailsLink">{{meetingDetailsLink}}</span> </p><p></p><p>Best regards,</p><p>Aglint AI</p>',
  companyLogo: companyLogoDummy,
  meetingDetail: {
    date: 'Fri, May 12, 2024',
    time: '09:00 AM - 09:30 PM PST',
    sessionType: 'Personality and cultural fit',
    platform: 'Google meet',
    duration: '45 minutes',
    sessionTypeIcon: sessionTypeIcon('debrief'),
    meetingIcon: scheduleTypeIcon('google_meet'),
  },
  subject:
    '<p><span class="temp-variable" data-type="temp-variable" data-id="interviewerName">{{interviewerName}}</span> Accepted Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span></p>',
  meetingDetailsLink:
    'process.env.NEXT_PUBLIC_APP_URL/scheduling/view?meeting_id=interview_meeting_id&tab=candidate_details',
  candidateScheduleLink: '',
};

export const getSubject = (companyName: any) => `${companyName}`;

export const meetingDeclinedEmailOrganizer = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
  meetingDetail = dummy.meetingDetail,
  meetingDetailsLink = '',
}: EmailType['react_email_placeholders']) => {
  return (
    <EmailContainer companyLogo={companyLogo} emailBody={emailBody}>
      <Session meetingDetail={meetingDetail} />
      <ButtonSolid href={meetingDetailsLink} buttonText="Meeting Details" />
    </EmailContainer>
  );
};
export default meetingDeclinedEmailOrganizer;
