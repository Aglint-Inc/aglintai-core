import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Tailwind,
} from '@react-email/components';
import { Parser } from 'html-to-react';
import * as React from 'react';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { Session } from '../components/template/Sessions';
import config from '../../tailwind.config';
import { Footer } from '../components/template/Footer';

// export dummy
export const dummy: EmailTemplateAPi<'interviewStart_email_interviewers'>['react_email_placeholders'] =
  {
    emailBody: `  <p>Dear {{ recruiterName }},</p><p></p><p>This is a friendly reminder about the interview with {{ candidateName }}. Please find the details below:</p><ul><li><p><strong>Candidate Name:</strong> {{ candidateName }}</p></li><li><p><strong>Position:</strong> {{ jobTitle }}</p></li><li><p><strong>Date:</strong> {{ date }}</p></li><li><p><strong>Time:</strong> {{ time }}</p></li></ul><p></p><p>Thank you,</p><p>The {{ companyName }} Recruitment Team</p>`,
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
    candidateLink: '',
    subject: '',
  };

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

export const ConfirmMailToOrganizerRemainder = ({
  emailBody = dummy.emailBody,
  meetingDetails = dummy.meetingDetails,
  candidateLink = dummy.candidateLink,
  companyLogo = dummy.companyLogo,
}: EmailTemplateAPi<'interviewStart_email_interviewers'>['react_email_placeholders']) => {
  const htmlParser = Parser();
  return (
    <Html>
      <Head />
      <Tailwind config={config}>
        {/* <Preview></Preview> */}
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
              <Button
                className="px-3 py-2 bg-accent-9 text-white br rounded-[4px] text-text-xs"
                href={candidateLink}
              >
                Candidate details
              </Button>
            </Container>
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmMailToOrganizerRemainder;
