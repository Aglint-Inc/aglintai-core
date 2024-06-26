import { DatabaseTable } from '@aglint/shared-types';
import { MenuItem, Select, Stack, Typography } from '@mui/material';
import { FC } from 'react';

import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import UITypography from '@/src/components/Common/UITypography';

const options = ['{{recruiterName}}', '{{companyName}}'];

export const JobEmailTemplateForms: FC<MetaFormProps> = ({
  handleChange,
  disabled = false,
  editTemp,
}) => {
  const sender_name = (
    <>
      <Stack spacing={1}>
        <UITypography type='small' fontBold='normal'>
          Sender Name
        </UITypography>
        <Stack>
          {`This name appears as the "From" name in emails to candidates. Choose a representative name for your company or recruiter.
                            `}
        </Stack>
        <Select
          defaultValue={editTemp.from_name}
          onChange={(e) => {
            handleChange({ ...editTemp, from_name: e.target.value });
          }}
          disabled={disabled}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              border: '1px solid #DAD9D6',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: '1px solid #DAD9D6',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: '1px solid #DAD9D6',
            },
          }}
        >
          {options.length === 0 ? (
            <Stack
              px={1}
              style={{
                fontStyle: 'italic',
                color: 'var(--neutral-9)',
                cursor: 'default',
              }}
            >
              No options available
            </Stack>
          ) : (
            options.map((value, idx) => (
              <MenuItem
                key={idx}
                value={value}
                sx={{
                  backgroundColor: '#f7f7f7', // normal state background color
                  '&:hover': {
                    backgroundColor: '#ededed', // hover state background color
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#e3e3e3', // selected state background color
                    '&:hover': {
                      backgroundColor: '#d6d6d6', // maintain selected state color on hover
                    },
                  },
                }}
              >
                <Typography
                  sx={{
                    backgroundColor: '#f7ebfc',
                    paddingLeft: '3px',
                    paddingRight: '3px',
                    paddingBottom: '3px',
                    color: '#B552E2',
                    borderRadius: '2px',
                    width: 'fit-content',
                  }}
                >
                  {value}
                </Typography>
              </MenuItem>
            ))
          )}
        </Select>
      </Stack>
    </>
  );

  const email_subject = (
    <>
      <Stack>
        <UITypography type='small' fontBold='normal'>
          Email Subject
        </UITypography>
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
            toolbar={false}
            placeholder={'Email Subject'}
            singleLine={true}
            padding={1}
            disabled={disabled}
            editor_type='email'
            template_type={editTemp.type}
            handleChange={(html) => {
              const text = html;
              handleChange({ ...editTemp, subject: text });
            }}
            initialValue={editTemp.subject}
          />
        </Stack>
      </Stack>
    </>
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
