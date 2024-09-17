'use client';
import { Calendar, Clock } from 'lucide-react';
import React from 'react';

interface UpcomingInterviewListProps {
  slotPanelIcon?: React.ReactNode;
  textPanelName?: React.ReactNode;
  textDate?: React.ReactNode;
  textTime?: React.ReactNode;
  onClick?: () => void;
}

export function UpcomingInterviewList({
  textPanelName = '',
  textDate = '',
  textTime = '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
}: UpcomingInterviewListProps): React.JSX.Element {
  return (
    <div
      className={
        'border-neutral-6 hover:bg-neutral-2 flex cursor-pointer flex-col gap-1 rounded-md border p-3 transition-colors'
      }
      onClick={onClick}
    >
      <div className='flex items-center space-x-2 text-sm text-gray-600'>
        <span>{textPanelName}</span>
      </div>
      <div className={'flex gap-3'}>
        <div className='flex flex-col space-y-2'>
          <div className='flex items-center space-x-2 text-sm text-gray-600'>
            <Calendar className='h-4 w-4' />
            <span>{textDate}</span>
          </div>
          <div className='flex items-center space-x-2 text-sm text-gray-600'>
            <Clock className='h-4 w-4' />
            <span>{textTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
