/* eslint-disable security/detect-object-injection */
import { DatabaseTableInsert } from '@aglint/shared-types';
import { Box, Popover, Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { EditEmail } from '@/devlink/EditEmail';
import { EmailTemplateCards } from '@/devlink/EmailTemplateCards';
import { EmailTemplatesStart } from '@/devlink/EmailTemplatesStart';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import { PreviewEmail } from '@/devlink2/PreviewEmail';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import toast from '@/src/utils/toast';

import { upateEmailTemplate } from './utils';

function SchedulerEmailTemps() {
  const { emailTemplates } = useAuthDetails();
  const [emailTemplate, setEmailTemplate] =
    useState<DatabaseTableInsert['company_email_template'][]>(null);
  const [tiptapLoader, setTipTapLoder] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<DatabaseTableInsert['company_email_template']>(null);
  const [isEditorLoad, setIsEditorLoad] = useState(true);
  const [saving, setSaving] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
    setHtml(null);
  };
  const [isHtml, setHtml] = useState(null);
  const [popOverLoading, setPopOverLoading] = useState(false);
  useEffect(() => {
    if (emailTemplates.data) {
      setEmailTemplate([...emailTemplates.data]);
      setSelectedTemplate(emailTemplates.data[11]);
    }

    setTimeout(() => {
      setIsEditorLoad(false);
    }, 500);
  }, [emailTemplates]);
  async function updateEmail({
    id,
    data,
  }: {
    id: string;
    data: DatabaseTableInsert['company_email_template'];
  }) {
    await upateEmailTemplate({
      id,
      data: {
        ...data,
      },
    });
    setSaving(false);
    toast.message('Saved Successfully!');
  }
  const preview = async () => {
    setPopOverLoading(true);
    try {
      const { data } = await axios.post(`/api/emails/preview`, {
        mail_type: selectedTemplate.type,
        body: selectedTemplate.body,
      });
      setHtml(data);
      setPopOverLoading(false);
      return data;
    } catch (error) {
      setPopOverLoading(false);
      toast.error(`Error fetching preview: ${error}`);
      throw error;
    }
  };

  return (
    <Stack sx={{ padding: '24px' }}>
      <Box
        sx={{
          border: '1px solid var(--neutral-6)',
          borderRadius: 'var(--radius-4)',
        }}
      >
        {emailTemplate && (
          <EmailTemplatesStart
            slotEmailTemplateCards={emailTemplate
              ?.filter((emailPath) => emailTempKeys.includes(emailPath.type))
              .filter(
                (v, i, a) => a.findIndex((v2) => v2.type === v.type) === i,
              )
              .sort((a, b) => a.type.localeCompare(b.type))
              .map((emailPath) => (
                <EmailTemplateCards
                  key={emailPath.id}
                  isActive={selectedTemplate.type === emailPath.type}
                  textDescription={tempObj[emailPath.type]?.trigger}
                  textTitle={tempObj[emailPath.type]?.listing}
                  onClickApplicationRecieved={{
                    onClick: () => {
                      setTipTapLoder(true);
                      setSelectedTemplate(emailPath);
                      setTimeout(() => {
                        setTipTapLoder(false);
                      }, 500);
                    },
                  }}
                />
              ))}
            slotEmailDetails={
              <>
                {isEditorLoad && (
                  <>
                    <Stack
                      direction='row'
                      alignItems='center'
                      justifyContent='center'
                      bgcolor='var(--neutral-2)'
                      sx={{ width: '100%', height: 'calc(100vh - 96px)' }}
                    >
                      <LoaderSvg />
                    </Stack>
                  </>
                )}
                {!isEditorLoad && (
                  <YTransform uniqueKey={selectedTemplate}>
                    <EditEmail
                      onClickPreview={{
                        onClick: (e) => {
                          preview();
                          setAnchorEl(e.currentTarget);
                        },
                      }}
                      isPreviewVisible={
                        selectedTemplate.type == emailTempKeys[0] ? false : true
                      }
                      textTipsMessage={
                        tempObj[selectedTemplate?.type]?.dynamicContent
                      }
                      editEmailDescription={
                        tempObj[selectedTemplate?.type]?.description
                      }
                      isSaveChangesButtonVisible={false}
                      textEmailName={tempObj[selectedTemplate?.type]?.heading}
                      slotForm={
                        <Stack spacing={'var(--space-5)'}>
                          <UITextField
                            labelSize='small'
                            fullWidth
                            label='Sender Name'
                            secondaryText={`This name appears as the "From" name in emails to candidates. Choose a representative name for your company or recruiter.`}
                            value={selectedTemplate?.from_name}
                            onChange={(e) => {
                              const text = e.target.value;

                              setSelectedTemplate((pre) => {
                                pre.from_name = text;

                                return { ...pre };
                              });
                            }}
                          />
                          <UITextField
                            labelSize='small'
                            fullWidth
                            placeholder={
                              tempObj[selectedTemplate?.type]
                                ?.subjectPlaceHolder
                            }
                            label='Email Subject'
                            value={selectedTemplate?.subject}
                            onChange={(e) => {
                              const text = e.target.value;
                              setSelectedTemplate((pre) => {
                                pre.subject = text;

                                return { ...pre };
                              });
                            }}
                            minRows={1}
                            multiline
                          />
                          <Stack>
                            <UITypography type='small'>Email Body</UITypography>
                            <Stack
                              sx={{
                                mt: '8px',
                                border: '1px solid',
                                borderColor: 'var(--neutral-6)',
                                borderRadius: 'var(--radius-2)',
                              }}
                            >
                              {tiptapLoader && (
                                <>
                                  <Stack
                                    alignItems={'center'}
                                    height={'200px'}
                                    justifyContent={'center'}
                                  >
                                    <LoaderSvg />
                                  </Stack>
                                </>
                              )}
                              {!tiptapLoader && (
                                <TipTapAIEditor
                                  enablAI={false}
                                  placeholder={''}
                                  editor_type='email'
                                  template_type={selectedTemplate.type}
                                  handleChange={(html) => {
                                    const text = html;
                                    setSelectedTemplate((pre) => {
                                      pre.body = text;
                                      return { ...pre };
                                    });
                                  }}
                                  initialValue={selectedTemplate.body}
                                />
                              )}
                            </Stack>
                          </Stack>
                          <Stack
                            width={'100%'}
                            direction={'row'}
                            justifyContent={'start'}
                          >
                            <ButtonSolid
                              size={2}
                              isLoading={saving}
                              textButton={'Save'}
                              onClickButton={{
                                onClick: () => {
                                  setSaving(true);
                                  updateEmail({
                                    id: selectedTemplate.id,
                                    data: selectedTemplate,
                                  });
                                },
                              }}
                            />
                          </Stack>
                        </Stack>
                      }
                    />
                    <Popover
                      id='popover-agent'
                      open={open}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{ vertical: -6, horizontal: 0 }}
                      onClose={handleClose}
                    >
                      <PreviewEmail
                        slotContent={
                          popOverLoading ? (
                            <Stack
                              alignItems={'center'}
                              height={'400px'}
                              justifyContent={'center'}
                            >
                              <LoaderSvg />
                            </Stack>
                          ) : (
                            <iframe
                              width={'790px'}
                              height={'490px'}
                              color='white'
                              srcDoc={isHtml}
                              title='Previw Email'
                            />
                          )
                        }
                        onClickClose={{
                          onClick: () => {
                            setAnchorEl(null);
                            setHtml(null);
                          },
                        }}
                      />
                    </Popover>
                  </YTransform>
                )}
              </>
            }
          />
        )}
      </Box>
    </Stack>
  );
}

