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

interface InterviewBookingConfirmationType {
  body?: string;
  companyLogo?: string;
}
export const dummy = {
  body: '<p>Dear [firstName],</p> <p>I regret to inform you that we need to cancel your scheduled interview session [sessionName] at [companyName].</p> <p>We apologize for any inconvenience caused and will be in touch soon to reschedule.</p> <p>Best regards,<br> [companyName]</p>  ',
  companyLogo:
    'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/aglint-black.png',
};

export const getSubject = (companyName: any) => `${companyName}`;

export const InterviewBookingConfirmation = ({
  body = dummy.body,
  companyLogo = dummy.companyLogo,
}: InterviewBookingConfirmationType) => {
  const htmlParser = Parser();
  return (
    <Html>
      <Head />
      <Tailwind>
        <Preview>Interview Session Canceled</Preview>
        <Body className="bg-[#f0f0f0] font-sans  p-[20px]">
          <Container className="px-[3px] mx-auto">
            <Container className="p-[20px] pt-[40px] bg-white">
              <Img
                alt="Company logo"
                className="w-[80px] mb-[10px]"
                src={companyLogo}
              />

              <Text>{htmlParser.parse(body)}</Text>
            </Container>
            <Text className="flex items-center text-[10px] mx-auto w-fit text-gray-500">
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
export default InterviewBookingConfirmation;
