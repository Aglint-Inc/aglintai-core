import * as React from 'react';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { companyLogoDummy } from '../utils/assets/common';
import { EmailContainer } from '../components/template/Container';

type EmailType =
  EmailTemplateAPi<'interviewEnd_email_organizerForMeetingStatus'>;

export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Hi {{ candidateFirstName }},</p><p>Thank you for your interest in the {{ jobTitle }} position.</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>{{ companyName }}</p>',
  companyLogo: companyLogoDummy,
  subject: '',
};

export const getSubject = (companyName: any) => `${companyName}`;

export const interviewEndEmailOrganizerForMeetingStatus = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
}: EmailType['react_email_placeholders']) => {
  return <EmailContainer companyLogo={companyLogo} emailBody={emailBody} />;
};
export default interviewEndEmailOrganizerForMeetingStatus;
