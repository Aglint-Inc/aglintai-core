import { dayjsLocal } from '@aglint/shared-utils';
import { cn } from '@lib/utils';
import { CircleMinus } from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';

export function UITimeRangeCard({
  isActive = false,
  startTime,
  endTime,
  timeZone = '',
  isSemiActive = false,
  onClickTime,
  ShowCloseIcon = true,
}: {
  isActive?: boolean;
  startTime: string;
  timeZone?: string;
  endTime: string;
  isSemiActive?: boolean;
  onClickTime?: () => void;
  ShowCloseIcon?: boolean;
}) {
  return (
    <div className='group relative'>
      <UIButton
        variant='outline'
        size='sm'
        className={cn(
          'relative h-10 w-full bg-white text-center',
          isActive && 'border-blue-300 bg-blue-50',
          isSaturdayOrSunday(startTime) ? 'time-slot-week-end' : 'time-slot',
          isSemiActive && 'border-dashed border-blue-300',
        )}
        onClick={onClickTime}
      >
        {timeZone
          ? dayjsLocal(startTime).tz(timeZone).format('hh:mm A')
          : dayjsLocal(startTime).format('hh:mm A')}{' '}
        -{' '}
        {timeZone
          ? dayjsLocal(endTime).tz(timeZone).format('hh:mm A')
          : dayjsLocal(endTime).format('hh:mm A')}
      </UIButton>
      {ShowCloseIcon && isActive && (
        <span
          onClick={onClickTime}
          className='z-2 absolute -right-2 -top-2 h-4 w-4 rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-100'
        >
          <CircleMinus className='h-4 w-4 text-destructive' />
        </span>
      )}
    </div>
  );
}

function isSaturdayOrSunday(date: string) {
  const dayOfWeek = dayjsLocal(date).day();
  return dayOfWeek === 0 || dayOfWeek === 6;
}
