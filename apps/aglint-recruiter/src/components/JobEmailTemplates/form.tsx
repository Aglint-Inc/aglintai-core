/* eslint-disable security/detect-object-injection */
import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import { FC, memo } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';

import TipTapAIEditor from '../Common/TipTapAIEditor';
import UITextField from '../Common/UITextField';
import UITypography from '../Common/UITypography';
import { WarningSvg } from '../JobCreate/form';
import { AllForms } from '.';

type Form = AllForms['application_received'];

export const JobEmailTemplateForms: FC<MetaFormProps> = ({
  fields,
  selection,
  handleChange,
  disabled = false,
}) => {
  const {
    recruiter: { email_template },
  } = useAuthDetails();
  const template = email_template[selection as keyof typeof email_template];
  const sender_name = (
    <SenderName
      name='fromName'
      value={fields.fromName}
      onChange={handleChange}
      disabled={disabled}
    />
  );

  const email_subject = (
    <EmailSubject
      name='subject'
      value={fields.subject}
      onChange={handleChange}
      disabled={disabled}
    />
  );

  const email_body = (
    <EmailBody
      name='body'
      value={fields.body}
      onChange={handleChange}
      template={template}
      disabled={disabled}
    />
  );

  const forms = (
    <Stack spacing={'20px'}>
      {sender_name}
      {email_subject}
      {email_body}
    </Stack>
  );

  return forms;
};

const SenderName: FC<MetaForms> = memo(
  ({ name, value, onChange, disabled = false }) => {
    return (
      <UITextField
        label={'Sender Name'}
        disabled={disabled}
        name={name}
        secondaryText={`This name appears as the "From" name in emails to candidates. Choose a representative name for your company or recruiter.`}
        placeholder={'Sender Name'}
        value={value.value}
        error={value.error.value}
        helperText={value.error.helper}
        onChange={(e) => onChange(name, e.target.value)}
      />
    );
  },
);
SenderName.displayName = 'SenderName';

const EmailSubject: FC<MetaForms> = memo(
  ({ name, value, onChange, disabled = false }) => {
    return (
      <UITextField
        label={'Email Subject'}
        disabled={disabled}
        name={name}
        placeholder={'Email Subject'}
        value={value.value}
        error={value.error.value}
        helperText={value.error.helper}
        onChange={(e) => onChange(name, e.target.value)}
        minRows={1}
        multiline
      />
    );
  },
);
EmailSubject.displayName = 'EmailSubject';

const EmailBody: FC<MetaForms> = memo(
  ({ name, value, onChange, template, disabled = false }) => {
    return (
      <Stack>
        <UITypography type='small'>Email Body</UITypography>
        <Stack
          sx={{
            mt: '8px',
            border: '1px solid',
            borderColor: value.error.value
              ? palette.red[500]
              : palette.grey[300],
            borderRadius: '4px',
          }}
        >
          <TipTapAIEditor
            disabled={disabled}
            initialValue={value.value}
            handleChange={(e) => onChange(name, e)}
            placeholder={template.body}
          />
        </Stack>
        {value.error.value && (
          <Stack
            alignItems={'center'}
            direction={'row'}
            color={palette.red[500]}
          >
            <WarningSvg />
            {value.error.helper}
          </Stack>
        )}
      </Stack>
    );
  },
);
EmailBody.displayName = 'EmailBody';

type MetaForms = {
  name: keyof Form;
  value: Form[keyof Form];
  // eslint-disable-next-line no-unused-vars
  onChange: (name: keyof Form, value: string) => void;
  template?: DatabaseTable['recruiter']['email_template']['application_received'];
  disabled?: boolean;
};

type MetaFormProps = {
  fields: Form;
  selection: keyof DatabaseTable['recruiter']['email_template'];
  // eslint-disable-next-line no-unused-vars
  handleChange: (name: keyof Form, value: string) => void;
  disabled?: boolean;
};
