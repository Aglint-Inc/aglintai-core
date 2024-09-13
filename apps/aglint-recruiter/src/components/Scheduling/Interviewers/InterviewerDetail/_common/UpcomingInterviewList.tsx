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
        'flex flex-col gap-1 p-3 border border-neutral-6 rounded-md transition-colors cursor-pointer hover:bg-neutral-2'
      }
      onClick={onClick}
    >
      <div className='flex items-center space-x-2 text-sm text-gray-600'>
        <span>{textPanelName}</span>
      </div>
      <div className={'flex gap-3'}>
        <div className='flex flex-col space-y-2'>
          <div className='flex items-center space-x-2 text-sm text-gray-600'>
            <Calendar className='w-4 h-4' />
            <span>{textDate}</span>
          </div>
          <div className='flex items-center space-x-2 text-sm text-gray-600'>
            <Clock className='w-4 h-4' />
            <span>{textTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
