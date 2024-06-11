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

type EmailType = EmailTemplateAPi<'debrief_email_interviewer'>;

// export dummy
export const dummy: EmailType['react_email_placeholders'] = {
  emailBody: `<p>Dear {{ interviewerFirstName }},</p><p>Please join the debrief session to discuss {{ candidateFirstName }}'s interview for the {{ jobTitle }} position. Your insights are valuable to the selection process.</p><p>Cheers,</p><p>{{ companyName }} Recruitment Team</p>`,
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
  candidateLink: '',
};

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

export const DebriefCalendarInvite = ({
  emailBody = dummy.emailBody,
  meetingDetails = dummy.meetingDetails,
  companyLogo = dummy.companyLogo,
  candidateLink = dummy.candidateLink,
}: EmailType['react_email_placeholders']) => {
  const htmlParser = Parser();
  return (
    <Html>
      <Head />
      <Tailwind>
        <Preview>Debrief Session</Preview>
        <Body className="bg-[#f0f0f0] font-sans  p-[20px]">
          <Container className="px-[3px] mx-auto">
            <Container className="p-[50px] bg-white">
              <Img
                alt="Company logo"
                className="w-[80px] mb-[10px]"
                src={companyLogo}
              />

              <Text className="">{htmlParser.parse(emailBody)}</Text>
              <Container
                className="my-3 rounded-md "
                style={{
                  border: '1px solid #E9EBED',
                  padding: '10px 20px',
                }}
              >
                <Text className="m-0">
                  <strong>{htmlParser.parse(meetingDetails.date)} </strong>
                  {htmlParser.parse(meetingDetails.time)}
                </Text>
                <Text className="m-0 flex gap-1 item-center my-1">
                  <Img
                    className="inline "
                    src={meetingDetails.sessionTypeIcon}
                  />
                  &nbsp;
                  {htmlParser.parse(meetingDetails.sessionType)}
                </Text>
                <Text className="m-0 flex gap-1 items-center ">
                  <Img src={meetingDetails.meetingIcon} />
                  &nbsp;
                  {htmlParser.parse(meetingDetails.platform)}&nbsp;&nbsp;
                  <Img src="https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/duration.png" />
                  {htmlParser.parse(meetingDetails.duration)}
                </Text>
              </Container>
              <Button
                className="px-3 py-2 bg-[#337FBD] text-white br rounded-md text-[14px]"
                href={candidateLink}
              >
                Candidate details
              </Button>
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

export default DebriefCalendarInvite;

// [teamMemberName]
// [firstName]
// [jobTitle]
// [companyName]
