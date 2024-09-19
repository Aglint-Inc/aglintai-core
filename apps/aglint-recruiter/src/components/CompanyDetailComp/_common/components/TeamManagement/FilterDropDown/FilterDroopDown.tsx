'use client';
import { cn } from '@lib/utils';
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
                <svg
                  width='12'
                  height='12'
                  viewBox='0 0 12 12'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10.875 4.5H7.875C7.64062 4.48438 7.51562 4.35938 7.5 4.125C7.51562 3.89062 7.64062 3.76563 7.875 3.75H9.89062C9.5 3.0625 8.96094 2.51562 8.27344 2.10938C7.60156 1.71875 6.84375 1.51563 6 1.5C4.71875 1.53125 3.65625 1.96875 2.8125 2.8125C1.96875 3.65625 1.53125 4.71875 1.5 6C1.53125 7.28125 1.96875 8.34375 2.8125 9.1875C3.65625 10.0312 4.71875 10.4688 6 10.5C6.79688 10.4844 7.52344 10.2969 8.17969 9.9375C8.83594 9.5625 9.36719 9.0625 9.77344 8.4375C9.86719 8.3125 9.98438 8.25 10.125 8.25C10.2812 8.25 10.3906 8.3125 10.4531 8.4375C10.5156 8.54688 10.5156 8.66406 10.4531 8.78906C9.96875 9.53906 9.34375 10.1328 8.57812 10.5703C7.8125 11.0078 6.95312 11.2344 6 11.25C5.01562 11.2344 4.13281 10.9922 3.35156 10.5234C2.55469 10.0703 1.92969 9.44531 1.47656 8.64844C1.00781 7.86719 0.765625 6.98438 0.75 6C0.765625 5.01562 1.00781 4.13281 1.47656 3.35156C1.92969 2.55469 2.55469 1.92969 3.35156 1.47656C4.13281 1.00781 5.01562 0.765625 6 0.75C6.96875 0.765625 7.84375 1 8.625 1.45312C9.40625 1.90625 10.0312 2.52344 10.5 3.30469V1.125C10.5156 0.890625 10.6406 0.765625 10.875 0.75C11.1094 0.765625 11.2344 0.890625 11.25 1.125V4.125C11.2344 4.35938 11.1094 4.48438 10.875 4.5Z'
                    fill='var(--accent-11)'
                  />
                </svg>
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
