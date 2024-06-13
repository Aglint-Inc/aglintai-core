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
    '<p>Dear {{ candidateFirstName }},</p><p>I hope this message finds you well.</p><p>I am writing to follow up regarding the availability check for your upcoming interview. It appears that the initial link we sent to confirm your availability might not have been received or may have encountered an issue.</p><p>To ensure we can schedule your interview at a convenient time, please find the link below to select your preferred time slots:</p><p>{{ availabilityReqLink }}</p><p>We apologize for any inconvenience this may have caused and appreciate your understanding. If you encounter any issues with the link or have any questions, please do not hesitate to reach out.</p><p>Thank you for your cooperation. We look forward to speaking with you soon.</p><p>Best regards,</p><p>{{ companyName }} Recruitment Team</p><p></p><p></p>',
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
        <Preview>Availability Request Resended</Preview>
        <Body className="bg-neutral-3 font-sans  p-[20px]">
          <Container className="px-[3px] mx-auto">
            <Container className="p-[50px]  bg-white rounded-[8px]">
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
