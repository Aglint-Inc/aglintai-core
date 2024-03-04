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
  const [selectedTemplate, setSelectedTemplate] = useState(null);

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
    listing: 'Candidate Availability Request',
    heading: 'Candidate Availability Request Template',
    dynamicContent: `For dynamic content, utilize placeholders like
    [firstName], [lastName], [companyName], [jobTitle]
    and [supportLink].`,
    triggerInfo: 'Triggered to check candidate availability',
    description:
      'Set up a default application recieved email template. You can make specific changes for individual job posts later.',
    descriptionInJob:
      'Customise candidate_availability request email template for this job',
    subjectPlaceHolder: 'Schedule Your Interview for [positionName]',
    bodyPlaceHolder: `Dear [candidateName],

We are excited to move forward with your application for the [positionName] role. Please let us know your availability over the next week so we can schedule your interview.

Best regards,
[yourCompanyName] Recruitment Team`,
    trigger: 'Triggered to check candidate availability',
  },
  candidate_email_confirmation: {
    listing: 'Candidate Email Confirmation',
    heading: 'Candidate Email Confirmation Template',
    triggerInfo: 'Triggered to send confirmation to candidates.',
    dynamicContent: `For dynamic content, utilize placeholders like
    [firstName], [lastName], [companyName], [jobTitle], [phoneScreeningLink]
    and [supportLink].`,
    descriptionInJob: '',
    description: '',
    subjectPlaceHolder: 'Confirmation of Your Application for [positionName]',
    bodyPlaceHolder: `Dear [candidateName],

Thank you for applying to the [positionName] position at [yourCompanyName]. We have received your application and will be reviewing it shortly.

Best wishes,
[yourCompanyName] Recruitment Team
`,
    trigger: 'Triggered to send confirmation to candidates.',
  },
  candidate_invite_confirmation: {
    listing: 'Candidate Invite Confirmation',
    heading: 'Candidate Invite Confirmation Template',
    dynamicContent: `For dynamic content, utilize placeholders like
    [firstName], [lastName], [companyName], [jobTitle], [phoneScreeningLink]
    and [supportLink].`,
    triggerInfo: '',
    descriptionInJob: '',
    description: '',
    subjectPlaceHolder: 'Your Interview is Scheduled for [positionName]',
    bodyPlaceHolder: `Dear [candidateName],

We are pleased to confirm your interview for the [positionName] position on [Date] at [Time]. Please find the details of your interview below.

Regards,
[yourCompanyName] Recruitment Team`,
    trigger: 'Triggered to confirm candidate availability',
  },
  debrief_calendar_invite: {
    listing: 'Debrief Calendar Invite',
    heading: 'Debrief Calendar Invite Template',
    triggerInfo: 'Triggered when the candidate selected for assessment.',
    dynamicContent: `For dynamic content, utilize placeholders like
    [firstName], [lastName], [companyName], [jobTitle]
    and [supportLink].`,
    descriptionInJob: '',
    description: '',
    subjectPlaceHolder: 'Interview Debrief for [candidateName]',
    bodyPlaceHolder: `Dear [TeamMemberName],

Please join the debrief session to discuss [candidateName]'s interview for [positionName]. Your insights are valuable to the selection process.

Cheers,
[yourCompanyName] Recruitment Team`,
    trigger: 'Triggered to send debrief session information',
  },
  interviewer_calendar_invite: {
    listing: 'Interviewer Calendar Invite',
    heading: 'Interviewer Calendar Invite Template',
    dynamicContent: `For dynamic content, utilize placeholders like
    [firstName], [lastName], [companyName], [jobTitle]
    and [supportLink].`,
    triggerInfo: '',
    descriptionInJob: '',
    description: '',
    subjectPlaceHolder: 'Interview Assignment for [positionName]',
    bodyPlaceHolder: `Dear [candidateName],

You have been scheduled to conduct an interview for the [positionName] position on [Date] at [Time]. Please review the candidate's profile attached.

Thank you,
[yourCompanyName] Recruitment Team`,
    trigger: 'Triggered to send inverviewer interview details',
  },
  self_schedule: {
    listing: 'Self Schedule',
    heading: 'Self Schedule Template',
    dynamicContent: `For dynamic content, utilize placeholders like
    [firstName], [lastName], [companyName], [jobTitle]
    and [supportLink].`,
    triggerInfo: '.',
    descriptionInJob: '',
    description: '',
    subjectPlaceHolder: 'Choose Your Interview Slot for [positionName] ',
    bodyPlaceHolder: `Dear [candidateName], 

We invite you to select a convenient time slot for your interview for the [positionName] role. Please follow the link below to schedule your interview. 

Kind regards, 
[yourCompanyName] Recruitment Team`,
    trigger: 'Triggered to select interview slot',
  },
};

export type EmailTempPath =
  | 'candidate_availability_request'
  | 'candidate_email_confirmation'
  | 'candidate_invite_confirmation'
  | 'debrief_calendar_invite'
  | 'interviewer_calendar_invite'
  | 'self_schedule';

export const emailTempKeys: EmailTempPath[] = [
  'candidate_availability_request',
  'candidate_email_confirmation',
  'candidate_invite_confirmation',
  'debrief_calendar_invite',
  'interviewer_calendar_invite',
  'self_schedule',
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
