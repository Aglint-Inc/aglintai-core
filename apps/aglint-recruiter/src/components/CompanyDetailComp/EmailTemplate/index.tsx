/* eslint-disable security/detect-non-literal-regexp */
/* eslint-disable security/detect-object-injection */
import { RecruiterType } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import posthog from 'posthog-js';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import { useEffect, useState } from 'react';

import { EditEmail } from '@/devlink/EditEmail';
import { EmailTemplateCards } from '@/devlink/EmailTemplateCards';
import { EmailTemplatesStart } from '@/devlink/EmailTemplatesStart';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { Job } from '@/src/queries/jobs/types';
import { YTransform } from '@/src/utils/framer-motions/Animation';

import TipTapAIEditor from '../../Common/TipTapAIEditor';
import UITextField from '../../Common/UITextField';
import UITypography from '../../Common/UITypography';
import { emailTempKeys } from '../../Jobs/Dashboard/JobPostCreateUpdate/JobPostFormSlides/EmailTemplates';
import { debouncedSave } from '../utils';

const EmailTemplate = ({ setIsSaving }) => {
  const { recruiter, setRecruiter } = useAuthDetails();
  // const [openTest, setOpenTest] = useState(false);
  const isAssesEnabled = posthog.isFeatureEnabled('isAssesmentEnabled');
  const [isEditorLoad, setIsEditorLoad] = useState(true);
  const isPhoneScreeningEnabled = posthog.isFeatureEnabled(
    'isPhoneScreeningEnabled',
  );
  const isJobMarketingEnabled = useFeatureFlagEnabled('isJobMarketingEnabled');

  const templateEntries = emailTempKeys.filter((path) => {
    if (path === 'phone_screening' || path === 'phone_screening_resend') {
      return isPhoneScreeningEnabled;
    } else if (path === 'interview' || path === 'interview_resend') {
      return isAssesEnabled;
    }
    if (path == 'application_received') {
      return isJobMarketingEnabled;
    } else {
      return true;
    }
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

  const handlerSave = (recruiter: RecruiterType) => {
    setIsSaving(true);
    setRecruiter(recruiter);
    debouncedSave(recruiter, recruiter.id);
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  return (
    <>
      {recruiter?.id && (
        <EmailTemplatesStart
          slotEmailTemplateCards={templateEntries.map((emailPath) => (
            <EmailTemplateCards
              key={emailPath}
              isActive={selectedTemplate === emailPath}
              textDescription={templateObj[emailPath].trigger}
              textTitle={templateObj[emailPath].listing}
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
                    editEmailDescription={
                      templateObj[selectedTemplate]?.description
                    }
                    isSaveChangesButtonVisible={false}
                    textEmailName={templateObj[selectedTemplate]?.heading}
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
                            templateObj[selectedTemplate]?.subjectPlaceHolder
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
                              mt: 'var(--space-2)',
                              border: '1px solid',
                              borderColor: 'var(--neutral-6)',
                              borderRadius: 'var(--radius-2)',
                            }}
                          >
                            <TipTapAIEditor
                              enablAI={false}
                              placeholder={
                                templateObj[selectedTemplate]?.bodyPlaceHolder
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
                                recruiter.email_template[selectedTemplate].body
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
    </>
  );
};

export default EmailTemplate;

export const templateObj: Record<
  keyof Job['email_template'],
  EmailTemplatInfoType
> = {
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

type EmailTemplatInfoType = {
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
