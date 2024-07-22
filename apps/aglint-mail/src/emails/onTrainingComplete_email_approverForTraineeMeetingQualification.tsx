import * as React from 'react';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { companyLogoDummy } from '../utils/assets/common';
import { EmailContainer } from '../components/template/Container';

type EmailType =
  EmailTemplateAPi<'onTrainingComplete_email_approverForTraineeMeetingQualification'>;

export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="approverName">{{approverName}}</span> ,</p><p></p><p><span class="temp-variable" data-type="temp-variable" data-id="traineeName">{{traineeName}}</span> has completed <span class="temp-variable" data-type="temp-variable" data-id="shadowCount">{{shadowCount}}</span> shadow sessions and <span class="temp-variable" data-type="temp-variable" data-id="reverseShadowCount">{{reverseShadowCount}}</span> reverse shadow sessions. Please review and approve <span class="temp-variable" data-type="temp-variable" data-id="traineeName">{{traineeName}}</span> to become qualified for conducting <span class="temp-variable" data-type="temp-variable" data-id="interviewType">{{interviewType}}</span> interviews.</p><p></p><p>Please click the link below to confirm : <span class="temp-variable" data-type="temp-variable" data-id="qualifiedApproverConfirmLink">{{qualifiedApproverConfirmLink}}</span></p><p></p><p>Thanks,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p>',
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
