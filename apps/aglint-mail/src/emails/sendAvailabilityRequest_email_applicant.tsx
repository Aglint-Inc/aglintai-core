import * as React from 'react';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { companyLogoDummy } from '../utils/assets/common';
import { ButtonSolid } from '../components/template/Button';
import { EmailContainer } from '../components/template/Container';

type EmailType = EmailTemplateAPi<'sendAvailabilityRequest_email_applicant'>;

export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Dear {{ candidateFirstName }},</p><p></p><p>Thank you for applying for the {{ jobTitle }} position at {{ companyName }}. We have reviewed your application and are impressed with your qualifications and experiences. We would like to invite you to participate in an interview to further discuss how your skills and experiences align with our needs.</p><p></p><p>To streamline the scheduling process, please click on the link below to select your availability for an interview:</p><p>{{ availabilityReqLink }}</p><p>Looking forward to your response.</p><p></p><p>Best regards,</p><p>{{ companyName }} Recruitment Team</p>',

  companyLogo: companyLogoDummy,
  subject: '',
  availabilityReqLink:
    'process.env.NEXT_PUBLIC_APP_URL/scheduling/request-availability/avail_req_id',
};

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

export const CandidateAvailabilityRequest = ({
  availabilityReqLink = '',
  companyLogo = dummy.companyLogo,
  emailBody = dummy.emailBody,
}: EmailType['react_email_placeholders']) => {
  return (
    <EmailContainer companyLogo={companyLogo} emailBody={emailBody}>
      <ButtonSolid href={availabilityReqLink} buttonText="View Details" />
    </EmailContainer>
  );
};
export default CandidateAvailabilityRequest;
