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

type EmailType = EmailTemplateAPi<'rescheduleSelfSchedule_email_applicant'>;

// export dummy
export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Hi {{ candidateFirstName }},</p><p>I hope this message finds you well.</p><p>Due to unforeseen circumstances, we need to reschedule your interview for the {{ jobRole }} position at {{ companyName }}. We apologize for any inconvenience this may cause and appreciate your understanding.</p><p>To find a new time that works best for you, please use the following link to schedule your interview: {{ selfScheduleLink }}</p><p>If you have any questions or need further assistance, feel free to reach out to us.</p><p>Looking forward to connecting with you!</p><p>Best regards,</p><p>{{ companyName }} Recruitment Team</p><p></p>',
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
  resheduleLink: 'http://www.google.in/',
};

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

export const CandidateRescheduleRequest = ({
  emailBody = dummy.emailBody,
  meetingDetails = dummy.meetingDetails,
  companyLogo = dummy.companyLogo,
  resheduleLink = '',
}: EmailType['react_email_placeholders']) => {
  return (
    <EmailContainer companyLogo={companyLogo} emailBody={emailBody}>
      {meetingDetails.map((meetingDetail, i) => (
        <Session key={i} meetingDetail={meetingDetail} />
      ))}
      <ButtonSolid href={resheduleLink} buttonText="Rescheudle" />
    </EmailContainer>
  );
};

export default CandidateRescheduleRequest;
