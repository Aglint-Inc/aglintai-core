'use client';

import React from 'react';

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
      className={`relative flex cursor-pointer items-center justify-center transition-opacity duration-200 ${sizeClasses[size]} z-10`}
      onClick={onClickPill}
    >
      <div
        className={`flex h-full items-center justify-center gap-2 rounded-md px-2 py-1 ${
          isPillActive
            ? 'text-primary-700 bg-neutral-100'
            : 'hover:text-primary-700 text-gray-500 hover:bg-neutral-100'
        }`}
      >
        <div className={`flex items-center justify-center gap-2 rounded-lg`}>
          {slotStartIcon ? <div>{slotStartIcon}</div> : null}
          <div>{textLabel}</div>
          {slotEndIcon ? <div>{slotEndIcon}</div> : null}
          {tabCount ? (
            <div
              className={`flex flex-col items-center justify-center rounded-md border border-neutral-300 bg-gray-800 text-white ${tabCountSizeClasses[size]} text-center`}
            >
              {tabCount}
            </div>
          ) : null}
        </div>
        {isPillActive && (
          <div
            className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary`}
          />
        )}
      </div>
    </div>
  );
}

export default UITab;

export function UITabWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <div className='relative flex w-full flex-col'>
      {/* Tabs container */}
      <div className='flex w-full flex-row'>{children}</div>
      {/* Bottom border line with absolute positioning */}
      <div className='absolute bottom-0 left-0 right-0 border-b border-neutral-300'></div>
    </div>
  );
}
