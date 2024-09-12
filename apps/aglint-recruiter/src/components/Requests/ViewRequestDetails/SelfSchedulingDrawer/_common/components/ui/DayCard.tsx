import { Checkbox } from '@components/ui/checkbox';
import { cn } from '@lib/utils';
import { Calendar } from 'lucide-react';
import React from 'react';

import UITypography from '@/components/Common/UITypography';

interface DateOptionProps {
  as?: React.ElementType;
  slotScheduleOption?: React.ReactNode;
  isSelected?: boolean;
  textdate?: React.ReactNode;
  onClickDateOption?: () => void;
  isDisabled?: boolean;
  slotCheckbox?: React.ReactNode;
  isCheckboxVisible?: boolean;
  slotRightBlock?: React.ReactNode;
  slotLeftBlock?: React.ReactNode;
}

export function DayCard({
  as: Component = 'div',
  slotScheduleOption,
  isSelected = false,
  textdate = 'April 16',
  onClickDateOption,
  isDisabled = false,
  slotCheckbox,
  isCheckboxVisible = true,
  slotRightBlock,
  slotLeftBlock,
}: DateOptionProps) {
  return (
    <Component className='flex w-full gap-2 bg-white'>
      <div className='w-full'>
        <div
          className={cn(
            'relative flex justify-between px-3 py-2 rounded-md bg-neutral-100 cursor-pointer',
            isDisabled && 'cursor-not-allowed',
          )}
          onClick={onClickDateOption}
        >
          <div className='flex items-center gap-1'>
            {isCheckboxVisible && (
              <div className='relative z-10 pr-[22px] flex justify-start items-start'>
                {slotCheckbox ?? <Checkbox className='mt-0.5' />}
              </div>
            )}
            <div className='relative z-[2] flex items-center gap-1'>
              {slotLeftBlock ?? (
                <>
                  <Calendar size={16} />
                  <div className='flex items-center gap-1'>
                    <UITypography>{textdate}</UITypography>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className='relative z-[2] flex items-center gap-2'>
            {slotRightBlock}
          </div>
          {isSelected && (
            <div className='absolute inset-0 z-[1] rounded-md bg-accent-200' />
          )}
          {isDisabled && (
            <div className='absolute inset-0 z-[3] flex justify-between p-2 rounded-md bg-neutral-100 cursor-not-allowed'>
              <div className='relative z-[2] flex items-center gap-2 text-neutral-900'>
                <Calendar size={16} />
                <div className='flex items-center gap-1'>
                  <UITypography>{textdate}</UITypography>
                </div>
              </div>
              <div className='relative z-[2] flex items-center gap-5'>
                <div className='italic text-sm text-neutral-700'>
                  {`Can't choose from this date`}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='flex flex-col gap-2 overflow-hidden pl-4'>
          {slotScheduleOption}
        </div>
      </div>
    </Component>
  );
}
