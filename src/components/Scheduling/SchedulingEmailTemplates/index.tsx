/* eslint-disable security/detect-non-literal-regexp */
/* eslint-disable security/detect-object-injection */

import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

import {
  EditEmail,
  EmailTemplateCards,
  EmailTemplatesStart,
  LoaderSvg,
} from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import { YTransform } from '@/src/utils/framer-motions/Animation';

import TipTapAIEditor from '../../Common/TipTapAIEditor';
import UITextField from '../../Common/UITextField';
import UITypography from '../../Common/UITypography';
import { debouncedSave } from '../../CompanyDetailComp/utils';

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
    <Stack sx={{ paddingLeft: '20px' }}>
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
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    width={'500px'}
                    height={'100vh'}
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
                      <Stack spacing={'20px'}>
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
                              borderColor: palette.grey[300],
                              borderRadius: '4px',
                            }}
                          >
                            <TipTapAIEditor
                              enablAI={false}
                              placeholder={
                                tempObj[selectedTemplate]?.bodyPlaceHolder
                              }
                              handleChange={(html) => {
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
    </Stack>
  );
}

export default SchedulingEmailTemplates;

export const tempObj: Record<EmailTempPath, EmailTemplatType> = {
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
};

export type EmailTempPath =
  | 'candidate_availability_request'
  | 'candidate_invite_confirmation'
  | 'debrief_calendar_invite'
  | 'cancel_interview_session';

export const emailTempKeys: EmailTempPath[] = [
  'candidate_invite_confirmation',
  'candidate_availability_request',
  'debrief_calendar_invite',
  'cancel_interview_session',
];

type EmailTemplatType = {
  listing: string;
  heading: string;
  triggerInfo: string;
  description: string;
  descriptionInJob: string; // Note: You might want to specify the type for this property
  subjectPlaceHolder: string;
  bodyPlaceHolder: string;
  trigger: string;
  dynamicContent: string;
};
