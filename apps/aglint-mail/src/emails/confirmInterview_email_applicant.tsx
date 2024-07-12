import * as React from 'react';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { Session } from '../components/template/Sessions';
import { companyLogoDummy } from '../utils/assets/common';
import { ButtonSolid } from '../components/template/Button';
import { EmailContainer } from '../components/template/Container';

type EmailType = EmailTemplateAPi<'confirmInterview_email_applicant'>;

// export dummy
export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Hi {{ candidateFirstName }},</p><p></p><p>We are pleased to confirm your interview for the {{ jobTitle }} position. Please find the details of your interview below.</p><p></p><p>Regards,</p><p>{{ companyName }}  Recruitment Team</p>',
  companyLogo: companyLogoDummy,
  meetingDetails: [
    {
      date: 'Fri, May 12, 2024',
      time: '09:00 AM - 09:30 PM PST',
      sessionType: 'Personality and cultural fit',
      platform: 'Google meet',
      duration: '45 minutes',
      sessionTypeIcon:
        'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/individual.png',
      meetingIcon:
        'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/google_meet.png',
    },
  ],
  subject: '',
  candidateLink: `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/request-availability/f17b307d-c8ed-4355-b597-3fc642fa5989`,
};

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

export const InterviewBookingConfirmation = ({
  emailBody = dummy.emailBody,
  meetingDetails = dummy.meetingDetails,
  companyLogo = dummy.companyLogo,
  candidateLink = '',
}: EmailType['react_email_placeholders']) => {
  return (
    <EmailContainer companyLogo={companyLogo} emailBody={emailBody}>
      {meetingDetails.map((meetingDetail, i) => (
        <Session key={i} meetingDetail={meetingDetail} />
      ))}
      <ButtonSolid href={candidateLink} buttonText="View Details" />
    </EmailContainer>
  );
};

export default InterviewBookingConfirmation;
