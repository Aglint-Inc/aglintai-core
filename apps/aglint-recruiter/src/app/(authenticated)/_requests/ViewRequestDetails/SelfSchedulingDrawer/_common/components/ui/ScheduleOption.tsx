'use client';

import { SingleDaySchedule } from './SingleDaySchedule';

export function ScheduleOption({
  isSelected = false,
  isCheckbox = true,
  slotSingleDaySchedule,
  slotCheckbox,
}) {
  return (
    <div className='relative flex w-full cursor-pointer flex-row flex-nowrap bg-white p-0'>
      {isCheckbox ? (
        <div className='flex items-start justify-center pl-4 pr-3 pt-3'>
          <div className='relative'>{slotCheckbox}</div>
        </div>
      ) : (
        <div className='w-4' />
      )}
      <div className='z-1 w-full rounded-lg'>
        <div className='flex w-full flex-col flex-nowrap gap-[1px] rounded-lg bg-gray-200'>
          {slotSingleDaySchedule ?? <SingleDaySchedule />}
        </div>
        {isSelected ? (
          <div className='z-3 pointer-events-none absolute inset-0 flex rounded-lg border border-primary' />
        ) : (
          <div className='z-2 pointer-events-none absolute inset-0 rounded-lg border border-gray-300' />
        )}
      </div>
      {isCheckbox ? <div className='w-4' /> : null}
    </div>
  );
}
