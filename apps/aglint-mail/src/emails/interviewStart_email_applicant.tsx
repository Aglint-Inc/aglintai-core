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
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { aglintLogo } from '../utils/assets/common';
import config from '../../tailwind.config';

// export dummy
export const dummy: EmailTemplateAPi<'interviewStart_email_applicant'>['react_email_placeholders'] =
  {
    subject: '',
    emailBody: `<p>Dear {{ candidateName }},</p><p style="text-align: start">This is a friendly reminder of your upcoming interview for the {{ jobTitle }} position at {{ companyName }} scheduled for <strong>{{ date }} at {{ time }}</strong>.</p><p style="text-align: start">We look forward to a successful interview!</p><p style="text-align: start">Warm regards,</p><p style="text-align: start">The {{ companyName }} Team</p>`,
    companyLogo:
      'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/aglint-black.png',
  };

export const getSubject = (companyName: any) => `${companyName}`;

const currentYear = new Date().getFullYear();

export const InterviewResentRemainder = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
}: EmailTemplateAPi<'interviewStart_email_applicant'>['react_email_placeholders']) => {
  const htmlParser = Parser();
  return (
    <Html>
      <Head />
      <Tailwind config={config}>
        <Preview>Interview reminder</Preview>
        <Body className="bg-neutral-3 font-sans  p-[20px]">
          <Container className="px-[3px] mx-auto">
            <Container className="p-[50px] bg-white rounded-[8px]">
              <Img
                alt="Company logo"
                className="w-[80px] mb-[10px]"
                src={companyLogo}
              />

              <Container className="text-text-sm text-neutral-12">
                {htmlParser.parse(emailBody)}
              </Container>
            </Container>
            <Text className="flex items-center text-[10px]  mx-auto w-fit text-neutral-11">
              Powered By
              <Img
                alt="Aglint Logo"
                className="line-block mx-2 w-[24px] h-[24px]"
                src={aglintLogo}
              />
              @ {currentYear} Aglint Inc. All Right Reserved
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default InterviewResentRemainder;
