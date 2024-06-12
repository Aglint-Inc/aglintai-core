import { Job } from '@/src/queries/jobs/types';
import { EmailTemplatType } from '@/src/types/companyEmailTypes';

export const templateObj: {
  // eslint-disable-next-line no-unused-vars
  [id in keyof Job['email_template']]: EmailTemplatType;
} = {
  application_received: {
    listing: 'Application Recieved',
    heading: 'Application Received Email Template',
    dynamicContent: `For dynamic content, utilize placeholders like
    [firstName], [lastName], [companyName], [jobTitle]
    and [supportLink].`,
    triggerInfo: 'Triggered when candidate moved to screening',
    description:
      'Set up a default application recieved email template. You can make specific changes for individual job posts later.',
    descriptionInJob:
      'Customise application recieved email template for this job',
    subjectPlaceHolder: 'Application Received for [jobTitle] at [companyName]',
    bodyPlaceHolder: `Dear [firstName],

    Thank you for applying for the [jobTitle] position at [companyName]. We have received your application and will review it shortly. We'll be in touch with the next steps.

    Best regards,
    [senderName]`,
    trigger: 'Triggered instantly when candidate apply for a job',
  },
  phone_screening: {
    listing: 'Phone Screen',
    heading: 'Phone Screening Email Template',
    triggerInfo: 'Used while sending screening invite.',
    dynamicContent: `For dynamic content, utilize placeholders like
    [firstName], [lastName], [companyName], [jobTitle], [phoneScreeningLink]
    and [supportLink].`,
    descriptionInJob: 'Customise phone screening email template for this job',
    description:
      'Set up a default phone screening email template. You can make specific changes for individual job posts later.',
    subjectPlaceHolder: 'Application Received for [jobTitle] at [companyName]',
    bodyPlaceHolder: `Dear [firstName],

    Thank you for applying for the [jobTitle] position at [companyName]. We have received your application and will review it shortly. We'll be in touch with the next steps.

    Best regards,
    [senderName]`,
    trigger: 'Used while sending screening invite.',
  },
  phone_screening_resend: {
    listing: 'Follow-up Phone Screening',
    heading: 'Follow-up Phone Screening Email Template',
    dynamicContent: `For dynamic content, utilize placeholders like
    [firstName], [lastName], [companyName], [jobTitle], [phoneScreeningLink]
    and [supportLink].`,
    triggerInfo: 'Triggered for resending the phone screening invite.',
    descriptionInJob:
      'Customise follow-up phone screening email template for this job',
    description:
      'Set up a default phone screening follow-up email template. You can make specific changes for individual job posts later.',
    subjectPlaceHolder: 'Application Received for [jobTitle] at [companyName]',
    bodyPlaceHolder: `Dear [firstName],

Thank you for applying for the [jobTitle] position at [companyName]. We have received your application and will review it shortly. We'll be in touch with the next steps.

Best regards,
[senderName]`,
    trigger: 'Used while resending phone screening invite.',
  },
  interview: {
    listing: 'Assessment',
    heading: 'Assessment Email Template',
    triggerInfo: 'Triggered when the candidate selected for assessment.',
    dynamicContent: `For dynamic content, utilize placeholders like
    [firstName], [lastName], [companyName], [jobTitle]
    and [supportLink].`,
    descriptionInJob: 'Customise assesment email template for this job',
    description:
      'Set up a default assessment email template. You can make specific changes for individual job posts later.',
    subjectPlaceHolder: 'Interview Invitation for [jobTitle] at [companyName]',
    bodyPlaceHolder: `Dear [firstName],

    We are excited to inform you that you have been shortlisted for the [jobTitle] position at [companyName]. We would like to schedule an interview to discuss further.
    
    Looking forward to meeting you.
    
    Best regards,
    [senderName]`,
    trigger: 'Used while sending assesment invite.',
  },
  interview_resend: {
    listing: 'Follow Up Assessment',
    heading: 'Follow Up Assessment Email Template',
    dynamicContent: `For dynamic content, utilize placeholders like
    [firstName], [lastName], [companyName], [jobTitle]
    and [supportLink].`,
    triggerInfo: 'Triggered for resending the assessment invite.',
    descriptionInJob:
      'Customise follow-up assesment email template for this job',
    description:
      'Set up a default follow-up assessment email template. You can make specific changes for individual job posts later.',
    subjectPlaceHolder: 'Interview Invitation for [jobTitle] at [companyName]',
    bodyPlaceHolder: `Dear [firstName],

    We noticed that you haven't given your interview for the [jobTitle] position at [companyName]. Don't miss this opportunity!
    
    You're welcome to choose an interview time that suits your schedule.
    
    [interviewLink]`,
    trigger: 'Used while resending assesment invite.',
  },
  rejection: {
    listing: 'Disqualified',
    heading: 'Disqualified Email Template',
    dynamicContent: `For dynamic content, utilize placeholders like
    [firstName], [lastName], [companyName], [jobTitle]
    and [supportLink].`,
    triggerInfo: 'Used while sending disqualified emails.',
    descriptionInJob: 'Customise disqualified email template for this job',
    description:
      'Set up a default disqualified email template. You can make specific changes for individual job posts later.',
    subjectPlaceHolder: 'Update on your [jobTitle] interview at [companyName]',
    bodyPlaceHolder: `Dear [firstName], 
    
    After careful consideration, we regret to inform you that we won't be proceeding with your application for the [jobTitle] position. We appreciate your interest in [companyName] and wish you the best in your future endeavors."
    
    Best regards,
    [senderName]`,
    trigger: 'Used while sending disqualified emails.',
  },
  init_email_agent: {
    listing: 'Email Agent',
    heading: 'Assign Email Agent',
    triggerInfo: 'Used When Email Agent is assigned for Scheduling Interview',
    description:
      'Set up a default Assign Email Agent template. You can make specific changes for individual job posts later.',
    descriptionInJob: 'Customise Assign Email Agent for this job.',
    bodyPlaceHolder: '',
    dynamicContent: `For dynamic content, utilize placeholders like
    [candidate_first_name], [company_name], [companyName], [start_date],[job_role], [end_date], [company_time_zone], [self_schedule_link] .`,
    subjectPlaceHolder: '',
    trigger: "Used When Email Agent is assigned for Scheduling Interview'",
  },
};

export type EmailTemplateParams = {
  title: { heading: string; listing: string; description: string };
  excerpt: string;
  path: string;
};
