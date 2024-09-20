'use client';
import { ChevronLeft } from 'lucide-react';
import React from 'react';

export function UIPageLayout({
  slotTopbarLeft,
  slotTopbarRight,
  slotBody,
  isBackButton = false,
  onClickBack = {},
  slotSaving,
  isHeaderDividerVisible = true,
}: {
  slotTopbarLeft: React.ReactNode;
  slotTopbarRight?: React.ReactNode;
  slotBody: React.ReactNode;
  isBackButton?: boolean;
  onClickBack?: React.DOMAttributes<HTMLDivElement>;
  slotSaving?: React.ReactNode;
  isHeaderDividerVisible?: boolean;
}) {
  return (
    <div className='h-screen w-full'>
      <div className='relative flex h-[48px] items-center justify-between px-5'>
        <div className='relative z-10 flex items-center gap-4'>
          {isBackButton && (
            <div
              className='duration-250 ease flex cursor-pointer items-center gap-1 transition-all hover:opacity-70'
              {...onClickBack}
            >
              <ChevronLeft className='h-3 w-3 text-gray-600' />
              <div className='text-gray-600'>Back</div>
            </div>
          )}
          <div className='flex items-center gap-1'>{slotTopbarLeft}</div>
        </div>
        <div className='relative z-10 flex gap-2'>{slotTopbarRight}</div>
        <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center'>
          {slotSaving}
        </div>
        {isHeaderDividerVisible && (
          <div className='pointer-events-none absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200' />
        )}
      </div>
      <div className='h-[calc(100vh-48px)] overflow-auto'>{slotBody}</div>
    </div>
  );
}
