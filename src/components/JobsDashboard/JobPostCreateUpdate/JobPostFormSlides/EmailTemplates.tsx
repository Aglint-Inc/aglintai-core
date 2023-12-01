import { Drawer } from '@mui/material';
import { Collapse } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { EditEmail, EmailTemplateCards, EmailTemplatesStart } from '@/devlink';
import AUIButton from '@/src/components/Common/AUIButton';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { templateObj } from '@/src/components/CompanyDetailComp/EmailTemplate';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import { fillEmailTemplate } from '@/src/utils/support/supportUtils';
import toast from '@/src/utils/toast';

import JobPublishButton from '../JobForm/PublishButton';
import { EmailDetails, useJobForm } from '../JobPostFormProvider';

const Emails = () => {
  const { jobForm } = useJobForm();
  const router = useRouter();

  const [editTemplate, setEditTemplate] = useState('');
  const emails: EmailTemplateParams[] = Object.keys(
    jobForm.formFields.screeningEmail.emailTemplates,
  ).map((email) => ({
    title: templateObj[`${email}`],
    excerpt: '',
    path: email,
  }));

  return (
    <>
      <EmailTemplatesStart
        slotEmailTemplateCards={
          <>
            {emails.map((email) => {
              return (
                <EmailTemplateCards
                  key={email.path}
                  textTitle={email.title.heading}
                  textDescription={templateObj[email.path].triggerInfo}
                  onClickEdit={{
                    onClick: () => {
                      setEditTemplate(email.path);
                    },
                  }}
                  onClickApplicationRecieved={{
                    onClick: () => {
                      setEditTemplate(email.path);
                    },
                  }}
                />
              );
            })}
          </>
        }
        isAddJob={jobForm.formType == 'new'}
        isProceedDisable={false}
        // onClickDone={{
        //   onClick: () => {
        //     router.replace('/jobs');
        //   },
        // }}
        slotButtonPrimaryRegular={
          <>{jobForm.formType === 'new' && <JobPublishButton />}</>
        }
        slotBasicButton={
          <>
            <AUIButton
              variant='text'
              onClick={() => {
                router.replace('/jobs');
              }}
            >
              Save To Draft
            </AUIButton>
          </>
        }
      />

      <EditEmailDrawer
        templatePath={editTemplate}
        setTemplatePath={setEditTemplate}
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
            toast.success('Mail sent successfully');
          }
        });
    } catch (err) {
      toast.error('Something went wrong please try again');
    }
  };

  return (
    <>
      <Drawer
        anchor='right'
        open={Boolean(templatePath)}
        onClose={handleDrawerClose}
      >
        {Boolean(templatePath) && (
          <Stack mb={'10px'}>
            <EditEmail
              editEmailDescription={
                templateObj[String(templatePath)]?.description
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
                      [firstName], [lastName], [companyName], and [jobTitle].
                    </Typography>
                  </Stack>
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
                      <Typography variant='body2'>
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
      </Drawer>
    </>
  );
};
