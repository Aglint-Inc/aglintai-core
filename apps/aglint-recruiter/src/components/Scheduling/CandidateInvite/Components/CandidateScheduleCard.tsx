import { Card, CardContent } from '@components/ui/card';
import { cn } from '@lib/utils';
import { Clock } from 'lucide-react';

export function CandidateScheduleCard({
  textDay = 'Day2',
  textDuration = '2 hour 45 Minutes',
  isTitle = true,
  isSlotButtonVisible = true,
  isSelected = false,
  slotButton,
  slotSessionInfo,
  onClickCard,
}: {
  textDay?: string;
  textDuration?: string;
  isTitle?: boolean;
  isSlotButtonVisible?: boolean;
  isSelected?: boolean;
  slotButton?: React.ReactNode;
  slotSessionInfo?: React.ReactNode;
  onClickCard?: () => void;
}) {
  return (
    <Card
      className={cn('relative overflow-hidden', isSelected && 'bg-neutral-100')}
      onClick={onClickCard}
    >
      <CardContent className='p-4 space-y-4'>
        {isTitle && (
          <div className='flex justify-between items-center'>
            <span className='font-medium text-blue-600'>{textDay}</span>
          </div>
        )}
        <div className='flex justify-start items-center space-x-4'>
          <span className='text-neutral-600'>Total Duration</span>
          <div className='flex items-center space-x-2'>
            <Clock className='w-4 h-4 text-neutral-500' />
            <span>{textDuration}</span>
          </div>
        </div>
        {isSlotButtonVisible && (
          <div className='absolute top-3 right-3'>{slotButton}</div>
        )}
        {isSelected && (
          <div className='absolute inset-0 flex justify-end items-start p-4 bg-neutral-100'>
            {slotButton}
          </div>
        )}
        <div className='space-y-2'>
          {slotSessionInfo || (
            <>
              <SessionInfo />
              <SessionInfo />
              <SessionInfo />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
function SessionInfo() {
  return (
    <div className='p-2 bg-gray-100 rounded'>Session Info Placeholder</div>
  );
}
