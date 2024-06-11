import {
  Body,
  Button,
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

interface CandidateRescheduleRequestType {
  body?: string;
  companyLogo?: string;
  meetingLink?: string;
  meetingDetails: {
    date?: string;
    time?: string;
    sessionType?: string;
    platform?: string;
    duration?: string;
    sessionTypeIcon?: string;
    meetingIcon?: string;
  }[];
}

// export dummy
export const dummy: CandidateRescheduleRequestType = {
  body: '<p>Dear {{ recruiterName }},</p><p>{{ candidateFirstName }} is requesting to reschedule between {{ dateRange }} stating reason: "{{ rescheduleReason }}."</p><p>Additional notes from {{ candidateFirstName }}: "{{ additionalRescheduleNotes }}."</p>',
  companyLogo:
    'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/aglint-black.png',
  meetingDetails: [
    {
      date: 'Fri, May 12, 2024',
      time: '09:00 AM - 09:30 PM PST',
      sessionType: 'Personality and cultural fit',
      platform: 'Google meet',
      duration: '45 minutes',
      sessionTypeIcon:
        'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/debrief.png',
      meetingIcon:
        'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/google_meet.png',
    },
  ],
};

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

const Sessions = ({ meetingDetail }) => {
  const htmlParser = Parser();
  return (
    <Container
      className="my-0 mb-3 rounded-md "
      style={{
        border: '1px solid #E9EBED',
        padding: '10px 20px',
      }}
    >
      <Text className="m-0">
        <strong>{htmlParser.parse(meetingDetail.date)} </strong>
        {htmlParser.parse(meetingDetail.time)}
      </Text>
      <Text className="m-0 flex gap-1 item-center my-1">
        <Img className="inline " src={meetingDetail.sessionTypeIcon} />
        &nbsp;
        {htmlParser.parse(meetingDetail.sessionType)}
      </Text>
      <Text className="m-0 flex gap-1 items-center ">
        <Img src={meetingDetail.meetingIcon} />
        &nbsp;
        {htmlParser.parse(meetingDetail.platform)}&nbsp;&nbsp;
        <Img src="https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/duration.png" />
        {htmlParser.parse(meetingDetail.duration)}
      </Text>
    </Container>
  );
};

export const CandidateRescheduleRequest = ({
  body = dummy.body,
  meetingDetails = dummy.meetingDetails,
  meetingLink = dummy.meetingLink,
  companyLogo = dummy.companyLogo,
}: CandidateRescheduleRequestType) => {
  const htmlParser = Parser();
  return (
    <Html>
      <Head />
      <Tailwind>
        <Preview>Interview Reschedule Request</Preview>
        <Body className="bg-[#f0f0f0] font-sans  p-[20px]">
          <Container className="px-[3px] mx-auto">
            <Container className="p-[50px] bg-white">
              <Img
                alt="Company logo"
                className="w-[80px] mb-[10px]"
                src={companyLogo}
              />

              <Text className="">{htmlParser.parse(body)}</Text>
              <Text className="text-[12px] my-0">
                Current Schedule{meetingDetails.length > 1 && 's'} :
              </Text>
              {meetingDetails.map((meetingDetail, i) => (
                <Sessions key={i} meetingDetail={meetingDetail} />
              ))}
              <Button
                className="px-3 py-2 bg-[#337FBD] text-white br rounded-md text-[14px]"
                href={meetingLink}
              >
                Rescheudle
              </Button>
              <Text className="py-[10px] my-0">Thank You</Text>
            </Container>
            <Text className="flex items-center text-[10px]  mx-auto w-fit text-gray-500">
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

export default CandidateRescheduleRequest;

// [recruiterName]
// [firstName]
// [dateRange]
// [rescheduleReason]
// [additionalRescheduleNotes]
