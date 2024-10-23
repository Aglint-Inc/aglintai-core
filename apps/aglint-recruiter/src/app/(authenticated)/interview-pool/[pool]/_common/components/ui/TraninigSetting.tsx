import {
  Section,
  SectionActions,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import React from 'react';

import ReverseShadowIcon from '@/authenticated/components/ReverseShadowIcon';
import ShadowIcon from '@/authenticated/components/ShadowIcon';

interface TrainingSettingProps {
  slotButton: React.ReactNode;
  textHeading?: string;
  textShadow?: string;
  textReverseShadow?: string;
  slotApproval?: React.ReactNode;
  isEnable?: boolean;
  isDisable?: boolean;
  isApprovalVisible?: boolean;
}

export function TrainingSetting({
  slotButton,
  textHeading = 'Training is enabled for this module',
  textShadow = 'This is a global text component',
  textReverseShadow = 'This is a global text component',
  slotApproval,
  isEnable = true,
  isDisable = false,
  isApprovalVisible = true,
}: TrainingSettingProps) {
  return (
    <Section>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>Training Settings</SectionTitle>
          <SectionDescription>
            <div>{textHeading}</div>
            {isDisable && (
              <div className='text-sm text-muted-foreground'>
                Enable training from settings to add trainee interviewers and
                track their training progress
              </div>
            )}
          </SectionDescription>
        </SectionHeaderText>
        <SectionActions>{slotButton}</SectionActions>
      </SectionHeader>
      {isEnable && (
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <ShadowIcon className='h-5 w-5 text-muted-foreground' />
            <p className='text-sm'>{textShadow}</p>
          </div>
          <div className='flex items-center gap-2'>
            <ReverseShadowIcon className='h-5 w-5 text-muted-foreground' />
            <p className='text-sm'>{textReverseShadow}</p>
          </div>
          {isApprovalVisible && (
            <div className='flex flex-col gap-1'>
              <p className='mb-2 text-sm text-muted-foreground'>
                Following persons approval is required before moving to
                qualified state:
              </p>
              <div className='flex items-center gap-2'>{slotApproval}</div>
            </div>
          )}
        </div>
      )}
    </Section>
  );
}
