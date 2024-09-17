import { cn } from '@lib/utils';
import {
  Briefcase,
  Calendar,
  ChevronDown,
  Clock,
  Hourglass,
  User,
} from 'lucide-react';
import React from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UITypography from '@/components/Common/UITypography';

interface GlobalScheduleCardProps {
  className?: string;
  slotGlobalBadge?: React.ReactNode;
  textTime?: string;
  textDate?: string;
  slotRequestStatus?: React.ReactNode;
  isRequestStatusVisible?: boolean;
  textPanelName?: string;
  textDuration?: string;
  textPlatformName?: string;
  textRole?: string;
  textCandidateName?: string;
  slotButtonViewDetail?: React.ReactNode;
  onClickDropdown?: (_e: React.MouseEvent<HTMLDivElement>) => void;
  slotRequestDetail?: React.ReactNode;
  slotDropdownContent?: React.ReactNode;
  isCheckboxVisible?: boolean;
  isDateVisible?: boolean;
  isTimeVisible?: boolean;
  isSelectedVisible?: boolean;
  isDropdownIconVisible?: boolean;
  isButtonBlockVisible?: boolean;
  isRoleVisible?: boolean;
  slotStatus?: React.ReactNode;
  isCandidateVisible?: boolean;
  isStatusVisible?: boolean;
  slotCheckbox?: React.ReactNode;
  iconPanel?: React.ReactNode;
  iconMeetingPlatform?: React.ReactNode;
}

export function GlobalScheduleCard({
  className,
  slotGlobalBadge,
  textTime = '09:00AM - 09:30PMPST',
  textDate = 'Fri, May 12, 2024',
  slotRequestStatus,
  isRequestStatusVisible = true,
  textPanelName = 'Personality and cultural fit',
  textDuration = '30 Minutes',
  textPlatformName = 'Google Meet',
  textRole = 'Senior Software Engineer',
  textCandidateName = 'Brooklyn James',
  slotButtonViewDetail,
  onClickDropdown,
  slotRequestDetail,
  slotDropdownContent,
  isCheckboxVisible = false,
  isDateVisible = true,
  isTimeVisible = true,
  isSelectedVisible = false,
  isDropdownIconVisible = true,
  isButtonBlockVisible = true,
  isRoleVisible = true,
  slotStatus,
  isCandidateVisible = true,
  isStatusVisible = true,
  slotCheckbox,
  iconPanel,
  iconMeetingPlatform,
}: GlobalScheduleCardProps) {
  return (
    <div className={cn('relative', className)}>
      <div className='relative rounded-md border border-neutral-200 bg-white'>
        <div className='flex gap-1 p-4'>
          {isCheckboxVisible && (
            <div className='relative z-10 w-6 flex-none'>{slotCheckbox}</div>
          )}
          <div className='grid w-full grid-cols-[1.1fr_1.7fr_1fr] gap-4'>
            <div className='flex flex-col gap-2'>
              {isStatusVisible && (
                <div className='flex items-center gap-1'>{slotGlobalBadge}</div>
              )}
              {isDateVisible && (
                <div className='flex items-center gap-1'>
                  <Calendar className='h-4 w-4 text-neutral-600' />
                  <UITypography type='small'>{textDate}</UITypography>
                </div>
              )}
              {isTimeVisible && (
                <div className='flex items-center gap-1 text-yellow-500'>
                  <Clock className='h-4 w-4 text-neutral-600' />
                  <UITypography type='small'>{textTime}</UITypography>
                </div>
              )}
              {isRequestStatusVisible && (
                <div>
                  {slotRequestStatus ?? (
                    <div className='flex items-center gap-1 text-green-500'>
                      <Clock className='h-4 w-4 text-neutral-600' />
                      <UITypography type='small'>
                        Send self scheduling link to candidate
                      </UITypography>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-1'>
                {iconPanel}
                <UITypography type='medium'>{textPanelName}</UITypography>
              </div>
              <div className='flex gap-4'>
                <div className='flex items-center gap-1'>
                  <Hourglass className='h-4 w-4 text-neutral-600' />
                  <UITypography type='small'>{textDuration}</UITypography>
                </div>
                <div className='flex items-center gap-1'>
                  {iconMeetingPlatform}
                  <UITypography type='small'>{textPlatformName}</UITypography>
                </div>
              </div>
              {isCandidateVisible && (
                <div className='flex gap-4'>
                  {isRoleVisible && (
                    <div className='flex items-center gap-1'>
                      <Briefcase className='h-4 w-4' />
                      <UITypography type='small'>{textRole}</UITypography>
                    </div>
                  )}
                  {isCandidateVisible && (
                    <div className='flex items-center gap-1'>
                      <User className='h-4 w-4' />
                      <UITypography type='small'>
                        {textCandidateName}
                      </UITypography>
                    </div>
                  )}
                </div>
              )}
            </div>
            {isButtonBlockVisible && (
              <div className='flex flex-col items-end gap-2'>
                <div className='flex items-center gap-2'>
                  {slotStatus}
                  <div>{slotButtonViewDetail}</div>
                  {isDropdownIconVisible && (
                    <div onClick={onClickDropdown}>
                      <UIButton
                        size='sm'
                        variant='secondary'
                        icon={
                          <ChevronDown className='h-4 w-4 text-neutral-500' />
                        }
                      ></UIButton>
                    </div>
                  )}
                </div>
                <div className='flex flex-col items-end gap-1.5'>
                  {slotRequestDetail}
                </div>
              </div>
            )}
          </div>
        </div>
        {slotDropdownContent}
      </div>
      {isSelectedVisible && (
        <div className='absolute inset-0 rounded-md border border-primary' />
      )}
    </div>
  );
}
