/* eslint-disable security/detect-non-literal-regexp */
/* eslint-disable security/detect-object-injection */
import { Stack, Typography } from '@mui/material';
import posthog from 'posthog-js';
import { useEffect, useState } from 'react';

import {
  EditEmail,
  EmailTemplateCards,
  EmailTemplatesStart,
  LoaderSvg,
} from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import toast from '@/src/utils/toast';

import { debouncedSave } from '../utils';
import TipTapAIEditor from '../../Common/TipTapAIEditor';
import UITextField from '../../Common/UITextField';
import UITypography from '../../Common/UITypography';
import { emailTempKeys } from '../../JobsDashboard/JobPostCreateUpdate/JobPostFormSlides/EmailTemplates';

const EmailTemplate = () => {
  const { recruiter } = useAuthDetails();
  // const [openTest, setOpenTest] = useState(false);
  const isAssesEnabled = posthog.isFeatureEnabled('isAssesmentEnabled');
  const [isEditorLoad, setIsEditorLoad] = useState(true);
  const isPhoneScreeningEnabled = posthog.isFeatureEnabled(
    'isPhoneScreeningEnabled',
  );
  const templateEntries = emailTempKeys.filter((path) => {
    if (path === 'phone_screening' || path === 'phonescreen_resend') {
      return isPhoneScreeningEnabled;
    } else if (path === 'interview' || path === 'interview-resend') {
      return isAssesEnabled;
    } else {
      return true;
    }
  });
  useEffect(() => {
    if (recruiter && recruiter.email_template) {
      setSelectedTemplate({
        name: 'application_recieved',
        ...recruiter.email_template['application_recieved'],
      });
      setTimeout(() => {
        setIsEditorLoad(false);
      }, 500);
    }
  }, [recruiter]);

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handlerSave = () => {
    recruiter.email_template[selectedTemplate.name] = {
      body: selectedTemplate.body,
      default: selectedTemplate.default,
      subject: selectedTemplate.subject,
      fromName: selectedTemplate.fromName,
    };
    debouncedSave({ ...recruiter }, recruiter.id);
    toast.success('Saved successfully');
  };

  return (
    <>
      <EmailTemplatesStart
        // slotEmailTemplateCards={templateEntries.map(
        //   ([templateName, templateData], ind) => (
        //     <EmailTemplateCards
        //       key={ind}
        //       textDescription={templateObj[templateName].trigger}
        //       textTitle={templateObj[templateName].listing}
        //       onClickApplicationRecieved={{
        //         onClick: () => {
        //           setSelectedTemplate({ ...templateData, name: templateName });
        //         },
        //       }}
        //     />
        //   ),
        // )}
        slotEmailTemplateCards={templateEntries.map((emailPath) => (
          <EmailTemplateCards
            key={emailPath}
            isActive={selectedTemplate?.name === emailPath}
            textDescription={templateObj[emailPath].trigger}
            textTitle={templateObj[emailPath].listing}
            onClickApplicationRecieved={{
              onClick: () => {
                setSelectedTemplate({
                  ...recruiter.email_template[String(emailPath)],
                  name: emailPath,
                });
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
              <EditEmail
                editEmailDescription={
                  templateObj[selectedTemplate?.name]?.description
                }
                onClickSaveChanges={{
                  onClick: () => {
                    handlerSave();
                  },
                }}
                textEmailName={templateObj[selectedTemplate?.name]?.heading}
                slotForm={
                  <Stack spacing={'20px'}>
                    <Stack
                      spacing={1}
                      sx={{
                        bgcolor: palette.grey[100],
                        p: 2,
                        borderRadius: '8px',
                      }}
                    >
                      <Typography variant='h5'>
                        Pro Tip: Customize Your Message
                      </Typography>
                      <Typography variant='body2'>
                        For dynamic content, utilize placeholders like
                        [firstName], [lastName], [companyName], [jobTitle] and
                        [supportLink].
                      </Typography>
                    </Stack>
                    <UITextField
                      labelSize='small'
                      fullWidth
                      label='Sender Name'
                      secondaryText={`This name appears as the "From" name in emails to candidates. Choose a representative name for your company or recruiter.`}
                      value={selectedTemplate.fromName}
                      onChange={(e) => {
                        setSelectedTemplate((prev) => ({
                          ...prev,
                          fromName: e.target.value,
                        }));
                      }}
                    />
                    <UITextField
                      labelSize='small'
                      fullWidth
                      placeholder={
                        templateObj[selectedTemplate?.name]?.subjectPlaceHolder
                      }
                      label='Email Subject'
                      value={selectedTemplate.subject}
                      onChange={(e) => {
                        setSelectedTemplate((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }));
                      }}
                      minRows={1}
                      multiline
                    />
                    <Stack>
                      <UITypography type='small' fontBold='normal'>
                        Email Body
                      </UITypography>
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
                            templateObj[selectedTemplate?.name]?.bodyPlaceHolder
                          }
                          handleChange={(html) => {
                            setSelectedTemplate((prev) => ({
                              ...prev,
                              body: html,
                            }));
                          }}
                          initialValue={selectedTemplate.body}
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                }
              />
            )}
          </>
        }
      />
    </>
  );
};

export default EmailTemplate;

export const templateObj: Record<string, any> = {
  interview: {
    listing: 'Assessment Email',
    heading: 'Assessment Email',
    triggerInfo: 'Triggered when the candidate selected for assessment.',
    description:
      'Set up a default interview email template. You can make specific changes for individual job posts later.',
    subjectPlaceHolder: 'Interview Invitation for [jobTitle] at [companyName]',
    bodyPlaceHolder: `Dear [firstName],

    We are excited to inform you that you have been shortlisted for the [jobTitle] position at [companyName]. We would like to schedule an interview to discuss further.
    
    Looking forward to meeting you.
    
    Best regards,
    [senderName]`,
    trigger: 'Triggered when candidate moved to assessment state',
  },
  interview_resend: {
    listing: 'Follow Up Assessment',
    heading: 'Follow Up Assessment Email ',
    triggerInfo: 'Triggered for resending the assessment invite.',

    description:
      'Reminder: Schedule Your Interview for [jobTitle] at [companyName]',
    subjectPlaceHolder: 'Interview Invitation for [jobTitle] at [companyName]',
    bodyPlaceHolder: `Dear [firstName],

    We noticed that you haven't given your interview for the [jobTitle] position at [companyName]. Don't miss this opportunity!
    
    You're welcome to choose an interview time that suits your schedule.
    
    [interviewLink]`,
    trigger: 'Triggered when you click resend assessment link',
  },
  rejection: {
    listing: 'Disqualified Email',
    heading: 'Disqualified Email ',
    triggerInfo: 'Triggered when the candidate moved to disqualified state.',
    description:
      'Set up a default interview email template. You can make specific changes for individual job posts later.',
    subjectPlaceHolder: 'Update on your [jobTitle] interview at [companyName]',
    bodyPlaceHolder: `Dear [firstName], 
    
    After careful consideration, we regret to inform you that we won't be proceeding with your application for the [jobTitle] position. We appreciate your interest in [companyName] and wish you the best in your future endeavors."
    
    Best regards,
    [senderName]`,
    trigger: 'Triggered when candidate moved to disqualified state',
  },
  application_recieved: {
    listing: 'Application Received Email',
    heading: 'Application Received Email ',
    triggerInfo: 'Triggered instantly when candidate applied to this job.',
    description:
      'Set up a default interview email template. You can make specific changes for individual job posts later.',
    subjectPlaceHolder: 'Application Received for [jobTitle] at [companyName]',
    bodyPlaceHolder: `Dear [firstName],

    Thank you for applying for the [jobTitle] position at [companyName]. We have received your application and will review it shortly. We'll be in touch with the next steps.

    Best regards,
    [senderName]`,
    trigger: 'Triggered instantly when candidate apply for a job',
  },
  phone_screening: {
    listing: 'Phone Screen Email',
    heading: 'Phone Screen Email',
    triggerInfo: 'Triggered instantly when you move candidate to screening',
    description: 'Set up a default Phone Screening email template',
    subjectPlaceHolder: 'Application Received for [jobTitle] at [companyName]',
    bodyPlaceHolder: `Dear [firstName],

    Thank you for applying for the [jobTitle] position at [companyName]. We have received your application and will review it shortly. We'll be in touch with the next steps.

    Best regards,
    [senderName]`,
    trigger: 'Triggered instantly when you move candidate to screening',
  },
  phonescreen_resend: {
    listing: 'Phone Screen Follow-up Email',
    heading: 'Phone Screen Follow-up Email',
    triggerInfo: 'Triggered for resending the phone screening invite.',
    description: 'Set up a default Phone Screening follow-up email template',
    subjectPlaceHolder: 'Application Received for [jobTitle] at [companyName]',
    bodyPlaceHolder: `Dear [firstName],

Thank you for applying for the [jobTitle] position at [companyName]. We have received your application and will review it shortly. We'll be in touch with the next steps.

Best regards,
[senderName]`,
    trigger: 'Triggered instantly when you move the candidate to screening',
  },
};
