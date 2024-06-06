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

interface InitEmailAgentType {
  body?: string;
  companyLogo?: string;
}

// export dummy
export const dummy: InitEmailAgentType = {
  body: '<p>Dear [candidateFirstName],</p><p>This is a friendly reminder about the self-schedule interview request you received for the [Job Title] position at [Company Name].</p><p>Please let me know your availability within the following date range: [startDate] - [endDate] ([companyTimeZone]).</p><p>Also, to make sure we find an interview time that works well for you, could you tell us your general location.</p><p>Or use the following link to schedule your interview: [selfScheduleLink]</p><p>Looking forward to connecting with you!</p><p>Best regards,<br>[companyName] Recruitment Team</p>',
  companyLogo:
    'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/aglint-black.png',
};

export const getSubject = (companyName: any) => `${companyName}`;

export const InitEmailAgentRemainder = ({
  body = dummy.body,
  companyLogo = dummy.companyLogo,
}: InitEmailAgentType) => {
  const htmlParser = Parser();
  return (
    <Html>
      <Head />
      <Tailwind>
        <Preview>Interview Booking Remainder</Preview>
        <Body className="bg-[#f0f0f0] font-sans  p-[20px]">
          <Container className="px-[3px] mx-auto">
            <Container className="p-[50px]  bg-white">
              <Img
                alt="Company logo"
                className="w-[80px] mb-[10px]"
                src={companyLogo}
              />

              <Text className="">{htmlParser.parse(body)}</Text>
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
export default InitEmailAgentRemainder;
