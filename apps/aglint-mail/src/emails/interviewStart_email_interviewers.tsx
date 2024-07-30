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

// export dummy
export const dummy: ReactTempPayload<'interviewStart_email_interviewers'> = {
  emailBody: `  <p>Dear {{ recruiterName }},</p><p></p><p>This is a friendly reminder about the interview with {{ candidateName }}. Please find the details below:</p><ul><li><p><strong>Candidate Name:</strong> {{ candidateName }}</p></li><li><p><strong>Position:</strong> {{ jobTitle }}</p></li><li><p><strong>Date:</strong> {{ date }}</p></li><li><p><strong>Time:</strong> {{ time }}</p></li></ul><p></p><p>Thank you,</p><p>The {{ companyName }} Recruitment Team</p>`,
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
  candidateLink: '',
  subject: '',
};

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

export const ConfirmMailToOrganizerRemainder = ({
  emailBody = dummy.emailBody,
  meetingDetails = dummy.meetingDetails,
  candidateLink = '',
  companyLogo = dummy.companyLogo,
}: ReactTempPayload<'interviewStart_email_interviewers'>) => {
  return (
    <EmailContainer companyLogo={companyLogo} emailBody={emailBody}>
      {meetingDetails.map((meetingDetail, i) => (
        <Session key={i} meetingDetail={meetingDetail} />
      ))}
      <ButtonSolid buttonText="Candidate Details" href={candidateLink} />
    </EmailContainer>
  );
};

export default ConfirmMailToOrganizerRemainder;
