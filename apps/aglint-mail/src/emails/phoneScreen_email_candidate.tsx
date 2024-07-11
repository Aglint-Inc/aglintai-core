import * as React from 'react';
import { companyLogoDummy } from '../utils/assets/common';
import { EmailContainer } from '../components/template/Container';

interface PhoneScreeningType {
  body?: string;
  companyLogo?: string;
}

// export dummy
export const dummy: PhoneScreeningType = {
  body: '<p>Dear {{ candidateFirstName }},</p><p>I hope this message finds you well. We appreciate your interest in the {{ jobTitle }} position at {{ companyName }}, and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: {{ phoneScreeningLink }}</p><p>Best regards,</p><p>{{ companyName }}</p>',
  companyLogo: companyLogoDummy,
};

export const getSubject = (companyName: any) => `${companyName}`;

export const PhoneScreening = ({
  body = dummy.body,
  companyLogo = dummy.companyLogo,
}: PhoneScreeningType) => {
  return <EmailContainer companyLogo={companyLogo} emailBody={body} />;
};
export default PhoneScreening;
