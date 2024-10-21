'use client';
import Typography from '@components/typography';
import { Clock } from 'lucide-react';

export function SessionDetails({
  slotSessionIcon,
  textSessionName = 'Behavioral Session',
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
          <Typography variant='h6' type='small' className='font-medium'>
            {textSessionName}
          </Typography>
        </div>
        <div className='flex flex-row flex-nowrap items-center gap-2'>
          <Clock className='h-3 w-3 text-gray-600' />
          <Typography variant='body1' type='small' className='font-medium'>
            {textSessionDuration}
          </Typography>
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
