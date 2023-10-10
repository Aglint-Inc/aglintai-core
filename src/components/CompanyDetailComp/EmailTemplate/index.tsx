/* eslint-disable security/detect-non-literal-regexp */
/* eslint-disable security/detect-object-injection */
import {
  Collapse,
  Drawer,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

import { EditEmail, EmailTemplateCard } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import toast from '@/src/utils/toast';

import { debouncedSave } from '../utils';
import AUIButton from '../../Common/AUIButton';
import TipTapAIEditor from '../../Common/TipTapAIEditor';
import UITextField from '../../Common/UITextField';
import UITypography from '../../Common/UITypography';

const EmailTemplate = () => {
  const { recruiter } = useAuthDetails();
  const [open, setOpen] = useState(false);
  const [openTest, setOpenTest] = useState(false);
  const templateEntries = Object.entries(recruiter.email_template);
  const [email, setEmail] = useState({
    first_name: '',
    last_name: '',
    company_name: recruiter?.name,
    job_title: '',
    email: '',
  });
  const [selectedTemplate, setSelectedTemplate] = useState({
    fromName: '',
    name: '',
    body: '',
    default: false,
    subject: '',
  });

  const handleDrawerClose = () => {
    setOpenTest(false);
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

  function fillEmailTemplate(template, email) {
    let filledTemplate = template;

    const placeholders = {
      '[firstName]': email.first_name,
      '[lastName]': email.last_name,
      '[jobTitle]': email.job_title,
      '[companyName]': email.company_name,
    };

    for (const [placeholder, value] of Object.entries(placeholders)) {
      const regex = new RegExp(placeholder.replace(/\[|\]/g, '\\$&'), 'g');
      filledTemplate = filledTemplate.replace(regex, value);
    }

    return filledTemplate;
  }

  const emailHandler = async () => {
    await axios
      .post('/api/sendgrid', {
        fromEmail: `messenger@aglinthq.com`,
        fromName: selectedTemplate?.fromName || recruiter?.name,
        email: email?.email,
        subject: fillEmailTemplate(selectedTemplate.subject, email),
        text: fillEmailTemplate(selectedTemplate.body, email),
      })
      .then((res) => {
        if (res.status === 200 && res.data.data === 'Email sent') {
          toast.success('Mail sent successfully');
        }
      });
  };

  return (
    <>
      {templateEntries.map(([templateName, templateData], ind) => (
        <EmailTemplateCard
          key={ind}
          textEmailTemplateCategory={templateObj[templateName]}
          slotTemplateImage={
            <Stack
              dangerouslySetInnerHTML={{
                __html: templateData.body,
              }}
              sx={{
                gap: '4px',
                p: '16px',
                overflow: 'hidden',
                height: '240px',
                fontSize: '12px',
                color: palette.grey[600],
              }}
            />
          }
          textUsedByCount={''}
          onClickViewEdit={{
            onClick: () => {
              setSelectedTemplate({ ...templateData, name: templateName });
              setOpen(true);
            },
          }}
        />
      ))}
      <Drawer anchor='right' open={open} onClose={handleDrawerClose}>
        <Stack mb={'10px'}>
          <EditEmail
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
            textEmailName={templateObj[selectedTemplate?.name]}
            slotForm={
              <Stack spacing={'20px'}>
                <Stack
                  direction={'row'}
                  sx={{ bgcolor: palette.grey[100], p: 2, borderRadius: '8px' }}
                  alignItems={'center'}
                >
                  <Typography variant='body2'>
                    When you create a new job, this email will be enabled by
                    default in the job editor.
                  </Typography>
                  <Switch
                    size='small'
                    color='info'
                    checked={selectedTemplate.default}
                    onChange={() => {
                      setSelectedTemplate((prev) => ({
                        ...prev,
                        default: !selectedTemplate.default,
                      }));
                    }}
                  />
                </Stack>
                <UITextField
                  labelSize='small'
                  fullWidth
                  label='Sender Name'
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
                      placeholder='Job Description'
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

                <Stack
                  spacing={1}
                  sx={{ bgcolor: palette.grey[100], p: 2, borderRadius: '8px' }}
                >
                  <Typography variant='h5'>Personalise your message</Typography>
                  <Typography variant='caption'>
                    To insert dynamic information, you can use [firstName],
                    [lastName], [companyName] or [jobTitle]
                  </Typography>
                </Stack>

                <Stack
                  sx={{
                    bgcolor: palette.grey[100],
                    p: 2,
                    borderRadius: '8px',
                  }}
                  spacing={2}
                >
                  <Collapse
                    in={openTest}
                    translate='yes'
                    unmountOnExit
                    mountOnEnter
                  >
                    <Stack>
                      <Grid container spacing={1.5}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            margin='none'
                            label='First Name'
                            value={email?.first_name}
                            onChange={(e) => {
                              setEmail((prev) => ({
                                ...prev,
                                first_name: e.target.value,
                              }));
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            margin='none'
                            label='Last Name'
                            value={email?.last_name}
                            onChange={(e) => {
                              setEmail((prev) => ({
                                ...prev,
                                last_name: e.target.value,
                              }));
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            margin='none'
                            label='Job Title'
                            value={email.job_title}
                            onChange={(e) => {
                              setEmail((prev) => ({
                                ...prev,
                                job_title: e.target.value,
                              }));
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            margin='none'
                            label='Company Name'
                            defaultValue={recruiter?.name}
                            onChange={(e) => {
                              setEmail((prev) => ({
                                ...prev,
                                company_name: e.target.value,
                              }));
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            margin='none'
                            label='Email'
                            defaultValue={recruiter?.email}
                            onChange={(e) => {
                              setEmail((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }));
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Stack>
                  </Collapse>
                  <Stack
                    direction={'row'}
                    justifyContent={!openTest ? 'space-between' : 'flex-end'}
                    alignItems={'center'}
                  >
                    {!openTest && (
                      <Typography variant='body2' maxWidth={'250px'}>
                        Fill necessary details and enter your email to test
                      </Typography>
                    )}

                    <AUIButton
                      size='small'
                      variant={openTest ? 'outlined' : 'text'}
                      onClick={() => {
                        setOpenTest(true);
                        if (openTest) {
                          emailHandler();
                        }
                      }}
                    >
                      Test Email
                    </AUIButton>
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

export const templateObj: Record<string, string> = {
  interview: 'Interview Email',
  followup: 'Follow up for Interview',
  rejection: 'Rejection Email',
  application_recieved: 'Application Recieved Email',
};
