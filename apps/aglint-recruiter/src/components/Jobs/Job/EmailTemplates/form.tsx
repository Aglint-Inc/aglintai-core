import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import { FC } from 'react';

import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';

export const JobEmailTemplateForms: FC<MetaFormProps> = ({
  handleChange,
  disabled = false,
  editTemp,
}) => {
  const sender_name = (
    <UITextField
      label={'Sender Name'}
      disabled={disabled}
      secondaryText={`This name appears as the "From" name in emails to candidates. Choose a representative name for your company or recruiter.`}
      placeholder={'Sender Name'}
      value={editTemp.from_name}
      error={false}
      helperText={''}
      onChange={(e) => {
        handleChange({ ...editTemp, from_name: e.target.value });
      }}
    />
  );

  const email_subject = (
    <UITextField
      label={'Email Subject'}
      disabled={disabled}
      placeholder={'Email Subject'}
      value={editTemp.subject}
      error={false}
      helperText={''}
      onChange={(e) => {
        handleChange({ ...editTemp, subject: e.target.value });
      }}
      minRows={1}
      multiline
    />
  );

  const email_body = (
    <Stack>
      <UITypography type='small'>Email Body</UITypography>
      <Stack
        sx={{
          mt: 'var(--space-2)',
          border: '1px solid',
          borderColor: 'var(--success-6)',
          // borderColor: true ? 'var(--success-6)' : 'var(--neutral-6)',
          borderRadius: 'var(--radius-2)',
        }}
      >
        <TipTapAIEditor
          disabled={disabled}
          initialValue={editTemp.body}
          handleChange={(s) => {
            handleChange({ ...editTemp, body: s });
          }}
          placeholder={editTemp.body}
          editor_type='email'
          template_type={editTemp.type}
        />
      </Stack>
      {/* {true && (
        <Stack
          alignItems={'center'}
          direction={'row'}
          color={'var(--error-11)'}
        >
          <WarningSvg />
        </Stack>
      )} */}
    </Stack>
  );

  const forms = (
    <Stack spacing={'var(--space-5)'}>
      {sender_name}
      {email_subject}
      {email_body}
    </Stack>
  );

  return forms;
};

type MetaFormProps = {
  editTemp: DatabaseTable['job_email_template'];
  // eslint-disable-next-line no-unused-vars
  handleChange: (editTemp: DatabaseTable['job_email_template']) => void;
  disabled?: boolean;
};
