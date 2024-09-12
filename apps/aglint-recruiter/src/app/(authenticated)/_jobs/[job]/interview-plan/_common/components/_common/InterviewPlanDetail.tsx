import { cn } from '@lib/utils';
import { ExternalLink, Hourglass, UserRound, Users } from 'lucide-react';
import React from 'react';

import UITypography from '@/components/Common/UITypography';

export interface InterviewPlanDetailProps {
  className?: string;
  textModuleName?: React.ReactNode;
  isDebriefIconVisible?: boolean;
  isOnetoOneIconVisible?: boolean;
  isPanelIconVisible?: boolean;
  textDuration?: React.ReactNode;
  slotPlatformIcon?: React.ReactNode;
  textPlatformName?: React.ReactNode;
  textLink?: React.ReactNode;
  textSelected?: React.ReactNode;
  slotInterviewers?: React.ReactNode;
  onClickLink?: () => void;
  isBreakCardVisible?: boolean;
  slotBreakCard?: React.ReactNode;
  isAddCardVisible?: boolean;
  slotAddScheduleCard?: React.ReactNode;
  slotButtons?: React.ReactNode;
}

export function InterviewPlanDetail({
  className,
  textModuleName,
  isDebriefIconVisible = false,
  isOnetoOneIconVisible = false,
  isPanelIconVisible = false,
  textDuration,
  slotPlatformIcon,
  textPlatformName,
  textLink,
  textSelected,
  slotInterviewers,
  onClickLink,
  isBreakCardVisible = false,
  slotBreakCard,
  isAddCardVisible = false,
  slotAddScheduleCard,
  slotButtons,
}: InterviewPlanDetailProps) {
  return (
    <div className={cn('relative', className)}>
      <div className='relative flex flex-col gap-2 p-4 border border-neutral-200 rounded-lg bg-white'>
        <div className='flex items-center gap-1'>
          <div className='flex gap-1'>
            {isDebriefIconVisible && <Users size={16} />}
            {isOnetoOneIconVisible && <UserRound size={16} />}
            {isPanelIconVisible && <UserRound size={16} />}
          </div>
          <div>{textModuleName}</div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-1'>
            <Hourglass size={12} />
            <span>{textDuration}</span>
          </div>
          <div className='flex items-center gap-1'>
            {slotPlatformIcon}
            <span>{textPlatformName}</span>
          </div>
        </div>
        <div>
          <div
            className=' hover:bg-orange-100 cursor-pointer flex items-center gap-2 rounded-sm p-[3px] px-2 w-fit bg-orange-50'
            onClick={onClickLink}
          >
            <UITypography className='text-red-900' variant='p' type='small'>
              {textLink}
            </UITypography>
            <ExternalLink size={12} className='text-red-900' />
          </div>
        </div>

        <div>
          <div className='text-sm text-gray-600'>{textSelected}</div>
          <div>{slotInterviewers}</div>
        </div>
        <div className='absolute top-4 right-4 hidden group-hover:flex gap-2'>
          {slotButtons}
        </div>
      </div>
      {isBreakCardVisible && <div className='pt-2'>{slotBreakCard}</div>}
      {isAddCardVisible && <div>{slotAddScheduleCard}</div>}
    </div>
  );
}
