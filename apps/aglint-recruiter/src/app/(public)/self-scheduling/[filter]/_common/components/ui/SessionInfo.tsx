import { Timer, Users } from 'lucide-react';
import React from 'react';

interface SessionInfoProps {
  textSessionName: string;
  textSessionDuration: string;
  textMeetingType: string;
  slotMeetingTypeIcon?: React.ReactNode;
  slotInterviewtypeIcon?: React.ReactNode;
}

export function SessionInfo({
  textSessionName,
  textSessionDuration,
  textMeetingType,
  slotMeetingTypeIcon,
  slotInterviewtypeIcon,
}: SessionInfoProps) {
  return (
    <div className='flex flex-row gap-4'>
      <div className='flex items-center gap-1'>
        <div className='flex h-5 w-5 items-center justify-center'>
          {slotInterviewtypeIcon || (
            <Users className='h-5 w-5 text-muted-foreground' />
          )}
        </div>
        <span className='text-sm'>{textSessionName}</span>
      </div>
      <div className='flex items-center gap-1'>
        <Timer className='h-4 w-4 text-muted-foreground' />
        <span className='text-sm'>{textSessionDuration}</span>
      </div>
      <div className='flex items-center gap-1'>
        {slotMeetingTypeIcon}
        <span className='text-sm'>{textMeetingType}</span>
      </div>
    </div>
  );
}
