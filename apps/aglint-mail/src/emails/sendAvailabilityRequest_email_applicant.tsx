import * as React from 'react';
import { companyLogoDummy } from '../utils/assets/common';
import { ButtonSolid } from '../components/template/Button';
import { EmailContainer } from '../components/template/Container';
import type { ReactTempPayload } from '../types/app.types';

type EmailType = ReactTempPayload<'sendAvailabilityRequest_email_applicant'>;

export const dummy: EmailType = {
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
}: EmailType) => {
  return (
    <EmailContainer companyLogo={companyLogo} emailBody={emailBody}>
      <ButtonSolid buttonText="View Details" href={availabilityReqLink} />
    </EmailContainer>
  );
};
export default CandidateAvailabilityRequest;
