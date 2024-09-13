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
    <div className='w-full h-screen'>
      <div className='relative flex h-[48px] px-5 justify-between items-center'>
        <div className='relative z-10 flex items-center gap-4'>
          {isBackButton && (
            <div
              className='flex items-center gap-1 cursor-pointer transition-all duration-250 ease hover:opacity-70'
              {...onClickBack}
            >
              <ChevronLeft className='w-3 h-3 text-gray-600' />
              <div className='text-gray-600'>Back</div>
            </div>
          )}
          <div className='flex items-center gap-1'>{slotTopbarLeft}</div>
        </div>
        <div className='relative z-10 flex gap-2'>{slotTopbarRight}</div>
        <div className='absolute inset-0 flex flex-col justify-center items-center pointer-events-none'>
          {slotSaving}
        </div>
        {isHeaderDividerVisible && (
          <div className='absolute inset-x-0 bottom-0 w-full h-px bg-neutral-200 pointer-events-none' />
        )}
      </div>
      <div className='overflow-auto h-[calc(100vh-48px)]'>{slotBody}</div>
    </div>
  );
}
