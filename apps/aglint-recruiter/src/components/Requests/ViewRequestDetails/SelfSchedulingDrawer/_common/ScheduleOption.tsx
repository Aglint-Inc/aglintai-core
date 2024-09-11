'use client';

import { SingleDaySchedule } from './SingleDaySchedule';

export function ScheduleOption({
  isSelected = false,
  isCheckbox = true,
  slotSingleDaySchedule,
  slotCheckbox,
}) {
  return (
    <div className='relative flex w-full p-0 flex-row flex-nowrap bg-white cursor-pointer'>
      {isCheckbox ? (
        <div className='flex pt-3 pr-3 pl-4 justify-center items-start'>
          <div className='relative'>{slotCheckbox}</div>
        </div>
      ) : <div className='w-4' />}
      <div className='z-1 w-full rounded-lg'>
        <div className='flex w-full flex-col flex-nowrap gap-[1px] rounded-lg bg-gray-200'>
          {slotSingleDaySchedule ?? <SingleDaySchedule />}
        </div>
        {isSelected ? (
          <div className='absolute inset-0 z-3 flex border border-primary rounded-lg pointer-events-none' />
        ) : (
          <div className='absolute inset-0 z-2 rounded-lg border border-gray-300 pointer-events-none' />
        )}
      </div>
      {isCheckbox ? <div className='w-4' /> : null}
    </div>
  );
}
