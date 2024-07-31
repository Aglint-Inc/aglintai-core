import * as React from 'react';
import { companyLogoDummy } from '../utils/assets/common';
import { ButtonSolid } from '../components/template/Button';
import { EmailContainer } from '../components/template/Container';
import type { ReactTempPayload } from '../types/app.types';

type EmailType = ReactTempPayload<'sendAvailReqReminder_email_applicant'>;

// export dummy
export const dummy: EmailType = {
  emailBody:
    '<p>Dear {{ candidateFirstName }},</p><p></p><p style="text-align: start">I hope this message finds you well.</p><p style="text-align: start">I am writing to follow up on my previous email regarding the interview for the {{ jobTitle }} position at {{ companyName }}. We are very interested in discussing your application and learning more about your experiences.</p><p style="text-align: start">If you could please click on the link below to select your availability for an interview, it would be greatly appreciated:</p><p style="text-align: start">{{ availabilityLink }}</p><p style="text-align: start">If you have any questions or need further information, please feel free to reach out.</p><p style="text-align: start">Thank you, and I look forward to hearing from you soon.</p><p style="text-align: start"></p><p style="text-align: start">Best regards,</p><p>{{ companyName }} Recruitment Team</p>',
  companyLogo: companyLogoDummy,
  subject: '',
  availabilityReqLink:
    'process.env.NEXT_PUBLIC_APP_URL/scheduling/request-availability/req_body.avail_req_id',
};

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

export const CandidateAvailabilityRequest = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
  availabilityReqLink = '',
}: EmailType) => {
  return (
    <EmailContainer companyLogo={companyLogo} emailBody={emailBody}>
      <ButtonSolid buttonText="View Details" href={availabilityReqLink} />
    </EmailContainer>
  );
};
export default CandidateAvailabilityRequest;
