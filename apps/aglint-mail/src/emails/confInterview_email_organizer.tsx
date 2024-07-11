import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Tailwind,
} from '@react-email/components';
import { Parser } from 'html-to-react';
import * as React from 'react';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import config from '../../tailwind.config';
import { Session } from '../components/template/Sessions';
import { Footer } from '../components/template/Footer';
import { companyLogoDummy } from '../utils/assets/common';
import { ButtonSolid } from '../components/emails/Button';

type EmailType = EmailTemplateAPi<'confInterview_email_organizer'>;

export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Dear {{ recruiterFirstName }},</p><p></p><p>Please find the details for the interview below:</p><p>Candidate name: {{ candidateFirstName }}<br></p><p>Thank you</p><p>Aglint Team</p><p></p><p></p>',
  companyLogo: companyLogoDummy,
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
  candidateDetails: `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/application/e8218fdc-524c-4f05-8786-23399370777b`,
};

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

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
              <ButtonSolid
                href={candidateDetails}
                buttonText="Candidate Details"
              />
            </Container>
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmMailToOrganizer;
