import { type DatabaseTableInsert } from '@aglint/shared-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
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
    <div className='space-y-[var(--space-5)]'>
      {showSender && (
        <div className='space-y-2'>
          <UITypography type='small' fontBold='normal'>
            From
          </UITypography>
          <p className='text-sm text-gray-600'>
            This name appears as the &quot;From&quot; name in emails to
            candidates. Choose a representative name for your company or
            recruiter.
          </p>
          <Select
            defaultValue={selectedTemplate?.from_name}
            disabled={disabled}
            onValueChange={senderNameChange}
          >
            <SelectTrigger className='w-full border-[#DAD9D6]'>
              <SelectValue placeholder='Select sender name' />
            </SelectTrigger>
            <SelectContent>
              {options.length === 0 ? (
                <div className='cursor-default px-2 py-1 italic text-[var(--neutral-9)]'>
                  No options available
                </div>
              ) : (
                options.map((value, idx) => (
                  <SelectItem key={idx} value={value}>
                    <span className='rounded-sm bg-[#f7ebfc] px-1 pb-[3px] text-[#B552E2]'>
                      {value}
                    </span>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
      )}

      {showSubject && (
        <div className='space-y-2'>
          <UITypography type='small' fontBold='normal'>
            Subject
          </UITypography>
          <div className='mt-2 rounded-[var(--radius-2)] border border-[var(--neutral-6)]'>
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
          </div>
        </div>
      )}

      <div className='space-y-2'>
        <UITypography type='small' fontBold='normal'>
          Message
        </UITypography>
        <div className='mt-2 rounded-[var(--radius-2)] border border-[var(--neutral-6)]'>
          <TipTapAIEditor
            enablAI={false}
            placeholder={''}
            onfocus={onFocus}
            onblur={onBlur}
            minHeight='360px'
            height='330px'
            padding={'10px'}
            editor_type='email'
            template_type={selectedTemplate.type}
            handleChange={emailBodyChange}
            initialValue={selectedTemplate.body}
          />
        </div>
      </div>
    </div>
  );
}
