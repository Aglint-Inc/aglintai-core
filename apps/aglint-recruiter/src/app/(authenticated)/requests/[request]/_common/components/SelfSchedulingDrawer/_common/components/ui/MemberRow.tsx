'use client';
import Typography from '@components/typography';
import { BriefcaseBusiness } from 'lucide-react';
import React from 'react';

export function MemberRow({
  as: _Component = 'div',
  textName = 'Maximillion Colbe',
  textRole = 'Operations Manager',
  slotInterviewerImage,
  slotConflicts,
  iconTraining,
}: {
  as?: React.ElementType;
  textName: string;
  textRole: string;
  slotInterviewerImage: React.ReactNode;
  slotConflicts: React.ReactNode;
  iconTraining: React.ReactNode;
}) {
  const Component = _Component;
  return (
    <Component className='flex h-10 w-full items-center justify-start gap-2'>
      <div className='flex w-64 items-center justify-start gap-2'>
        <div className='z-1 relative h-8 w-8 rounded-full'>
          <div className='h-8 w-8 overflow-hidden rounded-lg'>
            {slotInterviewerImage}
          </div>
          {iconTraining}
        </div>
        <div className='flex flex-col'>
          <Typography type='small' variant='h6'>
            {textName}
          </Typography>
          <div className='text-neutral flex items-center text-sm'>
            <BriefcaseBusiness className='h-3 w-3 text-muted-foreground' />
            <Typography type='extraSmall' className='ml-1'>
              {textRole}
            </Typography>
          </div>
        </div>
      </div>
      <div className='flex flex-1 items-center justify-start gap-2'>
        {slotConflicts}
      </div>
    </Component>
  );
}
