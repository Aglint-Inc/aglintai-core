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

interface InitEmailAgentType {
  body?: string;
  companyLogo?: string;
}

// export dummy
export const dummy: InitEmailAgentType = {
  body: '<p>Hi [candidateFirstName],</p><p>Congratulations! You have been selected for an interview at [companyName] for the [jobRole] position. Your qualifications are impressive, and we are excited to meet you and discuss them further.</p><p>Please let me know your availability within the following date range: [startDate] - [endDate] ([companyTimeZone]).</p><p>Also, to make sure we find an interview time that works well for you, could you tell us your general location.</p><p>Or use the following link to schedule your interview: [selfScheduleLink]</p><p>Looking forward to connecting with you!</p><p>Best regards,<br>[companyName] Recruitment Team</p>',
  companyLogo:
    'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/aglint-black.png',
};

export const getSubject = (companyName: any) => `${companyName}`;

export const InitEmailAgent = ({
  body = dummy.body,
  companyLogo = dummy.companyLogo,
}: InitEmailAgentType) => {
  const htmlParser = Parser();
  return (
    <Html>
      <Head />
      <Tailwind>
        <Preview>Interview Booking Confirmation</Preview>
        <Body className="bg-[#f0f0f0] font-sans  p-[20px]">
          <Container className="px-[3px] mx-auto">
            <Container className="p-[20px] pt-[40px] bg-white">
              <Img
                alt="Company logo"
                className="w-[120px] mb-[10px]"
                src={companyLogo}
              />

              <Text className="">{htmlParser.parse(body)}</Text>

              {/* <Text className="text-[#999999] text-[10px] leading-4 mt-10 ">
                If you have any queries please &nbsp;
                <Link
                  className="text-[#337FBD] underline"
                  href="https://notion.so"
                  target="_blank"
                >
                  contact support
                </Link>
                <br />
                If you’d like to unsubscribe and stop receiving emails &nbsp;
                <Link
                  className="text-[#337FBD] underline"
                  href="https://notion.so"
                  target="_blank"
                >
                  click here
                </Link>
              </Text> */}
            </Container>
            <Text className="flex items-center text-[10px] mx-auto w-fit text-gray-500">
              Powered By
              <Img
                alt="Notion's Logo"
                className="w-[70px] mx-2 inline "
                src="https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/aglint-black.png"
              />
              @ 2023 Aglint Inc. All Right Reserved
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default InitEmailAgent;

// [candidateFirstName]
// [companyName]
// [jobRole]
// [startDate]
// [endDate]
// [companyTimeZone]
