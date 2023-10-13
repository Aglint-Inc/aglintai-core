import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { get, isEmpty } from 'lodash';
import { useState } from 'react';

import { EmailTemplates } from '@/devlink';
import AUIButton from '@/src/components/Common/AUIButton';
import MuiPopup from '@/src/components/Common/MuiPopup';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { templateObj } from '@/src/components/CompanyDetailComp/EmailTemplate';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import { fillEmailTemplate } from '@/src/utils/support/supportUtils';
import toast from '@/src/utils/toast';

import { useJobForm } from '../JobPostFormProvider';

const Emails = () => {
  const { jobForm } = useJobForm();
  const emails: EmailTemplateParams[] = Object.keys(
    jobForm.formFields.screeningConfig.screeningEmail.emailTemplates,
  ).map((email) => ({
    title: templateObj[`${email}`],
    excerpt: '',
    path: email,
  }));

  return (
    <>
      <EmailTemplates
        slotEmailTemplates={
          <>
            <Stack gap={3}>
              {emails.map((email) => {
                return (
                  <EmailTemplate
                    key={email.path}
                    path={email.path}
                    title={email.title}
                    excerpt=''
                  />
                );
              })}
            </Stack>
          </>
        }
      />
    </>
  );
};

export default Emails;

type EmailTemplateParams = {
  title: { heading: string; description: string };
  excerpt: string;
  path: string;
};
const EmailTemplate = ({ title, excerpt, path }: EmailTemplateParams) => {
  const { recruiter } = useAuthDetails();
  const { jobForm, handleUpdateFormFields } = useJobForm();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const emailTemplate = get(
    jobForm,
    `formFields.screeningConfig.screeningEmail.emailTemplates.${path}`,
    {
      fromName: '',
      subject: '',
      body: '',
    },
  );
  const [testEmailform, setTestEmailForm] = useState({
    firstName: '',
    lastName: '',
    jobtitle: jobForm.formFields.jobTitle,
    companyName: jobForm.formFields.company,
    email: recruiter.email,
  });
  const [formError, setFormError] = useState({
    firstName: '',
    lastName: '',
    jobtitle: '',
    companyName: '',
    email: '',
  });

  const isformValid = () => {
    let isValid = true;

    if (isEmpty(testEmailform.firstName.trim())) {
      isValid = false;
      setFormError((p) => ({ ...p, firstName: 'Please Enter First Name' }));
    }

    if (isEmpty(testEmailform.jobtitle.trim())) {
      isValid = false;
      setFormError((p) => ({ ...p, jobtitle: 'Please Enter Job Title' }));
    }

    if (isEmpty(testEmailform.email.trim())) {
      isValid = false;
      setFormError((p) => ({ ...p, email: 'Please Enter Email' }));
    }

    if (isEmpty(testEmailform.companyName.trim())) {
      isValid = false;
      setFormError((p) => ({ ...p, companyName: 'Please Enter Company Name' }));
    }

    return isValid;
  };

  const handleSendEmail = async () => {
    try {
      if (!isformValid()) return;
      const payload = {
        company_name: testEmailform.companyName,
        first_name: testEmailform.firstName,
        job_title: testEmailform.jobtitle,
        last_name: testEmailform.lastName,
      };
      await axios.post('/api/sendgrid', {
        fromEmail: `messenger@aglinthq.com`,
        fromName: emailTemplate.fromName,
        email: testEmailform.email,
        subject: fillEmailTemplate(emailTemplate.subject, payload),
        text: fillEmailTemplate(emailTemplate.body, payload),
      });
      setIsFormOpen(false);
      toast.success('Email Sent');
    } catch (err) {
      toast.success('Something went wrong. Please try again');
    }
  };

  return (
    <>
      <Stack direction={'column'}>
        <Stack gap={1}>
          <UITypography type='medium' fontBold='normal'>
            {title.heading}
          </UITypography>
          <UITypography
            type='small'
            fontBold='default'
            color={palette.grey[500]}
          >
            {excerpt}
          </UITypography>
        </Stack>
        <Stack gap={2} py={2}>
          <UITextField
            label='Sender Name'
            placeholder='John Doe'
            value={emailTemplate.fromName}
            onChange={(e) => {
              handleUpdateFormFields({
                path: `screeningConfig.screeningEmail.emailTemplates.${path}.fromName`,
                value: e.target.value,
              });
            }}
          />
          <UITextField
            label='Subject'
            defaultValue={emailTemplate.subject}
            value={emailTemplate.subject}
            onChange={(e) => {
              handleUpdateFormFields({
                path: `screeningConfig.screeningEmail.emailTemplates.${path}.subject`,
                value: e.target.value,
              });
            }}
          />
          <Box border={`1px solid ${palette.grey[200]}`} borderRadius={'5px'}>
            <TipTapAIEditor
              handleChange={(s) => {
                handleUpdateFormFields({
                  path: `screeningConfig.screeningEmail.emailTemplates.${path}.body`,
                  value: s,
                });
              }}
              initialValue={emailTemplate.body}
              placeholder={'Email Body'}
              enablAI={false}
            />
          </Box>
        </Stack>
        <Stack direction={'row'} justifyContent={'flex-end'}>
          <AUIButton
            variant='outlined'
            onClick={() => {
              setIsFormOpen(true);
            }}
          >
            Test Email
          </AUIButton>
        </Stack>
      </Stack>
      <MuiPopup
        props={{
          open: isFormOpen,
          maxWidth: 'sm',
          fullWidth: true,
          sx: { backgroundColor: 'white' },
          onClose: () => {
            setIsFormOpen(false);
          },
        }}
      >
        <DialogTitle sx={{ background: '#fff' }}>
          <UITypography fontBold='normal' type='large'>
            Test {title}
          </UITypography>
        </DialogTitle>
        <DialogContent>
          <Stack gap={2}>
            <Grid container columnGap={1} rowGap={1}>
              <Grid item sm={5.9}>
                <UITextField
                  label='First Name'
                  fullWidth
                  placeholder='John'
                  error={Boolean(formError.firstName)}
                  helperText={formError.firstName}
                  value={testEmailform.firstName}
                  onChange={(e) => {
                    setFormError((p) => ({ ...p, firstName: '' }));
                    setTestEmailForm((p) => ({
                      ...p,
                      firstName: e.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item sm={5.9}>
                <UITextField
                  label='Last Name'
                  placeholder='Doe'
                  fullWidth
                  error={Boolean(formError.lastName)}
                  helperText={formError.lastName}
                  value={testEmailform.lastName}
                  onChange={(e) => {
                    setFormError((p) => ({ ...p, lastName: '' }));

                    setTestEmailForm((p) => ({
                      ...p,
                      lastName: e.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item sm={5.9}>
                <UITextField
                  label='Job title'
                  fullWidth
                  error={Boolean(formError.jobtitle)}
                  helperText={formError.jobtitle}
                  value={testEmailform.jobtitle}
                  defaultValue={jobForm.formFields.jobTitle}
                  onChange={(e) => {
                    setFormError((p) => ({ ...p, jobtitle: '' }));

                    setTestEmailForm((p) => ({
                      ...p,
                      jobtitle: e.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item sm={5.9}>
                <UITextField
                  label='Company Name'
                  fullWidth
                  error={Boolean(formError.companyName)}
                  helperText={formError.companyName}
                  value={testEmailform.companyName}
                  defaultValue={jobForm.formFields.company}
                  onChange={(e) => {
                    setFormError((p) => ({ ...p, companyName: '' }));

                    setTestEmailForm((p) => ({
                      ...p,
                      companyName: e.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item sm={12}>
                <UITextField
                  label='Email'
                  fullWidth
                  error={Boolean(formError.email)}
                  helperText={formError.email}
                  value={testEmailform.email}
                  defaultValue={recruiter.email}
                  onChange={(e) => {
                    setFormError((p) => ({ ...p, email: '' }));

                    setTestEmailForm((p) => ({
                      ...p,
                      email: e.target.value,
                    }));
                  }}
                />
              </Grid>
            </Grid>
            <Stack justifyContent={'flex-end'} direction={'row'}>
              <AUIButton onClick={handleSendEmail}>Send</AUIButton>
            </Stack>
          </Stack>
        </DialogContent>
      </MuiPopup>
    </>
  );
};
