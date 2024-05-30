import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components';
import { Parser } from 'html-to-react';
import * as React from 'react';

interface InterviewBookingConfirmationType {
  body?: string;
  companyLogo?: string;
  meetingDetails: {
    dateTime?: string;
    type?: string;
    platform?: string;
    duration?: string;
    link?: string;
  };
}

// export dummy
export const dummy: InterviewBookingConfirmationType = {
  body: '<p>Hi [candidateFirstName],</p><p>Congratulations! You have been selected for an interview at [companyName] for the [jobRole] position. Your qualifications are impressive, and we are excited to meet you and discuss them further.</p><p>Please let me know your availability within the following date range: [startDate] - [endDate] ([companyTimeZone]).</p><p>Also, to make sure we find an interview time that works well for you, could you tell us your general location.</p><p>Or use the following link to schedule your interview: [selfScheduleLink]</p><p>Looking forward to connecting with you!</p><p>Best regards,<br>[companyName] Recruitment Team</p>',
  companyLogo:
    'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/aglint-black.png',
  meetingDetails: {
    dateTime: '<strong>Fri, May 12, 2024</strong> 09:00 AM - 09:30 PM PST',
    type: '<strong>Personality and cultural fit</strong>',
    platform: 'Google meet',
    duration: '45 minutes',
    link: 'https://example.com',
  },
};

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

export const InterviewBookingConfirmation = ({
  body = dummy.body,
  meetingDetails = dummy.meetingDetails,
  companyLogo = dummy.companyLogo,
}: InterviewBookingConfirmationType) => {
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

              <Container
                className="my-8 rounded-md "
                style={{
                  border: '1px solid #E9EBED',
                  padding: '10px 20px',
                }}
              >
                <Text className="m-0 border border-solid	border-slate-500">
                  {htmlParser.parse(meetingDetails.dateTime)}
                </Text>
                <Text className="m-0 flex gap-1 item-center my-1">
                  <Img
                    className="inline "
                    src="https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/booking_confirmation_personality_logo.png"
                  />
                  {htmlParser.parse(meetingDetails.type)}
                </Text>
                <Text className="m-0 flex gap-1 items-center ">
                  <Img src="https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/booking_confirmation_gmeet_logo.png" />
                  {htmlParser.parse(meetingDetails.platform)}&nbsp;&nbsp;
                  <Img
                    className="w-[13px] h-[13px]"
                    src="https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/booking_confirmation_duration_logo.png"
                  />
                  {htmlParser.parse(meetingDetails.duration)}
                </Text>
              </Container>
              <Button
                className="px-3 py-2 bg-[#337FBD] text-white br rounded-md text-[14px]"
                href={meetingDetails.link}
              >
                Confirm Interview
              </Button>
              <Text className="text-[#999999] text-[10px] mt-10 leading-4">
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
              </Text>
            </Container>
            <Text className="flex items-center text-[10px]  mx-auto w-fit text-gray-500">
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
}
export default InterviewBookingConfirmation;
