'use client';
import { cn } from '@lib/utils';
import { ChevronDown } from 'lucide-react';
import React from 'react';

import UITypography from '@/components/Common/UITypography';

interface FilterDropdownProps {
  slotOption?: React.ReactNode;
  onClickReset?: React.HTMLAttributes<HTMLDivElement>;
  onClickDelete?: React.HTMLAttributes<HTMLDivElement>;
  isRemoveVisible?: boolean;
  link?: { href: string };
  isResetVisible?: boolean;
}

export function FilterDropdown({
  slotOption,
  onClickReset = {},
  onClickDelete = {},
  isRemoveVisible = true,
  isResetVisible = true,
}: FilterDropdownProps) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-lg border border-gray-300 p-0 shadow-md',
      )}
    >
      <div className={cn('flex flex-col')}>
        <div
          className={cn('max-h-88 flex flex-col overflow-auto bg-white p-2')}
        >
          {slotOption}
        </div>
      </div>
      {isResetVisible && (
        <div
          className={cn(
            'mx-2 flex flex-col items-stretch justify-between border-t border-gray-400 py-2',
          )}
        >
          {isResetVisible && (
            <div
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-red-100',
              )}
              {...onClickReset}
            >
              <div className={cn('flex items-center justify-center')}>
                <ChevronDown className='h-4 w-4' />
              </div>
              <UITypography variant='p' type='small' className='text-accent'>
                Reset
              </UITypography>
            </div>
          )}
          {isRemoveVisible && (
            <div
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-red-100',
              )}
              {...onClickDelete}
            >
              <div
                className={cn(
                  'duration-250 flex cursor-pointer items-center justify-center transition-all hover:opacity-70',
                )}
              >
                <svg
                  width='12'
                  height='12'
                  viewBox='0 0 12 12'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M4.92188 0.75C4.78125 0.75 4.67188 0.8125 4.59375 0.9375L4.24219 1.5H7.75781L7.40625 0.9375C7.32812 0.8125 7.21875 0.75 7.07812 0.75H4.92188ZM8.64844 1.5H9.75H10.5H10.875C11.1094 1.51563 11.2344 1.64062 11.25 1.875C11.2344 2.10938 11.1094 2.23437 10.875 2.25H10.4531L9.84375 10.6172C9.8125 11.0078 9.65625 11.3359 9.375 11.6016C9.09375 11.8516 8.75 11.9844 8.34375 12H3.65625C3.25 11.9844 2.90625 11.8516 2.625 11.6016C2.34375 11.3359 2.1875 11.0078 2.15625 10.6172L1.54688 2.25H1.125C0.890625 2.23437 0.765625 2.10938 0.75 1.875C0.765625 1.64062 0.890625 1.51563 1.125 1.5H1.5H2.25H3.35156L3.96094 0.539062C4.19531 0.195312 4.51562 0.015625 4.92188 0H7.07812C7.48438 0.015625 7.80469 0.195312 8.03906 0.539062L8.64844 1.5ZM9.70312 2.25H2.29688L2.90625 10.5469C2.92188 10.75 3 10.9141 3.14062 11.0391C3.28125 11.1797 3.45312 11.25 3.65625 11.25H8.34375C8.54688 11.25 8.71875 11.1797 8.85938 11.0391C9 10.9141 9.07812 10.75 9.09375 10.5469L9.70312 2.25Z'
                    fill='#D93F4C'
                  />
                </svg>
              </div>
              <UITypography variant='p' type='small' className='text-red-500'>
                Remove filter
              </UITypography>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
