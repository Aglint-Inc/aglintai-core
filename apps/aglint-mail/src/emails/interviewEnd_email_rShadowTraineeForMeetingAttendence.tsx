import * as React from 'react';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { companyLogoDummy } from '../utils/assets/common';
import { EmailContainer } from '../components/template/Container';

type EmailType =
  EmailTemplateAPi<'interviewEnd_email_rShadowTraineeForMeetingAttendence'>;

export const dummy: EmailType['react_email_placeholders'] = {
  emailBody: `<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="traineeName">{{traineeName}}</span> ,</p><p></p><p>Could you please confirm if you've completed the <span class="temp-variable" data-type="temp-variable" data-id="reverseShadowCount">{{reverseShadowCount}}</span> reverse shadow session for <span class="temp-variable" data-type="temp-variable" data-id="interviewType">{{interviewType}}</span> ? You were scheduled as a shadow interviewer in the <span class="temp-variable" data-type="temp-variable" data-id="sessionName">{{sessionName}}</span> for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateName">{{candidateName}}</span> .</p><p></p><p>Please click the link below to confirm: <span class="temp-variable" data-type="temp-variable" data-id="reverseShadowConfirmLink">{{reverseShadowConfirmLink}}</span></p><p>From,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p>`,
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
