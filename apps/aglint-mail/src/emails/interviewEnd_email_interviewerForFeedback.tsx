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
import config from '../../tailwind.config';
import { Footer } from '../components/template/Footer';
import { companyLogoDummy } from '../utils/assets/common';

type EmailType = EmailTemplateAPi<'interviewEnd_email_interviewerForFeedback'>;

// export dummy
export const dummy: EmailType['react_email_placeholders'] = {
  emailBody: `<p><span class="temp-variable" data-type="temp-variable" data-id="interviewerFirstName">{{interviewerFirstName}}</span>,</p><p>This is a friendly reminder to provide your feedback for the recent interview you conducted with {{candidateName}} for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p>Please submit your feedback at your earliest convenience.</p><p>Thank you for your time and assistance.</p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>`,
  companyLogo: companyLogoDummy,
  subject: '',
  interviewFeedbackLink:
    'https://dev.aglinthq.com/scheduling/view?meeting_id=1a1505a6-4134-4a81-ba57-c84c29670e9b&tab=feedback',
};

export const getSubject = (companyName: any) => `${companyName}`;

const InterviewEndEmailInterviewerForFeedback = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
  interviewFeedbackLink = dummy.interviewFeedbackLink,
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
              <Button
                className="px-3 py-2 bg-accent-9 text-white br rounded-[4px] text-text-xs"
                href={interviewFeedbackLink}
              >
                Feedback
              </Button>
            </Container>
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default InterviewEndEmailInterviewerForFeedback;
