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
import { companyLogoDummy } from '../utils/assets/common';

type EmailType = EmailTemplateAPi<'applicationRecieved_email_applicant'>;

// export dummy
export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Hi {{ candidateFirstName }},</p><p>You have successfully submitted your application for this position:</p><p>{{ jobTitle }}</p><p>We will review your application shortly. If your profile matches our requirements, we will be in touch to schedule the next steps in the process.</p><p>Thank you for your interest in {{ companyName }}.</p><p>If you have any queries about this job, please visit the following link: {{ supportLink }}</p><p>Sincerely,</p><p>{{ companyName }}</p>',
  companyLogo: companyLogoDummy,
  subject: '',
};

export const getSubject = (companyName: any) => `${companyName}`;

export const ApplicationReceived = ({
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
export default ApplicationReceived;
