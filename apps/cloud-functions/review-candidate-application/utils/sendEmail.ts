import { emailHandler } from '../config/sendgrid';
import { logApi } from './logApi';

type EmailParams = {
  first_name: string;
  last_name: string;
  job_title: string;
  company_name: string;
  candidateEmail: string;
  interview_link?: string;
  support_link?: string;
  sendAt?: number;
};

type TemplateParams = {
  body: string;
  subject: string;
};

function fillEmailTemplate(template: any, email: EmailParams) {
  let filledTemplate = template;

  const placeholders = {
    '[firstName]': email.first_name,
    '[lastName]': email.last_name,
    '[jobTitle]': email.job_title,
    '[companyName]': email.company_name,
    '[interviewLink]': email.interview_link,
    '[supportLink]': email.support_link,
  };

  for (const [placeholder, value] of Object.entries(placeholders)) {
    const regex = new RegExp(placeholder.replace(/\[|\]/g, '\\$&'), 'g');
    filledTemplate = filledTemplate.replace(regex, value);
  }

  return filledTemplate;
}

export const sendCandidateEmail = async (
  template: TemplateParams,
  email: EmailParams,
  fromName: string
) => {
  try {
    const resp = await emailHandler({
      options: {
        to: email.candidateEmail,
        html: fillEmailTemplate(template.body, email),
        subject: fillEmailTemplate(template.subject, email),
        text: fillEmailTemplate(template.body, email),
        sendAt: email.sendAt,
        fromName: fromName,
      },
    });
    console.log('sendGrid', resp[0].statusCode);
  } catch (err: any) {
    logApi(err?.response?.body);
  }
};
