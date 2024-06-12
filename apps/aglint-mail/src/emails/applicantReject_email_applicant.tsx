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

type EmailType = EmailTemplateAPi<'applicantReject_email_applicant'>;

export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Hi {{ candidateFirstName }},</p><p>Thank you for your interest in the {{ jobTitle }} position.</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>{{ companyName }}</p>',
  companyLogo:
    'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/aglint-black.png',
  subject: '',
};

export const getSubject = (companyName: any) => `${companyName}`;

const currentYear = new Date().getFullYear();

export const Rejection = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
}: EmailType['react_email_placeholders']) => {
  const htmlParser = Parser();
  return (
    <Html>
      <Head />
      <Tailwind config={config}>
        <Preview>Application Rejected</Preview>
        <Body className="bg-neutral-2 font-sans  p-[20px]">
          <Container className="px-[3px] mx-auto">
            <Container className="p-[50px]  bg-neutral-1 rounded-[8px]">
              <Img
                alt="Company logo"
                className="w-[80px] mb-[10px]"
                src={companyLogo}
              />

              <Container className="text-text-sm text-neutral-12 ">
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
export default Rejection;

// [firstName]
// [jobTitle]
