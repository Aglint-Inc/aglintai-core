import { Stack } from '@mui/material';
import { FC, memo } from 'react';

import { EditEmail } from '@/devlink/EditEmail';
import { palette } from '@/src/context/Theme/Theme';
import { Job } from '@/src/queries/job/types';

import TipTapAIEditor from '../Common/TipTapAIEditor';
import UITextField from '../Common/UITextField';
import UITypography from '../Common/UITypography';
import { WarningSvg } from '../JobCreate/form';
import { AllForms } from '.';
import { templateObj } from './utils';

type Form = AllForms['application_received'];

export const JobEmailTemplateForms: FC<MetaFormProps> = ({
  fields,
  selection,
  handleChange,
}) => {
  const template = templateObj[selection as keyof typeof templateObj];
  const sender_name = (
    <SenderName
      name='fromName'
      value={fields.fromName}
      onChange={handleChange}
    />
  );

  const email_subject = (
    <EmailSubject
      name='subject'
      value={fields.subject}
      onChange={handleChange}
    />
  );

  const email_body = (
    <EmailBody
      name='body'
      value={fields.body}
      onChange={handleChange}
      template={template}
    />
  );

  const forms = (
    <Stack spacing={'20px'}>
      {sender_name}
      {email_subject}
      {email_body}
    </Stack>
  );

  return (
    <EditEmail
      editEmailDescription={template.descriptionInJob}
      textEmailName={template.heading}
      slotForm={forms}
      isSaveChangesButtonVisible={false}
    />
  );
};

const SenderName: FC<MetaForms> = memo(({ name, value, onChange }) => {
  return (
    <UITextField
      label={'Sender Name'}
      name={name}
      secondaryText={`This name appears as the "From" name in emails to candidates. Choose a representative name for your company or recruiter.`}
      placeholder={'Sender Name'}
      value={value.value}
      error={value.error.value}
      helperText={value.error.helper}
      onChange={(e) => onChange(name, e.target.value)}
    />
  );
});
SenderName.displayName = 'SenderName';

const EmailSubject: FC<MetaForms> = memo(({ name, value, onChange }) => {
  return (
    <UITextField
      label={'Email Subject'}
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
});
EmailSubject.displayName = 'EmailSubject';

const EmailBody: FC<MetaForms> = memo(({ name, value, onChange, template }) => {
  return (
    <Stack>
      <UITypography type='small'>Email Body</UITypography>
      <Stack
        sx={{
          mt: '8px',
          border: '1px solid',
          borderColor: value.error.value ? palette.red[500] : palette.grey[300],
          borderRadius: '4px',
        }}
      >
        <TipTapAIEditor
          initialValue={value.value}
          handleChange={(e) => onChange(name, e)}
          placeholder={template.bodyPlaceHolder}
        />
      </Stack>
      {value.error.value && (
        <Stack alignItems={'center'} direction={'row'} color={palette.red[500]}>
          <WarningSvg />
          {value.error.helper}
        </Stack>
      )}
    </Stack>
  );
});
EmailBody.displayName = 'EmailBody';

type MetaForms = {
  name: keyof Form;
  value: Form[keyof Form];
  // eslint-disable-next-line no-unused-vars
  onChange: (name: keyof Form, value: string) => void;
  template?: (typeof templateObj)['application_received'];
};

type MetaFormProps = {
  fields: Form;
  selection: keyof Job['email_template'];
  // eslint-disable-next-line no-unused-vars
  handleChange: (name: keyof Form, value: string) => void;
};
