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

type EmailType = ReactTempPayload<'debrief_email_interviewer'>;

// export dummy
export const dummy: EmailType = {
  emailBody: `<p>Dear {{ interviewerFirstName }},</p><p></p><p>Please join the debrief session to discuss {{ candidateFirstName }}'s interview for {{ jobTitle }}. Your insights are valuable to the selection process.</p><p></p><p>Thanks,</p><p>{{ companyName }} Recruitment Team</p>`,

  companyLogo: companyLogoDummy,
  meetingDetails: {
    date: 'Fri, May 12, 2024',
    time: '09:00 AM - 09:30 PM PST',
    sessionType: 'Personality and cultural fit',
    platform: 'Google meet',
    duration: '45 minutes',
    sessionTypeIcon: sessionTypeIcon('debrief'),
    meetingIcon: scheduleTypeIcon('google_meet'),
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
}: EmailType) => {
  return (
    <EmailContainer companyLogo={companyLogo} emailBody={emailBody}>
      <Session meetingDetail={meetingDetails} />
      <ButtonSolid buttonText=" Candidate details" href={candidateLink} />
    </EmailContainer>
  );
};

export default DebriefCalendarInvite;
