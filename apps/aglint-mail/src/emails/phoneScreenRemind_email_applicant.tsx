import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Tailwind,
} from '@react-email/components';
import { Parser } from 'html-to-react';
import * as React from 'react';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import config from '../../tailwind.config';
import { Footer } from '../components/template/Footer';

type EmailType = EmailTemplateAPi<'phoneScreenRemind_email_applicant'>;
export interface PhoneScreeningResendType {
  body?: string;
  companyLogo?: string;
}

// export dummy
export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Dear {{ candidateFirstName }},</p><p>We hope this message finds you well. We wanted to bring to your attention that we have not yet received your screening form submission for the {{ jobTitle }} position at {{ companyName }}. We would not want you to miss out on this exciting opportunity!</p><p>Please click on the link below to initiate the phone screening process:</p><p>{{ phoneScreeningLink }}</p><p>We look forward to hearing from you soon!</p><p>Warm regards,</p><p>{{ companyName }}</p>',
  companyLogo:
    'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/aglint-black.png',
  subject: '',
};

export const getSubject = (companyName: any) => `${companyName}`;

const PhoneScreeningResend = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
}: EmailType['react_email_placeholders']) => {
  const htmlParser = Parser();
  return (
    <Html>
      <Head />
      <Tailwind config={config}>
        {/* <Preview></Preview> */}
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
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default PhoneScreeningResend;
