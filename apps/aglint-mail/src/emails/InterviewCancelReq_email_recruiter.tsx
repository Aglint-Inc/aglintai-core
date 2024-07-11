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
import { Session } from '../components/template/Sessions';
import config from '../../tailwind.config';
import { Footer } from '../components/template/Footer';
import { companyLogoDummy } from '../utils/assets/common';
import { ButtonSolid } from '../components/emails/Button';

type EmailType = EmailTemplateAPi<'InterviewCancelReq_email_recruiter'>;

// export dummy
export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Dear {{ recruiterName }},</p><p></p><p>{{ candidateFirstName }} is requesting to cancel the interview, stating the reason: "{{ cancelReason }}".</p><p>Additional notes from {{ candidateFirstName }}: "{{ additionalRescheduleNotes }}".</p><p></p><p>Thank you,</p><p>{{ companyName }} Recruitment Team</p>',
  companyLogo: companyLogoDummy,
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
  meetingLink: `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/application/84caebfb-8db6-4881-a88f-400726884504`,
};

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

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
              <ButtonSolid href={meetingLink} buttonText="Candidate Details" />
            </Container>
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default CandidateCancelRequest;
