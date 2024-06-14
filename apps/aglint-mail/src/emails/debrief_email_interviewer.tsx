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

type EmailType = EmailTemplateAPi<'debrief_email_interviewer'>;

// export dummy
export const dummy: EmailType['react_email_placeholders'] = {
  emailBody: `<p>Dear {{ interviewerFirstName }},</p><p></p><p>Please join the debrief session to discuss {{ candidateFirstName }}'s interview for {{ jobTitle }}. Your insights are valuable to the selection process.</p><p></p><p>Thanks,</p><p>{{ companyName }} Recruitment Team</p>`,

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
  candidateLink: `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/application/af9538ac-50e8-4941-91c5-39a678c60077`,
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

              <Session meetingDetail={meetingDetails} />
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

export default DebriefCalendarInvite;
