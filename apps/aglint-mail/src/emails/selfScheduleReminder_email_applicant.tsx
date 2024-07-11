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
import { Footer } from '../components/template/Footer';
import { companyLogoDummy } from '../utils/assets/common';
import { ButtonSolid } from '../components/template/Button';

type EmailType = EmailTemplateAPi<'selfScheduleReminder_email_applicant'>;

// export dummy
export const dummy: EmailType['react_email_placeholders'] = {
  emailBody:
    '<p>Dear {{ candidateFirstName }},</p><p></p><p>This is a friendly reminder about the self-schedule interview request you received for the {{ jobTitle }} position at {{ companyName }}.</p><p></p><p>Please use the following link to schedule your interview: {{ selfScheduleLink }}</p><p>Looking forward to connecting with you!</p><p></p><p>Best regards,</p><p>{{ companyName }} Recruitment Team</p>',
  companyLogo: companyLogoDummy,
  subject: '',
  selfScheduleLink:
    'process.env.NEXT_PUBLIC_APP_URL/scheduling/invite/filterJson.interview_schedule.id?filter_id=filter_id&task_id=task_id',
};

export const getSubject = (companyName: any) => `${companyName}`;

export const InitEmailAgentRemainder = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
  selfScheduleLink = dummy.selfScheduleLink,
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
              <ButtonSolid href={selfScheduleLink} buttonText="Schedule Now" />
            </Container>
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default InitEmailAgentRemainder;
