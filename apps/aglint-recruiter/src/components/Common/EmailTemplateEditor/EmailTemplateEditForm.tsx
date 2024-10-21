import { type DatabaseTableInsert } from '@aglint/shared-types';
import Typography from '@components/typography';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import React from 'react';

import TipTapAIEditor from '../TipTapAIEditor';

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
    <div className='space-y-5'>
      {showSender && (
        <div className='space-y-2'>
          <Typography type='small' fontBold='normal'>
            From
          </Typography>
          <p className='text-sm text-muted-foreground'>
            This name appears as the &quot;From&quot; name in emails to
            candidates. Choose a representative name for your company or
            recruiter.
          </p>
          <Select
            defaultValue={selectedTemplate?.from_name ?? undefined}
            disabled={disabled}
            onValueChange={senderNameChange}
          >
            <SelectTrigger className='w-full border border-border text-primary'>
              <SelectValue placeholder='Select sender name' />
            </SelectTrigger>
            <SelectContent className='border border-border text-primary'>
              {options.length === 0 ? (
                <div className='cursor-default px-2 py-2 italic text-muted-foreground'>
                  No options available
                </div>
              ) : (
                options.map((value, idx) => (
                  <SelectItem key={idx} value={value}>
                    <span className='flex rounded-sm bg-primary/20 px-1 pb-[3px] text-primary'>
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
          <Typography type='small' fontBold='normal'>
            Subject
          </Typography>
          <div className='mt-2 rounded-md'>
            <TipTapAIEditor
              enablAI={false}
              toolbar={false}
              height='47px'
              // maxHeight='46px'
              onfocus={onFocus}
              onblur={onBlur}
              placeholder={'subject'}
              singleLine={true}
              isSize={false}
              padding={1}
              editor_type='email'
              template_type={selectedTemplate.type}
              handleChange={emailSubjectChange}
              initialValue={selectedTemplate?.subject ?? undefined}
            />
          </div>
        </div>
      )}

      <div className='space-y-2'>
        <Typography type='small' fontBold='normal'>
          Message
        </Typography>
        <div className='mt-2'>
          <TipTapAIEditor
            enablAI={false}
            placeholder={''}
            onfocus={onFocus}
            onblur={onBlur}
            padding={'10px'}
            editor_type='email'
            template_type={selectedTemplate.type}
            handleChange={emailBodyChange}
            initialValue={selectedTemplate?.body ?? undefined}
            height='450px'
            maxHeight='450px'
          />
        </div>
      </div>
    </div>
  );
}
