import * as React from 'react';
import { Session } from '../components/template/Sessions';
import { companyLogoDummy } from '../utils/assets/common';
import { EmailContainer } from '../components/template/Container';
import {
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../utils/email/common/functions';
import type { ReactTempPayload } from '../types/app.types';

type EmailType = ReactTempPayload<'interviewCancel_email_applicant'>;
export const dummy: EmailType = {
  emailBody:
    '<p>Dear {{ candidateFirstName }},</p><p>I regret to inform you that we need to cancel your scheduled interview session at {{ companyName }}.</p><p>We apologize for any inconvenience caused and will be in touch soon to reschedule.</p><p>Best regards,<br>{{ companyName }}</p>',
  companyLogo: companyLogoDummy,
  meetingDetails: [
    {
      date: 'Fri, May 12, 2024',
      time: '09:00 AM - 09:30 PM PST',
      sessionType: 'Personality and cultural fit',
      platform: 'Google meet',
      duration: '45 minutes',
      sessionTypeIcon: sessionTypeIcon('debrief'),
      meetingIcon: scheduleTypeIcon('google_meet'),
    },
  ],
  subject: '',
};

export const getSubject = (companyName: any) => `${companyName}`;

export const InterviewBookingConfirmation = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
  meetingDetails = dummy.meetingDetails,
}: EmailType) => {
  return (
    <EmailContainer companyLogo={companyLogo} emailBody={emailBody}>
      {meetingDetails.map((meetingDetail, i) => (
        <Session key={i} meetingDetail={meetingDetail} />
      ))}
    </EmailContainer>
  );
};
export default InterviewBookingConfirmation;
