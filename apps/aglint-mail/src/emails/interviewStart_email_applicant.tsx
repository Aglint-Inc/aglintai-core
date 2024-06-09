import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components';
import { Parser } from 'html-to-react';
import * as React from 'react';
import { aglintLogo } from '../utils/assets/common';
import { EmailTemplateAPi } from '@aglint/shared-types';

// export dummy
export const dummy: EmailTemplateAPi<'interviewStart_email_applicant'>['react_email_placeholders'] =
  {
    emailBody:
      '<p>Dear [firstName],</p><p>This is a friendly reminder to choose an assessment time that suits your schedule for the [jobTitle] at [companyName].</p><p>[interviewLink]</p><p>If you have any queries about this job</p><p>[supportLink]</p><p>We wish you the best of luck and are eager to hear your insights!</p><p>Warm regards,</p><p>[companyName]</p>',
    companyLogo:
      'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/aglint-black.png',
  };

export const getSubject = (companyName: any) => `${companyName}`;

export const InterviewResentRemainder = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
}: EmailTemplateAPi<'interviewStart_email_applicant'>['react_email_placeholders']) => {
  const htmlParser = Parser();
  return (
    <Html>
      <Head />
      <Tailwind>
        <Preview>Interview Confirmation</Preview>
        <Body className="bg-[#f0f0f0] font-sans  p-[20px]">
          <Container className="px-[3px] mx-auto">
            <Container className="p-[50px]  bg-white">
              <Img
                alt="Company logo"
                className="w-[80px] mb-[10px]"
                src={companyLogo}
              />

              <Text className="">{htmlParser.parse(emailBody)}</Text>
            </Container>
            <Text className="flex items-center text-[10px] mx-auto w-fit text-gray-500">
              Powered By
              <Img
                alt="Aglint Logo"
                className="w-[70px] mx-2 inline-block"
                src={aglintLogo}
              />
              @ 2024 Aglint In. All Right Reserved
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default InterviewResentRemainder;
