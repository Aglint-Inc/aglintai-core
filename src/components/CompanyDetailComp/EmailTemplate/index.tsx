/* eslint-disable security/detect-non-literal-regexp */
/* eslint-disable security/detect-object-injection */
import { Drawer, Stack, Typography } from '@mui/material';
import posthog from 'posthog-js';
import { useState } from 'react';

import { EditEmail, EmailTemplateCards } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import toast from '@/src/utils/toast';

import { debouncedSave } from '../utils';
import TipTapAIEditor from '../../Common/TipTapAIEditor';
import UITextField from '../../Common/UITextField';
import UITypography from '../../Common/UITypography';

const EmailTemplate = () => {
  const { recruiter } = useAuthDetails();
  const [open, setOpen] = useState(false);
  // const [openTest, setOpenTest] = useState(false);
  const isAssesEnabled = posthog.isFeatureEnabled('isAssesmentEnabled');
  const isPhoneScreeningEnabled = posthog.isFeatureEnabled(
    'isPhoneScreeningEnabled',
  );
  const templateEntries = Object.entries(recruiter.email_template).filter(
    (path) => {
      if (path[0] === 'phone_screening' || path[0] === 'phonescreen_resend') {
        return isPhoneScreeningEnabled;
      } else if (path[0] === 'interview' || path[0] === 'interview-resend') {
        return isAssesEnabled;
      } else {
        return true;
      }
    },
  );
  // const [email, setEmail] = useState({
  //   first_name: '',
  //   last_name: '',
  //   company_name: recruiter?.name,
  //   job_title: '',
  //   email: recruiter?.email,
  // });
  const [selectedTemplate, setSelectedTemplate] = useState({
    fromName: '',
    name: '',
    body: '',
    default: false,
    subject: '',
  });

  const handleDrawerClose = () => {
    // setOpenTest(false);
    setOpen(false);
  };

  const handlerSave = () => {
    recruiter.email_template[selectedTemplate.name] = {
      body: selectedTemplate.body,
      default: selectedTemplate.default,
      subject: selectedTemplate.subject,
      fromName: selectedTemplate.fromName,
    };
    debouncedSave({ ...recruiter }, recruiter.id);
    setOpen(false);
    toast.success('Saved successfully');
  };

  return (
    <>
      <Stack gap={2} width={'500px'}>
        {templateEntries.map(([templateName, templateData], ind) => (
          <EmailTemplateCards
            key={ind}
            textDescription={templateObj[templateName].trigger}
            textTitle={templateObj[templateName].listing}
            onClickApplicationRecieved={{
              onClick: () => {
                setSelectedTemplate({ ...templateData, name: templateName });
                setOpen(true);
              },
            }}
          />
        ))}
      </Stack>

      <Drawer anchor='right' open={open} onClose={handleDrawerClose}>
        <Stack mb={'10px'}>
          <EditEmail
            editEmailDescription={
              templateObj[selectedTemplate?.name]?.description
            }
            onClickSaveChanges={{
              onClick: () => {
                handlerSave();
              },
            }}
            onClickClose={{
              onClick: () => {
                handleDrawerClose();
              },
            }}
            textEmailName={templateObj[selectedTemplate?.name]?.heading}
            slotForm={
              <Stack spacing={'20px'}>
                <Stack
                  spacing={1}
                  sx={{ bgcolor: palette.grey[100], p: 2, borderRadius: '8px' }}
                >
                  <Typography variant='h5'>
                    Pro Tip: Customize Your Message
                  </Typography>
                  <Typography variant='body2'>
                    For dynamic content, utilize placeholders like [firstName],
                    [lastName], [companyName], [jobTitle] and [supportLink].
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
        </Stack>
      </Drawer>
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
