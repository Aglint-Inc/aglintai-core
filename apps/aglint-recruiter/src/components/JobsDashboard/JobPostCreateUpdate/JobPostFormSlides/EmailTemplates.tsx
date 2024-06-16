import { Collapse } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { get } from 'lodash';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import { useState } from 'react';

import { EditEmail } from '@/devlink/EditEmail';
import { EmailTemplateCards } from '@/devlink/EmailTemplateCards';
import { EmailTemplatesStart } from '@/devlink/EmailTemplatesStart';
import { JobEditWarning } from '@/devlink/JobEditWarning';
import { JobWarningList } from '@/devlink/JobWarningList';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import AUIButton from '@/src/components/Common/AUIButton';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { templateObj } from '@/src/components/CompanyDetailComp/EmailTemplate';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { Job } from '@/src/queries/jobs/types';
import { fillEmailTemplate } from '@/src/utils/support/supportUtils';
import toast from '@/src/utils/toast';

import { EmailDetails, useJobForm } from '../JobPostFormProvider';

const Emails = () => {
  const { jobForm, formWarnings } = useJobForm();
  const [isLoading, setIsLoading] = useState(false);
  const isJobMarketingEnabled = useFeatureFlagEnabled('isJobMarketingEnabled');
  const emails: EmailTemplateParams[] = emailTempKeys
    .filter((path) => {
      if (path === 'phone_screening' || path === 'phone_screening_resend') {
        return jobForm.formFields.isPhoneScreenEnabled;
      }
      if (path === 'application_received') {
        return isJobMarketingEnabled;
      } else {
        return true;
      }
    })
    .map((email) => ({
      title: templateObj[`${email}`],
      excerpt: '',
      path: email,
    }));
  const [editTemplate, setEditTemplate] = useState(emails[0].path);

  const handleChangeTemplate = (path: string) => {
    setEditTemplate(path);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      <EmailTemplatesStart
        isWarningVisible={formWarnings.templates.err.length > 0}
        slotWarning={
          <>
            <JobEditWarning
              slotWarningList={
                <>
                  {formWarnings.templates.err.map((er, index) => (
                    <JobWarningList key={index} textWarning={er} />
                  ))}
                </>
              }
            />
          </>
        }
        slotEmailTemplateCards={
          <>
            {emails.map((email) => {
              return (
                <EmailTemplateCards
                  key={email.path}
                  textTitle={email.title.listing}
                  textDescription={templateObj[email.path].triggerInfo}
                  isActive={editTemplate === email.path}
                  onClickEdit={{
                    onClick: () => {
                      handleChangeTemplate(email.path);
                    },
                  }}
                  onClickApplicationRecieved={{
                    onClick: () => {
                      handleChangeTemplate(email.path);
                    },
                  }}
                />
              );
            })}
          </>
        }
        slotEmailDetails={
          <>
            {isLoading && (
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
            {!isLoading && (
              <EditEmailDrawer
                templatePath={editTemplate}
                setTemplatePath={setEditTemplate}
              />
            )}
          </>
        }
      />
    </>
  );
};

export default Emails;

type EmailTemplateParams = {
  title: { heading: string; listing: string; description: string };
  excerpt: string;
  path: string;
};

const EditEmailDrawer = ({ templatePath, setTemplatePath }) => {
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const { recruiter } = useAuthDetails();
  const [openTest, setOpenTest] = useState(false);
  const [email, setEmail] = useState({
    first_name: '',
    last_name: '',
    job_title: '',
    email: '',
    company_name: recruiter.name,
  });
  const handleDrawerClose = () => {
    setTemplatePath('');
  };

  const template = get(
    jobForm.formFields,
    `screeningEmail.emailTemplates.${templatePath}`,
    {
      fromName: '',
      body: '',
      subject: '',
    },
  ) as EmailDetails;

  const emailHandler = async () => {
    if (
      !email.first_name ||
      !email.last_name ||
      !email.job_title ||
      !email.company_name ||
      !email.email ||
      !template.body ||
      !template.subject ||
      !template.fromName
    ) {
      toast.error('Please input required Fields');
    }

    try {
      await axios
        .post('/api/sendgrid', {
          fromEmail: `messenger@aglinthq.com`,
          fromName: template.fromName || recruiter?.name,
          email: email?.email,
          subject: fillEmailTemplate(template.subject, email),
          text: fillEmailTemplate(template.body, email),
        })
        .then((res) => {
          if (res.status === 200 && res.data.data === 'Email sent') {
            toast.success('Mail sent successfully.');
          }
        });
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      {Boolean(templatePath) && (
        <Stack mb={'var(--space-2)'}>
          <EditEmail
            editEmailDescription={
              templateObj[String(templatePath)]?.descriptionInJob
            }
            onClickSaveChanges={{
              onClick: () => {
                // handlerSave();
              },
            }}
            onClickClose={{
              onClick: () => {
                handleDrawerClose();
              },
            }}
            textEmailName={templateObj[String(templatePath)]?.heading}
            slotForm={
              <Stack spacing={'var(--space-5)'}>
                <UITextField
                  labelSize='small'
                  fullWidth
                  label='Sender Name'
                  secondaryText={`This name appears as the "From" name in emails to candidates. Choose a representative name for your company or recruiter.`}
                  value={template.fromName}
                  onChange={(e) => {
                    handleUpdateFormFields({
                      path: `screeningEmail.emailTemplates.${templatePath}.fromName`,
                      value: e.target.value,
                    });

                    // setSelectedTemplate((prev) => ({
                    //   ...prev,
                    //   fromName: e.target.value,
                    // }));
                  }}
                />
                <UITextField
                  labelSize='small'
                  fullWidth
                  placeholder={
                    templateObj[String(templatePath)].subjectPlaceHolder
                  }
                  label='Email Subject'
                  value={template.subject}
                  onChange={(e) => {
                    handleUpdateFormFields({
                      path: `screeningEmail.emailTemplates.${templatePath}.subject`,
                      value: e.target.value,
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
                    <TipTapAIEditor
                      enablAI={false}
                      placeholder={
                        templateObj[String(templatePath)].bodyPlaceHolder
                      }
                      handleChange={(html) => {
                        handleUpdateFormFields({
                          path: `screeningEmail.emailTemplates.${templatePath}.body`,
                          value: html,
                        });
                      }}
                      initialValue={template.body}
                    />
                  </Stack>
                </Stack>
              </Stack>
            }
            slotBottom={
              <Stack
                sx={{
                  bgcolor: 'var(--neutral-1)',
                  p: 2,
                  borderRadius: 'var(--radius-4)',
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
                          value={email?.email}
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
                  justifyContent={!openTest ? 'space-between' : 'flex-end'}
                >
                  {!openTest && (
                    <Typography variant='body1'>
                      See it in Action: Request a Test Mail Input the name and
                      job title, then use your email to see the feature
                      firsthand.
                    </Typography>
                  )}
                  <Stack direction={'row'} justifyContent={'flex-end'}>
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
                      Request a Test Mail
                    </AUIButton>
                  </Stack>
                </Stack>
              </Stack>
            }
            isRequestTestMailVisible={false}
            isSaveChangesButtonVisible={false}
          />
        </Stack>
      )}
    </>
  );
};

export const emailTempKeys: (keyof Job['email_template'])[] = [
  'application_received',
  'phone_screening',
  'phone_screening_resend',
  'interview',
  'interview_resend',
  'rejection',
];
