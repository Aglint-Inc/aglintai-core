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
        {slotMeetingTypeIcon || (
          <>
            {iconName === 'videocam' && (
              <Video className='h-4 w-4 text-muted-foreground' />
            )}
            {iconName === 'call' && (
              <Phone className='h-4 w-4 text-muted-foreground' />
            )}
            {iconName === 'person' && (
              <User className='h-4 w-4 text-muted-foreground' />
            )}
          </>
        )}
        <span className='text-sm'>{textMeetingType}</span>
      </div>
    </div>
  );
}
