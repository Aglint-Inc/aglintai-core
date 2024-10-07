'use client';

import Typography from '@components/typography';
import { cn } from '@lib/utils';
import { BriefcaseBusiness, Globe, User } from 'lucide-react';
import React from 'react';

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
        <User className='h-8 w-8 text-muted-foreground' />
      )}
      {isSlotImageVisible && <div className='h-8 w-8'>{slotImage}</div>}
      <div className='flex w-full items-center justify-between space-x-2'>
        <div className='flex items-center space-x-1'>
          <div>
            <Typography type='small'>{textName}</Typography>
            {isRoleVisible && (
              <div className='text-muted-foreground'>
                {slotRole ?? (
                  <div className='flex items-center space-x-1'>
                    <BriefcaseBusiness className='h-4 w-4' />
                    <Typography type='small' className='text-muted-foreground'>
                      {textRole}
                    </Typography>
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
          <Globe className='h-3 w-3 text-muted-foreground' />
          <Typography type='extraSmall' className='text-muted-foreground'>
            {textTimeZone}
          </Typography>
        </div>
      </div>
    </div>
  );
}
