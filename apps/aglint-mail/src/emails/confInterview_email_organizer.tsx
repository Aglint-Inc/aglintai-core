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
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { aglintLogo } from '../utils/assets/common';
import { durationIcon } from '../utils/email/common/functions';
import config from '../../tailwind.config';

type EmailType = EmailTemplateAPi<'confInterview_email_organizer'>;

export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Dear {{ recruiterName }},</p><p>Please find the details for the interview below:</p><p>Candidate name: {{ firstName }}<br>Meeting link: {{ meetingLink }}</p><p>Thank you</p>',
  companyLogo:
    'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/temp/aglint-black.png',
  meetingDetails: {
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
  subject: '',
  candidateDetails: '',
};

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

const currentYear = new Date().getFullYear();

const Sessions = ({ meetingDetail }) => {
  const htmlParser = Parser();
  return (
    <Container className="my-[10px] rounded-md px-[20px] py-[10px] border border-solid border-neutral-5">
      <Text className="m-0   leading-[24px] text-text-xs text-neutral-12">
        <strong>{htmlParser.parse(meetingDetail.date)}</strong>{' '}
        {htmlParser.parse(meetingDetail.time)}
      </Text>
      <Text className="m-0 my-[5px] flex items-center leading-[24px] text-text-xs text-neutral-12">
        <span className="inline-flex items-center leading-[24px]">
          <Img
            src={meetingDetail.sessionTypeIcon}
            className="w-[24px] h-[24px]"
          />
          &nbsp;
          {htmlParser.parse(meetingDetail.sessionType)}
        </span>
      </Text>
      <Text className="m-0 flex items-center leading-[24px] text-text-xs text-neutral-12">
        <span className="inline-flex items-center leading-[24px]">
          <Img src={meetingDetail.meetingIcon} className="w-[24px] h-[24px]" />
          &nbsp;
          {htmlParser.parse(meetingDetail.platform)}
          &nbsp;&nbsp;
          <Img src={durationIcon} className="w-[24px] h-[24px]" />
          &nbsp;
          {htmlParser.parse(meetingDetail.duration)}
        </span>
      </Text>
    </Container>
  );
};

export const ConfirmMailToOrganizer = ({
  emailBody = dummy.emailBody,
  meetingDetails = dummy.meetingDetails,
  companyLogo = dummy.companyLogo,
  candidateDetails = dummy.candidateDetails,
}: EmailType['react_email_placeholders']) => {
  const htmlParser = Parser();
  return (
    <Html>
      <Head />
      <Tailwind config={config}>
        <Preview>Interview Booking Confirmation</Preview>
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

              <Sessions meetingDetail={meetingDetails} />
              <Button
                className="px-3 py-2 bg-accent-9 text-white br rounded-[4px] text-text-xs"
                href={candidateDetails}
              >
                Candidate details
              </Button>
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

export default ConfirmMailToOrganizer;

// [recruiterName]
// [firstName]
// [meetingLink]

// <Container
//   className="my-3 rounded-md "
//   style={{
//     border: '1px solid #E9EBED',
//     padding: '10px 20px',
//   }}
// >
//   <Text className="m-0">
//     <strong>{htmlParser.parse(meetingDetail.date)} </strong>
//     {htmlParser.parse(meetingDetail.time)}
//   </Text>
//   <Text className="m-0 flex gap-1 item-center my-1">
//     <Img className="inline " src={meetingDetail.sessionTypeIcon} />
//     &nbsp;
//     {htmlParser.parse(meetingDetail.sessionType)}
//   </Text>
//   <Text className="m-0 flex gap-1 items-center ">
//     <Img src={meetingDetail.meetingIcon} />
//     &nbsp;
//     {htmlParser.parse(meetingDetail.platform)}&nbsp;&nbsp;
//     <Img src="https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/duration.png" />
//     {htmlParser.parse(meetingDetail.duration)}
//   </Text>
// </Container>
