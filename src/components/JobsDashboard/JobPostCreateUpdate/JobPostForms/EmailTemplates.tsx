import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { get } from 'lodash';

import { EmailTemplates } from '@/devlink';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import { templateObj } from '@/src/components/CompanyDetailComp/EmailTemplate';
import { palette } from '@/src/context/Theme/Theme';

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
              {/* {emails.map((email, index) => {
                return (
                  <EmailTemplate
                    excerpt={email.excerpt}
                    title={email.title}
                    path={''}
                    key={index}
                  />
                );
              })} */}
            </Stack>
          </>
        }
      />
    </>
  );
};

export default Emails;

type EmailTemplateParams = {
  title: string;
  excerpt: string;
  path: string;
};
const EmailTemplate = ({ title, excerpt, path }: EmailTemplateParams) => {
  const { jobForm, handleUpdateFormFields } = useJobForm();
  const email = get(
    jobForm,
    `formFields.screeningConfig.screeningEmail.emailTemplates.${path}`,
    {
      subject: '',
      body: '',
    },
  );
  return (
    <>
      <Stack>
        <Stack gap={1}>
          <UITypography type='xLarge' fontBold='normal'>
            {title}
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
            label='Subject'
            defaultValue={email.subject}
            value={email.subject}
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
              initialValue={email.body}
              placeholder={'Email Body'}
              enablAI={false}
            />
          </Box>
        </Stack>
      </Stack>
    </>
  );
};
