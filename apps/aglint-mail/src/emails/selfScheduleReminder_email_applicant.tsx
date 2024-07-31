import * as React from 'react';
import { companyLogoDummy } from '../utils/assets/common';
import { ButtonSolid } from '../components/template/Button';
import { EmailContainer } from '../components/template/Container';
import type { ReactTempPayload } from '../types/app.types';

type EmailType = ReactTempPayload<'selfScheduleReminder_email_applicant'>;

// export dummy
export const dummy: EmailType = {
  emailBody:
    '<p>Dear {{ candidateFirstName }},</p><p></p><p>This is a friendly reminder about the self-schedule interview request you received for the {{ jobTitle }} position at {{ companyName }}.</p><p></p><p>Please use the following link to schedule your interview: {{ selfScheduleLink }}</p><p>Looking forward to connecting with you!</p><p></p><p>Best regards,</p><p>{{ companyName }} Recruitment Team</p>',
  companyLogo: companyLogoDummy,
  subject: '',
  selfScheduleLink:
    'process.env.NEXT_PUBLIC_APP_URL/scheduling/invite/filterJson.interview_schedule.id?filter_id=filter_id&task_id=task_id',
};

export const getSubject = (companyName: any) => `${companyName}`;

export const InitEmailAgentRemainder = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
  selfScheduleLink = '',
}: EmailType) => {
  return (
    <EmailContainer companyLogo={companyLogo} emailBody={emailBody}>
      <ButtonSolid buttonText="Schedule Now" href={selfScheduleLink} />
    </EmailContainer>
  );
};
export default InitEmailAgentRemainder;
