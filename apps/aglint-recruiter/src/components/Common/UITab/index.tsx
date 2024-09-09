'use client';

import React from 'react';
import UITypography from '../UITypography';

export function UITab({
  isPillActive = false,
  onClickPill,
  textLabel,
  slotStartIcon,
  slotEndIcon,
  tabCount,
  size = 'md',
}: {
  isPillActive?: boolean;
  onClickPill?: () => void;
  textLabel: string;
  slotStartIcon?: React.ReactNode;
  slotEndIcon?: React.ReactNode;
  tabCount?: string;
  size?: 'sm' | 'md';
}) {
  const sizeClasses = {
    sm: 'py-2 px-1 text-xs',
    md: 'p-2 text-sm',
  };

  const tabCountSizeClasses = {
    sm: 'h-4 w-4 text-xs',
    md: 'h-5 w-5 text-sm',
  };

  return (
    <div
      className={`relative flex justify-center items-center transition-opacity duration-200 cursor-pointer  ${sizeClasses[size]} z-10`}
      onClick={onClickPill}
    >
      <div
        className={`h-full py-1 px-2 flex justify-center items-center gap-2 rounded-md  ${
          isPillActive
            ? 'bg-neutral-100 text-primary-700'
            : 'text-gray-500 hover:bg-neutral-100 hover:text-primary-700'
        }`}
      >
        <div className={`flex justify-center items-center gap-2 rounded-lg`}>
          {slotStartIcon ? <div>{slotStartIcon}</div> : null}
          <div>{textLabel}</div>
          {slotEndIcon ? <div>{slotEndIcon}</div> : null}
          {tabCount ? (
            <div
              className={`flex flex-col justify-center items-center border border-neutral-300 rounded-md bg-gray-800 text-white ${tabCountSizeClasses[size]} text-center`}
            >
              {tabCount}
            </div>
          ) : null}
        </div>
        {isPillActive && (
          <div
            className={`absolute left-0 bottom-0 right-0 h-0.5 bg-primary`}
          />
        )}
      </div>
    </div>
  );
}

export default UITab;

export function UITabWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <div className='relative flex flex-col w-full'>
      {/* Tabs container */}
      <div className='flex flex-row w-full'>{children}</div>
      {/* Bottom border line with absolute positioning */}
      <div className='absolute bottom-0 left-0 right-0 border-b border-neutral-300'></div>
    </div>
  );
}
