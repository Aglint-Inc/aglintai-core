import * as React from 'react';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { companyLogoDummy } from '../utils/assets/common';
import { ButtonSolid } from '../components/template/Button';
import { EmailContainer } from '../components/template/Container';

type EmailType = EmailTemplateAPi<'availabilityReqResend_email_candidate'>;

export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Dear {{candidateFirstName}},</p><p>I hope this message finds you well.</p><p>I am writing to follow up regarding the availability check for your upcoming interview. It appears that the initial link we sent to confirm your availability might not have been received or may have encountered an issue.</p><p>To ensure we can schedule your interview at a convenient time, please find the link below to select your preferred time slots:</p><p>{{ availabilityReqLink }}</p><p>We apologize for any inconvenience this may have caused and appreciate your understanding. If you encounter any issues with the link or have any questions, please do not hesitate to reach out.</p><p>Thank you for your cooperation. We look forward to speaking with you soon.</p><p>Best regards,</p><p>{{ companyName }} Recruitment Team</p><p></p><p></p>',
  companyLogo: companyLogoDummy,
  subject: '',
  availabilityReqLink: `{process.env.NEXT_PUBLIC_APP_URL}/scheduling/request-availability/{req_body.avail_req_id}`,
};

export const getSubject = (companyName: any) => `${companyName}`;

export const Rejection = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
  availabilityReqLink = dummy.availabilityReqLink,
}: EmailType['react_email_placeholders']) => {
  return (
    <EmailContainer companyLogo={companyLogo} emailBody={emailBody}>
      <ButtonSolid buttonText="View Details" href={availabilityReqLink} />
    </EmailContainer>
  );
};
export default Rejection;
