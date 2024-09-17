import { Card } from '@components/ui/card';
import { Clock, Coffee } from 'lucide-react';
import React from 'react';

interface InterviewBreakCardProps {
  textDuration?: React.ReactNode;
  slotEditButton?: React.ReactNode;
}

export function InterviewBreakCard({
  textDuration = '45 Minutes',
  slotEditButton,
}: InterviewBreakCardProps) {
  return (
    <Card className='flex flex-row justify-between rounded-md border border-dashed border-neutral-300 bg-white p-4 py-3'>
      <div className='flex flex-row space-x-4'>
        <div className='flex items-center space-x-1'>
          <Coffee strokeWidth={1} size={18} />
          <span className='font-medium'>Break</span>
        </div>
        <div className='flex items-center space-x-1'>
          <Clock strokeWidth={1} size={18} />
          <span>{textDuration}</span>
        </div>
      </div>
      <div className='flex flex-row items-center space-x-2'>
        {slotEditButton}
      </div>
    </Card>
  );
}
