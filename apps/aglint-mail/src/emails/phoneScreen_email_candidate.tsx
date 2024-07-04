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
import config from '../../tailwind.config';
import { Footer } from '../components/template/Footer';
import { companyLogoDummy } from '../utils/assets/common';

interface PhoneScreeningType {
  body?: string;
  companyLogo?: string;
}

// export dummy
export const dummy: PhoneScreeningType = {
  body: '<p>Dear {{ candidateFirstName }},</p><p>I hope this message finds you well. We appreciate your interest in the {{ jobTitle }} position at {{ companyName }}, and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: {{ phoneScreeningLink }}</p><p>Best regards,</p><p>{{ companyName }}</p>',
  companyLogo: companyLogoDummy,
};

export const getSubject = (companyName: any) => `${companyName}`;

export const PhoneScreening = ({
  body = dummy.body,
  companyLogo = dummy.companyLogo,
}: PhoneScreeningType) => {
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
                {htmlParser.parse(body)}
              </Container>
            </Container>
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default PhoneScreening;
