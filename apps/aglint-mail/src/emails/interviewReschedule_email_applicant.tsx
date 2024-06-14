import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Tailwind,
  Text,
} from '@react-email/components';
import { Parser } from 'html-to-react';
import * as React from 'react';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import config from '../../tailwind.config';
import { Session } from '../components/template/Sessions';
import { Footer } from '../components/template/Footer';

type EmailType = EmailTemplateAPi<'interReschedReq_email_recruiter'>;

// export dummy
export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Hi {{ candidateFirstName }},</p><p>I hope this message finds you well.</p><p>Due to unforeseen circumstances, we need to reschedule your interview for the {{ jobRole }} position at {{ companyName }}. We apologize for any inconvenience this may cause and appreciate your understanding.</p><p>To find a new time that works best for you, please use the following link to schedule your interview: {{ selfScheduleLink }}</p><p>If you have any questions or need further assistance, feel free to reach out to us.</p><p>Looking forward to connecting with you!</p><p>Best regards,</p><p>{{ companyName }} Recruitment Team</p><p></p>',
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
  resheduleLink: '',
};

// export get subject
export const getSubject = (companyName: any) => `${companyName}`;

export const CandidateRescheduleRequest = ({
  emailBody = dummy.emailBody,
  meetingDetails = dummy.meetingDetails,
  companyLogo = dummy.companyLogo,
  resheduleLink = '',
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
              <Text className="text-[12px] my-0  text-text-sm text-neutral-12">
                Current Schedule{meetingDetails.length > 1 && 's'} :
              </Text>
              {meetingDetails.map((meetingDetail, i) => (
                <Session key={i} meetingDetail={meetingDetail} />
              ))}
              <Button
                className="px-3 py-2 bg-accent-9 text-white br rounded-[4px] text-text-xs"
                href={resheduleLink}
              >
                Rescheudle
              </Button>
            </Container>
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default CandidateRescheduleRequest;
