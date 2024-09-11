'use client';
import { Clock } from 'lucide-react';

import UITypography from '@/components/Common/UITypography';

export function SessionDetails({
  as: _Component = 'div',
  slotSessionIcon,
  textSessionName = 'Behavioural Session',
  textSessionDuration = '30 Minutes',
  isMemberRow = true,
  slotMemberRow,
}) {
  return (
    <div className='flex w-full mb-4 p-3 flex-col flex-nowrap gap-3 rounded-lg bg-neutral-50'>
      <div className='flex justify-start items-center gap-2'>
        <div className='flex flex-row justify-start flex-nowrap items-center gap-2'>
          <div>{slotSessionIcon}</div>
          <UITypography variant='h6' type='small' className='font-medium'>
            {textSessionName}
          </UITypography>
        </div>
        <div className='flex flex-row flex-nowrap gap-2 items-center'>
          <Clock className='w-3 h-3 text-gray-600' />
          <UITypography variant='body1' type='small' className='font-medium'>
            {textSessionDuration}
          </UITypography>
        </div>
      </div>
      {isMemberRow ? (
        <div className='flex flex-col flex-nowrap gap-2.5 w-full'>
          {slotMemberRow}
        </div>
      ) : null}
    </div>
  );
}