export default SchedulerEmailTemps;

export type EmailTempPath =
  | 'agent_email_candidate'
  | 'confInterview_email_organizer'
  | 'confirmInterview_email_applicant'
  | 'debrief_email_interviewer'
  | 'interReschedReq_email_recruiter'
  | 'interviewCancel_email_applicant'
  | 'InterviewCancelReq_email_recruiter'
  | 'interviewReschedule_email_applicant'
  | 'interviewStart_email_applicant'
  | 'interviewStart_email_interviewers'
  | 'selfScheduleReminder_email_applicant'
  | 'sendAvailabilityRequest_email_applicant'
  | 'sendAvailReqReminder_email_applicant'
  | 'sendSelfScheduleRequest_email_applicant'
  | 'availabilityReqResend_email_candidate';

export const emailTempKeys = [
  'agent_email_candidate',
  'confInterview_email_organizer',
  'confirmInterview_email_applicant',
  'debrief_email_interviewer',
  'interReschedReq_email_recruiter',
  'interviewCancel_email_applicant',
  'InterviewCancelReq_email_recruiter',
  'interviewReschedule_email_applicant',
  'interviewStart_email_applicant',
  'interviewStart_email_interviewers',
  'selfScheduleReminder_email_applicant',
  'sendAvailabilityRequest_email_applicant',
  'sendAvailReqReminder_email_applicant',
  'sendSelfScheduleRequest_email_applicant',
  'availabilityReqResend_email_candidate',
];

export const tempObj: CompanyEmailType = {
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
};

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

type CompanyEmailType = Record<EmailTempPath, EmailTemplatType>;
