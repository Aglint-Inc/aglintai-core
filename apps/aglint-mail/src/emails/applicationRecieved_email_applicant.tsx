import * as React from 'react';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { companyLogoDummy } from '../utils/assets/common';
import { EmailContainer } from '../components/template/Container';

type EmailType = EmailTemplateAPi<'applicationRecieved_email_applicant'>;

// export dummy
export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Hi {{ candidateFirstName }},</p><p>You have successfully submitted your application for this position:</p><p>{{ jobTitle }}</p><p>We will review your application shortly. If your profile matches our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in {{ companyName }}.</p><p>If you have any queries about this job, please visit the following link: {{ supportLink }}</p><p>Sincerely,</p><p>{{ companyName }}</p>',
  companyLogo: companyLogoDummy,
  subject: '',
};

export const getSubject = (companyName: any) => `${companyName}`;

export const ApplicationReceived = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
}: EmailType['react_email_placeholders']) => {
  return <EmailContainer companyLogo={companyLogo} emailBody={emailBody} />;
};
export default ApplicationReceived;
