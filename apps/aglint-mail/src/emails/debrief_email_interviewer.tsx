import * as React from 'react';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { Session } from '../components/template/Sessions';
import { companyLogoDummy } from '../utils/assets/common';
import { ButtonSolid } from '../components/template/Button';
import { EmailContainer } from '../components/template/Container';

type EmailType = EmailTemplateAPi<'debrief_email_interviewer'>;

// export dummy
export const dummy: EmailType['react_email_placeholders'] = {
  emailBody: `<p>Dear {{ interviewerFirstName }},</p><p></p><p>Please join the debrief session to discuss {{ candidateFirstName }}'s interview for {{ jobTitle }}. Your insights are valuable to the selection process.</p><p></p><p>Thanks,</p><p>{{ companyName }} Recruitment Team</p>`,

  companyLogo: companyLogoDummy,
  meetingDetails: {
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
  subject: '',
  candidateLink: `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/application/af9538ac-50e8-4941-91c5-39a678c60077`,
};

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

export const DebriefCalendarInvite = ({
  emailBody = dummy.emailBody,
  meetingDetails = dummy.meetingDetails,
  companyLogo = dummy.companyLogo,
  candidateLink = '',
}: EmailType['react_email_placeholders']) => {
  return (
    <EmailContainer companyLogo={companyLogo} emailBody={emailBody}>
      <Session meetingDetail={meetingDetails} />
      <ButtonSolid href={candidateLink} buttonText=" Candidate details" />
    </EmailContainer>
  );
};

export default DebriefCalendarInvite;
