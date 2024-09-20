'use client';

import { cn } from '@lib/utils';
import { Briefcase, Globe, User } from 'lucide-react';
import React from 'react';

import UITypography from '@/components/Common/UITypography';

interface GlobalUserDetailProps {
  className?: string;
  textName?: string;
  slotRole?: React.ReactNode;
  textTimeZone?: string;
  textRole?: string;
  isRoleVisible?: boolean;
  slotImage?: React.ReactNode;
  isSlotImageVisible?: boolean;
  isCandidateAvatarVisible?: boolean;
  slotCandidateStatus?: React.ReactNode;
}

export function GlobalUserDetail({
  className,
  textName = 'Brooklyn Simmons',
  slotRole,
  textTimeZone = 'This is a global text component',
  textRole = 'This is a global text component',
  isRoleVisible = true,
  slotImage,
  isSlotImageVisible = false,
  isCandidateAvatarVisible = true,
  slotCandidateStatus,
}: GlobalUserDetailProps) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {isCandidateAvatarVisible && (
        <User className='h-8 w-8 text-neutral-500' />
      )}
      {isSlotImageVisible && <div className='h-8 w-8'>{slotImage}</div>}
      <div className='flex w-full items-center justify-between space-x-2'>
        <div className='flex items-center space-x-1'>
          <div>
            <UITypography type='small'>{textName}</UITypography>
            {isRoleVisible && (
              <div className='text-neutral-500'>
                {slotRole ?? (
                  <div className='flex items-center space-x-1'>
                    <Briefcase className='h-4 w-4' />
                    <UITypography type='small' className='text-neutral-500'>
                      {textRole}
                    </UITypography>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className='flex items-center space-x-1 self-start pt-1'>
            {slotCandidateStatus}
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <Globe className='h-3 w-3 text-neutral-500' />
          <UITypography type='extraSmall' className='text-neutral-500'>
            {textTimeZone}
          </UITypography>
        </div>
      </div>
    </div>
  );
}
