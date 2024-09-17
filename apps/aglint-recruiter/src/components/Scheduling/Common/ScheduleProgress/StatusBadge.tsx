'use client';
import {
  CalendarArrowUp,
  CalendarCheck,
  CalendarCheck2,
  CalendarSearch,
  CircleX,
} from 'lucide-react';

import { UIBadge } from '@/components/Common/UIBadge';

export function StatusBadge({
  isCompletedVisible = false,
  isConfirmedVisible = true,
  isNotScheduledVisible = false,
  isInProgressVisible = false,
  isCancelledVisible = false,
  isWaitingVisible = false,
}) {
  return (
    <div className='flex flex-col justify-start items-start'>
      {isCompletedVisible && (
        <div className='flex justify-start items-center gap-2 rounded bg-green-100 text-green-800'>
          <UIBadge
            textBadge={'Completed'}
            icon={<CalendarCheck size={12} />}
            color='success'
          />
        </div>
      )}
      {isConfirmedVisible && (
        <div className='flex justify-start items-center gap-2 rounded bg-blue-100 text-blue-800'>
          <UIBadge
            textBadge={'Confirmed'}
            icon={<CalendarCheck2 size={12} />}
            color='info'
          />
        </div>
      )}
      {isNotScheduledVisible && (
        <div className='flex justify-start items-center gap-2 rounded bg-gray-100 text-gray-800'>
          <UIBadge
            icon={<CircleX size={12} />}
            color='neutral'
            textBadge={'Not Scheduled'}
          />
        </div>
      )}
      {isInProgressVisible && (
        <div className='flex justify-start items-center gap-2 rounded bg-yellow-100 text-yellow-800'>
          <UIBadge
            textBadge={'In Progress'}
            icon={<CalendarSearch size={12} />}
            color='info'
          />
        </div>
      )}
      {isCancelledVisible && (
        <div className='flex justify-start items-center gap-2 rounded bg-red-100 text-red-800'>
          <UIBadge
            icon={<CircleX size={12} />}
            color='error'
            textBadge={'Cancelled'}
          />
        </div>
      )}
      {isWaitingVisible && (
        <div className='flex justify-start items-center gap-2 rounded bg-yellow-100 text-yellow-800'>
          <UIBadge
            textBadge={'Unconfirmed'}
            icon={<CalendarArrowUp size={12} />}
            color='warning'
          />
        </div>
      )}
    </div>
  );
}
