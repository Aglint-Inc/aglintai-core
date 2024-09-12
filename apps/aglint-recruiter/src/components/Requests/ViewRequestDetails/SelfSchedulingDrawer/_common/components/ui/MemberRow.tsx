'use client';
import { Briefcase } from 'lucide-react';
import React from 'react';

import UITypography from '@/components/Common/UITypography';

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
    <Component className='flex w-full h-10 justify-start items-center gap-2'>
      <div className='flex w-64 justify-start items-center gap-2'>
        <div className='relative z-1 w-8 h-8 rounded-full'>
          <div className='overflow-hidden w-8 h-8 rounded-lg'>
            {slotInterviewerImage}
          </div>
          {iconTraining}
        </div>
        <div className='flex flex-col'>
          <UITypography type='small' variant='h6'>
            {textName}
          </UITypography>
          <div className='flex items-center text-neutral text-sm'>
            <Briefcase className='w-3 h-3 text-neutral-500' />
            <UITypography type='extraSmall' className='ml-1'>
              {textRole}
            </UITypography>
          </div>
        </div>
      </div>
      <div className='flex flex-1 justify-start items-center gap-2'>
        {slotConflicts}
      </div>
    </Component>
  );
}
