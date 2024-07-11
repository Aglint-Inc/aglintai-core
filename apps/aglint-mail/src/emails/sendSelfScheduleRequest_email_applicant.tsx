import * as React from 'react';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { companyLogoDummy } from '../utils/assets/common';
import { ButtonSolid } from '../components/template/Button';
import { EmailContainer } from '../components/template/Container';

type EmailType = EmailTemplateAPi<'sendSelfScheduleRequest_email_applicant'>;
export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Dear {{ candidateFirstName }},</p><p></p><p style="text-align: start">Thank you for submitting your application for the {{ jobTitle }} at {{ companyName }}. We are pleased to announce that you have been selected for an assessment.</p><p style="text-align: start"></p><p style="text-align: start">You are welcome to choose an assessment time that suits your schedule.</p><p style="text-align: start">{{ selfScheduleLink}}</p><p style="text-align: start"></p><p style="text-align: start">We wish you the best of luck and are eager to hear your insights!</p><p style="text-align: start"></p><p style="text-align: start">Best regards,</p><p>{{ companyName }} Recruitment Team</p>',
  companyLogo: companyLogoDummy,
  subject: '',
  selfScheduleLink:
    'process.env.NEXT_PUBLIC_APP_URL/scheduling/invite/filterJson.id?filter_id=req_body.filter_json_id&task_id=task_id',
};

export const getSubject = (companyName: any) => `${companyName}`;

export const InterviewResent = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
  selfScheduleLink = dummy.selfScheduleLink,
}: EmailType['react_email_placeholders']) => {
  return (
    <EmailContainer companyLogo={companyLogo} emailBody={emailBody}>
      <ButtonSolid href={selfScheduleLink} buttonText="Schedule Now" />
    </EmailContainer>
  );
};
export default InterviewResent;
