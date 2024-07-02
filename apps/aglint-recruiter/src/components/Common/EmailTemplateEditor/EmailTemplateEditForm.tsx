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
  showSubject?: boolean;
  showSender?: boolean;
}

export default function EmailTemplateEditForm({
  senderNameChange,
  emailSubjectChange,
  emailBodyChange,
  selectedTemplate,
  disabled = false,
  showSender = true,
  showSubject = true,
}: Props) {
  const options = ['{{organizerName}}', '{{companyName}}', 'Aglint Ai'];
  return (
    <Stack spacing={'var(--space-5)'}>
      {showSender && (
        <Stack spacing={1}>
          <UITypography type='small' fontBold='normal'>
            Sender Name
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
              placeholder={'subject'}
              singleLine={true}
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
          Email Body
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
            maxHeight='250px'
            height='360px'
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
