import { Checkbox } from '@components/ui/checkbox';
import { cn } from '@lib/utils';
import { Calendar } from 'lucide-react';
import React from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UITypography from '@/components/Common/UITypography';

interface DateOptionProps {
  as?: React.ElementType;
  slotScheduleOption?: React.ReactNode;
  isSelected?: boolean;
  textdate?: React.ReactNode;
  textOptionCount?: React.ReactNode;
  onClickDateOption?: React.HTMLAttributes<HTMLDivElement>;
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
  textOptionCount = '3 options',
  onClickDateOption = {},
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
            'relative flex justify-between p-3 rounded-md bg-neutral-100 cursor-pointer',
            isDisabled && 'cursor-not-allowed',
          )}
          {...onClickDateOption}
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
            {slotRightBlock ?? (
              <>
                <div>{textOptionCount}</div>
                <UIButton
                  variant='secondary'
                  icon={
                    <svg
                      width='15'
                      height='15'
                      viewBox='0 0 15 15'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-4 h-4'
                    >
                      <path
                        d='M7.75781 10.7578C7.58594 10.9141 7.41406 10.9141 7.24219 10.7578L2.74219 6.25781C2.58594 6.08594 2.58594 5.91406 2.74219 5.74219C2.91406 5.58594 3.08594 5.58594 3.25781 5.74219L7.5 9.96094L11.7422 5.74219C11.9141 5.58594 12.0859 5.58594 12.2578 5.74219C12.4141 5.91406 12.4141 6.08594 12.2578 6.25781L7.75781 10.7578Z'
                        fill='#68737D'
                      />
                    </svg>
                  }
                />
              </>
            )}
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
