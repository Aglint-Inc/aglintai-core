import { DatabaseEnums } from '@aglint/shared-types';
type EmailTemplatType = {
  listing: string;
  heading: string;
  triggerInfo: string;
  description: string;
  subjectPlaceHolder: string;
  bodyPlaceHolder: string;
  trigger: string;
  dynamicContent: string;
};
type CompanyEmailType = Record<
  DatabaseEnums['email_slack_types'],
  EmailTemplatType
>;

export const emailTemplateCopy: CompanyEmailType = {
  agent_email_candidate: {
    listing: 'Email Agent',
    heading: 'Email Agent',
    dynamicContent: `For dynamic content, utilize placeholders like
    {{ companyName }}, {{ candidateFirstName }}, {{ jobRole }}, {{ startDate }}, {{ endDate }}, {{ recruiterTimeZone }}
    and {{ selfScheduleLink }}.`,
    triggerInfo: 'Used When Email Agent is assigned for Scheduling Interview',
    description:
      'Set up a default Assign Email Agent template. You can make specific changes for individual job posts later.',
    subjectPlaceHolder:
      'Schedule Your Interview with {{ companyName }} - Important Next Step',
    bodyPlaceHolder: `Hi {{ candidateFirstName }},Congratulations! You have been selected for an interview at {{ companyName }} for the {{ jobRole }} position. Your qualifications are impressive, and we are excited to meet you and discuss them further.Please let me know your availability within the following date range: {{ startDate }} - {{ endDate }} ({{ recruiterTimeZone }}).Also, to make sure we find an interview time that works well for you, could you tell us your general location.Or use the following link to schedule your interview: {{ selfScheduleLink }}Looking forward to connecting with you!Best regards,<br>{{ companyName }} Recruitment Team`,
    trigger: 'Manually Sending Candidate Booking Link',
  },
  confInterview_email_organizer: {
    listing: 'Booking Confirmation To Organizer',
    heading: 'Booking Confirmation To Organizer',
    dynamicContent: `For dynamic content, utilize placeholders like{{ recruiterFirstName }},and {{ candidateFirstName }}.`,
    triggerInfo: 'Sending mail to organizer about interview',
    description:
      'This template is used for sending mail to organizer that candidate has confirmend the interview. Ensure to include clear instructions and personalize the email for better engagement.',
    subjectPlaceHolder: 'Interview Details',
    bodyPlaceHolder: `<p>Dear {{ recruiterFirstName }},</p><p>Please find the details for the interview below:</p><p>Candidate name: {{ candidateFirstName }}<br></p><p>Thank you</p>`,
    trigger: 'Manually Sending Candidate Booking Link',
  },
  confirmInterview_email_applicant: {
    listing: 'Booking Confirmation To Candidate',
    heading: 'Booking Confirmation To Candidate',
    dynamicContent: `For dynamic content, utilize placeholders like{{ recruiterFirstName }},and {{ candidateFirstName }}.`,
    triggerInfo: 'Sent immediately after candidate booking is confirmed',
    description:
      'This template is used to send Booking Confirmation to candidate after successful booking. Ensure to include clear instructions and personalize the email for better engagement.',
    subjectPlaceHolder: 'Interview confirm',
    bodyPlaceHolder: `<p>Dear {{ candidateFirstName }},</p><p>We are pleased to confirm your interview for the {{ jobTitle }} position. Please find the details of your interview below.</p><p></p><p>Regards,</p><p>{{ companyName }} Team</p>`,
    trigger: 'Sent immediately after candidate booking is confirmed',
  },
  debrief_email_interviewer: {
    listing: 'Debrief Invitation',
    heading: 'Debrief Invitation',
    dynamicContent: `For dynamic content, utilize placeholders like{{ recruiterFirstName }},and {{ candidateFirstName }}.`,
    triggerInfo: 'Triggered when the candidate selected for assessment',
    description:
      'Used to invite relevant team members to a debrief session after interviews to discuss candidate evaluations.',
    subjectPlaceHolder: 'Interview Debrief for {{ candidateFirstName }}',
    bodyPlaceHolder: `<p>Dear {{ interviewerFirstName }},</p><p>Please join the debrief session to discuss {{ candidateFirstName }}''s interview for {{ jobTitle }}. Your insights are valuable to the selection process.</p><p>Cheers,</p><p>{{ companyName }} Recruitment Team</p>`,
    trigger: '',
  },
  interReschedReq_email_recruiter: {
    listing: 'Reschedule Request to Organizer',
    heading: 'Reschedule Request to Organizer',
    dynamicContent: `For dynamic content, utilize placeholders like{{ recruiterFirstName }},and {{ candidateFirstName }}.`,
    triggerInfo:
      'Sent to the interview organizer when a candidate requests to reschedule their interview.',
    description:
      'This template is used for sending mail to recruiter requesting a reschedule. Ensure to include clear instructions and personalize the email for better engagement.',
    subjectPlaceHolder: 'Meeting Reschedule Request From Candidate',
    bodyPlaceHolder: `<p>Dear {{ recruiterName }},</p><p>{{ candidateFirstName }} is requesting to reschedule between {{ dateRange }} stating reason: "{{ rescheduleReason }}".</p><p>Additional notes from {{ candidateFirstName }}: "{{ additionalRescheduleNotes }}".</p>`,
    trigger: '',
  },
  interviewCancel_email_applicant: {
    listing: 'Candidate Cancel Interview Session',
    heading: 'Candidate Cancel Interview Session',
    dynamicContent: `For dynamic content, utilize placeholders like{{ recruiterFirstName }},and {{ candidateFirstName }}.`,
    triggerInfo: '',
    description:
      'This template is used for sending the cancel interview session',
    subjectPlaceHolder: 'Interview Cancellation: {{ jobTitle }} Position',
    bodyPlaceHolder: `<p>Dear {{ candidateFirstName }},</p><p>I regret to inform you that we need to cancel your scheduled interview session at {{ companyName }}.</p><p>We apologize for any inconvenience caused and will be in touch soon to reschedule.</p><p>Best regards,<br>{{ companyName }}</p>`,
    trigger: 'Triggerd when interview session get cancelled',
  },
  InterviewCancelReq_email_recruiter: {
    listing: 'Interview Cancellation to Organizer',
    heading: 'Interview Cancellation to Organizer',
    dynamicContent: `For dynamic content, utilize placeholders like{{ recruiterFirstName }},and {{ candidateFirstName }}.`,
    triggerInfo:
      'Sent to the interview organizer when a candidate cancels their interview.',
    description:
      'This template is used for sending mail to recruiter requesting Cancellation. Ensure to include clear instructions and personalize the email for better engagement.',
    subjectPlaceHolder: 'Meeting Cancle Request From Candidate',
    bodyPlaceHolder: `<p>Dear {{ recruiterName }},</p><p>{{ candidateFirstName }} is requesting to cancel the interview, stating reason: "{{ cancelReason }}".</p><p>Additional notes from {{ candidateFirstName }}: "{{ additionalRescheduleNotes }}".</p><p>Thank you.</p>`,
    trigger: '',
  },
  interviewReschedule_email_applicant: {
    listing: 'Recruiter Reschedule',
    heading: 'Recruiter Reschedule',
    dynamicContent: `For dynamic content, utilize placeholders like{{ recruiterFirstName }},and {{ candidateFirstName }}.`,
    triggerInfo: 'Recruiter sending mail to candidate for rescheduling',
    description:
      'This template is used for sending mail to candidate about rescheduling. Ensure to include clear instructions and personalize the email for better engagement.',
    subjectPlaceHolder: 'Meeting Reschedule: {{jobTitle}} Position',
    bodyPlaceHolder: `<p>Dear {{ recruiterName }},</p><p>This is a friendly reminder about the interview with {{ firstName }}. Please find the details for the interview below:</p><p>Candidate name: {{ firstName }}</p><p>Thank you</p>`,
    trigger: '',
  },
  interviewStart_email_applicant: {
    listing: 'Interview Reminder To Candidate',
    heading: 'Interview Reminder To Candidate',
    dynamicContent: `For dynamic content, utilize placeholders like{{ recruiterFirstName }},and {{ candidateFirstName }}.`,
    triggerInfo: '',
    description:
      'This main is used to send a remainder to applicant about upcoming interview',
    subjectPlaceHolder: 'Upcoming Interview Remainder with {{ companyName }}',
    bodyPlaceHolder: `<p>Dear {{ candidateName }},</p><p style="text-align: start">This is a friendly reminder of your upcoming interview for the {{ jobTitle }} position at {{ companyName }} scheduled for <strong>{{ date }} at {{ time }}</strong>.</p><p style="text-align: start">We look forward to a successful interview!</p><p style="text-align: start">Warm regards,</p><p style="text-align: start">The {{ companyName }} Team</p>`,
    trigger: '',
  },
  interviewStart_email_interviewers: {
    listing: 'Interview Reminder To Interviewer',
    heading: 'Interview Reminder To Interviewer',
    dynamicContent: `For dynamic content, utilize placeholders like{{ recruiterFirstName }},and {{ candidateFirstName }}.`,
    triggerInfo: '',
    description:
      'This is used to send a remainder to interviewers about upcoming interview',
    subjectPlaceHolder: 'Upcoming Interview Remainder with {{ candidateName }}',
    bodyPlaceHolder: `<p>Dear {{ recruiterName }} ,</p><p>This is a friendly reminder about the interview with {{ candidateName }} .</p<p>Please find the details below </p><p>Thank you</p>`,
    trigger: '',
  },
  selfScheduleReminder_email_applicant: {
    listing: 'Self Schedule Remainder',
    heading: 'Self Schedule Remainder',
    dynamicContent: `For dynamic content, utilize placeholders like{{ recruiterFirstName }},and {{ candidateFirstName }}.`,
    triggerInfo: '',
    description: 'This email is used to send remainder to book the interview ',
    subjectPlaceHolder:
      'Reminder : Scheduling Interview for {{ jobTitle }} Position at {{ companyName }}',
    bodyPlaceHolder: `<p>Dear {{ candidateFirstName }},</p><p>This is a friendly reminder about the self-schedule interview request you received for the {{ jobTitle }} position at {{ companyName }}.</p><p>use the following link to schedule your interview: {{ selfScheduleLink }}</p><p>Looking forward to connecting with you!</p><p>Best regards,<br>{{ companyName }} Recruitment Team</p>`,
    trigger: '',
  },
  sendAvailabilityRequest_email_applicant: {
    listing: 'Candidate Booking Link',
    heading: 'Candidate Booking Link',
    dynamicContent: `For dynamic content, utilize placeholders like{{ recruiterFirstName }},and {{ candidateFirstName }}.`,
    triggerInfo: 'Manually Sending Candidate Booking Link',
    description:
      'This template is used for sending the candidate booking link to schedule interviews. Ensure to include clear instructions and personalize the email for better engagement.',
    subjectPlaceHolder:
      'Requesting Availability for Interview at {{ companyName }}',
    bodyPlaceHolder: `<p>Dear {{ candidateFirstName }},</p><p>I hope this message finds you well.</p><p>Thank you for applying for the {{ jobTitle }} position at {{ companyName }}. We have reviewed your application and are impressed with your qualifications and experiences. We would like to invite you to participate in an interview to further discuss how your skills and experiences align with our needs.</p><p>To streamline the scheduling process, please click on the link below to select your availability for an interview:</p><p>{{ availabilityReqLink }}</p><p>Looking forward to your response.</p><p>Best regards,</p><p>{{ recruiterFullName }}</p><p>{{ companyName }}<br></p>`,
    trigger: '',
  },
  sendAvailReqReminder_email_applicant: {
    listing: 'Candidate Interview Availibility Request Follow Up',
    heading: 'Candidate Interview Availibility Request Follow Up',
    dynamicContent: `For dynamic content, utilize placeholders like{{ recruiterFirstName }},and {{ candidateFirstName }}.`,
    triggerInfo: '',
    description:
      'This template is used for sending remainder to the candidate to schedule interviews. Ensure to include clear instructions and personalize the email for better engagement.',
    subjectPlaceHolder: 'Reminder',
    bodyPlaceHolder: `<p>Dear {{ candidateFirstName }},</p><p>I hope this message finds you well. We appreciate your interest in the {{ jobTitle }} position at {{ companyName }}, and we are excited to move forward with your application.</p><p>After reviewing your application, we would like to invite you to participate in a phone screening session. This initial conversation will give us the opportunity to learn more about your experiences, skills, and how they align with the requirements of the role.</p><p>Please click on the following link to access the phone screening session: {{ phoneScreeningLink }}</p><p>Best regards,</p><p>{{ companyName }}</p>`,
    trigger: '',
  },
  sendSelfScheduleRequest_email_applicant: {
    listing: 'Self Scheduling',
    heading: 'Self Scheduling',
    dynamicContent: `For dynamic content, utilize placeholders like{{ recruiterFirstName }},and {{ candidateFirstName }}.`,
    triggerInfo: '',
    description:
      'This template is used for sending to the candidate Link to schedule interviews. Ensure to include clear instructions and personalize the email for better engagement.',
    subjectPlaceHolder:
      'Reminder: Requesting Your Availability for Interview at {{ companyName }}',
    bodyPlaceHolder: `<p>Dear {{ candidateFirstName }},</p><p>I hope this message finds you well.</p><p>I am writing to follow up on my previous email regarding the interview for the {{ jobTitle }} position at {{ companyName }}. We are very interested in discussing your application and learning more about your experiences.</p><p>If you could please click on the link below to select your availability for an interview, it would be greatly appreciated:</p><p>{{ availabilityLink }}</p><p>If you have any questions or need further information, please feel free to reach out.</p><p>Thank you, and I look forward to hearing from you soon.</p><p>Best regards,</p><p>{{ recruiterFullName }}<br>{{ companyName }}<br></p>`,
    trigger: '',
  },
  availabilityReqResend_email_candidate: {
    listing: 'Candidate Availibity Request Resend',
    heading: 'Candidate Availibity Request Resend',
    dynamicContent: `For dynamic content, utilize placeholders like{{ recruiterFirstName }},and {{ candidateFirstName }}.`,
    triggerInfo: '',
    description:
      'This email template is used to resend availability request to the candidate. Ensure to include clear instructions and personalize the email for better engagement.',
    subjectPlaceHolder:
      'Reminder: Requesting Your Availability for Interview at {{ companyName }}',
    bodyPlaceHolder: `<p>Dear {{ candidateFirstName }},</p><p>I hope this message finds you well.</p><p>I am writing to follow up on my previous email regarding the interview for the {{ jobTitle }} position at {{ companyName }}. We are very interested in discussing your application and learning more about your experiences.</p><p>If you could please click on the link below to select your availability for an interview, it would be greatly appreciated:</p><p>{{ availabilityLink }}</p><p>If you have any questions or need further information, please feel free to reach out.</p><p>Thank you, and I look forward to hearing from you soon.</p><p>Best regards,</p><p>{{ recruiterFullName }}<br>{{ companyName }}<br></p>`,
    trigger: '',
  },
  interviewEnd_slack_interviewers: null,
  interviewerConfirmation_slack_interviewers: null,
  interviewStart_slack_interviewers: null,
  applicantReject_email_applicant: {
    listing: 'Application Rejected',
    heading: 'Application Rejected',
    triggerInfo: '',
    description: '',
    subjectPlaceHolder: '',
    bodyPlaceHolder: '',
    trigger: '',
    dynamicContent: '',
  },
  applicationRecieved_email_applicant: {
    listing: 'Application Recieved',
    heading: 'Application Recieved',
    triggerInfo: '',
    description: '',
    subjectPlaceHolder: '',
    bodyPlaceHolder: '',
    trigger: '',
    dynamicContent: '',
  },
  phoneScreen_email_candidate: null,
  phoneScreenRemind_email_applicant: null,
};
