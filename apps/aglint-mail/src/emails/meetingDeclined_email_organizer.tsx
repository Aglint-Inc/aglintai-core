import * as React from 'react';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { Session } from '../components/template/Sessions';
import { companyLogoDummy } from '../utils/assets/common';
import { ButtonSolid } from '../components/template/Button';
import { EmailContainer } from '../components/template/Container';

type EmailType = EmailTemplateAPi<'meetingDeclined_email_organizer'>;

export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="organizerFirstName">{{organizerFirstName}}</span> ,</p><p></p><p>We regret to inform you that the &lt;InterviewerName&gt; has declined the interview request for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p></p><p>Please arrange for an alternative interviewer or reschedule as needed.</p><p>Change Interviewer <span class="temp-variable" data-type="temp-variable" data-id="meetingDetailsLink">{{meetingDetailsLink}}</span></p><p>Rescedule <span class="temp-variable" data-type="temp-variable" data-id="meetingDetailsLink">{{meetingDetailsLink}}</span> </p><p></p><p>Best regards,</p><p>Aglint Ai</p><p></p>',
  companyLogo: companyLogoDummy,
  meetingDetail: {
    date: 'Fri, May 12, 2024',
    time: '09:00 AM - 09:30 PM PST',
    sessionType: 'Personality and cultural fit',
    platform: 'Google meet',
    duration: '45 minutes',
    sessionTypeIcon:
      'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/debrief.png',
    meetingIcon:
      'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/google_meet.png',
  },
  subject:
    '<p>{{interviewerFullName}} Declined Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> </p>',
  meetingDetailsLink: '',
  candidateScheduleLink: '',
};

export const getSubject = (companyName: any) => `${companyName}`;

export const meetingDeclinedEmailOrganizer = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
  meetingDetail = dummy.meetingDetail,
  meetingDetailsLink = dummy.meetingDetailsLink,
}: EmailType['react_email_placeholders']) => {
  return (
    <EmailContainer companyLogo={companyLogo} emailBody={emailBody}>
      <Session meetingDetail={meetingDetail} />
      <ButtonSolid href={meetingDetailsLink} buttonText="View Details" />
    </EmailContainer>
  );
};
export default meetingDeclinedEmailOrganizer;
