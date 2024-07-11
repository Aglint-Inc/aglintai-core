import * as React from 'react';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { companyLogoDummy } from '../utils/assets/common';
import { EmailContainer } from '../components/template/Container';

type EmailType = EmailTemplateAPi<'phoneScreenRemind_email_applicant'>;
export interface PhoneScreeningResendType {
  body?: string;
  companyLogo?: string;
}

// export dummy
export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Dear {{ candidateFirstName }},</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the {{ jobTitle }} position at {{ companyName }}. We would not want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>{{ phoneScreeningLink }}</p><p>We look forward to hearing from you soon!</p><p>Warm regards,</p><p>{{ companyName }}</p>',
  companyLogo: companyLogoDummy,
  subject: '',
};

export const getSubject = (companyName: any) => `${companyName}`;

const PhoneScreeningResend = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
}: EmailType['react_email_placeholders']) => {
  return <EmailContainer companyLogo={companyLogo} emailBody={emailBody} />;
};
export default PhoneScreeningResend;
