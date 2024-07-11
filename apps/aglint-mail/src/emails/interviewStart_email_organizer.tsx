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

// export dummy
export const dummy: EmailTemplateAPi<'interviewStart_email_organizer'>['react_email_placeholders'] =
  {
    emailBody: `<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="organizerFirstName">{{organizerFirstName}}</span>,</p><p></p><p>This is a friendly reminder about the upcoming interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span>.</p><p></p><p>Please ensure everything is set for a smooth interview process.</p><p>Please find the details of your interview below:</p><p></p><p>Best regards,</p><p>{{companyName}} Team </p>`,
    candidateLink: '',
    subject:
      '<p>Reminder: Upcoming Interview for <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> with <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">{{candidateFirstName}}</span> </p>',

    companyLogo: companyLogoDummy,
    meetingDetail: {
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
  };

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

export const interviewStartEmailOrganizer = ({
  emailBody = dummy.emailBody,
  meetingDetail = dummy.meetingDetail,
  candidateLink = dummy.candidateLink,
  companyLogo = dummy.companyLogo,
}: EmailTemplateAPi<'interviewStart_email_organizer'>['react_email_placeholders']) => {
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
              <Session meetingDetail={meetingDetail} />
              <ButtonSolid
                href={candidateLink}
                buttonText="Candidate details"
              />
            </Container>
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default interviewStartEmailOrganizer;
