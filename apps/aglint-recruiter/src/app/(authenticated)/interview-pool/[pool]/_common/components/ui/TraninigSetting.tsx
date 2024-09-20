import { Card, CardContent } from '@components/ui/card';
import { RotateCcw, RotateCw } from 'lucide-react';
import React from 'react';

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
    <Card className='flex flex-col p-4'>
      <div className='flex items-start justify-between p-0'>
        <div className='flex flex-col gap-1'>
          <p>{textHeading}</p>
          {isDisable && (
            <p>
              Enable training from settings to add trainee interviewers and
              track their training progress
            </p>
          )}
        </div>
        <div>{slotButton}</div>
      </div>
      {isEnable && (
        <CardContent className='mt-4 flex flex-col gap-4 p-0'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <RotateCw className='h-4 w-4' />
              <p>{textShadow}</p>
            </div>
            <div className='flex items-center gap-2'>
              <RotateCcw className='h-4 w-4' />
              <p>{textReverseShadow}</p>
            </div>
          </div>
          {isApprovalVisible && (
            <div className='flex flex-col gap-1'>
              <p>
                Following persons approval is required before moving to
                qualified state:
              </p>
              <div className='flex items-center gap-2'>{slotApproval}</div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
