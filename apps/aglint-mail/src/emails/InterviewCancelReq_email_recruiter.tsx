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
import { Session } from '../components/template/Sessions';
import config from '../../tailwind.config';

type EmailType = EmailTemplateAPi<'InterviewCancelReq_email_recruiter'>;

// export dummy
export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Dear {{ recruiterName }},</p><p>{{ candidateFirstName }} is requesting to cancel the interview, stating reason: "{{ cancelReason }}".</p><p>Additional notes from {{ candidateFirstName }}: "{{ additionalRescheduleNotes }}".</p><p>Thank you.</p>',
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
  subject: '',
  meetingLink: '',
};

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

const currentYear = new Date().getFullYear();

export const CandidateCancelRequest = ({
  emailBody = dummy.emailBody,
  meetingDetails = dummy.meetingDetails,
  meetingLink = dummy.meetingLink,
  companyLogo = dummy.companyLogo,
}: EmailType['react_email_placeholders']) => {
  const htmlParser = Parser();
  return (
    <Html>
      <Head />
      <Tailwind config={config}>
        <Preview>Cancel Interview</Preview>
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
              {meetingDetails.map((meetingDetail, i) => (
                <Session key={i} meetingDetail={meetingDetail} />
              ))}
              {/* #D93F4C */}
              <Button
                className="px-3 py-2 bg-accent-9 text-white br rounded-[4px] text-text-xs"
                href={meetingLink}
              >
                Cancel Schedule
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

export default CandidateCancelRequest;

// [recruiterName]
// [rescheduleReason]
// [firstName]
// [additionalRescheduleNotes]
