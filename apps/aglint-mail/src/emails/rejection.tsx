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

interface RejectionType {
  body?: string;
  companyLogo?: string;
}

// export dummy
export const dummy: RejectionType = {
  body: '<p>Hi [firstName],</p><p>Thank you for your interest in the position [jobTitle].</p><p>We have reviewed your application and carefully considered your qualifications. Based on your profile and the number of other qualified applications, for the moment, we are not able to move forward in the recruiting process with you.</p><p>Good luck in your search!</p><p>Sincerely,</p><p>[companyName]</p>',
  companyLogo:
    'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/aglint-black.png',
};

export const getSubject = (companyName: any) => `${companyName}`;

export const Rejection = ({
  body = dummy.body,
  companyLogo = dummy.companyLogo,
}: RejectionType) => {
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

              
            </Container>
            <Text className="flex items-center text-[10px] mx-auto w-fit text-gray-500">
              Powered By
              <Img
                alt="Notion's Logo"
                className="w-[70px] mx-2 inline "
                src="https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/aglint-black.png"
              />
              @ 2024 Aglint Inc. All Right Reserved
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
