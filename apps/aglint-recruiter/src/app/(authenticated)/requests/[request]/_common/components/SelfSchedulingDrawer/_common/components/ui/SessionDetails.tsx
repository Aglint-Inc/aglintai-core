'use client';
import { Clock } from 'lucide-react';

import UITypography from '@/components/Common/UITypography';

export function SessionDetails({
  slotSessionIcon,
  textSessionName = 'Behavioural Session',
  textSessionDuration = '30 Minutes',
  isMemberRow = true,
  slotMemberRow,
}: {
  slotSessionIcon?: React.ReactNode;
  textSessionName?: string;
  textSessionDuration?: string;
  isMemberRow?: boolean;
  slotMemberRow?: React.ReactNode;
}) {
  return (
    <div className='mb-4 flex w-full flex-col flex-nowrap gap-3 rounded-lg bg-neutral-50 p-3'>
      <div className='flex items-center justify-start gap-2'>
        <div className='flex flex-row flex-nowrap items-center justify-start gap-2'>
          <div>{slotSessionIcon}</div>
          <UITypography variant='h6' type='small' className='font-medium'>
            {textSessionName}
          </UITypography>
        </div>
        <div className='flex flex-row flex-nowrap items-center gap-2'>
          <Clock className='h-3 w-3 text-gray-600' />
          <UITypography variant='body1' type='small' className='font-medium'>
            {textSessionDuration}
          </UITypography>
        </div>
      </div>
      {isMemberRow ? (
        <div className='flex w-full flex-col flex-nowrap gap-2.5'>
          {slotMemberRow}
        </div>
      ) : null}
    </div>
  );
}
