import * as React from 'react';
import { Session } from '../components/template/Sessions';
import { companyLogoDummy } from '../utils/assets/common';
import { ButtonSolid } from '../components/template/Button';
import { EmailContainer } from '../components/template/Container';
import {
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../utils/email/common/functions';
import type { ReactTempPayload } from '../types/app.types';

type EmailType = ReactTempPayload<'confirmInterview_email_applicant'>;

// export dummy
export const dummy: EmailType = {
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
      sessionTypeIcon: sessionTypeIcon('individual'),
      meetingIcon: scheduleTypeIcon('google_meet'),
    },
  ],
  subject: '',
  candidateLink: `${process.env.NEXT_PUBLIC_CLIENT_APP_URL}/request-availability/f17b307d-c8ed-4355-b597-3fc642fa5989`,
};

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

export const InterviewBookingConfirmation = ({
  emailBody = dummy.emailBody,
  meetingDetails = dummy.meetingDetails,
  companyLogo = dummy.companyLogo,
  candidateLink = '',
}: EmailType) => {
  return (
    <EmailContainer companyLogo={companyLogo} emailBody={emailBody}>
      {meetingDetails.map((meetingDetail, i) => (
        <Session key={i} meetingDetail={meetingDetail} />
      ))}
      <ButtonSolid buttonText="View Details" href={candidateLink} />
    </EmailContainer>
  );
};

export default InterviewBookingConfirmation;
