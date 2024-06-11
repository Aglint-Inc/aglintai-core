import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Tailwind,
  Text,
} from '@react-email/components';
import { Parser } from 'html-to-react';
import * as React from 'react';
import { aglintLogo } from '../utils/assets/common';
import { EmailTemplateAPi } from '@aglint/shared-types';
type EmailType = EmailTemplateAPi<'sendAvailabilityRequest_email_applicant'>;

export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Dear {{ candidateFirstName }},</p><p>I hope this message finds you well.</p><p>Thank you for applying for the {{ jobTitle }} position at {{ companyName }}. We have reviewed your application and are impressed with your qualifications and experiences. We would like to invite you to participate in an interview to further discuss how your skills and experiences align with our needs.</p><p>To streamline the scheduling process, please click on the link below to select your availability for an interview:</p><p>{{ availabilityReqLink }}</p><p>Looking forward to your response.</p><p>Best regards,</p><p>{{ recruiterFullName }}</p><p>{{ companyName }}<br></p>',

  companyLogo:
    'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/aglint-black.png',
  subject: '',
};

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

export const CandidateAvailabilityRequest = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
}: EmailType['react_email_placeholders']) => {
  const htmlParser = Parser();
  return (
    <Html>
      <Head />
      <Tailwind>
        {/* <Preview></Preview> */}
        <Body className="bg-[#f0f0f0] font-sans  p-[20px]">
          <Container className="px-[3px] mx-auto">
            <Container className="p-[50px] bg-white">
              <Img
                alt="Company logo"
                className="w-[80px] mb-[10px]"
                src={companyLogo}
              />

              <Text className="">{htmlParser.parse(emailBody)}</Text>
            </Container>
            <Text className="flex items-center text-[10px]  mx-auto w-fit text-gray-500">
              Powered By
              <Img
                alt="Aglint Logo"
                className="w-[70px] mx-2 inline-block"
                src={aglintLogo}
              />
              @ 2024 Aglint Inc. All Right Reserved
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default CandidateAvailabilityRequest;
