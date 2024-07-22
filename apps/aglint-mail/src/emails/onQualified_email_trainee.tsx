import * as React from 'react';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { companyLogoDummy } from '../utils/assets/common';
import { EmailContainer } from '../components/template/Container';

type EmailType = EmailTemplateAPi<'onQualified_email_trainee'>;

export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="traineeName">{{traineeName}}</span>,</p><p></p><p>Congratulations, <span class="temp-variable" data-type="temp-variable" data-id="traineeName">{{traineeName}}</span> ! You are now qualified to conduct interviews for <span class="temp-variable" data-type="temp-variable" data-id="interviewType">{{interviewType}}</span>.</p><p></p><p>From, <span class="temp-variable" data-type="temp-variable" data-id="approverName">{{approverName}}</span></p>',
  companyLogo: companyLogoDummy,
  subject: '',
};

export const getSubject = (companyName: any) => `${companyName}`;

export const Rejection = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
}: EmailType['react_email_placeholders']) => {
  return <EmailContainer companyLogo={companyLogo} emailBody={emailBody} />;
};
export default Rejection;
