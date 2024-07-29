import * as React from 'react';
import { companyLogoDummy } from '../utils/assets/common';
import { EmailContainer } from '../components/template/Container';
import type { ReactTempPayload } from '../types/app.types';

type EmailType = ReactTempPayload<'onSignup_email_admin'>;

// export dummy
export const dummy: EmailType = {
  emailBody:
    '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="organizerName">{{organizerName}}</span> </p><p></p><p>Thank you for registering with Aglint! we are excited to have you on board, To ensure a smooth onboarding process, please have the following information ready:</p><p>For the company setup, keep the company name, location, and departments handy.</p><p>For user onboarding, have the names and emails addresses of hiring team members, as well as the roles of interviewers who will collaborate on hiring.</p><p>For job listings, get the job descriptions ready and indentify the hiring team for each job.</p><p>For user onboarding, have the names and email addresses of hiring team members, as well as the roles of interviewers who will collaborate on hiring.</p><p>For job listings, get the job descriptions ready and identify the hiring team for each job.</p><p>Additionally, organize interview plans for each job.</p><p>For interview types, define the types of interviews you will conduct, and prepare the necessary qualifications and training data.</p><p>Choose any integrations you need, such as ATS, Google Meet, Zoom, Slack, Google Workspace, or Microsoft Outlook.</p><p>One of our customer success team members will contact you soon. We appreciate your patience. Best regards, Aglint AI Customer Success Team</p><p></p><p>Best regards,</p><p>Aglint AI Customer </p><p>Success Team</p>',
  companyLogo: companyLogoDummy,
  subject: 'Welcome to Aglint',
};

export const getSubject = (companyName: any) => `${companyName}`;

export const OnSignupEmailAdmin = ({
  emailBody = dummy.emailBody,
  companyLogo = dummy.companyLogo,
}: EmailType) => {
  return <EmailContainer companyLogo={companyLogo} emailBody={emailBody} />;
};
export default OnSignupEmailAdmin;
