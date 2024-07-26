import { DatabaseTableInsert } from '@aglint/shared-types';
import { MenuItem, Select, Stack, Typography } from '@mui/material';
import React from 'react';

import TipTapAIEditor from '../TipTapAIEditor';
import UITypography from '../UITypography';

interface Props {
  senderNameChange: any;
  emailSubjectChange: any;
  emailBodyChange: any;
  selectedTemplate:
    | DatabaseTableInsert['company_email_template']
    | DatabaseTableInsert['job_email_template'];
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  showSubject?: boolean;
  showSender?: boolean;
  isJobTemplate?: boolean;
}

export default function EmailTemplateEditForm({
  senderNameChange,
  emailSubjectChange,
  emailBodyChange,
  selectedTemplate,
  disabled = false,
  onFocus,
  onBlur,
  showSender = true,
  showSubject = true,
  isJobTemplate = false,
}: Props) {
  const options = isJobTemplate
    ? ['{{companyName}}', 'Aglint Ai']
    : ['{{organizerName}}', '{{companyName}}', 'Aglint Ai'];

  return (
    <Stack spacing={'var(--space-5)'}>
      {showSender && (
        <Stack>
          <UITypography type='small' fontBold='normal'>
            From
          </UITypography>
          <Stack>
            {`This name appears as the "From" name in emails to
  candidates. Choose a representative name for your
  company or recruiter.
  `}
          </Stack>
          <Select
            defaultValue={selectedTemplate?.from_name}
            disabled={disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={senderNameChange}
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
      )}

      {showSubject && (
        <Stack>
          <UITypography type='small' fontBold='normal'>
            Subject
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
              onfocus={onFocus}
              onblur={onBlur}
              placeholder={'subject'}
              singleLine={true}
              isSize={false}
              padding={1}
              editor_type='email'
              template_type={selectedTemplate.type}
              handleChange={emailSubjectChange}
              initialValue={selectedTemplate?.subject}
            />
          </Stack>
        </Stack>
      )}

      <Stack>
        <UITypography type='small' fontBold='normal'>
          Message
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
            placeholder={''}
            onfocus={onFocus}
            onblur={onBlur}
            // height='360px'
            // minHeight='360px'
            editor_type='email'
            template_type={selectedTemplate.type}
            handleChange={emailBodyChange}
            initialValue={selectedTemplate.body}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
