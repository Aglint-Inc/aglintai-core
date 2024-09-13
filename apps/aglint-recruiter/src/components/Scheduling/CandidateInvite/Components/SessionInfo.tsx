import { Phone, Timer, User, Users, Video } from 'lucide-react';
import React from 'react';

interface SessionInfoProps {
  textSessionName: string;
  textSessionDuration: string;
  textMeetingType: string;
  slotMeetingTypeIcon?: React.ReactNode;
  slotInterviewtypeIcon?: React.ReactNode;
  iconName: 'videocam' | 'call' | 'person' | null;
}

export function SessionInfo({
  textSessionName,
  textSessionDuration,
  textMeetingType,
  slotMeetingTypeIcon,
  slotInterviewtypeIcon,
  iconName,
}: SessionInfoProps) {
  return (
    <div className='flex flex-row gap-4'>
      <div className='flex items-center gap-1'>
        <div className='flex w-5 h-5 justify-center items-center'>
          {slotInterviewtypeIcon || (
            <Users className='w-5 h-5 text-neutral-500' />
          )}
        </div>
        <span className='text-sm'>{textSessionName}</span>
      </div>
      <div className='flex items-center gap-1'>
        <Timer className='w-4 h-4 text-neutral-500' />
        <span className='text-sm'>{textSessionDuration}</span>
      </div>
      <div className='flex items-center gap-1'>
        {slotMeetingTypeIcon || (
          <>
            {iconName === 'videocam' && (
              <Video className='w-4 h-4 text-neutral-500' />
            )}
            {iconName === 'call' && (
              <Phone className='w-4 h-4 text-neutral-500' />
            )}
            {iconName === 'person' && (
              <User className='w-4 h-4 text-neutral-500' />
            )}
          </>
        )}
        <span className='text-sm'>{textMeetingType}</span>
      </div>
    </div>
  );
}
