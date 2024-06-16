/* eslint-disable security/detect-non-literal-regexp */
/* eslint-disable security/detect-object-injection */

import { EmailTempPath } from '@aglint/shared-types';
import { Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { EditEmail } from '@/devlink/EditEmail';
import { EmailTemplateCards } from '@/devlink/EmailTemplateCards';
import { EmailTemplatesStart } from '@/devlink/EmailTemplatesStart';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { CompanyEmailsType } from '@/src/types/companyEmailTypes';
import { YTransform } from '@/src/utils/framer-motions/Animation';

import TipTapAIEditor from '../../../Common/TipTapAIEditor';
import UITextField from '../../../Common/UITextField';
import UITypography from '../../../Common/UITypography';
import { debouncedSave } from '../../../CompanyDetailComp/utils';

function SchedulingEmailTemplates() {
  const { recruiter, setRecruiter } = useAuthDetails();
  const [isEditorLoad, setIsEditorLoad] = useState(true);

  const templateEntries = emailTempKeys.filter(() => {
    return true;
  });

  useEffect(() => {
    if (recruiter?.email_template) {
      setSelectedTemplate(templateEntries[0]);
      setTimeout(() => {
        setIsEditorLoad(false);
      }, 500);
    }
  }, []);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTempPath>(null);

  const handlerSave = (recruiter) => {
    setRecruiter(recruiter);
    debouncedSave(recruiter, recruiter.id);
  };

  return (
    <Stack sx={{ padding: '24px' }}>
      <Box sx={{ 
        border: '1px solid var(--neutral-6)', 
        borderRadius: 'var(--radius-4)'
      }}>
        {recruiter?.id && (
          <EmailTemplatesStart
            slotEmailTemplateCards={templateEntries.map((emailPath) => (
              <EmailTemplateCards
                key={emailPath}
                isActive={selectedTemplate === emailPath}
                textDescription={tempObj[emailPath].trigger}
                textTitle={tempObj[emailPath].listing}
                onClickApplicationRecieved={{
                  onClick: () => {
                    setSelectedTemplate(emailPath);
                  },
                }}
              />
            ))}
            slotEmailDetails={
              <>
                {isEditorLoad && (
                  <>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      bgcolor="var(--neutral-2)"
                      sx={{ width: '100%', height: 'calc(100vh - 96px)' }}
                    >
                      <LoaderSvg />
                    </Stack>
                  </>
                )}
                {!isEditorLoad && (
                  <YTransform uniqueKey={selectedTemplate}>
                    <EditEmail
                      textTipsMessage={tempObj[selectedTemplate]?.dynamicContent}
                      editEmailDescription={
                        tempObj[selectedTemplate]?.description
                      }
                      isSaveChangesButtonVisible={false}
                      textEmailName={tempObj[selectedTemplate]?.heading}
                      slotForm={
                        <Stack spacing={'var(--space-5)'}>
                          <UITextField
                            labelSize='small'
                            fullWidth
                            label='Sender Name'
                            secondaryText={`This name appears as the "From" name in emails to candidates. Choose a representative name for your company or recruiter.`}
                            value={
                              recruiter.email_template[selectedTemplate]?.fromName
                            }
                            onChange={(e) => {
                              recruiter.email_template[selectedTemplate] = {
                                body: recruiter.email_template[selectedTemplate]
                                  .body,
                                default:
                                  recruiter.email_template[selectedTemplate]
                                    .default,
                                subject:
                                  recruiter.email_template[selectedTemplate]
                                    .subject,
                                fromName: e.target.value,
                              };
                              handlerSave({ ...recruiter });
                            }}
                          />
                          <UITextField
                            labelSize='small'
                            fullWidth
                            placeholder={
                              tempObj[selectedTemplate]?.subjectPlaceHolder
                            }
                            label='Email Subject'
                            value={
                              recruiter.email_template[selectedTemplate]?.subject
                            }
                            onChange={(e) => {
                              recruiter.email_template[selectedTemplate] = {
                                body: recruiter.email_template[selectedTemplate]
                                  .body,
                                default:
                                  recruiter.email_template[selectedTemplate]
                                    .default,
                                subject: e.target.value,
                                fromName:
                                  recruiter.email_template[selectedTemplate]
                                    .fromName,
                              };
                              handlerSave({ ...recruiter });
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
                              <TipTapAIEditor
                                enablAI={false}
                                placeholder={
                                  tempObj[selectedTemplate]?.bodyPlaceHolder
                                }
                                handleChange={(html) => {
                                  // TIPTAPTODO:
                                  recruiter.email_template[selectedTemplate] = {
                                    body: html,
                                    default:
                                      recruiter.email_template[selectedTemplate]
                                        .default,
                                    subject:
                                      recruiter.email_template[selectedTemplate]
                                        .subject,
                                    fromName:
                                      recruiter.email_template[selectedTemplate]
                                        .fromName,
                                  };
                                  handlerSave({ ...recruiter });
                                }}
                                initialValue={
                                  recruiter.email_template[selectedTemplate]?.body
                                }
                              />
                            </Stack>
                          </Stack>
                        </Stack>
                      }
                    />
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

export default SchedulingEmailTemplates;

export const tempObj: CompanyEmailsType = {
  candidate_availability_request: {
    listing: 'Candidate Booking Link Email Template',
    heading: 'Candidate Booking Link Email Template',
    dynamicContent: `For dynamic content, utilize placeholders like
    [firstName], [lastName], [companyName], [jobTitle], [scheduleName]
    and [pickYourSlotLink].`,
    triggerInfo: 'Manually Sending Candidate Booking Link',
    description:
      'This template is used for sending the candidate booking link to schedule interviews. Ensure to include clear instructions and personalize the email for better engagement.',
    descriptionInJob:
      'Customise candidate_availability request email template for this job',
    subjectPlaceHolder: 'Schedule Your Interview for [jobTitle]',
    bodyPlaceHolder: `Dear [firstName],

    We are pleased to confirm your interview for the [jobTitle] position on [date] at [time]. Please find the details of your interview below.
    
    Regards,
    
    [companyName] Recruitment Team`,
    trigger: 'Manually Sending Candidate Booking Link',
  },
  cancel_interview_session: {
    listing: 'Candidate Cancel Interview Session',
    heading: 'Candidate Cancel Interview Session',
    dynamicContent: `For dynamic content, utilize placeholders like
    [firstName], [lastName], [companyName], [sessionName]`,
    triggerInfo: '',
    description:
      'This template is used for sending the cancel interview session',
    descriptionInJob:
      'Customise candidate_availability request email template for this job',
    subjectPlaceHolder: 'Interview Cancellation: [sessionName]',
    bodyPlaceHolder: `Dear [firstName],

    I regret to inform you that we need to cancel your scheduled interview session [sessionName].
    
    We apologize for any inconvenience caused and will be in touch soon to reschedule.
    
    Best regards,
    [companyName]`,
    trigger: 'Triggerd when interview session get cancelled',
  },
  candidate_invite_confirmation: {
    listing: 'Interview Booking Confirmation',
    heading: 'Interview Booking Confirmation',
    dynamicContent: `For dynamic content, utilize placeholders like [firstName], [lastName], [companyName], [jobTitle] and [viewDetailsLink].`,
    triggerInfo: 'Sent immediately after candidate booking is confirmed',
    descriptionInJob: '',
    description:
      'This template is used to send Booking Confirmation to candidate after successful booking.',
    subjectPlaceHolder: 'Your Interview is Scheduled for [positionName]',
    bodyPlaceHolder: `Dear [candidateName],

We are pleased to confirm your interview for the [positionName] position on [Date] at [Time]. Please find the details of your interview below.

Regards,
[yourCompanyName] Recruitment Team`,
    trigger: 'Sent immediately after candidate booking is confirmed',
  },
  debrief_calendar_invite: {
    listing: 'Debrief Invite',
    heading: 'Debrief Session Confirmation Email Template',
    triggerInfo: 'Triggered when the candidate selected for assessment.',
    dynamicContent: `For dynamic content, utilize placeholders like [firstName], [lastName], [companyName] and [teamMemberName].`,
    descriptionInJob: '',
    description:
      'Used to invite relevant team members to a debrief session after interviews to discuss candidate evaluations.',
    subjectPlaceHolder: 'Interview Debrief for [candidateName]',
    bodyPlaceHolder: `Dear [TeamMemberName],

Please join the debrief session to discuss [candidateName]'s interview for [positionName]. Your insights are valuable to the selection process.

Cheers,
[yourCompanyName] Recruitment Team`,
    trigger: 'Triggered to send debrief session information',
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
  confirmation_mail_to_organizer: {
    listing: 'Interview Confirmation to Organizer',
    heading: 'Interview Confirmation to Organizer',
    dynamicContent: `For dynamic content, utilize placeholders like
    [firstName], [lastName], [companyName], [recruiterName]
    and [meetingLink].`,
    triggerInfo:
      'Sent to the interview organizer when an interview is successfully scheduled.',
    description:
      'This template is used for sending mail to organizer that candidate has confirmend the interview. Ensure to include clear instructions and personalize the email for better engagement.',
    descriptionInJob: '',
    subjectPlaceHolder: 'Interview Confirmation for [firstName] [lastName]',
    bodyPlaceHolder: `Hi [recruiterName],

Please find the interview details for Candidate [firstName] [lastName]:

Meeting Link: [meetingLink]

Thank you,
Aglint AI`,
    trigger: 'Sending organizer interview confirmation link',
  },
  candidate_reschedule_request: {
    listing: 'Reschedule Request Notification to Organizer',
    heading: 'Reschedule Request Notification to Organizer',
    dynamicContent: `For dynamic content, utilize placeholders like
    [firstName], [lastName], [companyName], [jobTitle], [additionalRescheduleNotes], [dateRange]
    and [rescheduleReason].`,
    triggerInfo:
      'Sent to the interview organizer when a candidate requests to reschedule their interview.',
    description:
      'This template is used for sending mail to recruiter requesting a reschedule. Ensure to include clear instructions and personalize the email for better engagement.',
    descriptionInJob: '',
    subjectPlaceHolder:
      'Reschedule Request for [firstName] [lastName] Interview',
    bodyPlaceHolder: `Dear [recruiterName],

Candidate [firstName] [lastName], currently interviewing for [jobTitle], is requesting to reschedule their interview between [dateRange].


Reason for Reschedule: [rescheduleReason]

    Here are additional notes from the candidate:
    [additionalRescheduleNotes]

Please take the necessary action.

Thank you,
Aglint AI`,
    trigger:
      'Sent to the interview organizer when a candidate requests to reschedule their interview.',
  },
  candidate_cancel_request: {
    listing: 'Interview Cancellation Notification to Organizer',
    heading: 'Interview Cancellation Notification to Organizer',
    dynamicContent: `For dynamic content, utilize placeholders like
    [firstName], [lastName], [recruiterName], [jobTitle], [additionalRescheduleNotes], [companyName]
    and [rescheduleReason].`,
    triggerInfo:
      'Sent to the interview organizer when a candidate cancels their interview.',
    description:
      'This template is used for sending mail to recruiter requesting Cancellation. Ensure to include clear instructions and personalize the email for better engagement.',
    descriptionInJob: '',
    subjectPlaceHolder: 'Interview Cancellation for [firstName] [lastName]',
    bodyPlaceHolder: `Dear [recruiterName],

Candidate [firstName] [lastName], currently interviewing for [jobTitle], has canceled their interview.
Reason for Cancellation: [rescheduleReason]

Here are additional notes from the candidate, [firstName] [lastName]:
[additionalRescheduleNotes]

Please take the necessary action.

Thank you,
Aglint AI
`,
    trigger:
      'Sent to the interview organizer when a candidate cancels their interview.',
  },
  recruiter_rescheduling_email: {
    listing: 'Recruiter Reschedule Email Template',
    heading: 'Recruiter Reschedule Email Template',
    dynamicContent: `For dynamic content, utilize placeholders like
    [firstName], [lastName], [companyName], [jobTitle], [scheduleName],[pickYourSlotLink]
    and [recruiterRescheduleReason].`,
    triggerInfo: 'Recruiter sending mail to candidate for rescheduling',
    description:
      'This template is used for sending mail to candidate about rescheduling. Ensure to include clear instructions and personalize the email for better engagement.',
    descriptionInJob: '',
    subjectPlaceHolder: 'Schedule Your Interview for [jobTitle]',
    bodyPlaceHolder: `Dear [firstName],
    We have to reschedule the interview due to [recruiterRescheduleReason]

Choose a time slot that suits you best and take the first step towards joining our team. We look forward to meeting you!

[scheduleName]

[pickYourSlotLink]

Best regards,

[companyName] Recruitment Team`,
    trigger: 'Used to send mail to candidate about rescheduling',
  },
};

export const emailTempKeys: EmailTempPath[] = [
  'candidate_invite_confirmation',
  'candidate_availability_request',
  'debrief_calendar_invite',
  'cancel_interview_session',
  'init_email_agent',
  'confirmation_mail_to_organizer',
  'candidate_reschedule_request',
  'candidate_cancel_request',
  'recruiter_rescheduling_email',
];
