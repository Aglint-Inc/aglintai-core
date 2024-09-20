import * as React from 'react';
import { companyLogoDummy } from '../utils/assets/common';
import { ButtonSolid } from '../components/template/Button';
import { EmailContainer } from '../components/template/Container';
import type { ReactTempPayload } from '../types/app.types';

type EmailType = ReactTempPayload<'interviewEnd_email_interviewerForFeedback'>;

// export dummy
export const dummy: EmailType = {
  emailBody: `<p><span class="temp-variable" data-type="temp-variable" data-id="interviewerFirstName">{{interviewerFirstName}}</span>,</p><p>This is a friendly reminder to provide your feedback for the recent interview you conducted with {{candidateName}} for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">{{jobRole}}</span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span>.</p><p>Please submit your feedback at your earliest convenience.</p><p>Thank you for your time and assistance.</p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">{{companyName}}</span> Recruitment Team</p>`,
  companyLogo: companyLogoDummy,
  subject: '',
  interviewFeedbackLink:
    'https://dev.aglinthq.com/interviews/view?meeting_id=1a1505a6-4134-4a81-ba57-c84c29670e9b&tab=feedback',
};

export const getSubject = (companyName: any) => `${companyName}`;

const InterviewEndEmailInterviewerForFeedback = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
  interviewFeedbackLink = '',
}: EmailType) => {
  return (
    <EmailContainer companyLogo={companyLogo} emailBody={emailBody}>
      <ButtonSolid buttonText="Feedback" href={interviewFeedbackLink} />
    </EmailContainer>
  );
};
export default InterviewEndEmailInterviewerForFeedback;
