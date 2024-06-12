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

type EmailType = EmailTemplateAPi<'confirmInterview_email_applicant'>;

// export dummy
export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Dear {{ candidateFirstName }},</p><p>We are pleased to confirm your interview for the {{ jobTitle }} position. Please find the details of your interview below.</p><p>{{ viewDetailsLink }}</p><p>Regards,</p><p>{{ companyName }} Team</p>',
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
        'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/personal.png?t=2024-06-12T05%3A11%3A22.771Z',
      meetingIcon:
        'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/online.png?t=2024-06-12T05%3A11%3A07.207Z',
    },
  ],
  subject: '',
  candidateLink: '',
};

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

const Sessions = ({ meetingDetail }) => {
  const htmlParser = Parser();
  return (
    <Container
      style={{
        border: '1px solid #E9EBED',
        padding: '10px 20px',
        borderRadius: '8px', // assuming 'rounded-md' means border-radius of 8px
        marginTop: '1rem',
        marginBottom: '1rem',
      }}
    >
      <Text style={{ lineHeight: '24px', marginBottom: '5px', margin: 0, fontSize: '1rem' }}>
        <strong>{htmlParser.parse(meetingDetail.date)}</strong> {htmlParser.parse(meetingDetail.time)}
      </Text>
      <Text style={{ display: 'flex', alignItems: 'center', lineHeight: '24px', marginBottom: '5px', margin: 0, fontSize: '1rem' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', lineHeight: '24px' }}>
          <Img
            src={meetingDetail.sessionTypeIcon}
            style={{ width: '24px', height: '24px' }}
          />
          &nbsp;
          {htmlParser.parse(meetingDetail.sessionType)}
        </span>
      </Text>
      <Text style={{ display: 'flex', alignItems: 'center', lineHeight: '24px', marginBottom: '5px', margin: 0, fontSize: '0.75rem' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', lineHeight: '24px' }}>
          <Img
            src={meetingDetail.meetingIcon}
            style={{ width: '24px', height: '24px' }}
          />
          &nbsp;
          {htmlParser.parse(meetingDetail.platform)}
          &nbsp;&nbsp;
          <Img
            src="https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/duration.png?t=2024-06-12T05%3A03%3A30.582Z"
            style={{ width: '24px', height: '24px' }}
          />
          &nbsp;
          {htmlParser.parse(meetingDetail.duration)}
        </span>
      </Text>
    </Container>


  );
};

export const InterviewBookingConfirmation = ({
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
        <Preview>Interview Booking Confirmation</Preview>
        <Body className="bg-[#f0f0f0] font-sans  p-[20px]">
          <Container className="px-[3px] mx-auto">
            <Container className="p-[50px] bg-white">
              <Img
                alt="Company logo"
                className="w-[80px] mb-[10px]"
                src={companyLogo}
              />

              <Text className="">{htmlParser.parse(emailBody)}</Text>
              {meetingDetails.map((meetingDetail, i) => (
                <Sessions key={i} meetingDetail={meetingDetail} />
              ))}
              <Button
                className="px-3 py-2 bg-[#337FBD] text-white br rounded-md text-[14px]"
                href={candidateLink}
              >
                View Details
              </Button>
            </Container>
            <Text className="flex items-center text-[10px]  mx-auto w-fit text-gray-500">
              Powered By
              <Img
                alt="Aglint Logo"
                className="line-block"
                src={aglintLogo}
                style={{ width: '24px', height: '24px' }}
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

// [firstName]
// [jobTitle]
// [viewDetailsLink]
// [companyName]
